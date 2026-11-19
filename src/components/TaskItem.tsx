import { useNavigate } from 'react-router'
import StatusBadge from './StatusBadge.tsx'
import { PRIORITIES, type Task } from '../types.ts'

const COLORS = ['#f59e0b', '#16a34a', '#334155', '#1d4ed8', '#dc2626', '#7c3aed', '#0891b2']
const colorFor = (s: string) => COLORS[[...s].reduce((a, c) => a + c.charCodeAt(0), 0) % COLORS.length]

const fmtDate = (v: string) => {
  const d = new Date(v)
  return Number.isNaN(d.getTime())
    ? v
    : d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default function TaskItem({ task }: { task: Task }) {
  const navigate = useNavigate()
  const priority = PRIORITIES.find((p) => p.value === task.priority)?.label ?? task.priority

  return (
    <tr onClick={() => navigate(`/tasks/${task.id}`)}>
      <td className="title">{task.title}</td>
      <td>
        <span className="proj">
          <i style={{ background: colorFor(task.project) }}>{task.project.charAt(0).toUpperCase()}</i>
          {task.project}
        </span>
      </td>
      <td>{fmtDate(task.dueDate)}</td>
      <td><StatusBadge status={task.status} /></td>
      <td><span className={`prio p-${task.priority}`}>{priority}</span></td>
    </tr>
  )
}
