import { Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { DeleteDialog, EmptyState, PlayerDialog, TeamCard, TeamDialog } from './components'
import { useTeamPlayerManager } from './hooks/useTeamPlayerManager'

export default function TeamPlayerManager() {
  const {
    teams,
    currentTeam,
    currentPlayer,
    isTeamDialogOpen,
    isPlayerDialogOpen,
    isDeleteDialogOpen,
    deleteTarget,
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
    confirmDelete,
  } = useTeamPlayerManager()

  return (
    <section className="p-6 bg-card">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-bold text-primary mb-2 text-left">Gestor de Equipos</h1>
            <p className="text-secondary">Administra los equipos y jugadores</p>
          </div>
          <Button onClick={openNewTeamDialog}>
            <Plus className="w-5 h-5 mr-2" />
            Nuevo Equipo
          </Button>
        </div>

        {teams.length === 0 ? (
          <EmptyState onCreateTeam={openNewTeamDialog} />
        ) : (
          <div className="grid gap-4">
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
          onOpenChange={setIsPlayerDialogOpen}
          onSave={handleSavePlayer}
          onPlayerChange={setCurrentPlayer}
        />

        <DeleteDialog
          open={isDeleteDialogOpen}
          deleteTarget={deleteTarget}
          onOpenChange={setIsDeleteDialogOpen}
          onConfirm={confirmDelete}
        />
      </div>
    </section>
  )
}
