import { Minus, Plus } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import useFetchAndLoad from '@/hooks/useFetchAndLoad'
import {
  type DetallesFutbolApiResponse,
  type UpdateDetallesFutbolRequest,
  updateDetallesFutbolService,
} from '@/services/detalles-futbol.service'

interface FutbolScoreManagerProps {
  matchId: number
  team1Name: string
  team2Name: string
  initialGolesLocal?: number
  initialGolesVisitante?: number
  onScoreUpdate?: (golesLocal: number, golesVisitante: number) => void
}

export function FutbolScoreManager({
  matchId,
  team1Name,
  team2Name,
  initialGolesLocal = 0,
  initialGolesVisitante = 0,
  onScoreUpdate,
}: FutbolScoreManagerProps) {
  const [golesLocal, setGolesLocal] = useState(initialGolesLocal)
  const [golesVisitante, setGolesVisitante] = useState(initialGolesVisitante)
  const [isUpdating, setIsUpdating] = useState(false)

  const { callEndpoint: updateDetalles } = useFetchAndLoad<DetallesFutbolApiResponse>()

  const updateScore = async (newGolesLocal: number, newGolesVisitante: number) => {
    try {
      setIsUpdating(true)

      const params: UpdateDetallesFutbolRequest = {
        golesEquipoLocal: newGolesLocal,
        golesEquipoVisitante: newGolesVisitante,
      }

      await updateDetalles(updateDetallesFutbolService(matchId, params))

      // Actualizar estado local
      setGolesLocal(newGolesLocal)
      setGolesVisitante(newGolesVisitante)

      // Notificar al componente padre si existe el callback
      onScoreUpdate?.(newGolesLocal, newGolesVisitante)

      console.log(`✅ Marcador actualizado: ${team1Name} ${newGolesLocal} - ${newGolesVisitante} ${team2Name}`)
    } catch (error) {
      console.error('Error al actualizar el marcador:', error)
    } finally {
      setIsUpdating(false)
    }
  }

  const handleIncrement = (team: 'local' | 'visitante') => {
    if (team === 'local') {
      updateScore(golesLocal + 1, golesVisitante)
    } else {
      updateScore(golesLocal, golesVisitante + 1)
    }
  }

  const handleDecrement = (team: 'local' | 'visitante') => {
    if (team === 'local') {
      // No permitir goles negativos
      if (golesLocal > 0) {
        updateScore(golesLocal - 1, golesVisitante)
      }
    } else {
      // No permitir goles negativos
      if (golesVisitante > 0) {
        updateScore(golesLocal, golesVisitante - 1)
      }
    }
  }

  return (
    <div className="flex items-center justify-center gap-4 p-4 mt-3 border-t bg-slate-100 border-slate-300">
      {/* Equipo Local */}
      <div className="flex flex-col items-center flex-1 gap-2">
        <span className="text-sm font-medium text-slate-700">{team1Name}</span>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => handleDecrement('local')}
            disabled={golesLocal === 0 || isUpdating}
            variant="outline"
            size="icon"
            className="w-8 h-8 text-red-600 border-red-300 hover:bg-red-50 hover:text-red-700 disabled:opacity-30"
          >
            <Minus className="w-4 h-4" />
          </Button>
          <div className="flex items-center justify-center w-16 h-12 text-2xl font-bold rounded bg-slate-200 text-slate-800">
            {golesLocal}
          </div>
          <Button
            onClick={() => handleIncrement('local')}
            disabled={isUpdating}
            variant="outline"
            size="icon"
            className="w-8 h-8 text-green-600 border-green-300 hover:bg-green-50 hover:text-green-700"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Separador */}
      <div className="text-2xl font-bold text-slate-500">-</div>

      {/* Equipo Visitante */}
      <div className="flex flex-col items-center flex-1 gap-2">
        <span className="text-sm font-medium text-slate-700">{team2Name}</span>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => handleDecrement('visitante')}
            disabled={golesVisitante === 0 || isUpdating}
            variant="outline"
            size="icon"
            className="w-8 h-8 text-red-600 border-red-300 hover:bg-red-50 hover:text-red-700 disabled:opacity-30"
          >
            <Minus className="w-4 h-4" />
          </Button>
          <div className="flex items-center justify-center w-16 h-12 text-2xl font-bold rounded bg-slate-200 text-slate-800">
            {golesVisitante}
          </div>
          <Button
            onClick={() => handleIncrement('visitante')}
            disabled={isUpdating}
            variant="outline"
            size="icon"
            className="w-8 h-8 text-green-600 border-green-300 hover:bg-green-50 hover:text-green-700"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
