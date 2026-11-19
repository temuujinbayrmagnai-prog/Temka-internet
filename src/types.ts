export const TASK_STATUSES = [
  { value: 'todo', label: 'To Do' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'complete', label: 'Complete' },
  { value: 'overdue', label: 'Overdue' },
] as const

export const PRIORITIES = [
  { value: 'high', label: 'High' },
  { value: 'medium', label: 'Medium' },
  { value: 'low', label: 'Low' },
] as const

export type TaskStatus = (typeof TASK_STATUSES)[number]['value']
export type Priority = (typeof PRIORITIES)[number]['value']

export interface Task {
  id: string
  title: string
  project: string
  dueDate: string // YYYY-MM-DD
  status: TaskStatus
  priority: Priority
  description?: string
}

export type TaskInput = Omit<Task, 'id'>

export interface User {
  id: string
  name: string
  email: string
}
