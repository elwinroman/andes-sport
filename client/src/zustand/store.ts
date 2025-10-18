import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'

type SportType = 'futbol' | 'voley'

interface BearState {
  isAuthenticated: boolean
  accessToken: string | null
  selectedFixtureSport: SportType

  createSession(token: string): void
  clearSession(): void
  setSelectedFixtureSport(sport: SportType): void
}

const initialState: Pick<BearState, 'isAuthenticated' | 'accessToken' | 'selectedFixtureSport'> = {
  isAuthenticated: false,
  accessToken: null,
  selectedFixtureSport: 'futbol',
}

export const useStore = create<BearState>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,

        createSession: (token: string): void => {
          set({
            isAuthenticated: true,
            accessToken: token,
          })
        },

        clearSession: (): void => {
          set({ ...initialState })
        },

        setSelectedFixtureSport: (sport: SportType): void => {
          set({ selectedFixtureSport: sport })
        },
      }),
      {
        name: 'store.local',
        storage: createJSONStorage(() => localStorage),
      },
    ),
  ),
)
