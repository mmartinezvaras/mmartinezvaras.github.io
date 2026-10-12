import { Injectable, Injector, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { site } from '../data/site';

// Idioma de la web (español por defecto). Cada texto traducible es un objeto { es, en }.
// Lo que no cambia entre idiomas (nombres propios, tecnologías) puede ir como texto normal.
export type Lang = 'es' | 'en';
export type L<V = string> = { es: V; en: V };

function isPair<V>(x: V | L<V>): x is L<V> {
  return typeof x === 'object' && x !== null && 'es' in x && 'en' in x;
}

// Textos de interfaz que se repiten en varios componentes
export const ui = {
  newTab: { es: '(se abre en otra pestaña)', en: '(opens in a new tab)' },
};

// index.html ya aplica <html lang> antes de pintar (desde ?lang= o localStorage); aquí solo se lee y se cambia.
@Injectable({ providedIn: 'root' })
export class I18n {
  readonly lang = signal<Lang>(document.documentElement.lang === 'en' ? 'en' : 'es');
  // El Router se pide al usarlo: SeoTitleStrategy (creada por el Router) depende de este servicio
  private injector = inject(Injector);

  // Función flecha para poder usarla directamente en las plantillas: t = inject(I18n).t
  readonly t = <V>(x: V | L<V>): V => (isPair(x) ? x[this.lang()] : x);

  // Botón principal: el CV del idioma de la web. Secundario: el otro idioma.
  readonly cv = computed(() => {
    const en = this.lang() === 'en';
    return {
      main: {
        href: en ? site.cvEn : site.cv,
        file: en ? site.cvEnFileName : site.cvFileName,
        label: en ? 'Download CV' : 'Descargar CV',
      },
      other: {
        href: en ? site.cv : site.cvEn,
        file: en ? site.cvFileName : site.cvEnFileName,
        label: en ? 'CV en español' : 'CV in English',
        lang: en ? 'es' : 'en',
      },
    };
  });

  toggle() {
    this.set(this.lang() === 'es' ? 'en' : 'es');
  }

  set(lang: Lang) {
    this.lang.set(lang);
    document.documentElement.lang = lang;
    try {
      localStorage.setItem('lang', lang);
    } catch {}
    // Si la URL trae ?lang=, se actualiza para que al copiarla se comparta el idioma que se está viendo
    if (new URLSearchParams(location.search).has('lang')) {
      this.injector.get(Router).navigate([], { queryParams: { lang }, queryParamsHandling: 'merge', replaceUrl: true });
    }
  }
}
