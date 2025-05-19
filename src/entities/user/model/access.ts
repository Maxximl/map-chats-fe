import { Chat } from '@shared/types/chat'
import { PERMISSIONS, UserRole } from './roles'

export const checkAccess = (userRole: UserRole, permission: keyof typeof PERMISSIONS): boolean => {
  return PERMISSIONS[permission].includes(userRole)
}

export const checkPermission = (userId: string, chat?: Chat | null): boolean => {
  return chat?.creatorId === userId
}
