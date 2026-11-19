import { useMemo } from 'react'
import { Link } from 'react-router'
import TaskList from '../components/TaskList.tsx'
import { useAuth } from '../auth/AuthContext.ts'
import { useTasks } from '../useTasks.ts'
import { TASK_STATUSES, type TaskStatus } from '../types.ts'

export default function DashboardPage() {
  const { user } = useAuth()
  const { tasks, error } = useTasks()

  const counts = useMemo(() => {
    const c: Record<TaskStatus, number> = { todo: 0, in_progress: 0, complete: 0, overdue: 0 }
    ;(tasks ?? []).forEach((t) => { c[t.status]++ })
    return c
  }, [tasks])

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <h1>Nudee hujirla!!! 👋</h1>
          <p className="sub">Sain uu, {user?.name}. Tanii odoogiin ajluud neg haragdana.</p>
        </div>
        <Link to="/tasks/new" className="btn-primary">+ Create New Task</Link>
      </div>

      <div className="stats">
        {TASK_STATUSES.map((s) => (
          <Link key={s.value} to={`/tasks?status=${s.value}`} className={`stat s-${s.value}`}>
            <span>{s.value === 'complete' ? 'Completed' : s.label}</span>
            <b>{counts[s.value]}</b>
          </Link>
        ))}
      </div>

      <div className="section-head">
        <h2>Suuliin task-uud</h2>
        <Link to="/tasks">Buh task →</Link>
      </div>

      {error && <div className="alert">{error}</div>}
      {!tasks && !error && <div className="empty">Achaalj baina...</div>}
      {tasks && <TaskList tasks={tasks.slice(0, 5)} pageSize={5} showPager={false} />}
    </div>
  )
}
