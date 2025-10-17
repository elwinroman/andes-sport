import axios from 'axios'

import { type AxiosCall } from '@/models'
import { loadAbort } from '@/utils/load-abort.util'
import { useStore } from '@/zustand/store'

const api = axios.create({
  baseURL: 'http://192.168.1.68:3000/api/',
})

const token = useStore.getState().accessToken

export interface CreateDetallesVoleySetRequest {
  idPartido: number
  numeroSet: number
  puntosEquipoLocal: number
  puntosEquipoVisitante: number
}

export interface BulkDetallesVoleyRequest {
  sets: CreateDetallesVoleySetRequest[]
}

export interface DetallesVoleyApiResponse {
  idDetalleVoley: number
  idPartido: number
  numeroSet: number
  puntosEquipoLocal: number
  puntosEquipoVisitante: number
  lVigente: boolean
  dFechaRegistra: string
  dFechaModifica: string | null
}

export interface BulkDetallesVoleyResponse {
  message: string
  count: number
  detalles: DetallesVoleyApiResponse[]
}

// El endpoint espera un objeto con propiedad "sets"
export const createBulkDetallesVoleyService = (params: BulkDetallesVoleyRequest): AxiosCall<BulkDetallesVoleyResponse> => {
  const controller = loadAbort()

  const adapterCall = api
    .post<BulkDetallesVoleyResponse>('/detalles-voley/bulk', params, {
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

export interface UpdateDetallesVoleyRequest {
  puntosEquipoLocal: number
  puntosEquipoVisitante: number
}

export const updateDetallesVoleyService = (
  idPartido: number,
  numeroSet: number,
  params: UpdateDetallesVoleyRequest,
): AxiosCall<DetallesVoleyApiResponse> => {
  const controller = loadAbort()

  const adapterCall = api
    .patch<DetallesVoleyApiResponse>(`/detalles-voley/${idPartido}/${numeroSet}`, params, {
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

export const getDetallesVoleyByPartidoService = (idPartido: number): AxiosCall<DetallesVoleyApiResponse[]> => {
  const controller = loadAbort()

  const adapterCall = api
    .get<DetallesVoleyApiResponse[]>(`/detalles-voley/partido/${idPartido}`, {
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
