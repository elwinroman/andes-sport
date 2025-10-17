export const SPORT_IDS = {
  FUTBOL: 1,
  VOLEY: 2,
} as const

export type SportIdType = (typeof SPORT_IDS)[keyof typeof SPORT_IDS]

// Duración de cada partido en minutos
export const SPORT_DURATION = {
  FUTBOL: 20, // 20 minutos por partido de fútbol
  VOLEY: 20, // 20 minutos por partido de vóley
} as const

// Configuración de horarios de partidos y fecha del evento
export const MATCH_SCHEDULE = {
  MATCH_DURATION: 20, // Duración de cada partido en minutos
  BREAK_TIME: 5, // Tiempo de descanso entre partidos en minutos
} as const

/**
 * Calcula el intervalo total entre partidos (duración + descanso)
 * 20 minutos (partido) + 5 minutos (descanso) = 25 minutos entre cada inicio de partido
 */
export const MATCH_INTERVAL = MATCH_SCHEDULE.MATCH_DURATION + MATCH_SCHEDULE.BREAK_TIME

// Fecha y hora del evento (en UTC)
export const EVENT_DATE = {
  YEAR: 2025,
  MONTH: 9, // Octubre (0-indexed: 0 = Enero, 10 = Noviembre, NOTA: Parece que debería ser 9 para Octubre)
  DAY: 18,
  HOUR: 20, // Hora de inicio del evento: 20:00 UTC (3:00 PM local time (Lima/Peru))
  MINUTE: 0, // Minuto de inicio: 00
} as const

/**
 * Crea una fecha base en UTC para los partidos
 * @returns Date object configurado en UTC con la fecha y hora del evento
 */
export const createEventDateUTC = (): Date => {
  // Date.UTC crea una fecha en UTC sin conversiones de zona horaria
  return new Date(Date.UTC(EVENT_DATE.YEAR, EVENT_DATE.MONTH, EVENT_DATE.DAY, EVENT_DATE.HOUR, EVENT_DATE.MINUTE, 0, 0))
}

// Configuración de equipos por deporte
export const SPORT_TEAM_CONFIG = {
  FUTBOL: {
    TOTAL_TEAMS: 6, // Solo 6 equipos juegan fútbol (equipos 2-7)
    FIXED_TEAM_ID: 1, // ID del equipo que NO juega fútbol (Equipo 01)
  },
  VOLEY: {
    TOTAL_TEAMS: 7, // 7 equipos juegan vóley (todos los equipos disponibles)
    FIXED_TEAM_ID: 1, // ID del equipo que SIEMPRE juega en posición #1 (Equipo 01)
  },
} as const

// Configuración de vóley
export const VOLEY_CONFIG = {
  MAX_POINTS_PER_SET: 15, // Máximo de puntos por set
  TOTAL_SETS: 2, // Total de sets en el partido
} as const
