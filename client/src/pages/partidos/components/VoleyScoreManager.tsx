import { Minus, Plus } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import useFetchAndLoad from '@/hooks/useFetchAndLoad'
import { VOLEY_CONFIG } from '@/pages/partidos/constants/sportIds'
import {
  type DetallesVoleyApiResponse,
  type UpdateDetallesVoleyRequest,
  updateDetallesVoleyService,
} from '@/services/detalles-voley.service'

interface SetScore {
  numeroSet: number
  puntosLocal: number
  puntosVisitante: number
  isCompleted: boolean
}

interface VoleyScoreManagerProps {
  matchId: number
  team1Name: string
  team2Name: string
  initialSet1Local?: number
  initialSet1Visitante?: number
  initialSet2Local?: number
  initialSet2Visitante?: number
  onScoreUpdate?: (set1: SetScore, set2: SetScore) => void
}

export function VoleyScoreManager({
  matchId,
  team1Name,
  team2Name,
  initialSet1Local = 0,
  initialSet1Visitante = 0,
  initialSet2Local = 0,
  initialSet2Visitante = 0,
  onScoreUpdate,
}: VoleyScoreManagerProps) {
  const [set1, setSet1] = useState<SetScore>({
    numeroSet: 1,
    puntosLocal: initialSet1Local,
    puntosVisitante: initialSet1Visitante,
    isCompleted: initialSet1Local >= VOLEY_CONFIG.MAX_POINTS_PER_SET || initialSet1Visitante >= VOLEY_CONFIG.MAX_POINTS_PER_SET,
  })

  const [set2, setSet2] = useState<SetScore>({
    numeroSet: 2,
    puntosLocal: initialSet2Local,
    puntosVisitante: initialSet2Visitante,
    isCompleted: initialSet2Local >= VOLEY_CONFIG.MAX_POINTS_PER_SET || initialSet2Visitante >= VOLEY_CONFIG.MAX_POINTS_PER_SET,
  })

  const [error, setError] = useState<string | null>(null)

  const { callEndpoint: updateDetalles } = useFetchAndLoad<DetallesVoleyApiResponse>()

  const updateSetScore = async (numeroSet: number, newPuntosLocal: number, newPuntosVisitante: number) => {
    const currentSet = numeroSet === 1 ? set1 : set2

    // Guardar valores previos para rollback en caso de error
    const previousPuntosLocal = currentSet.puntosLocal
    const previousPuntosVisitante = currentSet.puntosVisitante

    // Determinar si el set está completo
    const isCompleted = newPuntosLocal >= VOLEY_CONFIG.MAX_POINTS_PER_SET || newPuntosVisitante >= VOLEY_CONFIG.MAX_POINTS_PER_SET

    // Optimistic UI: actualizar inmediatamente la interfaz
    const updatedSet: SetScore = {
      numeroSet,
      puntosLocal: newPuntosLocal,
      puntosVisitante: newPuntosVisitante,
      isCompleted,
    }

    if (numeroSet === 1) {
      setSet1(updatedSet)
    } else {
      setSet2(updatedSet)
    }
    setError(null)

    try {
      const params: UpdateDetallesVoleyRequest = {
        puntosEquipoLocal: newPuntosLocal,
        puntosEquipoVisitante: newPuntosVisitante,
      }

      await updateDetalles(updateDetallesVoleyService(matchId, numeroSet, params))

      // Notificar al componente padre si existe el callback
      if (numeroSet === 1) {
        onScoreUpdate?.(updatedSet, set2)
      } else {
        onScoreUpdate?.(set1, updatedSet)
      }

      console.log(`✅ Set ${numeroSet} actualizado: ${team1Name} ${newPuntosLocal} - ${newPuntosVisitante} ${team2Name}`)
    } catch (err) {
      // Rollback: restaurar valores anteriores en caso de error
      const rolledBackSet: SetScore = {
        numeroSet,
        puntosLocal: previousPuntosLocal,
        puntosVisitante: previousPuntosVisitante,
        isCompleted: previousPuntosLocal >= VOLEY_CONFIG.MAX_POINTS_PER_SET || previousPuntosVisitante >= VOLEY_CONFIG.MAX_POINTS_PER_SET,
      }

      if (numeroSet === 1) {
        setSet1(rolledBackSet)
      } else {
        setSet2(rolledBackSet)
      }

      setError(`Error al actualizar el set ${numeroSet}`)
      console.error(`Error al actualizar el set ${numeroSet}:`, err)

      // Limpiar el error después de 3 segundos
      setTimeout(() => setError(null), 3000)
    }
  }

  const handleIncrement = (numeroSet: number, team: 'local' | 'visitante') => {
    const currentSet = numeroSet === 1 ? set1 : set2

    // Si el set ya está completo, no permitir más incrementos
    if (currentSet.isCompleted) {
      return
    }

    if (team === 'local') {
      const newPuntos = currentSet.puntosLocal + 1
      updateSetScore(numeroSet, newPuntos, currentSet.puntosVisitante)
    } else {
      const newPuntos = currentSet.puntosVisitante + 1
      updateSetScore(numeroSet, currentSet.puntosLocal, newPuntos)
    }
  }

  const handleDecrement = (numeroSet: number, team: 'local' | 'visitante') => {
    const currentSet = numeroSet === 1 ? set1 : set2

    if (team === 'local') {
      // No permitir puntos negativos
      if (currentSet.puntosLocal > 0) {
        updateSetScore(numeroSet, currentSet.puntosLocal - 1, currentSet.puntosVisitante)
      }
    } else {
      // No permitir puntos negativos
      if (currentSet.puntosVisitante > 0) {
        updateSetScore(numeroSet, currentSet.puntosLocal, currentSet.puntosVisitante - 1)
      }
    }
  }

  const renderSetControls = (setData: SetScore) => {
    const isSet1 = setData.numeroSet === 1

    return (
      <div className="flex flex-col gap-3 p-3 border rounded-lg bg-slate-50 border-slate-300">
        <div className="text-xs font-semibold text-center text-slate-600">Set {setData.numeroSet}</div>

        <div className="flex items-center justify-center gap-3">
          {/* Equipo Local */}
          <div className="flex flex-col items-center gap-1">
            <span className="text-xs font-medium text-slate-600">{isSet1 ? team1Name : ''}</span>
            <div className="flex items-center gap-1">
              <Button
                onClick={() => handleDecrement(setData.numeroSet, 'local')}
                disabled={setData.puntosLocal === 0}
                variant="outline"
                size="icon"
                className="w-6 h-6 text-red-600 border-red-300 hover:bg-red-50 hover:text-red-700 disabled:opacity-30"
              >
                <Minus className="w-3 h-3" />
              </Button>
              <div
                className={`flex items-center justify-center w-12 h-10 text-lg font-bold rounded ${
                  setData.isCompleted && setData.puntosLocal >= VOLEY_CONFIG.MAX_POINTS_PER_SET
                    ? 'bg-green-500 text-white'
                    : 'bg-slate-200 text-slate-800'
                }`}
              >
                {setData.puntosLocal}
              </div>
              <Button
                onClick={() => handleIncrement(setData.numeroSet, 'local')}
                disabled={setData.isCompleted}
                variant="outline"
                size="icon"
                className="w-6 h-6 text-green-600 border-green-300 hover:bg-green-50 hover:text-green-700 disabled:opacity-30"
              >
                <Plus className="w-3 h-3" />
              </Button>
            </div>
          </div>

          {/* Separador */}
          <div className="text-lg font-bold text-slate-500">-</div>

          {/* Equipo Visitante */}
          <div className="flex flex-col items-center gap-1">
            <span className="text-xs font-medium text-slate-600">{isSet1 ? team2Name : ''}</span>
            <div className="flex items-center gap-1">
              <Button
                onClick={() => handleDecrement(setData.numeroSet, 'visitante')}
                disabled={setData.puntosVisitante === 0}
                variant="outline"
                size="icon"
                className="w-6 h-6 text-red-600 border-red-300 hover:bg-red-50 hover:text-red-700 disabled:opacity-30"
              >
                <Minus className="w-3 h-3" />
              </Button>
              <div
                className={`flex items-center justify-center w-12 h-10 text-lg font-bold rounded ${
                  setData.isCompleted && setData.puntosVisitante >= VOLEY_CONFIG.MAX_POINTS_PER_SET
                    ? 'bg-green-500 text-white'
                    : 'bg-slate-200 text-slate-800'
                }`}
              >
                {setData.puntosVisitante}
              </div>
              <Button
                onClick={() => handleIncrement(setData.numeroSet, 'visitante')}
                disabled={setData.isCompleted}
                variant="outline"
                size="icon"
                className="w-6 h-6 text-green-600 border-green-300 hover:bg-green-50 hover:text-green-700 disabled:opacity-30"
              >
                <Plus className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </div>

        {setData.isCompleted && (
          <div className="px-2 py-1 text-xs font-medium text-center rounded bg-slate-200 text-slate-600">Completado</div>
        )}
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3 p-4 mt-3 border-t bg-slate-100 border-slate-300">
      <div className="text-sm font-semibold text-center text-slate-700">Marcador por Sets</div>
      {error && <div className="px-3 py-2 text-sm text-center text-red-700 bg-red-100 border border-red-300 rounded">{error}</div>}
      <div className="grid grid-cols-2 gap-3">
        {renderSetControls(set1)}
        {renderSetControls(set2)}
      </div>
    </div>
  )
}
