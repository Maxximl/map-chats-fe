import { useChats } from '@entities/chat/api/queries'
import { useChatsStore } from '../store/chatsStore'
import { useEffect } from 'react'

export function useLoadChats() {
  const chatsStore = useChatsStore()

  const { data, isLoading } = useChats()

  useEffect(() => {
    chatsStore.setChats(data || [])
  }, [data])

  return {
    isLoading,
  }
}
