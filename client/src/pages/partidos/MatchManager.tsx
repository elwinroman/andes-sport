import { useState } from 'react'

import { AvailableTeamsList } from './components/AvailableTeamsList'
import { DeleteMatchDialog } from './components/DeleteMatchDialog'
import { DualSportConfigurationPreview } from './components/DualSportConfigurationPreview'
import { MatchHeader } from './components/MatchHeader'
import { MatchList } from './components/MatchList'
import { useMatchManager } from './hooks/useMatchManager'

export function MatchManager() {
  const isAuthenticated = useStore((state) => state.isAuthenticated)

  const {
    availableTeams,
    matches,
    deleteMatch,
    resetAll,
    generateMatchesFromConfig,
    assignNextTeam,
    randomizeTeamAssignments,
    clearTeamAssignments,
    getAssignmentProgress,
    canUseConfiguration,
    teamAssignments,
    selectedSport,
    setSelectedSport,
    loading,
  } = useMatchManager()

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [matchToDelete, setMatchToDelete] = useState<number | null>(null)

  const handleDeleteMatch = (matchId: number) => {
    setMatchToDelete(matchId)
    setIsDeleteDialogOpen(true)
  }

  const confirmDeleteMatch = () => {
    if (matchToDelete) {
      deleteMatch(matchToDelete)
    }
    setIsDeleteDialogOpen(false)
    setMatchToDelete(null)
  }

  const handleReset = () => {
    resetAll()
  }

  const handleGenerateFromConfig = () => {
    generateMatchesFromConfig()
  }

  const progress = getAssignmentProgress()
  const allTeamsAssigned = progress.assigned === progress.total && progress.total > 0

  if (!isAuthenticated) return <Navigate to="/login" replace />

  return (
    <div className="py-4">
      <div className="mx-auto max-w-7xl">
        <MatchHeader
          canReset={matches.length > 0}
          canUseConfiguration={canUseConfiguration && matches.length === 0}
          canGenerateFromConfig={allTeamsAssigned}
          selectedSport={selectedSport}
          hasMatches={matches.length > 0}
          onReset={handleReset}
          onGenerateFromConfig={handleGenerateFromConfig}
          onSportChange={setSelectedSport}
        />

        {loading ? (
          <div className="flex items-center justify-center gap-2 py-16">
            <div className="w-6 h-6 border-2 border-gray-300 rounded-full border-t-blue-600 animate-spin"></div>
            <span className="text-gray-600">Cargando equipos...</span>
          </div>
        ) : (
          <>
            {/* Mensaje de error si no hay configuración disponible */}
            {!canUseConfiguration && matches.length === 0 && (
              <div className="p-6 mb-6 border-2 border-red-200 rounded-lg bg-red-50">
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 text-2xl bg-red-100 rounded-full">⚠️</div>
                  <div className="flex-1">
                    <h3 className="mb-2 text-lg font-bold text-red-900">No hay configuración disponible</h3>
                    <p className="mb-2 text-sm text-red-800">
                      No existe una configuración de fixture para <strong>{availableTeams.length} equipos</strong> en el deporte{' '}
                      <strong>{selectedSport === 'futbol' ? 'Fútbol' : 'Vóley'}</strong>.
                    </p>
                    <p className="text-sm text-red-700">
                      Por favor, selecciona un número de equipos que tenga una configuración predefinida o cambia el deporte.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Sección de Configuración - Solo visible si hay configuración disponible */}
            {canUseConfiguration && matches.length === 0 && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-primary">Configuración de Partidos</h2>
                  <div className="flex gap-2">
                    {teamAssignments && (
                      <button
                        onClick={clearTeamAssignments}
                        className="px-4 py-2 text-sm font-medium transition-colors border rounded-lg text-slate-600 border-slate-300 hover:bg-slate-100"
                      >
                        Limpiar
                      </button>
                    )}
                    <button
                      onClick={assignNextTeam}
                      disabled={getAssignmentProgress().assigned === getAssignmentProgress().total}
                      className="px-4 py-2 text-sm font-medium text-white transition-colors bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed"
                    >
                      Asignar Siguiente
                    </button>
                    <button
                      onClick={randomizeTeamAssignments}
                      className="px-4 py-2 text-sm font-medium text-white transition-colors bg-purple-600 rounded-lg hover:bg-purple-700"
                    >
                      Aleatorizar Todos
                    </button>
                  </div>
                </div>

                {/* Lista de equipos disponibles */}
                {!allTeamsAssigned && availableTeams.length > 0 && (
                  <AvailableTeamsList availableTeams={availableTeams} teamAssignments={teamAssignments} />
                )}

                {/* Indicador del siguiente equipo a asignar */}
                {!allTeamsAssigned && availableTeams.length > 0 && (
                  <div className="p-4 mb-4 border border-indigo-200 rounded-sm bg-indigo-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-12 h-12 text-lg font-bold text-white bg-indigo-500 rounded-full shadow-md">
                          #{progress.assigned + 1}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-left text-indigo-900">
                            Siguiente posición: <strong>Equipo {(progress.assigned + 1).toString().padStart(2, '0')}</strong>
                          </p>
                          <p className="text-xs text-indigo-700">
                            {(() => {
                              const assignedTeams = Array.from(teamAssignments?.values() || [])
                              const unassignedCount = availableTeams.filter((team) => !assignedTeams.find((t) => t.id === team.id)).length
                              return `${unassignedCount} equipo${unassignedCount !== 1 ? 's' : ''} disponible${unassignedCount !== 1 ? 's' : ''} • Selección aleatoria`
                            })()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 px-4 py-3 border border-indigo-300 rounded-lg shadow-sm bg-gradient-to-r from-purple-50 to-indigo-50">
                        <span className="text-3xl animate-pulse">🎲</span>
                        <div>
                          <p className="text-sm font-bold text-indigo-900">Aleatorio</p>
                          <p className="text-xs text-indigo-600">Sorpresa</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <DualSportConfigurationPreview
                  availableTeams={availableTeams}
                  teamAssignments={teamAssignments}
                  assignmentProgress={getAssignmentProgress()}
                />
              </div>
            )}

            {/* Lista de Partidos Generados */}
            {matches.length > 0 && (
              <div className="mt-6">
                <MatchList matches={matches} onDeleteMatch={handleDeleteMatch} />
              </div>
            )}
          </>
        )}

        <DeleteMatchDialog isOpen={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen} onConfirm={confirmDeleteMatch} />
      </div>
    </div>
  )
}
