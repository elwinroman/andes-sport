import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { usePartidosData } from '@/hooks/usePartidosData'
import { SPORT_IDS } from '@/pages/partidos/constants/sportIds'

import { Clasificacion, Destacado, Partidos } from './components'

export function FutbolPage() {
  const { partidos, isLoading } = usePartidosData({ idDeporte: SPORT_IDS.FUTBOL })

  return (
    <section className="w-full">
      <h2 className="hidden px-1 py-2 text-sm font-medium text-left font-montserrat text-secondary sm:block">
        Resultados de fútbol en directo y cronograma del campeonato CRACLASA
      </h2>

      <article className="flex flex-col gap-1 sm:gap-4 sm:flex-row">
        <div className="flex flex-col gap-0 sm:gap-4 flex-[2_1_0%] sm:max-w-[400px] w-full self-center sm:self-start">
          <Destacado partidos={partidos} isLoading={isLoading} />
          <Partidos className="hidden sm:block" partidos={partidos} isLoading={isLoading} />
        </div>
        <div className="flex-[2_1_0%] hidden sm:block overflow-x-auto">
          <Clasificacion partidos={partidos} isLoading={isLoading} />
        </div>

        <Tabs defaultValue="clasificacion" className="block sm:hidden">
          <TabsList className="w-full">
            <TabsTrigger value="clasificacion">Clasificación</TabsTrigger>
            <TabsTrigger value="partidos">Partidos</TabsTrigger>
          </TabsList>
          <TabsContent value="clasificacion">
            <Clasificacion partidos={partidos} isLoading={isLoading} />
          </TabsContent>
          <TabsContent value="partidos">
            <Partidos partidos={partidos} isLoading={isLoading} />
          </TabsContent>
        </Tabs>
      </article>
    </section>
  )
}
