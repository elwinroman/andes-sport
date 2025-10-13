import { Menu, Moon, Sun } from 'lucide-react'
import { NavLink } from 'react-router-dom'

import { menuItems } from '../constants/menuItems'
import { useTheme } from '../context/ThemeContext'

export function Navbar() {
  const { theme, toggleTheme } = useTheme()

  return (
    <nav className="fixed w-full h-12 bg-black">
      <div className="flex items-center justify-between w-full h-full px-2 m-auto max-w-7xl">
        {/* Menú */}
        <ul className="flex items-center w-full h-full overflow-x-auto">
          {menuItems.map((item) => {
            return (
              <li key={item.href} className="h-full">
                <NavLink
                  to={item.href}
                  className={({ isActive }) =>
                    `relative flex items-center h-full gap-1 px-2 text-sm group ${isActive ? 'text-brand-magenta' : 'text-white'}`
                  }
                >
                  <span className="relative">
                    {item.label.toUpperCase()}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-magenta transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </NavLink>
              </li>
            )
          })}
        </ul>

        {/* Opciones */}
        <ul className="flex items-center gap-2">
          <li>
            <button
              onClick={toggleTheme}
              className="p-2 transition-colors rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-gray-700" />}
            </button>
          </li>
          <li>
            <Menu className="text-gray-900 dark:text-white" />
          </li>
        </ul>
      </div>
    </nav>
  )
}
