import { Component, inject } from '@angular/core';
import { site } from '../../data/site';
import { I18n, ui } from '../i18n';

@Component({
  selector: 'app-footer',
  template: `
    <footer class="wrap mt-24 sm:mt-32">
      <div class="flex flex-col gap-4 border-t py-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>{{ site.name }} · {{ t(site.location) }} · {{ year }}</p>
        <ul class="flex flex-wrap gap-2">
          <li><a [href]="'mailto:' + site.email" class="pill">Email</a></li>
          <li><a [href]="site.github" target="_blank" rel="noopener" class="pill">GitHub<span class="sr-only"> {{ t(text.newTab) }}</span></a></li>
          <li><a [href]="site.linkedin" target="_blank" rel="noopener" class="pill">LinkedIn<span class="sr-only"> {{ t(text.newTab) }}</span></a></li>
          <li><a [href]="i18n.cv().main.href" [attr.download]="i18n.cv().main.file" class="pill">{{ i18n.cv().main.label }}</a></li>
          <li><a [href]="i18n.cv().other.href" [attr.download]="i18n.cv().other.file" [attr.hreflang]="i18n.cv().other.lang" [attr.lang]="i18n.cv().other.lang" class="pill">{{ i18n.cv().other.label }}</a></li>
        </ul>
      </div>
    </footer>
  `
})
export class Footer {
  site = site;
  i18n = inject(I18n);
  t = this.i18n.t;
  year = new Date().getFullYear();
  text = ui;
}
