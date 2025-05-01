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
}

export interface AddChatRequest {
  userId: string
  chatId: string
  title: string
  description: string
  longitude: number
  latitude: number
}