import { Clock, Flag, Pencil, Play, Trash2 } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { getMatchStatusColor, getMatchStatusLabel, MATCH_STATUS, type MatchStatusType } from '@/pages/partidos/constants/matchStatus'
import { formatTimeLocal } from '@/utils/date.util'

import type { Match } from '../hooks/useMatchManager'
import { EditMatchModal } from './EditMatchModal'
import { FinishMatchDialog } from './FinishMatchDialog'
import { StartMatchDialog } from './StartMatchDialog'

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

  const sportName = match.sport === 'futbol' ? 'Fútbol' : 'Vóley'
  // Convertir UTC a hora local del usuario
  const localTime = formatTimeLocal(match.eventDate)

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
      <div className="relative p-4 transition-all border rounded-md group bg-slate-50 border-border hover:shadow-md">
        {/* Header con hora y estado */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-slate-600">{sportName}</span>
            <div className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-slate-600 bg-slate-200 rounded">
              <Clock className="w-3 h-3" />
              {localTime}
            </div>
          </div>
          <div className={`px-2 py-1 text-xs font-medium rounded border ${getMatchStatusColor(match.status as MatchStatusType)}`}>
            {getMatchStatusLabel(match.status as MatchStatusType)}
          </div>
        </div>

        {/* Contenido principal */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center flex-1 gap-4">
            <div className="flex items-center justify-center w-8 h-8 text-sm font-bold text-white rounded-full bg-brand-magenta">
              {index + 1}
            </div>

            <div className="flex items-center flex-1 gap-3">
              <div className="flex-1 text-right">
                <p className="font-bold text-primary">{match.team1.nombre}</p>
                <p className="text-xs text-secondary">{match.team1.detalles}</p>
              </div>

              <div className="px-3 py-1 text-sm font-bold text-white rounded-full bg-gradient-to-r from-orange-500 to-red-500">VS</div>

              <div className="flex-1 text-left">
                <p className="font-bold text-primary">{match.team2.nombre}</p>
                <p className="text-xs text-secondary">{match.team2.detalles}</p>
              </div>
            </div>
          </div>

          <div className="flex gap-1">
            {canStart && (
              <Button
                onClick={() => setIsStartDialogOpen(true)}
                variant="ghost"
                size="icon"
                className="text-green-600 transition-opacity opacity-0 group-hover:opacity-100 hover:text-green-700 hover:bg-green-50"
                title="Iniciar partido"
              >
                <Play className="w-4 h-4" />
              </Button>
            )}
            {canFinish && (
              <Button
                onClick={() => setIsFinishDialogOpen(true)}
                variant="ghost"
                size="icon"
                className="text-gray-600 transition-opacity opacity-0 group-hover:opacity-100 hover:text-gray-700 hover:bg-gray-50"
                title="Finalizar partido"
              >
                <Flag className="w-4 h-4" />
              </Button>
            )}
            {canEdit && (
              <Button
                onClick={() => setIsEditModalOpen(true)}
                variant="ghost"
                size="icon"
                className="text-blue-600 transition-opacity opacity-0 group-hover:opacity-100 hover:text-blue-700 hover:bg-blue-50"
                title="Editar fecha"
              >
                <Pencil className="w-4 h-4" />
              </Button>
            )}
            {canDelete && (
              <Button
                onClick={() => onDelete(match.id)}
                variant="ghost"
                size="icon"
                className="text-red-600 transition-opacity opacity-0 group-hover:opacity-100 hover:text-red-700 hover:bg-red-50"
                title="Eliminar partido"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
