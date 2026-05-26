import { useState, useRef } from 'react'
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

/* Floating background particles */
const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  size: Math.random() * 4 + 2,
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  delay: `${Math.random() * 6}s`,
  duration: `${Math.random() * 6 + 5}s`,
  color: i % 3 === 0 ? 'rgba(168,85,247,0.5)' : i % 3 === 1 ? 'rgba(99,102,241,0.4)' : 'rgba(236,72,153,0.3)',
}))

/* 3-D tilt card */
function TiltCard({ children, className, style }) {
  const ref = useRef(null)
  const [tiltStyle, setTiltStyle] = useState({})
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 })

  function onMove(e) {
    const card = ref.current
    if (!card) return
    const r = card.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width
    const y = (e.clientY - r.top) / r.height
    const rX = (0.5 - y) * 18
    const rY = (x - 0.5) * 18
    setTiltStyle({
      transform: `perspective(900px) rotateX(${rX}deg) rotateY(${rY}deg) scale3d(1.04,1.04,1.04)`,
      transition: 'transform 0.08s linear',
    })
    setGlare({ x: x * 100, y: y * 100, opacity: 0.18 })
  }

  function onLeave() {
    setTiltStyle({ transform: 'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)', transition: 'transform 0.45s ease' })
    setGlare(g => ({ ...g, opacity: 0 }))
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{ ...style, ...tiltStyle, transformStyle: 'preserve-3d', willChange: 'transform' }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {/* glare layer */}
      <div style={{
        position: 'absolute', inset: 0, borderRadius: 'inherit', pointerEvents: 'none', zIndex: 10,
        background: `radial-gradient(ellipse at ${glare.x}% ${glare.y}%, rgba(255,255,255,${glare.opacity}) 0%, transparent 65%)`,
        transition: 'opacity 0.3s ease',
      }} />
      {children}
    </div>
  )
}

export default function Landing() {
  const navigate = useNavigate()
  const { setTheme, setStep } = usePortfolioStore()
  const { token, user, logout } = useAuthStore()
  const [showAuth, setShowAuth] = useState(false)
  const [showMenu, setShowMenu] = useState(false)

  const initials = user?.name
    ? user.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
    : '?'

  const handleSelect = (id) => { setTheme(id); setStep(2); navigate('/builder') }
  const handlePreview = (id) => navigate(`/preview/${id}?demo=true`)

  return (
    <div className="min-h-screen w-full relative overflow-hidden"
      style={{ width: '100%', background: '#070810', fontFamily: "'Space Grotesk', sans-serif", color: '#fff' }}>

      {showAuth && <AuthModal onClose={() => setShowAuth(false)} onSuccess={() => setShowAuth(false)} />}

      {/* ── Background layer ── */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        {/* dot grid */}
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(rgba(168,85,247,0.18) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }} />

        {/* large floating orbs */}
        <div style={{ position: 'absolute', top: '8%', left: '5%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)', filter: 'blur(60px)', animation: 'orbFloat 14s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', top: '50%', right: '3%', width: 380, height: 380, borderRadius: '50%', background: 'radial-gradient(circle, rgba(168,85,247,0.1) 0%, transparent 70%)', filter: 'blur(50px)', animation: 'orbFloat 10s ease-in-out 3s infinite reverse' }} />
        <div style={{ position: 'absolute', bottom: '10%', left: '35%', width: 320, height: 320, borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)', filter: 'blur(55px)', animation: 'orbFloat 16s ease-in-out 6s infinite' }} />
        <div style={{ position: 'absolute', top: '30%', left: '55%', width: 260, height: 260, borderRadius: '50%', background: 'radial-gradient(circle, rgba(236,72,153,0.07) 0%, transparent 70%)', filter: 'blur(45px)', animation: 'driftX 12s ease-in-out 2s infinite' }} />

        {/* floating particles */}
        {PARTICLES.map(p => (
          <div key={p.id} style={{
            position: 'absolute', left: p.left, top: p.top,
            width: p.size, height: p.size, borderRadius: '50%',
            background: p.color,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
            animation: `floatY ${p.duration} ease-in-out ${p.delay} infinite`,
          }} />
        ))}

        {/* corner accent lines */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: 180, height: 180, borderTop: '1px solid rgba(124,58,237,0.2)', borderLeft: '1px solid rgba(124,58,237,0.2)' }} />
        <div style={{ position: 'absolute', bottom: 0, right: 0, width: 180, height: 180, borderBottom: '1px solid rgba(168,85,247,0.2)', borderRight: '1px solid rgba(168,85,247,0.2)' }} />
      </div>

      {/* ── Content ── */}
      <div className="relative" style={{ zIndex: 1 }}>

        {/* Header */}
        <header className="flex items-center justify-between px-8 py-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #a855f7)' }}>P</div>
            <span className="font-bold text-lg tracking-tight">Portify</span>
          </div>

          <nav className="hidden md:flex gap-8 text-sm text-white/50">
            <a href="#themes" className="hover:text-white transition-colors">Themes</a>
            <a href="#how" className="hover:text-white transition-colors">How it works</a>
          </nav>

          {/* Auth area */}
          {token ? (
            <div className="relative">
              <button onClick={() => setShowMenu(v => !v)}
                className="flex items-center gap-2.5 px-3 py-1.5 rounded-full transition-all hover:bg-white/5"
                style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{ background: 'linear-gradient(135deg,#7c3aed,#a855f7)', color: '#fff' }}>
                  {initials}
                </div>
                <span className="text-sm text-white/80 hidden sm:block max-w-[120px] truncate">{user?.name || 'Account'}</span>
                <span className="text-white/30 text-xs">{showMenu ? '▲' : '▼'}</span>
              </button>
              {showMenu && (
                <>
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
            <button onClick={() => setShowAuth(true)}
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
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight"
            style={{
              background: 'linear-gradient(135deg, #fff 0%, #c084fc 60%, #7c3aed 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-2px',
            }}>
            Your Portfolio,<br />Your Universe.
          </h1>
          <p className="text-white/50 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            Pick a theme, paste your resume or fill in your details, and get a beautiful portfolio site in under a minute.
          </p>
          <a href="#themes"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-sm transition-all hover:scale-105 hover:brightness-110"
            style={{ background: 'linear-gradient(135deg, #7c3aed, #a855f7)', boxShadow: '0 0 30px rgba(124,58,237,0.4)' }}>
            Choose a Theme <span>↓</span>
          </a>
        </section>

        {/* Theme Picker */}
        <section id="themes" className="px-6 pb-24 max-w-6xl mx-auto">
          <h2 className="text-center text-2xl font-bold mb-3 text-white/80">Pick your vibe</h2>
          <p className="text-center text-white/30 text-sm mb-12">Hover to feel it · Click to build</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {themes.map((t) => (
              <TiltCard
                key={t.id}
                className="group relative rounded-2xl overflow-hidden cursor-pointer"
                style={{ border: `1px solid rgba(255,255,255,0.08)`, boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }}
              >
                {/* Preview window */}
                <div className="relative h-48 overflow-hidden" style={{ background: t.preview }}>
                  {t.gridLines && (
                    <div className="absolute inset-0" style={{
                      backgroundImage: `linear-gradient(rgba(0,255,245,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,245,0.08) 1px, transparent 1px)`,
                      backgroundSize: '20px 20px',
                    }} />
                  )}
                  {t.stars?.map((s, i) => (
                    <div key={i} className="absolute w-1 h-1 rounded-full bg-white"
                      style={{ left: s.x, top: s.y, opacity: 0.6, boxShadow: '0 0 4px white' }} />
                  ))}
                  {/* floating ring accent */}
                  <div className="absolute" style={{
                    bottom: -20, right: -20, width: 100, height: 100, borderRadius: '50%',
                    border: `1px solid ${t.accent}30`, animation: 'orbFloat 6s ease-in-out infinite',
                  }} />
                  <div className="absolute" style={{
                    top: -10, left: -10, width: 70, height: 70, borderRadius: '50%',
                    border: `1px solid ${t.accent}20`, animation: 'orbFloat 8s ease-in-out 1s infinite reverse',
                  }} />

                  {/* Mock content */}
                  <div className="absolute inset-0 flex flex-col justify-center items-center gap-2 p-4">
                    <div className="w-10 h-10 rounded-full"
                      style={{ background: `${t.accent}30`, border: `2px solid ${t.accent}60`, boxShadow: `0 0 16px ${t.accent}40` }} />
                    <div className="h-2 w-20 rounded" style={{ background: t.light ? '#0d0d0d20' : '#ffffff20' }} />
                    <div className="h-1.5 w-28 rounded" style={{ background: t.light ? `${t.accent}60` : `${t.accent}80` }} />
                    <div className="flex gap-2 mt-2">
                      {[40, 28, 36].map((w, i) => (
                        <div key={i} className="h-1 rounded" style={{ width: `${w}px`, background: t.light ? '#0d0d0d15' : '#ffffff15' }} />
                      ))}
                    </div>
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-200"
                    style={{ background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(2px)' }}>
                    <button onClick={() => handlePreview(t.id)}
                      className="px-5 py-2 rounded-full text-sm font-semibold text-white transition-all hover:bg-white/20 hover:scale-105"
                      style={{ border: '1px solid rgba(255,255,255,0.4)' }}>
                      👁 Live Preview
                    </button>
                    <button onClick={() => handleSelect(t.id)}
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
                    <button onClick={() => handlePreview(t.id)}
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
              </TiltCard>
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
              { step: '03', title: 'Preview & share', desc: 'See your live portfolio instantly. Copy the link or share it anywhere.' },
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
    </div>
  )
}
