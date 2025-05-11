export interface ApiChatResponse {
  id: number
  chatId: string
  title: string
  description: string
  creatorId: string
  locationId: number
  location: {
    id: number
    longitude: number
    latitude: number
  }
  inviteLink: string
  imageUrl: string
}

export interface AddChatRequest {
  userId: string
  chatId: string
  title: string
  description: string
  inviteLink: string
  imageUrl: string
  longitude: number
  latitude: number
}