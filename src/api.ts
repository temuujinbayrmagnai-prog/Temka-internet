import type { Task, TaskInput, User } from './types.ts'

// Backend-gui ajillahaar localStorage ashiglav.
// Daraa ni heseg bureer n fetch() bolgon solij bolno.
const K_TASKS = 'taskflow-tasks-v2'
const K_USERS = 'taskflow-users-v1'
const K_SESSION = 'taskflow-session-v1'

type StoredUser = User & { password: string }

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    if (raw) return JSON.parse(raw) as T
  } catch {
    /* ignore */
  }
  return fallback
}

function save(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* ignore */
  }
}

const mk = (
  id: string, title: string, project: string, dueDate: string,
  status: Task['status'], priority: Task['priority'],
): Task => ({ id, title, project, dueDate, status, priority })

const SEED_TASKS: Task[] = [
  mk('1', 'Design System Audit', 'Amazon Dashboard', '2026-01-10', 'complete', 'high'),
  mk('2', 'Landing Page Copywriting', 'Microsoft', '2026-01-12', 'complete', 'high'),
  mk('3', 'Mobile App Redesign', 'Apple', '2026-01-14', 'complete', 'high'),
  mk('4', 'Key Metrics Layout', 'Facebook Dashboard', '2026-01-16', 'overdue', 'low'),
  mk('5', 'Wireframe v2 Upload', 'Netflix', '2026-01-17', 'in_progress', 'low'),
  mk('6', 'QA Testing', 'Nvidia', '2026-01-17', 'in_progress', 'low'),
  mk('7', 'Prototype Review', 'Behance', '2026-01-18', 'in_progress', 'medium'),
  mk('8', 'Copywriting Review', 'Google Dashboard', '2026-01-24', 'todo', 'medium'),
  mk('9', 'UX Audit', 'Grab Map App', '2026-01-25', 'todo', 'medium'),
  mk('10', 'Review Landing Page', 'Lego', '2026-01-04', 'complete', 'medium'),
]

const SEED_USERS: StoredUser[] = [
  { id: 'u1', name: 'Nudee', email: 'demo@demo.com', password: 'demo123' },
]

function readTasks(): Task[] {
  const saved = load<Task[] | null>(K_TASKS, null)
  if (saved) return saved
  save(K_TASKS, SEED_TASKS)
  return [...SEED_TASKS]
}

function readUsers(): StoredUser[] {
  const saved = load<StoredUser[] | null>(K_USERS, null)
  if (saved) return saved
  save(K_USERS, SEED_USERS)
  return [...SEED_USERS]
}

const strip = (u: StoredUser): User => ({ id: u.id, name: u.name, email: u.email })
const later = <T,>(v: T) => new Promise<T>((r) => setTimeout(() => r(v), 150))

export const api = {
  // ---- auth ----
  currentUser(): User | null {
    const id = load<string | null>(K_SESSION, null)
    const u = readUsers().find((x) => x.id === id)
    return u ? strip(u) : null
  },

  async login(email: string, password: string): Promise<User> {
    const e = email.trim().toLowerCase()
    const u = readUsers().find((x) => x.email.toLowerCase() === e && x.password === password)
    if (!u) throw new Error('Email esvel nuuts ug buruu baina')
    save(K_SESSION, u.id)
    return later(strip(u))
  },

  async register(name: string, email: string, password: string): Promise<User> {
    const list = readUsers()
    const e = email.trim().toLowerCase()
    if (list.some((x) => x.email.toLowerCase() === e)) throw new Error('Ene email burtgeltei baina')
    const u: StoredUser = {
      id: 'u' + Date.now().toString(36),
      name: name.trim(),
      email: email.trim(),
      password,
    }
    save(K_USERS, [...list, u])
    save(K_SESSION, u.id)
    return later(strip(u))
  },

  logout() {
    try {
      localStorage.removeItem(K_SESSION)
    } catch {
      /* ignore */
    }
  },

  // ---- tasks ----
  listTasks: () => later(readTasks()),

  async getTask(id: string): Promise<Task> {
    const found = readTasks().find((x) => x.id === id)
    if (!found) throw new Error('Task oldsongui')
    return later(found)
  },

  createTask(input: TaskInput): Promise<Task> {
    const task: Task = { ...input, id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6) }
    save(K_TASKS, [task, ...readTasks()])
    return later(task)
  },

  async updateTask(id: string, input: TaskInput): Promise<Task> {
    const list = readTasks()
    const i = list.findIndex((x) => x.id === id)
    if (i < 0) throw new Error('Task oldsongui')
    list[i] = { ...input, id }
    save(K_TASKS, list)
    return later(list[i])
  },

  deleteTask(id: string): Promise<boolean> {
    save(K_TASKS, readTasks().filter((x) => x.id !== id))
    return later(true)
  },
}

export function errorMessage(err: unknown): string {
  return err instanceof Error ? err.message : 'Aldaa garlaa'
}
