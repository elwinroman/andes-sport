import axios from 'axios'

import { API_URL_BASE } from '@/environment/environment'
import { type AxiosCall } from '@/models'
import { loadAbort } from '@/utils/load-abort.util'
import { useStore } from '@/zustand/store'

const api = axios.create({
  baseURL: API_URL_BASE,
})

const token = useStore.getState().accessToken

export interface PartidoBulkRequest {
  idDeporte: number
  idEquipoLocal: number
  idEquipoVisitante: number
  dFechaEvento: string
  idEstado: number
}

export interface BulkPartidosRequest {
  partidos: PartidoBulkRequest[]
}

export interface EquipoEnPartido {
  idEquipo: number
  cEquipo: string
  cDetalle: string
  lVigente: boolean
  dFechaRegistra: string
  dFechaModifica: string | null
}

export interface DetallesFutbolEnPartido {
  idPartido: number
  golesEquipoLocal: number
  golesEquipoVisitante: number
}

export interface DetallesVoleyEnPartido {
  idPartido: number
  numeroSet: number
  puntosEquipoLocal: number
  puntosEquipoVisitante: number
}

export interface PartidoApiResponse {
  idPartido: number
  idDeporte: number
  idEquipoLocal: number
  idEquipoVisitante: number
  dFechaEvento: string
  dFechaInicio: string
  dFechaFin: string
  idEstado: number
  lVigente: boolean
  dFechaRegistra: string
  dFechaModifica: string | null
  equipoLocal: EquipoEnPartido
  equipoVisitante: EquipoEnPartido
  detallesFutbol?: DetallesFutbolEnPartido
  detallesVoley?: DetallesVoleyEnPartido[]
}

export interface BulkPartidosResponse {
  message: string
  count: number
  partidos: PartidoApiResponse[]
}

export const getAllPartidosService = (idDeporte?: number): AxiosCall<PartidoApiResponse[]> => {
  const controller = loadAbort()

  const params = idDeporte ? { idDeporte } : {}

  const adapterCall = api
    .get<PartidoApiResponse[]>('/partidos', {
      signal: controller.signal,
      withCredentials: true,
      params,
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

export const createBulkPartidosService = (params: BulkPartidosRequest): AxiosCall<BulkPartidosResponse> => {
  const controller = loadAbort()

  const adapterCall = api
    .post<BulkPartidosResponse>('/partidos/bulk', params, {
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

export const deletePartidoService = (idPartido: number): AxiosCall<void> => {
  const controller = loadAbort()

  const adapterCall = api
    .delete<void>(`/partidos/${idPartido}`, {
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

export interface UpdatePartidoRequest {
  dFechaEvento?: string
  idEstado?: number
  dFechaInicio?: string
  dFechaFin?: string
}

export const updatePartidoService = (idPartido: number, params: UpdatePartidoRequest): AxiosCall<PartidoApiResponse> => {
  const controller = loadAbort()

  const adapterCall = api
    .patch<PartidoApiResponse>(`/partidos/${idPartido}`, params, {
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
