import { Component, inject } from '@angular/core';
import { I18n } from '../../core/i18n';
import { Reveal } from '../../core/reveal';
import { site } from '../../data/site';

@Component({
  selector: 'app-skills',
  imports: [Reveal],
  template: `
    <section class="wrap pt-12 sm:pt-24">
      <p appReveal class="eyebrow">Skills</p>
      <h1 appReveal class="display mt-3" style="--i: 1">{{ t(text.title) }}</h1>
      <p appReveal class="lead mt-5 max-w-2xl" style="--i: 2">{{ t(text.lead) }}</p>

      <div class="mt-12 grid gap-3 md:grid-cols-2 md:gap-5">
        @for (group of site.skills; track $index; let i = $index) {
          <section appReveal class="panel px-6 py-7 sm:p-8" [style.--i]="i % 2">
            <h2 class="text-2xl">{{ t(group.category) }}</h2>
            <ul class="mt-5 flex flex-wrap gap-2">
              @for (item of group.items; track $index) {
                <li class="rounded-full bg-bg px-3.5 py-1.5 text-[0.9375rem]">
                  {{ t(item.name) }}
                  @if (item.learning) {
                    <span class="ml-1 text-sm text-muted">· {{ t(text.learning) }}</span>
                  }
                </li>
              }
            </ul>
          </section>
        }
      </div>
    </section>
  `
})
export default class Skills {
  site = site;
  t = inject(I18n).t;
  text = {
    title: { es: 'Lo que uso.', en: 'What I use.' },
    lead: {
      es: 'Sin barras de porcentaje: lo que he usado en proyectos reales y lo que estoy aprendiendo ahora.',
      en: "No percentage bars: what I've used in real projects and what I'm learning right now.",
    },
    learning: { es: 'aprendiendo', en: 'learning' },
  };
}
