import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { site } from '../../data/site';
import { I18n } from '../i18n';
import { Theme } from '../theme';
import { allLinks } from './nav';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="glass sticky top-0 z-30 pt-[var(--safe-top)] shadow-[0_0.5px_0_var(--line)]" style="view-transition-name: header">
      <div class="wrap flex h-13 items-center justify-between gap-6">
        <a routerLink="/inicio" class="brand -mx-2 flex min-h-11 items-center whitespace-nowrap rounded-lg px-2 text-[0.9375rem] font-semibold tracking-tight">
          {{ site.name }}
        </a>

        <div class="flex items-center gap-2">
          <nav [attr.aria-label]="t(text.nav)" class="hidden lg:block">
            <ul class="flex items-center gap-1 text-sm">
              @for (link of links; track link.path) {
                <li>
                  <a class="navlink flex min-h-11 items-center whitespace-nowrap rounded-lg px-3" [routerLink]="link.path"
                     routerLinkActive="active" ariaCurrentWhenActive="page">{{ t(link.label) }}</a>
                </li>
              }
            </ul>
          </nav>

          <!-- Idioma: muestra el idioma al que se cambia, con la etiqueta en ese idioma -->
          <button type="button" class="btn icon-btn size-11 p-0 text-[0.8125rem] font-semibold tracking-wide text-muted"
                  [attr.lang]="i18n.lang() === 'es' ? 'en' : 'es'"
                  [attr.aria-label]="i18n.lang() === 'es' ? 'Switch to English' : 'Cambiar a español'"
                  (click)="i18n.toggle()">
            {{ i18n.lang() === 'es' ? 'EN' : 'ES' }}
          </button>

          <button type="button" class="btn icon-btn -mr-2 size-11 p-0 text-muted"
                  [attr.aria-label]="t(theme.dark() ? text.toLight : text.toDark)"
                  (click)="theme.toggle()">
            @if (theme.dark()) {
              <svg viewBox="0 0 24 24" class="size-5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2.5v2M12 19.5v2M4.6 4.6l1.4 1.4M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4" />
              </svg>
            } @else {
              <svg viewBox="0 0 24 24" class="size-5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" aria-hidden="true">
                <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />
              </svg>
            }
          </button>
        </div>
      </div>
    </header>
  `
})
export class Header {
  site = site;
  links = allLinks;
  theme = inject(Theme);
  i18n = inject(I18n);
  t = this.i18n.t;
  text = {
    nav: { es: 'Principal', en: 'Main' },
    toLight: { es: 'Cambiar a modo claro', en: 'Switch to light mode' },
    toDark: { es: 'Cambiar a modo oscuro', en: 'Switch to dark mode' },
  };
}
