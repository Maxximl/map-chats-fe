import { AuthProvider } from '@features/auth/ui/AuthProvider'

export const withAuth = (Component: React.FC) => () => (
  <AuthProvider>
    <Component />
  </AuthProvider>
)
