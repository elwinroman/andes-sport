import { type Team } from '../hooks/useMatchManager'
import { matchConfig } from './match'

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
 * Obtiene la configuración de matches según el número de equipos y deporte
 */
export function getMatchConfiguration(teamCount: number, sport: SportType): number[][] | null {
  const key = getTeamCountKey(teamCount)
  if (!key || !matchConfig[key]) return null

  return matchConfig[key][sport] || null
}

/**
 * Aleatoriza los equipos y los asigna a las posiciones de la configuración
 * @param teams - Lista de equipos disponibles
 * @param config - Configuración de matches (ej: [[1,2], [3,4]])
 * @returns Matches con equipos asignados: [{local: Team, visitante: Team}]
 */
export function randomizeTeamsToConfig(teams: Team[], config: number[][]): Array<{ local: Team; visitante: Team }> {
  // Validar que tengamos suficientes equipos
  const maxTeamNumber = Math.max(...config.flat())
  if (teams.length < maxTeamNumber) {
    throw new Error(`Se necesitan al menos ${maxTeamNumber} equipos, pero solo hay ${teams.length} disponibles`)
  }

  // Aleatorizar equipos
  const shuffledTeams = [...teams].sort(() => Math.random() - 0.5)

  // Crear un mapa de número -> equipo (los números en la config empiezan en 1)
  const teamMap = new Map<number, Team>()
  shuffledTeams.forEach((team, index) => {
    teamMap.set(index + 1, team)
  })

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
