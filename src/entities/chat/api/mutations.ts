import { addChat } from './chat-api'
import { ApiMutationOptions, useApiMutation } from '../../../shared/api/mutations'
import { AddChatRequest } from './types'

export const useAddChatMutation = (options: ApiMutationOptions<any, AddChatRequest>) => {
  return useApiMutation({
    mutationFn: addChat,
    ...options,
  })
}
