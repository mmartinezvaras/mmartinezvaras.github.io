# Portfolio · Marcos María Martínez Varas

Portfolio personal hecho con Angular 22 y Tailwind CSS 4. Se publica en GitHub Pages con el workflow de `.github/workflows/deploy.yml`.

## Arrancar en local

```bash
npm install
npm start          # http://localhost:4200
npm run build      # genera dist/web
npm test           # tests con Vitest
```

Para probarlo en el móvil, arranca con `npx ng serve --host 0.0.0.0` y abre `http://<IP-de-tu-PC>:4200` desde el teléfono, conectado a la misma red wifi.

## Dónde está cada cosa

| Qué | Archivo |
| --- | --- |
| Datos personales, formación, experiencia, skills | `src/app/data/site.ts` |
| Proyectos | `src/app/data/projects.ts` |
| Notas del Lab | `src/app/data/notes.ts` |
| Colores, tipografía, botones, tarjetas, animaciones | `src/styles.css` |
| Cabecera, barra de pestañas (móvil) y pie | `src/app/core/layout/` |
| Páginas | `src/app/pages/` |
| CV descargable | `public/Marcos_Maria_Martinez_Varas_BigData_IA.pdf` y `..._EN.pdf` (fuente en `cv/`; si cambias el nombre, actualiza `cv` y `cvEn` en `site.ts`) |
| Idioma (ES/EN) | `src/app/core/i18n.ts` |

## Idiomas

La web está en español e inglés. Español por defecto; el botón ES/EN de la cabecera cambia el idioma y la elección se recuerda. Para compartir directamente la versión en inglés: `https://mmartinezvaras.github.io/inicio/?lang=en`.

Cada texto visible va en los dos idiomas como `{ es: '...', en: '...' }` (en las listas, una lista por idioma: `{ es: [...], en: [...] }`). Lo que no cambia entre idiomas (nombres propios, tecnologías, enlaces) puede ir como texto normal.

## Añadir un proyecto

No hay que tocar ningún componente:

1. Abre `src/app/data/projects.ts`.
2. Copia un bloque `{ ... }` de la lista `projects` y pégalo donde quieras que aparezca (el orden de la lista es el orden en la web).
3. Cambia sus datos, en español y en inglés, escribiendo para alguien que no es técnico (por ejemplo, un reclutador):
   - `slug`: identificador para la URL (`/proyectos/mi-proyecto`), en minúsculas y con guiones.
   - `name`: nombre corto del proyecto.
   - `area`: una de `IA generativa`, `Big Data`, `IA y ML` o `Desarrollo` (es el filtro de la página).
   - `problem`: el problema real en una frase sencilla. Es el titular.
   - `impact`: qué consigue. `value` es corto y llamativo ("1 de cada 2") y es lo único que sale en azul; `label` lo explica. No pongas cifras que no hayas medido.
   - `how`: cómo funciona, en lenguaje llano.
   - `tech`: detalles técnicos (salen plegados en la página del proyecto). Explica cada término.
   - `stack`, `repo` y, si tienes, `demo`.
4. Solo un proyecto lleva `featured: true`: es el que sale en grande.
5. `npm run build` para comprobar que no hay errores.

