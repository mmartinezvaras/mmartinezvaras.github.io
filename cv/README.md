# CV

Fuente editable del CV en HTML + CSS imprimible (A4, una columna, texto real para que lo lean los ATS).

| Archivo | Qué es |
|---|---|
| `cv.es.html` | CV en español |
| `cv.en.html` | CV en inglés |
| `cv.css` | Estilos compartidos (verde de títulos, líneas finas, tamaños) |
| `fonts/` | Inter y JetBrains Mono (licencia OFL), para que el PDF salga igual en cualquier máquina |
| `build.mjs` | Genera los PDF con Chrome o Edge en modo headless |

## Regenerar los PDF

```bash
npm run cv
```

Genera cuatro archivos y falla si alguno no ocupa exactamente una página:

- `public/Marcos_Maria_Martinez_Varas_BigData_IA.pdf` y `public/Marcos_Maria_Martinez_Varas_BigData_IA_EN.pdf`: los que enlaza la web, **sin teléfono**.
- `cv/out/…`: las mismas versiones **con teléfono**, para enviarlas a mano o subirlas a portales de empleo. `cv/out/` está en `.gitignore` y no se publica.

Si no encuentra el navegador: `CHROME_PATH="/ruta/a/chrome" npm run cv`.

## Editar

- Cambia el texto en los dos HTML a la vez para que no se desincronicen.
- El teléfono va dentro de `<span class="phone">`: solo se muestra con `?private`.
- Certificaciones: la sección está preparada pero oculta (`hidden`). Quita el atributo y añade un `<li>` por certificado.
- Para ver el resultado mientras editas, abre el HTML en el navegador (añade `?private` para ver el teléfono).

## Comprobar el texto

```bash
pdftotext -enc UTF-8 public/Marcos_Maria_Martinez_Varas_BigData_IA.pdf -
```
