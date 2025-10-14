import { Card } from '@components/Card'

interface Props {
  className?: string
}

type MatchStatus = 'scheduled' | 'live' | 'finished'

interface Match {
  id: number
  date: string
  time: string
  status: MatchStatus
  homeTeam: string
  awayTeam: string
  homeScore?: number
  awayScore?: number
  liveMinute?: string
}

interface MatchItemProps {
  match: Match
}

function MatchItem({ match }: MatchItemProps) {
  const isLive = match.status === 'live'
  const isFinished = match.status === 'finished'
  const hasScore = match.homeScore !== undefined && match.awayScore !== undefined

  const getStatusDisplay = () => {
    if (isLive && match.liveMinute) {
      return <span className="text-red-500">{match.liveMinute}</span>
    }
    if (isFinished) {
      return <span>Fin</span>
    }
    return <span>{match.time}</span>
  }

  console.log(`match.id: ${match.id}`)
  console.log(`match.status: ${match.status}`)
  console.log(`match.homeTeam: ${match.homeTeam}`)
  console.log(`match.awayTeam: ${match.awayTeam}`)
  console.log(`match.homeScore: ${match.homeScore}`)
  console.log(`match.awayScore: ${match.awayScore}`)

  return (
    <div className="flex items-center">
      <div className="flex flex-col px-2 text-xs font-medium text-center text-secondary">
        <span>{match.date}</span>
        {getStatusDisplay()}
      </div>

      <div className="flex flex-col items-start px-2 text-sm font-medium border-l-2 border-border grow text-primary">
        <span className={isFinished && match.homeScore && match.awayScore && match.homeScore < match.awayScore ? ' text-secondary' : ''}>
          {match.homeTeam}
        </span>
        <span className={isFinished && match.homeScore && match.awayScore && match.awayScore < match.homeScore ? ' text-secondary' : ''}>
          {match.awayTeam}
        </span>
      </div>

      <div className="flex flex-col items-start px-2 text-sm border-l-2 text-primary border-border">
        <span className={isLive ? 'text-red-500' : ''}>{hasScore ? match.homeScore : ''}</span>
        <span className={isLive ? 'text-red-500' : ''}>{hasScore ? match.awayScore : ''}</span>
      </div>
    </div>
  )
}

// Datos de ejemplo
const matchesData: Match[] = [
  {
    id: 1,
    date: '21/10/2025',
    time: '15:00',
    status: 'scheduled',
    homeTeam: 'Proyectos TI (Harold)',
    awayTeam: 'Visitante',
  },
  {
    id: 2,
    date: '21/10/2025',
    time: '10:00',
    status: 'live',
    homeTeam: 'Local',
    awayTeam: 'Visitante',
    homeScore: 2,
    awayScore: 1,
    liveMinute: "10'",
  },
  {
    id: 3,
    date: '21/10/2025',
    time: '14:00',
    status: 'finished',
    homeTeam: 'Ganador',
    awayTeam: 'Perdedor',
    homeScore: 2,
    awayScore: 1,
  },
  {
    id: 4,
    date: '21/10/2025',
    time: '16:00',
    status: 'finished',
    homeTeam: 'Local',
    awayTeam: 'Visitante',
    homeScore: 2,
    awayScore: 3,
  },
  {
    id: 5,
    date: '21/10/2025',
    time: '15:00',
    status: 'scheduled',
    homeTeam: 'Local',
    awayTeam: 'Visitante',
  },
  {
    id: 6,
    date: '21/10/2025',
    time: '10:00',
    status: 'live',
    homeTeam: 'Local',
    awayTeam: 'Visitante',
    homeScore: 2,
    awayScore: 1,
    liveMinute: "10'",
  },
  {
    id: 7,
    date: '21/10/2025',
    time: '14:00',
    status: 'finished',
    homeTeam: 'Local',
    awayTeam: 'Visitante',
    homeScore: 2,
    awayScore: 1,
  },
  {
    id: 8,
    date: '21/10/2025',
    time: '16:00',
    status: 'finished',
    homeTeam: 'Local',
    awayTeam: 'Visitante',
    homeScore: 2,
    awayScore: 2,
  },
  {
    id: 9,
    date: '21/10/2025',
    time: '15:00',
    status: 'scheduled',
    homeTeam: 'Local',
    awayTeam: 'Visitante',
  },
  {
    id: 10,
    date: '21/10/2025',
    time: '10:00',
    status: 'live',
    homeTeam: 'Local',
    awayTeam: 'Visitante',
    homeScore: 2,
    awayScore: 1,
    liveMinute: "10'",
  },
  {
    id: 11,
    date: '21/10/2025',
    time: '14:00',
    status: 'finished',
    homeTeam: 'Local',
    awayTeam: 'Visitante',
    homeScore: 2,
    awayScore: 1,
  },
  {
    id: 12,
    date: '21/10/2025',
    time: '16:00',
    status: 'finished',
    homeTeam: 'Local',
    awayTeam: 'Visitante',
    homeScore: 2,
    awayScore: 2,
  },
]

export function Partidos({ className }: Props) {
  return (
    <Card className={`mb-4 ${className}`}>
      <div className="w-full px-2 py-3">
        <h5 className="mb-2 font-bold text-primary font-montserrat">Partidos</h5>

        <div className="flex flex-col gap-2 overflow-x-auto">
          {matchesData.map((match) => (
            <MatchItem key={match.id} match={match} />
          ))}
        </div>
      </div>
    </Card>
  )
}
