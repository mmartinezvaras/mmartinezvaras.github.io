import { Directive, ElementRef, OnDestroy, afterNextRender, inject } from '@angular/core';

// Hace aparecer el elemento la primera vez que entra en pantalla (clases .reveal / .in en styles.css).
// Es progresivo: sin JS nada se oculta (la regla depende de <html class="js">), y lo que ya está
// en la primera pantalla de la página se muestra al momento, sin animación.
let observer: IntersectionObserver | null = null;

function shared(): IntersectionObserver | null {
  if (typeof IntersectionObserver === 'undefined') return null;
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          observer?.unobserve(e.target);
        }
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.01 }
  );
  return observer;
}

@Directive({
  selector: '[appReveal]',
  host: { class: 'reveal' }
})
export class Reveal implements OnDestroy {
  private el = inject(ElementRef<HTMLElement>).nativeElement as HTMLElement;

  constructor() {
    // Se mide cuando el elemento ya está en el DOM y colocado
    afterNextRender(() => {
      // Posición respecto al documento: no depende de cuándo el router devuelve el scroll arriba
      const top = this.el.getBoundingClientRect().top + window.scrollY;
      const io = shared();
      if (!io || top < window.innerHeight) {
        this.el.classList.add('reveal-now', 'in');
      } else {
        io.observe(this.el);
      }
    });
  }

  ngOnDestroy() {
    observer?.unobserve(this.el);
  }
}
