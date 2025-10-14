import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { Clasificacion, Destacado, Partidos } from './components'

interface Deporte {
  id: number
  nombre: string
}

interface Equipo {
  id: number
  nombre: string
}

export const EstadoPartido = {
  PROGRAMADO: 'programado',
  LIVE: 'live',
  FINALIZADO: 'finalizado',
  POSPUESTO: 'pospuesto',
  CANCELADO: 'cancelado',
} as const
export type EstadoPartido = (typeof EstadoPartido)[keyof typeof EstadoPartido]

interface EventoPartido {
  equipoVisitante: string
  equipoLocal: string
  estado: EstadoPartido
  fechaPartido: Date
}

interface FutbolScore {
  golLocal: number
  golVisitante: number
}

interface PartidoFutbol extends EventoPartido {
  resultado: FutbolScore
}

const CurrentMatch = {
  homeTeam: 'QAballeros QAtrastroficos',
  awayTeam: 'Codigosaurios',
  status: '',
}

export function FutbolPage() {
  return (
    <section className="w-full">
      <h2 className="hidden px-1 py-2 text-sm font-medium text-left font-montserrat text-secondary sm:block">
        Resultados de fútbol en directo y cronograma del campeonato CRACLASA
      </h2>

      <article className="flex flex-col gap-1 sm:gap-4 sm:flex-row">
        <div className="flex flex-col gap-0 sm:gap-4 flex-[2_1_0%] sm:max-w-[400px] w-full self-center sm:self-start">
          <Destacado />
          <Partidos className="hidden sm:block" />
        </div>
        <div className="flex-[2_1_0%] hidden sm:block overflow-x-auto">
          <Clasificacion />
        </div>

        <Tabs defaultValue="clasificacion" className="block sm:hidden">
          <TabsList className="w-full">
            <TabsTrigger value="clasificacion">Clasificación</TabsTrigger>
            <TabsTrigger value="partidos">Partidos</TabsTrigger>
          </TabsList>
          <TabsContent value="clasificacion">
            <Clasificacion />
          </TabsContent>
          <TabsContent value="partidos">
            <Partidos />
          </TabsContent>
        </Tabs>
      </article>
    </section>
  )
}
