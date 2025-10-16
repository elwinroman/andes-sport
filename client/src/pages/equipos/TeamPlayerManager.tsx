import { Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { DeleteDialog, EmptyState, PlayerDialog, TeamCard, TeamDialog } from './components'
import { useTeamPlayerManager } from './hooks/useTeamPlayerManager'

export function TeamPlayerManager() {
  const {
    teams,
    currentTeam,
    currentPlayer,
    isTeamDialogOpen,
    isPlayerDialogOpen,
    isDeleteDialogOpen,
    deleteTarget,
    availablePlayers,
    setCurrentTeam,
    setCurrentPlayer,
    setIsTeamDialogOpen,
    setIsPlayerDialogOpen,
    setIsDeleteDialogOpen,
    handleSaveTeam,
    handleEditTeam,
    handleDeleteTeam,
    openNewTeamDialog,
    handleSavePlayer,
    handleEditPlayer,
    handleDeletePlayer,
    openNewPlayerDialog,
    handleAssignExistingPlayer,
    confirmDelete,
    loading,
  } = useTeamPlayerManager()

  return (
    <section className="py-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="mb-2 text-xl font-bold text-left text-primary font-montserrat">Gestor de Equipos</h1>
          <p className="text-secondary">Administra los equipos y jugadores</p>
        </div>
        <Button onClick={openNewTeamDialog}>
          <Plus className="w-5 h-5 mr-2" />
          Nuevo Equipo
        </Button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center gap-2 py-8">
          <div className="w-5 h-5 border-2 border-gray-300 rounded-full border-t-blue-600 animate-spin"></div>
          <span className="text-gray-600">Cargando...</span>
        </div>
      ) : teams.length === 0 ? (
        <EmptyState onCreateTeam={openNewTeamDialog} />
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {teams.map((team) => (
            <TeamCard
              key={team.id}
              team={team}
              onEditTeam={handleEditTeam}
              onDeleteTeam={handleDeleteTeam}
              onEditPlayer={handleEditPlayer}
              onDeletePlayer={handleDeletePlayer}
              onOpenNewPlayerDialog={openNewPlayerDialog}
            />
          ))}
        </div>
      )}

      <TeamDialog
        open={isTeamDialogOpen}
        currentTeam={currentTeam}
        onOpenChange={setIsTeamDialogOpen}
        onSave={handleSaveTeam}
        onTeamChange={setCurrentTeam}
      />

      <PlayerDialog
        open={isPlayerDialogOpen}
        currentPlayer={currentPlayer}
        availablePlayers={availablePlayers}
        onOpenChange={setIsPlayerDialogOpen}
        onSave={handleSavePlayer}
        onAssignExisting={handleAssignExistingPlayer}
        onPlayerChange={setCurrentPlayer}
        loading={loading}
      />

      <DeleteDialog open={isDeleteDialogOpen} deleteTarget={deleteTarget} onOpenChange={setIsDeleteDialogOpen} onConfirm={confirmDelete} />
    </section>
  )
}
