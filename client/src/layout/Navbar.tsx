// import { Menu, Moon, Sun } from 'lucide-react'
import type { MouseEvent } from 'react'
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { useStore } from '@/zustand/store'

import { menuItems } from '../constants/menuItems'
// import { useTheme } from '../context/ThemeContext'

export function Navbar() {
  // const { theme, toggleTheme } = useTheme()
  const isAuthenticated = useStore((state) => state.isAuthenticated)
  const navigate = useNavigate()
  const clearSession = useStore((state) => state.clearSession)
  // Filtramos solo los items visibles según el estado de autenticación
  const visibleItems = menuItems.filter((item) => !item.requiresAuth || (item.requiresAuth && isAuthenticated))

  const handleCloseSession = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    clearSession()
    navigate('/')
  }

  return (
    <nav className="fixed z-50 w-full h-12 bg-black font-montserrat">
      <div className="flex items-center justify-between w-full h-full px-2 m-auto max-w-7xl">
        {/* Menú */}
        <ul className="flex items-center w-full h-full overflow-x-auto">
          {visibleItems.map((item) => (
            <li key={item.href} className="h-full">
              <NavLink
                to={item.href}
                className={({ isActive }) =>
                  `relative flex items-center h-full gap-1 px-2 text-sm font-medium group ${isActive ? 'text-brand-magenta' : 'text-white'}`
                }
              >
                <span className="relative">
                  {item.label.toUpperCase()}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-magenta transition-all duration-300 group-hover:w-full"></span>
                </span>
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Opciones */}
        <ul className="flex items-center gap-2">
          {/* <li>
            <button
              onClick={toggleTheme}
              className="p-2 transition-colors rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-gray-700" />}
            </button>
          </li> */}
          {/* <li>
            <Menu className="text-white" />
          </li> */}
          {isAuthenticated && (
            <li>
              <Button className="bg-white text-black hover:bg-white/80" size="sm" onClick={handleCloseSession}>
                Cerrar sesión
              </Button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  )
}
