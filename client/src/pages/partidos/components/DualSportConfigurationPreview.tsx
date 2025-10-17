import { useEffect, useRef, useState } from 'react'

import { getMatchConfiguration, getTeamsForSport } from '../constants/matchConfigHelper'
import { type Team } from '../hooks/useMatchManager'

interface DualSportConfigurationPreviewProps {
  availableTeams: Team[]
  teamAssignments: Map<number, Team> | null
  assignmentProgress: { assigned: number; total: number }
}

interface SlotMachineTeamProps {
  teamNumber: number
  assignedTeam: Team | undefined
  availableTeams: Team[]
  isAssigning: boolean
}

function SlotMachineTeam({ teamNumber, assignedTeam, availableTeams, isAssigning }: SlotMachineTeamProps) {
  const [displayText, setDisplayText] = useState<string>(`#${teamNumber}`)
  const [isAnimating, setIsAnimating] = useState(false)
  const intervalRef = useRef<number | null>(null)
  const hasAnimatedRef = useRef(false)

  useEffect(() => {
    // Si ya se asignó un equipo y estamos en proceso de asignación y no hemos animado antes
    if (assignedTeam && isAssigning && !hasAnimatedRef.current) {
      hasAnimatedRef.current = true
      setIsAnimating(true)

      let counter = 0
      const maxSpins = 15 // Número de cambios antes de mostrar el resultado final

      intervalRef.current = setInterval(() => {
        // Seleccionar un equipo aleatorio para mostrar
        const randomTeam = availableTeams[Math.floor(Math.random() * availableTeams.length)]
        setDisplayText(randomTeam.nombre)

        counter++
        if (counter >= maxSpins) {
          // Terminar la animación y mostrar el equipo asignado
          if (intervalRef.current) {
            clearInterval(intervalRef.current)
          }
          setTimeout(() => {
            setDisplayText(assignedTeam.nombre)
            setIsAnimating(false)
          }, 100)
        }
      }, 80) // Cambiar cada 80ms para efecto de slot machine

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current)
        }
      }
    } else if (assignedTeam && !isAssigning) {
      // Si ya terminó la asignación, mostrar directamente el equipo
      setDisplayText(assignedTeam.nombre)
      hasAnimatedRef.current = false
    } else if (!assignedTeam) {
      // Reset si no hay equipo asignado
      setDisplayText(`#${teamNumber}`)
      hasAnimatedRef.current = false
    }
  }, [assignedTeam, availableTeams, isAssigning, teamNumber])

  const getTeamClass = () => {
    if (isAnimating) {
      return 'bg-yellow-400 text-slate-900 font-bold animate-pulse'
    }
    return assignedTeam ? 'bg-blue-500 text-white font-semibold' : 'bg-slate-200 text-slate-600'
  }

  return <span className={`px-2 py-0.5 rounded transition-all duration-200 ${getTeamClass()}`}>{displayText}</span>
}

export function DualSportConfigurationPreview({ availableTeams, teamAssignments, assignmentProgress }: DualSportConfigurationPreviewProps) {
  const futbolConfig = getMatchConfiguration(availableTeams.length, 'futbol')
  const voleyConfig = getMatchConfiguration(availableTeams.length, 'voley')

  // Calcular cuántos equipos participan en cada deporte
  const futbolTeamsCount = getTeamsForSport(availableTeams.length, 'futbol')
  const voleyTeamsCount = getTeamsForSport(availableTeams.length, 'voley')

  if (!futbolConfig || !voleyConfig || availableTeams.length === 0) {
    return (
      <div className="p-6 border rounded-lg border-border bg-background">
        <p className="text-sm font-semibold text-center text-secondary">
          {availableTeams.length === 0 ? 'No hay equipos disponibles' : `No hay configuración para ${availableTeams.length} equipos`}
        </p>
        <p className="mt-2 text-xs text-center text-muted-foreground">Configuraciones disponibles: 6, 7, 8 o 9 equipos</p>
      </div>
    )
  }

  const progressPercentage = assignmentProgress.total > 0 ? (assignmentProgress.assigned / assignmentProgress.total) * 100 : 0
  const allTeamsAssigned = assignmentProgress.assigned === assignmentProgress.total && assignmentProgress.total > 0
  const isAssigning = assignmentProgress.assigned > 0 && !allTeamsAssigned

  const renderSportConfig = (config: number[][], sportName: string, bgColor: string, teamsCount: number) => (
    <div className="flex-1">
      <div className={`p-2 text-center ${bgColor} rounded-t-md`}>
        <h3 className="text-sm font-bold text-white">{sportName}</h3>
        <p className="text-xs text-white opacity-90">
          {teamsCount} equipos • {config.length} partidos
        </p>
      </div>
      <div className="p-3 space-y-1.5 bg-white border-x border-b rounded-b-lg border-slate-200">
        {config.map(([local, visitante], index) => {
          const bothAssigned = teamAssignments?.has(local) && teamAssignments?.has(visitante)
          return (
            <div
              key={index}
              className={`flex items-center gap-2 p-2 rounded transition-all ${
                bothAssigned ? 'bg-green-50 border border-green-200' : 'bg-slate-50'
              }`}
            >
              <span className="text-[10px] font-bold text-slate-400 w-4">{index + 1}</span>
              <div className="flex items-center flex-1 gap-1.5 text-xs">
                <SlotMachineTeam
                  teamNumber={local}
                  assignedTeam={teamAssignments?.get(local)}
                  availableTeams={availableTeams}
                  isAssigning={isAssigning}
                />
                <span className="text-slate-400">vs</span>
                <SlotMachineTeam
                  teamNumber={visitante}
                  assignedTeam={teamAssignments?.get(visitante)}
                  availableTeams={availableTeams}
                  isAssigning={isAssigning}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )

  return (
    <div className="rounded-lg bg-card shadow-widget">
      {/* Header con progreso */}
      <div className="p-3 border-b bg-slate-50 border-border">
        <div className="flex items-center justify-between mb-2">
          <div>
            <p className="text-sm font-semibold text-secondary">Vista de Configuraciones</p>
            <p className="text-xs text-slate-600 text-left">{availableTeams.length} equipos</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-primary">
              {assignmentProgress.assigned} / {assignmentProgress.total}
            </p>
            <p className="text-xs text-slate-600">asignados</p>
          </div>
        </div>

        {/* Barra de progreso */}
        <div className="relative w-full h-2 overflow-hidden rounded-full bg-slate-200">
          <div
            className={`h-full transition-all duration-300 ${allTeamsAssigned ? 'bg-green-500' : 'bg-blue-500'}`}
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        {allTeamsAssigned && <p className="mt-1.5 text-xs font-medium text-center text-green-600">✓ Listos para generar</p>}
      </div>

      {/* Configuraciones lado a lado */}
      <div className="grid grid-cols-2 gap-4 p-4">
        {renderSportConfig(futbolConfig, 'Fútbol', 'bg-brand-blue', futbolTeamsCount)}
        {renderSportConfig(voleyConfig, 'Vóley', 'bg-brand-magenta', voleyTeamsCount)}
      </div>
    </div>
  )
}
