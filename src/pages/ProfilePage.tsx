import { useMemo } from 'react'
import { useAuth } from '../auth/AuthContext.ts'
import { useTasks } from '../useTasks.ts'

export default function ProfilePage() {
  const { user, logout } = useAuth()
  const { tasks } = useTasks()

  const stats = useMemo(() => {
    const list = tasks ?? []
    return { total: list.length, done: list.filter((t) => t.status === 'complete').length }
  }, [tasks])

  return (
    <div className="page narrow">
      <h1>Профайл</h1>
      <div className="profile-card">
        <div className="big">{user?.name.charAt(0).toUpperCase()}</div>
        <div className="grow">
          <h2>{user?.name}</h2>
          <p>{user?.email}</p>
          <p>Niit task: <b>{stats.total}</b> · Duussan: <b>{stats.done}</b></p>
        </div>
        <button className="btn-danger" onClick={logout}>Logout</button>
      </div>
    </div>
  )
}
