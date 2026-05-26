import { useState } from 'react'
import { useParams, useNavigate, useSearchParams } from 'react-router-dom'
import { usePortfolioStore } from '../lib/portfolioStore'
import { defaultData } from '../lib/portfolioStore'
import { useAuthStore } from '../lib/authStore'
import { api } from '../lib/api'
import AuthModal from '../components/AuthModal'
import Cosmic from '../components/themes/Cosmic'
import Cyberpunk from '../components/themes/Cyberpunk'
import DeepOcean from '../components/themes/DeepOcean'
import MinimalPaper from '../components/themes/MinimalPaper'

const THEMES = {
  cosmic: Cosmic,
  cyberpunk: Cyberpunk,
  deepocean: DeepOcean,
  minimalpaper: MinimalPaper,
}

const THEME_LABELS = {
  cosmic: '🌌 Cosmic',
  cyberpunk: '⚡ Cyberpunk',
  deepocean: '🌊 Deep Ocean',
  minimalpaper: '📄 Minimal Paper',
}

export default function Preview() {
  const { theme } = useParams()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const isDemo = searchParams.get('demo') === 'true'

  const { data, setStep, setTheme } = usePortfolioStore()
  const { token, user } = useAuthStore()

  const [showAuth, setShowAuth] = useState(false)
  const [publishing, setPublishing] = useState(false)
  const [published, setPublished] = useState(null)
  const [copyLabel, setCopyLabel] = useState('Copy Link')

  const ThemeComponent = THEMES[theme]
  if (!ThemeComponent) {
    return (
      <div className="min-h-screen flex items-center justify-center"
        style={{ background: '#070810', color: '#fff', fontFamily: "'Space Grotesk', sans-serif" }}>
        <div className="text-center">
          <p className="text-white/50 mb-4">Theme not found.</p>
          <button onClick={() => navigate('/')} className="text-violet-400 hover:text-violet-300">← Go Home</button>
        </div>
      </div>
    )
  }

  const handleUseTheme = () => {
    setTheme(theme)
    setStep(2)
    navigate('/builder')
  }

  async function handlePublish() {
    if (!token) { setShowAuth(true); return }
    setPublishing(true)
    try {
      const res = await api.portfolio.save(theme, data)
      setPublished(res.portfolio.slug)
    } catch (err) {
      alert(err.message)
    } finally {
      setPublishing(false)
    }
  }

  function copyPublicLink() {
    const url = `${window.location.origin}/p/${published}`
    navigator.clipboard.writeText(url).then(() => {
      setCopyLabel('Copied!')
      setTimeout(() => setCopyLabel('Copy Link'), 2000)
    })
  }

  const previewData = isDemo ? defaultData : data

  return (
    <div className="min-h-screen w-full flex flex-col" style={{ width: '100%' }}>

      {showAuth && (
        <AuthModal
          onClose={() => setShowAuth(false)}
          onSuccess={() => { setShowAuth(false); handlePublish() }}
        />
      )}

      {/* Toolbar */}
      <div
        className="sticky top-0 z-50 flex items-center justify-between px-6 py-3"
        style={{
          background: '#0d0f1a',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          fontFamily: "'Space Grotesk', sans-serif",
          minHeight: '52px',
        }}
      >
        {/* Left */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(isDemo ? '/' : '/builder')}
            className="flex items-center gap-1.5 text-sm text-white/40 hover:text-white transition-colors"
          >
            ← {isDemo ? 'All Themes' : 'Edit'}
          </button>

          <span className="text-white/10">|</span>
          <span className="text-sm text-white/60 font-medium">{THEME_LABELS[theme]}</span>

          {isDemo && (
            <span className="text-xs px-2.5 py-0.5 rounded-full font-medium"
              style={{ background: 'rgba(168,85,247,0.15)', color: '#c084fc', border: '1px solid rgba(168,85,247,0.2)' }}>
              Sample Data
            </span>
          )}
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          {isDemo ? (
            <>
              <button
                onClick={() => navigate('/')}
                className="px-4 py-1.5 rounded-lg text-xs border text-white/50 hover:text-white hover:border-white/30 transition-all"
                style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                ← Change Theme
              </button>
              <button
                onClick={handleUseTheme}
                className="px-5 py-1.5 rounded-lg text-xs font-semibold text-white transition-all hover:brightness-110 hover:scale-105"
                style={{ background: 'linear-gradient(135deg,#7c3aed,#a855f7)', boxShadow: '0 0 16px rgba(124,58,237,0.4)' }}>
                Use This Theme →
              </button>
            </>
          ) : published ? (
            <>
              <span className="text-xs text-green-400">Published!</span>
              <button onClick={copyPublicLink}
                className="px-4 py-1.5 rounded-lg text-xs border text-white/50 hover:text-white hover:border-white/30 transition-all"
                style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                {copyLabel}
              </button>
              <button onClick={() => navigate('/dashboard')}
                className="px-4 py-1.5 rounded-lg text-xs font-semibold text-white transition-all hover:brightness-110"
                style={{ background: 'linear-gradient(135deg,#7c3aed,#a855f7)' }}>
                My Dashboard →
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate('/builder')}
                className="px-4 py-1.5 rounded-lg text-xs border text-white/50 hover:text-white hover:border-white/30 transition-all"
                style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                Change Theme
              </button>
              <button
                onClick={handlePublish}
                disabled={publishing}
                className="px-5 py-1.5 rounded-lg text-xs font-semibold text-white transition-all hover:brightness-110 disabled:opacity-60"
                style={{ background: 'linear-gradient(135deg,#7c3aed,#a855f7)', boxShadow: '0 0 16px rgba(124,58,237,0.4)' }}>
                {publishing ? 'Publishing...' : token ? 'Publish Portfolio' : 'Publish Portfolio'}
              </button>
            </>
          )}
        </div>
      </div>

      {/* Demo mode banner */}
      {isDemo && (
        <div className="text-center py-2 text-xs"
          style={{ background: 'rgba(124,58,237,0.08)', borderBottom: '1px solid rgba(124,58,237,0.12)', color: '#a78bfa', fontFamily: "'Space Grotesk', sans-serif" }}>
          Previewing with sample portfolio data — your real data will appear after you fill in the form
        </div>
      )}

      {/* Published banner */}
      {published && (
        <div className="text-center py-2 text-xs"
          style={{ background: 'rgba(34,197,94,0.08)', borderBottom: '1px solid rgba(34,197,94,0.15)', color: '#86efac', fontFamily: "'Space Grotesk', sans-serif" }}>
          Your portfolio is live at{' '}
          <a href={`/p/${published}`} target="_blank" rel="noreferrer" className="underline hover:text-green-300">
            {window.location.origin}/p/{published}
          </a>
        </div>
      )}

      {/* Theme render */}
      <div className="flex-1">
        <ThemeComponent data={previewData} />
      </div>
    </div>
  )
}
