import { Component } from '@angular/core';
import { site } from '../../data/site';

@Component({
  selector: 'app-footer',
  template: `
    <footer class="wrap mt-24 sm:mt-32">
      <div class="flex flex-col gap-4 border-t py-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>{{ site.name }} · {{ site.location }} · {{ year }}</p>
        <ul class="flex flex-wrap gap-2">
          <li><a [href]="'mailto:' + site.email" class="pill">Email</a></li>
          <li><a [href]="site.github" target="_blank" rel="noopener" class="pill">GitHub<span class="sr-only"> (se abre en otra pestaña)</span></a></li>
          <li><a [href]="site.linkedin" target="_blank" rel="noopener" class="pill">LinkedIn<span class="sr-only"> (se abre en otra pestaña)</span></a></li>
          <li><a [href]="site.cv" [attr.download]="site.cvFileName" class="pill">Descargar CV</a></li>
          <li><a [href]="site.cvEn" [attr.download]="site.cvEnFileName" hreflang="en" lang="en" class="pill">CV in English</a></li>
        </ul>
      </div>
    </footer>
  `
})
export class Footer {
  site = site;
  year = new Date().getFullYear();
}
