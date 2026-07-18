# PROGRESS — Visión Digital (web)

Landing page estática de Visión Digital (agencia de marketing digital e IA, Oruro, Bolivia).
Hosting: GitHub Pages con dominio `visiondigital.lat` (CNAME).
Stack: HTML + CSS + JS vanilla, sin build ni dependencias locales (Google Fonts y Font Awesome vía CDN).

## Estado actual
- Rediseño completo con tema claro neo-brutalista: fondo crema `#FAF6EF`, tinta `#101226`, acento cobalto `#2B3AEF`, ámbar `#FFC633`, bordes 2px y sombras duras (hard shadows).
- Tipografías: Bricolage Grotesque (display) + Archivo (cuerpo).
- Contenido reescrito y ampliado con ortografía correcta (tildes y ñ): hero editorial con stickers, marquee de servicios, propuesta de valor, 9 servicios con tags de entregables, sección "Por qué", timeline de proceso con tiempos, FAQ (5 preguntas con `<details>`), CTA final y footer de 3 columnas.
- Nueva sección "Automatización de Procesos" (`#automatizacion`): panel oscuro de alto contraste con flujo Capta→Procesa→Responde→Reporta, 6 tarjetas de casos, 3 métricas y CTA propio. Enlazada desde navbar y desde la tarjeta destacada de servicios (09).
- SEO/a11y: canonical, Open Graph, JSON-LD (ProfessionalService), skip-link, `aria-expanded` en menú móvil, `prefers-reduced-motion`, focus visible.
- JS: barra de progreso, navbar sticky, link activo, menú móvil accesible, reveal con IntersectionObserver (limpia clases al terminar para no romper hovers), contadores animados. Se eliminaron parallax, tilt y partículas del diseño anterior.

## Pendientes
- Verificar renderizado real en navegador (desktop y móvil) tras el deploy de GitHub Pages.
- Evaluar agregar imágenes reales/portafolio y testimonios verificables.
- Posible página de política de privacidad si se agrega formulario o analytics.

## Decisiones relevantes
- Tema claro con sombras duras y contrastes pronunciados por pedido del cliente (2026-07-18); se descartó el tema oscuro anterior.
- La sección de Automatización usa fondo oscuro (tinta) dentro de la página clara para máximo contraste visual; es el servicio que se quiere destacar.
- Voseo en el copy ("agendá", "escribinos") consistente con la versión previa del sitio.
- Contacto solo por WhatsApp (+591 69877877 / +591 69597358), sin formularios ni backend.
- Stats mostradas: +40 empresas, 3 años, 95% satisfacción, 7 departamentos (provienen del contenido original).

## Archivos
- `index.html` — reescrito (estructura, contenido y sección de automatización).
- `css/styles.css` — reescrito (tema claro brutalista, responsive 1024/900/768/480, reduced motion).
- `js/main.js` — reescrito (se quitaron parallax/tilt/partículas; menú accesible y reveal con limpieza).
- `PROGRESS.md` — creado (este archivo).
- `CNAME` — sin cambios (`visiondigital.lat`).
