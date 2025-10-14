import { Shuffle, Trophy } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import type { Team } from '../hooks/useMatchManager'
import { MatchPreview } from './MatchPreview'

interface TeamSelectionProps {
  availableTeams: Team[]
  selectedTeam: Team | null
  animatingFirstTeam: Team | null
  animatingTeam: Team | null
  onStartRandomMatch: () => void
}

export function TeamSelection({ availableTeams, selectedTeam, animatingFirstTeam, animatingTeam, onStartRandomMatch }: TeamSelectionProps) {
  const isAnimating = !!animatingFirstTeam || !!animatingTeam
  const showPreview = selectedTeam || animatingFirstTeam

  return (
    <Card className="flex flex-col flex-1 p-6 overflow-hidden shadow-widget">
      <CardHeader className="text-primary">
        <CardTitle className="flex items-center gap-2 font-montserrat">Seleccionar Equipos</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        {availableTeams.length === 0 ? (
          <div className="py-12 text-center">
            <Trophy className="mx-auto mb-4 w-14 h-14 text-slate-300" />
            <p className="text-secondary">Todos los equipos ya tienen partido asignado</p>
          </div>
        ) : availableTeams.length === 1 ? (
          <div className="py-12 text-center">
            <p className="text-lg text-slate-500">Solo queda 1 equipo disponible</p>
            <p className="mt-2 text-slate-400">No puede crear más partidos</p>
          </div>
        ) : (
          <>
            <div className="mb-6 text-center">
              <Button
                onClick={onStartRandomMatch}
                className="w-full py-4 text-sm text-white bg-indigo-500 hover:bg-indigo-600"
                disabled={isAnimating}
              >
                <Shuffle className="w-6 h-6" />
                {isAnimating ? 'Seleccionando...' : 'Generar Partido Aleatorio'}
              </Button>
            </div>

            {showPreview ? (
              <MatchPreview selectedTeam={selectedTeam} animatingFirstTeam={animatingFirstTeam} animatingTeam={animatingTeam} />
            ) : (
              <div className="space-y-4">
                <div>
                  <p className="mb-2 text-sm font-medium text-primary">Paso 1: Selección aleatoria del primer equipo</p>
                  <div className="p-2 transition-all border rounded-lg border-border dark:bg-action-hover bg-slate-100">
                    <p className="text-sm text-slate-400">Esperando selección...</p>
                  </div>
                </div>

                <div>
                  <p className="mb-2 text-sm font-medium text-primary">Paso 2: Selección aleatoria del oponente</p>
                  <div className="p-2 transition-all border rounded-lg border-border dark:bg-action-hover bg-slate-100">
                    <p className="text-sm text-center text-slate-400">Esperando selección...</p>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  )
}
