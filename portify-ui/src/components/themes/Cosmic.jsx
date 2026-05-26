import { useEffect, useRef } from 'react'

function StarField() {
  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight }
    resize()
    window.addEventListener('resize', resize)
    const stars = Array.from({ length: 200 }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.5, opacity: Math.random(),
      delta: (Math.random() * 0.01 + 0.003) * (Math.random() > 0.5 ? 1 : -1),
    }))
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      stars.forEach((s) => {
        s.opacity += s.delta
        if (s.opacity >= 1 || s.opacity <= 0) s.delta *= -1
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${Math.max(0, Math.min(1, s.opacity))})`; ctx.fill()
      })
      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
}

function SectionTitle({ children }) {
  return (
    <h2 className="text-center text-2xl font-bold mb-10 tracking-widest uppercase"
      style={{ fontFamily: "'Orbitron', sans-serif", color: '#a855f7', textShadow: '0 0 20px rgba(168,85,247,0.5)' }}>
      {children}
    </h2>
  )
}

export default function Cosmic({ data }) {
  const { name, role, bio, email, skills, experience = [], projects, education = [], socials } = data

  const cardStyle = {
    background: 'rgba(255,255,255,0.04)',
    borderColor: 'rgba(168,85,247,0.25)',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 0 30px rgba(124,58,237,0.1)',
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden text-white"
      style={{ width: '100%', background: 'radial-gradient(ellipse at top, #1a0533 0%, #050010 50%, #000000 100%)', fontFamily: "'Space Grotesk', sans-serif" }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 50% at 20% 30%, rgba(120,40,200,0.15) 0%, transparent 70%), radial-gradient(ellipse 60% 40% at 80% 70%, rgba(60,0,160,0.2) 0%, transparent 70%)', animation: 'nebulaPulse 8s ease-in-out infinite' }} />
      <StarField />

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-12">

        {/* Hero */}
        <header className="text-center py-20">
          {data.avatarUrl && (
            <img src={data.avatarUrl} alt={name} className="w-24 h-24 rounded-full mx-auto mb-6 border-2 object-cover"
              style={{ borderColor: '#a855f7', boxShadow: '0 0 30px rgba(168,85,247,0.6)' }} />
          )}
          <h1 className="text-6xl md:text-7xl font-black mb-4 tracking-tight"
            style={{ fontFamily: "'Orbitron', sans-serif", animation: 'heroGlow 3s ease-in-out infinite', background: 'linear-gradient(135deg, #ffffff 0%, #c084fc 50%, #7c3aed 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            {name}
          </h1>
          <p className="mb-6 tracking-widest uppercase" style={{ color: '#c084fc', fontFamily: "'Orbitron', sans-serif", fontSize: '13px', letterSpacing: '4px' }}>
            {role}
          </p>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed mb-8">{bio}</p>
          <div className="flex justify-center gap-4 flex-wrap">
            {email && (
              <a href={`mailto:${email}`} className="px-6 py-2 rounded-full text-sm border transition-all hover:scale-105"
                style={{ borderColor: '#7c3aed', color: '#c084fc', background: 'rgba(124,58,237,0.1)', boxShadow: '0 0 15px rgba(124,58,237,0.3)' }}>
                {email}
              </a>
            )}
            {socials.github && <a href={socials.github} target="_blank" rel="noreferrer" className="px-6 py-2 rounded-full text-sm border transition-all hover:scale-105" style={{ borderColor: '#7c3aed', color: '#c084fc', background: 'rgba(124,58,237,0.1)' }}>GitHub</a>}
            {socials.linkedin && <a href={socials.linkedin} target="_blank" rel="noreferrer" className="px-6 py-2 rounded-full text-sm border transition-all hover:scale-105" style={{ borderColor: '#7c3aed', color: '#c084fc', background: 'rgba(124,58,237,0.1)' }}>LinkedIn</a>}
            {socials.twitter && <a href={socials.twitter} target="_blank" rel="noreferrer" className="px-6 py-2 rounded-full text-sm border transition-all hover:scale-105" style={{ borderColor: '#7c3aed', color: '#c084fc', background: 'rgba(124,58,237,0.1)' }}>Twitter</a>}
          </div>
        </header>

        {/* Skills */}
        <section className="mb-20">
          <SectionTitle>Skills</SectionTitle>
          <div className="flex flex-wrap justify-center gap-3">
            {skills.map((skill, i) => (
              <span key={i} className="px-4 py-2 rounded-full text-sm font-medium border"
                style={{ borderColor: 'rgba(168,85,247,0.4)', background: 'rgba(168,85,247,0.1)', color: '#e9d5ff', boxShadow: '0 0 10px rgba(168,85,247,0.2)' }}>
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* Experience */}
        {experience.length > 0 && (
          <section className="mb-20">
            <SectionTitle>Experience</SectionTitle>
            <div className="space-y-6">
              {experience.map((exp, i) => (
                <div key={i} className="rounded-2xl p-6 border relative overflow-hidden"
                  style={cardStyle}>
                  <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl" style={{ background: 'linear-gradient(180deg, #a855f7, #7c3aed)' }} />
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3 pl-2">
                    <div>
                      <h3 className="font-bold text-lg" style={{ color: '#e9d5ff' }}>{exp.role}</h3>
                      <p className="text-sm" style={{ color: '#a855f7' }}>{exp.company}</p>
                    </div>
                    <span className="text-xs px-3 py-1 rounded-full flex-shrink-0"
                      style={{ background: 'rgba(168,85,247,0.15)', color: '#c084fc', border: '1px solid rgba(168,85,247,0.3)' }}>
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed pl-2">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        <section className="mb-20">
          <SectionTitle>Projects</SectionTitle>
          <div className="grid md:grid-cols-3 gap-6">
            {projects.map((p, i) => (
              <div key={i} className="rounded-2xl p-6 border transition-all hover:scale-105 hover:-translate-y-1" style={cardStyle}>
                <h3 className="font-bold mb-3" style={{ color: '#c084fc', fontFamily: "'Orbitron', sans-serif", fontSize: '13px', letterSpacing: '1px' }}>
                  {p.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">{p.description}</p>
                {p.link && <a href={p.link} target="_blank" rel="noreferrer" className="text-xs uppercase tracking-widest" style={{ color: '#a855f7' }}>View Project →</a>}
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        {education.length > 0 && (
          <section className="mb-20">
            <SectionTitle>Education</SectionTitle>
            <div className="grid md:grid-cols-2 gap-6">
              {education.map((edu, i) => (
                <div key={i} className="rounded-2xl p-6 border flex items-start gap-4" style={cardStyle}>
                  <div className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center text-lg"
                    style={{ background: 'rgba(168,85,247,0.15)', border: '1px solid rgba(168,85,247,0.3)' }}>
                    🎓
                  </div>
                  <div>
                    <p className="font-semibold" style={{ color: '#e9d5ff' }}>{edu.degree}</p>
                    <p className="text-sm mt-1" style={{ color: '#a855f7' }}>{edu.institution}</p>
                    <p className="text-xs mt-1" style={{ color: 'rgba(168,85,247,0.6)' }}>{edu.year}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Contact */}
        <section className="mb-10 text-center">
          <SectionTitle>Contact</SectionTitle>
          <p className="text-gray-400 mb-6">Open to opportunities — let's build something stellar.</p>
          {email && (
            <a href={`mailto:${email}`}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-semibold transition-all hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #a855f7)', boxShadow: '0 0 30px rgba(124,58,237,0.4)' }}>
              Say Hello ✉
            </a>
          )}
          <div className="flex justify-center gap-6 mt-8 flex-wrap">
            {socials.github && <a href={socials.github} target="_blank" rel="noreferrer" className="text-sm hover:text-white transition-colors" style={{ color: '#a855f7' }}>GitHub</a>}
            {socials.linkedin && <a href={socials.linkedin} target="_blank" rel="noreferrer" className="text-sm hover:text-white transition-colors" style={{ color: '#a855f7' }}>LinkedIn</a>}
            {socials.twitter && <a href={socials.twitter} target="_blank" rel="noreferrer" className="text-sm hover:text-white transition-colors" style={{ color: '#a855f7' }}>Twitter</a>}
          </div>
        </section>

        <footer className="text-center pb-10 text-gray-700 text-xs">Built with Portify</footer>
      </div>
    </div>
  )
}
