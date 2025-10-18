import { AnimatePresence, motion } from 'framer-motion'
import { Users } from 'lucide-react'
import { forwardRef, useEffect, useState } from 'react'

import { type JugadorSinEquipoApiResponse } from '@/models'
import { getJugadoresByEquipoService } from '@/services/jugador.service'

interface Props {
  idEquipo: number
  teamName: string
  isOpen: boolean
  onClose: () => void
  position?: { x: number; y: number }
}

export const TeamPlayersPopover = forwardRef<HTMLDivElement, Props>(({ idEquipo, teamName, isOpen, onClose, position }, ref) => {
  const [jugadores, setJugadores] = useState<JugadorSinEquipoApiResponse[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true)
      setError(null)

      const { call } = getJugadoresByEquipoService(idEquipo)

      call
        .then((response) => {
          setJugadores(response.data)
        })
        .catch((err) => {
          console.error('Error al cargar jugadores:', err)
          setError('Error al cargar jugadores')
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
  }, [isOpen, idEquipo])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop for mobile */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/20 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Popover */}
          <motion.div
            ref={ref}
            className="fixed z-50 w-64 overflow-hidden bg-white border shadow-lg md:absolute rounded-md border-primary/10"
            style={
              position
                ? {
                    left: `${position.x}px`,
                    top: `${position.y}px`,
                  }
                : {}
            }
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.15 }}
          >
            {/* Header */}
            <div className="px-3 py-2 border-b bg-gradient-to-r from-brand-cyan/5 to-transparent border-primary/10">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-brand-cyan shrink-0" />
                <h4 className="text-sm font-bold truncate text-primary">{teamName}</h4>
              </div>
            </div>

            {/* Content */}
            <div className="max-h-64 overflow-y-auto">
              {isLoading ? (
                <div className="px-3 py-4 text-xs text-center text-secondary">Cargando jugadores...</div>
              ) : error ? (
                <div className="px-3 py-4 text-xs text-center text-red-500">{error}</div>
              ) : jugadores.length === 0 ? (
                <div className="px-3 py-4 text-xs text-center text-secondary">No hay jugadores registrados</div>
              ) : (
                <ul className="py-1">
                  {jugadores.map((jugador) => (
                    <li key={jugador.idJugador} className="px-3 py-2 text-xs transition-colors hover:bg-background text-primary/90">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center justify-center w-6 h-6 rounded-full shrink-0 bg-brand-cyan/10">
                          <span className="text-xs font-bold text-brand-cyan">{jugador.cNombreJugador.charAt(0).toUpperCase()}</span>
                        </div>
                        <span className="truncate">
                          {jugador.cNombreJugador} {jugador.cApellidoJugador}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer with count */}
            {!isLoading && !error && jugadores.length > 0 && (
              <div className="px-3 py-1.5 text-xs text-center border-t bg-background/50 text-secondary border-primary/5">
                {jugadores.length} {jugadores.length === 1 ? 'jugador' : 'jugadores'}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
})

TeamPlayersPopover.displayName = 'TeamPlayersPopover'
