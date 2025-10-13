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
    <Card className="overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
      <CardHeader className="bg-brand-cyan dark:bg-brand-blue text-white py-1">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <CardTitle className="text-2xl">{team.nombre}</CardTitle>
            {team.detalles && <p className="text-sm">{team.detalles}</p>}
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => onEditTeam(team)}
              variant="ghost"
              size="icon-sm"
              className="text-white hover:bg-blue-500 dark:hover:bg-blue-500"
            >
              <Pencil />
            </Button>
            <Button onClick={() => onDeleteTeam(team.id)} variant="ghost" size="icon-sm" className="text-white hover:bg-red-500">
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
