# PROGRESS — Visión Digital (web)

Landing page estática de Visión Digital (agencia de marketing digital e IA, Oruro, Bolivia).
Hosting: GitHub Pages con dominio `visiondigital.lat` (CNAME).
Stack: HTML + CSS + JS vanilla, sin build ni dependencias locales (Google Fonts y Font Awesome vía CDN).

## Estado actual
- Rediseño completo con tema claro neo-brutalista: fondo crema `#FAF6EF`, tinta `#101226`, acento cobalto `#2B3AEF`, ámbar `#FFC633`, bordes 2px y sombras duras (hard shadows).
- Tipografías: Bricolage Grotesque (display) + Archivo (cuerpo).
- Contenido reescrito y ampliado con ortografía correcta (tildes y ñ): hero editorial con stickers, marquee de servicios, propuesta de valor, 9 servicios con tags de entregables, sección "Por qué", timeline de proceso con tiempos, FAQ (5 preguntas con `<details>`), CTA final y footer de 3 columnas.
- Nueva sección "Automatización de Procesos" (`#automatizacion`): panel oscuro de alto contraste con flujo Capta→Procesa→Responde→Reporta, 6 tarjetas de casos, 3 métricas y CTA propio. Enlazada desde navbar y desde la tarjeta destacada de servicios (09).
- Nueva sección "Desarrollo de Software a Medida" (`#software`): 6 tarjetas de oferta (web, gestión, e-commerce, apps, integraciones, dashboards), etapas del proyecto, lista de "incluye", chips de tecnologías y CTA. Card 10 destacada (cobalto, ancho completo) en la grilla de servicios enlaza a la sección. Links en navbar y footer.
- Fixes de visualización (2026-07-18): menú hamburguesa desde 1024px (el navbar con 6 links + CTA desbordaba en laptops/tablets), marquee con `scale(1.04)` en vez de `104vw` (eliminaba scroll horizontal en iOS), `overflow-x: hidden` como fallback de `clip`, tamaños fallback antes de cada `clamp()`, `<noscript>` para las animaciones reveal y cache-busting `?v=3` en CSS/JS.
- Dirección pública: solo "Bolivia" (se quitó "Oruro" de meta description, JSON-LD, sticker, FAQ, CTA y footer).
- SEO/a11y: canonical, Open Graph, JSON-LD (ProfessionalService), skip-link, `aria-expanded` en menú móvil, `prefers-reduced-motion`, focus visible.
- JS: barra de progreso, navbar sticky, link activo, menú móvil accesible, reveal con IntersectionObserver (limpia clases al terminar para no romper hovers), contadores animados. Se eliminaron parallax, tilt y partículas del diseño anterior.

## Pendientes
- Verificar renderizado real en navegador (desktop y móvil) tras el deploy de GitHub Pages.
- Evaluar agregar imágenes reales/portafolio y testimonios verificables.
- Posible página de política de privacidad si se agrega formulario o analytics.

## Decisiones relevantes
- Tema claro con sombras duras y contrastes pronunciados por pedido del cliente (2026-07-18); se descartó el tema oscuro anterior.
- La sección de Automatización usa fondo oscuro (tinta) dentro de la página clara para máximo contraste visual; es el servicio que se quiere destacar.
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
