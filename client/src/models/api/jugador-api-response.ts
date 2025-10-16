export interface EquipoJugador {
  idEquipo: number
  idJugador: number
  lVigente: boolean
  dFechaRegistra: Date
  dFechaModifica: Date | null
}

export interface JugadorApiResponse {
  idJugador: number
  cNombreJugador: string
  cApellidoJugador: string
  lVigente: boolean
  dFechaRegistra: Date
  dFechaModifica: Date | null
  equipoJugadores: EquipoJugador[]
}

export interface JugadorSinEquipoApiResponse {
  idJugador: number
  cNombreJugador: string
  cApellidoJugador: string
  lVigente: boolean
  dFechaRegistra: Date
  dFechaModifica: Date | null
}
