export const MATCH_STATUS = {
  PROGRAMADO: 1,
  EN_CURSO: 2,
  MEDIO_TIEMPO: 3,
  FINALIZADO: 4,
  CANCELADO: 5,
  ABANDONADO: 6,
  PENDIENTE: 7,
} as const

export type MatchStatusType = (typeof MATCH_STATUS)[keyof typeof MATCH_STATUS]

// Mapeo de IDs a nombres legibles
export const MATCH_STATUS_LABELS: Record<MatchStatusType, string> = {
  [MATCH_STATUS.PROGRAMADO]: 'Programado',
  [MATCH_STATUS.EN_CURSO]: 'En curso',
  [MATCH_STATUS.MEDIO_TIEMPO]: 'Medio tiempo',
  [MATCH_STATUS.FINALIZADO]: 'Finalizado',
  [MATCH_STATUS.CANCELADO]: 'Cancelado',
  [MATCH_STATUS.ABANDONADO]: 'Abandonado',
  [MATCH_STATUS.PENDIENTE]: 'Pendiente',
}

// Helper function para obtener el label de un estado
export const getMatchStatusLabel = (statusId: MatchStatusType): string => {
  return MATCH_STATUS_LABELS[statusId] || 'Desconocido'
}

// Helper function para obtener el color/clase CSS de un estado
export const getMatchStatusColor = (statusId: MatchStatusType): string => {
  switch (statusId) {
    case MATCH_STATUS.PROGRAMADO:
      return 'bg-blue-100 text-blue-800 border-blue-200'
    case MATCH_STATUS.EN_CURSO:
      return 'bg-green-100 text-green-800 border-green-200'
    case MATCH_STATUS.MEDIO_TIEMPO:
      return 'bg-yellow-100 text-yellow-800 border-yellow-200'
    case MATCH_STATUS.FINALIZADO:
      return 'bg-gray-100 text-gray-800 border-gray-200'
    case MATCH_STATUS.CANCELADO:
      return 'bg-red-100 text-red-800 border-red-200'
    case MATCH_STATUS.ABANDONADO:
      return 'bg-orange-100 text-orange-800 border-orange-200'
    case MATCH_STATUS.PENDIENTE:
      return 'bg-purple-100 text-purple-800 border-purple-200'
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200'
  }
}
