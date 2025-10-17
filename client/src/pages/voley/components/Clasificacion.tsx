import { ClasificacionDisplay } from '@/components/ClasificacionDisplay'
import { type PartidoApiResponse } from '@/services/partido.service'

interface Props {
  className?: string
  partidos: PartidoApiResponse[]
  isLoading: boolean
}

export function Clasificacion({ className, partidos, isLoading }: Props) {
  return <ClasificacionDisplay className={className} sportType="voley" partidos={partidos} isLoading={isLoading} />
}
