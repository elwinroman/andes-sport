export interface MenuItem {
  href: string
  label: string
  requiresAuth: boolean
}

export const menuItems: MenuItem[] = [
  {
    href: '/',
    label: 'Inicio',
    requiresAuth: false,
  },
  {
    href: '/futbol',
    label: 'Futbol',
    requiresAuth: false,
  },
  {
    href: '/voley',
    label: 'Voley',
    requiresAuth: false,
  },
  {
    href: '/gincana',
    label: 'Gincana',
    requiresAuth: false,
  },
  {
    href: '/gestor-equipos',
    label: 'Gestor equipos',
    requiresAuth: true,
  },
  {
    href: '/gestor-partidos',
    label: 'Gestor partidos',
    requiresAuth: true,
  },
]
