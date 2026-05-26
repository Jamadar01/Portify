import { useState } from 'react'
import { useAuthStore } from '../lib/authStore'

const inputClass = 'w-full px-3 py-2.5 rounded-lg text-sm bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-violet-500'

export default function AuthModal({ onClose, onSuccess }) {
  const [mode, setMode] = useState('login')
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login, register } = useAuthStore()

  const set = (field, val) => setForm((f) => ({ ...f, [field]: val }))

  async function submit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      if (mode === 'login') {
        await login(form.email, form.password)
      } else {
        await register(form.name, form.email, form.password)
      }
      onSuccess?.()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}>
      <div className="w-full max-w-sm rounded-2xl p-8 relative"
        style={{ background: '#0d0f1a', border: '1px solid rgba(255,255,255,0.08)', fontFamily: "'Space Grotesk', sans-serif" }}>

        <button onClick={onClose}
          className="absolute top-4 right-4 text-white/30 hover:text-white text-xl transition-colors">×</button>

        <div className="flex items-center gap-2 mb-6">
          <div className="w-6 h-6 rounded flex items-center justify-center text-xs font-bold"
            style={{ background: 'linear-gradient(135deg,#7c3aed,#a855f7)' }}>P</div>
          <span className="font-bold text-white">Portify</span>
        </div>

        <h2 className="text-xl font-bold text-white mb-1">
          {mode === 'login' ? 'Welcome back' : 'Create account'}
        </h2>
        <p className="text-sm text-white/40 mb-6">
          {mode === 'login' ? 'Sign in to publish your portfolio' : 'Sign up to publish your portfolio'}
        </p>

        <form onSubmit={submit} className="space-y-4">
          {mode === 'register' && (
            <input value={form.name} onChange={(e) => set('name', e.target.value)}
              placeholder="Full Name" required className={inputClass} />
          )}
          <input value={form.email} onChange={(e) => set('email', e.target.value)}
            placeholder="Email" type="email" required className={inputClass} />
          <input value={form.password} onChange={(e) => set('password', e.target.value)}
            placeholder="Password" type="password" required minLength={6} className={inputClass} />

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button type="submit" disabled={loading}
            className="w-full py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:brightness-110 disabled:opacity-50"
            style={{ background: 'linear-gradient(135deg,#7c3aed,#a855f7)', boxShadow: '0 0 20px rgba(124,58,237,0.4)' }}>
            {loading ? 'Please wait...' : mode === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <p className="text-center text-xs text-white/40 mt-5">
          {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <button onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError('') }}
            className="text-violet-400 hover:text-violet-300 transition-colors">
            {mode === 'login' ? 'Sign up' : 'Sign in'}
          </button>
        </p>
      </div>
    </div>
  )
}
