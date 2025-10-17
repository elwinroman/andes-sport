import { PartidosDisplay } from '@/components/PartidosDisplay'
import { type PartidoApiResponse } from '@/services/partido.service'

interface Props {
  className?: string
  partidos: PartidoApiResponse[]
  isLoading: boolean
}

export function Partidos({ className, partidos, isLoading }: Props) {
  return <PartidosDisplay className={className} sportType="voley" title="Partidos" partidos={partidos} isLoading={isLoading} />
}
