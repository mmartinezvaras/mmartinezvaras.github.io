import { L } from '../i18n';

// Navegación compartida por la cabecera (escritorio) y la barra de pestañas (móvil).
export interface NavLink {
  path: string;
  label: L;
}

// Pestañas principales: lo que un reclutador busca primero, al alcance del pulgar.
export const primaryLinks: NavLink[] = [
  { path: '/inicio', label: { es: 'Inicio', en: 'Home' } },
  { path: '/proyectos', label: { es: 'Proyectos', en: 'Projects' } },
  { path: '/estudios', label: { es: 'Trayectoria', en: 'Background' } },
  { path: '/contacto', label: { es: 'Contacto', en: 'Contact' } }
];

// En móvil viven en la hoja "Más".
export const secondaryLinks: NavLink[] = [
  { path: '/sobre-mi', label: { es: 'Sobre mí', en: 'About me' } },
  { path: '/skills', label: { es: 'Skills', en: 'Skills' } },
  { path: '/lab', label: { es: 'Lab', en: 'Lab' } }
];

// Orden de lectura en escritorio
export const allLinks: NavLink[] = [
  primaryLinks[0],
  primaryLinks[1],
  primaryLinks[2],
  secondaryLinks[0],
  secondaryLinks[1],
  secondaryLinks[2],
  primaryLinks[3]
];
