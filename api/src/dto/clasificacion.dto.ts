export class ClasificacionEquipoDto {
  idEquipo: number
  nombreEquipo: string
  partidosJugados: number
  partidosGanados: number
  partidosPerdidos: number
  partidosEmpatados: number
  golesFavor: number
  golesContra: number
  diferenciaGoles: number
  puntos: number
  posicion: number
}

export class ClasificacionResponseDto {
  deporte: string
  temporada?: string
  equipos: ClasificacionEquipoDto[]
  ultimaActualizacion: Date
}
