import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { TitleStrategy, provideRouter, withInMemoryScrolling, withViewTransitions } from '@angular/router';
import { routes } from './app.routes';
import { SeoTitleStrategy } from './core/seo';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      // Fundido entre páginas (se ignora en navegadores sin View Transitions)
      withViewTransitions(),
      // Cada página nueva empieza arriba; al volver atrás se recupera la posición
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled' })
    ),
    // Título por ruta + canonical y og:url coherentes
    { provide: TitleStrategy, useClass: SeoTitleStrategy }
  ]
};
