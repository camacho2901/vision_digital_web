# PROGRESS — Visión Digital (web)

Landing page estática de Visión Digital (agencia de marketing digital e IA, Latinoamérica).
Hosting: **servidor propio** (Contabo `82.197.67.81`) servida por Caddy en `/opt/apps/visiondigital/landing`. GitHub Pages quedó desactivado el 2026-11-22.
Stack: HTML + CSS + JS vanilla, sin build ni dependencias locales (Google Fonts y Font Awesome vía CDN).

## Cambios 2026-11-22 (migración de hosting)
- Se agregó el apartado **`#plataforma`** ("05 · Ads."), entre Automatización y Software: 3 tarjetas (resultados, reportes, acceso privado), métricas y CTA "Entrar a la plataforma" → `https://ads.visiondigital.lat`.
- Link "Ads." en el navbar y en el footer; secciones renumeradas 01–10.
- Tarjeta **Vision Digital Ads** en "Nuestros desarrollos" (primera del grid); `.projects-grid` pasó a `repeat(auto-fit, minmax(300px, 1fr))` para 3 tarjetas.
- CSS subido a `styles.css?v=13`.
- Deploy actual = copiar `index.html` y `css/styles.css` a `/opt/apps/visiondigital/landing` por `scp`.

## Estado actual
- **Rediseño v3 (2026-11-15) — estética futurista minimalista, tema oscuro.** Reemplaza por completo el tema claro v2.
  - Paleta: fondo `#05070D`, superficies glass con hairlines `rgba(255,255,255,.08)`, texto `#EDF1FA` / `#9AA4BC` / `#7C88A3`, acento `#5B8CFF` → `#22D3EE` (gradiente), verde solo para estados.
  - Tipografías: Space Grotesk (display), Inter (cuerpo), JetBrains Mono (labels, métricas, chips).
  - Fondo global fijo con malla (grid 74px enmascarada) y auroras radiales; secciones separadas por hairlines.
- **Hero asimétrico**: copy a la izquierda + panel tipo consola (`núcleo · visión digital`) con KPIs, gráfico de barras animado y log de eventos. Badge de estado con punto pulsante. Stats con divisores.
- **Servicios en bento**: grilla de 6 columnas; 10 tarjetas, la 09 (Automatización) destacada en cian y la 10 (Software) a ancho completo. La 08 pasó de "Talleres de IA" a **"Verificación de Portafolio Comercial en Meta"** (2026-11-15).
- **Copy en castellano neutro latinoamericano (2026-11-15)**: eliminado todo el voseo y modismos rioplatenses (antes "Agendá", "Escribinos", "vendés", "por vos", "letra chica", "armamos"). Segunda persona con tuteo en todo el sitio.
- **Reposicionamiento geográfico (2026-11-15)**: todo el sitio pasó de "Bolivia" a **Latinoamérica** (title, metas, JSON-LD, hero, SEO local, diferencial, FAQ, CTA y footer). Se eliminó `addressCountry: "BO"` del JSON-LD y el stat "Departamentos con presencia" pasó a "Países con presencia".
- **Nuevo bloque "Nuestros desarrollos"** dentro de `#software`: 2 tarjetas enlazadas a productos propios en producción — `visionchat.lat` (CRM de mensajería con WhatsApp Cloud API e IA) y `especialidadesclinicas.lat` (gestión académica para programas de especialización). Incluyen chip de dominio con punto de estado, tags y link externo.
- **Nueva sección "03 · Meta Tech Provider" (2026-11-15)**: declara el respaldo técnico de Meta, con 3 tarjetas (integraciones oficiales, verificación con criterio técnico, soporte por canal técnico) y una comparativa en dos columnas: "Con Visión Digital" vs "Una agencia sin respaldo técnico" (variante `.checklist--muted`). Enlace añadido al footer y `award` en el JSON-LD. No se agregó al navbar para no romper el breakpoint de 1024px.
- Secciones numeradas con eyebrow mono (`01 · Enfoque` … `09 · Siguiente paso`): Enfoque, Servicios, Meta Tech Provider, Automatización, Software, Proceso, Diferencial, FAQ, CTA.
- **Contenido ampliado**: nueva FAQ sobre propiedad del software y los datos; nota de entregas por etapa en el panel de desarrollo; copy revisado sin duplicados.
- Navbar mínima sin blur (el backdrop-filter generaba una costura visible): fondo casi opaco, link activo con IntersectionObserver, CTA duplicada adaptativa (desktop fuera del menú, mobile dentro).
- JS: barra de progreso, navbar sticky, link activo (`aria-current="location"`), menú móvil accesible (Escape, cierre al click, reset en resize), reveal con limpieza de clases y **red de seguridad** (revela lo visible a los 1.5 s), contadores animados y spotlight radial en tarjetas (solo puntero fino).
- Microinteracciones: hover lift en tarjetas, glow en iconos, marquee pausa al hover, acordeón FAQ con `+` → `×`.
- **SEO/a11y**: canonical, OG + Twitter card, JSON-LD con `serviceType`, `robots.txt` y `sitemap.xml` nuevos, skip-link, focus visible, `prefers-reduced-motion`, `<noscript>`.
- **Lighthouse (2026-11-15, local)**: Accessibility 100, Best Practices 100, SEO 100.

## Pendientes
- Verificar renderizado en dispositivos reales (iOS Safari, Android Chrome) tras el deploy.
- Evaluar imágenes reales/portafolio y testimonios verificables (hoy no hay assets ni casos públicos).
- Si se agrega formulario o analytics: política de privacidad y consentimiento.
- Posible imagen OG (`og:image`) cuando exista un asset de marca.

## Dominio y deploy
- `CNAME` contiene `visiondigital.lat` (sin `https://`, sin `www`, con salto de línea final). Verificado el 2026-11-15: correcto para GitHub Pages.
- Repo remoto: `https://github.com/camacho2901/vision_digital_web.git`, rama `main`.
- Deploy = push a `main`; GitHub Pages publica automáticamente.
- Estado del deploy del rediseño (2026-11-15): commit `85213ae` → build `built`; `http://visiondigital.lat/` responde 200 y sirve `styles.css?v=11` + `main.js?v=6`.
- **Deploy de la sección Meta Tech Provider (2026-11-15)**: commit `0c52644` → build `built`; `https://visiondigital.lat/` responde 200 y sirve `styles.css?v=12` + `main.js?v=6`. Verificado en producción: `#meta` presente ("Somos Meta Tech Provider"), 10 tarjetas de servicio, `.checklist--muted` aplicado, sin errores de consola y sin scroll horizontal.
- **Deploy de cobertura Latinoamérica (2026-11-15)**: commit `b316cb1` → build `built`; producción sirve `og:locale: es_LA`, `areaServed: Latinoamérica`, sin ocurrencias de "Bolivia" en el HTML ni en el texto renderizado, sin errores de consola y sin scroll horizontal.
- DNS verificado: apex con 4 registros `A` a `185.199.108/109/110/111.153`; `www` como `CNAME` a `camacho2901.github.io`. Correcto.
- **Incidencia TLS (resuelta en curso):** el certificado de Pages expiró el 2026-11-01 y ACME quedó en estado `bad_authz`. `https_enforced` estaba en `false` y `https://visiondigital.lat/` devolvía `SEC_E_CERT_EXPIRED`. El `CNAME` y el DNS eran correctos; no había registros CAA bloqueando.
  - Acción aplicada el 2026-11-15: se reinició el dominio con la API de Pages (quitar y volver a agregar `visiondigital.lat`). GitHub generó los commits `86b78b9` (Delete CNAME) y `92ddca4` (Create CNAME); el archivo quedó con el dominio correcto.
  - Resultado: el certificado pasó de `bad_authz` a `authorization_pending` y luego a **`approved`**, con vencimiento **2027-02-13**. Se activó **Enforce HTTPS** (`https_enforced: true`).
  - Verificación final (2026-11-15): `https://visiondigital.lat/` → 200; `www` → 301 al apex; `/robots.txt` y `/sitemap.xml` → 200; HTML sirve `styles.css?v=11` y `main.js?v=6`; build `built`.
- Si el certificado vuelve a fallar: revisar CAA en el DNS y repetir el ciclo quitar/agregar dominio.

- Checklist post-deploy:
  1. `curl -I https://visiondigital.lat/` → 200 y `content-type: text/html`.
  2. Verificar que el HTML servido referencia `css/styles.css?v=12` y `js/main.js?v=6`.
  3. Revisar consola del navegador sin errores y que el hero muestre el panel de consola.
  4. Revisar que `https://visiondigital.lat/robots.txt` y `/sitemap.xml` respondan 200.
  5. En GitHub → Settings → Pages: dominio verificado y certificado TLS activo (Enforce HTTPS).

- DNS: registro `A` del apex a las IPs de GitHub Pages (185.199.108-111.153) o `ALIAS`/`ANAME`; `www` como `CNAME` a `camacho2901.github.io`. El CNAME del repo solo declara el dominio, no configura DNS.


## Decisiones relevantes
- Tema oscuro futurista (v3) reemplaza al claro SaaS (v2): el pedido fue "futurista, moderno, tecnológico y minimalista". La profundidad se logra con hairlines, glass y gradientes, no con sombras grandes.
- Se eliminó `backdrop-filter` del navbar: sobre un fondo casi plano generaba una línea/artefacto visible en el borde. Se mantiene blur en la consola y el menú móvil.
- Hero en 2 columnas con título a 56px máx.: a 65px la frase "Marketing que vende." no cabía y el titular quedaba en 4 líneas.
- Breakpoint del menú móvil en 1024px (6 links + CTA no caben en tablets/laptops chicas).
- Cobertura pública: **Latinoamérica** (2026-11-15; antes solo "Bolivia", sin Oruro). El número de contacto sigue siendo boliviano (+591 77655674).
- Castellano neutro latinoamericano: segunda persona con tuteo ("tú"), sin voseo ni modismos rioplatenses.
- Tarjeta 08 = Verificación de Portafolio Comercial en Meta (reemplaza Talleres de IA, que no tenía demanda comprobada y competía con el resto de la oferta).
- Contacto solo por WhatsApp, con un único número oficial: **+591 77655674**. Sin backend.
- Stats: +40 empresas, 3 años, 95% satisfacción, 7 países.
- El contenido se oculta solo si hay JS activo; `<noscript>` fuerza la visibilidad.

## Archivos
- `index.html` — estructura reescrita (hero + consola, bento de servicios, secciones numeradas, FAQ ampliada, footer de 4 columnas).
- `css/styles.css` — reescrito completo, tema oscuro futurista (`?v=12`; se agregó `.checklist--muted`).
- `js/main.js` — reescrito (spotlight, IO para link activo, reveal con fallback, contadores) (`?v=6`).
- `robots.txt` — nuevo.
- `sitemap.xml` — nuevo.
- `PROGRESS.md` — este archivo.
- `CNAME` — sin cambios: `visiondigital.lat`.

## Historial de rediseños
- v1: neo-brutalista (descartado por el cliente, lo percibía "vintage 90s").
- v2 (2026-07-18): tema claro tipo SaaS, sombras multicapa, secciones Automatización y Software.
- v3 (2026-11-15): tema oscuro futurista minimalista. Reescritura completa de HTML/CSS/JS, hero con consola, bento de servicios, contenido ampliado, `robots.txt` + `sitemap.xml`, Lighthouse 100/100/100.

