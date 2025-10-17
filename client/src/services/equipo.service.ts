import axios from 'axios'

import { API_URL_BASE } from '@/environment/environment'
import { type AxiosCall, type Equipo, type EquipoApiResponse, type EquiposApiResponse } from '@/models'
import { loadAbort } from '@/utils/load-abort.util'
import { useStore } from '@/zustand/store'

const api = axios.create({
  baseURL: API_URL_BASE,
})

const token = useStore.getState().accessToken

export const getAllEquiposService = (): AxiosCall<EquiposApiResponse[]> => {
  const controller = loadAbort()

  const adapterCall = api
    .get<EquiposApiResponse[]>('/equipos', {
      signal: controller.signal,
      withCredentials: true,
      headers: { Authorization: `Bearer ${token}` },
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

export const getAllEquiposWithoutPlayersService = (): AxiosCall<EquipoApiResponse[]> => {
  const controller = loadAbort()

  const adapterCall = api
    .get<EquiposApiResponse[]>('/equipos/basic', {
      signal: controller.signal,
      withCredentials: true,
      headers: { Authorization: `Bearer ${token}` },
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

export const registrarEquipoService = (params: Equipo): AxiosCall<EquipoApiResponse> => {
  const controller = loadAbort()

  const adapterCall = api
    .post<EquipoApiResponse>('/equipos', params, {
      signal: controller.signal,
      withCredentials: true,
      headers: { Authorization: `Bearer ${token}` },
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

export const actualizarEquipoService = (idEquipo: number, params: Equipo): AxiosCall<EquipoApiResponse> => {
  const controller = loadAbort()

  const adapterCall = api
    .patch<EquipoApiResponse>(`/equipos/${idEquipo}`, params, {
      signal: controller.signal,
      withCredentials: true,
      headers: { Authorization: `Bearer ${token}` },
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

export const eliminarEquipoService = (idEquipo: number): AxiosCall<void> => {
  const controller = loadAbort()

  const adapterCall = api
    .delete<void>(`/equipos/${idEquipo}`, {
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
