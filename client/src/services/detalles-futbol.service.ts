import axios from 'axios'

import { API_URL_BASE } from '@/environment/environment'
import { type AxiosCall } from '@/models'
import { loadAbort } from '@/utils/load-abort.util'
import { useStore } from '@/zustand/store'

const api = axios.create({
  baseURL: API_URL_BASE,
})

const token = useStore.getState().accessToken

export interface CreateDetallesFutbolRequest {
  idPartido: number
  golesEquipoLocal: number
  golesEquipoVisitante: number
}

export interface DetallesFutbolApiResponse {
  idDetalleFutbol: number
  idPartido: number
  golesEquipoLocal: number
  golesEquipoVisitante: number
  lVigente: boolean
  dFechaRegistra: string
  dFechaModifica: string | null
}

export const createDetallesFutbolService = (params: CreateDetallesFutbolRequest): AxiosCall<DetallesFutbolApiResponse> => {
  const controller = loadAbort()

  const adapterCall = api
    .post<DetallesFutbolApiResponse>('/detalles-futbol', params, {
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

export interface UpdateDetallesFutbolRequest {
  golesEquipoLocal: number
  golesEquipoVisitante: number
}

export const updateDetallesFutbolService = (
  idPartido: number,
  params: UpdateDetallesFutbolRequest,
): AxiosCall<DetallesFutbolApiResponse> => {
  const controller = loadAbort()

  const adapterCall = api
    .patch<DetallesFutbolApiResponse>(`/detalles-futbol/${idPartido}`, params, {
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

export const getDetallesFutbolByPartidoService = (idPartido: number): AxiosCall<DetallesFutbolApiResponse> => {
  const controller = loadAbort()

  const adapterCall = api
    .get<DetallesFutbolApiResponse>(`/detalles-futbol/${idPartido}`, {
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
