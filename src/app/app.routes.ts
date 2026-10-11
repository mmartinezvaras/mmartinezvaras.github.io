import { ActivatedRouteSnapshot, Routes } from '@angular/router';

// En el detalle, el título es el nombre del proyecto. Import dinámico para que los datos
// sigan fuera del bundle inicial.
const projectTitle = async (route: ActivatedRouteSnapshot) => {
  const { projects } = await import('./data/projects');
  return projects.find((p) => p.slug === route.paramMap.get('slug'))?.name ?? 'Proyecto no encontrado';
};

export const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', title: '', loadComponent: () => import('./pages/inicio/inicio') },
  { path: 'sobre-mi', title: 'Sobre mí', loadComponent: () => import('./pages/sobre-mi/sobre-mi') },
  { path: 'estudios', title: 'Trayectoria', loadComponent: () => import('./pages/estudios/estudios') },
  { path: 'skills', title: 'Skills', loadComponent: () => import('./pages/skills/skills') },
  { path: 'proyectos', title: 'Proyectos', loadComponent: () => import('./pages/proyectos/proyectos') },
  { path: 'proyectos/:slug', title: projectTitle, loadComponent: () => import('./pages/proyecto-detalle/proyecto-detalle') },
  { path: 'lab', title: 'Lab', loadComponent: () => import('./pages/lab/lab') },
  { path: 'contacto', title: 'Contacto', loadComponent: () => import('./pages/contacto/contacto') },
  { path: '**', redirectTo: 'inicio' }
];
