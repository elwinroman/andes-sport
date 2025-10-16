import { useEffect, useState } from 'react'

import useFetchAndLoad from '@/hooks/useFetchAndLoad'
import { type EquipoApiResponse } from '@/models'
import { createDetallesFutbolService, type DetallesFutbolApiResponse } from '@/services/detalles-futbol.service'
import { type BulkDetallesVoleyResponse, createBulkDetallesVoleyService } from '@/services/detalles-voley.service'
import { getAllEquiposWithoutPlayersService } from '@/services/equipo.service'
import {
  type BulkPartidosResponse,
  createBulkPartidosService,
  deletePartidoService,
  getAllPartidosService,
  type PartidoApiResponse,
  updatePartidoService,
} from '@/services/partido.service'

import { getMatchConfiguration, hasConfigurationForTeams, type SportType } from '../constants/matchConfigHelper'
import { MATCH_STATUS } from '../constants/matchStatus'
import { EVENT_DATE, MATCH_INTERVAL, SPORT_IDS } from '../constants/sportIds'

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
  sport: 'futbol' | 'voley'
  status: number
  eventDate: string
}

export function useMatchManager() {
  const [allTeams, setAllTeams] = useState<Team[]>([])
  const [availableTeams, setAvailableTeams] = useState<Team[]>([])
  const [matches, setMatches] = useState<Match[]>([])
  const [allMatches, setAllMatches] = useState<Match[]>([]) // Todos los partidos de ambos deportes
  const [isInitialLoading, setIsInitialLoading] = useState(true)
  const [selectedSport, setSelectedSport] = useState<SportType>('futbol')
  const [teamAssignments, setTeamAssignments] = useState<Map<number, Team> | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)

  const { callEndpoint: fetchTeams, loading, error } = useFetchAndLoad<EquipoApiResponse[]>()
  const { callEndpoint: saveBulkPartidos } = useFetchAndLoad<BulkPartidosResponse>()
  const { callEndpoint: fetchPartidos } = useFetchAndLoad<PartidoApiResponse[]>()
  const { callEndpoint: createDetallesFutbol } = useFetchAndLoad<DetallesFutbolApiResponse>()
  const { callEndpoint: createBulkDetallesVoley } = useFetchAndLoad<BulkDetallesVoleyResponse>()

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        // Cargar equipos
        const teamsResponse = await fetchTeams(getAllEquiposWithoutPlayersService())
        const teamsData: Team[] = teamsResponse.data.map((equipo) => ({
          id: equipo.idEquipo,
          nombre: equipo.cEquipo,
          detalles: equipo.cDetalle,
        }))
        setAllTeams(teamsData)

        // Cargar partidos existentes desde la BD
        const partidosResponse = await fetchPartidos(getAllPartidosService())
        const partidosData = partidosResponse.data

        if (partidosData.length > 0) {
          // Convertir partidos de la API al formato local
          const convertedMatches: Match[] = partidosData.map((partido) => {
            const eventDate = new Date(partido.dFechaEvento)
            // Usar UTC para mostrar la hora correcta
            const hours = eventDate.getUTCHours().toString().padStart(2, '0')
            const minutes = eventDate.getUTCMinutes().toString().padStart(2, '0')

            return {
              id: partido.idPartido,
              team1: {
                id: partido.equipoLocal.idEquipo,
                nombre: partido.equipoLocal.cEquipo,
                detalles: partido.equipoLocal.cDetalle,
              },
              team2: {
                id: partido.equipoVisitante.idEquipo,
                nombre: partido.equipoVisitante.cEquipo,
                detalles: partido.equipoVisitante.cDetalle,
              },
              time: `${hours}:${minutes}`,
              sport: partido.idDeporte === SPORT_IDS.FUTBOL ? 'futbol' : 'voley',
              status: partido.idEstado,
              eventDate: partido.dFechaEvento,
            }
          })

          // Guardar todos los partidos
          setAllMatches(convertedMatches)

          // Filtrar por deporte seleccionado
          const matchesBySport = convertedMatches.filter((m) => m.sport === selectedSport)
          setMatches(matchesBySport)

          // Calcular equipos disponibles (equipos que no están en ningún partido)
          const teamsInMatches = new Set<number>()
          partidosData.forEach((partido) => {
            teamsInMatches.add(partido.equipoLocal.idEquipo)
            teamsInMatches.add(partido.equipoVisitante.idEquipo)
          })

          const available = teamsData.filter((team) => !teamsInMatches.has(team.id))
          setAvailableTeams(available)
        } else {
          // No hay partidos, todos los equipos están disponibles
          setAvailableTeams(teamsData)
        }

        setIsInitialLoading(false)
      } catch (err) {
        if (err instanceof Error && err.name !== 'CanceledError') {
          setIsInitialLoading(false)
        }
      }
    }
    loadInitialData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Actualizar matches cuando cambia el deporte
  useEffect(() => {
    setTeamAssignments(null)

    // Si hay partidos cargados, filtrar por deporte
    if (allMatches.length > 0) {
      const matchesBySport = allMatches.filter((m) => m.sport === selectedSport)
      setMatches(matchesBySport)
    }
  }, [selectedSport, allMatches])

  const getMatchTime = (matchIndex: number): string => {
    // Calcular el tiempo total desde el inicio (cada partido es index * intervalo)
    const totalMinutesFromStart = matchIndex * MATCH_INTERVAL
    const totalMinutes = EVENT_DATE.HOUR * 60 + EVENT_DATE.MINUTE + totalMinutesFromStart

    const hours = Math.floor(totalMinutes / 60) % 24
    const minutes = totalMinutes % 60

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
  }

  const deleteMatch = async (matchId: number): Promise<void> => {
    const match = matches.find((m) => m.id === matchId)
    if (match) {
      setAvailableTeams([...availableTeams, match.team1, match.team2].sort((a, b) => a.id - b.id))
      const updatedMatches = matches.filter((m) => m.id !== matchId)
      setMatches(updatedMatches)

      deletePartidoService(match.id)
    }
  }

  const updateMatch = async (matchId: number, newEventDate: string): Promise<void> => {
    try {
      // Actualizar en el backend
      await saveBulkPartidos(updatePartidoService(matchId, { dFechaEvento: newEventDate }))

      // Actualizar el estado local
      const updateMatchInArray = (matchesArray: Match[]) =>
        matchesArray.map((m) => {
          if (m.id === matchId) {
            const eventDate = new Date(newEventDate)
            const hours = eventDate.getUTCHours().toString().padStart(2, '0')
            const minutes = eventDate.getUTCMinutes().toString().padStart(2, '0')

            return {
              ...m,
              eventDate: newEventDate,
              time: `${hours}:${minutes}`,
            }
          }
          return m
        })

      // Actualizar en allMatches
      setAllMatches((prev) => updateMatchInArray(prev))

      // Actualizar en matches (vista actual)
      setMatches((prev) => updateMatchInArray(prev))

      console.log(`✅ Partido ${matchId} actualizado correctamente`)
    } catch (error) {
      console.error('Error al actualizar el partido:', error)
      throw error
    }
  }

  const startMatch = async (matchId: number): Promise<void> => {
    try {
      // Encontrar el partido para saber qué deporte es
      const match = matches.find((m) => m.id === matchId) || allMatches.find((m) => m.id === matchId)

      if (!match) {
        throw new Error(`No se encontró el partido con ID ${matchId}`)
      }

      // Obtener la fecha/hora actual en UTC
      const now = new Date().toISOString()

      // Actualizar estado del partido en el backend
      await saveBulkPartidos(
        updatePartidoService(matchId, {
          idEstado: MATCH_STATUS.EN_CURSO,
          dFechaInicio: now,
        }),
      )

      // Crear detalles según el deporte
      if (match.sport === 'futbol') {
        // Crear detalle de fútbol con goles en 0
        await createDetallesFutbol(
          createDetallesFutbolService({
            idPartido: matchId,
            golesEquipoLocal: 0,
            golesEquipoVisitante: 0,
          }),
        )
        console.log(`✅ Detalle de fútbol creado para partido ${matchId}`)
      } else if (match.sport === 'voley') {
        // Crear 2 sets de vóley con puntajes en 0
        await createBulkDetallesVoley(
          createBulkDetallesVoleyService({
            sets: [
              {
                idPartido: matchId,
                numeroSet: 1,
                puntosEquipoLocal: 0,
                puntosEquipoVisitante: 0,
              },
              {
                idPartido: matchId,
                numeroSet: 2,
                puntosEquipoLocal: 0,
                puntosEquipoVisitante: 0,
              },
            ],
          }),
        )
        console.log(`✅ Detalles de vóley (2 sets) creados para partido ${matchId}`)
      }

      // Actualizar el estado local
      const updateMatchInArray = (matchesArray: Match[]) =>
        matchesArray.map((m) => {
          if (m.id === matchId) {
            return {
              ...m,
              status: MATCH_STATUS.EN_CURSO,
            }
          }
          return m
        })

      // Actualizar en allMatches
      setAllMatches((prev) => updateMatchInArray(prev))

      // Actualizar en matches (vista actual)
      setMatches((prev) => updateMatchInArray(prev))

      console.log(`✅ Partido ${matchId} iniciado correctamente`)
    } catch (error) {
      console.error('Error al iniciar el partido:', error)
      throw error
    }
  }

  const finishMatch = async (matchId: number): Promise<void> => {
    try {
      // Obtener la fecha/hora actual en UTC
      const now = new Date().toISOString()

      // Actualizar en el backend
      await saveBulkPartidos(
        updatePartidoService(matchId, {
          idEstado: MATCH_STATUS.FINALIZADO,
          dFechaFin: now,
        }),
      )

      // Actualizar el estado local
      const updateMatchInArray = (matchesArray: Match[]) =>
        matchesArray.map((m) => {
          if (m.id === matchId) {
            return {
              ...m,
              status: MATCH_STATUS.FINALIZADO,
            }
          }
          return m
        })

      // Actualizar en allMatches
      setAllMatches((prev) => updateMatchInArray(prev))

      // Actualizar en matches (vista actual)
      setMatches((prev) => updateMatchInArray(prev))

      console.log(`✅ Partido ${matchId} finalizado correctamente`)
    } catch (error) {
      console.error('Error al finalizar el partido:', error)
      throw error
    }
  }

  const resetAll = (): void => {
    setAvailableTeams([...allTeams])
    setMatches([])
    setTeamAssignments(null)
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

  const generateMatchesFromConfig = async (): Promise<void> => {
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
      setIsSaving(true)
      setSaveError(null)

      // Preparar partidos de FÚTBOL para la API
      const futbolPartidos = futbolConfig.map(([localNum, visitanteNum], index) => {
        const team1 = teamAssignments.get(localNum)
        const team2 = teamAssignments.get(visitanteNum)

        if (!team1 || !team2) {
          throw new Error(`Error al obtener equipos para el partido de fútbol ${index + 1}`)
        }

        // Crear fecha en UTC directamente sin usar objeto Date
        const minutesFromStart = index * MATCH_INTERVAL
        const totalMinutes = EVENT_DATE.HOUR * 60 + EVENT_DATE.MINUTE + minutesFromStart
        const finalHour = Math.floor(totalMinutes / 60)
        const finalMinute = totalMinutes % 60

        // Usar Date.UTC para crear timestamp en UTC puro
        const eventDate = new Date(Date.UTC(EVENT_DATE.YEAR, EVENT_DATE.MONTH, EVENT_DATE.DAY, finalHour, finalMinute, 0, 0))

        return {
          idDeporte: SPORT_IDS.FUTBOL,
          idEquipoLocal: team1.id,
          idEquipoVisitante: team2.id,
          dFechaEvento: eventDate.toISOString(),
          idEstado: MATCH_STATUS.PROGRAMADO,
        }
      })

      // Preparar partidos de VÓLEY para la API
      const voleyPartidos = voleyConfig.map(([localNum, visitanteNum], index) => {
        const team1 = teamAssignments.get(localNum)
        const team2 = teamAssignments.get(visitanteNum)

        if (!team1 || !team2) {
          throw new Error(`Error al obtener equipos para el partido de vóley ${index + 1}`)
        }

        // Crear fecha en UTC directamente sin usar objeto Date
        const minutesFromStart = index * MATCH_INTERVAL
        const totalMinutes = EVENT_DATE.HOUR * 60 + EVENT_DATE.MINUTE + minutesFromStart
        const finalHour = Math.floor(totalMinutes / 60)
        const finalMinute = totalMinutes % 60

        // Usar Date.UTC para crear timestamp en UTC puro
        const eventDate = new Date(Date.UTC(EVENT_DATE.YEAR, EVENT_DATE.MONTH, EVENT_DATE.DAY, finalHour, finalMinute, 0, 0))

        return {
          idDeporte: SPORT_IDS.VOLEY,
          idEquipoLocal: team1.id,
          idEquipoVisitante: team2.id,
          dFechaEvento: eventDate.toISOString(),
          idEstado: MATCH_STATUS.PROGRAMADO,
        }
      })

      // Combinar todos los partidos para enviarlos en un solo request
      const allPartidos = [...futbolPartidos, ...voleyPartidos]

      // Guardar en BD usando el hook useFetchAndLoad
      const response = await saveBulkPartidos(
        createBulkPartidosService({
          partidos: allPartidos,
        }),
      )

      console.log(`✅ Guardados ${response.data.count} partidos en la base de datos`)

      // Generar matches locales para mostrar en la UI
      const futbolMatches: Match[] = futbolConfig.map(([localNum, visitanteNum], index) => {
        const team1 = teamAssignments.get(localNum)
        const team2 = teamAssignments.get(visitanteNum)

        if (!team1 || !team2) {
          throw new Error(`Error al obtener equipos para el partido de fútbol ${index + 1}`)
        }

        const matchTime = getMatchTime(index)

        // Crear fecha en UTC directamente
        const minutesFromStart = index * MATCH_INTERVAL
        const totalMinutes = EVENT_DATE.HOUR * 60 + EVENT_DATE.MINUTE + minutesFromStart
        const finalHour = Math.floor(totalMinutes / 60)
        const finalMinute = totalMinutes % 60
        const eventDate = new Date(Date.UTC(EVENT_DATE.YEAR, EVENT_DATE.MONTH, EVENT_DATE.DAY, finalHour, finalMinute, 0, 0))

        return {
          id: Date.now() + Math.random() * 1000 + index,
          team1,
          team2,
          time: matchTime,
          sport: 'futbol' as const,
          status: MATCH_STATUS.PROGRAMADO,
          eventDate: eventDate.toISOString(),
        }
      })

      const voleyMatches: Match[] = voleyConfig.map(([localNum, visitanteNum], index) => {
        const team1 = teamAssignments.get(localNum)
        const team2 = teamAssignments.get(visitanteNum)

        if (!team1 || !team2) {
          throw new Error(`Error al obtener equipos para el partido de vóley ${index + 1}`)
        }

        const matchTime = getMatchTime(index)

        // Crear fecha en UTC directamente
        const minutesFromStart = index * MATCH_INTERVAL
        const totalMinutes = EVENT_DATE.HOUR * 60 + EVENT_DATE.MINUTE + minutesFromStart
        const finalHour = Math.floor(totalMinutes / 60)
        const finalMinute = totalMinutes % 60
        const eventDate = new Date(Date.UTC(EVENT_DATE.YEAR, EVENT_DATE.MONTH, EVENT_DATE.DAY, finalHour, finalMinute, 0, 0))

        return {
          id: Date.now() + Math.random() * 2000 + index + 1000,
          team1,
          team2,
          time: matchTime,
          sport: 'voley' as const,
          status: MATCH_STATUS.PROGRAMADO,
          eventDate: eventDate.toISOString(),
        }
      })

      // Guardar todos los matches generados
      const allGeneratedMatches = [...futbolMatches, ...voleyMatches]
      setAllMatches(allGeneratedMatches)

      // Actualizar la UI con los matches del deporte seleccionado
      const currentMatches = selectedSport === 'futbol' ? futbolMatches : voleyMatches
      setMatches(currentMatches)
      setAvailableTeams([]) // Todos los equipos fueron usados
      setTeamAssignments(null) // Limpiar asignaciones después de generar

      setIsSaving(false)
    } catch (error) {
      setIsSaving(false)
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido al guardar los partidos'
      setSaveError(errorMessage)
      console.error('Error al guardar partidos en la base de datos:', error)
    }
  }

  const canUseConfiguration = hasConfigurationForTeams(availableTeams.length)

  const currentConfiguration = availableTeams.length > 0 ? getMatchConfiguration(availableTeams.length, selectedSport) : null

  return {
    availableTeams,
    matches,
    deleteMatch,
    updateMatch,
    startMatch,
    finishMatch,
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
    isSaving,
    saveError,
  }
}
