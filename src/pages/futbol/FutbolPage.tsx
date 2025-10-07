import { ShieldQuestionMark } from 'lucide-react'

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
      {/* Breadcrum */}
      <div>Futbol - Equipo - etc</div>

      <div className="w-full bg-[#171c1f] sm:rounded px-2 pb-4 pt-2 flex flex-col gap-1 justify-around items-center">
        {/*  resultados */}
        <span className="text-xs font-semibold bg-black w-fit px-2 py-1 rounded-full">18/10/2025 ● 15:20</span>
        <div className="justify-around flex">
          <div className="flex flex-col items-center gap-1">
            <div className="w-14 h-14 bg-white grid place-content-center rounded-lg">
              <ShieldQuestionMark className="text-black" size={50} />
            </div>
            <h1 className="text-xs font-semibold w-40">QAballeros QAtrastroficos</h1>
          </div>

          <div className="flex flex-col py-2 gap-2">
            <h2 className="flex gap-1 text-red-500 text-3xl font-bold">
              <span>2</span>
              <span>-</span>
              <span>0</span>
            </h2>
            <span className="text-red-500 text-sm">01:05</span>
          </div>

          <div className="flex flex-col items-center gap-1">
            <div className="w-14 h-14 bg-white grid place-content-center rounded-lg">
              <ShieldQuestionMark className="text-black" size={50} />
            </div>
            <h1 className="text-xs font-semibold w-40">Codigosaurius</h1>
          </div>
        </div>
      </div>
    </section>
  )
}
