import axios from 'axios'

import { type AxiosCall, type Equipo, type EquipoApiResponse, type EquiposApiResponse } from '@/models'
// import { AuthenticatedUserApiResponse, CheckSessionApiResponse } from '@/models/api'
import { loadAbort } from '@/utils/load-abort.util'

const api = axios.create({
  baseURL: 'http://192.168.1.68:3000/api/',
})

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFyb21hbiIsInN1YiI6MSwiaWF0IjoxNzYwNTgzMDg4LCJleHAiOjE3NjExODc4ODh9.WUn_Z7L1C7f7zFbpwz14oOfd0opQOQNuKniXMBNjENM'

// Interceptor para añadir el token Bearer automáticamente
api.interceptors.request.use(
  (config) => {
    // Obtener el token desde localStorage, sessionStorage o donde lo guardes
    // const token = localStorage.getItem('token')

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

export const getAllEquiposService = (): AxiosCall<EquiposApiResponse[]> => {
  const controller = loadAbort()

  const adapterCall = api
    .get<EquiposApiResponse[]>('/equipos', {
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

export const getAllEquiposWithoutPlayersService = (): AxiosCall<EquipoApiResponse[]> => {
  const controller = loadAbort()

  const adapterCall = api
    .get<EquiposApiResponse[]>('/equipos/basic', {
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

export const registrarEquipoService = (params: Equipo): AxiosCall<EquipoApiResponse> => {
  const controller = loadAbort()

  const adapterCall = api
    .post<EquipoApiResponse>('/equipos', params, {
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

export const actualizarEquipoService = (idEquipo: number, params: Equipo): AxiosCall<EquipoApiResponse> => {
  const controller = loadAbort()

  const adapterCall = api
    .patch<EquipoApiResponse>(`/equipos/${idEquipo}`, params, {
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
