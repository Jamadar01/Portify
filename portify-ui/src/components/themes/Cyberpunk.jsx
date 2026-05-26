import { useEffect, useRef } from 'react'
import ContactForm from '../ContactForm'
import TiltCard from '../TiltCard'

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

/* pre-generated binary stream columns */
const DATA_COLS = Array.from({ length: 7 }, (_, i) => ({
  left: `${4 + i * 14}%`,
  delay: `${i * 1.1}s`,
  dur: `${7 + i * 0.9}s`,
  digits: Array.from({ length: 16 }, (__, j) => ((i * 7 + j * 3) % 2 === 0 ? '1' : '0')).join(' '),
}))

function DataStream() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {DATA_COLS.map((col, i) => (
        <div key={i} style={{
          position: 'absolute', left: col.left, top: 0,
          fontFamily: "'Share Tech Mono',monospace", fontSize: 10,
          color: i % 2 === 0 ? 'rgba(0,255,245,0.18)' : 'rgba(255,0,160,0.18)',
          lineHeight: 2, letterSpacing: '2px',
          animation: `dataScroll ${col.dur} linear ${col.delay} infinite`,
        }}>
          {col.digits.split(' ').map((d, j) => <div key={j}>{d}</div>)}
        </div>
      ))}
    </div>
  )
}

function CircuitChip({ skill, i }) {
  const colors = ['#00fff5', '#ff00a0', '#f0ff00']
  const color = colors[i % 3]
  return (
    <div className="cursor-default group flex flex-col items-center gap-2">
      <div style={{
        position: 'relative', width: 76, height: 66,
        clipPath: 'polygon(25% 0%,75% 0%,100% 50%,75% 100%,25% 100%,0% 50%)',
        background: color,
        animation: `neonPulse ${2 + (i % 3) * 0.7}s ease-in-out ${i * 0.18}s infinite`,
        filter: `drop-shadow(0 0 5px ${color}80)`,
        transition: 'filter 0.2s',
      }}>
        <div style={{
          position: 'absolute', inset: 2,
          clipPath: 'polygon(25% 0%,75% 0%,100% 50%,75% 100%,25% 100%,0% 50%)',
          background: '#0a0a0f',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{ width: 16, height: 16, border: `1px solid ${color}`, transform: 'rotate(45deg)', boxShadow: `0 0 8px ${color}80` }} />
        </div>
      </div>
      <span style={{ fontSize: 9, color, fontFamily: "'Share Tech Mono',monospace", fontWeight: 700, textAlign: 'center', maxWidth: 80, lineHeight: 1.3, textTransform: 'uppercase', letterSpacing: '1px' }}>
        {skill}
      </span>
    </div>
  )
}

/* circuit board traces */
function CircuitTraces() {
  const cyan = '#00fff5', magenta = '#ff00a0'
  const nodes = [[140,80],[300,100],[460,80],[620,120],[780,80],[940,100]]
  const nodes2 = [[100,150],[240,130],[400,160],[560,140],[720,160],[880,140]]
  return (
    <svg className="absolute pointer-events-none" style={{ top:'18%', left:0, width:'100%', height:220, opacity:0.12, animation:'circuitPulse 6s ease-in-out infinite' }} viewBox="0 0 1200 220" preserveAspectRatio="none">
      <polyline points={nodes.map(n=>n.join(',')).join(' ')} fill="none" stroke={cyan} strokeWidth="1.5" />
      <polyline points={nodes2.map(n=>n.join(',')).join(' ')} fill="none" stroke={magenta} strokeWidth="1" />
      {/* vertical drops from nodes */}
      {nodes.map((n,i) => <line key={i} x1={n[0]} y1={n[1]} x2={n[0]} y2={n[1]+30} stroke={cyan} strokeWidth="1" />)}
      {/* nodes */}
      {nodes.map((n,i) => <g key={i}><circle cx={n[0]} cy={n[1]} r="5" fill="none" stroke={cyan} strokeWidth="1.5" /><circle cx={n[0]} cy={n[1]} r="2" fill={cyan} /></g>)}
      {nodes2.map((n,i) => <g key={i}><circle cx={n[0]} cy={n[1]} r="4" fill="none" stroke={magenta} strokeWidth="1" /><circle cx={n[0]} cy={n[1]} r="1.5" fill={magenta} /></g>)}
    </svg>
  )
}

/* second trace row near bottom */
function CircuitTraces2() {
  const yellow = '#f0ff00'
  const nodes = [[60,80],[200,60],[360,90],[520,65],[680,85],[840,60],[1000,80]]
  return (
    <svg className="absolute pointer-events-none" style={{ bottom:'22%', left:0, width:'100%', height:120, opacity:0.09, animation:'circuitPulse 8s ease-in-out 3s infinite' }} viewBox="0 0 1200 120" preserveAspectRatio="none">
      <polyline points={nodes.map(n=>n.join(',')).join(' ')} fill="none" stroke={yellow} strokeWidth="1" />
      {nodes.map((n,i) => i%2===0 && <g key={i}><circle cx={n[0]} cy={n[1]} r="4" fill="none" stroke={yellow} strokeWidth="1" /><circle cx={n[0]} cy={n[1]} r="1.5" fill={yellow} /></g>)}
    </svg>
  )
}

/* radar pings */
const PINGS = [
  { left:'9%',  top:'22%', color:'#00fff5', delay:'0s',   dur:'4s'   },
  { left:'87%', top:'52%', color:'#ff00a0', delay:'1.8s', dur:'5s'   },
  { left:'48%', top:'80%', color:'#00fff5', delay:'3.5s', dur:'4.5s' },
  { left:'70%', top:'15%', color:'#f0ff00', delay:'2.5s', dur:'6s'   },
]

/* floating neon shapes */
const SHAPES = Array.from({ length: 8 }, (_, i) => ({
  size: 12 + (i % 3) * 10,
  left: `${8 + i * 12}%`,
  top: `${10 + (i % 5) * 17}%`,
  color: i % 2 === 0 ? 'rgba(0,255,245,0.3)' : 'rgba(255,0,160,0.3)',
  delay: `${i * 0.8}s`,
  dur: `${3 + i * 0.5}s`,
}))

export default function Cyberpunk({ data, slug }) {
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

      {/* Grid bg */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: `linear-gradient(rgba(0,255,245,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,245,0.04) 1px, transparent 1px)`, backgroundSize: '40px 40px', animation: 'gridMove 3s linear infinite' }} />

      {/* Corner brackets */}
      <div className="absolute top-0 left-0 w-32 h-32 pointer-events-none" style={{ borderTop: `2px solid ${cyan}`, borderLeft: `2px solid ${cyan}` }} />
      <div className="absolute top-0 right-0 w-32 h-32 pointer-events-none" style={{ borderTop: `2px solid ${magenta}`, borderRight: `2px solid ${magenta}` }} />
      <div className="absolute bottom-0 left-0 w-32 h-32 pointer-events-none" style={{ borderBottom: `2px solid ${magenta}`, borderLeft: `2px solid ${magenta}` }} />
      <div className="absolute bottom-0 right-0 w-32 h-32 pointer-events-none" style={{ borderBottom: `2px solid ${cyan}`, borderRight: `2px solid ${cyan}` }} />

      {/* Floating neon shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {SHAPES.map((s, i) => (
          <div key={i} style={{
            position: 'absolute', left: s.left, top: s.top,
            width: s.size, height: s.size,
            border: `1px solid ${s.color}`,
            transform: i % 2 === 0 ? 'rotate(45deg)' : 'rotate(0deg)',
            animation: `neonPulse ${s.dur} ease-in-out ${s.delay} infinite, floatY ${4 + i * 0.6}s ease-in-out ${s.delay} infinite`,
          }} />
        ))}
        {/* neon horizontal streaks */}
        <div style={{ position: 'absolute', top: '35%', left: 0, right: 0, height: '1px', background: `linear-gradient(90deg, transparent, ${cyan}20, transparent)`, animation: 'driftX 8s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', top: '65%', left: 0, right: 0, height: '1px', background: `linear-gradient(90deg, transparent, ${magenta}20, transparent)`, animation: 'driftX 10s ease-in-out 2s infinite reverse' }} />
      </div>

      <CircuitTraces />
      <CircuitTraces2 />

      {/* Radar pings */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {PINGS.map((p, i) => (
          <div key={i} style={{ position:'absolute', left:p.left, top:p.top, width:60, height:60, borderRadius:'50%', border:`1px solid ${p.color}`, animation:`radarPing ${p.dur} ease-out ${p.delay} infinite` }} />
        ))}
        {/* HUD crosshair decorations */}
        <div style={{ position:'absolute', top:'8%', left:'50%', transform:'translateX(-50%)', width:40, height:40, opacity:0.15 }}>
          <div style={{ position:'absolute', top:'50%', left:0, right:0, height:'1px', background:cyan }} />
          <div style={{ position:'absolute', left:'50%', top:0, bottom:0, width:'1px', background:cyan }} />
          <div style={{ position:'absolute', inset:8, borderRadius:'50%', border:`1px solid ${cyan}` }} />
        </div>
        <div style={{ position:'absolute', bottom:'12%', right:'8%', width:30, height:30, opacity:0.12 }}>
          <div style={{ position:'absolute', top:'50%', left:0, right:0, height:'1px', background:magenta }} />
          <div style={{ position:'absolute', left:'50%', top:0, bottom:0, width:'1px', background:magenta }} />
          <div style={{ position:'absolute', inset:6, borderRadius:'50%', border:`1px solid ${magenta}` }} />
        </div>
      </div>

      <DataStream />
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

        {/* Skills — circuit chips */}
        <section className="mb-20">
          <Divider color={cyan} label="<SKILLS/>" />
          <p className="text-center text-xs mb-6 tracking-widest uppercase" style={{ color: 'rgba(0,255,245,0.4)', fontFamily: "'Share Tech Mono',monospace" }}>{'// NEURAL CHIP ARRAY //'}</p>
          <div className="flex flex-wrap justify-center gap-5">
            {skills.map((skill, i) => <CircuitChip key={i} skill={skill} i={i} />)}
          </div>
        </section>

        {/* Experience */}
        {experience.length > 0 && (
          <section className="mb-20">
            <Divider color={magenta} label="<EXPERIENCE/>" />
            <div className="space-y-5">
              {experience.map((exp, i) => (
                <TiltCard key={i} className="p-6 relative" intensity={7}
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
                </TiltCard>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        <section className="mb-20">
          <Divider color={cyan} label="<PROJECTS/>" />
          <div className="grid md:grid-cols-3 gap-6">
            {projects.map((p, i) => (
              <TiltCard key={i} className="p-6" intensity={12}
                style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid ${i % 2 === 0 ? 'rgba(0,255,245,0.3)' : 'rgba(255,0,160,0.3)'}` }}>
                <div className="text-xs mb-3" style={{ color: cyan, fontFamily: "'Share Tech Mono', monospace" }}>{`// PROJECT_0${i + 1}`}</div>
                <h3 className="text-lg font-black uppercase mb-3" style={{ color: yellow }}>{p.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{p.description}</p>
                {p.link && <a href={p.link} target="_blank" rel="noreferrer" className="text-xs uppercase tracking-widest" style={{ color: cyan, fontFamily: "'Share Tech Mono', monospace" }}>EXECUTE →</a>}
              </TiltCard>
            ))}
          </div>
        </section>

        {/* Education */}
        {education.length > 0 && (
          <section className="mb-20">
            <Divider color={yellow} label="<EDUCATION/>" />
            <div className="grid md:grid-cols-2 gap-5">
              {education.map((edu, i) => (
                <TiltCard key={i} className="p-5 flex items-start gap-4" intensity={8}
                  style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid rgba(240,255,0,0.2)` }}>
                  <div className="text-2xl">📡</div>
                  <div>
                    <p className="font-black uppercase text-sm" style={{ color: yellow }}>{edu.degree}</p>
                    <p className="text-xs mt-1 uppercase tracking-widest" style={{ color: cyan, fontFamily: "'Share Tech Mono', monospace" }}>{edu.institution}</p>
                    <p className="text-xs mt-1" style={{ color: 'rgba(240,255,0,0.5)', fontFamily: "'Share Tech Mono', monospace" }}>{edu.year}</p>
                  </div>
                </TiltCard>
              ))}
            </div>
          </section>
        )}

        {/* Contact */}
        <section className="mb-10 text-center">
          <Divider color={magenta} label="<CONTACT/>" />
          <p className="text-gray-500 mb-8 uppercase tracking-widest text-sm">// READY TO CONNECT — INITIATE TRANSMISSION</p>
          {slug ? (
            <ContactForm slug={slug} accentColor={magenta} bgColor="rgba(255,0,160,0.05)" borderColor="rgba(255,0,160,0.2)" textColor="#fff" />
          ) : (
            email && (
              <a href={`mailto:${email}`} className="inline-block px-8 py-3 font-black uppercase tracking-widest transition-all hover:scale-105"
                style={{ border: `2px solid ${magenta}`, color: magenta, background: 'rgba(255,0,160,0.08)', boxShadow: `0 0 30px rgba(255,0,160,0.3)`, fontFamily: "'Share Tech Mono', monospace" }}>
                SEND MESSAGE ▶
              </a>
            )
          )}
        </section>

        <footer className="text-center pb-10 text-xs uppercase tracking-widest" style={{ color: 'rgba(0,255,245,0.3)', fontFamily: "'Share Tech Mono', monospace" }}>
          {'// BUILT WITH PORTIFY — SYSTEM_END'}
        </footer>
      </div>
    </div>
  )
}
