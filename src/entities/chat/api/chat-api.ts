import { apiInstance } from '../../../shared/api/base'
import { AddChatRequest, ApiChatResponse } from './types'

const BASE_URL = 'chats'

export const getChats = (): Promise<ApiChatResponse[]> => {
  return apiInstance.get(`${BASE_URL}`)
}

export const addChat = (newChat: AddChatRequest): Promise<void> => {
  return apiInstance.post(`${BASE_URL}/add`, newChat)
}

export const deleteChat = (chatId: string): Promise<void> => {
  return apiInstance.delete(`${BASE_URL}/${chatId}`)
}
