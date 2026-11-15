# PROGRESS — Visión Digital (web)

Landing page estática de Visión Digital (agencia de marketing digital e IA, Bolivia).
Hosting: GitHub Pages con dominio `visiondigital.lat` (CNAME).
Stack: HTML + CSS + JS vanilla, sin build ni dependencias locales (Google Fonts y Font Awesome vía CDN).

## Estado actual
- **Rediseño v3 (2026-11-15) — estética futurista minimalista, tema oscuro.** Reemplaza por completo el tema claro v2.
  - Paleta: fondo `#05070D`, superficies glass con hairlines `rgba(255,255,255,.08)`, texto `#EDF1FA` / `#9AA4BC` / `#7C88A3`, acento `#5B8CFF` → `#22D3EE` (gradiente), verde solo para estados.
  - Tipografías: Space Grotesk (display), Inter (cuerpo), JetBrains Mono (labels, métricas, chips).
  - Fondo global fijo con malla (grid 74px enmascarada) y auroras radiales; secciones separadas por hairlines.
- **Hero asimétrico**: copy a la izquierda + panel tipo consola (`núcleo · visión digital`) con KPIs, gráfico de barras animado y log de eventos. Badge de estado con punto pulsante. Stats con divisores.
- **Servicios en bento**: grilla de 6 columnas; 10 tarjetas, la 09 (Automatización) destacada en cian y la 10 (Software) a ancho completo.
- Secciones numeradas con eyebrow mono (`01 · Enfoque` … `08 · Siguiente paso`): Enfoque, Servicios, Automatización, Software, Proceso, Diferencial, FAQ, CTA.
- **Contenido ampliado**: nueva FAQ sobre propiedad del software y los datos; nota de entregas por etapa en el panel de desarrollo; copy revisado sin duplicados.
- Navbar mínima sin blur (el backdrop-filter generaba una costura visible): fondo casi opaco, link activo con IntersectionObserver, CTA duplicada adaptativa (desktop fuera del menú, mobile dentro).
- JS: barra de progreso, navbar sticky, link activo (`aria-current="location"`), menú móvil accesible (Escape, cierre al click, reset en resize), reveal con limpieza de clases y **red de seguridad** (revela lo visible a los 1.5 s), contadores animados y spotlight radial en tarjetas (solo puntero fino).
- Microinteracciones: hover lift en tarjetas, glow en iconos, marquee pausa al hover, acordeón FAQ con `+` → `×`.
- **SEO/a11y**: canonical, OG + Twitter card, JSON-LD con `serviceType`, `robots.txt` y `sitemap.xml` nuevos, skip-link, focus visible, `prefers-reduced-motion`, `<noscript>`.
- **Lighthouse (build actual)**: Accessibility 100, Best Practices 100, SEO 100.

## Pendientes
- Verificar renderizado en dispositivos reales (iOS Safari, Android Chrome) tras el deploy.
- Evaluar imágenes reales/portafolio y testimonios verificables (hoy no hay assets ni casos públicos).
- Si se agrega formulario o analytics: política de privacidad y consentimiento.
- Posible imagen OG (`og:image`) cuando exista un asset de marca.

## Dominio y deploy
- `CNAME` contiene `visiondigital.lat` (sin `https://`, sin `www`, con salto de línea final). Verificado el 2026-11-15: correcto para GitHub Pages.
- Repo remoto: `https://github.com/camacho2901/vision_digital_web.git`, rama `main`.
- Deploy = push a `main`; GitHub Pages publica automáticamente.
- Checklist post-deploy:
  1. `curl -I https://visiondigital.lat/` → 200 y `content-type: text/html`.
  2. Verificar que el HTML servido referencia `css/styles.css?v=10` y `js/main.js?v=6`.
  3. Revisar consola del navegador sin errores y que el hero muestre el panel de consola.
  4. Revisar que `https://visiondigital.lat/robots.txt` y `/sitemap.xml` respondan 200.
  5. En GitHub → Settings → Pages: dominio verificado y certificado TLS activo (Enforce HTTPS).
- DNS: registro `A` del apex a las IPs de GitHub Pages (185.199.108-111.153) o `ALIAS`/`ANAME`; `www` como `CNAME` a `camacho2901.github.io`. El CNAME del repo solo declara el dominio, no configura DNS.


## Decisiones relevantes
- Tema oscuro futurista (v3) reemplaza al claro SaaS (v2): el pedido fue "futurista, moderno, tecnológico y minimalista". La profundidad se logra con hairlines, glass y gradientes, no con sombras grandes.
- Se eliminó `backdrop-filter` del navbar: sobre un fondo casi plano generaba una línea/artefacto visible en el borde. Se mantiene blur en la consola y el menú móvil.
- Hero en 2 columnas con título a 56px máx.: a 65px la frase "Marketing que vende." no cabía y el titular quedaba en 4 líneas.
- Breakpoint del menú móvil en 1024px (6 links + CTA no caben en tablets/laptops chicas).
- Ubicación pública: solo "Bolivia" (sin Oruro).
- Voseo consistente ("agendá", "escribinos").
- Contacto solo por WhatsApp (+591 69877877 / +591 69597358), sin backend.
- Stats: +40 empresas, 3 años, 95% satisfacción, 7 departamentos.
- El contenido se oculta solo si hay JS activo; `<noscript>` fuerza la visibilidad.

## Archivos
- `index.html` — estructura reescrita (hero + consola, bento de servicios, secciones numeradas, FAQ ampliada, footer de 4 columnas).
- `css/styles.css` — reescrito completo, tema oscuro futurista (`?v=10`).
- `js/main.js` — reescrito (spotlight, IO para link activo, reveal con fallback, contadores) (`?v=6`).
- `robots.txt` — nuevo.
- `sitemap.xml` — nuevo.
- `PROGRESS.md` — este archivo.
- `CNAME` — sin cambios: `visiondigital.lat`.

## Historial de rediseños
- v1: neo-brutalista (descartado por el cliente, lo percibía "vintage 90s").
- v2 (2026-07-18): tema claro tipo SaaS, sombras multicapa, secciones Automatización y Software.
- v3 (2026-11-15): tema oscuro futurista minimalista. Reescritura completa de HTML/CSS/JS, hero con consola, bento de servicios, contenido ampliado, `robots.txt` + `sitemap.xml`, Lighthouse 100/100/100.

