import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../lib/authStore'
import { usePortfolioStore } from '../lib/portfolioStore'
import { api } from '../lib/api'

const THEME_LABELS = {
  cosmic: '🌌 Cosmic',
  cyberpunk: '⚡ Cyberpunk',
  deepocean: '🌊 Deep Ocean',
  minimalpaper: '📄 Minimal Paper',
}

export default function Dashboard() {
  const navigate = useNavigate()
  const { user, token, logout, fetchMe } = useAuthStore()
  const { setData, setTheme, setStep } = usePortfolioStore()

  const [portfolio, setPortfolio] = useState(null)
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (!token) { navigate('/'); return }
    fetchMe()
    api.portfolio.me()
      .then((res) => setPortfolio(res.portfolio))
      .catch(() => setPortfolio(null))
      .finally(() => setLoading(false))
  }, [token])

  function handleEdit() {
    if (!portfolio) return
    setTheme(portfolio.theme)
    setData(portfolio.data)
    setStep(2)
    navigate('/builder')
  }

  function handleChangeTheme() {
    if (!portfolio) return
    setData(portfolio.data)
    setStep(1)
    navigate('/builder')
  }

  async function handleDelete() {
    if (!confirm('Delete your published portfolio? This cannot be undone.')) return
    setDeleting(true)
    try {
      await api.portfolio.delete()
      setPortfolio(null)
    } catch (err) {
      alert(err.message)
    } finally {
      setDeleting(false)
    }
  }

  const publicUrl = portfolio ? `${window.location.origin}/p/${portfolio.slug}` : ''

  return (
    <div className="min-h-screen w-full px-6 py-12"
      style={{ background: '#070810', fontFamily: "'Space Grotesk', sans-serif", color: '#fff' }}>

      {/* Nav */}
      <div className="flex items-center justify-between max-w-3xl mx-auto mb-10">
        <button onClick={() => navigate('/')}
          className="flex items-center gap-2 text-white/40 hover:text-white text-sm transition-colors">
          ← Home
        </button>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-sm font-bold">
            <div className="w-6 h-6 rounded flex items-center justify-center text-xs"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #a855f7)' }}>P</div>
            Portify
          </div>
          <button onClick={() => { logout(); navigate('/') }}
            className="text-xs text-white/30 hover:text-red-400 transition-colors px-3 py-1.5 rounded-lg border border-white/10 hover:border-red-400/30">
            Sign Out
          </button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold mb-1">My Portfolio</h1>
          <p className="text-white/40 text-sm">
            {user ? `Signed in as ${user.email}` : 'Your portfolio dashboard'}
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 rounded-full border-2 border-violet-500 border-t-transparent animate-spin" />
          </div>
        ) : portfolio ? (
          <div className="space-y-5">

            {/* Portfolio card */}
            <div className="rounded-2xl p-6"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-xl font-bold">{portfolio.data.name || 'Untitled'}</h2>
                    <span className="text-xs px-2.5 py-0.5 rounded-full"
                      style={{ background: 'rgba(34,197,94,0.12)', color: '#86efac', border: '1px solid rgba(34,197,94,0.2)' }}>
                      Live
                    </span>
                  </div>
                  <p className="text-sm text-white/40 mb-1">{portfolio.data.role}</p>
                  <p className="text-xs text-white/25">Theme: {THEME_LABELS[portfolio.theme]}</p>
                </div>
                <a href={publicUrl} target="_blank" rel="noreferrer"
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-white transition-all hover:brightness-110"
                  style={{ background: 'linear-gradient(135deg,#7c3aed,#a855f7)' }}>
                  View Live →
                </a>
              </div>

              {/* Public URL */}
              <div className="mt-5 flex items-center gap-2 px-3 py-2 rounded-lg"
                style={{ background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.15)' }}>
                <span className="text-xs text-violet-400 truncate flex-1">{publicUrl}</span>
                <button
                  onClick={() => navigator.clipboard.writeText(publicUrl)}
                  className="text-xs text-white/40 hover:text-white transition-colors flex-shrink-0">
                  Copy
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button onClick={handleEdit}
                className="py-3 px-4 rounded-xl text-sm font-medium transition-all hover:brightness-110"
                style={{ background: 'linear-gradient(135deg,#7c3aed,#a855f7)' }}>
                Edit Portfolio Data
              </button>
              <button onClick={handleChangeTheme}
                className="py-3 px-4 rounded-xl text-sm font-medium border text-white/70 hover:text-white hover:border-white/20 transition-all"
                style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                Change Theme
              </button>
              <button onClick={handleDelete} disabled={deleting}
                className="py-3 px-4 rounded-xl text-sm font-medium border border-red-500/20 text-red-400/70 hover:text-red-400 hover:border-red-500/40 transition-all disabled:opacity-50">
                {deleting ? 'Deleting...' : 'Delete Portfolio'}
              </button>
            </div>

            {/* Data summary */}
            <div className="rounded-2xl p-6 space-y-4"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <h3 className="text-sm font-semibold text-white/60 uppercase tracking-widest">Portfolio Summary</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: 'Skills', count: portfolio.data.skills?.length || 0 },
                  { label: 'Projects', count: portfolio.data.projects?.length || 0 },
                  { label: 'Experience', count: portfolio.data.experience?.length || 0 },
                  { label: 'Education', count: portfolio.data.education?.length || 0 },
                ].map(({ label, count }) => (
                  <div key={label} className="text-center p-3 rounded-xl"
                    style={{ background: 'rgba(124,58,237,0.06)', border: '1px solid rgba(124,58,237,0.12)' }}>
                    <div className="text-2xl font-bold" style={{ color: '#a855f7' }}>{count}</div>
                    <div className="text-xs text-white/40 mt-1">{label}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        ) : (
          /* No portfolio yet */
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-2xl mx-auto mb-5 flex items-center justify-center text-2xl"
              style={{ background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.2)' }}>
              🚀
            </div>
            <h2 className="text-xl font-bold mb-2">No portfolio yet</h2>
            <p className="text-white/40 text-sm mb-8">Build and publish your portfolio to see it here.</p>
            <button onClick={() => navigate('/builder')}
              className="px-8 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:brightness-110"
              style={{ background: 'linear-gradient(135deg,#7c3aed,#a855f7)', boxShadow: '0 0 20px rgba(124,58,237,0.4)' }}>
              Build My Portfolio
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
