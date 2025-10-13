export interface MenuItem {
  href: string
  label: string
  iconSize?: number
}

export const menuItems: MenuItem[] = [
  {
    href: '/',
    label: 'Inicio',
    iconSize: 16,
  },
  {
    href: '/futbol',
    label: 'Futbol',
    iconSize: 20,
  },
  {
    href: '/voley',
    label: 'Voley',
    iconSize: 20,
  },
  {
    href: '/gincana',
    label: 'Gincana',
    iconSize: 20,
  },
]
