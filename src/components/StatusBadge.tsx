import { TASK_STATUSES, type TaskStatus } from '../types.ts'

export default function StatusBadge({ status }: { status: TaskStatus }) {
  const label = TASK_STATUSES.find((s) => s.value === status)?.label ?? status
  return <span className={`badge s-${status}`}>{label}</span>
}
