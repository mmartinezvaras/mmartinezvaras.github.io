import { Routes } from '@angular/router';

// data.title: título de la pestaña en cada idioma (lo aplica SeoTitleStrategy en core/seo.ts).
// En el detalle, el título es el nombre del proyecto.
export const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', loadComponent: () => import('./pages/inicio/inicio') },
  { path: 'sobre-mi', data: { title: { es: 'Sobre mí', en: 'About me' } }, loadComponent: () => import('./pages/sobre-mi/sobre-mi') },
  { path: 'estudios', data: { title: { es: 'Trayectoria', en: 'Background' } }, loadComponent: () => import('./pages/estudios/estudios') },
  { path: 'skills', data: { title: { es: 'Skills', en: 'Skills' } }, loadComponent: () => import('./pages/skills/skills') },
  { path: 'proyectos', data: { title: { es: 'Proyectos', en: 'Projects' } }, loadComponent: () => import('./pages/proyectos/proyectos') },
  { path: 'proyectos/:slug', loadComponent: () => import('./pages/proyecto-detalle/proyecto-detalle') },
  { path: 'lab', data: { title: { es: 'Lab', en: 'Lab' } }, loadComponent: () => import('./pages/lab/lab') },
  { path: 'contacto', data: { title: { es: 'Contacto', en: 'Contact' } }, loadComponent: () => import('./pages/contacto/contacto') },
  { path: '**', redirectTo: 'inicio' }
];
