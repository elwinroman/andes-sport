import { Clock, Flag, Pencil, Play, Trash2, Trophy } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import useFetchAndLoad from '@/hooks/useFetchAndLoad'
import { getMatchStatusColor, getMatchStatusLabel, MATCH_STATUS, type MatchStatusType } from '@/pages/partidos/constants/matchStatus'
import { type DetallesFutbolApiResponse, getDetallesFutbolByPartidoService } from '@/services/detalles-futbol.service'
import { type DetallesVoleyApiResponse, getDetallesVoleyByPartidoService } from '@/services/detalles-voley.service'
import { formatTimeLocal } from '@/utils/date.util'

import type { Match } from '../hooks/useMatchManager'
import { EditMatchModal } from './EditMatchModal'
import { FinishMatchDialog } from './FinishMatchDialog'
import { FutbolScoreManager } from './FutbolScoreManager'
import { StartMatchDialog } from './StartMatchDialog'
import { VoleyScoreManager } from './VoleyScoreManager'

interface MatchCardProps {
  match: Match
  index: number
  onDelete: (matchId: number) => void
  onEdit: (matchId: number, newDate: string) => Promise<void>
  onStart: (matchId: number) => Promise<void>
  onFinish: (matchId: number) => Promise<void>
}

export function MatchCard({ match, index, onDelete, onEdit, onStart, onFinish }: MatchCardProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isStartDialogOpen, setIsStartDialogOpen] = useState(false)
  const [isFinishDialogOpen, setIsFinishDialogOpen] = useState(false)

  // Estados para los detalles del partido
  const [detallesFutbol, setDetallesFutbol] = useState<DetallesFutbolApiResponse | null>(null)
  const [detallesVoley, setDetallesVoley] = useState<DetallesVoleyApiResponse[]>([])
  const [isLoadingDetalles, setIsLoadingDetalles] = useState(false)

  const { callEndpoint: fetchDetallesFutbol } = useFetchAndLoad<DetallesFutbolApiResponse>()
  const { callEndpoint: fetchDetallesVoley } = useFetchAndLoad<DetallesVoleyApiResponse[]>()

  const sportName = match.sport === 'futbol' ? 'Fútbol' : 'Vóley'
  // Convertir UTC a hora local del usuario
  const localTime = formatTimeLocal(match.eventDate)

  // Cargar detalles cuando el partido está en curso
  useEffect(() => {
    const loadDetalles = async () => {
      if (match.status !== MATCH_STATUS.EN_CURSO) {
        return
      }

      try {
        setIsLoadingDetalles(true)

        if (match.sport === 'futbol') {
          const response = await fetchDetallesFutbol(getDetallesFutbolByPartidoService(match.id))
          setDetallesFutbol(response.data)
        } else if (match.sport === 'voley') {
          const response = await fetchDetallesVoley(getDetallesVoleyByPartidoService(match.id))
          setDetallesVoley(response.data)
        }
      } catch (error) {
        console.error('Error al cargar detalles del partido:', error)
      } finally {
        setIsLoadingDetalles(false)
      }
    }

    loadDetalles()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [match.id, match.status, match.sport])

  const handleEdit = async (matchId: number, newDate: string) => {
    await onEdit(matchId, newDate)
  }

  const handleStart = async () => {
    await onStart(match.id)
    setIsStartDialogOpen(false)
  }

  const handleFinish = async () => {
    await onFinish(match.id)
    setIsFinishDialogOpen(false)
  }

  // Determinar qué botones mostrar según el estado
  const canStart = match.status === MATCH_STATUS.PROGRAMADO
  const canFinish = match.status === MATCH_STATUS.EN_CURSO
  const canEdit = match.status === MATCH_STATUS.PROGRAMADO
  const canDelete = match.status === MATCH_STATUS.PROGRAMADO

  return (
    <>
      <EditMatchModal match={match} open={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} onSave={handleEdit} />
      <StartMatchDialog match={match} isOpen={isStartDialogOpen} onOpenChange={setIsStartDialogOpen} onConfirm={handleStart} />
      <FinishMatchDialog match={match} isOpen={isFinishDialogOpen} onOpenChange={setIsFinishDialogOpen} onConfirm={handleFinish} />
      <div className="relative p-3 sm:p-4 transition-all border rounded-md group bg-slate-50 border-border hover:shadow-md">
        {/* Header con hora y estado */}
        <div className="flex items-center justify-between mb-2 sm:mb-3 flex-wrap gap-2">
          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
            <span className="text-[10px] sm:text-xs font-medium text-slate-600">{sportName}</span>
            <div className="flex items-center gap-1 px-1.5 sm:px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium text-slate-600 bg-slate-200 rounded">
              <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              {localTime}
            </div>
            {match.isFinal && (
              <span className="flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 py-0.5 sm:py-1 text-[9px] sm:text-[10px] font-bold text-yellow-700 bg-yellow-100 border border-yellow-300 rounded-full">
                <Trophy className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                FINAL
              </span>
            )}
          </div>
          <div
            className={`px-1.5 sm:px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium rounded border ${getMatchStatusColor(match.status as MatchStatusType)}`}
          >
            {getMatchStatusLabel(match.status as MatchStatusType)}
          </div>
        </div>

        {/* Contenido principal */}
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          <div className="flex items-center flex-1 gap-2 sm:gap-4 min-w-0">
            <div
              className={`flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 text-xs sm:text-sm font-bold text-white rounded-full flex-shrink-0 ${match.sport === 'futbol' ? 'bg-blue-600' : 'bg-brand-magenta'}`}
            >
              {index + 1}
            </div>

            <div className="flex items-center flex-1 gap-1.5 sm:gap-3 min-w-0">
              <div className="flex-1 text-right min-w-0">
                <p className="font-bold text-primary text-xs sm:text-base truncate">{match.team1.nombre}</p>
                <p className="text-[10px] sm:text-xs text-secondary truncate">{match.team1.detalles}</p>
              </div>

              <div className="px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-sm font-bold text-white rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex-shrink-0">
                VS
              </div>

              <div className="flex-1 text-left min-w-0">
                <p className="font-bold text-primary text-xs sm:text-base truncate">{match.team2.nombre}</p>
                <p className="text-[10px] sm:text-xs text-secondary truncate">{match.team2.detalles}</p>
              </div>
            </div>
          </div>

          <div className="flex gap-0.5 sm:gap-1 flex-shrink-0">
            {canStart && (
              <Button
                onClick={() => setIsStartDialogOpen(true)}
                variant="ghost"
                size="icon"
                className="text-green-600 transition-opacity opacity-100 sm:opacity-0 sm:group-hover:opacity-100 hover:text-green-700 hover:bg-green-50 w-7 h-7 sm:w-9 sm:h-9"
                title="Iniciar partido"
              >
                <Play className="w-3 h-3 sm:w-4 sm:h-4" />
              </Button>
            )}
            {canFinish && (
              <Button
                onClick={() => setIsFinishDialogOpen(true)}
                variant="ghost"
                size="icon"
                className="text-gray-600 transition-opacity opacity-100 sm:opacity-0 sm:group-hover:opacity-100 hover:text-gray-700 hover:bg-gray-50 w-7 h-7 sm:w-9 sm:h-9"
                title="Finalizar partido"
              >
                <Flag className="w-3 h-3 sm:w-4 sm:h-4" />
              </Button>
            )}
            {canEdit && (
              <Button
                onClick={() => setIsEditModalOpen(true)}
                variant="ghost"
                size="icon"
                className="text-blue-600 transition-opacity opacity-100 sm:opacity-0 sm:group-hover:opacity-100 hover:text-blue-700 hover:bg-blue-50 w-7 h-7 sm:w-9 sm:h-9"
                title="Editar fecha"
              >
                <Pencil className="w-3 h-3 sm:w-4 sm:h-4" />
              </Button>
            )}
            {canDelete && (
              <Button
                onClick={() => onDelete(match.id)}
                variant="ghost"
                size="icon"
                className="text-red-600 transition-opacity opacity-100 sm:opacity-0 sm:group-hover:opacity-100 hover:text-red-700 hover:bg-red-50 w-7 h-7 sm:w-9 sm:h-9"
                title="Eliminar partido"
              >
                <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Marcador para partidos EN_CURSO */}
        {match.status === MATCH_STATUS.EN_CURSO && (
          <>
            {match.sport === 'futbol' && detallesFutbol && !isLoadingDetalles && (
              <FutbolScoreManager
                matchId={match.id}
                team1Name={match.team1.nombre}
                team2Name={match.team2.nombre}
                initialGolesLocal={detallesFutbol.golesEquipoLocal}
                initialGolesVisitante={detallesFutbol.golesEquipoVisitante}
              />
            )}
            {match.sport === 'voley' && detallesVoley.length >= 2 && !isLoadingDetalles && (
              <VoleyScoreManager
                matchId={match.id}
                team1Name={match.team1.nombre}
                team2Name={match.team2.nombre}
                isFinal={match.isFinal}
                initialSet1Local={detallesVoley.find((d) => d.numeroSet === 1)?.puntosEquipoLocal || 0}
                initialSet1Visitante={detallesVoley.find((d) => d.numeroSet === 1)?.puntosEquipoVisitante || 0}
                initialSet2Local={detallesVoley.find((d) => d.numeroSet === 2)?.puntosEquipoLocal || 0}
                initialSet2Visitante={detallesVoley.find((d) => d.numeroSet === 2)?.puntosEquipoVisitante || 0}
                initialSet3Local={detallesVoley.find((d) => d.numeroSet === 3)?.puntosEquipoLocal || 0}
                initialSet3Visitante={detallesVoley.find((d) => d.numeroSet === 3)?.puntosEquipoVisitante || 0}
              />
            )}
            {isLoadingDetalles && (
              <div className="p-4 mt-3 text-sm text-center border-t text-slate-600 bg-slate-100 border-slate-300">Cargando marcador...</div>
            )}
          </>
        )}
      </div>
    </>
  )
}
