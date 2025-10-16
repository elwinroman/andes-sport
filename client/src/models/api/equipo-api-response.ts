export interface EquipoApiResponse {
  idEquipo: number
  cEquipo: string
  cDetalle: string
  lVigente: boolean
  dFechaRegistra: Date
  dFechaModifica: Date | null
}

export interface JugadorEnEquipo {
  idJugador: number
  cNombreJugador: string
  cApellidoJugador: string
  lVigente: boolean
  dFechaRegistra: Date
}

export interface EquipoJugadorRelacion {
  idEquipo: number
  idJugador: number
  lVigente: boolean
  dFechaRegistra: Date
  jugador: JugadorEnEquipo
}

export interface EquiposApiResponse extends EquipoApiResponse {
  equipoJugadores: EquipoJugadorRelacion[]
}
