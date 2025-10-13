import { Pencil, Plus, Trash2, Users } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { type Player, type Team } from '../hooks/useTeamPlayerManager'

interface PlayerListProps {
  team: Team
  onEditPlayer: (teamId: number, player: Player) => void
  onDeletePlayer: (teamId: number, playerId: number) => void
  onOpenNewPlayerDialog: (teamId: number) => void
}

export function PlayerList({ team, onEditPlayer, onDeletePlayer, onOpenNewPlayerDialog }: PlayerListProps) {
  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-primary/80 flex items-center gap-2">
          <Users size={16} />
          Jugadores ({team.jugadores.length})
        </h3>
        <Button onClick={() => onOpenNewPlayerDialog(team.id)} size="sm" className="bg-green-600 hover:bg-green-700 text-white">
          <Plus className="mr-1" />
          Agregar Jugador
        </Button>
      </div>

      {team.jugadores.length === 0 ? (
        <div className="text-center py-8 bg-slate-50 rounded-lg border-2 border-dashed border-slate-200 dark:border-gray-600 dark:bg-background">
          <p className="text-secondary">No hay jugadores en este equipo</p>
          <Button onClick={() => onOpenNewPlayerDialog(team.id)} variant="link" className="text-brand-magenta">
            Agregar el primero
          </Button>
        </div>
      ) : (
        <div className="grid gap-2">
          {team.jugadores.map((player) => (
            <div
              key={player.id}
              className="flex items-center justify-between px-2 py-1 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors border border-border dark:bg-background dark:hover:bg-zinc-900"
            >
              <div>
                <p className="font-medium text-primary/90 text-sm px-2">
                  {player.nombres} {player.apellidos}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => onEditPlayer(team.id, player)}
                  variant="ghost"
                  size="icon-sm"
                  className="text-blue-600 hover:text-blue-700 hover:bg-blue-100 dark:hover:bg-blue-200"
                >
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button
                  onClick={() => onDeletePlayer(team.id, player.id)}
                  variant="ghost"
                  size="icon-sm"
                  className="text-red-600 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-200"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}
