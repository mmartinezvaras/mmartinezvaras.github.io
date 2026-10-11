import { Component } from '@angular/core';
import { Reveal } from '../../core/reveal';
import { notes } from '../../data/notes';

@Component({
  selector: 'app-lab',
  imports: [Reveal],
  template: `
    <section class="wrap pt-12 sm:pt-24">
      <p appReveal class="eyebrow">Lab</p>
      <h1 appReveal class="display mt-3 max-w-[12ch]" style="--i: 1">Notas y experimentos.</h1>
      <p appReveal class="lead mt-5 max-w-2xl" style="--i: 2">Lo que pruebo, lo que falla y lo que aprendo por el camino.</p>
    </section>

    <div class="wrap mt-12 sm:mt-16">
      @for (n of notes; track n.slug) {
        <article appReveal class="mx-auto max-w-[42rem] border-t py-10 sm:py-14">
          <p class="text-sm text-muted">
            <time [attr.datetime]="n.isoDate">{{ n.date }}</time> · {{ n.tags.join(' · ') }}
          </p>
          <h2 class="mt-3 text-[clamp(1.75rem,5vw,2.5rem)]">{{ n.title }}</h2>
          <p class="lead mt-4">{{ n.summary }}</p>
          @for (p of n.body; track $index) {
            <p class="mt-5 text-[1.125rem] leading-relaxed">{{ p }}</p>
          }
        </article>
      }
    </div>
  `
})
export default class Lab {
  notes = notes;
}
