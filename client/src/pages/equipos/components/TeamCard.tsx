import { ChevronDown, ChevronUp, Pencil, Trash2, Users } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { type Team } from '../hooks/useTeamPlayerManager'
import { PlayerList } from './PlayerList'

interface TeamCardProps {
  team: Team
  onEditTeam: (team: Team) => void
  onDeleteTeam: (teamId: number) => void
  onEditPlayer: (teamId: number, player: { id: number; nombres: string; apellidos: string }) => void
  onDeletePlayer: (teamId: number, playerId: number) => void
  onOpenNewPlayerDialog: (teamId: number) => void
}

export function TeamCard({ team, onEditTeam, onDeleteTeam, onEditPlayer, onDeletePlayer, onOpenNewPlayerDialog }: TeamCardProps) {
  const [isPlayersOpen, setIsPlayersOpen] = useState(false)

  return (
    <Card className="p-4 overflow-hidden transition-shadow shadow-widget hover:shadow-md">
      <CardHeader className="pb-3 text-primary">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-montserrat">{team.nombre}</CardTitle>
            {team.detalles && <p className="text-sm text-left text-secondary">{team.detalles}</p>}
          </div>
          <div className="flex self-start gap-2">
            <Button
              onClick={() => onEditTeam(team)}
              variant="ghost"
              size="icon-sm"
              className="text-blue-500 hover:bg-blue-500 dark:hover:bg-blue-500 hover:text-white"
            >
              <Pencil className="w-4 h-4" />
            </Button>
            <Button
              onClick={() => onDeleteTeam(team.id)}
              variant="ghost"
              size="icon-sm"
              className="text-red-500 hover:bg-red-500 dark:hover:bg-red-500 hover:text-white"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <button
          onClick={() => setIsPlayersOpen(!isPlayersOpen)}
          className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium transition-colors rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span>Jugadores ({team.jugadores.length})</span>
          </div>
          {isPlayersOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {isPlayersOpen && (
          <div className="mt-3">
            <PlayerList
              team={team}
              onEditPlayer={onEditPlayer}
              onDeletePlayer={onDeletePlayer}
              onOpenNewPlayerDialog={onOpenNewPlayerDialog}
            />
          </div>
        )}
      </CardContent>
    </Card>
  )
}
