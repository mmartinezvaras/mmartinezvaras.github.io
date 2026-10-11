// Navegación compartida por la cabecera (escritorio) y la barra de pestañas (móvil).
export interface NavLink {
  path: string;
  label: string;
}

// Pestañas principales: lo que un reclutador busca primero, al alcance del pulgar.
export const primaryLinks: NavLink[] = [
  { path: '/inicio', label: 'Inicio' },
  { path: '/proyectos', label: 'Proyectos' },
  { path: '/estudios', label: 'Trayectoria' },
  { path: '/contacto', label: 'Contacto' }
];

// En móvil viven en la hoja "Más".
export const secondaryLinks: NavLink[] = [
  { path: '/sobre-mi', label: 'Sobre mí' },
  { path: '/skills', label: 'Skills' },
  { path: '/lab', label: 'Lab' }
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
