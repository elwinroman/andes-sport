import { useEffect, useState } from 'react'

import useFetchAndLoad from '@/hooks/useFetchAndLoad'
import { type EquipoApiResponse, type EquiposApiResponse, type JugadorApiResponse, type JugadorSinEquipoApiResponse } from '@/models'
import { actualizarEquipoService, eliminarEquipoService, getAllEquiposService, registrarEquipoService } from '@/services/equipo.service'
import {
  actualizarJugadorService,
  asignarJugadorAEquipoService,
  eliminarJugadorDeEquipoService,
  getJugadoresSinEquipoService,
  registrarJugadorService,
} from '@/services/jugador.service'

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
  const [isInitialLoading, setIsInitialLoading] = useState(true)
  const [availablePlayers, setAvailablePlayers] = useState<Array<{ id: number; nombres: string; apellidos: string }>>([])

  // Hook para crear/actualizar equipos (devuelve EquipoApiResponse)
  const { callEndpoint: createTeam, loading: creatingTeam, error: createError } = useFetchAndLoad<EquipoApiResponse>()

  // Hook para obtener todos los equipos (devuelve EquiposApiResponse[])
  const { callEndpoint: fetchTeams, loading: loadingTeams, error: fetchError } = useFetchAndLoad<EquiposApiResponse[]>()

  // Hook para eliminar equipos
  const { callEndpoint: deleteTeam, loading: deletingTeam, error: deleteError } = useFetchAndLoad<void>()

  // Hook para crear jugadores
  const { callEndpoint: createPlayer, loading: creatingPlayer, error: createPlayerError } = useFetchAndLoad<JugadorApiResponse>()

  // Hook para eliminar jugadores de equipos
  const { callEndpoint: deletePlayerFromTeam, loading: deletingPlayer, error: deletePlayerError } = useFetchAndLoad<void>()

  // Hook para obtener jugadores sin equipo
  const { callEndpoint: fetchAvailablePlayers } = useFetchAndLoad<JugadorSinEquipoApiResponse[]>()

  // Hook para asignar jugador existente a equipo
  const { callEndpoint: assignPlayerToTeam } = useFetchAndLoad<JugadorApiResponse>()

  useEffect(() => {
    const loadTeams = async () => {
      try {
        const response = await fetchTeams(getAllEquiposService())
        // Transformar los datos de la API al formato de Team
        const teamsData: Team[] = response.data.map((equipo) => ({
          id: equipo.idEquipo,
          nombre: equipo.cEquipo,
          detalles: equipo.cDetalle,
          jugadores: equipo.equipoJugadores.map((ej) => ({
            id: ej.jugador.idJugador,
            nombres: ej.jugador.cNombreJugador,
            apellidos: ej.jugador.cApellidoJugador,
          })),
        }))
        setTeams(teamsData)
        setIsInitialLoading(false)
      } catch (err) {
        // Solo setear loading a false si NO es un error de cancelación
        if (err instanceof Error && err.name !== 'CanceledError') {
          setIsInitialLoading(false)
        }
        // Si es CanceledError, mantenemos isInitialLoading en true para el siguiente intento
      }
    }
    loadTeams()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
  const handleSaveTeam = async () => {
    if (!currentTeam.nombre.trim()) return

    if (currentTeam.id) {
      // Actualizar equipo existente en la base de datos
      const response = await createTeam(
        actualizarEquipoService(currentTeam.id, {
          cEquipo: currentTeam.nombre,
          cDetalle: currentTeam.detalles,
        }),
      )

      // Actualizar el estado local con los datos de la respuesta
      setTeams(
        teams.map((team) =>
          team.id === currentTeam.id
            ? {
                ...team,
                nombre: response.data.cEquipo,
                detalles: response.data.cDetalle,
              }
            : team,
        ),
      )
    } else {
      // Crear nuevo equipo
      const newTeam = {
        id: Date.now(),
        nombre: currentTeam.nombre,
        detalles: currentTeam.detalles,
        jugadores: [],
      }

      // Guardar en base de datos el equipo
      const response = await createTeam(
        registrarEquipoService({
          cEquipo: currentTeam.nombre,
          cDetalle: currentTeam.detalles,
        }),
      )
      newTeam.id = response.data.idEquipo
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
  const handleSavePlayer = async () => {
    if (!currentPlayer.nombres.trim() || !currentPlayer.apellidos.trim() || !currentPlayer.teamId) return

    if (currentPlayer.id) {
      // Actualizar jugador existente en la base de datos
      const response = await createPlayer(
        actualizarJugadorService(currentPlayer.id, {
          cNombreJugador: currentPlayer.nombres,
          cApellidoJugador: currentPlayer.apellidos,
          idEquipo: currentPlayer.teamId,
        }),
      )

      // Actualizar el estado local con los datos de la respuesta
      setTeams(
        teams.map((team) => {
          if (team.id === currentPlayer.teamId) {
            return {
              ...team,
              jugadores: team.jugadores.map((player) =>
                player.id === currentPlayer.id
                  ? {
                      ...player,
                      nombres: response.data.cNombreJugador,
                      apellidos: response.data.cApellidoJugador,
                    }
                  : player,
              ),
            }
          }
          return team
        }),
      )
    } else {
      // Crear nuevo jugador en la base de datos
      const response = await createPlayer(
        registrarJugadorService({
          cNombreJugador: currentPlayer.nombres,
          cApellidoJugador: currentPlayer.apellidos,
          idEquipo: currentPlayer.teamId,
          lVigente: true,
        }),
      )

      // Actualizar el estado local con el jugador creado
      setTeams(
        teams.map((team) => {
          if (team.id === currentPlayer.teamId) {
            return {
              ...team,
              jugadores: [
                ...team.jugadores,
                {
                  id: response.data.idJugador,
                  nombres: response.data.cNombreJugador,
                  apellidos: response.data.cApellidoJugador,
                },
              ],
            }
          }
          return team
        }),
      )
    }

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

  const openNewPlayerDialog = async (teamId: number) => {
    setCurrentPlayer({ id: null, teamId, nombres: '', apellidos: '' })

    // Cargar jugadores sin equipo cuando se abre el diálogo
    try {
      const response = await fetchAvailablePlayers(getJugadoresSinEquipoService())
      setAvailablePlayers(
        response.data.map((jugador) => ({
          id: jugador.idJugador,
          nombres: jugador.cNombreJugador,
          apellidos: jugador.cApellidoJugador,
        })),
      )
    } catch (err) {
      console.error('Error al cargar jugadores sin equipo:', err)
      setAvailablePlayers([])
    }

    setIsPlayerDialogOpen(true)
  }

  const handleAssignExistingPlayer = async (playerId: number) => {
    if (!currentPlayer.teamId) return

    try {
      // Asignar el jugador al equipo
      await assignPlayerToTeam(asignarJugadorAEquipoService(currentPlayer.teamId, playerId))

      // Buscar el jugador en availablePlayers
      const playerToAdd = availablePlayers.find((p) => p.id === playerId)
      if (!playerToAdd) return

      // Actualizar el estado local
      setTeams(
        teams.map((team) => {
          if (team.id === currentPlayer.teamId) {
            return {
              ...team,
              jugadores: [
                ...team.jugadores,
                {
                  id: playerToAdd.id,
                  nombres: playerToAdd.nombres,
                  apellidos: playerToAdd.apellidos,
                },
              ],
            }
          }
          return team
        }),
      )

      setIsPlayerDialogOpen(false)
      setCurrentPlayer({ id: null, teamId: null, nombres: '', apellidos: '' })
    } catch (err) {
      console.error('Error al asignar jugador:', err)
    }
  }

  const confirmDelete = async () => {
    if (!deleteTarget) return

    if (deleteTarget.type === 'team' && deleteTarget.id) {
      // Eliminar equipo en la base de datos
      await deleteTeam(eliminarEquipoService(deleteTarget.id))

      // Actualizar el estado local
      setTeams(teams.filter((team) => team.id !== deleteTarget.id))
    } else if (deleteTarget.type === 'player' && deleteTarget.teamId && deleteTarget.playerId) {
      // Eliminar jugador del equipo en la base de datos
      await deletePlayerFromTeam(eliminarJugadorDeEquipoService(deleteTarget.teamId, deleteTarget.playerId))

      // Actualizar el estado local
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
    availablePlayers,

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
    handleAssignExistingPlayer,

    // Delete handler
    confirmDelete,

    // Loading and error states
    loading: isInitialLoading || creatingTeam || loadingTeams || deletingTeam || creatingPlayer || deletingPlayer,
    error: createError || fetchError || deleteError || createPlayerError || deletePlayerError,
  }
}
