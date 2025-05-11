import { create } from 'zustand'
import { AddChatFormType } from './types'

type State = {
  isLoading: boolean
  error: string | null
  isModalOpened?: boolean
  isSelectCoordinates?: boolean
  setModalOpened: (isOpened: boolean) => void

  formData: Partial<AddChatFormType>
  setFormData: (formData: Partial<AddChatFormType>) => void
}

export const useAddChatStore = create<State>((set) => ({
  isLoading: false,
  error: null,
  isModalOpened: false,
  setModalOpened: (isOpened: boolean) => set({ isModalOpened: isOpened }),
  setSelectCoordinates: (isSelectCoordinates: boolean) => set({ isSelectCoordinates }),

  formData: {
    title: '',
    description: '',
    inviteLink: '',
    imageUrl: '',
    coordinates: [0, 0],
  },
  setFormData: (formData: Partial<AddChatFormType>) => set({ formData }),
}))
