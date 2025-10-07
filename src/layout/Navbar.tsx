import { Gamepad, LayoutGrid, Menu, Moon, Sun } from 'lucide-react'

import { useTheme } from '../context/ThemeContext'
import { FutbolIcon } from '../icons/FutbolIcon'
import { VoleyIcon } from '../icons/VoleyIcon'

export function Navbar() {
  const { theme, toggleTheme } = useTheme()

  return (
    <nav className="w-full h-12 bg-black fixed">
      <div className="w-full h-full max-w-7xl flex items-center justify-between m-auto px-2">
        {/* Menú */}
        <ul className="w-full h-full flex overflow-x-auto items-center">
          <li className="h-full">
            <a href="/" className="h-full text-sm flex gap-1 items-center px-2 hover:bg-red-300 text-gray-900 dark:text-white">
              <LayoutGrid size={16} />
              <span>Inicio</span>
            </a>
          </li>
          <li className="h-full">
            <a href="/futbol" className="h-full text-sm flex gap-1 items-center px-2 hover:bg-red-300 text-gray-900 dark:text-white">
              <FutbolIcon size={20} />
              <span>Futbol</span>
            </a>
          </li>
          <li className="h-full">
            <a href="/voley" className="h-full text-sm flex gap-1 items-center px-2 hover:bg-red-300 text-gray-900 dark:text-white">
              <VoleyIcon size={20} />
              <span>Voley</span>
            </a>
          </li>
          <li className="h-full">
            <a href="/gincana" className="h-full text-sm flex gap-1 items-center px-2 hover:bg-red-300 text-gray-900 dark:text-white">
              <Gamepad size={20} />
              <span>Gincana</span>
            </a>
          </li>
        </ul>

        {/* Opciones */}
        <ul className="flex items-center gap-2">
          <li>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
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
