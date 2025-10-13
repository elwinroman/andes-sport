import { Card } from '@components/Card'

interface Props {
  className?: string
}

export function Partidos({ className }: Props) {
  return (
    <Card className={className}>
      <div className="w-full px-2 py-3">
        <h5 className="mb-2 font-bold text-primary">Partidos</h5>

        <div className="flex flex-col gap-2">
          {/* Primer partido */}
          <div className="flex items-center">
            <div className="flex flex-col px-2 text-xs text-center text-secondary">
              <span>21/10/2025</span>
              <span>15:00</span>
            </div>

            <div className="flex flex-col items-start px-2 text-sm border-l text-primary border-l-gray-600 grow">
              <span>Local</span>
              <span>Visitante</span>
            </div>

            <div className="flex flex-col items-start px-2 text-sm border-l text-primary border-l-gray-600">
              <span></span>
              <span></span>
            </div>
          </div>

          {/* Segundo partido */}
          <div className="flex items-center">
            <div className="flex flex-col px-2 text-xs text-center text-secondary">
              <span>21/10/2025</span>
              <span className="text-red-500">10'</span>
            </div>

            <div className="flex flex-col items-start px-2 text-sm border-l text-primary border-l-gray-600 grow">
              <span>Local</span>
              <span>Visitante</span>
            </div>

            <div className="flex flex-col items-start px-2 text-sm border-l text-primary border-l-gray-600">
              <span className="text-red-500">2</span>
              <span className="text-red-500">1</span>
            </div>
          </div>

          {/* Tercer partido */}
          <div className="flex items-center">
            <div className="flex flex-col px-2 text-xs text-center text-secondary">
              <span>21/10/2025</span>
              <span>Fin</span>
            </div>

            <div className="flex flex-col items-start px-2 text-sm border-l text-primary border-l-gray-600 grow">
              <span>Local</span>
              <span className="text-secondary">Visitante</span>
            </div>

            <div className="flex flex-col items-start px-2 text-sm border-l text-primary border-l-gray-600">
              <span>2</span>
              <span>1</span>
            </div>
          </div>

          {/* Cuarto partido */}
          <div className="flex items-center">
            <div className="flex flex-col px-2 text-xs text-center text-secondary">
              <span>21/10/2025</span>
              <span>Fin</span>
            </div>

            <div className="flex flex-col items-start px-2 text-sm border-l text-primary border-l-gray-600 grow">
              <span>Local</span>
              <span>Visitante</span>
            </div>

            <div className="flex flex-col items-start px-2 text-sm border-l text-primary border-l-gray-600">
              <span>2</span>
              <span>2</span>
            </div>
          </div>

          {/* Primer partido */}
          <div className="flex items-center">
            <div className="flex flex-col px-2 text-xs text-center text-secondary">
              <span>21/10/2025</span>
              <span>15:00</span>
            </div>

            <div className="flex flex-col items-start px-2 text-sm border-l text-primary border-l-gray-600 grow">
              <span>Local</span>
              <span>Visitante</span>
            </div>

            <div className="flex flex-col items-start px-2 text-sm border-l text-primary border-l-gray-600">
              <span></span>
              <span></span>
            </div>
          </div>

          {/* Segundo partido */}
          <div className="flex items-center">
            <div className="flex flex-col px-2 text-xs text-center text-secondary">
              <span>21/10/2025</span>
              <span className="text-red-500">10'</span>
            </div>

            <div className="flex flex-col items-start px-2 text-sm border-l text-primary border-l-gray-600 grow">
              <span>Local</span>
              <span>Visitante</span>
            </div>

            <div className="flex flex-col items-start px-2 text-sm border-l text-primary border-l-gray-600">
              <span className="text-red-500">2</span>
              <span className="text-red-500">1</span>
            </div>
          </div>

          {/* Tercer partido */}
          <div className="flex items-center">
            <div className="flex flex-col px-2 text-xs text-center text-secondary">
              <span>21/10/2025</span>
              <span>Fin</span>
            </div>

            <div className="flex flex-col items-start px-2 text-sm border-l text-primary border-l-gray-600 grow">
              <span>Local</span>
              <span className="text-secondary">Visitante</span>
            </div>

            <div className="flex flex-col items-start px-2 text-sm border-l text-primary border-l-gray-600">
              <span>2</span>
              <span>1</span>
            </div>
          </div>

          {/* Cuarto partido */}
          <div className="flex items-center">
            <div className="flex flex-col px-2 text-xs text-center text-secondary">
              <span>21/10/2025</span>
              <span>Fin</span>
            </div>

            <div className="flex flex-col items-start px-2 text-sm border-l text-primary border-l-gray-600 grow">
              <span>Local</span>
              <span>Visitante</span>
            </div>

            <div className="flex flex-col items-start px-2 text-sm border-l text-primary border-l-gray-600">
              <span>2</span>
              <span>2</span>
            </div>
          </div>

          {/* Primer partido */}
          <div className="flex items-center">
            <div className="flex flex-col px-2 text-xs text-center text-secondary">
              <span>21/10/2025</span>
              <span>15:00</span>
            </div>

            <div className="flex flex-col items-start px-2 text-sm border-l text-primary border-l-gray-600 grow">
              <span>Local</span>
              <span>Visitante</span>
            </div>

            <div className="flex flex-col items-start px-2 text-sm border-l text-primary border-l-gray-600">
              <span></span>
              <span></span>
            </div>
          </div>

          {/* Segundo partido */}
          <div className="flex items-center">
            <div className="flex flex-col px-2 text-xs text-center text-secondary">
              <span>21/10/2025</span>
              <span className="text-red-500">10'</span>
            </div>

            <div className="flex flex-col items-start px-2 text-sm border-l text-primary border-l-gray-600 grow">
              <span>Local</span>
              <span>Visitante</span>
            </div>

            <div className="flex flex-col items-start px-2 text-sm border-l text-primary border-l-gray-600">
              <span className="text-red-500">2</span>
              <span className="text-red-500">1</span>
            </div>
          </div>

          {/* Tercer partido */}
          <div className="flex items-center">
            <div className="flex flex-col px-2 text-xs text-center text-secondary">
              <span>21/10/2025</span>
              <span>Fin</span>
            </div>

            <div className="flex flex-col items-start px-2 text-sm border-l text-primary border-l-gray-600 grow">
              <span>Local</span>
              <span className="text-secondary">Visitante</span>
            </div>

            <div className="flex flex-col items-start px-2 text-sm border-l text-primary border-l-gray-600">
              <span>2</span>
              <span>1</span>
            </div>
          </div>

          {/* Cuarto partido */}
          <div className="flex items-center">
            <div className="flex flex-col px-2 text-xs text-center text-secondary">
              <span>21/10/2025</span>
              <span>Fin</span>
            </div>

            <div className="flex flex-col items-start px-2 text-sm border-l text-primary border-l-gray-600 grow">
              <span>Local</span>
              <span>Visitante</span>
            </div>

            <div className="flex flex-col items-start px-2 text-sm border-l text-primary border-l-gray-600">
              <span>2</span>
              <span>2</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
