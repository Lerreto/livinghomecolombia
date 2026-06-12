# Despliegue a PRODUCCIÓN — Living Home Colombia

Guía punto por punto para dejar el sitio andando con HTTPS, el CRM y el
formulario conectado. Pensada para correr en un servidor (VPS) con Ubuntu.

---

## 0. Requisitos previos
- [ ] Un VPS con IP pública (Ubuntu 22.04+).
- [ ] Acceso SSH al servidor.
- [ ] El dominio `livinghomecolombia.com` administrado en Cloudflare.

---

## 1. Apuntar el DNS
En Cloudflare, crea estos registros **A** apuntando a la IP de tu servidor:

| Tipo | Nombre | Contenido        |
|------|--------|------------------|
| A    | `@`    | IP-DEL-SERVIDOR  |
| A    | `www`  | IP-DEL-SERVIDOR  |
| A    | `crm`  | IP-DEL-SERVIDOR  |

> Importante: para que Let's Encrypt valide, durante la emisión del
> certificado estos registros deben estar en **DNS only** (nube gris),
> no proxied (nube naranja). Después de tener el SSL puedes volver a
> activar el proxy si quieres.

Espera a que propaguen. Verifica desde tu PC:
```bash
dig +short livinghomecolombia.com
dig +short crm.livinghomecolombia.com
```
Ambos deben devolver la IP del servidor.

---

## 2. Preparar el servidor
Conéctate por SSH y:

```bash
# Instalar Docker + Compose
curl -fsSL https://get.docker.com | sh

# Abrir solo los puertos necesarios
sudo ufw allow 22
sudo ufw allow 80
sudo ufw allow 443
sudo ufw --force enable
```

---

## 3. Subir el proyecto
Clona o copia el proyecto al servidor (por git, scp o rsync). Debe quedar
con esta estructura, incluida la carpeta `worker/`:

```
livinghome/
├── docker-compose.yml
├── docker-compose.prod.yml
├── docker-compose.override.yml   (no se usa en prod, pero no estorba)
├── init-letsencrypt.sh
├── nginx/{default.conf, prod.conf}
├── web/...
└── worker/...
```

Entra a la carpeta:
```bash
cd livinghome
```

---

## 4. Crear el archivo .env
Genera el `.env` con contraseñas fuertes (estas inicializan la base de prod):

```bash
cat > .env << ENV
ACME_EMAIL=contact@livinghomecolombia.com
CRM_DB_ROOT_PASSWORD=$(openssl rand -base64 32 | tr -dc 'A-Za-z0-9' | head -c 24)
CRM_DB_NAME=espocrm
CRM_DB_USER=espocrm
CRM_DB_PASSWORD=$(openssl rand -base64 32 | tr -dc 'A-Za-z0-9' | head -c 24)
CRM_ADMIN_USER=admin
CRM_ADMIN_PASSWORD=CambiaEstaClaveFuerte2026
ENV

cat .env   # revisa y anota la contraseña de admin
```

---

## 5. Generar el SSL y levantar todo
El script crea los certificados y deja el stack arriba. La PRIMERA vez:

```bash
chmod +x init-letsencrypt.sh

# (Opcional pero recomendado) prueba primero en modo staging:
#   edita init-letsencrypt.sh y pon  staging=1  -> corre el script
#   si sale bien, vuelve a poner  staging=0  y córrelo de nuevo.

./init-letsencrypt.sh
```

Cuando termine, verifica en el navegador:
- https://livinghomecolombia.com  → tu sitio con candado
- https://crm.livinghomecolombia.com → login de EspoCRM

> A partir de aquí, los reinicios normales son:
> `docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d`

Si algo falla, mira los logs:
```bash
docker compose -f docker-compose.yml -f docker-compose.prod.yml logs -f web
docker compose -f docker-compose.yml -f docker-compose.prod.yml logs -f crm
```

---

## 6. Configurar el Lead Capture en el EspoCRM de producción
1. Entra a https://crm.livinghomecolombia.com con `admin` y la contraseña del `.env`.
2. Avatar (arriba a la derecha) → **Administration** → **Lead Capture**.
3. **Create Lead Capture**. Marca **Active**. En **Field List** agrega:
   `firstName, lastName, emailAddress, phoneNumber, addressCountry, source, description`.
4. Guarda y, en el panel derecho del registro, copia la **URL**
   (`https://crm.livinghomecolombia.com/api/v1/LeadCapture/XXXX`).

---

## 7. Desplegar el Worker (reCAPTCHA)
Desde tu máquina (donde tienes wrangler), en la carpeta `worker/`:

```bash
cd worker
wrangler login
wrangler deploy                       # crea el Worker y te da su URL
wrangler secret put RECAPTCHA_SECRET  # pega la Secret Key de reCAPTCHA
wrangler secret put ESPO_LEAD_CAPTURE_URL  # pega la URL del paso 6
```

Anota la URL del Worker que imprime `deploy`
(`https://livinghome-lead.TU-SUBDOMINIO.workers.dev`).

> En el panel de Google reCAPTCHA, confirma que `livinghomecolombia.com`
> esté en la lista de dominios permitidos.

---

## 8. Conectar el frontend
En `web/js/crm.js`:
- `RECAPTCHA_SITE_KEY` = tu Site Key de reCAPTCHA (pública).
- `ENDPOINTS.prod`     = la URL del Worker del paso 7.

Sube el `crm.js` actualizado al servidor (la carpeta `web/` se sirve por
volumen, así que el cambio queda activo al instante; si quieres forzar,
`... up -d --force-recreate web`).

---

## 9. Probar de punta a punta
1. Abre https://livinghomecolombia.com y llena el formulario.
2. Al enviar: se abre WhatsApp **y** el lead debe aparecer en EspoCRM
   (menú **Leads**) en unos segundos.
3. Si no aparece, revisa `wrangler tail` (logs del Worker en vivo) y los
   logs de `crm`.

---

## 10. Mantenimiento
- **SSL**: se renueva solo (certbot cada 12 h, nginx recarga cada 6 h).
- **Logs**: `docker compose -f docker-compose.yml -f docker-compose.prod.yml logs -f <servicio>`
- **Backups de la base** (recomendado programar con cron):
  ```bash
  docker compose -f docker-compose.yml -f docker-compose.prod.yml exec -T crm-db \
    mariadb-dump -u root -p"$CRM_DB_ROOT_PASSWORD" espocrm > backup_$(date +%F).sql
  ```
- **Actualizar imágenes**:
  ```bash
  docker compose -f docker-compose.yml -f docker-compose.prod.yml pull
  docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d
  ```
