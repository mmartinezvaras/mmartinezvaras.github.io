import { Component, ElementRef, computed, inject, signal, viewChild } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter, map } from 'rxjs';
import { site } from '../../data/site';
import { Theme } from '../theme';
import { primaryLinks, secondaryLinks } from './nav';

// Barra de pestañas inferior (solo móvil) y hoja "Más": acciones clave (CV, email, LinkedIn, GitHub), secciones secundarias y tema.
// La hoja es un <dialog> nativo: atrapa el foco, se cierra con Esc y se arrastra hacia abajo para cerrarla.
@Component({
  selector: 'app-tab-bar',
  imports: [RouterLink],
  template: `
    <nav aria-label="Secciones" class="tabbar glass lg:hidden">
      <ul class="flex">
        @for (link of links; track link.path; let i = $index) {
          <li class="flex flex-1">
            <a class="tab" [routerLink]="link.path" [attr.data-on]="active() === link.path"
               [attr.aria-current]="active() === link.path ? 'page' : null"
               (click)="onTab(link.path)">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                @switch (i) {
                  @case (0) { <path d="M3.5 10.5 12 3.5l8.5 7V20a.5.5 0 0 1-.5.5h-5v-6h-6v6H4a.5.5 0 0 1-.5-.5Z" /> }
                  @case (1) { <rect x="3.5" y="3.5" width="7" height="7" rx="2" /><rect x="13.5" y="3.5" width="7" height="7" rx="2" /><rect x="3.5" y="13.5" width="7" height="7" rx="2" /><rect x="13.5" y="13.5" width="7" height="7" rx="2" /> }
                  @case (2) { <rect x="3" y="7" width="18" height="13" rx="2.5" /><path d="M8.5 7V5.5A1.5 1.5 0 0 1 10 4h4a1.5 1.5 0 0 1 1.5 1.5V7M3 12.5h18" /> }
                  @case (3) { <rect x="3" y="5" width="18" height="14" rx="2.5" /><path d="m3.5 6.5 8.5 6.5 8.5-6.5" /> }
                }
              </svg>
              {{ link.label }}
            </a>
          </li>
        }
        <li class="flex flex-1">
          <button type="button" class="tab" [attr.data-on]="inMore()" aria-haspopup="dialog" (click)="open()">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <circle cx="5.5" cy="12" r="1.6" /><circle cx="12" cy="12" r="1.6" /><circle cx="18.5" cy="12" r="1.6" />
            </svg>
            Más
          </button>
        </li>
      </ul>
    </nav>

    <dialog #sheet class="sheet lg:hidden" aria-labelledby="sheet-title"
            (cancel)="$event.preventDefault(); close()" (click)="onBackdrop($event)">
      <div class="sheet-grip" (pointerdown)="dragStart($event)" (pointermove)="dragMove($event)"
           (pointerup)="dragEnd($event)" (pointercancel)="dragEnd($event)">
        <span class="sheet-handle" aria-hidden="true"></span>
        <h2 id="sheet-title" class="text-xl">Más</h2>
      </div>

      <!-- Acciones clave: siempre a un toque de distancia -->
      <a class="btn btn-solid mt-2 w-full" [href]="site.cv" [attr.download]="site.cvFileName">
        <svg viewBox="0 0 24 24" class="size-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 4v11m0 0-4.5-4.5M12 15l4.5-4.5M5 19.5h14" /></svg>
        Descargar CV
      </a>
      <ul class="mt-3 grid grid-cols-3 gap-2" aria-label="Contacto">
        <li>
          <a class="action" [href]="'mailto:' + site.email">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2.5" /><path d="m3.5 6.5 8.5 6.5 8.5-6.5" /></svg>
            Email
          </a>
        </li>
        <li>
          <a class="action" [href]="site.linkedin" target="_blank" rel="noopener">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M5.2 8.6h3v10.2h-3zM6.7 4a1.75 1.75 0 1 1 0 3.5 1.75 1.75 0 0 1 0-3.5Zm3.6 4.6h2.9V10h.04c.4-.76 1.4-1.6 2.9-1.6 3.1 0 3.6 2 3.6 4.6v5.8h-3v-5.1c0-1.2 0-2.8-1.7-2.8s-2 1.3-2 2.7v5.2h-3z" /></svg>
            LinkedIn<span class="sr-only"> (se abre en otra pestaña)</span>
          </a>
        </li>
        <li>
          <a class="action" [href]="site.github" target="_blank" rel="noopener">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.5a9.5 9.5 0 0 0-3 18.5c.5.1.65-.2.65-.46v-1.6c-2.65.57-3.2-1.27-3.2-1.27-.43-1.1-1.06-1.4-1.06-1.4-.86-.6.07-.58.07-.58.95.07 1.45.98 1.45.98.85 1.45 2.22 1.03 2.76.79.09-.62.33-1.03.6-1.27-2.11-.24-4.33-1.06-4.33-4.7 0-1.04.37-1.89.98-2.55-.1-.24-.42-1.21.09-2.53 0 0 .8-.26 2.62.97a9 9 0 0 1 4.76 0c1.82-1.23 2.62-.97 2.62-.97.51 1.32.19 2.29.1 2.53.6.66.97 1.51.97 2.55 0 3.65-2.22 4.46-4.34 4.7.34.29.65.87.65 1.76v2.6c0 .26.17.56.66.46A9.5 9.5 0 0 0 12 2.5Z" /></svg>
            GitHub<span class="sr-only"> (se abre en otra pestaña)</span>
          </a>
        </li>
      </ul>

      <ul class="mt-4 overflow-hidden rounded-2xl bg-bg">
        @for (link of more; track link.path) {
          <li class="border-b">
            <a class="flex min-h-14 items-center justify-between px-4 text-[1.0625rem] transition-colors active:bg-card" [routerLink]="link.path"
               [attr.aria-current]="active() === link.path ? 'page' : null" (click)="close()">
              {{ link.label }}
              <svg viewBox="0 0 24 24" class="size-4 text-muted" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="m9 6 6 6-6 6" /></svg>
            </a>
          </li>
        }
        <li>
          <button type="button" class="flex min-h-14 w-full items-center justify-between px-4 text-[1.0625rem] transition-colors active:bg-card"
                  (click)="theme.toggle()">
            {{ theme.dark() ? 'Modo claro' : 'Modo oscuro' }}
            <span class="text-sm text-muted">{{ theme.dark() ? 'Ahora: oscuro' : 'Ahora: claro' }}</span>
          </button>
        </li>
      </ul>

      <button type="button" class="btn btn-ghost mt-4 w-full" (click)="close()">Cerrar</button>
    </dialog>
  `
})
export class TabBar {
  site = site;
  theme = inject(Theme);
  links = primaryLinks;
  more = secondaryLinks;

  private router = inject(Router);
  private url = toSignal(
    this.router.events.pipe(
      filter((e) => e instanceof NavigationEnd),
      map(() => this.router.url)
    ),
    { initialValue: this.router.url }
  );
  // Ruta de primer nivel: /proyectos/rag-pdfs cuenta como /proyectos
  active = computed(() => '/' + (this.url().split(/[/?#]/)[1] ?? ''));
  inMore = computed(() => this.more.some((l) => l.path === this.active()));

  private sheet = viewChild.required<ElementRef<HTMLDialogElement>>('sheet');
  private drag = signal<{ y: number; t: number; dy: number } | null>(null);

  // Pulsar la pestaña en la que ya estás vuelve arriba, como en iOS
  onTab(path: string) {
    if (path === this.active()) {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    }
  }

  open() {
    const d = this.sheet().nativeElement;
    d.removeAttribute('data-closing');
    d.style.transform = '';
    d.showModal();
  }

  close() {
    const d = this.sheet().nativeElement;
    if (!d.open || d.dataset['closing']) return;
    d.style.transform = '';
    d.style.transition = '';
    d.dataset['closing'] = 'true';
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      d.close();
      d.removeAttribute('data-closing');
    };
    d.addEventListener('transitionend', finish, { once: true });
    setTimeout(finish, 280);
  }

  // Un toque fuera de la hoja (en el fondo oscurecido) la cierra
  onBackdrop(e: MouseEvent) {
    const d = this.sheet().nativeElement;
    if (e.target !== d) return;
    const r = d.getBoundingClientRect();
    const inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
    if (!inside) this.close();
  }

  // Arrastrar hacia abajo: la hoja sigue al dedo 1:1 y se cierra si se suelta lejos o con un gesto rápido
  dragStart(e: PointerEvent) {
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    this.drag.set({ y: e.clientY, t: performance.now(), dy: 0 });
    this.sheet().nativeElement.style.transition = 'none';
  }

  dragMove(e: PointerEvent) {
    const s = this.drag();
    if (!s) return;
    const raw = e.clientY - s.y;
    // Hacia arriba ofrece resistencia en lugar de un tope seco
    const dy = raw >= 0 ? raw : -Math.sqrt(-raw) * 2;
    this.drag.set({ ...s, dy });
    this.sheet().nativeElement.style.transform = `translateY(${dy}px)`;
  }

  dragEnd(e: PointerEvent) {
    const s = this.drag();
    if (!s) return;
    this.drag.set(null);
    const velocity = s.dy / Math.max(1, performance.now() - s.t);
    const d = this.sheet().nativeElement;
    if (s.dy > 120 || (s.dy > 10 && velocity > 0.11)) {
      this.close();
    } else {
      d.style.transition = '';
      d.style.transform = '';
    }
  }
}
