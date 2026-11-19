import { useMemo, useState, type ReactNode } from 'react'
import { api } from '../api.ts'
import type { User } from '../types.ts'
import { AuthContext, type AuthValue } from './AuthContext.ts'

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => api.currentUser())

  const value = useMemo<AuthValue>(
    () => ({
      user,
      login: async (email, password) => {
        setUser(await api.login(email, password))
      },
      register: async (name, email, password) => {
        setUser(await api.register(name, email, password))
      },
      logout: () => {
        api.logout()
        setUser(null)
      },
    }),
    [user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
