import { Card } from '@components/Card'
import { ShieldQuestionMark } from 'lucide-react'

interface Props {
  className?: string
}

export function Destacado({ className }: Props) {
  const finish = false

  return (
    <Card className={className}>
      <div className="flex flex-col items-center justify-around gap-1 px-2 py-3">
        {/*  resultados */}
        <h5 className="mb-2 font-bold text-primary">Destacado</h5>
        <span className="px-2 py-1 text-xs font-semibold text-white bg-black rounded-full w-fit">18/10/2025 ● 15:20</span>
        <div className="flex justify-around w-full">
          <div className="flex flex-col items-center gap-1 flex-[1_1_0]">
            <div className="grid bg-white rounded-lg w-14 h-14 place-content-center">
              <ShieldQuestionMark className="text-black" size={50} />
            </div>
            <h1 className="text-xs font-semibold text-primary">QAballeros QAtrastroficos</h1>
          </div>

          <div className="flex flex-col items-center py-2">
            <h2 className={`flex gap-1 text-3xl font-bold ${finish ? 'text-primary' : 'text-red-500'}`}>
              <span>2</span>
              <span>-</span>
              <span>0</span>
            </h2>
            <span className={`text-sm font-bold ${finish ? 'text-secondary' : 'text-red-500'}`}>{finish ? 'Terminado' : '05"'}</span>
          </div>

          <div className="flex flex-col items-center gap-1 flex-[1_1_0]">
            <div className="grid bg-white rounded-lg w-14 h-14 place-content-center">
              <ShieldQuestionMark className="text-black" size={50} />
            </div>
            <h1 className="text-xs font-semibold text-primary">Codigosaurius</h1>
          </div>
        </div>
        <span className="px-2 py-1 text-sm font-semibold w-fit text-amber-400">En vivo</span>
      </div>
    </Card>
  )
}
