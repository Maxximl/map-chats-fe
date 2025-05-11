import { create } from 'zustand'
import { UserProfile } from './types'

interface UserProfileState {
  data: UserProfile | null
  loading: boolean
  setUser: (data: UserProfile) => void
}

export const useUserProfile = create<UserProfileState>((set) => ({
  data: null,
  loading: false,
  setUser: (data: UserProfile) => set({ data }),
}))
