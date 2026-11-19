import { useState } from 'react'
import TaskItem from './TaskItem.tsx'
import type { Task } from '../types.ts'

interface Props {
  tasks: Task[]
  pageSize?: number
  showPager?: boolean
}

// Filter soligdohod `key` солих хэрэгтэй (pagination 1-р хуудас руу буцна).
export default function TaskList({ tasks, pageSize = 10, showPager = true }: Props) {
  const [page, setPage] = useState(1)
  const pages = Math.max(1, Math.ceil(tasks.length / pageSize))
  const current = Math.min(page, pages)
  const rows = tasks.slice((current - 1) * pageSize, current * pageSize)

  return (
    <>
      <div className="table-wrap">
        <table>
          <thead>
            <tr><th>Task Title</th><th>Project</th><th>Due Date</th><th>Status</th><th>Priority</th></tr>
          </thead>
          <tbody>
            {rows.map((t) => <TaskItem key={t.id} task={t} />)}
            {rows.length === 0 && (
              <tr className="no-hover"><td colSpan={5} className="empty">Ilertsgui baina.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {showPager && (
        <div className="pager">
          <div className="pages">
            <button disabled={current === 1} onClick={() => setPage(current - 1)}>‹</button>
            {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
              <button key={p} className={p === current ? 'on' : ''} onClick={() => setPage(p)}>{p}</button>
            ))}
            <button disabled={current === pages} onClick={() => setPage(current + 1)}>›</button>
          </div>
          <span className="total">Total {tasks.length} tasks</span>
        </div>
      )}
    </>
  )
}
