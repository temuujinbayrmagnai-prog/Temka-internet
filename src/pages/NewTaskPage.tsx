import { useNavigate } from 'react-router'
import TaskForm from '../components/TaskForm.tsx'
import { api } from '../api.ts'

export default function NewTaskPage() {
  const navigate = useNavigate()
  return (
    <div className="page narrow">
      <h1>New Task</h1>
      <TaskForm
        submitLabel="Create Task"
        onCancel={() => navigate('/tasks')}
        onSubmit={async (v) => {
          await api.createTask(v)
          navigate('/tasks')
        }}
      />
    </div>
  )
}
