export type UserRole = 'admin' | 'editor' | 'viewer'

export const PERMISSIONS: Record<string, UserRole[]> = {
  manageUsers: ['admin'],
  editContent: ['admin', 'editor'],
  viewAnalytics: ['admin', 'editor', 'viewer'],
} as const
