import { Pencil, Trash2 } from 'lucide-react'

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
  return (
    <Card className="overflow-hidden transition-shadow shadow-widget hover:shadow-md">
      <CardHeader className="pt-4 text-primary">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <CardTitle className="text-xl font-montserrat">{team.nombre}</CardTitle>
            {team.detalles && <p className="text-sm text-left">{team.detalles}</p>}
          </div>
          <div className="flex self-start gap-2">
            <Button
              onClick={() => onEditTeam(team)}
              variant="ghost"
              size="icon-sm"
              className="text-blue-500 hover:bg-blue-500 dark:hover:bg-blue-500 hover:text-white"
            >
              <Pencil />
            </Button>
            <Button
              onClick={() => onDeleteTeam(team.id)}
              variant="ghost"
              size="icon-sm"
              className="text-red-500 hover:bg-red-500 dark:hover:bg-red-500 hover:text-white"
            >
              <Trash2 />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <PlayerList team={team} onEditPlayer={onEditPlayer} onDeletePlayer={onDeletePlayer} onOpenNewPlayerDialog={onOpenNewPlayerDialog} />
      </CardContent>
    </Card>
  )
}
