import { Trash2 } from 'lucide-react'

import { Button } from '@/components/ui/button'

import type { Match } from '../hooks/useMatchManager'

interface MatchCardProps {
  match: Match
  index: number
  onDelete: (matchId: number) => void
}

export function MatchCard({ match, index, onDelete }: MatchCardProps) {
  return (
    <div className="relative p-4 transition-all border rounded-lg group bg-slate-100 dark:bg-action-hover to-slate-100 border-border hover:shadow-md">
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

        <Button
          onClick={() => onDelete(match.id)}
          variant="ghost"
          size="icon"
          className="text-red-600 transition-opacity opacity-0 group-hover:opacity-100 hover:text-red-700 hover:bg-red-50"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
