import { getMatchConfiguration } from '../constants/matchConfigHelper'
import { type Team } from '../hooks/useMatchManager'

interface DualSportConfigurationPreviewProps {
  availableTeams: Team[]
  teamAssignments: Map<number, Team> | null
  assignmentProgress: { assigned: number; total: number }
}

export function DualSportConfigurationPreview({ availableTeams, teamAssignments, assignmentProgress }: DualSportConfigurationPreviewProps) {
  const futbolConfig = getMatchConfiguration(availableTeams.length, 'futbol')
  const voleyConfig = getMatchConfiguration(availableTeams.length, 'voley')

  if (!futbolConfig || !voleyConfig || availableTeams.length === 0) {
    return (
      <div className="p-6 border rounded-lg border-border bg-background">
        <p className="text-sm font-semibold text-center text-secondary">
          {availableTeams.length === 0 ? 'No hay equipos disponibles' : `No hay configuración para ${availableTeams.length} equipos`}
        </p>
        <p className="mt-2 text-xs text-center text-muted-foreground">Configuraciones disponibles: 6, 7, 8 o 9 equipos</p>
      </div>
    )
  }

  const progressPercentage = assignmentProgress.total > 0 ? (assignmentProgress.assigned / assignmentProgress.total) * 100 : 0
  const allTeamsAssigned = assignmentProgress.assigned === assignmentProgress.total && assignmentProgress.total > 0

  // Función helper para obtener el equipo asignado o placeholder
  const getTeamDisplay = (teamNumber: number) => {
    const assignedTeam = teamAssignments?.get(teamNumber)
    return assignedTeam ? assignedTeam.nombre : `#${teamNumber}`
  }

  const getTeamClass = (teamNumber: number) => {
    const assignedTeam = teamAssignments?.get(teamNumber)
    return assignedTeam ? 'bg-blue-500 text-white font-semibold' : 'bg-slate-200 text-slate-600'
  }

  const renderSportConfig = (config: number[][], sportName: string, bgColor: string) => (
    <div className="flex-1">
      <div className={`p-2 text-center ${bgColor} rounded-t-lg`}>
        <h3 className="text-sm font-bold text-white">{sportName}</h3>
        <p className="text-xs text-white opacity-90">{config.length} partidos</p>
      </div>
      <div className="p-3 space-y-1.5 bg-white border-x border-b rounded-b-lg border-slate-200">
        {config.map(([local, visitante], index) => {
          const bothAssigned = teamAssignments?.has(local) && teamAssignments?.has(visitante)
          return (
            <div
              key={index}
              className={`flex items-center gap-2 p-2 rounded transition-all ${
                bothAssigned ? 'bg-green-50 border border-green-200' : 'bg-slate-50'
              }`}
            >
              <span className="text-[10px] font-bold text-slate-400 w-4">{index + 1}</span>
              <div className="flex items-center flex-1 gap-1.5 text-xs">
                <span className={`px-2 py-0.5 rounded ${getTeamClass(local)}`}>{getTeamDisplay(local)}</span>
                <span className="text-slate-400">vs</span>
                <span className={`px-2 py-0.5 rounded ${getTeamClass(visitante)}`}>{getTeamDisplay(visitante)}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )

  return (
    <div className="rounded-lg bg-background shadow-widget">
      {/* Header con progreso */}
      <div className="p-3 border-b bg-slate-50 border-border">
        <div className="flex items-center justify-between mb-2">
          <div>
            <p className="text-sm font-semibold text-secondary">Vista de Configuraciones</p>
            <p className="text-xs text-slate-600">{availableTeams.length} equipos</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-primary">
              {assignmentProgress.assigned} / {assignmentProgress.total}
            </p>
            <p className="text-xs text-slate-600">asignados</p>
          </div>
        </div>

        {/* Barra de progreso */}
        <div className="relative w-full h-2 overflow-hidden rounded-full bg-slate-200">
          <div
            className={`h-full transition-all duration-300 ${allTeamsAssigned ? 'bg-green-500' : 'bg-blue-500'}`}
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        {allTeamsAssigned && <p className="mt-1.5 text-xs font-medium text-center text-green-600">✓ Listos para generar</p>}
      </div>

      {/* Configuraciones lado a lado */}
      <div className="grid grid-cols-2 gap-4 p-4">
        {renderSportConfig(futbolConfig, '⚽ Fútbol', 'bg-gradient-to-r from-green-600 to-green-500')}
        {renderSportConfig(voleyConfig, '🏐 Vóley', 'bg-gradient-to-r from-orange-600 to-orange-500')}
      </div>
    </div>
  )
}
