# PROGRESS — Visión Digital (web)

Landing page estática de Visión Digital (agencia de marketing digital e IA, Oruro, Bolivia).
Hosting: GitHub Pages con dominio `visiondigital.lat` (CNAME).
Stack: HTML + CSS + JS vanilla, sin build ni dependencias locales (Google Fonts y Font Awesome vía CDN).

## Estado actual
- Rediseño (v2, 2026-07-18) con tema claro moderno/tecnológico tipo SaaS: fondo `#F6F8FC`, navy `#0B1230`, degradado azul `#1D4ED8→#2E8CFF` y cian `#00D4FF` como acentos, sombras suaves multicapa pronunciadas, tarjetas con borde 1px + lift en hover, glass/blur en navbar, stickers y tarjetas de la sección oscura, orbes de luz difuminados de fondo.
- Tipografías: Sora (display) + Manrope (cuerpo). Se descartó el estilo neo-brutalista (v1) por pedido del cliente: lo percibía "vintage 90s"; ahora el look es profesional y uniforme (headers de sección centrados, radios y sombras consistentes).
- Contenido reescrito y ampliado con ortografía correcta (tildes y ñ): hero editorial con stickers, marquee de servicios, propuesta de valor, 9 servicios con tags de entregables, sección "Por qué", timeline de proceso con tiempos, FAQ (5 preguntas con `<details>`), CTA final y footer de 3 columnas.
- Nueva sección "Automatización de Procesos" (`#automatizacion`): panel oscuro de alto contraste con flujo Capta→Procesa→Responde→Reporta, 6 tarjetas de casos, 3 métricas y CTA propio. Enlazada desde navbar y desde la tarjeta destacada de servicios (09).
- Nueva sección "Desarrollo de Software a Medida" (`#software`): 6 tarjetas de oferta (web, gestión, e-commerce, apps, integraciones, dashboards), etapas del proyecto, lista de "incluye", chips de tecnologías y CTA. Card 10 destacada (cobalto, ancho completo) en la grilla de servicios enlaza a la sección. Links en navbar y footer.
- Fixes de visualización (2026-07-18): menú hamburguesa desde 1024px (el navbar con 6 links + CTA desbordaba en laptops/tablets), marquee sin overflow horizontal, `overflow-x: hidden` como fallback de `clip`, tamaños fallback antes de cada `clamp()`, `<noscript>` para las animaciones reveal y cache-busting (`?v=4` actual) en CSS/JS.
- Dirección pública: solo "Bolivia" (se quitó "Oruro" de meta description, JSON-LD, sticker, FAQ, CTA y footer).
- Revisión anti-duplicados (2026-07-18): hero-proof ya no repite las stats de "Por qué" (ahora 24 h de respuesta / 10 servicios / 1 equipo); sticker "+40 marcas" eliminado; frases únicas por sección ("sin letra chica", "no con intuición", "planillas", "24/7", "sin compromiso" aparecen 1 sola vez); chatbots, integraciones y reportes diferenciados por sección; resuelta contradicción 7 vs 9 departamentos (FAQ ahora dice "todo el país").
- SEO/a11y: canonical, Open Graph, JSON-LD (ProfessionalService), skip-link, `aria-expanded` en menú móvil, `prefers-reduced-motion`, focus visible.
- JS: barra de progreso, navbar sticky, link activo, menú móvil accesible, reveal con IntersectionObserver (limpia clases al terminar para no romper hovers), contadores animados. Se eliminaron parallax, tilt y partículas del diseño anterior.

## Pendientes
- Verificar renderizado real en navegador (desktop y móvil) tras el deploy de GitHub Pages.
- Evaluar agregar imágenes reales/portafolio y testimonios verificables.
- Posible página de política de privacidad si se agrega formulario o analytics.

## Decisiones relevantes
- Estética "moderna/tecnológica" (v2) reemplaza a la neo-brutalista (v1): el cliente quiere look profesional, uniforme, con sombras y contrastes; se logran con sombras multicapa, secciones alternadas claro/oscuro y degradados azul/cian.
- Los nombres de clases del HTML se mantuvieron entre v1 y v2 (`.hl`, `.btn-amber`, `.card-icon--dark`, etc.) aunque su estilo cambió; evita tocar HTML/JS al re-tematizar.
- El breakpoint del menú móvil es 1024px (no 768px): con 6 links + CTA el navbar no cabe en anchos intermedios.
- Por pedido del cliente, la ubicación pública es solo "Bolivia" (sin mención a Oruro).
- Voseo en el copy ("agendá", "escribinos") consistente con la versión previa del sitio.
- Contacto solo por WhatsApp (+591 69877877 / +591 69597358), sin formularios ni backend.
- Stats mostradas: +40 empresas, 3 años, 95% satisfacción, 7 departamentos (provienen del contenido original).

## Archivos
- `index.html` — reescrito; incluye secciones de automatización y software a medida, dirección solo Bolivia.
- `css/styles.css` — reescrito (tema claro brutalista); fixes responsive y estilos de software.
- `js/main.js` — reescrito (se quitaron parallax/tilt/partículas; menú accesible y reveal con limpieza).
- `PROGRESS.md` — memoria del proyecto.
- `CNAME` — sin cambios (`visiondigital.lat`).
