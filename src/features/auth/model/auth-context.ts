import { createContext, useContext } from 'react'

interface AuthContextType {}

export const AuthContext = createContext<AuthContextType>({})

export const useAuth = () => useContext(AuthContext)
