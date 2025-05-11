import { Chat } from '@shared/types/chat'
import { create } from 'zustand'

type ChatsStore = {
  chats: Chat[]
  selectedChat:  Chat | null
  setChats: (chats: Chat[]) => void
  setSelectedChat: (chat: Chat | null) => void
}

export const useChatsStore = create<ChatsStore>((set) => ({
  chats: [],
  selectedChat: null,
  setChats(chats: Chat[]) {
    set({ chats })
  },
  setSelectedChat(chat: Chat | null) {
    set({selectedChat: chat})
  }
}))
