import { RotateCcw, Shuffle } from 'lucide-react'

import { Button } from '@/components/ui/button'

interface MatchHeaderProps {
  canAutoComplete: boolean
  canReset: boolean
  onAutoComplete: () => void
  onReset: () => void
}

export function MatchHeader({ canAutoComplete, canReset, onAutoComplete, onReset }: MatchHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="flex items-center gap-3 mb-2 text-xl font-bold text-primary font-montserrat">Administrador de Partidos</h1>
        <p className="text-secondary">Crea enfrentamientos aleatorios entre equipos</p>
      </div>
      <div className="flex gap-2">
        {canAutoComplete && (
          <Button onClick={onAutoComplete} className="bg-green-600 hover:bg-green-700">
            <Shuffle className="w-4 h-4 mr-2" />
            Completar Automático
          </Button>
        )}
        {canReset && (
          <Button onClick={onReset} variant="outline">
            <RotateCcw className="w-4 h-4 mr-2" />
            Reiniciar Todo
          </Button>
        )}
      </div>
    </div>
  )
}
