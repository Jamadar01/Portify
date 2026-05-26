import { useEffect, useRef } from 'react'

function Bubbles() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="absolute rounded-full"
          style={{ width: `${Math.random() * 8 + 4}px`, height: `${Math.random() * 8 + 4}px`, left: `${Math.random() * 100}%`, bottom: '-20px', background: 'rgba(0,229,204,0.3)', border: '1px solid rgba(0,229,204,0.5)', animation: `bubble ${Math.random() * 8 + 6}s linear ${Math.random() * 5}s infinite` }} />
      ))}
    </div>
  )
}

function WaveBottom() {
  return (
    <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none" style={{ height: '120px' }}>
      <div style={{ position: 'absolute', bottom: 0, left: '-50%', width: '200%', height: '120px', background: 'rgba(0,119,182,0.3)', borderRadius: '50% 50% 0 0 / 80px 80px 0 0', animation: 'wave 8s ease-in-out infinite' }} />
      <div style={{ position: 'absolute', bottom: 0, left: '-50%', width: '200%', height: '80px', background: 'rgba(0,229,204,0.15)', borderRadius: '50% 50% 0 0 / 60px 60px 0 0', animation: 'wave 6s ease-in-out 1s infinite reverse' }} />
    </div>
  )
}

function SectionHead({ children, teal }) {
  return (
    <h2 className="text-center text-2xl font-bold mb-10"
      style={{ color: teal, textShadow: `0 0 20px rgba(0,229,204,0.5)` }}>
      {children}
    </h2>
  )
}

export default function DeepOcean({ data }) {
  const { name, role, bio, email, skills, experience = [], projects, education = [], socials } = data
  const teal = '#00e5cc', blue = '#0077b6'

  const card = {
    background: 'rgba(0,60,80,0.4)',
    border: '1px solid rgba(0,229,204,0.15)',
    backdropFilter: 'blur(20px)',
    boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(0,229,204,0.1)',
  }

  return (
    <div className="relative min-h-screen w-full text-white overflow-hidden"
      style={{ width: '100%', background: 'linear-gradient(160deg, #0a0e2e 0%, #0a2040 40%, #063b4f 100%)', fontFamily: "'Nunito', sans-serif" }}>
      {/* Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div style={{ position: 'absolute', top: '10%', left: '15%', width: '400px', height: '400px', background: `radial-gradient(circle, rgba(0,229,204,0.12) 0%, transparent 70%)`, animation: 'orbFloat 12s ease-in-out infinite', filter: 'blur(40px)' }} />
        <div style={{ position: 'absolute', top: '50%', right: '10%', width: '300px', height: '300px', background: `radial-gradient(circle, rgba(0,119,182,0.18) 0%, transparent 70%)`, animation: 'orbFloat 9s ease-in-out 2s infinite reverse', filter: 'blur(50px)' }} />
        <div style={{ position: 'absolute', bottom: '20%', left: '40%', width: '250px', height: '250px', background: `radial-gradient(circle, rgba(0,229,204,0.08) 0%, transparent 70%)`, animation: 'orbFloat 15s ease-in-out 4s infinite', filter: 'blur(60px)' }} />
      </div>
      <Bubbles />

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-12">

        {/* Hero */}
        <header className="text-center py-20">
          {data.avatarUrl && <img src={data.avatarUrl} alt={name} className="w-24 h-24 rounded-full mx-auto mb-6 object-cover" style={{ border: `2px solid ${teal}`, boxShadow: `0 0 30px rgba(0,229,204,0.4)` }} />}
          <h1 className="text-6xl md:text-7xl font-black mb-4" style={{ color: '#e0f7f5', textShadow: `0 0 40px rgba(0,229,204,0.4)`, letterSpacing: '-2px' }}>{name}</h1>
          <p className="text-lg tracking-widest uppercase mb-6" style={{ color: teal, letterSpacing: '4px' }}>{role}</p>
          <p className="text-blue-200 max-w-2xl mx-auto leading-relaxed opacity-80 mb-8">{bio}</p>
          <div className="flex justify-center gap-4 flex-wrap">
            {email && <a href={`mailto:${email}`} className="px-6 py-2 rounded-full text-sm transition-all hover:scale-105" style={{ border: `1px solid ${teal}40`, background: `rgba(0,229,204,0.08)`, color: teal }}>{email}</a>}
            {socials.github && <a href={socials.github} target="_blank" rel="noreferrer" className="px-6 py-2 rounded-full text-sm transition-all hover:scale-105" style={{ border: `1px solid ${teal}40`, background: `rgba(0,229,204,0.08)`, color: teal }}>GitHub</a>}
            {socials.linkedin && <a href={socials.linkedin} target="_blank" rel="noreferrer" className="px-6 py-2 rounded-full text-sm transition-all hover:scale-105" style={{ border: `1px solid ${teal}40`, background: `rgba(0,229,204,0.08)`, color: teal }}>LinkedIn</a>}
            {socials.twitter && <a href={socials.twitter} target="_blank" rel="noreferrer" className="px-6 py-2 rounded-full text-sm transition-all hover:scale-105" style={{ border: `1px solid ${teal}40`, background: `rgba(0,229,204,0.08)`, color: teal }}>Twitter</a>}
          </div>
        </header>

        {/* Skills */}
        <section className="mb-20">
          <SectionHead teal={teal}>Skills</SectionHead>
          <div className="flex flex-wrap justify-center gap-3">
            {skills.map((skill, i) => (
              <span key={i} className="px-5 py-2 rounded-full text-sm font-semibold transition-all hover:scale-105"
                style={{ background: 'rgba(0,229,204,0.08)', border: `1px solid rgba(0,229,204,0.25)`, color: '#b2ebf2', backdropFilter: 'blur(10px)' }}>
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* Experience */}
        {experience.length > 0 && (
          <section className="mb-20">
            <SectionHead teal={teal}>Experience</SectionHead>
            <div className="space-y-5">
              {experience.map((exp, i) => (
                <div key={i} className="rounded-2xl p-6 relative overflow-hidden" style={card}>
                  <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl" style={{ background: `linear-gradient(180deg, ${teal}, ${blue})` }} />
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3 pl-3">
                    <div>
                      <h3 className="font-bold text-lg" style={{ color: '#e0f7f5' }}>{exp.role}</h3>
                      <p className="text-sm mt-0.5" style={{ color: teal }}>{exp.company}</p>
                    </div>
                    <span className="text-xs px-3 py-1 rounded-full flex-shrink-0"
                      style={{ background: 'rgba(0,229,204,0.1)', border: `1px solid rgba(0,229,204,0.2)`, color: teal }}>
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-blue-300 text-sm leading-relaxed opacity-80 pl-3">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        <section className="mb-20">
          <SectionHead teal={teal}>Projects</SectionHead>
          <div className="grid md:grid-cols-3 gap-6">
            {projects.map((p, i) => (
              <div key={i} className="rounded-2xl p-6 transition-all hover:-translate-y-2 hover:scale-105" style={card}>
                <div className="w-8 h-1 rounded mb-4" style={{ background: `linear-gradient(90deg, ${teal}, ${blue})` }} />
                <h3 className="font-bold text-lg mb-3" style={{ color: '#e0f7f5' }}>{p.title}</h3>
                <p className="text-blue-300 text-sm leading-relaxed mb-4 opacity-80">{p.description}</p>
                {p.link && <a href={p.link} target="_blank" rel="noreferrer" className="text-xs tracking-widest uppercase" style={{ color: teal }}>Explore →</a>}
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        {education.length > 0 && (
          <section className="mb-32">
            <SectionHead teal={teal}>Education</SectionHead>
            <div className="grid md:grid-cols-2 gap-5">
              {education.map((edu, i) => (
                <div key={i} className="rounded-2xl p-5 flex items-start gap-4" style={card}>
                  <div className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center text-lg"
                    style={{ background: 'rgba(0,229,204,0.1)', border: `1px solid rgba(0,229,204,0.2)` }}>
                    🎓
                  </div>
                  <div>
                    <p className="font-semibold" style={{ color: '#e0f7f5' }}>{edu.degree}</p>
                    <p className="text-sm mt-1" style={{ color: teal }}>{edu.institution}</p>
                    <p className="text-xs mt-1 opacity-60" style={{ color: teal }}>{edu.year}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Contact */}
        <section className="mb-32 text-center">
          <SectionHead teal={teal}>Get In Touch</SectionHead>
          <p className="text-blue-300 opacity-70 mb-6">Dive deeper — let's connect and create something extraordinary.</p>
          {email && (
            <a href={`mailto:${email}`} className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-semibold transition-all hover:scale-105"
              style={{ background: `linear-gradient(135deg, ${teal}, ${blue})`, boxShadow: `0 0 30px rgba(0,229,204,0.3)`, color: '#0a0e2e' }}>
              Send a Message 🌊
            </a>
          )}
        </section>
      </div>

      <WaveBottom />
      <div className="relative z-10 text-center pb-6 text-xs" style={{ color: 'rgba(0,229,204,0.3)' }}>Built with Portify</div>
    </div>
  )
}
