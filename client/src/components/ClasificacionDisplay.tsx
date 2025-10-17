import { Card } from '@components/Card'
import { useMemo } from 'react'

import { CircleIcon } from '@/icons/CircleIcon'
import { MATCH_STATUS } from '@/pages/partidos/constants/matchStatus'
import { MATCH_POINTS } from '@/pages/partidos/constants/scoring'
import { type PartidoApiResponse } from '@/services/partido.service'

interface Props {
  className?: string
  sportType: 'futbol' | 'voley'
  partidos: PartidoApiResponse[]
  isLoading: boolean
}

interface TeamStats {
  pos: number
  idEquipo: number
  name: string
  pj: number // Partidos jugados
  g: number // Ganados
  e?: number // Empates (solo fútbol)
  p: number // Perdidos
  // Fútbol
  gf?: number // Goles a favor
  gc?: number // Goles en contra
  gd?: number // Diferencia de goles
  // Vóley
  sf?: number // Sets a favor
  sc?: number // Sets en contra
  sd?: number // Diferencia de sets
  pf?: number // Puntos a favor
  pc?: number // Puntos en contra
  pts: number // Puntos
  form: string[] // Últimos 5 resultados
}

export function ClasificacionDisplay({ className, sportType, partidos, isLoading }: Props) {
  const teams = useMemo(() => {
    const teamStatsMap = new Map<number, TeamStats>()
    const isFutbol = sportType === 'futbol'

    // Obtener todos los equipos únicos
    partidos.forEach((partido) => {
      if (!teamStatsMap.has(partido.idEquipoLocal)) {
        teamStatsMap.set(partido.idEquipoLocal, {
          pos: 0,
          idEquipo: partido.idEquipoLocal,
          name: partido.equipoLocal.cEquipo,
          pj: 0,
          g: 0,
          ...(isFutbol && { e: 0 }),
          p: 0,
          ...(isFutbol && { gf: 0, gc: 0, gd: 0 }),
          ...(!isFutbol && { sf: 0, sc: 0, sd: 0, pf: 0, pc: 0 }),
          pts: 0,
          form: [],
        })
      }

      if (!teamStatsMap.has(partido.idEquipoVisitante)) {
        teamStatsMap.set(partido.idEquipoVisitante, {
          pos: 0,
          idEquipo: partido.idEquipoVisitante,
          name: partido.equipoVisitante.cEquipo,
          pj: 0,
          g: 0,
          ...(isFutbol && { e: 0 }),
          p: 0,
          ...(isFutbol && { gf: 0, gc: 0, gd: 0 }),
          ...(!isFutbol && { sf: 0, sc: 0, sd: 0, pf: 0, pc: 0 }),
          pts: 0,
          form: [],
        })
      }
    })

    // Procesar partidos
    partidos.forEach((partido) => {
      const teamLocal = teamStatsMap.get(partido.idEquipoLocal)!
      const teamVisitante = teamStatsMap.get(partido.idEquipoVisitante)!

      // Partidos PROGRAMADOS o EN_CURSO
      if (partido.idEstado === MATCH_STATUS.PROGRAMADO || partido.idEstado === MATCH_STATUS.EN_CURSO) {
        const formSymbol = partido.idEstado === MATCH_STATUS.EN_CURSO ? '?L' : '?'
        teamLocal.form.push(formSymbol)
        teamVisitante.form.push(formSymbol)
        teamLocal.form = teamLocal.form.slice(-5)
        teamVisitante.form = teamVisitante.form.slice(-5)
        return
      }

      // Solo procesar partidos finalizados
      if (partido.idEstado !== MATCH_STATUS.FINALIZADO) return

      if (isFutbol) {
        // Procesamiento para FÚTBOL
        if (!partido.detallesFutbol) return

        const golesLocal = partido.detallesFutbol.golesEquipoLocal
        const golesVisitante = partido.detallesFutbol.golesEquipoVisitante

        teamLocal.pj++
        teamVisitante.pj++

        teamLocal.gf! += golesLocal
        teamLocal.gc! += golesVisitante
        teamVisitante.gf! += golesVisitante
        teamVisitante.gc! += golesLocal

        if (golesLocal > golesVisitante) {
          teamLocal.g++
          teamLocal.pts += MATCH_POINTS.WIN
          teamLocal.form.push('G')
          teamVisitante.p++
          teamVisitante.pts += MATCH_POINTS.LOSS
          teamVisitante.form.push('P')
        } else if (golesLocal < golesVisitante) {
          teamVisitante.g++
          teamVisitante.pts += MATCH_POINTS.WIN
          teamVisitante.form.push('G')
          teamLocal.p++
          teamLocal.pts += MATCH_POINTS.LOSS
          teamLocal.form.push('P')
        } else {
          teamLocal.e!++
          teamLocal.pts += MATCH_POINTS.DRAW
          teamLocal.form.push('E')
          teamVisitante.e!++
          teamVisitante.pts += MATCH_POINTS.DRAW
          teamVisitante.form.push('E')
        }
      } else {
        // Procesamiento para VÓLEY
        if (!partido.detallesVoley || partido.detallesVoley.length === 0) return

        let setsLocal = 0
        let setsVisitante = 0
        let puntosLocal = 0
        let puntosVisitante = 0

        partido.detallesVoley.forEach((set) => {
          puntosLocal += set.puntosEquipoLocal
          puntosVisitante += set.puntosEquipoVisitante

          if (set.puntosEquipoLocal > set.puntosEquipoVisitante) {
            setsLocal++
          } else if (set.puntosEquipoVisitante > set.puntosEquipoLocal) {
            setsVisitante++
          }
        })

        teamLocal.pj++
        teamVisitante.pj++

        teamLocal.sf! += setsLocal
        teamLocal.sc! += setsVisitante
        teamLocal.pf! += puntosLocal
        teamLocal.pc! += puntosVisitante

        teamVisitante.sf! += setsVisitante
        teamVisitante.sc! += setsLocal
        teamVisitante.pf! += puntosVisitante
        teamVisitante.pc! += puntosLocal

        if (setsLocal > setsVisitante) {
          teamLocal.g++
          teamLocal.pts += MATCH_POINTS.WIN
          teamLocal.form.push('G')
          teamVisitante.p++
          teamVisitante.pts += MATCH_POINTS.LOSS
          teamVisitante.form.push('P')
        } else if (setsVisitante > setsLocal) {
          teamVisitante.g++
          teamVisitante.pts += MATCH_POINTS.WIN
          teamVisitante.form.push('G')
          teamLocal.p++
          teamLocal.pts += MATCH_POINTS.LOSS
          teamLocal.form.push('P')
        } else {
          teamLocal.pts += MATCH_POINTS.DRAW
          teamLocal.form.push('E')
          teamVisitante.pts += MATCH_POINTS.DRAW
          teamVisitante.form.push('E')
        }
      }

      teamLocal.form = teamLocal.form.slice(-5)
      teamVisitante.form = teamVisitante.form.slice(-5)
    })

    // Calcular diferencias
    teamStatsMap.forEach((team) => {
      if (isFutbol) {
        team.gd = team.gf! - team.gc!
      } else {
        team.sd = team.sf! - team.sc!
      }
    })

    // Ordenar según criterios
    const teamsArray = Array.from(teamStatsMap.values()).sort((a, b) => {
      // 1. Por puntos
      if (b.pts !== a.pts) return b.pts - a.pts

      if (isFutbol) {
        // 2. Por diferencia de goles
        if (b.gd! !== a.gd!) return b.gd! - a.gd!
        // 3. Por goles a favor
        if (b.gf! !== a.gf!) return b.gf! - a.gf!
        // 4. Por goles en contra
        return a.gc! - b.gc!
      } else {
        // 2. Por diferencia de sets
        if (b.sd! !== a.sd!) return b.sd! - a.sd!
        // 3. Por sets a favor
        if (b.sf! !== a.sf!) return b.sf! - a.sf!
        // 4. Por diferencia de puntos
        const diffA = a.pf! - a.pc!
        const diffB = b.pf! - b.pc!
        if (diffB !== diffA) return diffB - diffA
        // 5. Por puntos a favor
        return b.pf! - a.pf!
      }
    })

    teamsArray.forEach((team, index) => {
      team.pos = index + 1
    })

    return teamsArray
  }, [partidos, sportType])

  const getFormColor = (result: string) => {
    switch (result) {
      case 'G':
        return 'bg-green-500'
      case 'P':
        return 'bg-red-500'
      case 'E':
        return 'bg-amber-500'
      case '?':
        return 'bg-gray-400'
      case '?L':
        return 'bg-red-500 animate-pulse'
      default:
        return 'bg-gray-400'
    }
  }

  const getFormDisplay = (result: string) => {
    return result === '?L' ? '?' : result
  }

  const getPositionColor = (pos: number) => {
    if (pos <= 2) return 'border-l-4 border-l-green-500'
    return 'border-l-4 border-transparent'
  }

  if (isLoading && teams.length === 0) {
    return (
      <Card className={`w-auto ${className}`}>
        <div className="px-3 py-3 mx-auto">
          <h5 className="mb-2 font-bold text-primary">Clasificación</h5>
          <div className="py-8 text-sm text-center text-secondary">Cargando clasificación...</div>
        </div>
      </Card>
    )
  }

  const isFutbol = sportType === 'futbol'

  return (
    <Card className={`w-auto ${className}`}>
      <div className="px-3 py-3 mx-auto">
        <div className="overflow-hidden">
          <div className="overflow-x-auto">
            <h5 className="mb-2 font-bold text-primary">Clasificación</h5>
            <table className="w-full text-sm text-primary">
              <thead className="text-xs text-secondary">
                <tr className="bg-background">
                  <th className="px-4 py-3 text-left">Pos</th>
                  <th className="px-4 py-3 text-left">Team</th>
                  <th className="px-2 py-3 text-center">PJ</th>
                  <th className="px-2 py-3 text-center">G</th>
                  {isFutbol && <th className="px-2 py-3 text-center">E</th>}
                  <th className="px-2 py-3 text-center">P</th>
                  <th className="px-2 py-3 text-center">{isFutbol ? 'Goles' : 'Sets'}</th>
                  <th className="px-2 py-3 text-center">+/-</th>
                  <th className="px-2 py-3 font-bold text-center">PTS</th>
                  <th className="px-4 py-3 text-center">Form</th>
                </tr>
              </thead>
              <tbody>
                {teams.map((team) => (
                  <tr key={team.pos} className={`${getPositionColor(team.pos)} hover:bg-background  transition-colors`}>
                    <td className="px-2 py-2 font-medium">{team.pos}</td>
                    <td className="px-2 py-2">
                      <div className="flex items-center gap-2 text-nowrap">
                        <span className="font-medium">{team.name}</span>
                      </div>
                    </td>
                    <td className="px-2 py-2 text-center">{team.pj}</td>
                    <td className="px-2 py-2 text-center">{team.g}</td>
                    {isFutbol && <td className="px-2 py-2 text-center">{team.e}</td>}
                    <td className="px-2 py-2 text-center">{team.p}</td>
                    <td className="px-2 py-2 text-center">{isFutbol ? `${team.gf}:${team.gc}` : `${team.sf}:${team.sc}`}</td>
                    <td className="px-2 py-2 font-medium text-center">
                      {isFutbol ? (team.gd! > 0 ? `+${team.gd}` : team.gd) : team.sd! > 0 ? `+${team.sd}` : team.sd}
                    </td>
                    <td className="px-2 py-2 text-base font-bold text-center">{team.pts}</td>
                    <td className="px-2 py-2">
                      <div className="flex gap-0.5 justify-center">
                        {team.form.map((result, i) => (
                          <div
                            key={i}
                            className={`w-5 h-5 ${getFormColor(result)} rounded flex items-center justify-center text-xs font-bold text-white`}
                          >
                            {getFormDisplay(result)}
                          </div>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex flex-col gap-2 p-3 mt-4 text-sm text-left rounded-sm bg-background text-primary">
          <span className="font-bold">Reglas</span>

          <div className="flex items-center gap-1 text-green-500">
            <CircleIcon size={12} />
            <span className="text-xs text-secondary">Clasificación Final</span>
          </div>

          <p>
            {isFutbol
              ? 'Si dos equipos están empatados en la clasificación, se utilizarán los siguientes métodos de desempate: 1. Diferencia general de goles 2. Mayor cantidad de goles marcados 3. Menor cantidad de goles recibidos 4. Sorteo con moneda'
              : 'Si dos equipos están empatados en la clasificación, se utilizarán los siguientes métodos de desempate: 1. Diferencia de sets 2. Sets ganados 3. Diferencia de puntos 4. Puntos a favor'}
          </p>
        </div>
      </div>
    </Card>
  )
}
