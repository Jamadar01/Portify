import { useEffect, useRef } from 'react'

function ScanlineOverlay() {
  return (
    <div className="pointer-events-none fixed inset-0 z-20 overflow-hidden" style={{ mixBlendMode: 'overlay', opacity: 0.06 }}>
      <div style={{ position: 'absolute', width: '100%', height: '4px', background: 'rgba(0,255,245,0.8)', animation: 'scanline 4s linear infinite' }} />
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)' }} />
    </div>
  )
}

function Divider({ color, label }) {
  return (
    <div className="flex items-center gap-4 mb-10">
      <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, transparent, ${color})` }} />
      <h2 className="text-xl uppercase tracking-widest" style={{ color, fontFamily: "'Share Tech Mono', monospace" }}>{label}</h2>
      <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, ${color}, transparent)` }} />
    </div>
  )
}

export default function Cyberpunk({ data }) {
  const { name, role, bio, email, skills, experience = [], projects, education = [], socials } = data
  const nameRef = useRef(null)
  const cyan = '#00fff5', magenta = '#ff00a0', yellow = '#f0ff00'

  useEffect(() => {
    const el = nameRef.current
    if (!el) return
    let timeout
    const glitch = () => {
      el.style.animation = 'glitch 0.4s steps(1) forwards'
      timeout = setTimeout(() => { el.style.animation = ''; timeout = setTimeout(glitch, Math.random() * 4000 + 2000) }, 400)
    }
    timeout = setTimeout(glitch, 1500)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <div className="relative min-h-screen w-full text-white overflow-hidden"
      style={{ width: '100%', background: '#0a0a0f', fontFamily: "'Rajdhani', sans-serif" }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: `linear-gradient(rgba(0,255,245,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,245,0.04) 1px, transparent 1px)`, backgroundSize: '40px 40px', animation: 'gridMove 3s linear infinite' }} />
      <div className="absolute top-0 left-0 w-32 h-32 pointer-events-none" style={{ borderTop: `2px solid ${cyan}`, borderLeft: `2px solid ${cyan}` }} />
      <div className="absolute top-0 right-0 w-32 h-32 pointer-events-none" style={{ borderTop: `2px solid ${magenta}`, borderRight: `2px solid ${magenta}` }} />
      <div className="absolute bottom-0 left-0 w-32 h-32 pointer-events-none" style={{ borderBottom: `2px solid ${magenta}`, borderLeft: `2px solid ${magenta}` }} />
      <div className="absolute bottom-0 right-0 w-32 h-32 pointer-events-none" style={{ borderBottom: `2px solid ${cyan}`, borderRight: `2px solid ${cyan}` }} />
      <ScanlineOverlay />

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-12">

        {/* Hero */}
        <header className="py-20 text-center">
          <div className="mb-4 text-xs tracking-widest uppercase" style={{ color: cyan }}>{'// SYSTEM ONLINE — PORTFOLIO v2.0'}</div>
          {data.avatarUrl && <img src={data.avatarUrl} alt={name} className="w-24 h-24 rounded mx-auto mb-6 object-cover" style={{ border: `2px solid ${cyan}`, boxShadow: `0 0 30px ${cyan}60` }} />}
          <h1 ref={nameRef} className="text-6xl md:text-8xl font-black mb-3 uppercase tracking-tight"
            style={{ fontFamily: "'Share Tech Mono', monospace", color: yellow, textShadow: `3px 0 0 ${magenta}, -3px 0 0 ${cyan}` }}>
            {name}
          </h1>
          <p className="text-xl uppercase tracking-[0.3em] mb-6" style={{ color: cyan, animation: 'neonFlicker 5s infinite' }}>{role}</p>
          <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed mb-8">{bio}</p>
          <div className="flex justify-center gap-4 flex-wrap">
            {email && <a href={`mailto:${email}`} className="px-6 py-2 text-sm uppercase tracking-widest font-bold transition-all hover:scale-105" style={{ border: `1px solid ${yellow}`, color: yellow, background: 'rgba(240,255,0,0.05)' }}>{email}</a>}
            {socials.github && <a href={socials.github} target="_blank" rel="noreferrer" className="px-6 py-2 text-sm uppercase tracking-widest font-bold transition-all hover:scale-105" style={{ border: `1px solid ${cyan}`, color: cyan, background: 'rgba(0,255,245,0.05)' }}>GitHub</a>}
            {socials.linkedin && <a href={socials.linkedin} target="_blank" rel="noreferrer" className="px-6 py-2 text-sm uppercase tracking-widest font-bold transition-all hover:scale-105" style={{ border: `1px solid ${magenta}`, color: magenta, background: 'rgba(255,0,160,0.05)' }}>LinkedIn</a>}
            {socials.twitter && <a href={socials.twitter} target="_blank" rel="noreferrer" className="px-6 py-2 text-sm uppercase tracking-widest font-bold transition-all hover:scale-105" style={{ border: `1px solid ${yellow}`, color: yellow, background: 'rgba(240,255,0,0.05)' }}>Twitter</a>}
          </div>
        </header>

        {/* Skills */}
        <section className="mb-20">
          <Divider color={cyan} label="<SKILLS/>" />
          <div className="flex flex-wrap justify-center gap-3">
            {skills.map((skill, i) => (
              <span key={i} className="px-4 py-1 text-sm font-bold uppercase tracking-wider"
                style={{ border: `1px solid ${i % 2 === 0 ? cyan : magenta}`, color: i % 2 === 0 ? cyan : magenta, background: i % 2 === 0 ? 'rgba(0,255,245,0.05)' : 'rgba(255,0,160,0.05)', fontFamily: "'Share Tech Mono', monospace" }}>
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* Experience */}
        {experience.length > 0 && (
          <section className="mb-20">
            <Divider color={magenta} label="<EXPERIENCE/>" />
            <div className="space-y-5">
              {experience.map((exp, i) => (
                <div key={i} className="p-6 relative"
                  style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid ${i % 2 === 0 ? 'rgba(0,255,245,0.2)' : 'rgba(255,0,160,0.2)'}` }}>
                  <div className="absolute top-0 left-0 w-1 h-full" style={{ background: i % 2 === 0 ? cyan : magenta }} />
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3 pl-3">
                    <div>
                      <h3 className="font-black text-lg uppercase" style={{ color: yellow }}>{exp.role}</h3>
                      <p className="text-sm uppercase tracking-wider" style={{ color: i % 2 === 0 ? cyan : magenta, fontFamily: "'Share Tech Mono', monospace" }}>{exp.company}</p>
                    </div>
                    <span className="text-xs px-3 py-1 flex-shrink-0" style={{ border: `1px solid ${i % 2 === 0 ? cyan : magenta}40`, color: i % 2 === 0 ? cyan : magenta, fontFamily: "'Share Tech Mono', monospace" }}>
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed pl-3">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        <section className="mb-20">
          <Divider color={cyan} label="<PROJECTS/>" />
          <div className="grid md:grid-cols-3 gap-6">
            {projects.map((p, i) => (
              <div key={i} className="p-6 transition-all hover:scale-105"
                style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid ${i % 2 === 0 ? 'rgba(0,255,245,0.3)' : 'rgba(255,0,160,0.3)'}` }}>
                <div className="text-xs mb-3" style={{ color: cyan, fontFamily: "'Share Tech Mono', monospace" }}>{`// PROJECT_0${i + 1}`}</div>
                <h3 className="text-lg font-black uppercase mb-3" style={{ color: yellow }}>{p.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{p.description}</p>
                {p.link && <a href={p.link} target="_blank" rel="noreferrer" className="text-xs uppercase tracking-widest" style={{ color: cyan, fontFamily: "'Share Tech Mono', monospace" }}>EXECUTE →</a>}
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        {education.length > 0 && (
          <section className="mb-20">
            <Divider color={yellow} label="<EDUCATION/>" />
            <div className="grid md:grid-cols-2 gap-5">
              {education.map((edu, i) => (
                <div key={i} className="p-5 flex items-start gap-4"
                  style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid rgba(240,255,0,0.2)` }}>
                  <div className="text-2xl">📡</div>
                  <div>
                    <p className="font-black uppercase text-sm" style={{ color: yellow }}>{edu.degree}</p>
                    <p className="text-xs mt-1 uppercase tracking-widest" style={{ color: cyan, fontFamily: "'Share Tech Mono', monospace" }}>{edu.institution}</p>
                    <p className="text-xs mt-1" style={{ color: 'rgba(240,255,0,0.5)', fontFamily: "'Share Tech Mono', monospace" }}>{edu.year}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Contact */}
        <section className="mb-10 text-center">
          <Divider color={magenta} label="<CONTACT/>" />
          <p className="text-gray-500 mb-6 uppercase tracking-widest text-sm">// READY TO CONNECT — INITIATE TRANSMISSION</p>
          {email && (
            <a href={`mailto:${email}`} className="inline-block px-8 py-3 font-black uppercase tracking-widest transition-all hover:scale-105"
              style={{ border: `2px solid ${magenta}`, color: magenta, background: 'rgba(255,0,160,0.08)', boxShadow: `0 0 30px rgba(255,0,160,0.3)`, fontFamily: "'Share Tech Mono', monospace" }}>
              SEND MESSAGE ▶
            </a>
          )}
        </section>

        <footer className="text-center pb-10 text-xs uppercase tracking-widest" style={{ color: 'rgba(0,255,245,0.3)', fontFamily: "'Share Tech Mono', monospace" }}>
          {'// BUILT WITH PORTIFY — SYSTEM_END'}
        </footer>
      </div>
    </div>
  )
}
