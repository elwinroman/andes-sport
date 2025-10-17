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
  const [error, setError] = useState<string | null>(null)

  const { callEndpoint: updateDetalles } = useFetchAndLoad<DetallesFutbolApiResponse>()

  const updateScore = async (newGolesLocal: number, newGolesVisitante: number) => {
    // Guardar valores previos para rollback en caso de error
    const previousGolesLocal = golesLocal
    const previousGolesVisitante = golesVisitante

    // Optimistic UI: actualizar inmediatamente la interfaz
    setGolesLocal(newGolesLocal)
    setGolesVisitante(newGolesVisitante)
    setError(null)

    try {
      const params: UpdateDetallesFutbolRequest = {
        golesEquipoLocal: newGolesLocal,
        golesEquipoVisitante: newGolesVisitante,
      }

      await updateDetalles(updateDetallesFutbolService(matchId, params))

      // Notificar al componente padre si existe el callback
      onScoreUpdate?.(newGolesLocal, newGolesVisitante)

      console.log(`✅ Marcador actualizado: ${team1Name} ${newGolesLocal} - ${newGolesVisitante} ${team2Name}`)
    } catch (err) {
      // Rollback: restaurar valores anteriores en caso de error
      setGolesLocal(previousGolesLocal)
      setGolesVisitante(previousGolesVisitante)
      setError('Error al actualizar el marcador')
      console.error('Error al actualizar el marcador:', err)

      // Limpiar el error después de 3 segundos
      setTimeout(() => setError(null), 3000)
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
    <div className="flex flex-col gap-2 p-4 mt-3 border-t bg-slate-100 border-slate-300">
      {error && <div className="px-3 py-2 text-sm text-center text-red-700 bg-red-100 border border-red-300 rounded">{error}</div>}
      <div className="flex items-center justify-center gap-4">
        {/* Equipo Local */}
        <div className="flex flex-col items-center flex-1 gap-2">
          <span className="text-sm font-medium text-slate-700">{team1Name}</span>
          <div className="flex items-center gap-2">
            <Button
              onClick={() => handleDecrement('local')}
              disabled={golesLocal === 0}
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
              disabled={golesVisitante === 0}
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
              variant="outline"
              size="icon"
              className="w-8 h-8 text-green-600 border-green-300 hover:bg-green-50 hover:text-green-700"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
