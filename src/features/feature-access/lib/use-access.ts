import { checkPermission } from '@entities/user/model/access'
import { useUserProfile } from '@entities/user/model/store'
import { Chat } from '@shared/types/chat'

export const useAccess = (chat?: Chat | null) => {
  const { data } = useUserProfile()
  return checkPermission(String(data?.userId || ''), chat)
}
