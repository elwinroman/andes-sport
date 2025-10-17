import { type SportType } from '../constants/matchConfigHelper'
import { SPORT_TEAM_CONFIG } from '../constants/sportIds'
import { type Team } from '../hooks/useMatchManager'

interface AvailableTeamsListProps {
  availableTeams: Team[]
  teamAssignments: Map<number, Team> | null
  selectedSport: SportType
}

export function AvailableTeamsList({ availableTeams, teamAssignments, selectedSport }: AvailableTeamsListProps) {
  // Filtrar equipos según el deporte seleccionado
  let teamsForSport = availableTeams

  if (selectedSport === 'futbol') {
    // Para fútbol: excluir el equipo con ID fijo
    teamsForSport = availableTeams.filter((team) => team.id !== SPORT_TEAM_CONFIG.FUTBOL.FIXED_TEAM_ID)
  }
  // Para vóley: mostrar todos los equipos disponibles (incluido el equipo con ID 1)

  // Filtrar equipos aún no asignados
  const assignedTeams = Array.from(teamAssignments?.values() || [])
  const unassignedTeams = teamsForSport.filter((team) => !assignedTeams.find((t) => t.id === team.id))

  if (unassignedTeams.length === 0) {
    return null
  }

  return (
    <details className="mb-4 group">
      <summary className="flex items-center justify-between p-3 transition-colors border rounded-md cursor-pointer border-slate-200 bg-slate-50 hover:bg-slate-100">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-700">Equipos disponibles ({unassignedTeams.length})</span>
          <span className="text-xs text-slate-500">• Selección aleatoria</span>
        </div>
        <svg
          className="w-4 h-4 transition-transform text-slate-600 group-open:rotate-180"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </summary>

      <div className="mt-2 border-2 rounded-lg border-slate-200 bg-white max-h-[200px] overflow-y-auto">
        {unassignedTeams.map((team, index) => (
          <div
            key={team.id}
            className={`flex items-center gap-2 px-3 py-2 transition-all bg-white hover:bg-slate-50 ${
              index !== unassignedTeams.length - 1 ? 'border-b border-slate-100' : ''
            }`}
          >
            <span className="w-6 font-mono text-xs text-slate-400">{index + 1}.</span>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium truncate text-slate-900">{team.nombre}</p>
            </div>
          </div>
        ))}
      </div>
    </details>
  )
}
