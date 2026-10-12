import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18n, ui } from '../../core/i18n';
import { Reveal } from '../../core/reveal';
import { ProjectCard } from '../../core/ui/project-card';
import { projects } from '../../data/projects';
import { site } from '../../data/site';

@Component({
  selector: 'app-inicio',
  imports: [RouterLink, Reveal, ProjectCard],
  template: `
    <section class="wrap pb-20 pt-10 sm:pb-28 sm:pt-24">
      <img appReveal src="avatar.webp" width="237" height="237" [alt]="t(text.portrait)"
           class="avatar mb-7 size-20 sm:size-24" fetchpriority="high" />
      <h1 appReveal class="text-[clamp(3rem,12vw,7.5rem)] leading-[1.02] tracking-[-0.02em]" style="--i: 1">
        <span class="block">{{ first }}</span>
        <span class="block text-muted">{{ last }}</span>
      </h1>
      <!-- Rol objetivo y foco en una línea: lo primero que busca un reclutador -->
      <p appReveal class="mt-6 text-[clamp(1.375rem,3.4vw,2rem)] font-semibold leading-tight tracking-[-0.02em]" style="--i: 2">
        {{ site.role }} <span class="text-muted">· {{ t(site.focus) }}</span>
      </p>
      <p appReveal class="lead mt-4 max-w-2xl" style="--i: 3">{{ t(site.intro) }}</p>

      <div appReveal class="mt-10 grid gap-3 min-[420px]:flex min-[420px]:flex-wrap" style="--i: 4">
        <div class="grid grid-cols-2 gap-3 min-[420px]:contents">
          <a [href]="i18n.cv().main.href" [attr.download]="i18n.cv().main.file" class="btn btn-solid">{{ i18n.cv().main.label }}</a>
          <a [href]="i18n.cv().other.href" [attr.download]="i18n.cv().other.file" [attr.hreflang]="i18n.cv().other.lang" [attr.lang]="i18n.cv().other.lang" class="btn btn-ghost">{{ i18n.cv().other.label }}</a>
        </div>
        <div class="grid grid-cols-3 gap-3 min-[420px]:contents">
          <a [href]="site.github" target="_blank" rel="noopener" class="btn btn-ghost">GitHub<span class="sr-only"> {{ t(text.newTab) }}</span></a>
          <a [href]="site.linkedin" target="_blank" rel="noopener" class="btn btn-ghost">LinkedIn<span class="sr-only"> {{ t(text.newTab) }}</span></a>
          <a [href]="'mailto:' + site.email" class="btn btn-ghost">Email</a>
        </div>
      </div>

      <dl appReveal class="mt-16 grid gap-px overflow-hidden rounded-3xl bg-line sm:grid-cols-3" style="--i: 5">
        @for (f of facts(); track $index) {
          <div class="bg-card p-6">
            <dt class="text-sm font-semibold text-muted">{{ f.label }}</dt>
            <dd class="mt-2 leading-snug">{{ f.text }}</dd>
          </div>
        }
      </dl>
    </section>

    @if (featured) {
      <section class="wrap" [attr.aria-label]="t(text.featured)">
        <app-project-card appReveal [project]="featured" size="hero" />
      </section>
    }

    <section class="wrap mt-20 sm:mt-28" aria-labelledby="mas-proyectos">
      <div appReveal class="flex items-end justify-between gap-6">
        <h2 id="mas-proyectos" class="text-[clamp(1.75rem,5vw,3rem)]">{{ t(text.more) }}</h2>
        <a routerLink="/proyectos" class="btn-link inline-flex shrink-0 items-center">{{ t(text.seeAll) }} <span aria-hidden="true">&nbsp;›</span></a>
      </div>
      <ul appReveal class="rail mt-8" style="--i: 1">
        @for (p of more; track p.slug) {
          <li><app-project-card [project]="p" /></li>
        }
      </ul>
    </section>

    <section class="wrap mt-20 sm:mt-28">
      <div appReveal class="panel px-6 py-12 text-center sm:px-12 sm:py-20">
        <h2 class="text-[clamp(2rem,6vw,3.5rem)]">{{ t(text.talk) }}</h2>
        <p class="lead mx-auto mt-4 max-w-xl">{{ t(site.seeking) }}</p>
        <div class="mt-8 flex flex-col justify-center gap-3 min-[420px]:flex-row">
          <a routerLink="/contacto" class="btn btn-solid">{{ t(text.contact) }}</a>
          <a [href]="site.linkedin" target="_blank" rel="noopener" class="btn btn-ghost">
            LinkedIn <span aria-hidden="true">↗</span><span class="sr-only">{{ t(text.newTab) }}</span>
          </a>
        </div>
      </div>
    </section>
  `
})
export default class Inicio {
  site = site;
  i18n = inject(I18n);
  t = this.i18n.t;
  text = {
    ...ui,
    portrait: { es: 'Retrato de Marcos', en: 'Portrait of Marcos' },
    featured: { es: 'Proyecto destacado', en: 'Featured project' },
    more: { es: 'Más proyectos.', en: 'More projects.' },
    seeAll: { es: 'Ver todos', en: 'See all' },
    talk: { es: '¿Hablamos?', en: "Let's talk." },
    contact: { es: 'Contactar', en: 'Get in touch' },
  };
  first = site.name.split(' ').slice(0, 2).join(' ');
  last = site.name.split(' ').slice(2).join(' ');
  featured = projects.find((p) => p.featured);
  more = projects.filter((p) => !p.featured).slice(0, 3);
  facts = computed(() => {
    const t = this.t;
    const edu = site.education[0];
    const job = site.experience[0];
    return [
      { label: t({ es: 'Ahora', en: 'Now' }), text: t(edu.title) + ' · ' + edu.center },
      { label: t({ es: 'Antes', en: 'Before' }), text: t({ es: 'DAM · Prácticas en ', en: 'DAM · Internship at ' }) + job.company },
      { label: t({ es: 'Busco', en: 'Looking for' }), text: t({ es: 'Prácticas o primer empleo · ', en: 'Internship or first job · ' }) + t(site.availability) },
    ];
  });
}
