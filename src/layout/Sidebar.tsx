import { Link, NavLink, useLocation, useSearchParams } from 'react-router'
import { TASK_STATUSES } from '../types.ts'

interface Props {
  open: boolean
  onNavigate: () => void
}

export default function Sidebar({ open, onNavigate }: Props) {
  const { pathname } = useLocation()
  const [params] = useSearchParams()
  const status = pathname === '/tasks' ? params.get('status') : null

  const navClass = ({ isActive }: { isActive: boolean }) => `nav-item ${isActive ? 'active' : ''}`

  return (
    <aside className={`sidebar ${open ? 'open' : ''}`}>
      <div className="brand">
        <span className="brand-logo">T</span>
        <span>TaskFlow</span>
      </div>

      <nav>
        <NavLink to="/" end onClick={onNavigate} className={navClass}>
          <span className="nav-icon">▦</span> Dashboard
        </NavLink>

        <Link
          to="/tasks"
          onClick={onNavigate}
          className={`nav-item ${pathname === '/tasks' && !status ? 'active' : ''}`}
        >
          <span className="nav-icon">☑</span> Бүх task
        </Link>

        <div className="nav-sub">
          {TASK_STATUSES.map((s) => (
            <Link
              key={s.value}
              to={`/tasks?status=${s.value}`}
              onClick={onNavigate}
              className={`nav-item sub ${status === s.value ? 'active' : ''}`}
            >
              <span className={`dot s-${s.value}`} /> {s.label}
            </Link>
          ))}
        </div>

        <NavLink to="/tasks/new" end onClick={onNavigate} className={navClass}>
          <span className="nav-icon">＋</span> Шинэ task
        </NavLink>
        <NavLink to="/profile" end onClick={onNavigate} className={navClass}>
          <span className="nav-icon">☺</span> Профайл
        </NavLink>
      </nav>
    </aside>
  )
}
