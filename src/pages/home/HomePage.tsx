import { Calendar, Navigation, Trophy } from 'lucide-react'

import { LineaParametrizable } from './components/LineaParametrizable'

export function HomePage() {
  return (
    <section className="w-full">
      <h2 className="hidden px-1 py-2 text-sm text-left text-gray-400 sm:block">
        Resultados de fútbol en directo y cronograma del campeonato CRACLASA
      </h2>

      {/*  card */}
      <div className="flex flex-col w-full gap-4 px-4 py-6 bg-card sm:rounded">
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:gap-10 md:items-center">
          <img
            src="https://losandes.pe/wp-content/themes/losandes/assets/images/logo_web.png"
            alt="logo caja los andes"
            className="object-contain"
            // className="filter invert brightness-0 sepia saturate-100 hue-rotate-180"
          />
          <div className="flex flex-col items-start gap-3 bg-primary">
            <div className="flex flex-col items-start gap-2">
              <h1 className="text-xl font-bold md:text-2xl text-rose-500">CAMPEONATO DEPORTIVO</h1>

              <div className="">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Calendar size={12} />
                  <span>Sábado, 17 de octubre del 2025 - 15:00</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-blue-400 underline">
                  <Navigation size={12} />
                  <span>Centro Deportivo Moyas</span>
                </div>
              </div>
              <span className="text-sm font-semibold text-left">Organizado por el Departamento de Aseguramiento de Calidad</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between w-full gap-1">
          <LineaParametrizable />
          <i className="bg-[#2c3236] rounded-full h-5 w-5 grid place-content-center">
            <Trophy size={13} strokeWidth={1} className="text-white" />
          </i>
        </div>
      </div>
    </section>
  )
}
