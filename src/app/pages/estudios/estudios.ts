import { Component, inject } from '@angular/core';
import { I18n } from '../../core/i18n';
import { Reveal } from '../../core/reveal';
import { site } from '../../data/site';

@Component({
  selector: 'app-estudios',
  imports: [Reveal],
  template: `
    <section class="wrap pt-12 sm:pt-24">
      <p appReveal class="eyebrow">{{ t(text.eyebrow) }}</p>
      <h1 appReveal class="display mt-3 max-w-[12ch]" style="--i: 1">{{ t(text.title) }}</h1>
    </section>

    <section class="wrap mt-14 sm:mt-20" aria-labelledby="experiencia">
      <h2 appReveal id="experiencia" class="text-[clamp(1.75rem,5vw,3rem)]">{{ t(text.experience) }}</h2>
      <ol class="mt-8">
        @for (job of site.experience; track job.company) {
          <li appReveal class="timeline-item">
            <p class="text-sm text-muted">{{ job.period }}</p>
            <h3 class="mt-1 text-2xl">{{ job.company }}</h3>
            <p class="mt-1 font-medium">{{ t(job.title) }}</p>
            <p class="mt-2 max-w-2xl text-muted">{{ t(job.text) }}</p>
          </li>
        }
      </ol>
    </section>

    <section class="wrap mt-14 sm:mt-20" aria-labelledby="formacion">
      <h2 appReveal id="formacion" class="text-[clamp(1.75rem,5vw,3rem)]">{{ t(text.education) }}</h2>
      <ol class="mt-8">
        @for (item of site.education; track item.center) {
          <li appReveal class="timeline-item" [attr.data-current]="item.current">
            <p class="text-sm text-muted">{{ item.period }}@if (item.current) { · <span class="font-semibold text-fg">{{ t(text.current) }}</span>}</p>
            <h3 class="mt-1 text-2xl">{{ t(item.title) }}</h3>
            <p class="mt-1 text-muted">{{ item.center }}</p>
          </li>
        }
      </ol>
    </section>

    <section class="wrap mt-14 grid gap-3 sm:mt-20 md:grid-flow-col md:auto-cols-fr md:gap-5">
      <div appReveal class="panel px-6 py-7 sm:p-8">
        <h2 class="text-2xl">{{ t(text.languages) }}</h2>
        <ul class="mt-4">
          @for (lang of site.languages; track $index) {
            <li class="flex items-baseline justify-between gap-4 border-t py-3">
              <span>{{ t(lang.name) }}</span>
              <span class="text-muted">{{ t(lang.level) }}</span>
            </li>
          }
        </ul>
      </div>
      <!-- Solo aparece cuando hay alguna certificación en site.ts -->
      @if (site.certifications.length) {
        <div appReveal class="panel px-6 py-7 sm:p-8" style="--i: 1">
          <h2 class="text-2xl">{{ t(text.certifications) }}</h2>
          <ul class="mt-4">
            @for (c of site.certifications; track $index) {
              <li class="border-t py-3">{{ t(c.title) }} <span class="text-muted">· {{ c.issuer }} · {{ c.year }}</span></li>
            }
          </ul>
        </div>
      }
    </section>
  `
})
export default class Estudios {
  site = site;
  t = inject(I18n).t;
  text = {
    eyebrow: { es: 'Trayectoria', en: 'Background' },
    title: { es: 'Formación y experiencia.', en: 'Education and experience.' },
    experience: { es: 'Experiencia.', en: 'Experience.' },
    education: { es: 'Formación.', en: 'Education.' },
    current: { es: 'En curso', en: 'In progress' },
    languages: { es: 'Idiomas', en: 'Languages' },
    certifications: { es: 'Certificaciones', en: 'Certifications' },
  };
}
