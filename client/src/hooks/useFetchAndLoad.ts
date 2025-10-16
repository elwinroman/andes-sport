import { type AxiosResponse, isAxiosError } from 'axios'
import { useEffect, useState } from 'react'

import { type AxiosCall } from '@/models/axios-call.model'

/**
 * Hook personalizado para manejar llamadas HTTP con Axios
 * Incluye control de estado de carga (`loading`) y posibilidad de cancelar peticiones
 */
const useFetchAndLoad = <T = unknown>() => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<{ title: string; detail: string } | null>(null)

  let controller: AbortController

  const callEndpoint = async (axiosCall: AxiosCall<T>) => {
    if (axiosCall.controller) controller = axiosCall.controller
    setLoading(true)
    setError(null)

    let result = {} as AxiosResponse<T>
    try {
      result = await axiosCall.call // ejecuta la llamada a la API
    } catch (err) {
      setLoading(false)

      // manejo del error
      if (isAxiosError(err)) {
        if (err.response) {
          const { data } = err.response

          // extrae el título y el detalle del error
          const errorTitle = data.error ?? 'Error desconocido'
          const errorDetail = data.message ?? 'Error desconocido'

          setError({
            title: errorTitle,
            detail: errorDetail,
          })
        } else {
          setError({
            title: 'Error de red',
            detail: 'No se pudo conectar al servidor o el servidor no está disponible.',
          })
        }
      } else {
        setError({
          title: 'Error desconocido',
          detail: 'Ocurrió un error inesperado. Vuelva a intentarlo.',
        })
      }

      throw err // se lanza el error
    }
    setLoading(false)
    return result
  }

  const cancelEndpoint = () => {
    setLoading(false)
    setError(null)
    if (controller) controller.abort() // cancela la solicitud pendiente
  }

  // cleanup automático cuando el componente se desmonta
  useEffect(() => {
    return () => {
      cancelEndpoint()
    }
  }, [])

  return { callEndpoint, loading, error }
}

export default useFetchAndLoad
