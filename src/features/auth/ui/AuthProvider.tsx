import { useUserProfile } from '@entities/user/model/store'
import { useEffect } from 'react'
import { AuthContext } from '../model/auth-context'

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const userProfileStore = useUserProfile()

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const userId = urlParams.get('userId')
    userProfileStore.setUser({ userId: userId || '' })
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user: userProfileStore.data,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
