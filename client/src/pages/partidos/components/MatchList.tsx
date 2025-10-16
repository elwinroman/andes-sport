import { Swords } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import type { Match } from '../hooks/useMatchManager'
import { MatchCard } from './MatchCard'

interface MatchListProps {
  matches: Match[]
  onDeleteMatch: (matchId: number) => void
  onEditMatch: (matchId: number, newDate: string) => Promise<void>
  onStartMatch: (matchId: number) => Promise<void>
  onFinishMatch: (matchId: number) => Promise<void>
}

export function MatchList({ matches, onDeleteMatch, onEditMatch, onStartMatch, onFinishMatch }: MatchListProps) {
  return (
    <Card className="flex flex-col flex-1 p-6 shadow-widget">
      <CardHeader className="text-primary">
        <CardTitle className="flex items-center justify-between font-montserrat">
          <span className="flex items-center gap-2">Partidos Programados ({matches.length})</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        {matches.length === 0 ? (
          <div className="py-12 text-center">
            <Swords className="mx-auto mb-4 w-14 h-14 text-slate-300" />
            <p className="text-slate-500">No hay partidos programados</p>
            <p className="mt-2 text-sm text-slate-400">Selecciona equipos para crear enfrentamientos</p>
          </div>
        ) : (
          <div className="space-y-3">
            {matches.map((match, index) => (
              <MatchCard
                key={match.id}
                match={match}
                index={index}
                onDelete={onDeleteMatch}
                onEdit={onEditMatch}
                onStart={onStartMatch}
                onFinish={onFinishMatch}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
