# Validación

La revisión aprobada incluye tres MP4 H.264, Rec.709, YUV 4:2:0, 30 fps y
1650 fotogramas (55 segundos). Se decodificaron íntegramente sin errores.

Se revisaron 45 fotogramas de las nueve escenas, las ocho transiciones, la
construcción de píxeles y el cierre. El primer y último PNG son idénticos.
Los logs de navegador de los renders finales no contienen errores.

Los resultados de la entrega están en [`docs/validation.json`](../docs/validation.json).
Los MP4 aprobados están en `deliverables/`. Los nuevos renders y controles
se generan en `out/andesmin/`, sin reemplazar automáticamente esa entrega.

`npm run check` valida el TypeScript, ESLint y las referencias locales a medios
y fuentes de este repositorio independiente. Las comprobaciones audiovisuales
se ejecutan con los comandos del README principal. No se ha probado el televisor
físico; activa la repetición continua en su reproductor.
