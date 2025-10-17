import { PartidoDestacado } from '@/components/PartidoDestacado'
import { type PartidoApiResponse } from '@/services/partido.service'

interface Props {
  className?: string
  partidos: PartidoApiResponse[]
  isLoading: boolean
}

export function Destacado({ className, partidos, isLoading }: Props) {
  return <PartidoDestacado className={className} sportType="voley" partidos={partidos} isLoading={isLoading} />
}
