import { Calendar, Navigation } from 'lucide-react'

import { Navbar } from '@/layout/Navbar'

export function HeroPage() {
  return (
    <>
      <Navbar />
      <div
        className="relative flex items-center justify-center w-screen h-screen bg-red-300 bg-center bg-no-repeat bg-cover"
        style={{
          backgroundImage: "url('/background-stadium.webp')",
        }}
      >
        {/* Overlay de color */}
        <div className="absolute inset-0 bg-[#0d1028] opacity-77 mix-blend-multiply"></div>

        <div className="flex flex-col items-center w-full gap-10 px-4 z-1 font-montserrat">
          {/* Titulo general */}
          <div className="flex flex-col gap-4">
            <h1 className="text-4xl font-extrabold text-white sm:text-6xl leading-11 sm:leading-13">Gran Campeonato</h1>
            <h2 className="text-3xl font-extrabold text-white sm:text-5xl">
              <span>Octubre </span>
              <span className="text-accent">2</span>
              <span className="text-brand-magenta">0</span>
              <span>2</span>
              <span className="text-brand-cyan">5</span>
            </h2>
          </div>

          {/* Fecha y lugar */}
          <div className="flex flex-col items-center gap-3 text-sm sm:text-base sm:gap-10 sm:flex-row">
            <div className="flex items-center gap-2 text-white">
              <Navigation size={20} className="text-brand-magenta" />
              <span>Leoncio Prado 514 "Club Deportivo Casona Moya"</span>
            </div>
            <div className="flex items-center gap-2 text-white">
              <Calendar size={20} className="text-brand-magenta" />
              <span>Sabado, 18 de octubre</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
