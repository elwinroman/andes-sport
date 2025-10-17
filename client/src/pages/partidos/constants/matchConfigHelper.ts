import { type Team } from '../hooks/useMatchManager'
import { matchConfig } from './match'
import { SPORT_TEAM_CONFIG } from './sportIds'

export type TeamCount = 'seis' | 'siete' | 'ocho' | 'nueve'
export type SportType = 'futbol' | 'voley'

/**
 * Mapea el número de equipos a la clave de configuración
 */
export function getTeamCountKey(teamCount: number): TeamCount | null {
  const map: Record<number, TeamCount> = {
    6: 'seis',
    7: 'siete',
    8: 'ocho',
    9: 'nueve',
  }
  return map[teamCount] ?? null
}

/**
 * Obtiene el número de equipos que participan en un deporte según el total disponible
 * @param totalTeams - Total de equipos disponibles
 * @param sport - Tipo de deporte
 * @returns Número de equipos que participan en ese deporte
 */
export function getTeamsForSport(totalTeams: number, sport: SportType): number {
  if (sport === 'futbol' && totalTeams === 7) {
    // Si hay 7 equipos disponibles, solo 6 juegan fútbol (se excluye el equipo con ID fijo)
    return SPORT_TEAM_CONFIG.FUTBOL.TOTAL_TEAMS
  }
  // Para vóley o cualquier otra cantidad, se usan todos los equipos
  return totalTeams
}

/**
 * Obtiene la configuración de matches según el número de equipos y deporte
 */
export function getMatchConfiguration(teamCount: number, sport: SportType): number[][] | null {
  // Ajustar el número de equipos según el deporte
  const effectiveTeamCount = getTeamsForSport(teamCount, sport)
  const key = getTeamCountKey(effectiveTeamCount)

  if (!key || !matchConfig[key]) return null

  return matchConfig[key][sport] || null
}

/**
 * Aleatoriza los equipos y los asigna a las posiciones de la configuración
 * @param teams - Lista de equipos disponibles
 * @param config - Configuración de matches (ej: [[1,2], [3,4]])
 * @param sport - Tipo de deporte (futbol o voley)
 * @returns Matches con equipos asignados: [{local: Team, visitante: Team}]
 */
export function randomizeTeamsToConfig(teams: Team[], config: number[][], sport: SportType): Array<{ local: Team; visitante: Team }> {
  // Filtrar equipos según el deporte
  let availableTeams = teams
  let fixedTeam: Team | null = null

  if (sport === 'futbol') {
    // Para fútbol: excluir el equipo con ID fijo (equipo 01)
    availableTeams = teams.filter((team) => team.id !== SPORT_TEAM_CONFIG.FUTBOL.FIXED_TEAM_ID)
  } else if (sport === 'voley') {
    // Para vóley: separar el equipo fijo para la posición #1
    fixedTeam = teams.find((team) => team.id === SPORT_TEAM_CONFIG.VOLEY.FIXED_TEAM_ID) || null
    availableTeams = teams.filter((team) => team.id !== SPORT_TEAM_CONFIG.VOLEY.FIXED_TEAM_ID)
  }

  // Obtener los números únicos usados en la configuración
  const uniqueNumbers = Array.from(new Set(config.flat())).sort((a, b) => a - b)

  // Validar que tengamos suficientes equipos
  const requiredTeams = sport === 'voley' && fixedTeam ? uniqueNumbers.length - 1 : uniqueNumbers.length
  if (availableTeams.length < requiredTeams) {
    throw new Error(`Se necesitan al menos ${requiredTeams} equipos, pero solo hay ${availableTeams.length} disponibles`)
  }

  // Aleatorizar equipos disponibles (sin el fijo)
  const shuffledTeams = [...availableTeams].sort(() => Math.random() - 0.5)

  // Crear un mapa de número -> equipo usando los números de la configuración
  const teamMap = new Map<number, Team>()

  if (sport === 'voley' && fixedTeam) {
    // En vóley: asignar el equipo fijo a la posición #1
    teamMap.set(1, fixedTeam)
    // Asignar los demás equipos aleatoriamente a las posiciones restantes
    const remainingNumbers = uniqueNumbers.filter((num) => num !== 1)
    remainingNumbers.forEach((configNumber, index) => {
      teamMap.set(configNumber, shuffledTeams[index])
    })
  } else {
    // Para fútbol o si no hay equipo fijo: asignar aleatoriamente a todas las posiciones
    uniqueNumbers.forEach((configNumber, index) => {
      teamMap.set(configNumber, shuffledTeams[index])
    })
  }

  // Mapear la configuración a matches con equipos reales
  return config.map(([localNum, visitanteNum]) => {
    const local = teamMap.get(localNum)
    const visitante = teamMap.get(visitanteNum)

    if (!local || !visitante) {
      throw new Error('Error al mapear equipos a la configuración')
    }

    return { local, visitante }
  })
}

/**
 * Verifica si hay una configuración disponible para la cantidad de equipos
 */
export function hasConfigurationForTeams(teamCount: number): boolean {
  return getTeamCountKey(teamCount) !== null
}

/**
 * Obtiene las cantidades de equipos soportadas
 */
export function getSupportedTeamCounts(): number[] {
  return [6, 7, 8, 9]
}
