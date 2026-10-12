import { DOCUMENT, Injectable, effect, inject, untracked } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { I18n, L } from './i18n';

const SITE = 'Marcos María Martínez Varas';
const ORIGIN = 'https://mmartinezvaras.github.io';

const description: L = {
  es: 'Portfolio de Marcos María Martínez Varas, Junior Data Engineer en Madrid. Proyectos de IA generativa (RAG con LangChain), machine learning con scikit-learn y Big Data.',
  en: 'Portfolio of Marcos María Martínez Varas, Junior Data Engineer based in Madrid. Generative AI (RAG with LangChain), machine learning with scikit-learn and Big Data projects.',
};
const notFound: L = { es: 'Proyecto no encontrado', en: 'Project not found' };

// Título distinto en cada ruta (data.title de app.routes.ts, o el nombre del proyecto en el detalle)
// y metadatos coherentes con él: canonical, og:url, og:title y description. Se recalcula al cambiar de idioma.
@Injectable({ providedIn: 'root' })
export class SeoTitleStrategy extends TitleStrategy {
  private title = inject(Title);
  private meta = inject(Meta);
  private doc = inject(DOCUMENT);
  private i18n = inject(I18n);
  private snapshot?: RouterStateSnapshot;

  constructor() {
    super();
    effect(() => {
      this.i18n.lang();
      untracked(() => this.apply());
    });
  }

  override updateTitle(snapshot: RouterStateSnapshot) {
    this.snapshot = snapshot;
    this.apply();
  }

  private async apply() {
    const snapshot = this.snapshot;
    if (!snapshot) return;
    const t = this.i18n.t;

    let route = snapshot.root;
    while (route.firstChild) route = route.firstChild;
    let page = route.data['title'] ? t(route.data['title'] as L) : '';
    const slug = route.paramMap.get('slug');
    if (slug) {
      // Import dinámico para que los datos de proyectos sigan fuera del bundle inicial
      const { projects } = await import('../data/projects');
      if (snapshot !== this.snapshot) return; // ya se ha navegado a otra página
      const p = projects.find((x) => x.slug === slug);
      page = p ? t(p.name) : t(notFound);
    }

    const full = page ? `${page} · ${SITE}` : `${SITE} · Junior Data Engineer`;
    this.title.setTitle(full);

    // Con barra final: es la URL que GitHub Pages sirve con 200 (sin ella responde 301)
    const path = snapshot.url.split(/[?#]/)[0];
    const url = ORIGIN + (path.endsWith('/') ? path : path + '/');
    this.meta.updateTag({ name: 'description', content: t(description) });
    this.meta.updateTag({ property: 'og:title', content: full });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:locale', content: this.i18n.lang() === 'en' ? 'en_GB' : 'es_ES' });
    this.doc.querySelector('link[rel="canonical"]')?.setAttribute('href', url);
  }
}
