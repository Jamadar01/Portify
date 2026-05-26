import ContactForm from '../ContactForm'
import TiltCard from '../TiltCard'

function Divider({ label }) {
  return (
    <div className="flex items-center gap-4 mb-12">
      <div className="flex-1 h-px" style={{ background: '#e2ddd8' }} />
      <span className="text-xs tracking-widest uppercase" style={{ color: '#c8a96e' }}>{label}</span>
      <div className="flex-1 h-px" style={{ background: '#e2ddd8' }} />
    </div>
  )
}

function PaperMeadow() {
  const stems = Array.from({length:35}, (_,i) => ({ x:(i*36+8)%1200, h:10+(i%5)*5, lean:(i%3-1)*4 }))
  const flowers = [75,215,380,545,695,845,1000,1130]
  return (
    <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{ height: 72 }}>
      <svg style={{ position:'absolute', bottom:0, left:0, width:'100%', height:72 }} viewBox="0 0 1200 72" preserveAspectRatio="none">
        <path d="M0 50 Q300 44 600 48 Q900 52 1200 46 L1200 72 L0 72 Z" fill="rgba(139,105,20,0.07)" />
        <path d="M0 58 Q400 54 800 57 Q1000 59 1200 56 L1200 72 L0 72 Z" fill="rgba(139,105,20,0.05)" />
        {stems.map((s,i) => (
          <path key={i} d={`M${s.x} 52 Q${s.x+s.lean} ${52-s.h*0.55} ${s.x+s.lean*1.6} ${52-s.h}`}
            stroke="rgba(139,105,20,0.17)" strokeWidth="1.4" strokeLinecap="round" fill="none" />
        ))}
        {flowers.map((x,i) => (
          <g key={i}>
            <line x1={x} y1={52} x2={x} y2={37} stroke="rgba(139,105,20,0.22)" strokeWidth="1" />
            {[0,60,120,180,240,300].map(deg => (
              <ellipse key={deg}
                cx={x+Math.cos(deg*Math.PI/180)*4.8} cy={37+Math.sin(deg*Math.PI/180)*4.8}
                rx="2.8" ry="1.6"
                fill={i%3===0?'rgba(200,169,110,0.32)':i%3===1?'rgba(180,140,80,0.28)':'rgba(220,180,120,0.30)'}
                transform={`rotate(${deg} ${x+Math.cos(deg*Math.PI/180)*4.8} ${37+Math.sin(deg*Math.PI/180)*4.8})`}
              />
            ))}
            <circle cx={x} cy={37} r="2.8" fill="rgba(200,169,110,0.38)" />
          </g>
        ))}
        {/* scattered seeds / dandelion dots */}
        {[150,310,470,640,800,960,1090].map((x,i) => (
          <g key={i} opacity="0.18">
            {[0,45,90,135,180,225,270,315].map(a => (
              <line key={a} x1={x} y1={44} x2={x+Math.cos(a*Math.PI/180)*5} y2={44+Math.sin(a*Math.PI/180)*5}
                stroke="#8b6914" strokeWidth="0.8" />
            ))}
            <circle cx={x} cy={44} r="1.2" fill="#c8a96e" />
          </g>
        ))}
      </svg>
    </div>
  )
}

const WATERCOLOR = [
  { left:'-6%',  top:'22%', w:240, h:170, color:'rgba(200,169,110,0.07)', delay:'0s',  dur:'17s' },
  { left:'74%',  top:'52%', w:270, h:190, color:'rgba(139,105,20,0.06)',  delay:'6s',  dur:'21s' },
  { left:'28%',  top:'8%',  w:190, h:140, color:'rgba(220,180,100,0.05)', delay:'11s', dur:'14s' },
  { left:'55%',  top:'78%', w:200, h:150, color:'rgba(180,140,80,0.05)',  delay:'4s',  dur:'19s' },
]

function BotanicalBranch({ flip, style }) {
  return (
    <svg viewBox="0 0 100 240" fill="none" style={{ ...style, transform: flip ? 'scaleX(-1)' : undefined, pointerEvents:'none' }}>
      <path d="M52 240 Q50 185 48 130 Q46 82 44 35" stroke="rgba(139,105,20,0.13)" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M48 175 Q32 155 20 150"  stroke="rgba(139,105,20,0.10)" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M47 130 Q63 112 76 106"  stroke="rgba(139,105,20,0.10)" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M45 90  Q30 72 21 62"   stroke="rgba(139,105,20,0.08)" strokeWidth="1"   strokeLinecap="round" />
      <path d="M46 58  Q60 44 72 37"   stroke="rgba(139,105,20,0.08)" strokeWidth="1"   strokeLinecap="round" />
      <ellipse cx="18" cy="148" rx="7" ry="3"   fill="rgba(139,105,20,0.09)" transform="rotate(-22 18 148)" />
      <ellipse cx="78" cy="104" rx="7" ry="3"   fill="rgba(139,105,20,0.09)" transform="rotate(16 78 104)" />
      <ellipse cx="19" cy="60"  rx="5.5" ry="2.5" fill="rgba(139,105,20,0.07)" transform="rotate(-28 19 60)" />
      <ellipse cx="74" cy="35"  rx="5.5" ry="2.5" fill="rgba(139,105,20,0.07)" transform="rotate(18 74 35)" />
    </svg>
  )
}

const CRANES = [
  { size: 64, top: '6%',  right: '4%',  delay: '0s',   dur: '7s'  },
  { size: 44, top: '28%', left: '2%',   delay: '1.8s', dur: '9s'  },
  { size: 54, top: '62%', right: '6%',  delay: '3.5s', dur: '6s'  },
  { size: 36, top: '78%', left: '5%',   delay: '0.6s', dur: '8s'  },
  { size: 48, top: '44%', right: '1%',  delay: '2.2s', dur: '10s' },
]

function PaperCrane({ size, style }) {
  return (
    <svg width={size} height={size * 0.8} viewBox="0 0 100 80" fill="none" style={style}>
      <path d="M50 8 L82 48 L50 38 L18 48 Z" fill="#c8a96e" opacity="0.7" />
      <path d="M50 38 L62 72 L50 56 Z" fill="#a07830" opacity="0.6" />
      <path d="M50 38 L38 72 L50 56 Z" fill="#a07830" opacity="0.5" />
      <path d="M18 48 L50 33 L50 43 Z" fill="#d4b878" opacity="0.65" />
      <path d="M82 48 L50 33 L50 43 Z" fill="#d4b878" opacity="0.55" />
      <path d="M50 8 L56 28 L50 38 L44 28 Z" fill="#e0c88a" opacity="0.6" />
    </svg>
  )
}

function RubberStamp({ skill, i }) {
  const tilts = [-3, 2, -1.5, 3, -2.5, 1.5, -1, 2.5]
  const rot = tilts[i % tilts.length]
  return (
    <span
      className="cursor-default inline-block transition-transform duration-200 hover:scale-105"
      style={{
        padding: '5px 14px', margin: '4px',
        border: '2px dashed #c8a96e',
        color: '#4a2e0e',
        fontFamily: "'Playfair Display', serif",
        fontSize: 12, fontWeight: 700,
        textTransform: 'uppercase', letterSpacing: '2px',
        transform: `rotate(${rot}deg)`,
        background: 'rgba(250,248,245,0.9)',
        boxShadow: '2px 2px 0 rgba(139,105,20,0.12)',
        display: 'inline-block',
      }}
    >
      {skill}
    </span>
  )
}

/* Floating ink drops */
const INK_DROPS = Array.from({ length: 6 }, (_, i) => ({
  size: 40 + i * 15,
  right: `${3 + i * 5}%`,
  top: `${8 + i * 14}%`,
  delay: `${i * 1.5}s`,
  dur: `${5 + i}s`,
}))

export default function MinimalPaper({ data, slug }) {
  const { name, role, bio, email, skills, experience = [], projects, education = [], socials } = data
  const gold = '#8b6914', lightGold = '#c8a96e'

  return (
    <div className="relative min-h-screen w-full" style={{ width: '100%', background: '#faf8f5', fontFamily: "'Lora', Georgia, serif", color: '#1a1a1a', overflow: 'hidden' }}>

      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle grid */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(139,105,20,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(139,105,20,0.04) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }} />

        {/* Ink drop circles */}
        {INK_DROPS.map((d, i) => (
          <div key={i} style={{
            position: 'absolute', right: d.right, top: d.top,
            width: d.size, height: d.size, borderRadius: '50%',
            border: `1px solid rgba(139,105,20,0.08)`,
            animation: `inkDrop ${d.dur} ease-in-out ${d.delay} infinite`,
          }} />
        ))}

        {/* Corner ornaments */}
        <div style={{ position: 'absolute', top: 40, left: 40, width: 60, height: 60, borderTop: `1px solid ${lightGold}40`, borderLeft: `1px solid ${lightGold}40` }} />
        <div style={{ position: 'absolute', top: 40, right: 40, width: 60, height: 60, borderTop: `1px solid ${lightGold}40`, borderRight: `1px solid ${lightGold}40` }} />
        <div style={{ position: 'absolute', bottom: 40, left: 40, width: 60, height: 60, borderBottom: `1px solid ${lightGold}40`, borderLeft: `1px solid ${lightGold}40` }} />
        <div style={{ position: 'absolute', bottom: 40, right: 40, width: 60, height: 60, borderBottom: `1px solid ${lightGold}40`, borderRight: `1px solid ${lightGold}40` }} />

        {/* Floating large ring */}
        <div style={{ position: 'absolute', bottom: '15%', left: '-5%', width: 300, height: 300, borderRadius: '50%', border: `1px solid rgba(200,169,110,0.08)`, animation: 'orbFloat 18s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', top: '10%', right: '-3%', width: 200, height: 200, borderRadius: '50%', border: `1px solid rgba(200,169,110,0.07)`, animation: 'orbFloat 14s ease-in-out 4s infinite reverse' }} />

        {/* Watercolor washes */}
        {WATERCOLOR.map((w, i) => (
          <div key={i} style={{ position:'absolute', left:w.left, top:w.top, width:w.w, height:w.h, borderRadius:'60% 40% 70% 30% / 50% 60% 40% 50%', background:w.color, filter:'blur(35px)', animation:`orbFloat ${w.dur} ease-in-out ${w.delay} infinite` }} />
        ))}

        {/* Botanical branches on edges */}
        <BotanicalBranch style={{ position:'absolute', left:0, top:'8%', width:72, height:190, opacity:0.9 }} />
        <BotanicalBranch flip style={{ position:'absolute', right:0, top:'35%', width:72, height:190, opacity:0.8 }} />
        <BotanicalBranch style={{ position:'absolute', left:'1%', bottom:'8%', width:58, height:150, opacity:0.7 }} />
        <BotanicalBranch flip style={{ position:'absolute', right:'1%', top:'72%', width:58, height:150, opacity:0.65 }} />

        {/* Scattered dot texture */}
        <svg className="absolute inset-0 w-full h-full" style={{ opacity:0.06, pointerEvents:'none' }}>
          {Array.from({length: 60}, (_,i) => (
            <circle key={i} cx={`${(i * 17 + 5) % 100}%`} cy={`${(i * 13 + 8) % 100}%`} r={1 + (i % 3)} fill="#8b6914" />
          ))}
        </svg>

        {/* Floating paper cranes */}
        {CRANES.map((c, i) => (
          <div key={i} style={{ position: 'absolute', top: c.top, left: c.left, right: c.right, animation: `craneFloat ${c.dur} ease-in-out ${c.delay} infinite`, pointerEvents: 'none' }}>
            <PaperCrane size={c.size} style={{}} />
          </div>
        ))}
      </div>

      <div className="h-1 relative" style={{ background: `linear-gradient(90deg, ${lightGold}, ${gold}, ${lightGold})` }} />

      <div className="relative max-w-3xl mx-auto px-8 py-16">

        {/* Hero */}
        <header className="mb-20">
          <div className="flex items-start gap-8 flex-wrap md:flex-nowrap">
            {data.avatarUrl && (
              <img src={data.avatarUrl} alt={name} className="w-28 h-28 rounded-sm object-cover flex-shrink-0"
                style={{ filter: 'sepia(10%) contrast(1.05)', boxShadow: '4px 4px 16px rgba(0,0,0,0.12)' }} />
            )}
            <div className="flex-1">
              <h1 className="text-5xl md:text-6xl font-bold mb-3 leading-tight"
                style={{ fontFamily: "'Playfair Display', serif", color: '#0d0d0d', letterSpacing: '-1px' }}>
                {name}
              </h1>
              <p className="text-sm uppercase tracking-[0.25em] mb-4" style={{ color: gold }}>{role}</p>
              <div className="w-12 h-px mb-4" style={{ background: lightGold }} />
              <p className="leading-relaxed" style={{ color: '#444', fontSize: '15px' }}>{bio}</p>
            </div>
          </div>
          <div className="flex gap-6 mt-8 flex-wrap items-center">
            {email && <a href={`mailto:${email}`} className="text-sm transition-all hover:opacity-60" style={{ color: gold, borderBottom: `1px solid ${lightGold}`, paddingBottom: '2px' }}>{email}</a>}
            {socials.github && <a href={socials.github} target="_blank" rel="noreferrer" className="text-sm uppercase tracking-widest transition-all hover:opacity-60" style={{ color: gold, borderBottom: `1px solid ${lightGold}`, paddingBottom: '2px' }}>GitHub</a>}
            {socials.linkedin && <a href={socials.linkedin} target="_blank" rel="noreferrer" className="text-sm uppercase tracking-widest transition-all hover:opacity-60" style={{ color: gold, borderBottom: `1px solid ${lightGold}`, paddingBottom: '2px' }}>LinkedIn</a>}
            {socials.twitter && <a href={socials.twitter} target="_blank" rel="noreferrer" className="text-sm uppercase tracking-widest transition-all hover:opacity-60" style={{ color: gold, borderBottom: `1px solid ${lightGold}`, paddingBottom: '2px' }}>Twitter</a>}
          </div>
        </header>

        {/* Skills — rubber stamp */}
        <Divider label="Skills" />
        <section className="mb-16">
          <p className="text-center text-xs mb-5 tracking-[0.3em] uppercase" style={{ color: lightGold }}>— Stamped Expertise —</p>
          <div className="flex flex-wrap gap-1 justify-center" style={{ lineHeight: 2.2 }}>
            {skills.map((skill, i) => <RubberStamp key={i} skill={skill} i={i} />)}
          </div>
        </section>

        {/* Experience */}
        {experience.length > 0 && (
          <>
            <Divider label="Experience" />
            <section className="mb-16 space-y-10">
              {experience.map((exp, i) => (
                <TiltCard key={i} className="pb-10" intensity={5}
                  style={{ borderBottom: i < experience.length - 1 ? '1px solid #e2ddd8' : 'none', background: 'transparent' }}>
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-1 mb-3">
                    <div>
                      <h3 className="text-xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: '#0d0d0d' }}>{exp.role}</h3>
                      <p className="text-sm mt-1" style={{ color: gold }}>{exp.company}</p>
                    </div>
                    <span className="text-xs flex-shrink-0 mt-1" style={{ color: lightGold, fontFamily: 'Georgia, serif' }}>{exp.period}</span>
                  </div>
                  <p className="leading-relaxed" style={{ color: '#555', fontSize: '15px' }}>{exp.description}</p>
                </TiltCard>
              ))}
            </section>
          </>
        )}

        {/* Projects */}
        <Divider label="Projects" />
        <section className="mb-16 space-y-6">
          {projects.map((p, i) => (
            <TiltCard key={i} className="p-5 rounded-sm" intensity={6}
              style={{ background: '#f5f1ea', border: '1px solid #e2ddd8' }}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif", color: '#0d0d0d' }}>{p.title}</h3>
                  <p className="leading-relaxed" style={{ color: '#555', fontSize: '15px' }}>{p.description}</p>
                </div>
                {p.link && (
                  <a href={p.link} target="_blank" rel="noreferrer" className="flex-shrink-0 text-xs uppercase tracking-widest transition-all hover:opacity-60"
                    style={{ color: gold, borderBottom: `1px solid ${lightGold}`, paddingBottom: '2px', marginTop: '4px' }}>
                    View
                  </a>
                )}
              </div>
            </TiltCard>
          ))}
        </section>

        {/* Education */}
        {education.length > 0 && (
          <>
            <Divider label="Education" />
            <section className="mb-16 space-y-8">
              {education.map((edu, i) => (
                <TiltCard key={i} className="flex items-start gap-5 pb-8" intensity={5}
                  style={{ borderBottom: i < education.length - 1 ? '1px solid #e2ddd8' : 'none', background: 'transparent' }}>
                  <div className="w-8 h-8 rounded-sm flex-shrink-0 flex items-center justify-center text-base"
                    style={{ background: '#f0ece5', border: '1px solid #e2ddd8' }}>🎓</div>
                  <div>
                    <p className="font-bold" style={{ fontFamily: "'Playfair Display', serif", color: '#0d0d0d' }}>{edu.degree}</p>
                    <p className="text-sm mt-1" style={{ color: gold }}>{edu.institution}</p>
                    <p className="text-xs mt-1" style={{ color: lightGold }}>{edu.year}</p>
                  </div>
                </TiltCard>
              ))}
            </section>
          </>
        )}

        {/* Contact */}
        <Divider label="Contact" />
        <section className="mb-16 text-center">
          <p className="mb-8 leading-relaxed" style={{ color: '#555', fontSize: '15px' }}>
            I'm always open to interesting conversations and new opportunities.
          </p>
          {slug ? (
            <ContactForm slug={slug} accentColor={gold} bgColor="#f0ece5" borderColor="#e2ddd8" textColor="#1a1a1a" />
          ) : (
            email && (
              <a href={`mailto:${email}`} className="inline-block px-8 py-3 text-sm uppercase tracking-widest transition-all hover:opacity-80"
                style={{ background: '#0d0d0d', color: '#faf8f5', letterSpacing: '2px' }}>
                Get In Touch
              </a>
            )
          )}
          <div className="flex justify-center gap-8 mt-8 flex-wrap">
            {socials.github && <a href={socials.github} target="_blank" rel="noreferrer" className="text-xs uppercase tracking-widest transition-all hover:opacity-60" style={{ color: gold }}>/github</a>}
            {socials.linkedin && <a href={socials.linkedin} target="_blank" rel="noreferrer" className="text-xs uppercase tracking-widest transition-all hover:opacity-60" style={{ color: gold }}>/linkedin</a>}
            {socials.twitter && <a href={socials.twitter} target="_blank" rel="noreferrer" className="text-xs uppercase tracking-widest transition-all hover:opacity-60" style={{ color: gold }}>/twitter</a>}
          </div>
        </section>

        <footer className="text-center pb-8">
          <div className="w-16 h-px mx-auto mb-6" style={{ background: lightGold }} />
          <p className="text-xs uppercase tracking-widest" style={{ color: lightGold }}>Built with Portify</p>
        </footer>
      </div>

      <PaperMeadow />
      <div className="h-1 relative" style={{ background: `linear-gradient(90deg, ${lightGold}, ${gold}, ${lightGold})` }} />
    </div>
  )
}
