export const SportType = {
  FUTBOL: 'futbol',
  VOLEY: 'voley',
} as const
export type SportType = (typeof SportType)[keyof typeof SportType]

export const MatchStatus = {
  SCHEDULED: 'scheduled',
  LIVE: 'live',
  FINISHED: 'finished',
  POSTPONED: 'postponed',
  CANCELLED: 'cancelled',
} as const
export type MatchStatus = (typeof MatchStatus)[keyof typeof MatchStatus]

export interface Team {
  id: string
  name: string
  logo?: string
  abbreviation: string
}

export interface BaseSport {
  id: string
  name: string
  type: SportType
}

export interface BaseMatch {
  id: string
  sport: SportType
  homeTeam: Team
  awayTeam: Team
  scheduledAt: Date
  startedAt?: Date
  finishedAt?: Date
  status: MatchStatus
  venue?: string
  round?: string
  tournament?: string
}

export interface BaseScore {
  home: number
  away: number
}

export interface MatchEvent {
  id: string
  type: string
  time: number
  team: 'home' | 'away'
  player?: string
  description: string
}
