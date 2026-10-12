import { Component, DestroyRef, ElementRef, computed, inject, signal, viewChild } from '@angular/core';
import { I18n } from '../../core/i18n';
import { Reveal } from '../../core/reveal';
import { ProjectCard } from '../../core/ui/project-card';
import { Area, areaLabels, areas, projects } from '../../data/projects';

@Component({
  selector: 'app-proyectos',
  imports: [Reveal, ProjectCard],
  template: `
    <section class="wrap pt-12 sm:pt-24">
      <p appReveal class="eyebrow">{{ t(text.eyebrow) }}</p>
      <h1 appReveal class="display mt-3 max-w-[12ch]" style="--i: 1">{{ t(text.title) }}</h1>
      <p appReveal class="lead mt-5 max-w-2xl" style="--i: 2">{{ t(text.lead) }}</p>

      <div appReveal class="segmented -mx-5 mt-10 px-5 sm:mx-0 sm:px-0" style="--i: 3" role="group" [attr.aria-label]="t(text.filter)">
        <button type="button" class="chip" [attr.aria-pressed]="selected() === null" (click)="select(null)">{{ t(text.all) }}</button>
        @for (a of areas; track a) {
          <button type="button" class="chip" [attr.aria-pressed]="selected() === a" (click)="select(a)">{{ t(areaLabels[a]) }}</button>
        }
      </div>
      <p class="sr-only" aria-live="polite">{{ count() }}</p>
    </section>

    @if (featured()) {
      <section class="wrap mt-8" [attr.aria-label]="t(text.featured)">
        <app-project-card appReveal [project]="featured()!" size="hero" />
      </section>
    }

    @if (rest().length) {
      <section class="wrap mt-16 sm:mt-24" aria-labelledby="otros">
        <h2 appReveal id="otros" class="text-[clamp(1.75rem,5vw,3rem)]">{{ restTitle() }}</h2>
        <ul #rail appReveal class="rail mt-8" style="--i: 1" (scroll)="onScroll()" [attr.aria-label]="t(isRail() ? text.railSwipe : text.eyebrow)">
          @for (p of rest(); track p.slug) {
            <li><app-project-card [project]="p" /></li>
          }
        </ul>
        @if (rest().length > 1) {
          <div class="mt-5 flex justify-center gap-2 md:hidden" aria-hidden="true">
            @for (p of rest(); track p.slug; let i = $index) {
              <span class="dot" [attr.data-on]="i === current()"></span>
            }
          </div>
        }
      </section>
    }

    <!-- Secundario: aplicaciones completas con Java y Angular, fuera del foco de datos e IA -->
    @if (web().length) {
      <section class="wrap mt-16 sm:mt-24" aria-labelledby="web">
        <h2 appReveal id="web" class="text-[clamp(1.5rem,4vw,2.25rem)]">{{ t(text.webTitle) }}</h2>
        <p appReveal class="mt-3 max-w-2xl text-muted" style="--i: 1">{{ t(text.webLead) }}</p>
        <ul class="card-grid mt-8 grid gap-3 md:grid-cols-2 md:gap-5">
          @for (p of web(); track p.slug; let i = $index) {
            <li appReveal [style.--i]="i"><app-project-card [project]="p" /></li>
          }
        </ul>
      </section>
    }
  `
})
export default class Proyectos {
  areas = areas;
  areaLabels = areaLabels;
  t = inject(I18n).t;
  text = {
    eyebrow: { es: 'Proyectos', en: 'Projects' },
    title: { es: 'Lo que he construido.', en: "What I've built." },
    lead: {
      es: 'Datos, IA y desarrollo. Cada proyecto con su resultado por delante y el código a un toque.',
      en: 'Data, AI and development. Each project leads with its result, with the code one tap away.',
    },
    filter: { es: 'Filtrar por área', en: 'Filter by area' },
    all: { es: 'Todos', en: 'All' },
    featured: { es: 'Proyecto destacado', en: 'Featured project' },
    dataAi: { es: 'Datos e IA.', en: 'Data and AI.' },
    railSwipe: { es: 'Proyectos, desliza para ver más', en: 'Projects, swipe to see more' },
    webTitle: { es: 'Desarrollo web y backend.', en: 'Web and back-end development.' },
    webLead: { es: 'Aplicaciones completas con Java, Spring Boot y Angular.', en: 'Full applications with Java, Spring Boot and Angular.' },
  };
  selected = signal<Area | null>(null);
  current = signal(0);

  // Por debajo de 768px el carril es un carrusel horizontal; por encima, una rejilla
  private mq = window.matchMedia('(max-width: 767px)');
  isRail = signal(this.mq.matches);

  constructor() {
    const update = () => this.isRail.set(this.mq.matches);
    this.mq.addEventListener('change', update);
    inject(DestroyRef).onDestroy(() => this.mq.removeEventListener('change', update));
  }

  private visible = computed(() => {
    const a = this.selected();
    return a ? projects.filter((p) => p.area === a) : projects;
  });
  featured = computed(() => this.visible().find((p) => p.featured));
  // Con "Todos", los de Desarrollo van en su propia sección secundaria
  rest = computed(() => this.visible().filter((p) => !p.featured && (this.selected() !== null || p.area !== 'Desarrollo')));
  web = computed(() => (this.selected() === null ? this.visible().filter((p) => p.area === 'Desarrollo') : []));
  restTitle = computed(() => {
    const a = this.selected();
    if (this.featured()) return this.t(this.text.dataAi);
    return this.t(a ? areaLabels[a] : this.text.eyebrow) + '.';
  });
  count = computed(() => {
    const n = this.visible().length;
    return this.t(n === 1 ? { es: '1 proyecto', en: '1 project' } : { es: n + ' proyectos', en: n + ' projects' });
  });

  private rail = viewChild<ElementRef<HTMLElement>>('rail');

  select(a: Area | null) {
    this.selected.set(a);
    this.current.set(0);
    this.rail()?.nativeElement.scrollTo({ left: 0 });
  }

  // Indicador de posición del carrusel en móvil
  onScroll() {
    const el = this.rail()?.nativeElement;
    const first = el?.firstElementChild as HTMLElement | null;
    if (!el || !first) return;
    const step = first.offsetWidth + parseFloat(getComputedStyle(el).columnGap || '0');
    this.current.set(Math.min(this.rest().length - 1, Math.round(el.scrollLeft / step)));
  }
}
