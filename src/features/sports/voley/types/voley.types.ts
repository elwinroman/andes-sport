import { type BaseMatch, type BaseScore, type MatchEvent } from '../../../../shared/types/sports.types'

export interface VoleyScore extends BaseScore {
  sets: VoleySet[]
  currentSet: number
}

export interface VoleySet {
  setNumber: number
  homeScore: number
  awayScore: number
  isFinished: boolean
  winner?: 'home' | 'away'
}

export interface VoleyEvent extends MatchEvent {
  type: 'point' | 'service' | 'attack' | 'block' | 'dig' | 'set' | 'timeout' | 'substitution'
  set: number
  point: number
  player: string
  zone?: number
}

export interface VoleyStats {
  attacks: {
    home: number
    away: number
  }
  blocks: {
    home: number
    away: number
  }
  services: {
    home: number
    away: number
  }
  serviceErrors: {
    home: number
    away: number
  }
  aces: {
    home: number
    away: number
  }
  errors: {
    home: number
    away: number
  }
}

export interface VoleyPlayer {
  id: string
  name: string
  number: number
  position: 'Libero' | 'Opuesto' | 'Central' | 'Punta' | 'Armador'
  isOnCourt: boolean
  rotationPosition?: number
}

export interface VoleyLineup {
  players: VoleyPlayer[]
  rotation: number[]
  liberos: string[]
}

export interface VoleyMatch extends BaseMatch {
  score: VoleyScore
  events: VoleyEvent[]
  stats: VoleyStats
  homeLineup?: VoleyLineup
  awayLineup?: VoleyLineup
  maxSets: number
  setsToWin: number
  currentServer?: 'home' | 'away'
}
