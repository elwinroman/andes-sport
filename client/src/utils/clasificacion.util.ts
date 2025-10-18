import { MATCH_STATUS } from '@/pages/partidos/constants/matchStatus'
import { MATCH_POINTS } from '@/pages/partidos/constants/scoring'
import { type PartidoApiResponse } from '@/services/partido.service'

export interface TeamStats {
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

/**
 * Calcula la tabla de clasificación basada en los partidos
 * @param partidos - Lista de partidos
 * @param sportType - Tipo de deporte ('futbol' o 'voley')
 * @returns Array de estadísticas de equipos ordenadas por posición
 */
export function calculateClasificacion(partidos: PartidoApiResponse[], sportType: 'futbol' | 'voley'): TeamStats[] {
  const teamStatsMap = new Map<number, TeamStats>()
  const isFutbol = sportType === 'futbol'

  // Obtener todos los equipos únicos
  partidos.forEach((partido) => {
    if (!teamStatsMap.has(partido.idEquipoLocal)) {
      teamStatsMap.set(partido.idEquipoLocal, {
        pos: 0,
        idEquipo: partido.equipoLocal.idEquipo,
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
        idEquipo: partido.equipoVisitante.idEquipo,
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
}

/**
 * Obtiene los 2 primeros equipos de la clasificación
 * @param partidos - Lista de partidos
 * @param sportType - Tipo de deporte ('futbol' o 'voley')
 * @returns Array con los 2 primeros equipos o null si no hay suficientes
 */
export function getTop2Teams(partidos: PartidoApiResponse[], sportType: 'futbol' | 'voley'): [TeamStats, TeamStats] | null {
  const clasificacion = calculateClasificacion(partidos, sportType)

  if (clasificacion.length < 2) {
    return null
  }

  return [clasificacion[0], clasificacion[1]]
}
