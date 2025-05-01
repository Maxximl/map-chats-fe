import { useQuery } from '@tanstack/react-query'
import { getChats } from './chat-api'
import { transformChat } from './transformers'
import { Chat } from '@shared/types/chat'

export const GET_CHATS_QUERY_KEY = 'get_chats_query_key'

const fetchChats = async (): Promise<Chat[]> => {
  const data = await getChats()
  return data.map(transformChat)
}

export const useChats = () => {
  return useQuery({
    queryKey: [GET_CHATS_QUERY_KEY],
    queryFn: fetchChats,
    staleTime: 60_000,
  })
}
