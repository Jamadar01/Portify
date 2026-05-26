import { useEffect, useRef } from 'react'
import ContactForm from '../ContactForm'
import TiltCard from '../TiltCard'

function StarField() {
  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return
    const ctx = canvas.getContext('2d'); let animId
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight }
    resize(); window.addEventListener('resize', resize)
    const stars = Array.from({ length: 220 }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3, opacity: Math.random(),
      delta: (Math.random() * 0.008 + 0.002) * (Math.random() > 0.5 ? 1 : -1),
    }))
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      stars.forEach(s => {
        s.opacity += s.delta
        if (s.opacity >= 1 || s.opacity <= 0) s.delta *= -1
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${Math.max(0,Math.min(1,s.opacity))})`; ctx.fill()
      })
      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
}

/* Distant galaxy spirals */
function GalaxySpiral({ left, top, size, opacity }) {
  return (
    <svg style={{ position:'absolute', left, top, opacity, pointerEvents:'none' }} width={size} height={size} viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="2.5" fill="rgba(192,132,252,0.95)" />
      <ellipse cx="50" cy="50" rx="20" ry="8"  fill="none" stroke="rgba(168,85,247,0.55)" strokeWidth="1"   transform="rotate(-35 50 50)" />
      <ellipse cx="50" cy="50" rx="36" ry="14" fill="none" stroke="rgba(168,85,247,0.28)" strokeWidth="0.8" transform="rotate(-35 50 50)" />
      <ellipse cx="50" cy="50" rx="48" ry="18" fill="none" stroke="rgba(168,85,247,0.12)" strokeWidth="0.5" transform="rotate(-35 50 50)" />
    </svg>
  )
}

const GALAXIES = [
  { left:'2%',  top:'40%', size:72, opacity:0.38 },
  { left:'87%', top:'16%', size:56, opacity:0.30 },
  { left:'14%', top:'76%', size:48, opacity:0.24 },
  { left:'79%', top:'66%', size:64, opacity:0.32 },
  { left:'50%', top:'88%', size:44, opacity:0.20 },
]

const AURORA_BANDS = [
  { top:'10%', h:100, c1:'rgba(168,85,247,0.07)', c2:'rgba(99,102,241,0.05)',  delay:'0s',  dur:'15s' },
  { top:'42%', h:80,  c1:'rgba(124,58,237,0.05)', c2:'rgba(192,132,252,0.06)', delay:'5s',  dur:'11s' },
  { top:'68%', h:90,  c1:'rgba(79,70,229,0.06)',  c2:'rgba(168,85,247,0.05)',  delay:'9s',  dur:'18s' },
]

const SHOOTS = [
  { top:'8%',  left:'5%',  dur:'7s',  delay:'0s'  },
  { top:'22%', left:'20%', dur:'9s',  delay:'4s'  },
  { top:'15%', left:'55%', dur:'6s',  delay:'8s'  },
  { top:'35%', left:'70%', dur:'11s', delay:'2s'  },
  { top:'5%',  left:'40%', dur:'8s',  delay:'12s' },
]

/* Planets */
const PLANETS = [
  { size:60,  color:'#7c3aed', ring:true,  top:'12%', right:'8%',  dur:'20s', delay:'0s'  },
  { size:35,  color:'#a855f7', ring:false, top:'55%', left:'4%',   dur:'14s', delay:'3s'  },
  { size:24,  color:'#6366f1', ring:false, top:'70%', right:'15%', dur:'18s', delay:'7s'  },
  { size:16,  color:'#c084fc', ring:false, top:'40%', left:'10%',  dur:'11s', delay:'5s'  },
]

function Planet({ p }) {
  return (
    <div style={{ position:'absolute', top:p.top, left:p.left, right:p.right, width:p.size, height:p.size, pointerEvents:'none' }}>
      <div style={{ width:'100%', height:'100%', borderRadius:'50%', background:`radial-gradient(circle at 35% 35%,${p.color}cc,${p.color}44)`, boxShadow:`0 0 ${p.size/2}px ${p.color}60,inset -4px -4px 8px rgba(0,0,0,0.5)`, animation:`orbFloat ${p.dur} ease-in-out ${p.delay} infinite` }}>
        {p.ring && (
          <div style={{ position:'absolute', top:'40%', left:'-40%', width:'180%', height:'22%', border:`2px solid ${p.color}50`, borderRadius:'50%', transform:'rotateX(70deg)' }} />
        )}
      </div>
    </div>
  )
}

/* Constellation skill display */
function Constellation({ skills }) {
  if (!skills.length) return null
  const count = skills.length
  const W = 600, H = 320, cx = W / 2, cy = H / 2
  const rx = Math.min(cx - 60, 220), ry = Math.min(cy - 40, 130)
  const pts = skills.map((_, i) => ({
    x: cx + rx * Math.cos((2 * Math.PI * i / count) - Math.PI / 2),
    y: cy + ry * Math.sin((2 * Math.PI * i / count) - Math.PI / 2),
  }))

  return (
    <div style={{ position:'relative', width:'100%', maxWidth:640, margin:'0 auto', height:H }}>
      <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%' }} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet">
        {/* connecting lines */}
        {pts.map((p, i) => {
          const next = pts[(i + 1) % count]
          return <line key={i} x1={p.x} y1={p.y} x2={next.x} y2={next.y} stroke="rgba(168,85,247,0.18)" strokeWidth="1" strokeDasharray="4 4" />
        })}
        {/* star nodes */}
        {pts.map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r="14" fill="rgba(168,85,247,0.12)" stroke="rgba(168,85,247,0.5)" strokeWidth="1" />
            <circle cx={p.x} cy={p.y} r="4" fill="#a855f7" />
            <text x={p.x} y={p.y + 28} textAnchor="middle" fill="#e9d5ff" fontSize="11" fontFamily="'Space Grotesk',sans-serif">{skills[i]}</text>
          </g>
        ))}
      </svg>
    </div>
  )
}

function SectionTitle({ children }) {
  return (
    <h2 className="text-center text-2xl font-bold mb-10 tracking-widest uppercase"
      style={{ fontFamily:"'Orbitron',sans-serif",color:'#a855f7',textShadow:'0 0 20px rgba(168,85,247,0.5)' }}>
      {children}
    </h2>
  )
}

export default function Cosmic({ data, slug }) {
  const { name, role, bio, email, skills, experience = [], projects, education = [], socials } = data

  const cardStyle = {
    background:'rgba(255,255,255,0.04)',borderColor:'rgba(168,85,247,0.25)',
    backdropFilter:'blur(10px)',boxShadow:'0 0 30px rgba(124,58,237,0.1)',
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden text-white"
      style={{ width:'100%',background:'radial-gradient(ellipse at top,#1a0533 0%,#050010 50%,#000000 100%)',fontFamily:"'Space Grotesk',sans-serif" }}>

      <div className="absolute inset-0 pointer-events-none"
        style={{ background:'radial-gradient(ellipse 80% 50% at 20% 30%,rgba(120,40,200,0.15) 0%,transparent 70%),radial-gradient(ellipse 60% 40% at 80% 70%,rgba(60,0,160,0.2) 0%,transparent 70%)',animation:'nebulaPulse 8s ease-in-out infinite' }} />
      <StarField />

      {/* shooting stars */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {SHOOTS.map((s, i) => (
          <div key={i} style={{ position:'absolute',top:s.top,left:s.left,height:'1px',background:'linear-gradient(90deg,transparent,rgba(255,255,255,0.9),transparent)',animation:`shootingStar ${s.dur} ease-in ${s.delay} infinite` }} />
        ))}
        {/* extra nebula patches */}
        <div style={{ position:'absolute',top:'20%',right:'6%',width:260,height:260,borderRadius:'50%',background:'radial-gradient(circle,rgba(168,85,247,0.07) 0%,transparent 70%)',filter:'blur(40px)',animation:'orbFloat 13s ease-in-out 3s infinite' }} />
      </div>

      {/* Planets */}
      <div className="absolute inset-0 pointer-events-none">
        {PLANETS.map((p, i) => <Planet key={i} p={p} />)}
      </div>

      {/* Aurora bands */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {AURORA_BANDS.map((a, i) => (
          <div key={i} style={{ position:'absolute', top:a.top, left:'-25%', right:'-25%', height:a.h, background:`linear-gradient(180deg,transparent,${a.c1},${a.c2},transparent)`, filter:'blur(35px)', animation:`auroraShift ${a.dur} ease-in-out ${a.delay} infinite` }} />
        ))}
      </div>

      {/* Distant galaxies */}
      <div className="absolute inset-0 pointer-events-none">
        {GALAXIES.map((g, i) => <GalaxySpiral key={i} {...g} />)}
      </div>

      {/* Extra nebula clouds */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div style={{ position:'absolute', bottom:'5%', left:'10%', width:320, height:200, background:'radial-gradient(ellipse,rgba(124,58,237,0.08) 0%,transparent 70%)', filter:'blur(50px)', animation:'orbFloat 20s ease-in-out 2s infinite' }} />
        <div style={{ position:'absolute', top:'30%', left:'45%', width:240, height:160, background:'radial-gradient(ellipse,rgba(168,85,247,0.06) 0%,transparent 70%)', filter:'blur(40px)', animation:'orbFloat 16s ease-in-out 7s infinite reverse' }} />
        <div style={{ position:'absolute', top:'60%', right:'5%', width:200, height:140, background:'radial-gradient(ellipse,rgba(99,102,241,0.08) 0%,transparent 70%)', filter:'blur(45px)', animation:'nebulaPulse 12s ease-in-out 4s infinite' }} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-12">

        {/* Hero */}
        <header className="text-center py-20">
          {/* orbiting ring around avatar */}
          {data.avatarUrl && (
            <div style={{ position:'relative',width:96,height:96,margin:'0 auto 24px' }}>
              <img src={data.avatarUrl} alt={name} className="w-24 h-24 rounded-full object-cover" style={{ borderColor:'#a855f7',border:'2px solid #a855f7',boxShadow:'0 0 30px rgba(168,85,247,0.6)' }} />
              <div style={{ position:'absolute',inset:-12,borderRadius:'50%',border:'1px dashed rgba(168,85,247,0.3)',animation:'orbitSpin 8s linear infinite' }} />
            </div>
          )}
          <h1 className="text-6xl md:text-7xl font-black mb-4 tracking-tight"
            style={{ fontFamily:"'Orbitron',sans-serif",animation:'heroGlow 3s ease-in-out infinite',background:'linear-gradient(135deg,#ffffff 0%,#c084fc 50%,#7c3aed 100%)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent' }}>
            {name}
          </h1>
          <p className="mb-6 tracking-widest uppercase" style={{ color:'#c084fc',fontFamily:"'Orbitron',sans-serif",fontSize:'13px',letterSpacing:'4px' }}>{role}</p>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed mb-8">{bio}</p>
          <div className="flex justify-center gap-4 flex-wrap">
            {email && <a href={`mailto:${email}`} className="px-6 py-2 rounded-full text-sm border transition-all hover:scale-105" style={{ borderColor:'#7c3aed',color:'#c084fc',background:'rgba(124,58,237,0.1)',boxShadow:'0 0 15px rgba(124,58,237,0.3)' }}>{email}</a>}
            {socials.github && <a href={socials.github} target="_blank" rel="noreferrer" className="px-6 py-2 rounded-full text-sm border transition-all hover:scale-105" style={{ borderColor:'#7c3aed',color:'#c084fc',background:'rgba(124,58,237,0.1)' }}>GitHub</a>}
            {socials.linkedin && <a href={socials.linkedin} target="_blank" rel="noreferrer" className="px-6 py-2 rounded-full text-sm border transition-all hover:scale-105" style={{ borderColor:'#7c3aed',color:'#c084fc',background:'rgba(124,58,237,0.1)' }}>LinkedIn</a>}
            {socials.twitter && <a href={socials.twitter} target="_blank" rel="noreferrer" className="px-6 py-2 rounded-full text-sm border transition-all hover:scale-105" style={{ borderColor:'#7c3aed',color:'#c084fc',background:'rgba(124,58,237,0.1)' }}>Twitter</a>}
          </div>
        </header>

        {/* Skills — constellation */}
        <section className="mb-20">
          <SectionTitle>Skills</SectionTitle>
          <p className="text-center text-gray-500 text-xs mb-6 tracking-widest uppercase">— Constellation Map —</p>
          <Constellation skills={skills} />
        </section>

        {/* Experience */}
        {experience.length > 0 && (
          <section className="mb-20">
            <SectionTitle>Experience</SectionTitle>
            <div className="space-y-6">
              {experience.map((exp, i) => (
                <TiltCard key={i} className="rounded-2xl p-6 border relative overflow-hidden" style={cardStyle} intensity={8}>
                  <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl" style={{ background:'linear-gradient(180deg,#a855f7,#7c3aed)' }} />
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3 pl-2">
                    <div>
                      <h3 className="font-bold text-lg" style={{ color:'#e9d5ff' }}>{exp.role}</h3>
                      <p className="text-sm" style={{ color:'#a855f7' }}>{exp.company}</p>
                    </div>
                    <span className="text-xs px-3 py-1 rounded-full flex-shrink-0" style={{ background:'rgba(168,85,247,0.15)',color:'#c084fc',border:'1px solid rgba(168,85,247,0.3)' }}>{exp.period}</span>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed pl-2">{exp.description}</p>
                </TiltCard>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        <section className="mb-20">
          <SectionTitle>Projects</SectionTitle>
          <div className="grid md:grid-cols-3 gap-6">
            {projects.map((p, i) => (
              <TiltCard key={i} className="rounded-2xl p-6 border" style={cardStyle} intensity={12}>
                <h3 className="font-bold mb-3" style={{ color:'#c084fc',fontFamily:"'Orbitron',sans-serif",fontSize:'13px',letterSpacing:'1px' }}>{p.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">{p.description}</p>
                {p.link && <a href={p.link} target="_blank" rel="noreferrer" className="text-xs uppercase tracking-widest" style={{ color:'#a855f7' }}>View Project →</a>}
              </TiltCard>
            ))}
          </div>
        </section>

        {/* Education */}
        {education.length > 0 && (
          <section className="mb-20">
            <SectionTitle>Education</SectionTitle>
            <div className="grid md:grid-cols-2 gap-6">
              {education.map((edu, i) => (
                <TiltCard key={i} className="rounded-2xl p-6 border flex items-start gap-4" style={cardStyle} intensity={8}>
                  <div className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center text-lg" style={{ background:'rgba(168,85,247,0.15)',border:'1px solid rgba(168,85,247,0.3)' }}>🎓</div>
                  <div>
                    <p className="font-semibold" style={{ color:'#e9d5ff' }}>{edu.degree}</p>
                    <p className="text-sm mt-1" style={{ color:'#a855f7' }}>{edu.institution}</p>
                    <p className="text-xs mt-1" style={{ color:'rgba(168,85,247,0.6)' }}>{edu.year}</p>
                  </div>
                </TiltCard>
              ))}
            </div>
          </section>
        )}

        {/* Contact */}
        <section className="mb-10 text-center">
          <SectionTitle>Contact</SectionTitle>
          <p className="text-gray-400 mb-8">Open to opportunities — let's build something stellar.</p>
          {slug
            ? <ContactForm slug={slug} accentColor="#7c3aed" bgColor="rgba(255,255,255,0.05)" borderColor="rgba(168,85,247,0.25)" textColor="#e9d5ff" />
            : email && <a href={`mailto:${email}`} className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-semibold transition-all hover:scale-105" style={{ background:'linear-gradient(135deg,#7c3aed,#a855f7)',boxShadow:'0 0 30px rgba(124,58,237,0.4)' }}>Say Hello ✉</a>
          }
          <div className="flex justify-center gap-6 mt-8 flex-wrap">
            {socials.github && <a href={socials.github} target="_blank" rel="noreferrer" className="text-sm hover:text-white transition-colors" style={{ color:'#a855f7' }}>GitHub</a>}
            {socials.linkedin && <a href={socials.linkedin} target="_blank" rel="noreferrer" className="text-sm hover:text-white transition-colors" style={{ color:'#a855f7' }}>LinkedIn</a>}
            {socials.twitter && <a href={socials.twitter} target="_blank" rel="noreferrer" className="text-sm hover:text-white transition-colors" style={{ color:'#a855f7' }}>Twitter</a>}
          </div>
        </section>

        <footer className="text-center pb-10 text-gray-700 text-xs">Built with Portify</footer>
      </div>
    </div>
  )
}
