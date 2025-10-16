import { ClipboardList, RotateCcw } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { type SportType } from '../constants/matchConfigHelper'

interface MatchHeaderProps {
  canReset: boolean
  canUseConfiguration: boolean
  canGenerateFromConfig: boolean
  selectedSport: SportType
  hasMatches: boolean
  onReset: () => void
  onGenerateFromConfig: () => void
  onSportChange: (sport: SportType) => void
}

export function MatchHeader({
  canReset,
  canUseConfiguration,
  canGenerateFromConfig,
  selectedSport,
  hasMatches,
  onReset,
  onGenerateFromConfig,
  onSportChange,
}: MatchHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="flex items-center gap-3 mb-2 text-xl font-bold text-primary font-montserrat">Administrador de Partidos</h1>
          <p className="text-sm text-secondary">Crea partidos usando configuraciones predefinidas de fixtures</p>
        </div>
        <div className="flex gap-2">
          {canUseConfiguration && (
            <Button
              onClick={onGenerateFromConfig}
              disabled={!canGenerateFromConfig}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed"
            >
              <ClipboardList className="w-4 h-4 mr-2" />
              Generar desde Configuración
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

      {/* Selector de Deporte - Solo visible cuando hay partidos generados */}
      {hasMatches && (
        <div className="flex items-center gap-3 p-4 border rounded-sm border-border bg-background">
          <span className="text-sm font-semibold text-secondary">Ver Fixture de:</span>
          <div className="flex gap-2">
            <button
              onClick={() => onSportChange('futbol')}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                selectedSport === 'futbol' ? 'bg-primary text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              ⚽ Fútbol
            </button>
            <button
              onClick={() => onSportChange('voley')}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                selectedSport === 'voley' ? 'bg-primary text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              🏐 Vóley
            </button>
          </div>
        </div>
      )}

      {/* Indicador de configuración disponible - Solo visible durante configuración */}
      {!hasMatches && canUseConfiguration && (
        <div className="flex items-center justify-center gap-2 p-3 border rounded-sm bg-green-50 border-green-200">
          <span className="text-sm font-medium text-green-700">✓ Configuración disponible para ambos deportes</span>
        </div>
      )}
    </div>
  )
}
