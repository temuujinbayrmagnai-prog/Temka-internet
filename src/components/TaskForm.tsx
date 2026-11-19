import { useState, type FormEvent } from 'react'
import StatusSelect from './StatusSelect.tsx'
import { PRIORITIES, type TaskInput } from '../types.ts'

interface Props {
  initial?: TaskInput
  submitLabel: string
  onSubmit: (v: TaskInput) => Promise<void> | void
  onCancel: () => void
}

const EMPTY: TaskInput = {
  title: '',
  project: '',
  dueDate: new Date().toISOString().slice(0, 10),
  status: 'todo',
  priority: 'medium',
  description: '',
}

export default function TaskForm({ initial, submitLabel, onSubmit, onCancel }: Props) {
  const [v, setV] = useState<TaskInput>(initial ?? EMPTY)
  const [busy, setBusy] = useState(false)
  const set = <K extends keyof TaskInput>(k: K, val: TaskInput[K]) => setV((p) => ({ ...p, [k]: val }))

  async function submit(e: FormEvent) {
    e.preventDefault()
    setBusy(true)
    try {
      await onSubmit({ ...v, title: v.title.trim(), project: v.project.trim() })
    } finally {
      setBusy(false)
    }
  }

  return (
    <form className="form-card" onSubmit={submit}>
      <label>Task title
        <input required value={v.title} onChange={(e) => set('title', e.target.value)} />
      </label>
      <label>Project
        <input required value={v.project} onChange={(e) => set('project', e.target.value)} />
      </label>
      <div className="row">
        <label>Due date
          <input type="date" required value={v.dueDate} onChange={(e) => set('dueDate', e.target.value)} />
        </label>
        <label>Status
          <StatusSelect value={v.status} onChange={(s) => set('status', s as TaskInput['status'])} />
        </label>
        <label>Priority
          <select value={v.priority} onChange={(e) => set('priority', e.target.value as TaskInput['priority'])}>
            {PRIORITIES.map((p) => <option key={p.value} value={p.value}>{p.label}</option>)}
          </select>
        </label>
      </div>
      <label>Description
        <textarea rows={4} value={v.description ?? ''} onChange={(e) => set('description', e.target.value)} />
      </label>
      <div className="actions">
        <button type="button" className="btn-ghost" onClick={onCancel}>Cancel</button>
        <button type="submit" className="btn-primary" disabled={busy}>{busy ? '...' : submitLabel}</button>
      </div>
    </form>
  )
}
