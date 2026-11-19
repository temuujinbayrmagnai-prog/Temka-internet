import { Navigate, Outlet, useLocation } from 'react-router'
import { useAuth } from './AuthContext.ts'

export default function RequireAuth() {
  const { user } = useAuth()
  const location = useLocation()

  if (!user) {
    return <Navigate to="/auth" replace state={{ from: location.pathname + location.search }} />
  }
  return <Outlet />
}
