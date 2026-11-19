import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import TaskForm from '../components/TaskForm.tsx'
import { api, errorMessage } from '../api.ts'
import type { Task } from '../types.ts'

export default function TaskDetailPage() {
  const { id = '' } = useParams()
  const navigate = useNavigate()
  const [task, setTask] = useState<Task | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let ignore = false
    api
      .getTask(id)
      .then((t) => { if (!ignore) setTask(t) })
      .catch((e) => { if (!ignore) setError(errorMessage(e)) })
    return () => { ignore = true }
  }, [id])

  if (error) {
    return (
      <div className="page narrow">
        <div className="alert">{error}</div>
        <Link to="/tasks">← Buh task</Link>
      </div>
    )
  }
  if (!task) return <div className="empty">Achaalj baina...</div>

  return (
    <div className="page narrow">
      <div className="top-row">
        <h1>Edit Task</h1>
        <button
          className="btn-danger"
          onClick={async () => {
            if (!confirm('Ene task-iig ustgah uu?')) return
            await api.deleteTask(task.id)
            navigate('/tasks')
          }}
        >
          Delete
        </button>
      </div>
      <TaskForm
        initial={task}
        submitLabel="Save"
        onCancel={() => navigate('/tasks')}
        onSubmit={async (v) => {
          await api.updateTask(task.id, v)
          navigate('/tasks')
        }}
      />
    </div>
  )
}
