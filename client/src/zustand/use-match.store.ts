import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

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
  createdAt: string
}

interface MatchState {
  // Matches separados por deporte
  futbolMatches: Match[]
  voleyMatches: Match[]

  // Métodos para fútbol
  setFutbolMatches: (matches: Match[]) => void
  addFutbolMatch: (match: Match) => void
  removeFutbolMatch: (matchId: number) => void
  clearFutbolMatches: () => void

  // Métodos para vóley
  setVoleyMatches: (matches: Match[]) => void
  addVoleyMatch: (match: Match) => void
  removeVoleyMatch: (matchId: number) => void
  clearVoleyMatches: () => void

  // Métodos generales
  getAllMatches: () => Match[]
  clearAllMatches: () => void
}

export const useMatchStore = create<MatchState>()(
  persist(
    (set, get) => ({
      // Estado inicial
      futbolMatches: [],
      voleyMatches: [],

      // Métodos para fútbol
      setFutbolMatches: (matches) => set({ futbolMatches: matches.map((m) => ({ ...m, sport: 'futbol' as const })) }),

      addFutbolMatch: (match) =>
        set((state) => ({
          futbolMatches: [...state.futbolMatches, { ...match, sport: 'futbol' as const, createdAt: new Date().toISOString() }],
        })),

      removeFutbolMatch: (matchId) =>
        set((state) => ({
          futbolMatches: state.futbolMatches.filter((m) => m.id !== matchId),
        })),

      clearFutbolMatches: () => set({ futbolMatches: [] }),

      // Métodos para vóley
      setVoleyMatches: (matches) => set({ voleyMatches: matches.map((m) => ({ ...m, sport: 'voley' as const })) }),

      addVoleyMatch: (match) =>
        set((state) => ({
          voleyMatches: [...state.voleyMatches, { ...match, sport: 'voley' as const, createdAt: new Date().toISOString() }],
        })),

      removeVoleyMatch: (matchId) =>
        set((state) => ({
          voleyMatches: state.voleyMatches.filter((m) => m.id !== matchId),
        })),

      clearVoleyMatches: () => set({ voleyMatches: [] }),

      // Métodos generales
      getAllMatches: () => {
        const state = get()
        return [...state.futbolMatches, ...state.voleyMatches].sort(
          (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
        )
      },

      clearAllMatches: () => set({ futbolMatches: [], voleyMatches: [] }),
    }),
    {
      name: 'match-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
