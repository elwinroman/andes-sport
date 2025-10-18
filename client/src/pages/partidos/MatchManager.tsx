import { Save, Trophy } from 'lucide-react'
import { useState } from 'react'
import { Navigate } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { useStore } from '@/zustand/store'

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
    updateMatch,
    startMatch,
    finishMatch,
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
    isSaving,
    saveError,
    createFinalMatch,
    areAllMatchesFinished,
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

  const handleGenerateFromConfig = () => {
    generateMatchesFromConfig()
  }

  const handleCreateFinalMatch = () => {
    createFinalMatch()
  }

  const progress = getAssignmentProgress()
  const allTeamsAssigned = progress.assigned === progress.total && progress.total > 0
  const allMatchesFinished = areAllMatchesFinished()

  if (!isAuthenticated) return <Navigate to="/login" replace />

  return (
    <div className="py-2 sm:py-4 px-2 sm:px-4">
      <div className="mx-auto max-w-7xl">
        <MatchHeader
          canUseConfiguration={canUseConfiguration && matches.length === 0}
          selectedSport={selectedSport}
          hasMatches={matches.length > 0}
          onSportChange={setSelectedSport}
        />

        {loading ? (
          <div className="flex items-center justify-center gap-2 py-8 sm:py-16">
            <div className="w-5 h-5 sm:w-6 sm:h-6 border-2 border-gray-300 rounded-full border-t-blue-600 animate-spin"></div>
            <span className="text-sm sm:text-base text-gray-600">Cargando equipos...</span>
          </div>
        ) : (
          <>
            {/* Mensaje de error si no hay configuración disponible */}
            {!canUseConfiguration && matches.length === 0 && (
              <div className="p-3 sm:p-6 mb-4 sm:mb-6 border-2 border-red-200 rounded-lg bg-red-50">
                <div className="flex items-start gap-2 sm:gap-4">
                  <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 sm:w-12 sm:h-12 text-lg sm:text-2xl bg-red-100 rounded-full">
                    ⚠️
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="mb-1 sm:mb-2 text-sm sm:text-lg font-bold text-red-900">No hay configuración disponible</h3>
                    <p className="mb-1 sm:mb-2 text-xs sm:text-sm text-red-800">
                      No existe una configuración de fixture para <strong>{availableTeams.length} equipos</strong> en el deporte{' '}
                      <strong>{selectedSport === 'futbol' ? 'Fútbol' : 'Vóley'}</strong>.
                    </p>
                    <p className="text-xs sm:text-sm text-red-700">
                      Por favor, selecciona un número de equipos que tenga una configuración predefinida o cambia el deporte.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Sección de Configuración - Solo visible si hay configuración disponible */}
            {canUseConfiguration && matches.length === 0 && (
              <div className="mb-4 sm:mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 sm:mb-4 gap-3">
                  <h2 className="text-base sm:text-lg font-semibold text-primary font-montserrat">Configuración de Partidos</h2>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {teamAssignments && (
                      <Button onClick={clearTeamAssignments} variant="outline" size="sm" className="text-xs sm:text-sm">
                        Limpiar
                      </Button>
                    )}
                    <Button
                      onClick={assignNextTeam}
                      disabled={getAssignmentProgress().assigned === getAssignmentProgress().total}
                      className="bg-accent text-black hover:bg-accent/90 text-xs sm:text-sm"
                      size="sm"
                    >
                      Asignar Siguiente
                    </Button>
                    <Button onClick={randomizeTeamAssignments} size="sm" className="text-xs sm:text-sm">
                      Aleatorizar
                    </Button>
                    <Button
                      onClick={handleGenerateFromConfig}
                      disabled={!allTeamsAssigned || isSaving}
                      className="bg-green-600 hover:bg-green-700 text-xs sm:text-sm"
                      size="sm"
                    >
                      {isSaving ? (
                        <>
                          <div className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
                          Guardando...
                        </>
                      ) : (
                        <>
                          <Save className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                          Guardar
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                {/* Mensaje de error al guardar */}
                {saveError && (
                  <div className="p-3 sm:p-4 mb-3 sm:mb-4 border-2 border-red-200 rounded-lg bg-red-50">
                    <div className="flex items-start gap-2 sm:gap-3">
                      <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 text-lg sm:text-xl bg-red-100 rounded-full">
                        ❌
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="mb-0.5 sm:mb-1 text-xs sm:text-sm font-bold text-red-900">Error al guardar el fixture</h4>
                        <p className="text-xs sm:text-sm text-red-800">{saveError}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Lista de equipos disponibles */}
                {!allTeamsAssigned && availableTeams.length > 0 && (
                  <AvailableTeamsList availableTeams={availableTeams} teamAssignments={teamAssignments} />
                )}

                {/* Indicador del siguiente equipo a asignar */}
                {!allTeamsAssigned && availableTeams.length > 0 && (
                  <div className="p-3 sm:p-4 mb-3 sm:mb-4 border border-indigo-200 rounded-sm bg-indigo-50">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 text-base sm:text-lg font-bold text-white bg-indigo-500 rounded-full shadow-md flex-shrink-0">
                          #{progress.assigned + 1}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs sm:text-sm font-semibold text-left text-indigo-900">
                            Siguiente: <strong>Equipo {(progress.assigned + 1).toString().padStart(2, '0')}</strong>
                          </p>
                          <p className="text-[10px] sm:text-xs text-indigo-700">
                            {(() => {
                              const assignedTeams = Array.from(teamAssignments?.values() || [])
                              const unassignedCount = availableTeams.filter((team) => !assignedTeams.find((t) => t.id === team.id)).length
                              return `${unassignedCount} equipo${unassignedCount !== 1 ? 's' : ''} disponible${unassignedCount !== 1 ? 's' : ''} • Selección aleatoria`
                            })()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-3 border border-indigo-300 rounded-lg shadow-sm bg-gradient-to-r from-purple-50 to-indigo-50">
                        <span className="text-2xl sm:text-3xl animate-pulse">🎲</span>
                        <div>
                          <p className="text-xs sm:text-sm font-bold text-indigo-900">Aleatorio</p>
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
                <MatchList
                  matches={matches}
                  onDeleteMatch={handleDeleteMatch}
                  onEditMatch={updateMatch}
                  onStartMatch={startMatch}
                  onFinishMatch={finishMatch}
                />
              </div>
            )}

            {/* Botón para crear partido final */}
            {matches.length > 0 && allMatchesFinished && (
              <div className="mt-4 sm:mt-6">
                <div className="p-3 sm:p-6 border-2 rounded-lg bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-300">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex items-start gap-2 sm:gap-4">
                      <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-yellow-100 rounded-full">
                        <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="mb-1 sm:mb-2 text-sm sm:text-lg font-bold text-yellow-900">¡Todos los partidos han finalizado!</h3>
                        <p className="text-xs sm:text-sm text-yellow-800">
                          Los 2 primeros equipos están listos para la final de{' '}
                          <strong>{selectedSport === 'futbol' ? 'Fútbol' : 'Vóley'}</strong>.
                        </p>
                      </div>
                    </div>
                    <Button
                      onClick={handleCreateFinalMatch}
                      disabled={isSaving}
                      className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold text-xs sm:text-sm w-full sm:w-auto"
                      size="sm"
                    >
                      {isSaving ? (
                        <>
                          <div className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
                          Creando...
                        </>
                      ) : (
                        <>
                          <Trophy className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                          Crear Partido Final
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                {/* Mensaje de error al crear final */}
                {saveError && (
                  <div className="p-3 sm:p-4 mt-3 sm:mt-4 border-2 border-red-200 rounded-lg bg-red-50">
                    <div className="flex items-start gap-2 sm:gap-3">
                      <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 text-lg sm:text-xl bg-red-100 rounded-full">
                        ❌
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="mb-0.5 sm:mb-1 text-xs sm:text-sm font-bold text-red-900">Error al crear el partido final</h4>
                        <p className="text-xs sm:text-sm text-red-800">{saveError}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        )}

        <DeleteMatchDialog isOpen={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen} onConfirm={confirmDeleteMatch} />
      </div>
    </div>
  )
}
