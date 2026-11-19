import { Link } from 'react-router'
import { useAuth } from '../auth/AuthContext.ts'

export default function Topbar({ onMenu }: { onMenu: () => void }) {
  const { user, logout } = useAuth()
  const name = user?.name ?? ''

  return (
    <header className="topbar">
      <button className="burger" onClick={onMenu} aria-label="Menu">☰</button>
      <span className="topbar-title">TaskFlow</span>
      <div className="topbar-right">
        <Link to="/profile" className="topbar-user">
          <span className="avatar">{name.charAt(0).toUpperCase()}</span>
          <span className="user-name">{name}</span>
        </Link>
        <button className="btn-ghost" onClick={logout}>Logout</button>
      </div>
    </header>
  )
}
