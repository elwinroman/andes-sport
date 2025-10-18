import { Card } from '@components/Card'
import { Crown, Trophy } from 'lucide-react'

import { MATCH_STATUS } from '@/pages/partidos/constants/matchStatus'
import { VOLEY_CONFIG } from '@/pages/partidos/constants/sportIds'
import { type PartidoApiResponse } from '@/services/partido.service'

interface Props {
  className?: string
  sportType: 'futbol' | 'voley'
  partidos: PartidoApiResponse[]
  isLoading: boolean
}

interface FinalMatch {
  team1: string
  team2: string
  score1?: number
  score2?: number
  sets1?: number
  sets2?: number
  isFinished: boolean
  winner?: 'team1' | 'team2' | null
}

export function BracketFinal({ className, sportType, partidos, isLoading }: Props) {
  // Filtrar partido final
  const partidoFinal = partidos.find((p) => p.lEtapaFinal === true)

  if (isLoading && !partidoFinal) {
    return (
      <Card className={className}>
        <div className="px-4 py-4 bg-gradient-to-br from-slate-900 to-slate-800">
          <div className="flex items-center gap-2 mb-3">
            <Trophy className="w-5 h-5 text-yellow-400" />
            <h5 className="font-bold text-white font-montserrat">Final</h5>
          </div>
          <div className="py-8 text-sm text-center text-slate-400">Cargando...</div>
        </div>
      </Card>
    )
  }

  if (!partidoFinal) {
    return null // No mostrar nada si no hay partido final
  }

  // Procesar datos del partido final
  const finalMatch: FinalMatch = {
    team1: partidoFinal.equipoLocal.cEquipo,
    team2: partidoFinal.equipoVisitante.cEquipo,
    isFinished: partidoFinal.idEstado === MATCH_STATUS.FINALIZADO,
  }

  if (sportType === 'futbol' && partidoFinal.detallesFutbol) {
    const goles1 = partidoFinal.detallesFutbol.golesEquipoLocal
    const goles2 = partidoFinal.detallesFutbol.golesEquipoVisitante

    finalMatch.score1 = goles1
    finalMatch.score2 = goles2

    if (finalMatch.isFinished) {
      if (goles1 > goles2) finalMatch.winner = 'team1'
      else if (goles2 > goles1) finalMatch.winner = 'team2'
    }
  } else if (sportType === 'voley' && partidoFinal.detallesVoley && partidoFinal.detallesVoley.length > 0) {
    let sets1 = 0
    let sets2 = 0

    partidoFinal.detallesVoley.forEach((set) => {
      if (set.puntosEquipoLocal >= VOLEY_CONFIG.MAX_POINTS_PER_SET) {
        sets1++
      } else if (set.puntosEquipoVisitante >= VOLEY_CONFIG.MAX_POINTS_PER_SET) {
        sets2++
      }
    })

    finalMatch.sets1 = sets1
    finalMatch.sets2 = sets2

    if (finalMatch.isFinished) {
      if (sets1 > sets2) finalMatch.winner = 'team1'
      else if (sets2 > sets1) finalMatch.winner = 'team2'
    }
  }

  const renderScore = (isTeam1: boolean) => {
    if (sportType === 'futbol') {
      const score = isTeam1 ? finalMatch.score1 : finalMatch.score2
      return score !== undefined ? score : '-'
    } else {
      const sets = isTeam1 ? finalMatch.sets1 : finalMatch.sets2
      return sets !== undefined ? sets : '-'
    }
  }

  const isWinner = (team: 'team1' | 'team2') => {
    return finalMatch.isFinished && finalMatch.winner === team
  }

  return (
    <Card className={className}>
      <div className="px-6 py-6 bg-[#24292b] mb-4 rounded shadow-widget">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-400" />
            <h5 className="font-bold text-white font-montserrat">Final</h5>
          </div>
        </div>

        {/* Bracket Layout */}
        <div className="relative max-w-2xl">
          <div className="flex items-center">
            {/* Left Side - Teams */}
            <div className="flex flex-col gap-2">
              {/* Team 1 */}
              <div
                className={`flex items-center justify-between px-2.5 py-1.5 transition-all border-2 rounded w-36 ${
                  isWinner('team1') ? 'bg-yellow-500/20 border-yellow-500 shadow-lg shadow-yellow-500/20' : 'bg-[#919eab21] border-border'
                }`}
              >
                <span className={`font-bold text-xs truncate ${isWinner('team1') ? 'text-yellow-400' : 'text-white'}`}>
                  {finalMatch.team1}
                </span>
                <span
                  className={`text-sm font-bold ml-1.5 ${
                    isWinner('team1') ? 'text-yellow-400' : finalMatch.isFinished ? 'text-slate-500' : 'text-white'
                  }`}
                >
                  {renderScore(true)}
                </span>
              </div>

              {/* Team 2 */}
              <div
                className={`flex items-center justify-between px-2.5 py-1.5 transition-all border-2 rounded w-36 ${
                  isWinner('team2') ? 'bg-yellow-500/20 border-yellow-500 shadow-lg shadow-yellow-500/20' : 'bg-[#919eab21] border-border'
                }`}
              >
                <span className={`font-bold text-xs truncate ${isWinner('team2') ? 'text-yellow-400' : 'text-white'}`}>
                  {finalMatch.team2}
                </span>
                <span
                  className={`text-sm font-bold ml-1.5 ${
                    isWinner('team2') ? 'text-yellow-400' : finalMatch.isFinished ? 'text-slate-500' : 'text-white'
                  }`}
                >
                  {renderScore(false)}
                </span>
              </div>
            </div>

            {/* SVG Connector Lines */}
            <svg width="60" height="56" className="mx-1">
              {/* Horizontal line from Team 1 - aligned to center of first box */}
              <line x1="0" y1="14" x2="20" y2="14" stroke="#495257" strokeWidth="1.5" />
              {/* Horizontal line from Team 2 - aligned to center of second box */}
              <line x1="0" y1="42" x2="20" y2="42" stroke="#495257" strokeWidth="1.5" />
              {/* Vertical line connecting both */}
              <line x1="20" y1="14" x2="20" y2="42" stroke="#495257" strokeWidth="1.5" />
              {/* Horizontal line to winner box */}
              <line x1="20" y1="28" x2="60" y2="28" stroke="#495257" strokeWidth="1.5" />
            </svg>

            {/* Right Side - Winner Box */}
            <div className="flex-1 max-w-[160px]">
              {finalMatch.isFinished && finalMatch.winner ? (
                <div className="flex flex-col items-center gap-1 px-2.5 py-2 border-2 border-yellow-500 rounded bg-gradient-to-r from-yellow-500/20 to-yellow-600/20">
                  <div className="flex items-center gap-1">
                    <Crown className="w-3.5 h-3.5 text-yellow-400 animate-pulse" />
                    <span className="text-[9px] font-bold text-yellow-400 uppercase tracking-wider">Campeón</span>
                    <Trophy className="w-3.5 h-3.5 text-yellow-400" />
                  </div>
                  <span className="text-xs font-bold text-yellow-400 text-center truncate w-full">
                    {finalMatch.winner === 'team1' ? finalMatch.team1 : finalMatch.team2}
                  </span>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-1 px-2.5 py-2 border-2 bg-[#919eab21] border-border rounded ">
                  <Trophy className="w-4 h-4 text-slate-500" />
                  <span className="text-[10px] font-bold text-slate-500">Ganador</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
