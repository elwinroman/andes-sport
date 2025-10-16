import axios from 'axios'

import { type AxiosCall } from '@/models'
import { loadAbort } from '@/utils/load-abort.util'
import { useStore } from '@/zustand/store'

const api = axios.create({
  baseURL: 'http://192.168.1.68:3000/api/',
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
}

export interface BulkPartidosResponse {
  message: string
  count: number
  partidos: PartidoApiResponse[]
}

export const getAllPartidosService = (): AxiosCall<PartidoApiResponse[]> => {
  const controller = loadAbort()

  const adapterCall = api
    .get<PartidoApiResponse[]>('/partidos', {
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
