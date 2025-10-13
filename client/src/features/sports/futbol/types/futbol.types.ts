import { type BaseMatch, type BaseScore, type MatchEvent } from '../../../../shared/types/sports.types'

export interface FutbolScore extends BaseScore {
  homeGoals: number
  awayGoals: number
}

export interface FutbolEvent extends MatchEvent {
  type: 'goal' | 'yellow_card' | 'red_card' | 'substitution' | 'penalty' | 'own_goal'
  minute: number
  addedTime?: number
  player: string
  assistPlayer?: string
}

export interface FutbolPlayer {
  id: string
  name: string
  number: number
  position: 'GK' | 'DEF' | 'MID' | 'FWD'
  isStarter: boolean
}

export interface FutbolLineup {
  formation: string
  players: FutbolPlayer[]
}

export interface FutbolMatch extends BaseMatch {
  score: FutbolScore
  events: FutbolEvent[]
  homeLineup?: FutbolLineup
  awayLineup?: FutbolLineup
  currentMinute?: number
  halfTime: 'first' | 'second' | 'extra_first' | 'extra_second' | 'penalties' | 'finished'
}
