import { Component, ElementRef, OnDestroy, computed, effect, inject, signal, viewChild } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { Reveal } from '../../core/reveal';
import { projects } from '../../data/projects';

@Component({
  selector: 'app-proyecto-detalle',
  imports: [RouterLink, Reveal],
  template: `
    <div class="wrap pt-2 sm:pt-10">
      <a routerLink="/proyectos" class="btn-link -ml-1 inline-flex items-center pl-1 text-muted">
        <span aria-hidden="true">‹&nbsp;</span>Proyectos
      </a>
    </div>

    @if (project(); as p) {
      <article>
        <!-- 1. El problema -->
        <header class="wrap pt-6 sm:pt-12">
          <p appReveal class="eyebrow">{{ p.name }}@if (p.status) { · {{ p.status }}}</p>
          <h1 appReveal class="mt-3 max-w-[22ch] text-[clamp(2rem,6.5vw,4rem)] leading-[1.06]" style="--i: 1">{{ p.problem }}</h1>

          <div #topCta appReveal class="mt-8 flex flex-col gap-3 min-[420px]:flex-row" style="--i: 2">
            <a class="btn btn-solid" [href]="p.repo" target="_blank" rel="noopener">
              Ver el código en GitHub <span aria-hidden="true">↗</span><span class="sr-only">(se abre en otra pestaña)</span>
            </a>
            @if (p.demo) {
              <a class="btn btn-ghost" [href]="p.demo" target="_blank" rel="noopener">
                Probar la demo <span aria-hidden="true">↗</span><span class="sr-only">(se abre en otra pestaña)</span>
              </a>
            }
          </div>
        </header>

        <!-- 2. Qué consigue: el único dato en color de acento -->
        <section class="wrap mt-12 sm:mt-16" aria-labelledby="consigue">
          <div appReveal class="panel px-6 py-10 sm:p-14">
            <h2 id="consigue" class="text-sm font-semibold tracking-normal text-muted">Qué consigue</h2>
            <p class="impact mt-4 text-[clamp(3rem,13vw,6.5rem)]">{{ p.impact.value }}</p>
            <p class="mt-4 max-w-2xl text-[1.1875rem] leading-snug sm:text-[1.375rem]">{{ p.impact.label }}</p>
          </div>
        </section>

        <!-- 3. Cómo funciona, en lenguaje llano -->
        <section class="wrap mt-14 sm:mt-20" aria-labelledby="como">
          <div appReveal class="grid gap-4 md:grid-cols-[14rem_1fr] md:gap-10">
            <h2 id="como" class="text-[1.5rem]">Cómo funciona</h2>
            <p class="max-w-[62ch] text-[1.125rem] leading-relaxed">{{ p.how }}</p>
          </div>
        </section>

        @if (p.image; as img) {
          <figure appReveal class="wrap mt-12">
            <img [src]="img.src" [alt]="img.alt" [width]="img.width" [height]="img.height" loading="lazy" decoding="async"
                 class="h-auto w-full rounded-[1.25rem] shadow-[0_0_0_1px_var(--line)]" />
            <figcaption class="mt-3 text-sm text-muted">{{ img.alt }}</figcaption>
          </figure>
        }

        @if (p.decisions?.length) {
          <section class="wrap mt-12" aria-labelledby="decisiones">
            <div appReveal class="grid gap-4 md:grid-cols-[14rem_1fr] md:gap-10">
              <h2 id="decisiones" class="text-[1.5rem]">Decisiones clave</h2>
              <ul class="max-w-[62ch] space-y-3 text-[1.0625rem] leading-relaxed">
                @for (d of p.decisions; track d) { <li class="flex gap-3"><span aria-hidden="true" class="text-muted">—</span><span>{{ d }}</span></li> }
              </ul>
            </div>
          </section>
        }

        @if (p.next?.length) {
          <section class="wrap mt-12" aria-labelledby="siguientes">
            <div appReveal class="grid gap-4 md:grid-cols-[14rem_1fr] md:gap-10">
              <h2 id="siguientes" class="text-[1.5rem]">Limitaciones y siguientes pasos</h2>
              <ul class="max-w-[62ch] space-y-3 text-[1.0625rem] leading-relaxed text-muted">
                @for (n of p.next; track n) { <li class="flex gap-3"><span aria-hidden="true">—</span><span>{{ n }}</span></li> }
              </ul>
            </div>
          </section>
        }

        <!-- 4. Para técnicos: plegado y discreto -->
        <section class="wrap mt-10" aria-label="Detalles técnicos">
          <details appReveal class="tech group border-y">
            <summary class="flex min-h-14 cursor-pointer items-center justify-between gap-4 py-2 text-[1.0625rem] font-semibold">
              Detalles técnicos
              <svg viewBox="0 0 24 24" class="size-5 text-muted transition-transform duration-200 group-open:rotate-180" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
            </summary>
            <dl class="pb-8">
              @for (t of p.tech; track t.title) {
                <div class="grid gap-1 border-t py-5 md:grid-cols-[14rem_1fr] md:gap-10">
                  <dt class="font-semibold">{{ t.title }}</dt>
                  <dd class="max-w-[62ch] text-muted">{{ t.text }}</dd>
                </div>
              }
              <div class="grid gap-2 border-t py-5 md:grid-cols-[14rem_1fr] md:gap-10">
                <dt class="font-semibold">Tecnologías</dt>
                <dd>
                  <ul class="flex flex-wrap gap-2">
                    @for (s of p.stack; track s) {
                      <li class="rounded-full bg-card px-3 py-1.5 text-sm">{{ s }}</li>
                    }
                  </ul>
                </dd>
              </div>
            </dl>
          </details>
        </section>

        <!-- En móvil deja hueco para la barra fija de GitHub -->
        <nav class="wrap mt-14 pb-20 lg:pb-0" aria-label="Otros proyectos">
          <div class="grid gap-3 sm:grid-cols-2">
            @if (prev(); as q) {
              <a class="card block px-6 py-5" [routerLink]="['/proyectos', q.slug]">
                <span class="text-sm text-muted">‹ Anterior</span>
                <span class="mt-1 block font-semibold leading-snug tracking-[-0.015em]">{{ q.name }}</span>
              </a>
            }
            @if (next(); as q) {
              <a class="card block px-6 py-5 sm:col-start-2 sm:text-right" [routerLink]="['/proyectos', q.slug]">
                <span class="text-sm text-muted">Siguiente ›</span>
                <span class="mt-1 block font-semibold leading-snug tracking-[-0.015em]">{{ q.name }}</span>
              </a>
            }
          </div>
          <a routerLink="/proyectos" class="btn btn-ghost mt-3 w-full">Todos los proyectos</a>
        </nav>
      </article>

      <!-- Móvil: el enlace al código siempre a mano cuando el botón de arriba ya no se ve -->
      <div class="cta-bar glass lg:hidden" [attr.data-on]="showBar()" [attr.aria-hidden]="!showBar()" [attr.inert]="showBar() ? null : ''">
        <div class="wrap flex items-center gap-3 py-2">
          <p class="min-w-0 flex-1 truncate text-sm text-muted">{{ p.name }}</p>
          <a class="btn btn-solid shrink-0" [href]="p.repo" target="_blank" rel="noopener">
            Código <span aria-hidden="true">↗</span><span class="sr-only">en GitHub (se abre en otra pestaña)</span>
          </a>
        </div>
      </div>
    } @else {
      <section class="wrap pt-10">
        <h1 class="display">Proyecto no encontrado.</h1>
        <a routerLink="/proyectos" class="btn btn-solid mt-8">Ver todos los proyectos</a>
      </section>
    }
  `
})
export default class ProyectoDetalle implements OnDestroy {
  // El componente se reutiliza al ir de un proyecto a otro, así que el slug se escucha, no se lee una vez
  private slug = toSignal(inject(ActivatedRoute).paramMap.pipe(map((m) => m.get('slug'))));
  private index = computed(() => projects.findIndex((p) => p.slug === this.slug()));

  project = computed(() => projects[this.index()]);
  prev = computed(() => projects[this.index() - 1]);
  next = computed(() => projects[this.index() + 1]);

  // Barra fija: aparece cuando el botón de GitHub de arriba sale de la pantalla
  showBar = signal(false);
  private topCta = viewChild<ElementRef<HTMLElement>>('topCta');
  private io?: IntersectionObserver;

  constructor() {
    effect(() => {
      const el = this.topCta()?.nativeElement;
      this.io?.disconnect();
      this.showBar.set(false);
      if (!el || typeof IntersectionObserver === 'undefined') return;
      this.io = new IntersectionObserver(([e]) => this.showBar.set(!e.isIntersecting && e.boundingClientRect.top < 0));
      this.io.observe(el);
    });
  }

  ngOnDestroy() {
    this.io?.disconnect();
  }
}
