import { Chat } from '@shared/types/chat'
import { ApiChatResponse } from './types'

export function transformChat(chatData: ApiChatResponse): Chat {
  return {
    id: String(chatData.id),
    chatId: chatData.chatId,
    title: chatData.title,
    description: chatData.description,
    creatorId: chatData.creatorId,
    longitude: chatData.location.longitude,
    latitude: chatData.location.latitude,
    inviteLink: chatData.inviteLink,
    imageUrl: chatData.imageUrl,
  }
}
