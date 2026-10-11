import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Reveal } from '../../core/reveal';
import { site } from '../../data/site';

@Component({
  selector: 'app-sobre-mi',
  imports: [RouterLink, Reveal],
  template: `
    <section class="wrap grid gap-10 pt-12 sm:pt-24 md:grid-cols-[1fr_auto] md:items-end">
      <div>
        <p appReveal class="eyebrow">Sobre mí</p>
        <h1 appReveal class="display mt-3 max-w-[13ch]" style="--i: 1">Datos, IA y sistemas que duran.</h1>
        <p appReveal class="lead mt-6 max-w-3xl" style="--i: 2">{{ site.intro }}</p>
      </div>
      <figure appReveal class="order-first flex items-center gap-4 md:order-none md:flex-col md:items-end md:text-right" style="--i: 1">
        <img src="avatar.webp" width="237" height="237" alt="Retrato de Marcos María Martínez Varas"
             class="avatar size-20 md:size-36" fetchpriority="high" />
        <figcaption class="text-sm text-muted">{{ site.location }}<br />{{ site.availability }}</figcaption>
      </figure>
    </section>

    <section class="wrap mt-16 sm:mt-24" aria-labelledby="intereses">
      <h2 appReveal id="intereses" class="text-[clamp(1.75rem,5vw,3rem)]">Qué me mueve.</h2>
      <ul class="mt-8 grid gap-3 md:grid-cols-3 md:gap-5">
        @for (item of site.interests; track item.title; let i = $index) {
          <li appReveal class="panel px-6 py-7 sm:p-8" [style.--i]="i">
            <h3 class="text-2xl">{{ item.title }}</h3>
            <p class="mt-3 text-muted">{{ item.text }}</p>
          </li>
        }
      </ul>
    </section>

    <section class="wrap mt-16 sm:mt-24" aria-labelledby="busco">
      <div appReveal class="panel grid gap-8 px-6 py-10 sm:p-14 md:grid-cols-[1.3fr_1fr] md:gap-16">
        <div>
          <h2 id="busco" class="text-[clamp(1.75rem,5vw,3rem)]">Qué busco.</h2>
          <p class="lead mt-4">{{ site.seeking }}</p>
          <div class="mt-8 flex flex-col gap-3 min-[420px]:flex-row">
            <a routerLink="/contacto" class="btn btn-solid">Contactar</a>
            <a [href]="site.cv" [attr.download]="site.cvFileName" class="btn btn-ghost">Descargar CV</a>
          </div>
        </div>
        <ul class="self-end border-t md:border-t-0">
          @for (e of site.extras; track e) {
            <li class="flex gap-3 border-b py-4 last:border-b-0">
              <svg viewBox="0 0 24 24" class="mt-0.5 size-5 shrink-0 text-fg" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>
              <span>{{ e }}</span>
            </li>
          }
        </ul>
      </div>
    </section>
  `
})
export default class SobreMi {
  site = site;
}
