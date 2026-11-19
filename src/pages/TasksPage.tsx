import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router'
import StatusSelect from '../components/StatusSelect.tsx'
import TaskList from '../components/TaskList.tsx'
import { useTasks } from '../useTasks.ts'
import { TASK_STATUSES } from '../types.ts'

export default function TasksPage() {
  const [params, setParams] = useSearchParams()
  const status = params.get('status') ?? 'all'
  const [priority, setPriority] = useState('all')
  const [q, setQ] = useState('')
  const { tasks, error } = useTasks()

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase()
    return (tasks ?? []).filter((t) => {
      if (status !== 'all' && t.status !== status) return false
      if (priority !== 'all' && t.priority !== priority) return false
      if (needle && !`${t.title} ${t.project}`.toLowerCase().includes(needle)) return false
      return true
    })
  }, [tasks, status, priority, q])

  const label = TASK_STATUSES.find((s) => s.value === status)?.label

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <h1>{label ? `Tasks · ${label}` : 'Бүх task'}</h1>
          <p className="sub">Hailt, shuultuur ashiglan ajluudaa ol.</p>
        </div>
        <Link to="/tasks/new" className="btn-primary">+ Create New Task</Link>
      </div>

      <div className="filters">
        <StatusSelect
          withAll
          value={status}
          onChange={(v) => (v === 'all' ? setParams({}) : setParams({ status: v }))}
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="all">All Priority</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <input placeholder="Search task / project" value={q} onChange={(e) => setQ(e.target.value)} />
      </div>

      {error && <div className="alert">{error}</div>}
      {!tasks && !error && <div className="empty">Achaalj baina...</div>}
      {tasks && <TaskList key={`${status}|${priority}|${q}`} tasks={filtered} />}
    </div>
  )
}
