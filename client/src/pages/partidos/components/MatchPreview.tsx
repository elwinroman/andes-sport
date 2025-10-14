import type { Team } from '../hooks/useMatchManager'

interface MatchPreviewProps {
  selectedTeam: Team | null
  animatingFirstTeam: Team | null
  animatingTeam: Team | null
}

export function MatchPreview({ selectedTeam, animatingFirstTeam, animatingTeam }: MatchPreviewProps) {
  const displayTeam = selectedTeam || animatingFirstTeam

  if (!displayTeam) return null

  return (
    <div className="p-6 border-2 rounded-lg border-border bg-background">
      <p className="mb-4 text-sm font-semibold text-center text-secondary">Vista Previa del Partido</p>
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 p-4 text-center transition-all bg-purple-100 rounded-lg shadow-widget">
          <p className="text-lg font-bold text-purple-900">{displayTeam.nombre}</p>
          <p className="mt-1 text-sm text-purple-600">{displayTeam.detalles}</p>
        </div>

        <div className="text-3xl font-bold text-primary font-montserrat">VS</div>

        <div
          className={`flex-1 text-center p-4 rounded-lg shadow-sm transition-all ${
            animatingTeam ? 'bg-orange-100 animate-pulse' : 'bg-slate-100'
          }`}
        >
          {animatingTeam ? (
            <>
              <p className="text-lg font-bold text-orange-900">{animatingTeam.nombre}</p>
              <p className="mt-1 text-sm text-orange-600">{animatingTeam.detalles}</p>
            </>
          ) : (
            <p className="text-lg text-slate-400">?</p>
          )}
        </div>
      </div>
    </div>
  )
}
