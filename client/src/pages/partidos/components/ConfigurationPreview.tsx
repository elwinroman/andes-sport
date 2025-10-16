import { type Team } from '../hooks/useMatchManager'

interface ConfigurationPreviewProps {
  configuration: number[][] | null
  availableTeams: Team[]
  teamAssignments: Map<number, Team> | null
  assignmentProgress: { assigned: number; total: number }
}

export function ConfigurationPreview({ configuration, availableTeams, teamAssignments, assignmentProgress }: ConfigurationPreviewProps) {
  if (!configuration || availableTeams.length === 0) {
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

  // Función helper para mostrar nombre genérico o real
  const getTeamDisplay = (teamNumber: number): { name: string; detail: string; isAssigned: boolean } => {
    const assignedTeam = teamAssignments?.get(teamNumber)
    if (assignedTeam) {
      return {
        name: assignedTeam.nombre,
        detail: assignedTeam.detalles,
        isAssigned: true,
      }
    }
    return {
      name: `Equipo ${teamNumber.toString().padStart(2, '0')}`,
      detail: 'Sin asignar',
      isAssigned: false,
    }
  }

  return (
    <div className="rounded-md bg-background shadow-widget">
      {/* Header con progreso */}
      <div className="p-4 border-b bg-slate-50 border-border">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-sm font-semibold text-secondary">Configuración de Fixture ({configuration.length} partidos)</p>
            <p className="text-xs text-left text-slate-600">{availableTeams.length} equipos disponibles</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-primary">
              {assignmentProgress.assigned} / {assignmentProgress.total}
            </p>
            <p className="text-xs text-slate-600">Equipos asignados</p>
          </div>
        </div>

        {/* Barra de progreso */}
        <div className="relative w-full h-2 overflow-hidden rounded-full bg-slate-200">
          <div
            className={`h-full transition-all duration-300 ${allTeamsAssigned ? 'bg-green-500' : 'bg-blue-500'}`}
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        {allTeamsAssigned && <p className="mt-2 text-xs font-medium text-center text-green-600">✓ Todos los equipos han sido asignados</p>}
      </div>

      {/* Lista de partidos */}
      <div className="p-4 space-y-2 rounded-md bg-card">
        {configuration.map((match, index) => {
          const [localNum, visitanteNum] = match
          const localDisplay = getTeamDisplay(localNum)
          const visitanteDisplay = getTeamDisplay(visitanteNum)
          const bothAssigned = localDisplay.isAssigned && visitanteDisplay.isAssigned

          return (
            <div
              key={index}
              className={`flex items-center gap-3 p-3 transition-all rounded-lg border ${
                bothAssigned ? 'bg-green-50 border-green-200' : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {/* Número del partido */}
              <div className="flex flex-col items-center">
                <span
                  className={`flex items-center justify-center w-9 h-9 text-xs font-bold rounded-full ${
                    bothAssigned ? 'bg-green-500 text-white' : 'bg-slate-300 text-slate-700'
                  }`}
                >
                  {index + 1}
                </span>
              </div>

              <div className="flex items-center flex-1 gap-3">
                {/* Equipo Local */}
                <div className="flex items-center flex-1 min-w-0 gap-2">
                  <span
                    className={`px-2.5 py-1.5 text-xs font-mono font-bold rounded ${
                      localDisplay.isAssigned ? 'bg-purple-500 text-white' : 'bg-purple-100 text-purple-700'
                    }`}
                  >
                    #{localNum}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium truncate ${localDisplay.isAssigned ? 'text-slate-900' : 'text-slate-500'}`}>
                      {localDisplay.name}
                    </p>
                    <p className={`text-xs truncate ${localDisplay.isAssigned ? 'text-slate-500' : 'text-slate-400 italic'}`}>
                      {localDisplay.detail}
                    </p>
                  </div>
                </div>

                {/* VS */}
                <div className="flex items-center justify-center w-10">
                  <span className="text-sm font-bold text-slate-500 font-montserrat">VS</span>
                </div>

                {/* Equipo Visitante */}
                <div className="flex items-center flex-1 min-w-0 gap-2">
                  <span
                    className={`px-2.5 py-1.5 text-xs font-mono font-bold rounded ${
                      visitanteDisplay.isAssigned ? 'bg-orange-500 text-white' : 'bg-orange-100 text-orange-700'
                    }`}
                  >
                    #{visitanteNum}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium truncate ${visitanteDisplay.isAssigned ? 'text-slate-900' : 'text-slate-500'}`}>
                      {visitanteDisplay.name}
                    </p>
                    <p className={`text-xs truncate ${visitanteDisplay.isAssigned ? 'text-slate-500' : 'text-slate-400 italic'}`}>
                      {visitanteDisplay.detail}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
