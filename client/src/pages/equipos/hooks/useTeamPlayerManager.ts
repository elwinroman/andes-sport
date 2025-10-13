import { useState } from 'react'

export interface Player {
  id: number
  nombres: string
  apellidos: string
}

export interface Team {
  id: number
  nombre: string
  detalles: string
  jugadores: Player[]
}

export interface DeleteTarget {
  type: 'team' | 'player'
  id?: number
  teamId?: number
  playerId?: number
}

export interface CurrentTeam {
  id: number | null
  nombre: string
  detalles: string
}

export interface CurrentPlayer {
  id: number | null
  teamId: number | null
  nombres: string
  apellidos: string
}

export function useTeamPlayerManager() {
  const [teams, setTeams] = useState<Team[]>([])
  const [isTeamDialogOpen, setIsTeamDialogOpen] = useState(false)
  const [isPlayerDialogOpen, setIsPlayerDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<DeleteTarget | null>(null)

  const [currentTeam, setCurrentTeam] = useState<CurrentTeam>({
    id: null,
    nombre: '',
    detalles: '',
  })

  const [currentPlayer, setCurrentPlayer] = useState<CurrentPlayer>({
    id: null,
    teamId: null,
    nombres: '',
    apellidos: '',
  })

  // Team functions
  const handleSaveTeam = () => {
    if (!currentTeam.nombre.trim()) return

    if (currentTeam.id) {
      setTeams(
        teams.map((team) => (team.id === currentTeam.id ? { ...team, nombre: currentTeam.nombre, detalles: currentTeam.detalles } : team)),
      )
    } else {
      const newTeam = {
        id: Date.now(),
        nombre: currentTeam.nombre,
        detalles: currentTeam.detalles,
        jugadores: [],
      }
      setTeams([...teams, newTeam])
    }

    setIsTeamDialogOpen(false)
    setCurrentTeam({ id: null, nombre: '', detalles: '' })
  }

  const handleEditTeam = (team: Team) => {
    setCurrentTeam({ id: team.id, nombre: team.nombre, detalles: team.detalles })
    setIsTeamDialogOpen(true)
  }

  const handleDeleteTeam = (teamId: number) => {
    setDeleteTarget({ type: 'team', id: teamId })
    setIsDeleteDialogOpen(true)
  }

  const openNewTeamDialog = () => {
    setCurrentTeam({ id: null, nombre: '', detalles: '' })
    setIsTeamDialogOpen(true)
  }

  // Player functions
  const handleSavePlayer = () => {
    if (!currentPlayer.nombres.trim() || !currentPlayer.apellidos.trim()) return

    setTeams(
      teams.map((team) => {
        if (team.id === currentPlayer.teamId) {
          if (currentPlayer.id) {
            return {
              ...team,
              jugadores: team.jugadores.map((player) =>
                player.id === currentPlayer.id ? { ...player, nombres: currentPlayer.nombres, apellidos: currentPlayer.apellidos } : player,
              ),
            }
          } else {
            return {
              ...team,
              jugadores: [
                ...team.jugadores,
                {
                  id: Date.now(),
                  nombres: currentPlayer.nombres,
                  apellidos: currentPlayer.apellidos,
                },
              ],
            }
          }
        }
        return team
      }),
    )

    setIsPlayerDialogOpen(false)
    setCurrentPlayer({ id: null, teamId: null, nombres: '', apellidos: '' })
  }

  const handleEditPlayer = (teamId: number, player: Player) => {
    setCurrentPlayer({ id: player.id, teamId, nombres: player.nombres, apellidos: player.apellidos })
    setIsPlayerDialogOpen(true)
  }

  const handleDeletePlayer = (teamId: number, playerId: number) => {
    setDeleteTarget({ type: 'player', teamId, playerId })
    setIsDeleteDialogOpen(true)
  }

  const openNewPlayerDialog = (teamId: number) => {
    setCurrentPlayer({ id: null, teamId, nombres: '', apellidos: '' })
    setIsPlayerDialogOpen(true)
  }

  const confirmDelete = () => {
    if (!deleteTarget) return

    if (deleteTarget.type === 'team') {
      setTeams(teams.filter((team) => team.id !== deleteTarget.id))
    } else if (deleteTarget.type === 'player') {
      setTeams(
        teams.map((team) => {
          if (team.id === deleteTarget.teamId) {
            return {
              ...team,
              jugadores: team.jugadores.filter((player) => player.id !== deleteTarget.playerId),
            }
          }
          return team
        }),
      )
    }
    setIsDeleteDialogOpen(false)
    setDeleteTarget(null)
  }

  return {
    // State
    teams,
    currentTeam,
    currentPlayer,
    isTeamDialogOpen,
    isPlayerDialogOpen,
    isDeleteDialogOpen,
    deleteTarget,

    // State setters
    setCurrentTeam,
    setCurrentPlayer,
    setIsTeamDialogOpen,
    setIsPlayerDialogOpen,
    setIsDeleteDialogOpen,

    // Team handlers
    handleSaveTeam,
    handleEditTeam,
    handleDeleteTeam,
    openNewTeamDialog,

    // Player handlers
    handleSavePlayer,
    handleEditPlayer,
    handleDeletePlayer,
    openNewPlayerDialog,

    // Delete handler
    confirmDelete,
  }
}
