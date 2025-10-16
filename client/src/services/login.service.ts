import axios from 'axios'

import { type AxiosCall } from '@/models'
import { loadAbort } from '@/utils/load-abort.util'

const api = axios.create({
  baseURL: 'http://192.168.1.68:3000/api/',
})

export interface LoginResponse {
  access_token: string
}

export interface Credential {
  username: string
  password: string
}

export const loginService = (params: Credential): AxiosCall<LoginResponse> => {
  const controller = loadAbort()

  const adapterCall = api.post<LoginResponse>('/auth/login', params, {
    signal: controller.signal,
    withCredentials: true,
  })

  return {
    call: adapterCall,
    controller,
  }
}
