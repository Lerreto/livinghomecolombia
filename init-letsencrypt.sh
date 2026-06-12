#!/bin/bash
# ============================================================
# Bootstrap de certificados Let's Encrypt (Certbot + nginx).
# Córrelo UNA vez al desplegar en el servidor:
#   chmod +x init-letsencrypt.sh
#   ./init-letsencrypt.sh
# ============================================================
set -e

# ---- Ajusta esto si hace falta ----
domains=(livinghomecolombia.com www.livinghomecolombia.com crm.livinghomecolombia.com)
email="contact@livinghomecolombia.com"   # avisos de vencimiento de Let's Encrypt
staging=0          # pon 1 para PROBAR sin gastar el límite de Let's Encrypt
rsa_key_size=4096
data_path="./certbot"
compose="docker compose -f docker-compose.yml -f docker-compose.prod.yml"
# -----------------------------------

if [ -d "$data_path/conf/live/${domains[0]}" ]; then
  read -p "Ya existen certificados para ${domains[0]}. ¿Reemplazar? (y/N) " d
  if [ "$d" != "Y" ] && [ "$d" != "y" ]; then exit; fi
fi

# 1) Parámetros TLS recomendados
if [ ! -e "$data_path/conf/options-ssl-nginx.conf" ] || [ ! -e "$data_path/conf/ssl-dhparams.pem" ]; then
  echo "### Descargando parámetros TLS recomendados ..."
  mkdir -p "$data_path/conf"
  curl -s https://raw.githubusercontent.com/certbot/certbot/master/certbot-nginx/certbot_nginx/_internal/tls_configs/options-ssl-nginx.conf > "$data_path/conf/options-ssl-nginx.conf"
  curl -s https://raw.githubusercontent.com/certbot/certbot/master/certbot/certbot/ssl-dhparams.pem > "$data_path/conf/ssl-dhparams.pem"
fi

# 2) Certificado temporal (dummy) para que nginx pueda arrancar
echo "### Creando certificado temporal para ${domains[0]} ..."
path="/etc/letsencrypt/live/${domains[0]}"
mkdir -p "$data_path/conf/live/${domains[0]}"
$compose run --rm --entrypoint "\
  openssl req -x509 -nodes -newkey rsa:$rsa_key_size -days 1 \
    -keyout '$path/privkey.pem' \
    -out '$path/fullchain.pem' \
    -subj '/CN=localhost'" certbot

# 3) Levantar nginx con el certificado temporal
echo "### Levantando nginx ..."
$compose up --force-recreate -d web

# 4) Borrar el certificado temporal
echo "### Borrando certificado temporal ..."
$compose run --rm --entrypoint "\
  rm -Rf /etc/letsencrypt/live/${domains[0]} && \
  rm -Rf /etc/letsencrypt/archive/${domains[0]} && \
  rm -Rf /etc/letsencrypt/renewal/${domains[0]}.conf" certbot

# 5) Pedir el certificado real
echo "### Solicitando certificado a Let's Encrypt ..."
domain_args=""
for domain in "${domains[@]}"; do domain_args="$domain_args -d $domain"; done
case "$staging" in 1) staging_arg="--staging" ;; *) staging_arg="" ;; esac

$compose run --rm --entrypoint "\
  certbot certonly --webroot -w /var/www/certbot \
    $staging_arg $domain_args \
    --email $email --rsa-key-size $rsa_key_size \
    --agree-tos --no-eff-email --force-renewal" certbot

# 6) Recargar nginx y levantar el resto del stack
echo "### Recargando nginx y levantando todo ..."
$compose exec web nginx -s reload
$compose up -d

echo "### Listo. Revisa https://${domains[0]}"
