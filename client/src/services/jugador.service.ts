import axios from 'axios'

import { type AxiosCall, type Jugador, type JugadorApiResponse, type JugadorSinEquipoApiResponse } from '@/models'
import { loadAbort } from '@/utils/load-abort.util'

const api = axios.create({
  baseURL: 'http://192.168.1.68:3000/api/',
})

export const registrarJugadorService = (params: Jugador): AxiosCall<JugadorApiResponse> => {
  const controller = loadAbort()

  const adapterCall = api
    .post<JugadorApiResponse>('/jugadores/con-equipo', params, {
      signal: controller.signal,
      withCredentials: true,
    })
    .then((response) => {
      return {
        ...response,
        data: response.data,
      }
    })

  return {
    call: adapterCall,
    controller,
  }
}

export const actualizarJugadorService = (idJugador: number, params: Jugador): AxiosCall<JugadorApiResponse> => {
  const controller = loadAbort()

  const adapterCall = api
    .patch<JugadorApiResponse>(`/jugadores/${idJugador}/con-equipo`, params, {
      signal: controller.signal,
      withCredentials: true,
    })
    .then((response) => {
      return {
        ...response,
        data: response.data,
      }
    })

  return {
    call: adapterCall,
    controller,
  }
}

export const eliminarJugadorDeEquipoService = (idEquipo: number, idJugador: number): AxiosCall<void> => {
  const controller = loadAbort()

  const adapterCall = api
    .delete<void>(`/equipo-jugador/${idEquipo}/${idJugador}`, {
      signal: controller.signal,
      withCredentials: true,
    })
    .then((response) => {
      return {
        ...response,
        data: response.data,
      }
    })

  return {
    call: adapterCall,
    controller,
  }
}

export const getJugadoresSinEquipoService = (): AxiosCall<JugadorSinEquipoApiResponse[]> => {
  const controller = loadAbort()

  const adapterCall = api
    .get<JugadorSinEquipoApiResponse[]>('/jugadores/sin-equipo', {
      signal: controller.signal,
      withCredentials: true,
    })
    .then((response) => {
      return {
        ...response,
        data: response.data,
      }
    })

  return {
    call: adapterCall,
    controller,
  }
}

export const asignarJugadorAEquipoService = (idEquipo: number, idJugador: number): AxiosCall<JugadorApiResponse> => {
  const controller = loadAbort()
  const params = {
    idEquipo,
    idJugador,
  }

  const adapterCall = api
    .post<JugadorApiResponse>('/equipo-jugador', params, {
      signal: controller.signal,
      withCredentials: true,
    })
    .then((response) => {
      return {
        ...response,
        data: response.data,
      }
    })

  return {
    call: adapterCall,
    controller,
  }
}
