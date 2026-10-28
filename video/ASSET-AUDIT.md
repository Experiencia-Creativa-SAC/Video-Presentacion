# Auditoría previa de material

Esta auditoría describe la revisión inicial del repositorio de la web. Este
repositorio independiente conserva solamente los medios seleccionados, los
originales necesarios para preparar sus derivados, el logo oficial y las fuentes.
El muestreo original de 211 medios no es el número de archivos de esta exportación.

Se revisaron la estructura del repositorio, el catálogo, el manifiesto de medios,
los scripts de importación, las carpetas públicas, las fuentes, el componente
vectorial de marca y las carpetas locales ignoradas. Se leyeron las instrucciones
AGENTS.md y las guías instaladas de estructura de Next.js. El video vive en
`video/`, fuera de las rutas de la web.

## Identidad

- Logo e isotipo oficiales: `src/components/ui/Wordmark.tsx`, con partes
  vectoriales existentes y sin redibujar. `src/config/brand.ts` contiene también
  la geometría normalizada de la X usada por la web.
- Tipografía: Poppins local, pesos 400, 500 y 600, licencia OFL existente.
- Acento: `#b7ff2a`, tomado de `src/styles/globals.css`. Negro, blanco y gris
  forman la superficie principal.
- No se encontró un QR verificable para el destino solicitado ni música local.

## Selección editorial

| Capacidad          | Material real elegido                   | Uso                                                     |
| ------------------ | --------------------------------------- | ------------------------------------------------------- |
| VR y simulación    | Intech, Flanders, Siena                 | Maquinaria, simulación e interacción con visor          |
| CGI y arquitectura | TULIA · CRESA, Siena                    | Animación exterior y visualización interior             |
| Desarrollo         | TULIA · CRESA, web interactiva          | Captura real de plataforma, con máscara y profundidad   |
| Integración        | Festi Feria, Flanders                   | Personas utilizando VR, tablet y realidad aumentada     |
| Montaje            | Siena, TULIA, Flanders, Real Estate HUB | Alternancia de interacción, render, software y espacios |

Flanders e Intech aportan el énfasis industrial. La escena exclusiva de
simulación ocupa siete segundos; la aparición industrial en capacidades y en
integración completa aproximadamente el 20–25% de la pieza. El resto muestra
arquitectura, software y experiencias generales. No se atribuye una instalación
real a un render CGI.

## Resolución

El inventario se mide con Sharp y ffprobe, no se infiere del nombre de archivo:
`npm run video:audit` genera `out/andesmin/qa/asset-inventory.json` y una hoja de
contacto de los videos a 1 y 5 segundos.

Los 19 videos existentes tienen 720 px de alto como máximo (el recorrido TULIA
tiene 700 px). Algunos son verticales o cuadrados. Las galerías son versiones
optimizadas para web. Ninguno de los 211 medios públicos cumple 3840 × 2160.
Las fotografías y el material institucional no sustituyen una grabación minera
que no existe. La X, el wordmark y los textos sí se renderizan directamente en UHD.

Se conservan `public/proyectos/` y las fuentes. La revisión solicitada prepara
seis copias de clips en `public/andesmin/video/` para retirar el crédito de
Futura Studio, sin alterar los originales. El filtro exacto de cada copia se
documenta en `provenance.json` y `scripts/andesmin-clean-media.mjs`.
`video/assets.ts` es el mapa
editable de selección. Para elevar la calidad del metraje en la entrega final,
sustituir las referencias por los másteres originales a 1080p o 4K y volver a
ejecutar los renders; la composición queda construida y renderizada con el
material real disponible.
