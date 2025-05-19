import { addChat, deleteChat } from './chat-api'
import { ApiMutationOptions, useApiMutation } from '../../../shared/api/mutations'
import { AddChatRequest } from './types'

export const useAddChatMutation = (options: ApiMutationOptions<any, AddChatRequest>) => {
  return useApiMutation({
    mutationFn: addChat,
    ...options,
  })
}

export const useDeleteChatMutation = (options: ApiMutationOptions<any, string>) => {
  return useApiMutation({
    mutationFn: deleteChat,
    ...options,
  })
}
