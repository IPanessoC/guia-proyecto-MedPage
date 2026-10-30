# Guía interactiva de tu proyecto web

Sitio estático (HTML + CSS + JS, sin compilación). Abre `index.html` o sirve la carpeta con `python3 -m http.server 8000`.

## Archivos
- `index.html`: esqueleto, formulario flotante (derecha) y selector de estilos (izquierda).
- `css/styles.css`: estilos; todo el aspecto sale de variables CSS (`--fh/--fb` tipografía, `--bg/--card/--ink/--acc...` colores, `--r/--rl/--bw/--sh` formas).
- `js/app.js`: `CONFIG`, páginas, router, carruseles, formulario y mezclador de estilos.

## Selector de estilos
Panel minimizable con pestañas Todo / Tipografía / Colores / Formas:
- **Tipografía:** 50 fuentes de Google Fonts (`FD`), agrupadas en Sans-serif, Serif y Monospace. Se cargan al abrir la pestaña o al elegirlas.
- **Colores:** 95 paletas (45 de los estilos + 50 por tipo de proyecto, `PAL`). Los roles (fondo, tarjeta, texto, acento) se asignan automáticamente por contraste con `derive5()`.
- **Formas y efectos:** 45 estilos (`STYLES`): 20 clásicos + 25 estilos de diseño (Bento, Glassmorphism, Neumorphism, Neobrutalismo, Pixel Art, Web Retro 95…). Cada uno define bordes, radios, sombras y, opcionalmente, efectos (campo 6) como variables CSS: `--surf`, `--bf` (desenfoque), `--bgi/--bgs` (fondo), `--btnbg`, `--hz/--ht/--hw/--tsh/--ls` (títulos), `--fz`, `--gap`, `--pd`, `--rot`, `--ir`.
- **Todo:** aplica uno de los 45 estilos completos (fuente + colores + forma + efectos).
Para añadir una paleta: una línea `Nombre|#fondo,#c2,#c3,#c4,#c5` en `PAL` (el primer color se usa como fondo si tiene contraste suficiente).
Para añadir una fuente: una línea `Nombre|Categoría|Uso` en `FD`.
Ocultar el selector: `CONFIG.styler=false`. La elección se guarda en el navegador y se envía con el formulario (`estilo_visual`).

## Adaptarlo a un proyecto
Edita `CONFIG` (proyecto, páginas `on:true/false`, zonas, etapas, branding). Cada página es una función en `PAGES`.

## Formspree
Reemplaza `TU_ID` en `CONFIG.formspree`. El formulario ya no sube archivos, por lo que basta el plan gratuito de Formspree; el envío funciona al alojar el sitio en tu dominio.

## Qué se envía a Formspree
Todos los campos de “Tu información”, los materiales marcados (en un solo campo), y el estilo visual elegido (el formulario incluye “Comentarios sobre el prototipo”):
`estilo_resumen`, `estilo_tipografia`, `estilo_paleta` (colores base, roles y paleta complementaria), `estilo_formas` (radios, borde, sombra desglosados), `estilo_efectos` (cada variable con su descripción), `estilo_html` (atributo `data-theme` del modo), `estilo_css` (bloque `:root{...}` con `@import` de la fuente, listo para pegar), `estilo_css_reglas` (las clases/reglas CSS del sitio que consumen esas variables) y `estilo_json` (todo estructurado).
Si el visitante escribe su correo, se envía también como `email` para poder responderle desde Formspree. “Copiar resumen” incluye lo mismo.

## Navegación con teclado
Flechas ← → cambian de página (solo entre páginas con `on:true`). Se desactivan al escribir en un campo, dentro de los paneles flotantes, con una ventana modal abierta o con teclas modificadoras. Cada página tiene además botones Anterior/Siguiente (función `Pager`).

## Imágenes y carruseles (carpeta `assets/`)
Cada contenedor de imagen del sitio es un carrusel con la cantidad de imágenes que haya en su carpeta (1, 5, 20…). Si la carpeta está vacía se muestra el recuadro “Insertar imagen”.
1. Copia las imágenes (png, jpg, webp, gif, svg, avif) a la carpeta del contenedor:
   - `assets/portada/` (Inicio) · `assets/estructura/` · `assets/contenido/` · `assets/proceso/` · `assets/branding/` · `assets/prototipo/`
   - `assets/zona-nav|header|body|footer|modal|anim/` (referencia de cada zona en la página Estructura)
2. Ejecuta `python3 tools/build-assets.py`. Genera `assets/manifest.js` (el sitio lo carga con una etiqueta `<script>`, así funciona también abriendo `index.html` directamente).
3. El orden es alfabético/numérico: nombra `01-inicio.png`, `02-servicios.png`… El texto bajo cada imagen sale del nombre del archivo (sin número ni extensión).
Para un contenedor nuevo: usa `Carousel("mi-carpeta","descripción")` en una página y crea `assets/mi-carpeta/`.
Las 3 imágenes de `assets/prototipo/` son de ejemplo: bórralas y vuelve a ejecutar el script.

## Modo claro / oscuro
Botón ☾/☀ en la barra de navegación y selector Automático / Claro / Oscuro en el panel de estilos. Cada paleta tiene su **complementaria** (clara si la principal es oscura, y viceversa), generada automáticamente conservando el tono (`comp()` en `js/app.js`); en las listas de colores se muestra a la derecha de las muestras. Sin paleta elegida, el modo cambia los colores base del sitio. Automático sigue la preferencia del sistema.
Para añadir un estilo de diseño: agrega una fila a `STYLES` (`[nombre, fuente, 3 colores principales, 3 secundarios, forma, efectos, descripción, grupo]`). Usa variables (`var(--acc)`, `color-mix(...)`) en los efectos para que funcionen en ambos modos.

## Datos guardados en el navegador
El borrador del formulario (`guia-borrador`) y el estilo visual (`guia-estilo3`) se guardan en `localStorage`. Tras un envío exitoso a Formspree, `clearSaved()` borra ambos, vacía el formulario y deja el sitio con el estilo que se estaba viendo (solo en esa sesión). Si el envío falla o se usa “Copiar resumen”, no se borra nada.

## Visor ampliado con zoom
Al hacer clic (o Enter) en cualquier imagen de un carrusel se abre una ventana modal (`#lb`) con la imagen grande. Zoom de 100 % a 800 %: botones − / +, rueda del ratón, pellizco en pantallas táctiles, doble clic o doble toque (100 % ↔ 250 %) y teclas `+`, `-`, `0`. Con zoom, se mueve arrastrando. Si el carrusel tiene varias imágenes, se navega con ‹ › o las flechas del teclado; Esc o ✕ cierran. Lógica en `js/app.js` (`openLightbox`, `lbZoom`).
