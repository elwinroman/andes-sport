import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'

interface BearState {
  isAuthenticated: boolean
  accessToken: string | null

  createSession(token: string): void
  clearSession(): void
}

const initialState: Pick<BearState, 'isAuthenticated' | 'accessToken'> = {
  isAuthenticated: false,
  accessToken: null,
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
      }),
      {
        name: 'store.local',
        storage: createJSONStorage(() => localStorage),
      },
    ),
  ),
)
