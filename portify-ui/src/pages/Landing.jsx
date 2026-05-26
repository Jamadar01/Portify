import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePortfolioStore } from '../lib/portfolioStore'
import { useAuthStore } from '../lib/authStore'
import AuthModal from '../components/AuthModal'

const themes = [
  {
    id: 'cosmic',
    name: 'Cosmic',
    tagline: 'Dark space, stars & nebula',
    preview: 'linear-gradient(135deg, #050010 0%, #1a0533 50%, #2d0050 100%)',
    accent: '#a855f7',
    emoji: '🌌',
    tags: ['Dark', 'Glow', 'Space'],
    stars: [
      { x: '15%', y: '20%' }, { x: '75%', y: '15%' }, { x: '45%', y: '35%' },
      { x: '85%', y: '60%' }, { x: '25%', y: '70%' }, { x: '60%', y: '80%' },
    ],
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk',
    tagline: 'Neon, glitch & grid lines',
    preview: 'linear-gradient(135deg, #0a0a0f 0%, #0f0020 50%, #001a0f 100%)',
    accent: '#00fff5',
    emoji: '⚡',
    tags: ['Neon', 'Glitch', 'Grid'],
    gridLines: true,
  },
  {
    id: 'deepocean',
    name: 'Deep Ocean',
    tagline: 'Bioluminescence & fluid depth',
    preview: 'linear-gradient(160deg, #0a0e2e 0%, #0a2040 60%, #063b4f 100%)',
    accent: '#00e5cc',
    emoji: '🌊',
    tags: ['Dark', 'Fluid', 'Glow'],
  },
  {
    id: 'minimalpaper',
    name: 'Minimal Paper',
    tagline: 'Clean, elegant & timeless',
    preview: 'linear-gradient(135deg, #faf8f5 0%, #f0ece5 100%)',
    accent: '#8b6914',
    emoji: '📄',
    tags: ['Light', 'Clean', 'Serif'],
    light: true,
  },
]

export default function Landing() {
  const navigate = useNavigate()
  const { setTheme, setStep } = usePortfolioStore()
  const { token, user, logout } = useAuthStore()
  const [showAuth, setShowAuth] = useState(false)
  const [showMenu, setShowMenu] = useState(false)

  const initials = user?.name
    ? user.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
    : '?'

  const handleSelect = (id) => {
    setTheme(id)
    setStep(2)
    navigate('/builder')
  }

  const handlePreview = (id) => {
    navigate(`/preview/${id}?demo=true`)
  }

  return (
    <div
      className="min-h-screen w-full"
      style={{ width: '100%', background: '#070810', fontFamily: "'Space Grotesk', sans-serif", color: '#fff' }}
    >
      {showAuth && (
        <AuthModal onClose={() => setShowAuth(false)} onSuccess={() => setShowAuth(false)} />
      )}

      {/* Header */}
      <header className="flex items-center justify-between px-8 py-6 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm"
            style={{ background: 'linear-gradient(135deg, #7c3aed, #a855f7)' }}>
            P
          </div>
          <span className="font-bold text-lg tracking-tight">Portify</span>
        </div>

        <nav className="hidden md:flex gap-8 text-sm text-white/50">
          <a href="#themes" className="hover:text-white transition-colors">Themes</a>
          <a href="#how" className="hover:text-white transition-colors">How it works</a>
        </nav>

        {/* Auth area */}
        {token ? (
          <div className="relative">
            <button
              onClick={() => setShowMenu(v => !v)}
              className="flex items-center gap-2.5 px-3 py-1.5 rounded-full transition-all hover:bg-white/5"
              style={{ border: '1px solid rgba(255,255,255,0.1)' }}
            >
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                style={{ background: 'linear-gradient(135deg,#7c3aed,#a855f7)', color: '#fff' }}>
                {initials}
              </div>
              <span className="text-sm text-white/80 hidden sm:block max-w-[120px] truncate">
                {user?.name || 'Account'}
              </span>
              <span className="text-white/30 text-xs">{showMenu ? '▲' : '▼'}</span>
            </button>

            {showMenu && (
              <>
                {/* backdrop */}
                <div className="fixed inset-0 z-10" onClick={() => setShowMenu(false)} />
                <div className="absolute right-0 mt-2 w-48 rounded-xl overflow-hidden z-20"
                  style={{ background: '#131520', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 16px 40px rgba(0,0,0,0.5)' }}>
                  <div className="px-4 py-3 border-b border-white/5">
                    <p className="text-xs font-semibold text-white truncate">{user?.name}</p>
                    <p className="text-xs text-white/30 truncate mt-0.5">{user?.email}</p>
                  </div>
                  <button onClick={() => { setShowMenu(false); navigate('/dashboard') }}
                    className="w-full text-left px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors flex items-center gap-2">
                    <span>🗂</span> My Dashboard
                  </button>
                  <button onClick={() => { setShowMenu(false); navigate('/builder') }}
                    className="w-full text-left px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors flex items-center gap-2">
                    <span>✏️</span> Edit Portfolio
                  </button>
                  <div className="border-t border-white/5">
                    <button onClick={() => { setShowMenu(false); logout() }}
                      className="w-full text-left px-4 py-2.5 text-sm text-red-400/70 hover:text-red-400 hover:bg-red-400/5 transition-colors flex items-center gap-2">
                      <span>→</span> Sign Out
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        ) : (
          <button
            onClick={() => setShowAuth(true)}
            className="px-4 py-2 rounded-full text-sm font-medium transition-all hover:brightness-110"
            style={{ background: 'linear-gradient(135deg,#7c3aed,#a855f7)', color: '#fff' }}>
            Sign In
          </button>
        )}
      </header>

      {/* Hero */}
      <section className="text-center px-6 pt-24 pb-20">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs mb-8 border"
          style={{ borderColor: 'rgba(168,85,247,0.3)', background: 'rgba(168,85,247,0.08)', color: '#c084fc' }}>
          <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
          4 stunning themes · AI resume parsing · Instant preview
        </div>
        <h1
          className="text-5xl md:text-7xl font-black mb-6 leading-tight"
          style={{
            background: 'linear-gradient(135deg, #fff 0%, #c084fc 60%, #7c3aed 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-2px',
          }}
        >
          Your Portfolio,<br />Your Universe.
        </h1>
        <p className="text-white/50 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
          Pick a theme, paste your resume or fill in your details, and get a beautiful portfolio site in under a minute.
        </p>
        <a href="#themes"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-sm transition-all hover:scale-105 hover:brightness-110"
          style={{ background: 'linear-gradient(135deg, #7c3aed, #a855f7)', boxShadow: '0 0 30px rgba(124,58,237,0.4)' }}>
          Choose a Theme
          <span>↓</span>
        </a>
      </section>

      {/* Theme Picker */}
      <section id="themes" className="px-6 pb-24 max-w-6xl mx-auto">
        <h2 className="text-center text-2xl font-bold mb-3 text-white/80">Pick your vibe</h2>
        <p className="text-center text-white/30 text-sm mb-12">Click any theme to start building</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {themes.map((t) => (
            <div
              key={t.id}
              className="group relative rounded-2xl overflow-hidden transition-all hover:scale-105 hover:-translate-y-1"
              style={{
                border: `1px solid rgba(255,255,255,0.08)`,
                boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
              }}
            >
              {/* Preview window */}
              <div className="relative h-48 overflow-hidden" style={{ background: t.preview }}>
                {/* Grid lines for cyberpunk */}
                {t.gridLines && (
                  <div className="absolute inset-0"
                    style={{
                      backgroundImage: `linear-gradient(rgba(0,255,245,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,245,0.08) 1px, transparent 1px)`,
                      backgroundSize: '20px 20px',
                    }} />
                )}
                {/* Stars for cosmic */}
                {t.stars?.map((s, i) => (
                  <div key={i} className="absolute w-1 h-1 rounded-full bg-white"
                    style={{ left: s.x, top: s.y, opacity: 0.6, boxShadow: `0 0 4px white` }} />
                ))}
                {/* Mock skeleton content */}
                <div className="absolute inset-0 flex flex-col justify-center items-center gap-2 p-4">
                  <div className="w-10 h-10 rounded-full"
                    style={{ background: `${t.accent}30`, border: `2px solid ${t.accent}60` }} />
                  <div className="h-2 w-20 rounded"
                    style={{ background: t.light ? '#0d0d0d20' : '#ffffff20' }} />
                  <div className="h-1.5 w-28 rounded"
                    style={{ background: t.light ? `${t.accent}60` : `${t.accent}80` }} />
                  <div className="flex gap-2 mt-2">
                    {[40, 28, 36].map((w, i) => (
                      <div key={i} className="h-1 rounded" style={{ width: `${w}px`, background: t.light ? '#0d0d0d15' : '#ffffff15' }} />
                    ))}
                  </div>
                </div>

                {/* Hover overlay — two actions */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-200"
                  style={{ background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(2px)' }}>
                  <button
                    onClick={() => handlePreview(t.id)}
                    className="px-5 py-2 rounded-full text-sm font-semibold text-white transition-all hover:bg-white/20 hover:scale-105"
                    style={{ border: '1px solid rgba(255,255,255,0.4)' }}>
                    👁 Live Preview
                  </button>
                  <button
                    onClick={() => handleSelect(t.id)}
                    className="px-5 py-2 rounded-full text-sm font-semibold text-white transition-all hover:scale-105"
                    style={{ background: t.accent, boxShadow: `0 0 20px ${t.accent}60` }}>
                    Use This Theme →
                  </button>
                </div>
              </div>

              {/* Card info */}
              <div className="p-4" style={{ background: '#0e1117' }}>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-white">{t.emoji} {t.name}</span>
                  <button
                    onClick={() => handlePreview(t.id)}
                    className="text-xs px-2 py-0.5 rounded-full transition-all hover:opacity-80"
                    style={{ background: `${t.accent}15`, color: t.accent }}>
                    Preview
                  </button>
                </div>
                <p className="text-xs text-white/40 mb-3">{t.tagline}</p>
                <div className="flex gap-1.5 flex-wrap">
                  {t.tags.map((tag) => (
                    <span key={tag} className="text-xs px-2 py-0.5 rounded-full"
                      style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.4)' }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="px-6 pb-24 max-w-4xl mx-auto">
        <h2 className="text-center text-2xl font-bold mb-12 text-white/80">How it works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { step: '01', title: 'Choose a theme', desc: 'Pick from 4 hand-crafted themes that match your personality.' },
            { step: '02', title: 'Add your details', desc: 'Upload your resume PDF for AI parsing, or fill in the form manually.' },
            { step: '03', title: 'Preview & share', desc: 'See your live portfolio instantly. Copy the link or download it.' },
          ].map((s) => (
            <div key={s.step} className="text-center">
              <div className="text-4xl font-black mb-3"
                style={{ background: 'linear-gradient(135deg, #7c3aed, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                {s.step}
              </div>
              <h3 className="font-bold text-white mb-2">{s.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="text-center pb-10 border-t border-white/5 pt-8">
        <p className="text-white/20 text-sm">Portify — Build your portfolio in minutes</p>
      </footer>
    </div>
  )
}
