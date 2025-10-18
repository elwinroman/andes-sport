import { Card } from '@components/Card'
import { Trophy } from 'lucide-react'
import { useEffect, useState } from 'react'

import { MATCH_STATUS } from '@/pages/partidos/constants/matchStatus'
import { VOLEY_CONFIG } from '@/pages/partidos/constants/sportIds'
import { type PartidoApiResponse } from '@/services/partido.service'
import { formatDateShort, formatMatchMinutes, formatTimeLocal, getElapsedMinutes } from '@/utils/date.util'

interface Props {
  className?: string
  sportType: 'futbol' | 'voley'
  title?: string
  partidos: PartidoApiResponse[]
  isLoading: boolean
}

type MatchStatus = 'scheduled' | 'live' | 'finished'

interface ProcessedMatch {
  id: number
  date: string
  time: string
  status: MatchStatus
  homeTeam: string
  awayTeam: string
  isFinal?: boolean
  // Para fútbol: solo goles
  homeScore?: number
  awayScore?: number
  // Para vóley: sets y puntos
  sets?: Array<{
    numeroSet: number
    puntosLocal: number
    puntosVisitante: number
  }>
  liveMinute?: string
}

interface MatchItemProps {
  match: ProcessedMatch
  sportType: 'futbol' | 'voley'
}

function MatchItem({ match, sportType }: MatchItemProps) {
  const isLive = match.status === 'live'
  const isFinished = match.status === 'finished'
  const shouldShowScore = isLive || isFinished
  const hasScore = match.homeScore !== undefined && match.awayScore !== undefined
  const hasSets = match.sets && match.sets.length > 0

  const getStatusDisplay = () => {
    if (isLive && match.liveMinute) {
      return <span className="text-red-500">{match.liveMinute}</span>
    }
    if (isFinished) {
      return <span>Fin</span>
    }
    return <span>{match.time}</span>
  }

  // Determinar ganador para fútbol
  const homeWon = isFinished && match.homeScore !== undefined && match.awayScore !== undefined && match.homeScore > match.awayScore
  const awayWon = isFinished && match.homeScore !== undefined && match.awayScore !== undefined && match.awayScore > match.homeScore

  // Determinar ganador para vóley (contando sets ganados)
  let homeSetsWon = 0
  let awaySetsWon = 0
  if (hasSets && match.sets) {
    match.sets.forEach((set) => {
      if (set.puntosLocal > set.puntosVisitante) homeSetsWon++
      else if (set.puntosVisitante > set.puntosLocal) awaySetsWon++
    })
  }
  const homeWonVoley = isFinished && homeSetsWon > awaySetsWon
  const awayWonVoley = isFinished && awaySetsWon > homeSetsWon

  const renderScore = () => {
    if (sportType === 'futbol') {
      // Mostrar goles solo si el partido tiene score (en curso o finalizado)
      return (
        <div className="flex flex-col px-2 text-sm text-primary items-end font-semibold">
          <span className={`${isLive ? 'text-red-500' : ''} ${awayWon ? 'text-secondary/80' : ''}`}>
            {shouldShowScore && hasScore ? match.homeScore : ''}
          </span>
          <span className={`${isLive ? 'text-red-500' : ''} ${homeWon ? 'text-secondary/80' : ''}`}>
            {shouldShowScore && hasScore ? match.awayScore : ''}
          </span>
        </div>
      )
    } else {
      // VÓLEY: Mostrar sets si existen, independientemente del estado
      if (!hasSets || !match.sets) {
        return <div className="flex flex-col items-start px-2 text-sm text-primary" />
      }

      // Calcular sets ganados y determinar el set actual
      let homeSetsWonCount = 0
      let awaySetsWonCount = 0
      let currentSetIndex = -1 // -1 indica que aún no se ha encontrado

      match.sets.forEach((set, index) => {
        // Un set se gana al llegar a VOLEY_CONFIG.MAX_POINTS_PER_SET (15 puntos)
        const setFinished = set.puntosLocal >= VOLEY_CONFIG.MAX_POINTS_PER_SET || set.puntosVisitante >= VOLEY_CONFIG.MAX_POINTS_PER_SET

        if (set.puntosLocal >= VOLEY_CONFIG.MAX_POINTS_PER_SET) {
          homeSetsWonCount++
        } else if (set.puntosVisitante >= VOLEY_CONFIG.MAX_POINTS_PER_SET) {
          awaySetsWonCount++
        }

        // Si estamos en vivo, el set actual es el primero que no ha terminado
        if (isLive && !setFinished && currentSetIndex === -1) {
          currentSetIndex = index
        }
      })

      // Si no se encontró un set en curso, usar el último (todos terminaron o partido finalizado)
      if (currentSetIndex === -1) {
        currentSetIndex = match.sets.length - 1
      }

      const currentSet = match.sets[currentSetIndex]
      const currentSetPoints = {
        local: currentSet.puntosLocal,
        visitante: currentSet.puntosVisitante,
      }

      if (isFinished) {
        // PARTIDO FINALIZADO: Mostrar todos los sets con sus puntos (izquierda) y sets ganados (derecha)
        return (
          <div className="flex items-center gap-2">
            {/* Puntos de cada set */}
            <div className="flex gap-2 px-2">
              {match.sets.map((set, idx) => (
                <div key={idx} className="flex flex-col items-center text-xs">
                  <span
                    className={`${set.puntosLocal >= VOLEY_CONFIG.MAX_POINTS_PER_SET ? 'font-bold' : ''} ${awayWonVoley ? 'text-secondary/80' : ''}`}
                  >
                    {set.puntosLocal}
                  </span>
                  <span
                    className={`${set.puntosVisitante >= VOLEY_CONFIG.MAX_POINTS_PER_SET ? 'font-bold' : ''} ${homeWonVoley ? 'text-secondary/80' : ''}`}
                  >
                    {set.puntosVisitante}
                  </span>
                </div>
              ))}
            </div>
            {/* Separador */}
            <span className="text-secondary/50">|</span>
            {/* Sets ganados */}
            <div className="flex flex-col items-center pr-2 text-sm font-semibold">
              <span className={awayWonVoley ? 'text-secondary/80' : ''}>{homeSetsWonCount}</span>
              <span className={homeWonVoley ? 'text-secondary/80' : ''}>{awaySetsWonCount}</span>
            </div>
          </div>
        )
      } else {
        // PARTIDO EN VIVO: Mostrar puntos del set actual (izquierda) y sets ganados (derecha)
        return (
          <div className="flex items-center gap-2">
            {/* Puntos del set actual */}
            <div className="flex flex-col items-center px-2 text-sm font-semibold">
              <span className="text-green-500">{currentSetPoints.local}</span>
              <span className="text-green-500">{currentSetPoints.visitante}</span>
            </div>
            {/* Separador */}
            <span className="text-secondary/50">|</span>
            {/* Sets ganados */}
            <div className="flex flex-col items-center pr-2 text-sm font-semibold">
              <span className="text-red-500">{homeSetsWonCount}</span>
              <span className="text-red-500">{awaySetsWonCount}</span>
            </div>
          </div>
        )
      }
    }
  }

  return (
    <div className="flex items-center p-1 -m-1 transition-colors rounded-md cursor-pointer hover:bg-slate-100">
      <div className="flex flex-col px-2 text-xs font-medium text-center text-secondary/80">
        <span>{match.date}</span>
        {getStatusDisplay()}
      </div>

      <div className="flex flex-col items-start px-2 text-[13px] font-semibold border-l-2 border-border grow text-primary">
        <div className="flex items-center gap-2">
          <span className={sportType === 'futbol' ? (awayWon ? ' text-secondary/80' : '') : awayWonVoley ? ' text-secondary/80' : ''}>
            {match.homeTeam}
          </span>
          {match.isFinal && (
            <span className="flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold text-yellow-700 bg-yellow-100 border border-yellow-300 rounded-full">
              <Trophy className="w-3 h-3" />
              FINAL
            </span>
          )}
        </div>
        <span className={sportType === 'futbol' ? (homeWon ? ' text-secondary/80' : '') : homeWonVoley ? ' text-secondary/80' : ''}>
          {match.awayTeam}
        </span>
      </div>

      {renderScore()}
    </div>
  )
}

export function PartidosDisplay({ className, sportType, title, partidos, isLoading }: Props) {
  const [matches, setMatches] = useState<ProcessedMatch[]>([])

  // Actualizar tiempo transcurrido para partidos en vivo cada minuto
  useEffect(() => {
    const updateLiveMinutes = () => {
      setMatches((prevMatches) =>
        prevMatches.map((match) => {
          if (match.status === 'live') {
            // Encontrar el partido original para obtener dFechaInicio
            const partidoOriginal = partidos.find((p) => p.idPartido === match.id)
            if (partidoOriginal && partidoOriginal.dFechaInicio) {
              const elapsedMinutes = getElapsedMinutes(partidoOriginal.dFechaInicio)
              return {
                ...match,
                liveMinute: formatMatchMinutes(elapsedMinutes),
              }
            }
          }
          return match
        }),
      )
    }

    // Actualizar cada minuto
    const interval = setInterval(updateLiveMinutes, 60000) // 60 segundos

    return () => clearInterval(interval)
  }, [partidos])

  useEffect(() => {
    // Procesar cada partido
    const processedMatches: ProcessedMatch[] = partidos.map((partido) => {
      const time = formatTimeLocal(partido.dFechaEvento)
      const date = formatDateShort(partido.dFechaEvento)

      // Determinar estado del partido usando las constantes definidas
      let status: MatchStatus = 'scheduled'
      if (partido.idEstado === MATCH_STATUS.EN_CURSO || partido.idEstado === MATCH_STATUS.MEDIO_TIEMPO) {
        status = 'live'
      } else if (partido.idEstado === MATCH_STATUS.FINALIZADO) {
        status = 'finished'
      }

      const baseMatch: ProcessedMatch = {
        id: partido.idPartido,
        date,
        time,
        status,
        homeTeam: partido.equipoLocal.cEquipo,
        awayTeam: partido.equipoVisitante.cEquipo,
        isFinal: partido.lEtapaFinal || false,
      }

      // Calcular tiempo transcurrido si está en curso
      if (status === 'live' && partido.dFechaInicio) {
        const elapsedMinutes = getElapsedMinutes(partido.dFechaInicio)
        baseMatch.liveMinute = formatMatchMinutes(elapsedMinutes)
      }

      // Usar detalles que ya vienen en la respuesta
      if (sportType === 'futbol' && partido.detallesFutbol) {
        baseMatch.homeScore = partido.detallesFutbol.golesEquipoLocal
        baseMatch.awayScore = partido.detallesFutbol.golesEquipoVisitante
      } else if (sportType === 'voley' && partido.detallesVoley && partido.detallesVoley.length > 0) {
        baseMatch.sets = partido.detallesVoley.map((set) => ({
          numeroSet: set.numeroSet,
          puntosLocal: set.puntosEquipoLocal,
          puntosVisitante: set.puntosEquipoVisitante,
        }))
      }

      return baseMatch
    })

    setMatches(processedMatches)
  }, [partidos, sportType])

  const displayTitle = title || (sportType === 'futbol' ? 'Partidos de Fútbol' : 'Partidos de Vóley')

  return (
    <Card className={`mb-4 ${className}`}>
      <div className="w-full px-2 py-3">
        <h5 className="mb-2 font-bold text-primary font-montserrat">{displayTitle}</h5>

        {isLoading && matches.length === 0 ? (
          <div className="py-4 text-sm text-center text-secondary">Cargando partidos...</div>
        ) : matches.length === 0 ? (
          <div className="py-4 text-sm text-center text-secondary">No hay partidos disponibles</div>
        ) : (
          <div className="flex flex-col gap-2">
            {matches.map((match) => (
              <MatchItem key={match.id} match={match} sportType={sportType} />
            ))}
          </div>
        )}
      </div>
    </Card>
  )
}
