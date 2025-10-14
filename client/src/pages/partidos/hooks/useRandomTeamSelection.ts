import { useState } from 'react'

import type { Team } from './useMatchManager'

export function useRandomTeamSelection() {
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null)
  const [animatingTeam, setAnimatingTeam] = useState<Team | null>(null)
  const [animatingFirstTeam, setAnimatingFirstTeam] = useState<Team | null>(null)

  const startRandomMatch = (availableTeams: Team[], onMatchCreated: (team1: Team, team2: Team) => void) => {
    if (availableTeams.length < 2) return

    // Paso 1: Selección aleatoria del primer equipo
    let counter1 = 0
    const maxIterations1 = 12

    const interval1 = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * availableTeams.length)
      setAnimatingFirstTeam(availableTeams[randomIndex])
      counter1++

      if (counter1 >= maxIterations1) {
        clearInterval(interval1)
        const finalTeam1 = availableTeams[Math.floor(Math.random() * availableTeams.length)]
        setAnimatingFirstTeam(finalTeam1)
        setSelectedTeam(finalTeam1)

        // Paso 2: Después de seleccionar el primero, seleccionar el segundo
        setTimeout(() => {
          selectRandomOpponent(finalTeam1, availableTeams, onMatchCreated)
        }, 600)
      }
    }, 100)
  }

  const selectRandomOpponent = (team1: Team, availableTeams: Team[], onMatchCreated: (team1: Team, team2: Team) => void): void => {
    const possibleOpponents = availableTeams.filter((team) => team.id !== team1.id)

    if (possibleOpponents.length === 0) return

    // Animación de selección aleatoria del segundo equipo
    let counter = 0
    const maxIterations = 12

    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * possibleOpponents.length)
      setAnimatingTeam(possibleOpponents[randomIndex])
      counter++

      if (counter >= maxIterations) {
        clearInterval(interval)
        const finalOpponent = possibleOpponents[Math.floor(Math.random() * possibleOpponents.length)]
        setAnimatingTeam(finalOpponent)

        setTimeout(() => {
          onMatchCreated(team1, finalOpponent)
          resetSelection()
        }, 500)
      }
    }, 100)
  }

  const resetSelection = (): void => {
    setSelectedTeam(null)
    setAnimatingTeam(null)
    setAnimatingFirstTeam(null)
  }

  return {
    selectedTeam,
    animatingTeam,
    animatingFirstTeam,
    startRandomMatch,
    resetSelection,
  }
}
