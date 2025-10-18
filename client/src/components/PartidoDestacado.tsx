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
  partidos: PartidoApiResponse[]
  isLoading: boolean
}

interface LiveMatch {
  id: number
  date: string
  time: string
  homeTeam: string
  awayTeam: string
  isFinal?: boolean
  homeScore?: number
  awayScore?: number
  sets?: Array<{
    numeroSet: number
    puntosLocal: number
    puntosVisitante: number
  }>
  elapsedMinutes: string
  startDate: string
}

export function PartidoDestacado({ className, sportType, partidos, isLoading }: Props) {
  const [liveMatch, setLiveMatch] = useState<LiveMatch | null>(null)

  // Actualizar tiempo transcurrido cada minuto
  useEffect(() => {
    const updateElapsedTime = () => {
      if (liveMatch && liveMatch.startDate) {
        const elapsed = getElapsedMinutes(liveMatch.startDate)
        setLiveMatch((prev) => (prev ? { ...prev, elapsedMinutes: formatMatchMinutes(elapsed) } : null))
      }
    }

    const interval = setInterval(updateElapsedTime, 60000) // Cada 60 segundos
    return () => clearInterval(interval)
  }, [liveMatch?.startDate])

  useEffect(() => {
    // Filtrar solo partidos EN_CURSO
    const partidosEnCurso = partidos.filter((p) => p.idEstado === MATCH_STATUS.EN_CURSO)

    if (partidosEnCurso.length === 0) {
      setLiveMatch(null)
      return
    }

    // Tomar el primer partido en vivo
    const partido = partidosEnCurso[0]

    const time = formatTimeLocal(partido.dFechaEvento)
    const date = formatDateShort(partido.dFechaEvento)

    const match: LiveMatch = {
      id: partido.idPartido,
      date,
      time,
      homeTeam: partido.equipoLocal.cEquipo,
      awayTeam: partido.equipoVisitante.cEquipo,
      isFinal: partido.lEtapaFinal || false,
      startDate: partido.dFechaInicio,
      elapsedMinutes: partido.dFechaInicio ? formatMatchMinutes(getElapsedMinutes(partido.dFechaInicio)) : "0'",
    }

    // Usar detalles que ya vienen en la respuesta
    if (sportType === 'futbol' && partido.detallesFutbol) {
      match.homeScore = partido.detallesFutbol.golesEquipoLocal
      match.awayScore = partido.detallesFutbol.golesEquipoVisitante
    } else if (sportType === 'futbol') {
      // Si no hay detalles, inicializar en 0
      match.homeScore = 0
      match.awayScore = 0
    }

    if (sportType === 'voley' && partido.detallesVoley && partido.detallesVoley.length > 0) {
      match.sets = partido.detallesVoley.map((set) => ({
        numeroSet: set.numeroSet,
        puntosLocal: set.puntosEquipoLocal,
        puntosVisitante: set.puntosEquipoVisitante,
      }))
    } else if (sportType === 'voley') {
      // Si no hay sets, inicializar vacío
      match.sets = []
    }

    setLiveMatch(match)
  }, [partidos, sportType])

  if (isLoading && !liveMatch) {
    return (
      <Card className={className}>
        <div className="flex flex-col items-center justify-around gap-1 px-2 py-3 bg-accent">
          <h5 className="mb-2 font-bold text-black font-montserrat">Destacado</h5>
          <div className="py-8 text-sm text-center text-secondary">Cargando...</div>
        </div>
      </Card>
    )
  }

  if (!liveMatch) {
    return (
      <Card className={className}>
        <div className="flex flex-col items-center justify-around gap-1 px-2 py-3 bg-accent">
          <h5 className="mb-2 font-bold text-black font-montserrat">Destacado</h5>
          <div className="py-8 text-sm text-center text-secondary">No hay partidos en vivo</div>
        </div>
      </Card>
    )
  }

  const renderScore = () => {
    if (sportType === 'futbol') {
      return (
        <h2 className="flex gap-1 text-4xl font-bold text-red-500">
          <span>{liveMatch.homeScore ?? 0}</span>
          <span>-</span>
          <span>{liveMatch.awayScore ?? 0}</span>
        </h2>
      )
    } else {
      // Mostrar sets para vóley
      if (!liveMatch.sets || liveMatch.sets.length === 0) {
        return (
          <h2 className="flex gap-1 text-4xl font-bold text-red-500">
            <span>0</span>
            <span>-</span>
            <span>0</span>
          </h2>
        )
      }

      // Calcular sets ganados y determinar el set actual
      let homeSetsWonCount = 0
      let awaySetsWonCount = 0
      let currentSetIndex = -1 // -1 indica que aún no se ha encontrado

      liveMatch.sets.forEach((set, index) => {
        // Un set se gana al llegar a VOLEY_CONFIG.MAX_POINTS_PER_SET (15 puntos)
        const setFinished = set.puntosLocal >= VOLEY_CONFIG.MAX_POINTS_PER_SET || set.puntosVisitante >= VOLEY_CONFIG.MAX_POINTS_PER_SET

        if (set.puntosLocal >= VOLEY_CONFIG.MAX_POINTS_PER_SET) {
          homeSetsWonCount++
        } else if (set.puntosVisitante >= VOLEY_CONFIG.MAX_POINTS_PER_SET) {
          awaySetsWonCount++
        }

        // El set actual es el primero que no ha terminado
        if (!setFinished && currentSetIndex === -1) {
          currentSetIndex = index
        }
      })

      // Si no se encontró un set en curso, usar el último (todos terminaron)
      if (currentSetIndex === -1) {
        currentSetIndex = liveMatch.sets.length - 1
      }

      const currentSet = liveMatch.sets[currentSetIndex]

      return (
        <div className="flex flex-col items-center gap-2">
          {/* Sets ganados (grande) */}
          <h2 className="flex gap-1 text-4xl font-bold text-red-500">
            <span>{homeSetsWonCount}</span>
            <span>-</span>
            <span>{awaySetsWonCount}</span>
          </h2>
          {/* Puntos del set actual */}
          <div className="flex flex-col items-center gap-1">
            <span className="text-xs font-semibold text-secondary">Set {currentSet.numeroSet}</span>
            <div className="flex gap-2 text-2xl font-bold">
              <span className="text-green-500">{currentSet.puntosLocal}</span>
              <span className="text-green-500">-</span>
              <span className="text-green-500">{currentSet.puntosVisitante}</span>
            </div>
          </div>
        </div>
      )
    }
  }

  return (
    <Card className={className}>
      <div className="flex flex-col items-center justify-around gap-1 px-2 py-3 bg-accent">
        <div className="flex items-center gap-2 mb-2">
          <h5 className="font-bold text-black font-montserrat">Destacado</h5>
          {liveMatch.isFinal && (
            <span className="flex items-center gap-1 px-2 py-1 text-[10px] font-bold text-yellow-700 bg-yellow-100 border border-yellow-300 rounded-full">
              <Trophy className="w-3 h-3" />
              FINAL
            </span>
          )}
        </div>
        <span className="px-2 py-1 text-xs font-semibold text-white bg-black rounded-full w-fit">
          {liveMatch.date} ● {liveMatch.time}
        </span>
        <div className="flex justify-around w-full">
          <div className="flex flex-col items-center gap-1 flex-[1_1_0]">
            <div className="grid rounded-lg w-14 h-14 place-content-center">
              <img src="/custom-soccer.png" alt="logo equipo local" />
            </div>
            <h1 className="text-xs font-semibold text-center text-black">{liveMatch.homeTeam}</h1>
          </div>

          <div className="flex flex-col items-center py-2 font-montserrat">{renderScore()}</div>

          <div className="flex flex-col items-center gap-1 flex-[1_1_0]">
            <div className="grid w-14 h-14 place-content-center">
              <img src="/custom-soccer.png" alt="logo equipo visitante" />
            </div>
            <h1 className="text-xs font-semibold text-center text-primary">{liveMatch.awayTeam}</h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-red-500">{liveMatch.elapsedMinutes}</span>
          <span className="px-2 py-1 text-sm font-bold text-black w-fit">En vivo</span>
        </div>
      </div>
    </Card>
  )
}
