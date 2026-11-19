import { useState, type FormEvent } from 'react'
import { Navigate, useLocation } from 'react-router'
import { useAuth } from '../auth/AuthContext.ts'
import { errorMessage } from '../api.ts'

export default function AuthPage() {
  const { user, login, register } = useAuth()
  const location = useLocation()
  const from = (location.state as { from?: string } | null)?.from ?? '/'

  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  if (user) return <Navigate to={from} replace />

  async function submit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setBusy(true)
    try {
      if (mode === 'login') await login(email, password)
      else await register(name, email, password)
    } catch (err) {
      setError(errorMessage(err))
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="auth-wrap">
      <form className="auth-card" onSubmit={submit}>
        <div className="brand dark">
          <span className="brand-logo">T</span>
          <span>TaskFlow</span>
        </div>
        <h1>{mode === 'login' ? 'Nevtreh' : 'Burtgug uusgeh'}</h1>

        {error && <div className="alert">{error}</div>}

        {mode === 'register' && (
          <label>Ner
            <input required value={name} onChange={(e) => setName(e.target.value)} />
          </label>
        )}
        <label>Email
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>Nuuts ug
          <input
            type="password"
            required
            minLength={4}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <button type="submit" className="btn-primary" disabled={busy}>
          {busy ? '...' : mode === 'login' ? 'Nevtreh' : 'Burtguuleh'}
        </button>

        {mode === 'login' && (
          <p className="hint">Demo: <b>demo@demo.com</b> / <b>demo123</b></p>
        )}

        <button
          type="button"
          className="link-btn"
          onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(null) }}
        >
          {mode === 'login' ? 'Burtgeltei bhgui yu? Burtguuleh' : 'Burtgeltei yu? Nevtreh'}
        </button>
      </form>
    </div>
  )
}
