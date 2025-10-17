import axios from 'axios'

import { API_URL_BASE } from '@/environment/environment'
import { type AxiosCall } from '@/models'
import { loadAbort } from '@/utils/load-abort.util'

const api = axios.create({
  baseURL: API_URL_BASE,
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
