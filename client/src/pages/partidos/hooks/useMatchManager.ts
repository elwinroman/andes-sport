import { useEffect, useState } from 'react'

import useFetchAndLoad from '@/hooks/useFetchAndLoad'
import { type EquipoApiResponse } from '@/models'
import { getAllEquiposWithoutPlayersService } from '@/services/equipo.service'
import { useMatchStore } from '@/zustand/use-match.store'

import { getMatchConfiguration, hasConfigurationForTeams, type SportType } from '../constants/matchConfigHelper'

export interface Team {
  id: number
  nombre: string
  detalles: string
}

export interface Match {
  id: number
  team1: Team
  team2: Team
  time: string
}

export function useMatchManager() {
  const [allTeams, setAllTeams] = useState<Team[]>([])
  const [availableTeams, setAvailableTeams] = useState<Team[]>([])
  const [matches, setMatches] = useState<Match[]>([])
  const [isInitialLoading, setIsInitialLoading] = useState(true)
  const [selectedSport, setSelectedSport] = useState<SportType>('futbol')
  const [teamAssignments, setTeamAssignments] = useState<Map<number, Team> | null>(null)

  const { callEndpoint: fetchTeams, loading, error } = useFetchAndLoad<EquipoApiResponse[]>()

  // Store de Zustand para persistir matches
  const {
    futbolMatches,
    voleyMatches,
    setFutbolMatches,
    setVoleyMatches,
    removeFutbolMatch,
    removeVoleyMatch,
    clearFutbolMatches,
    clearVoleyMatches,
  } = useMatchStore()

  useEffect(() => {
    const loadTeams = async () => {
      try {
        const response = await fetchTeams(getAllEquiposWithoutPlayersService())
        const teamsData: Team[] = response.data.map((equipo) => ({
          id: equipo.idEquipo,
          nombre: equipo.cEquipo,
          detalles: equipo.cDetalle,
        }))
        setAllTeams(teamsData)
        setAvailableTeams(teamsData)
        setIsInitialLoading(false)
      } catch (err) {
        if (err instanceof Error && err.name !== 'CanceledError') {
          setIsInitialLoading(false)
        }
      }
    }
    loadTeams()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Cargar matches del store cuando cambia el deporte
  useEffect(() => {
    if (allTeams.length === 0) return // Esperar a que se carguen los equipos

    const storedMatches = selectedSport === 'futbol' ? futbolMatches : voleyMatches

    if (storedMatches.length > 0) {
      // Convertir matches del store al formato local (sin sport y createdAt)
      const localMatches: Match[] = storedMatches.map((m) => ({
        id: m.id,
        team1: m.team1,
        team2: m.team2,
        time: m.time,
      }))

      setMatches(localMatches)

      // Calcular equipos disponibles (todos los equipos menos los que están en matches)
      const teamsInMatches = new Set<number>()
      localMatches.forEach((match) => {
        teamsInMatches.add(match.team1.id)
        teamsInMatches.add(match.team2.id)
      })

      const available = allTeams.filter((team) => !teamsInMatches.has(team.id))
      setAvailableTeams(available)
    } else {
      // Si no hay matches guardados, resetear
      setMatches([])
      setAvailableTeams([...allTeams])
    }

    // Resetear asignaciones cuando cambia el deporte
    setTeamAssignments(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSport, allTeams.length])

  const getMatchTime = (matchIndex: number): string => {
    const startHour = 3
    const startMinute = 30
    const matchDuration = 20 // minutos
    const breakTime = 5 // minutos entre partidos

    const totalMinutesFromStart = matchIndex * (matchDuration + breakTime)
    const totalMinutes = startHour * 60 + startMinute + totalMinutesFromStart

    const hours = Math.floor(totalMinutes / 60) % 24
    const minutes = totalMinutes % 60

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
  }

  const deleteMatch = (matchId: number): void => {
    const match = matches.find((m) => m.id === matchId)
    if (match) {
      setAvailableTeams([...availableTeams, match.team1, match.team2].sort((a, b) => a.id - b.id))
      const updatedMatches = matches.filter((m) => m.id !== matchId)
      setMatches(updatedMatches)

      // Eliminar del store según el deporte
      if (selectedSport === 'futbol') {
        removeFutbolMatch(matchId)
      } else {
        removeVoleyMatch(matchId)
      }
    }
  }

  const resetAll = (): void => {
    setAvailableTeams([...allTeams])
    setMatches([])
    setTeamAssignments(null)

    // Limpiar AMBOS deportes del store
    clearFutbolMatches()
    clearVoleyMatches()
  }

  const assignNextTeam = (): void => {
    if (availableTeams.length === 0) return

    const config = getMatchConfiguration(availableTeams.length, selectedSport)
    if (!config) return

    // Obtener el máximo número de equipos en la configuración
    const maxTeamNumber = Math.max(...config.flat())

    // Crear o actualizar el mapa de asignaciones
    const currentAssignments = teamAssignments || new Map<number, Team>()

    // Encontrar el siguiente número disponible
    let nextNumber = 1
    while (currentAssignments.has(nextNumber) && nextNumber <= maxTeamNumber) {
      nextNumber++
    }

    // Si ya asignamos todos, no hacer nada
    if (nextNumber > maxTeamNumber) return

    // Obtener equipos aún no asignados
    const assignedTeams = Array.from(currentAssignments.values())
    const unassignedTeams = availableTeams.filter((team) => !assignedTeams.find((t) => t.id === team.id))

    if (unassignedTeams.length === 0) return

    // Seleccionar un equipo ALEATORIAMENTE de los no asignados
    const randomIndex = Math.floor(Math.random() * unassignedTeams.length)
    const selectedTeam = unassignedTeams[randomIndex]

    // Crear nuevo mapa con la asignación
    const newAssignments = new Map(currentAssignments)
    newAssignments.set(nextNumber, selectedTeam)

    setTeamAssignments(newAssignments)
  }

  const randomizeTeamAssignments = (): void => {
    if (availableTeams.length === 0) return

    const config = getMatchConfiguration(availableTeams.length, selectedSport)
    if (!config) {
      console.warn(`No hay configuración disponible para ${availableTeams.length} equipos`)
      return
    }

    try {
      // Aleatorizar equipos
      const shuffledTeams = [...availableTeams].sort(() => Math.random() - 0.5)

      // Crear un mapa de número -> equipo (los números en la config empiezan en 1)
      const newAssignments = new Map<number, Team>()
      shuffledTeams.forEach((team, index) => {
        newAssignments.set(index + 1, team)
      })

      setTeamAssignments(newAssignments)
    } catch (error) {
      console.error('Error al aleatorizar equipos:', error)
    }
  }

  const clearTeamAssignments = (): void => {
    setTeamAssignments(null)
  }

  const getAssignmentProgress = (): { assigned: number; total: number } => {
    const config = getMatchConfiguration(availableTeams.length, selectedSport)
    if (!config) return { assigned: 0, total: 0 }

    const maxTeamNumber = Math.max(...config.flat())
    const assigned = teamAssignments?.size || 0

    return { assigned, total: maxTeamNumber }
  }

  const generateMatchesFromConfig = (): void => {
    // Verificar que tengamos equipos disponibles
    if (availableTeams.length === 0) return

    // Obtener configuraciones para AMBOS deportes
    const futbolConfig = getMatchConfiguration(availableTeams.length, 'futbol')
    const voleyConfig = getMatchConfiguration(availableTeams.length, 'voley')

    if (!futbolConfig || !voleyConfig) {
      console.warn(`No hay configuración disponible para ${availableTeams.length} equipos`)
      return
    }

    // Verificar que todos los equipos estén asignados
    const maxTeamNumber = Math.max(...futbolConfig.flat())
    if (!teamAssignments || teamAssignments.size !== maxTeamNumber) {
      console.warn('Todos los equipos deben estar asignados antes de generar los partidos')
      return
    }

    try {
      const timestamp = new Date().toISOString()

      // Generar matches para FÚTBOL
      const futbolMatches: Match[] = futbolConfig.map(([localNum, visitanteNum], index) => {
        const team1 = teamAssignments.get(localNum)
        const team2 = teamAssignments.get(visitanteNum)

        if (!team1 || !team2) {
          throw new Error(`Error al obtener equipos para el partido de fútbol ${index + 1}`)
        }

        return {
          id: Date.now() + Math.random() * 1000 + index,
          team1,
          team2,
          time: getMatchTime(index),
        }
      })

      // Generar matches para VÓLEY
      const voleyMatches: Match[] = voleyConfig.map(([localNum, visitanteNum], index) => {
        const team1 = teamAssignments.get(localNum)
        const team2 = teamAssignments.get(visitanteNum)

        if (!team1 || !team2) {
          throw new Error(`Error al obtener equipos para el partido de vóley ${index + 1}`)
        }

        return {
          id: Date.now() + Math.random() * 2000 + index + 1000, // ID diferente para vóley
          team1,
          team2,
          time: getMatchTime(index),
        }
      })

      // Actualizar la UI con los matches del deporte seleccionado
      const currentMatches = selectedSport === 'futbol' ? futbolMatches : voleyMatches
      setMatches(currentMatches)
      setAvailableTeams([]) // Todos los equipos fueron usados
      setTeamAssignments(null) // Limpiar asignaciones después de generar

      // Guardar AMBOS deportes en el store
      const futbolMatchesWithMetadata = futbolMatches.map((match) => ({
        ...match,
        sport: 'futbol' as const,
        createdAt: timestamp,
      }))

      const voleyMatchesWithMetadata = voleyMatches.map((match) => ({
        ...match,
        sport: 'voley' as const,
        createdAt: timestamp,
      }))

      setFutbolMatches(futbolMatchesWithMetadata)
      setVoleyMatches(voleyMatchesWithMetadata)

      console.log(`✅ Generados ${futbolMatches.length} partidos de fútbol y ${voleyMatches.length} de vóley`)
    } catch (error) {
      console.error('Error al generar matches desde la configuración:', error)
    }
  }

  const canUseConfiguration = hasConfigurationForTeams(availableTeams.length)

  const currentConfiguration = availableTeams.length > 0 ? getMatchConfiguration(availableTeams.length, selectedSport) : null

  return {
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
    currentConfiguration,
    teamAssignments,
    selectedSport,
    setSelectedSport,
    loading: isInitialLoading || loading,
    error,
  }
}
