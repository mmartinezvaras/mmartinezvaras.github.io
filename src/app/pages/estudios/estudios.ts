import { Component, inject } from '@angular/core';
import { I18n, ui } from '../../core/i18n';
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

    <!-- Certificaciones: sección propia con rejilla, crece sin descuadrar nada.
         Solo aparece cuando hay alguna en site.ts (ordenadas de la más reciente a la más antigua). -->
    @if (site.certifications.length) {
      <section class="wrap mt-14 sm:mt-20" aria-labelledby="certificaciones">
        <h2 appReveal id="certificaciones" class="text-[clamp(1.75rem,5vw,3rem)]">{{ t(text.certifications) }}</h2>
        <ul class="mt-8 grid gap-3 sm:grid-cols-2 md:gap-5 lg:grid-cols-3">
          @for (c of site.certifications; track $index) {
            <li appReveal [style.--i]="$index">
              <!-- Fila compacta: insignia a la izquierda, texto a la derecha; toda la tarjeta enlaza a Credly -->
              <article [class]="c.url ? 'card' : 'panel'" class="flex h-full items-center gap-5 py-5 pl-5 pr-10">
                @if (c.image) {
                  <img class="size-[72px] flex-none rounded-xl" [src]="c.image" alt="" width="72" height="72" loading="lazy" decoding="async" />
                }
                <div class="min-w-0">
                  <h3 class="text-[1.0625rem] font-semibold leading-snug">
                    @if (c.url) {
                      <a class="stretched" [href]="c.url" target="_blank" rel="noopener">
                        {{ t(c.title) }}<span class="sr-only"> · {{ t(text.credential) }} {{ t(ui.newTab) }}</span>
                      </a>
                    } @else {
                      {{ t(c.title) }}
                    }
                  </h3>
                  <p class="mt-1 text-sm text-muted">{{ c.issuer }} · {{ t(c.year) }}</p>
                </div>
                @if (c.url) {
                  <span class="cert-arrow" aria-hidden="true">↗</span>
                }
              </article>
            </li>
          }
        </ul>
      </section>
    }

    <section class="wrap mt-14 sm:mt-20" aria-labelledby="idiomas">
      <h2 appReveal id="idiomas" class="text-[clamp(1.75rem,5vw,3rem)]">{{ t(text.languages) }}</h2>
      <ul class="mt-8 grid gap-3 sm:grid-cols-2 md:gap-5 lg:grid-cols-3">
        @for (lang of site.languages; track $index) {
          <li appReveal class="panel px-6 py-5" [style.--i]="$index">
            <p class="text-[1.0625rem] font-semibold">{{ t(lang.name) }}</p>
            <p class="mt-1 text-sm text-muted">{{ t(lang.level) }}</p>
          </li>
        }
      </ul>
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
    languages: { es: 'Idiomas.', en: 'Languages.' },
    certifications: { es: 'Certificaciones.', en: 'Certifications.' },
    credential: { es: 'Ver credencial', en: 'View credential' },
  };
  ui = ui;
}
