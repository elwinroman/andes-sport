import { useState } from 'react'

import { DeleteMatchDialog } from './components/DeleteMatchDialog'
import { MatchHeader } from './components/MatchHeader'
import { MatchList } from './components/MatchList'
import { TeamSelection } from './components/TeamSelection'
import { useMatchManager } from './hooks/useMatchManager'
import { useRandomTeamSelection } from './hooks/useRandomTeamSelection'

export function MatchManager() {
  const { availableTeams, matches, createMatch, deleteMatch, resetAll, autoCompleteMatches } = useMatchManager()

  const { selectedTeam, animatingTeam, animatingFirstTeam, startRandomMatch, resetSelection } = useRandomTeamSelection()

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [matchToDelete, setMatchToDelete] = useState<number | null>(null)

  const handleStartRandomMatch = () => {
    startRandomMatch(availableTeams, (team1, team2) => {
      createMatch(team1, team2)
    })
  }

  const handleDeleteMatch = (matchId: number) => {
    setMatchToDelete(matchId)
    setIsDeleteDialogOpen(true)
  }

  const confirmDeleteMatch = () => {
    if (matchToDelete) {
      deleteMatch(matchToDelete)
    }
    setIsDeleteDialogOpen(false)
    setMatchToDelete(null)
  }

  const handleReset = () => {
    resetAll()
    resetSelection()
  }

  const handleAutoComplete = () => {
    autoCompleteMatches()
    resetSelection()
  }

  return (
    <div className="py-4">
      <div className="mx-auto max-w-7xl">
        <MatchHeader
          canAutoComplete={availableTeams.length >= 2}
          canReset={matches.length > 0 || !!selectedTeam}
          onAutoComplete={handleAutoComplete}
          onReset={handleReset}
        />

        <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
          <TeamSelection
            availableTeams={availableTeams}
            selectedTeam={selectedTeam}
            animatingFirstTeam={animatingFirstTeam}
            animatingTeam={animatingTeam}
            onStartRandomMatch={handleStartRandomMatch}
          />

          <MatchList matches={matches} onDeleteMatch={handleDeleteMatch} />
        </div>

        <DeleteMatchDialog isOpen={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen} onConfirm={confirmDeleteMatch} />
      </div>
    </div>
  )
}
