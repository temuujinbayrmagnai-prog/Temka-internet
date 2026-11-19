import { TASK_STATUSES } from '../types.ts'

interface Props {
  value: string
  onChange: (value: string) => void
  withAll?: boolean
}

export default function StatusSelect({ value, onChange, withAll = false }: Props) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      {withAll && <option value="all">All Status</option>}
      {TASK_STATUSES.map((s) => (
        <option key={s.value} value={s.value}>{s.label}</option>
      ))}
    </select>
  )
}
