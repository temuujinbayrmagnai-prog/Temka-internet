import { useEffect, useState } from 'react'
import { api, errorMessage } from './api.ts'
import type { Task } from './types.ts'

export function useTasks() {
  const [tasks, setTasks] = useState<Task[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let ignore = false
    api
      .listTasks()
      .then((data) => { if (!ignore) setTasks(data) })
      .catch((err) => { if (!ignore) setError(errorMessage(err)) })
    return () => { ignore = true }
  }, [])

  return { tasks, error }
}
