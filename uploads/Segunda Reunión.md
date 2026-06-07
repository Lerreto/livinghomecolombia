# Proyecto Bienes Raíces — Plan Estratégico Equipo 1

> Documento de trabajo interno · Juan Alarcón & Juan Pablo Rueda Reto: 30 prospectos calificados extranjeros en 1 mes · Premio: $5.000.000 COP Producto: 5 haciendas residenciales en Bucaramanga, Santander

---

## Tabla de contenido

1. [Contexto del proyecto](#1-contexto-del-proyecto)
2. [Decisiones tomadas en las reuniones](#2-decisiones-tomadas-en-las-reuniones)
3. [Cronograma detallado — Fase por fase](#3-cronograma-detallado--fase-por-fase)
4. [Recomendaciones generales para cumplir las metas](#4-recomendaciones-generales-para-cumplir-las-metas)
5. [Naming y logo](#5-naming-y-logo)
6. [Stack tecnológico](#6-stack-tecnol%C3%B3gico)
7. [Estrategia de media buying profesional](#7-estrategia-de-media-buying-profesional)
8. [Plan de aprendizaje comprimido (mientras ejecutas)](#8-plan-de-aprendizaje-comprimido)
9. [Análisis de competencia con Meta Ad Library](#9-an%C3%A1lisis-de-competencia)
10. [Plan de creativos publicitarios](#10-plan-de-creativos-publicitarios)
11. [Métricas y monitoreo diario](#11-m%C3%A9tricas-y-monitoreo-diario)
12. [Errores que NO podemos cometer](#12-errores-que-no-podemos-cometer)
13. [Pendientes y presupuesto](#13-pendientes-y-presupuesto)

---

## 1. Contexto del proyecto

El proyecto consiste en validar la tesis de que es posible vender una propiedad colombiana a un extranjero en el plazo de **un mes**, usando exclusivamente herramientas digitales, pauta segmentada e inteligencia artificial.

### Producto

- **5 haciendas residenciales** ubicadas en **Bucaramanga, Santander** y su área metropolitana.
- No son haciendas productivas. Son propiedades para vivir.
- Inventario boutique: 5 unidades = cada propiedad debe tratarse como producto único con su propio storytelling.

### Por qué Bucaramanga es ventaja y reto al mismo tiempo

- **Ventaja:** clima primaveral todo el año (~24°C), "La Ciudad Bonita", cerca de Mesa de Los Santos, Mesa de Ruitoque y Cañón del Chicamocha. Costo de vida bajo comparado con Medellín o Cartagena.
- **Reto:** Bucaramanga **no es destino turístico conocido** por extranjeros. Hay que construir el destino en la mente del prospecto antes de venderle la propiedad. La estrategia "vender Colombia → vender región → vender propiedad" aplica con más fuerza aquí.

### Público objetivo

- Extranjeros europeos y norteamericanos mayores de 50 años.
- Interés en jubilarse o adquirir propiedad vacacional en el trópico.
- Provenientes de zonas con climas fríos / estaciones marcadas.
- Países priorizados: **EE.UU., Alemania, Suecia**.

### Nuestro rol

Somos **compradores de medios**: traemos los clientes calificados. No vendemos la propiedad, no cerramos. Nuestro trabajo termina cuando el prospecto entrega datos y responde activamente.

---

## 2. Decisiones tomadas en las reuniones

### 2.1 Identidad visual

**Paleta de colores**

- Base: **negro + dorado opaco** (nunca amarillista, nunca neón).
- Acentos: blancos rotos (nunca blanco puro), cremas, marrones opacos.
- Regla: **nunca colores puros**. Cansan la vista y rompen armonía.

**Estilo gráfico**

- **Minimalista**, referencias: Apple, Chanel, Mattels, Framework, Aman, Hermès.
- Evitar "ruido visual" típico latinoamericano (mucho texto, muchos colores).
- Mismo filtro en todas las fotos para coherencia visual.
- Texto mínimo en publicaciones publicitarias.

**Tipografía**

- Una sola familia tipográfica para toda la línea.
- Resaltar solo mediante color, tamaño o peso. Nunca sombras ni cajas.
- Serif elegante para títulos, sans-serif limpio para cuerpo.

### 2.2 Página web

- Informativa, sin backend pesado.
- Formulario incremental (3 pasos) para captura de leads.
- Multilingüe: inglés primero, español después, alemán opcional.
- Mapa interactivo con puntos estratégicos cercanos.

### 2.3 Bot de WhatsApp

- Informativo, no vendedor.
- Da valor pero deja preguntas abiertas para motivar contacto humano.
- Diseño cuidadoso: si responde todo, el prospecto no necesita hablar con nadie y se pierde la calificación.

### 2.4 Reglas internas del equipo

- No mostrar avances a los otros equipos. Si preguntan, "vamos atrasados".
- Si Julián pregunta directamente, mantener bajo perfil.
- Mantener confidencialidad de números hasta el final (esto coincide con regla oficial del reto).

---

## 3. Cronograma detallado — Fase por fase

### FASE 0 — Pre-lanzamiento (los próximos 3–5 días, antes del primer sábado)

**Objetivo:** llegar al primer sábado con todo listo para empezar, no llegar a "ver qué hacemos".

|Día|Tarea|Quién|Tiempo|
|---|---|---|---|
|Lunes|Decidir naming entre las 4 opciones + verificar dominio disponible|Ambos|1h|
|Lunes|Comprar dominio + VPS (Hetzner o DigitalOcean)|Juan A.|30min|
|Lunes|Crear Meta Business Manager, cuenta publicitaria, perfil de empresa Instagram + Facebook|JP Rueda|1h|
|Lunes|Crear cuenta Google Ads + GA4 + Google Tag Manager|JP Rueda|1h|
|Martes|Diseñar logo final (1 ronda de iteración)|Ambos con Claude/IA|3h|
|Martes|Espionaje en Meta Ad Library de competencia (sección 9)|JP Rueda|2h|
|Miércoles|Estudio comprimido de Meta Blueprint (sección 8)|Ambos|4h c/u|
|Miércoles|Reunir todo el material visual disponible de las 5 propiedades|Coordinar con Julián|1h|
|Jueves|Setup técnico de la landing en local (Next.js o Astro)|Juan A.|4h|
|Jueves|Redacción de copies en inglés (hero, secciones, CTAs)|JP Rueda con Claude|3h|
|Viernes|Generar primer batch de creativos (sección 10)|Ambos|4h|
|Viernes|Reunión interna de checkpoint antes del sábado|Ambos|1h|

**Entregables al sábado 1:**

- Naming + logo definitivos.
- Dominio comprado, VPS activo, SSL configurado.
- Landing page funcional al menos en versión mínima (hero + formulario).
- Meta Pixel + GA4 instalados y probados con eventos de test.
- Primer set de 6–9 creativos listos para subir.
- Análisis de competencia documentado.

---

### FASE 1 — Semana 1 (sábado 1 a viernes)

**Objetivo:** Tener la base sólida y empezar a recoger datos antes del primer fin de semana de pauta.

**Sábado (sesión con Julián)**

- Presentar avance: identidad, página, primer creativo.
- No revelar estrategia completa ni números proyectados.

**Domingo a martes — Refinamiento de landing**

- Versión multipágina: home → propiedad individual → formulario.
- 5 páginas de propiedad (una por hacienda) con galería + storytelling individual.
- Implementar Meta Conversions API (CAPI) además del Pixel — Meta está rompiendo atribución y CAPI es ya obligatorio en 2026.
- UTMs en todos los enlaces, plan de naming de campañas en una tabla.

**Miércoles a viernes — Lanzamiento de pauta TEST**

- Subir las 6–9 variantes de creativos a Meta Ads.
- Presupuesto inicial bajo: **$8 USD/día por campaña × 2 campañas = $16 USD/día total** durante 3–4 días de fase de aprendizaje del algoritmo.
- Objetivo: identificar Hook Rate y CTR por creativo. **Aún no se mide CPA**, no hay suficientes datos.

**Entregables al sábado 2:**

- Landing completa con 5 fichas de propiedad.
- CAPI funcionando.
- 3–4 días de datos de Meta Ads.
- Primera lectura de qué hooks están vivos y cuáles muertos.

---

### FASE 2 — Semana 2

**Objetivo:** Identificar 1–2 creativos ganadores y empezar a optimizar.

**Sábado a lunes — Análisis del test inicial**

- Matar todo creativo con CTR < 0.8% o Hook Rate < 25%.
- Identificar ángulo ganador (de los 3 que probamos: lifestyle / financiero / cultural).
- Generar 4 variantes nuevas del ángulo ganador (cambiando solo el hook).

**Martes a jueves — Escalado controlado**

- Subir presupuesto del ganador a **$15–20 USD/día**.
- Activar Google Ads en búsqueda con keywords muy específicos (sección 7.4).
- Activar campaña de retargeting (sección 7.3).
- Bot de WhatsApp en producción.

**Viernes — Reunión interna**

- Conteo intermedio de leads.
- Decisión: ¿estamos en ritmo para los 30? Si no, plan de contingencia.

**Entregables al sábado 3:**

- Mínimo 7–10 prospectos calificados acumulados.
- Estructura de cuentas Meta + Google estable.
- Bot de WhatsApp ya con tráfico real.

---

### FASE 3 — Semana 3

**Objetivo:** Escalado agresivo de lo que funciona.

**Sábado a martes — Escalado**

- Duplicar presupuesto del creativo ganador cada 2 días, hasta donde el CPA se mantenga estable.
- Lanzar lookalike audience (ahora sí tenemos píxel con datos suficientes).
- Más variantes del creativo ganador (5–6 nuevas).

**Miércoles a viernes — Optimización fina**

- Empezar a apagar Google Ads si su CPA está por encima de Meta.
- Concentrar 80% del presupuesto restante en lo que da CPA más bajo.
- Revisar calidad de los leads que están entrando: ¿están respondiendo a WhatsApp? Si no, ajustar oferta de la landing.

**Entregables al sábado 4 (última sesión):**

- Mínimo 20–25 prospectos calificados acumulados.
- Pipeline claro para la última semana.

---

### FASE 4 — Semana 4 (cierre)

**Objetivo:** llegar a 30+, asegurar el premio.

**Sábado al miércoles — Sprint final**

- Presupuesto máximo en el creativo ganador.
- Doblar esfuerzo en seguimiento por WhatsApp (cada lead nuevo se contacta dentro de la hora).
- Si llegamos a 30 antes del miércoles, no parar: el reto premia al que más tenga, no al primero en llegar a 30.

**Jueves a viernes — Documentación final**

- Reporte final con: total prospectos, CAC, mejor creativo, mejor ángulo, lecciones.
- Presentación para el sábado de cierre.

---

## 4. Recomendaciones generales para cumplir las metas

### 4.1 Sobre la idea de Instagram con bot en Python para conseguir seguidores

**No la recomiendo.** Razones concretas:

1. **Viola los términos de servicio de Instagram.** Meta detecta automatización con sistemas maduros. Resultado: shadowban o ban permanente justo cuando más necesitamos la cuenta.
2. **Followers ≠ Prospectos.** Un follower extranjero conseguido por follow-back nunca va a entregar su WhatsApp ni hacer una videollamada. Es vanidad métrica.
3. **Daña la identidad premium.** Una cuenta con 5.000 seguidores y 30 likes por post grita "fake". Las marcas premium tienen pocos seguidores con engagement real.
4. **No suma para Meta Ads.** El píxel y la calidad del público personalizado no dependen del conteo de followers.

**Alternativa: usar Python para algo que sí mueve la aguja:**

- Scraping de Google Maps para identificar códigos postales premium en Minnesota, Bavaria, Estocolmo → usar esos zip codes como segmentación.
- Bot que monitoree subreddits como r/expats, r/JustRetired, r/IWantOut con palabras clave "Colombia", "retire abroad" y nos avise para hacer outreach manual elegante.
- Automatizar el reporte diario de métricas (Meta Marketing API → Google Sheets → alerta a WhatsApp).

### 4.2 Sobre el material visual

- Si las fotos actuales de las haciendas son mediocres, **el primer gasto que toca aprobar es producción audiovisual**. Sin material visual no hay creativo, sin creativo no hay pauta efectiva.
- Si se puede, contratar un dron + fotógrafo por un día (~$300.000–$500.000 COP). Esto rinde más que cualquier curso de Meta.
- Si no se puede, usar IA: Topaz Photo AI, Magnific, Krea AI para mejorar fotos existentes. Resultados aceptables.

### 4.3 Sobre la psicología del cliente

- Vender **estilo de vida**, no metros cuadrados.
- "Imagínate amaneciendo con vista a la montaña, 25°C todos los días" funciona mejor que "casa de 400m² con 3 baños".
- Storytelling de "ayudo a mi familia a vender la hacienda donde crecí" solo en cierre, **no en atracción inicial**.

---

## 5. Naming y logo

### 5.1 Propuestas de naming

Criterios: corto, pronunciable en inglés y alemán, conectado a Santander sin ser obvio, premium, dominio disponible.

#### Opción A — **MESA**

> Referencia directa a Mesa de Los Santos y Mesa de Ruitoque. Funciona idéntico en español, inglés y alemán. Corta, fuerte, geográfica.

- **Lectura completa:** "Mesa — Haciendas de Santander"
- **Riesgo:** dominio `.com` puro tomado. Alternativas: `mesa-haciendas.com`, `mesa.co`, `vivamesa.com`.

#### Opción B — **SOLAR**

> En español antiguo, _solar_ es la casa ancestral de una familia. Peso histórico, premium. La palabra existe en inglés con otro significado (del sol) — esa doble lectura suma.

- **Lectura completa:** "Solar — Casas en el trópico"
- **Riesgo:** dominio `.com` casi seguro tomado. Alternativas: `casasolar.co`, `elsolar.co`, `solar.haus`.

#### Opción C — **ORIGEN**

> Habla de raíces, regreso a la tierra. Encaja con el ICP: jubilados buscando volver a lo esencial. Transparente en inglés y alemán.

- **Lectura completa:** "Origen — Hacienda Residencial Bucaramanga"
- **Riesgo:** menos conexión geográfica explícita; reforzar en bajada.

#### Opción D — **CUMBRE**

> Evoca altura, logro, vista. Encaja con cliente en etapa de realización/retiro. Bucaramanga rodeada de cerros.

- **Lectura completa:** "Cumbre — Haciendas de Altura"
- **Riesgo:** podría asociarse a aventura/montañismo si no se controla la estética.

**Mi recomendación:** explorar primero **MESA** y **SOLAR**. Verificar disponibilidad de dominio antes de decidir.

### 5.2 Brief del logo

**Concepto:** logo minimalista, hacienda residencial santandereana con tratamiento europeo contemporáneo. Un alemán de 60 años debe verlo y pensar "esto es serio".

**Símbolo (3 direcciones):**

1. **Arco colonial** en una sola línea continua (referencia a Girón/Barichara).
2. **Silueta de meseta** en 2–3 líneas horizontales escalonadas (encaja con naming MESA).
3. **Monograma** de inicial del nombre, serif elegante, con detalle sutil (línea de horizonte, sol mínimo, hoja apenas insinuada).

**Tipografía:**

- Títulos: Didot, Bodoni 72, Playfair Display, Cormorant Garamond. Versalitas espaciadas.
- Cuerpo: Inter, Söhne, Neue Haas Grotesk.

**Paleta:**

- Negro principal `#0A0A0A`
- Dorado opaco `#B8935A`
- Crema fondo `#F5F1EA`
- Verde profundo opcional `#2A3B2E` (vegetación de Santander)

**Qué NO hacer:** Casa de cartón, llaves cruzadas, sol con cara, palmeras obvias, más de 2 colores simultáneos, sombras, degradados, efectos 3D, tipografía caligráfica decorativa, las palabras "real estate" gigantes.

**Referencias estéticas:** Aman Resorts, Hermès, Loro Piana, Casa de Campo (RD).

Prueba final: el logo debe poder ir en una placa de bronce sobre pared blanca y verse bien.

---

## 6. Stack tecnológico

|Capa|Herramienta|Costo|
|---|---|---|
|Frontend|Next.js o Astro|Gratis|
|Hosting|VPS Hetzner o DigitalOcean|~12 USD/mes|
|Dominio|Namecheap o Cloudflare|~15 USD/año|
|SSL|Let's Encrypt|Gratis|
|Formularios|Tally + integración custom|Gratis / bajo costo|
|CRM ligero|Notion o Airtable|Gratis|
|Bot WhatsApp|WhatsApp Business API + n8n|Variable|
|Analítica|GA4 + Meta Pixel + CAPI + Hotjar|Gratis|
|Tag management|Google Tag Manager|Gratis|
|Espionaje|Meta Ad Library + TikTok Creative Center + SimilarWeb|Gratis|
|Diseño|Figma + Canva + CapCut|Gratis|
|IA generativa|Claude Pro (ya pagado) + ChatGPT free|Ya pagado|
|Pauta|Meta Ads + Google Ads|Ver sección 13|
|Reportes|Looker Studio|Gratis|

---

## 7. Estrategia de media buying profesional

Esta sección integra los principios del documento de media buying 2026 aplicados a este proyecto específico.

### 7.1 Por qué Meta Ads primero (no Google)

El público objetivo es un jubilado europeo o gringo que **no está buscando "Bucaramanga real estate"** porque ni siquiera sabe que Bucaramanga existe. Está scrolleando Instagram y Facebook. El nivel de awareness es prácticamente cero.

Meta es **interruption marketing**: le aparece el anuncio en medio del feed y le despierta el interés. Google es **search marketing**: requiere que alguien ya esté buscando algo. Hasta que no construyamos awareness, Google rinde poco.

**Distribución de presupuesto recomendada:**

- Meta: 65–70% del presupuesto.
- Google: 15–20% (cubrir branded searches + keywords muy específicos).
- TikTok: 10% experimental (CPMs bajos, vale la pena probar).

### 7.2 Estructura de campañas en Meta (3 niveles de embudo)

**Campaña 1 — TOFU (Top of Funnel) — Awareness**

- Objetivo: Engagement de video o tráfico.
- Audiencias frías: Advantage+ con intereses (jubilación, expat life, retire abroad, slow living, Latin America travel).
- Países: EE.UU., Alemania, Suecia.
- Edad: 50–70.
- Creativo: video corto vertical (15–30s) con paisajes de Santander + hook fuerte.
- Presupuesto: 40% del total.

**Campaña 2 — MOFU (Middle) — Conversiones**

- Objetivo: Lead form (formulario nativo de Meta) o conversión en landing.
- Audiencias: custom audience de quienes vieron 75%+ del video TOFU + visitantes del sitio + interactuaron con Instagram.
- Creativo: oferta concreta (PDF "Guía de retiro en Colombia 2026" a cambio del correo).
- Presupuesto: 40% del total.

**Campaña 3 — BOFU (Bottom) — Retargeting**

- Objetivo: Conversión.
- Audiencias: visitantes que abandonaron el formulario, visitantes de fichas de propiedad específica, click sin completar.
- Creativo: oferta de cierre (videollamada gratuita con el experto, sin compromiso).
- Presupuesto: 20% del total.

### 7.3 Configuración técnica obligatoria

- **Meta Pixel** instalado en todas las páginas.
- **Conversions API (CAPI)** instalada en servidor — duplica los eventos del Pixel. En 2026 la atribución browser-side está rota por iOS 14.5+ y bloqueadores. CAPI no es opcional.
- **Eventos estándar configurados:** PageView, ViewContent (en cada propiedad), Lead (al enviar formulario paso 1), CompleteRegistration (al enviar formulario completo), Contact (al iniciar chat WhatsApp).
- **UTMs en todos los enlaces** con esquema consistente: `utm_source=meta&utm_medium=cpc&utm_campaign={nombre_campaña}&utm_content={nombre_creativo}&utm_term={audiencia}`.
- **Dataset Quality Score** en Events Manager: revisar diariamente, debe estar en "Good" o "Great".

### 7.4 Google Ads — qué hacer con el 15-20%

- **Branded search:** keywords del nombre de marca + variaciones. Defensivo, baratísimo, alta conversión.
- **Search específico:** "retire in Colombia", "buy property Colombia", "Colombia visa retirement". Keywords con intención clara.
- **Performance Max** con cuidado: experimental, requiere mucho material visual. Si no tenemos suficiente, mejor dejarlo.
- **YouTube Ads:** experimental, pueden funcionar bien con el video TOFU si se segmenta a canales de expat life.

### 7.5 Trabajar CON el algoritmo, no contra él

Reglas que media buyers experimentados aprenden por las malas:

- **No tocar campañas en sus primeros 3–4 días.** Necesitan fase de aprendizaje.
- **No segmentar demasiado estrecho al principio.** Advantage+ y audiencias amplias funcionan mejor en 2026 que segmentación manual fina.
- **No mezclar objetivos** (no poner tráfico y conversión en la misma campaña).
- **Apagar Audience Network** al menos al inicio: tráfico de baja calidad.
- **Esperar 50 eventos de conversión por semana** antes de juzgar una campaña.

---

## 8. Plan de aprendizaje comprimido

Tenemos 1 mes, no 90 días. Aplicamos regla 80/20: el 20% del conocimiento que da el 80% del resultado.

### 8.1 Esencial — hacerlo SÍ o SÍ (12–15 horas total)

**Meta Blueprint — solo estos módulos**

1. "Get started with Meta Ads Manager" — 1h
2. "Set up a Meta Pixel" — 30min
3. "Conversions API" — 1h (clave)
4. "Advantage+ audience" — 30min
5. "Create high-performing creatives" — 1h

- **Total: ~4h**

**YouTube — canales específicos**

1. **Ben Heath** — buscar "Meta Ads for Real Estate 2024/2025" — 2 videos clave (~1.5h)
2. **Surfside PPC** — campañas de leads paso a paso — 2 videos (~1h)
3. **Nick Theriot** — análisis de creativos ganadores — 1 video (~30min)

- **Total: ~3h**

**Meta Ad Library** — análisis activo, no pasivo

- Buscar "Colombia real estate", "Medellín retire", "expat Colombia", "live in Colombia"
- Documentar 20 anuncios que llevan más de 30 días corriendo (=están funcionando)
- **Total: ~2h** (ver sección 9)

**Práctica con Claude Pro**

- Generar copies en inglés con prompts específicos.
- Analizar performance simulada de creativos antes de subirlos.
- **Total: durante todo el proceso, no se cuenta por separado.**

### 8.2 Lo que vamos a saltar (por ahora)

- Google Ads profundo: solo lo básico para branded + search específico.
- TikTok Ads avanzado: probar solo si nos sobra tiempo en semana 3–4.
- Email marketing: no aplica para este reto.
- Server-side tracking complejo: con Pixel + CAPI básico es suficiente para 1 mes.
- Looker Studio dashboards bonitos: una hoja de Google Sheets bien hecha es suficiente.

### 8.3 Aprendizaje mientras se ejecuta

La trampa más grande es estudiar todo antes de empezar y nunca lanzar. **Lanzamos con conocimiento mínimo viable y aprendemos en cada iteración.** El mejor maestro es el dinero gastado en pauta con datos reales.

---

## 9. Análisis de competencia

### 9.1 Meta Ad Library — auditoría obligatoria antes de lanzar

URL: `https://www.facebook.com/ads/library`

**Búsquedas a hacer (todas en inglés):**

1. "Colombia real estate"
2. "Medellín apartment"
3. "Cartagena property"
4. "retire in Colombia"
5. "live in Colombia"
6. "Colombia hacienda"
7. "Latin America retirement"
8. "expat Colombia"

**Filtros:**

- Países: All ads + filtrar luego por United States, Germany, Sweden.
- Tipo de anuncio: All ads.
- Plataforma: Facebook + Instagram.

**Por cada anuncio relevante, documentar:**

- ¿Cuánto tiempo lleva activo? (más de 30 días = funciona)
- ¿Cuál es el hook visual del primer segundo?
- ¿Cuál es el copy de la primera línea?
- ¿Cuál es el CTA?
- ¿A qué landing page lleva?
- ¿Qué oferta concreta hace?

**Entregable:** hoja de Google Sheets con 20–25 anuncios analizados, columnas: marca, hook visual, copy, CTA, oferta, tiempo activo, observaciones.

### 9.2 TikTok Creative Center

URL: `https://ads.tiktok.com/business/creativecenter`

- Buscar industria "Real Estate" + región "United States" + período "Last 30 days".
- Ver Top Ads: identificar formato, duración, estructura.
- TikTok favorece UGC (user generated content) y formatos nativos. Anuncios "producidos profesionalmente" rinden peor.

### 9.3 Páginas web de competencia

Revisar con SimilarWeb (extensión Chrome gratuita) y Wappalyzer:

- Casa de Campo (RD)
- Tulum Country Club
- Provenza Properties Medellín
- Loma Verde Cartagena
- Cualquier inmobiliaria de retiro en Costa Rica o Panamá

**Documentar:** estructura de la página, formularios, oferta principal, tecnología usada.

---

## 10. Plan de creativos publicitarios

### 10.1 Marco general — 3 ángulos × 3 hooks = 9 creativos iniciales

En 2026, el media buyer ganador es el que entiende creatividad y psicología, no el que sabe configurar botones. Vamos a probar 3 ángulos psicológicos distintos, con 3 hooks por ángulo.

#### Ángulo 1 — LIFESTYLE (emocional)

Atrae a quien busca una transformación personal, vida más simple, naturaleza.

- **Hook A:** "What if you woke up to this every morning?" + toma aérea de hacienda al amanecer.
- **Hook B:** "Your retirement deserves 25°C all year" + persona mayor en hamaca, paisaje verde detrás.
- **Hook C:** "From Stuttgart winters to Colombian springs" + split screen invierno/primavera.

#### Ángulo 2 — FINANCIERO (racional)

Atrae a quien hace cuentas y busca poder adquisitivo.

- **Hook A:** "Live like a king on $2.000/month" + interior premium + texto sobre costos reales.
- **Hook B:** "What costs $2M in Florida costs $300K here" + comparativa visual rápida.
- **Hook C:** "Your social security goes 5x further in Colombia" + infografía mínima.

#### Ángulo 3 — CULTURAL/CURIOSIDAD (intriga)

Atrae a quien ya conoce Medellín o Cartagena y busca algo menos saturado.

- **Hook A:** "The Colombian city locals don't tell tourists about" + Bucaramanga skyline.
- **Hook B:** "Why expats are choosing this over Medellín" + secuencia rápida de paisajes.
- **Hook C:** "Colombia's best-kept retirement secret" + montañas + frase intrigante.

### 10.2 Formato técnico

- **Video vertical 9:16** (1080×1920) para Reels, Stories, TikTok.
- **Video cuadrado 1:1** (1080×1080) como respaldo para feed.
- **Duración: 15–25 segundos.** Lo más corto que cuente la historia.
- **Hook en los primeros 1.5 segundos.** Visual fuerte, no texto que el usuario tenga que leer.
- **Subtítulos quemados** en el video (el 85% ve en silencio).
- **Logo solo al final**, máximo 1.5 segundos.

### 10.3 Estructura interna de cada video

```
[0.0 – 1.5s]   HOOK visual + texto corto
[1.5 – 8s]    Promesa / problema que resuelve
[8 – 18s]    Pruebas (paisajes, interior, lifestyle)
[18 – 22s]   CTA + oferta concreta
[22 – 25s]   Logo final
```

### 10.4 UGC sintético — el truco para 2026

Anuncios "estilo influencer aficionado" rinden más que anuncios "producidos". Crear 2–3 creativos que parezcan grabados con celular:

- Una "expat americana" caminando por la hacienda contando por qué se mudó (puede ser actor o IA con HeyGen).
- Un "alemán jubilado" en español roto contando lo bien que vive.
- Una pareja sueca enseñando la cocina al amanecer.

Estos creativos suelen tener **CTR 2–3x más alto** que los producidos profesionalmente.

### 10.5 Copy en inglés — fórmula base

```
[Hook que para el scroll]
[Promesa concreta en 1 línea]
[2–3 bullets de beneficios reales]
[CTA con baja fricción]
```

**Ejemplo:**

```
🌿 Tired of -10°C winters and $4.000 rent?

Live the dream you've been postponing.

✓ 25°C year-round in Colombia's "Beautiful City"
✓ Hacienda living from $2.000/month total cost
✓ 4 hours from Miami, easy visa, English-friendly community

→ Download our free 2026 Colombia Retirement Guide
```

### 10.6 Iteración basada en datos

Después de los primeros 3 días con datos:

- **Hook Rate** (% de usuarios que ven más de 3s): si está por debajo de 25%, el hook está muerto.
- **Hold Rate** (% que ve más de 15s): si está por debajo de 15%, el cuerpo del video no está enganchando.
- **CTR** (% que hace click): si está por debajo de 0.8%, el creativo no está conectando.

Cada métrica baja tiene una causa distinta. No mezclar diagnósticos.

---

## 11. Métricas y monitoreo diario

### 11.1 Las métricas que importan, en orden

1. **Prospectos calificados acumulados** (la única que importa para ganar el reto).
2. **Costo por prospecto calificado** (CAC) — meta: < $200.000 COP.
3. **CPL** (Costo por Lead, antes de calificar).
4. **Tasa de conversión prospecto → calificado** (cuántos de los que llenan formulario responden activamente).
5. **CTR** del creativo.
6. **Hook Rate** del creativo.
7. **CPM** (lo que nos cobra Meta por mil impresiones).

### 11.2 Calendario de monitoreo

|Fase|Frecuencia|Qué mirar|Qué tocar|
|---|---|---|---|
|Días 1–3 (warmup)|1 vez/día|CPM, CTR|NADA. Dejar al algoritmo aprender.|
|Días 4–7|2 veces/día|+ Hook Rate, CPC|Matar anuncios con CTR < 0.5%|
|Días 8–14|2 veces/día|+ CPL, CPA|Iterar sobre ganadores, generar variantes|
|Días 15+|2 veces/día|+ CAC real, calidad de leads|Escalar 20% cada 2 días en lo que funciona|

### 11.3 Hoja de Google Sheets — estructura mínima

**Pestaña 1: "Leads"**

- Columnas: fecha, nombre, país, correo, WhatsApp, propiedad de interés, fuente (Meta/Google/orgánico), creativo, calificado (sí/no), notas.

**Pestaña 2: "Daily metrics"**

- Columnas: fecha, gasto Meta, gasto Google, gasto TikTok, impresiones, clicks, leads, leads calificados, CAC, mejor creativo del día.

**Pestaña 3: "Creatives performance"**

- Columnas: ID creativo, ángulo, hook, gasto acumulado, impresiones, CTR, Hook Rate, leads, CAC, decisión (escalar/matar/iterar).

### 11.4 Alerta automática (opcional pero recomendada)

Script simple en Python + Meta Marketing API que cada noche:

1. Descargue las métricas del día.
2. Calcule CAC actual.
3. Envíe mensaje a WhatsApp si CAC sube por encima de $250.000 COP.

Esto sí es uso legítimo de Python en este proyecto (a diferencia del bot de Instagram).

---

## 12. Errores que NO podemos cometer

Lista de cosas que matan campañas y consumen presupuesto en silencio:

### Técnicos

- ❌ Olvidar instalar CAPI (solo Pixel = atribución rota en 2026).
- ❌ Tener la landing en HTTP sin HTTPS.
- ❌ No verificar el dominio en Meta Business Manager.
- ❌ No configurar eventos prioritarios en Aggregated Event Measurement.
- ❌ Cargar la landing en más de 3 segundos (cada segundo extra = 10% menos conversión).

### De campaña

- ❌ Segmentar demasiado estrecho al inicio (mata el aprendizaje del algoritmo).
- ❌ Cambiar campañas a diario (necesitan 3–4 días para estabilizar).
- ❌ Mezclar objetivos en una sola campaña.
- ❌ Dejar Audience Network activado al inicio (calidad baja).
- ❌ Hacer creativos en horizontal para Meta (siempre vertical 9:16).

### De creativo

- ❌ Logo grande al inicio del video (mata el hook rate).
- ❌ Video sin subtítulos (85% ve en silencio).
- ❌ Más de 20% de texto en la imagen estática.
- ❌ Hook con texto largo que requiera leer (debe ser visual).
- ❌ Usar música con copyright sin licencia.

### Estratégicos

- ❌ Empezar Google Ads antes de tener data de Meta (gastas plata sin info).
- ❌ Lanzar bot de Instagram con Python (ya explicado, sección 4.1).
- ❌ Hacer landing en WordPress con plugins pesados.
- ❌ Tener un solo creativo "perfecto" en lugar de 9 variantes.
- ❌ Esperar a tener todo perfecto para lanzar.

### De seguimiento

- ❌ No contactar al lead en la primera hora después de su formulario.
- ❌ No tener mensaje preescrito de bienvenida.
- ❌ No documentar conversaciones (perdemos prospectos calificados por desorden).

---

## 13. Pendientes y presupuesto

### 13.1 Lo definido ✅

- Producto: 5 haciendas residenciales en Bucaramanga.
- Países objetivo: EE.UU., Alemania, Suecia.
- Paleta y línea visual: negro + dorado opaco, minimal.
- Estrategia general de medios: Meta 65–70%, Google 15–20%, TikTok 10%.

### 13.2 Pendiente con Julián

1. ¿Material visual de las 5 propiedades? Cantidad y calidad.
2. ¿Aprobación para producción audiovisual nueva (dron + foto)?
3. Rango de precios de las haciendas (interno, para calificar leads).
4. ¿Quién cierra y en qué idiomas habla?
5. Historia de las haciendas (para storytelling real).
6. **Presupuesto de pauta concreto.**

### 13.3 Pendiente nuestro (esta semana)

- Naming final + dominio verificado y comprado.
- Logo definitivo.
- Wireframe de landing en Figma.
- Setup de Meta Business Manager + Google Ads + GA4.
- Análisis de competencia en Meta Ad Library (sección 9).
- Plan de aprendizaje comprimido ejecutado (sección 8).

### 13.4 Recomendación de presupuesto de pauta

**Cálculo desde la meta:**

- 30 prospectos × $166.000 COP = **$5.000.000 COP** mínimo en pauta.
- Con 30% de margen por aprendizaje del algoritmo: **$6.500.000 COP.**
- Con margen para escalar el ganador: **$8.000.000 COP** ideal.

**Distribución sobre $6.500.000:**

|Concepto|%|Monto|
|---|---|---|
|Meta Ads|65%|~$4.225.000|
|Google Ads|20%|~$1.300.000|
|TikTok Ads (experimental)|10%|~$650.000|
|Reserva para escalar ganador|5%|~$325.000|

**Mínimo viable defendible:** $4.000.000 COP. Con menos, hay que renegociar la meta del reto con Julián.

**Adicional al presupuesto de pauta (gastos técnicos):**

- VPS: ~50.000 COP/mes.
- Dominio: ~60.000 COP/año.
- Posible producción audiovisual: ~500.000 COP (única vez, si se aprueba).
- Total fijo aprox: ~$600.000 COP.

**Total recomendado del proyecto:** $7.100.000 COP.

---

## Anexo: Resumen ejecutivo de 1 página

> **Meta:** 30 prospectos calificados extranjeros en 30 días. **Producto:** 5 haciendas residenciales en Bucaramanga. **Cliente:** jubilados de EE.UU., Alemania, Suecia (50+).
> 
> **Estrategia:** comprador de medios profesional, embudo de 3 niveles en Meta Ads (TOFU/MOFU/BOFU), 9 creativos iniciales en 3 ángulos psicológicos (lifestyle/financiero/cultural), iteración basada en Hook Rate y CTR, escalado del ganador en semanas 3–4.
> 
> **Stack:** Next.js + VPS + Meta Pixel + CAPI + GA4 + Tally + Notion + Claude Pro.
> 
> **Presupuesto sugerido:** $7.100.000 COP total ($6.500.000 en pauta + $600.000 técnico).
> 
> **Diferenciadores frente a otros equipos:**
> 
> 1. CAPI desde día 1 (atribución correcta).
> 2. 9 creativos en 3 ángulos (no 1 creativo "perfecto").
> 3. Aprendizaje comprimido + ejecución desde el día 1.
> 4. Auditoría de competencia con Meta Ad Library antes de lanzar.
> 5. Identidad de marca premium real (no canva genérico).

---

_Documento vivo · Actualizar después de cada sesión sabatina._