import ContactForm from '../ContactForm'
import TiltCard from '../TiltCard'

/* ── pre-generated so Math.random() runs once ── */
const FISH = [
  { emoji: '🐠', size: 26, y: '18%', dur: '22s', delay: '0s',   dir: 1  },
  { emoji: '🐡', size: 22, y: '38%', dur: '30s', delay: '7s',   dir: -1 },
  { emoji: '🐟', size: 18, y: '58%', dur: '19s', delay: '3s',   dir: 1  },
  { emoji: '🦈', size: 34, y: '28%', dur: '38s', delay: '12s',  dir: -1 },
  { emoji: '🐠', size: 16, y: '72%', dur: '25s', delay: '18s',  dir: 1  },
  { emoji: '🐟', size: 20, y: '85%', dur: '28s', delay: '5s',   dir: -1 },
  { emoji: '🐙', size: 24, y: '48%', dur: '35s', delay: '20s',  dir: 1  },
]

const JELLYFISH = [
  { emoji:'🪼', size:32, left:'8%',  top:'12%', delay:'0s',   dur:'6s'  },
  { emoji:'🪼', size:24, left:'75%', top:'32%', delay:'2.5s', dur:'8s'  },
  { emoji:'🪼', size:28, left:'42%', top:'52%', delay:'4s',   dur:'7s'  },
  { emoji:'🪼', size:20, left:'58%', top:'20%', delay:'1.2s', dur:'9s'  },
  { emoji:'🪼', size:22, left:'22%', top:'68%', delay:'3.5s', dur:'7.5s'},
]

const LIGHT_RAYS = [
  { left:'12%',  w:22, delay:'0s',   dur:'9s'  },
  { left:'30%',  w:15, delay:'2.5s', dur:'12s' },
  { left:'60%',  w:18, delay:'5s',   dur:'8s'  },
  { left:'82%',  w:13, delay:'1.5s', dur:'11s' },
]

const BOTTOM_CREATURES = ['🦑','🐚','🦀','🐚','🦐']

const SEAWEED = [
  { left: '3%',  height: 80, delay: '0s' },
  { left: '7%',  height: 120, delay: '0.5s' },
  { left: '93%', height: 100, delay: '0.3s' },
  { left: '97%', height: 70,  delay: '0.8s' },
]

const GEM_COLORS = ['#00e5cc','#0077b6','#48cae4','#7c3aed','#00b4d8','#90e0ef','#023e8a','#0096c7']

function GemSkill({ skill, i }) {
  const color = GEM_COLORS[i % GEM_COLORS.length]
  return (
    <div className="flex flex-col items-center gap-2 group cursor-default">
      <div
        className="flex items-center justify-center transition-transform duration-200 group-hover:scale-110"
        style={{
          width: 72, height: 80,
          clipPath: 'polygon(50% 0%,90% 20%,100% 60%,75% 100%,25% 100%,0% 60%,10% 20%)',
          background: `linear-gradient(135deg,${color}60,${color}20)`,
          border: `1px solid ${color}80`,
          boxShadow: `0 0 14px ${color}40, inset 0 0 10px ${color}20`,
          position: 'relative',
        }}
      >
        {/* gem inner facet */}
        <div style={{
          width: 24, height: 28,
          clipPath: 'polygon(50% 0%,100% 40%,75% 100%,25% 100%,0% 40%)',
          background: `linear-gradient(180deg,rgba(255,255,255,0.4),${color}60)`,
        }} />
      </div>
      <span style={{ fontSize: '10px', color, fontWeight: 700, textAlign: 'center', maxWidth: 72, lineHeight: 1.2 }}>{skill}</span>
    </div>
  )
}

function TreasureChest() {
  return (
    <div className="flex flex-col items-center mb-6 select-none" style={{ filter: 'drop-shadow(0 0 12px rgba(0,229,204,0.3))' }}>
      <div style={{ fontSize: 52 }}>🪙</div>
      <div style={{ fontSize: 11, color: '#00e5cc', letterSpacing: '3px', textTransform: 'uppercase', marginTop: 4 }}>— Skills Treasure —</div>
    </div>
  )
}

function Bubbles() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: 18 }).map((_, i) => (
        <div key={i} className="absolute rounded-full" style={{
          width: `${4 + (i % 4) * 3}px`, height: `${4 + (i % 4) * 3}px`,
          left: `${(i * 7 + 3) % 100}%`, bottom: '-20px',
          background: 'rgba(0,229,204,0.25)', border: '1px solid rgba(0,229,204,0.4)',
          animation: `bubble ${7 + (i % 5)}s linear ${(i * 0.7) % 5}s infinite`,
        }} />
      ))}
    </div>
  )
}

function SandFloor() {
  return (
    <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{ height: 95 }}>
      <svg style={{ position:'absolute', bottom:0, left:0, width:'100%', height:95 }} viewBox="0 0 1200 95" preserveAspectRatio="none">
        <path d="M0 48 Q150 28 300 44 Q450 60 600 38 Q750 20 900 42 Q1050 60 1200 44 L1200 95 L0 95 Z" fill="rgba(180,140,80,0.22)" />
        <path d="M0 63 Q200 52 400 62 Q600 74 800 56 Q1000 42 1200 58 L1200 95 L0 95 Z" fill="rgba(155,115,55,0.18)" />
        <path d="M0 76 Q300 70 600 74 Q900 78 1200 72 L1200 95 L0 95 Z" fill="rgba(130,95,45,0.14)" />
        {/* sand ripples */}
        {[70,190,330,480,630,775,920,1060].map((x,i) => (
          <ellipse key={i} cx={x} cy={58+(i%3)*4} rx={28+(i%4)*8} ry={3} fill="none" stroke="rgba(210,170,90,0.14)" strokeWidth="1" />
        ))}
        {/* pebbles / shells */}
        {[110,260,420,590,750,900,1070].map((x,i) => (
          <ellipse key={i} cx={x} cy={66+(i%3)*5} rx={4+(i%3)} ry={2.5} fill="rgba(210,175,95,0.22)" />
        ))}
        {/* starfish */}
        {[330,720,1050].map((x,i) => (
          <g key={i} transform={`translate(${x},72)`} opacity="0.25">
            {[0,72,144,216,288].map(a => (
              <line key={a} x1={0} y1={0} x2={Math.cos(a*Math.PI/180)*7} y2={Math.sin(a*Math.PI/180)*7} stroke="#d4a060" strokeWidth="1.5" strokeLinecap="round" />
            ))}
          </g>
        ))}
      </svg>
    </div>
  )
}

function WaveBottom() {
  return (
    <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none" style={{ height: 120 }}>
      <div style={{ position: 'absolute', bottom: 0, left: '-50%', width: '200%', height: 120, background: 'rgba(0,119,182,0.3)', borderRadius: '50% 50% 0 0 / 80px 80px 0 0', animation: 'wave 8s ease-in-out infinite' }} />
      <div style={{ position: 'absolute', bottom: 0, left: '-50%', width: '200%', height: 80, background: 'rgba(0,229,204,0.15)', borderRadius: '50% 50% 0 0 / 60px 60px 0 0', animation: 'wave 6s ease-in-out 1s infinite reverse' }} />
    </div>
  )
}

function SectionHead({ children, teal }) {
  return (
    <h2 className="text-center text-2xl font-bold mb-10" style={{ color: teal, textShadow: `0 0 20px rgba(0,229,204,0.5)` }}>
      {children}
    </h2>
  )
}

export default function DeepOcean({ data, slug }) {
  const { name, role, bio, email, skills, experience = [], projects, education = [], socials } = data
  const teal = '#00e5cc', blue = '#0077b6'

  const card = {
    background: 'rgba(0,60,80,0.4)', border: '1px solid rgba(0,229,204,0.15)',
    backdropFilter: 'blur(20px)', boxShadow: '0 8px 32px rgba(0,0,0,0.3),inset 0 1px 0 rgba(0,229,204,0.1)',
  }

  return (
    <div className="relative min-h-screen w-full text-white overflow-hidden"
      style={{ width: '100%', background: 'linear-gradient(160deg,#0a0e2e 0%,#0a2040 40%,#063b4f 100%)', fontFamily: "'Nunito',sans-serif" }}>

      {/* ── background layer ── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* orbs */}
        <div style={{ position:'absolute',top:'10%',left:'15%',width:400,height:400,background:'radial-gradient(circle,rgba(0,229,204,0.1) 0%,transparent 70%)',animation:'orbFloat 12s ease-in-out infinite',filter:'blur(40px)' }} />
        <div style={{ position:'absolute',top:'50%',right:'10%',width:300,height:300,background:'radial-gradient(circle,rgba(0,119,182,0.15) 0%,transparent 70%)',animation:'orbFloat 9s ease-in-out 2s infinite reverse',filter:'blur(50px)' }} />

        {/* swimming fish */}
        {FISH.map((f, i) => (
          <div key={i} style={{
            position:'absolute', top: f.y, fontSize: f.size,
            animation: `${f.dir === 1 ? 'swimRight' : 'swimLeft'} ${f.dur} linear ${f.delay} infinite`,
            pointerEvents:'none', lineHeight:1, filter:`drop-shadow(0 0 4px rgba(0,229,204,0.4))`,
          }}>
            {f.emoji}
          </div>
        ))}

        {/* coral / seaweed */}
        {SEAWEED.map((s, i) => (
          <div key={i} style={{ position:'absolute', bottom: 0, left: s.left, width: 8, height: s.height, background: 'linear-gradient(0deg,rgba(0,119,182,0.6),rgba(0,229,204,0.3))', borderRadius:'50% 50% 0 0 / 30px 30px 0 0', animation:`sway 3s ease-in-out ${s.delay} infinite`, transformOrigin:'bottom center' }} />
        ))}

        {/* horizontal light beams */}
        <div style={{ position:'absolute',top:'22%',left:0,right:0,height:50,background:'linear-gradient(180deg,transparent,rgba(0,229,204,0.03),transparent)',animation:'wave 10s ease-in-out infinite',pointerEvents:'none' }} />
        <div style={{ position:'absolute',top:'58%',left:0,right:0,height:35,background:'linear-gradient(180deg,transparent,rgba(0,119,182,0.04),transparent)',animation:'wave 7s ease-in-out 3s infinite reverse',pointerEvents:'none' }} />

        {/* Vertical god rays from surface */}
        {LIGHT_RAYS.map((r, i) => (
          <div key={i} style={{ position:'absolute', top:0, left:r.left, width:r.w, height:'70%', background:'linear-gradient(180deg,rgba(0,229,204,0.08) 0%,transparent 100%)', filter:'blur(12px)', animation:`lightRay ${r.dur} ease-in-out ${r.delay} infinite`, transformOrigin:'top center' }} />
        ))}

        {/* Jellyfish */}
        {JELLYFISH.map((j, i) => (
          <div key={i} style={{ position:'absolute', left:j.left, top:j.top, fontSize:j.size, animation:`jellyFloat ${j.dur} ease-in-out ${j.delay} infinite`, pointerEvents:'none', lineHeight:1, filter:'drop-shadow(0 0 6px rgba(0,229,204,0.6))' }}>
            {j.emoji}
          </div>
        ))}

        {/* Bottom sea floor creatures */}
        <div style={{ position:'absolute', bottom:50, left:0, right:0, display:'flex', justifyContent:'space-around', alignItems:'flex-end', pointerEvents:'none' }}>
          {BOTTOM_CREATURES.map((e, i) => (
            <div key={i} style={{ fontSize: 18 + (i % 3) * 4, opacity:0.45, filter:'drop-shadow(0 0 4px rgba(0,229,204,0.3))', animation:`sway ${3.5 + i * 0.5}s ease-in-out ${i * 0.7}s infinite` }}>{e}</div>
          ))}
        </div>

        {/* Deep glow at bottom */}
        <div style={{ position:'absolute', bottom:0, left:'20%', right:'20%', height:120, background:'radial-gradient(ellipse,rgba(0,119,182,0.2) 0%,transparent 70%)', filter:'blur(30px)' }} />
      </div>

      <Bubbles />

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-12">

        {/* Hero */}
        <header className="text-center py-20">
          {data.avatarUrl && <img src={data.avatarUrl} alt={name} className="w-24 h-24 rounded-full mx-auto mb-6 object-cover" style={{ border:`2px solid ${teal}`,boxShadow:`0 0 30px rgba(0,229,204,0.4)` }} />}
          <h1 className="text-6xl md:text-7xl font-black mb-4" style={{ color:'#e0f7f5',textShadow:`0 0 40px rgba(0,229,204,0.4)`,letterSpacing:'-2px' }}>{name}</h1>
          <p className="text-lg tracking-widest uppercase mb-6" style={{ color:teal,letterSpacing:'4px' }}>{role}</p>
          <p className="text-blue-200 max-w-2xl mx-auto leading-relaxed opacity-80 mb-8">{bio}</p>
          <div className="flex justify-center gap-4 flex-wrap">
            {email && <a href={`mailto:${email}`} className="px-6 py-2 rounded-full text-sm transition-all hover:scale-105" style={{ border:`1px solid ${teal}40`,background:`rgba(0,229,204,0.08)`,color:teal }}>{email}</a>}
            {socials.github && <a href={socials.github} target="_blank" rel="noreferrer" className="px-6 py-2 rounded-full text-sm transition-all hover:scale-105" style={{ border:`1px solid ${teal}40`,background:`rgba(0,229,204,0.08)`,color:teal }}>GitHub</a>}
            {socials.linkedin && <a href={socials.linkedin} target="_blank" rel="noreferrer" className="px-6 py-2 rounded-full text-sm transition-all hover:scale-105" style={{ border:`1px solid ${teal}40`,background:`rgba(0,229,204,0.08)`,color:teal }}>LinkedIn</a>}
            {socials.twitter && <a href={socials.twitter} target="_blank" rel="noreferrer" className="px-6 py-2 rounded-full text-sm transition-all hover:scale-105" style={{ border:`1px solid ${teal}40`,background:`rgba(0,229,204,0.08)`,color:teal }}>Twitter</a>}
          </div>
        </header>

        {/* Skills — treasure gems */}
        <section className="mb-20">
          <SectionHead teal={teal}>Skills</SectionHead>
          <TreasureChest />
          <div className="flex flex-wrap justify-center gap-4">
            {skills.map((skill, i) => <GemSkill key={i} skill={skill} i={i} />)}
          </div>
        </section>

        {/* Experience */}
        {experience.length > 0 && (
          <section className="mb-20">
            <SectionHead teal={teal}>Experience</SectionHead>
            <div className="space-y-5">
              {experience.map((exp, i) => (
                <TiltCard key={i} className="rounded-2xl p-6 relative overflow-hidden" style={card} intensity={7}>
                  <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl" style={{ background:`linear-gradient(180deg,${teal},${blue})` }} />
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3 pl-3">
                    <div>
                      <h3 className="font-bold text-lg" style={{ color:'#e0f7f5' }}>{exp.role}</h3>
                      <p className="text-sm mt-0.5" style={{ color:teal }}>{exp.company}</p>
                    </div>
                    <span className="text-xs px-3 py-1 rounded-full flex-shrink-0" style={{ background:'rgba(0,229,204,0.1)',border:`1px solid rgba(0,229,204,0.2)`,color:teal }}>{exp.period}</span>
                  </div>
                  <p className="text-blue-300 text-sm leading-relaxed opacity-80 pl-3">{exp.description}</p>
                </TiltCard>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        <section className="mb-20">
          <SectionHead teal={teal}>Projects</SectionHead>
          <div className="grid md:grid-cols-3 gap-6">
            {projects.map((p, i) => (
              <TiltCard key={i} className="rounded-2xl p-6" style={card} intensity={12}>
                <div className="w-8 h-1 rounded mb-4" style={{ background:`linear-gradient(90deg,${teal},${blue})` }} />
                <h3 className="font-bold text-lg mb-3" style={{ color:'#e0f7f5' }}>{p.title}</h3>
                <p className="text-blue-300 text-sm leading-relaxed mb-4 opacity-80">{p.description}</p>
                {p.link && <a href={p.link} target="_blank" rel="noreferrer" className="text-xs tracking-widest uppercase" style={{ color:teal }}>Explore →</a>}
              </TiltCard>
            ))}
          </div>
        </section>

        {/* Education */}
        {education.length > 0 && (
          <section className="mb-32">
            <SectionHead teal={teal}>Education</SectionHead>
            <div className="grid md:grid-cols-2 gap-5">
              {education.map((edu, i) => (
                <TiltCard key={i} className="rounded-2xl p-5 flex items-start gap-4" style={card} intensity={8}>
                  <div className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center text-lg" style={{ background:'rgba(0,229,204,0.1)',border:`1px solid rgba(0,229,204,0.2)` }}>🎓</div>
                  <div>
                    <p className="font-semibold" style={{ color:'#e0f7f5' }}>{edu.degree}</p>
                    <p className="text-sm mt-1" style={{ color:teal }}>{edu.institution}</p>
                    <p className="text-xs mt-1 opacity-60" style={{ color:teal }}>{edu.year}</p>
                  </div>
                </TiltCard>
              ))}
            </div>
          </section>
        )}

        {/* Contact */}
        <section className="mb-32 text-center">
          <SectionHead teal={teal}>Get In Touch</SectionHead>
          <p className="text-blue-300 opacity-70 mb-8">Dive deeper — let's connect and create something extraordinary.</p>
          {slug
            ? <ContactForm slug={slug} accentColor={teal} bgColor="rgba(0,60,80,0.4)" borderColor="rgba(0,229,204,0.2)" textColor="#e0f7f5" />
            : email && <a href={`mailto:${email}`} className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-semibold transition-all hover:scale-105" style={{ background:`linear-gradient(135deg,${teal},${blue})`,boxShadow:`0 0 30px rgba(0,229,204,0.3)`,color:'#0a0e2e' }}>Send a Message 🌊</a>
          }
        </section>
      </div>

      <SandFloor />
      <WaveBottom />
      <div className="relative z-10 text-center pb-6 text-xs" style={{ color:'rgba(0,229,204,0.3)' }}>Built with Portify</div>
    </div>
  )
}
