import { useState } from 'react'

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

const INITIAL_TEAMS: Team[] = [
  { id: 1, nombre: 'Los Invencibles', detalles: 'Equipo campeón' },
  { id: 2, nombre: 'Águilas Rojas', detalles: 'Equipo agresivo' },
  { id: 3, nombre: 'Titanes', detalles: 'Equipo defensivo' },
  { id: 4, nombre: 'Dragones', detalles: 'Equipo veloz' },
  { id: 5, nombre: 'Leones', detalles: 'Equipo fuerte' },
  { id: 6, nombre: 'Halcones', detalles: 'Equipo táctico' },
]

export function useMatchManager() {
  const [allTeams] = useState<Team[]>(INITIAL_TEAMS)
  const [availableTeams, setAvailableTeams] = useState<Team[]>([...INITIAL_TEAMS])
  const [matches, setMatches] = useState<Match[]>([])

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

  const createMatch = (team1: Team, team2: Team): void => {
    const matchTime = getMatchTime(matches.length)

    const newMatch: Match = {
      id: Date.now(),
      team1,
      team2,
      time: matchTime,
    }

    setMatches([...matches, newMatch])
    setAvailableTeams(availableTeams.filter((team) => team.id !== team1.id && team.id !== team2.id))
  }

  const deleteMatch = (matchId: number): void => {
    const match = matches.find((m) => m.id === matchId)
    if (match) {
      setAvailableTeams([...availableTeams, match.team1, match.team2].sort((a, b) => a.id - b.id))
      setMatches(matches.filter((m) => m.id !== matchId))
    }
  }

  const resetAll = (): void => {
    setAvailableTeams([...allTeams])
    setMatches([])
  }

  const autoCompleteMatches = (): void => {
    if (availableTeams.length < 2) return

    const remaining = [...availableTeams]
    const newMatches = [...matches]
    let matchIndex = matches.length

    while (remaining.length >= 2) {
      const team1 = remaining.shift()
      const team2 = remaining.shift()

      if (!team1 || !team2) break

      newMatches.push({
        id: Date.now() + Math.random(),
        team1,
        team2,
        time: getMatchTime(matchIndex),
      })
      matchIndex++
    }

    setMatches(newMatches)
    setAvailableTeams(remaining)
  }

  return {
    availableTeams,
    matches,
    createMatch,
    deleteMatch,
    resetAll,
    autoCompleteMatches,
  }
}
