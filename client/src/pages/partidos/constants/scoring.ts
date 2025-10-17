export const MATCH_POINTS = {
  WIN: 3,
  DRAW: 1,
  LOSS: 0,
} as const

export type MatchPointsType = (typeof MATCH_POINTS)[keyof typeof MATCH_POINTS]
