import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Project } from '../../data/projects';

// Tarjeta de proyecto. Orden de lectura pensado para alguien no técnico:
// 1) el problema, 2) qué consigue (el único elemento en color de acento), 3) cómo está hecho, discreto.
// 'hero' es el proyecto principal; 'tile' el resto.
@Component({
  selector: 'app-project-card',
  imports: [RouterLink],
  host: { class: 'block h-full' },
  template: `
    @let p = project();
    @if (size() === 'hero') {
      <article class="panel featured overflow-hidden px-6 py-9 sm:p-12 lg:p-14">
        <div class="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-center lg:gap-12">
          <div>
            <p class="badge">Proyecto destacado</p>
            <p class="eyebrow mt-5">{{ p.name }}</p>
            <h2 class="mt-2 max-w-[22ch] text-[clamp(1.625rem,4vw,2.5rem)] leading-[1.1]">{{ p.problem }}</h2>

            <p class="impact mt-8 text-[clamp(3rem,10vw,4.5rem)] sm:mt-10">{{ p.impact.value }}</p>
            <p class="mt-3 max-w-md text-[1.1875rem] leading-snug">{{ p.impact.label }}</p>
          </div>

          <!-- Lo visual: la demo real funcionando -->
          @if (p.image; as img) {
            <figure class="shot">
              <img [src]="img.src" [alt]="img.alt" [width]="img.width" [height]="img.height" loading="lazy" decoding="async" />
            </figure>
          }
        </div>

        <div class="mt-10 grid gap-8 border-t pt-8 md:grid-cols-[1fr_auto] md:items-end md:gap-16">
          <div>
            <h3 class="text-sm font-semibold text-muted">Cómo está hecho</h3>
            <p class="mt-2 max-w-2xl text-[0.9375rem] text-muted">{{ p.how }}</p>
            <!-- Como mucho 5 tecnologías; la lista completa está en el detalle -->
            <ul class="chips mt-4" aria-label="Tecnologías">
              @for (t of p.stack.slice(0, 5); track t) { <li>{{ t }}</li> }
            </ul>
          </div>
          <div class="flex flex-col gap-3 min-[420px]:flex-row md:justify-end">
            <a class="btn btn-solid" [routerLink]="['/proyectos', p.slug]">Ver el proyecto</a>
            @if (p.demo) {
              <a class="btn btn-ghost" [href]="p.demo" target="_blank" rel="noopener">
                Probar la demo <span aria-hidden="true">↗</span><span class="sr-only">: {{ p.name }} (se abre en otra pestaña)</span>
              </a>
            }
            <a class="btn btn-ghost" [href]="p.repo" target="_blank" rel="noopener">
              Código en GitHub <span aria-hidden="true">↗</span><span class="sr-only">: {{ p.name }} (se abre en otra pestaña)</span>
            </a>
          </div>
        </div>
      </article>
    } @else {
      <!-- 5 filas (nombre · problema · cifra · explicación · pie): en rejilla se alinean entre tarjetas con subgrid -->
      <article class="card tile px-6 py-7 sm:p-8">
        <p class="eyebrow">
          {{ p.name }}@if (p.status) {<span> · {{ p.status }}</span>}
        </p>
        <h3 class="mt-3 text-[1.25rem] leading-[1.22] sm:text-[1.375rem]">
          <a class="stretched" [routerLink]="['/proyectos', p.slug]">{{ p.problem }}</a>
        </h3>
        <p class="tile-value impact pt-8 text-[2.25rem]">{{ p.impact.value }}</p>
        <p class="mt-2 leading-snug">{{ p.impact.label }}</p>
        <div class="tile-foot mt-6 border-t pt-4">
          <ul class="chips" aria-label="Tecnologías">
            @for (t of p.stack.slice(0, 5); track t) { <li>{{ t }}</li> }
          </ul>
          <div class="above mt-2 flex flex-wrap gap-x-6">
            <a class="btn-link inline-flex items-center" [href]="p.repo" target="_blank" rel="noopener">
              Código en GitHub <span aria-hidden="true">&nbsp;↗</span><span class="sr-only">: {{ p.name }} (se abre en otra pestaña)</span>
            </a>
            @if (p.demo) {
              <a class="btn-link inline-flex items-center" [href]="p.demo" target="_blank" rel="noopener">
                Demo <span aria-hidden="true">&nbsp;↗</span><span class="sr-only">: {{ p.name }} (se abre en otra pestaña)</span>
              </a>
            }
          </div>
        </div>
      </article>
    }
  `
})
export class ProjectCard {
  project = input.required<Project>();
  size = input<'hero' | 'tile'>('tile');
}
