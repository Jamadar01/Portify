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

      <div className="h-1 relative" style={{ background: `linear-gradient(90deg, ${lightGold}, ${gold}, ${lightGold})` }} />
    </div>
  )
}
