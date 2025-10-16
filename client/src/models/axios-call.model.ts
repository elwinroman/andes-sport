import { type AxiosResponse } from 'axios'

/**
 * Representa una llamada HTTP realizada con Axios, que incluye
 * la promesa de respuesta y opcionalmente un controlador para abortar la petición.
 *
 * @template T - Tipo de dato esperado en la respuesta (`response.data`).
 */
export interface AxiosCall<T> {
  /** Promesa que resuelve con la respuesta de Axios conteniendo datos de tipo T. */
  call: Promise<AxiosResponse<T>>

  /** Controlador opcional para cancelar la petición HTTP. */
  controller?: AbortController
}
