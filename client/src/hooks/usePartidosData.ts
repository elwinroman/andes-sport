import { useEffect, useState } from 'react'

import useFetchAndLoad from '@/hooks/useFetchAndLoad'
import { getAllPartidosService, type PartidoApiResponse } from '@/services/partido.service'

interface UsePartidosDataProps {
  idDeporte: number
}

interface UsePartidosDataReturn {
  partidos: PartidoApiResponse[]
  isLoading: boolean
  error: Error | null
}

export function usePartidosData({ idDeporte }: UsePartidosDataProps): UsePartidosDataReturn {
  const [partidos, setPartidos] = useState<PartidoApiResponse[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const { callEndpoint: fetchPartidos } = useFetchAndLoad<PartidoApiResponse[]>()

  useEffect(() => {
    const loadPartidos = async () => {
      try {
        // Solo mostrar loading en la primera carga
        if (partidos.length === 0) {
          setIsLoading(true)
        }

        const partidosResponse = await fetchPartidos(getAllPartidosService(idDeporte))
        setPartidos(partidosResponse.data)
        setError(null)
      } catch (err) {
        console.error('Error al cargar partidos:', err)
        setError(err as Error)
      } finally {
        setIsLoading(false)
      }
    }

    // Cargar inmediatamente
    loadPartidos()

    // Configurar polling cada 30 segundos
    const pollingInterval = setInterval(loadPartidos, 30000)

    // Limpiar intervalo al desmontar
    return () => clearInterval(pollingInterval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idDeporte])

  return { partidos, isLoading, error }
}
