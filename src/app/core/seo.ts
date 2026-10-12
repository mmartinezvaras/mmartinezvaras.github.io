import { DOCUMENT, Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';

const SITE = 'Marcos María Martínez Varas';
const ORIGIN = 'https://mmartinezvaras.github.io';

// Título distinto en cada ruta (propiedad `title` de app.routes.ts) y metadatos
// coherentes con él: canonical, og:url y og:title.
@Injectable({ providedIn: 'root' })
export class SeoTitleStrategy extends TitleStrategy {
  private title = inject(Title);
  private meta = inject(Meta);
  private doc = inject(DOCUMENT);

  override updateTitle(snapshot: RouterStateSnapshot) {
    const page = this.buildTitle(snapshot);
    const full = page ? `${page} · ${SITE}` : `${SITE} · Junior Data Engineer`;
    this.title.setTitle(full);

    // Con barra final: es la URL que GitHub Pages sirve con 200 (sin ella responde 301)
    const path = snapshot.url.split(/[?#]/)[0];
    const url = ORIGIN + (path.endsWith('/') ? path : path + '/');
    this.meta.updateTag({ property: 'og:title', content: full });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.doc.querySelector('link[rel="canonical"]')?.setAttribute('href', url);
  }
}
