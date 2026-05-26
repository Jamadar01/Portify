function Divider({ label }) {
  return (
    <div className="flex items-center gap-4 mb-12">
      <div className="flex-1 h-px" style={{ background: '#e2ddd8' }} />
      <span className="text-xs tracking-widest uppercase" style={{ color: '#c8a96e' }}>{label}</span>
      <div className="flex-1 h-px" style={{ background: '#e2ddd8' }} />
    </div>
  )
}

export default function MinimalPaper({ data }) {
  const { name, role, bio, email, skills, experience = [], projects, education = [], socials } = data
  const gold = '#8b6914', lightGold = '#c8a96e'

  return (
    <div className="min-h-screen w-full" style={{ width: '100%', background: '#faf8f5', fontFamily: "'Lora', Georgia, serif", color: '#1a1a1a' }}>
      <div className="h-1" style={{ background: `linear-gradient(90deg, ${lightGold}, ${gold}, ${lightGold})` }} />

      <div className="max-w-3xl mx-auto px-8 py-16">

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

        {/* Skills */}
        <Divider label="Skills" />
        <section className="mb-16">
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, i) => (
              <span key={i} className="px-4 py-1 text-sm" style={{ background: '#f0ece5', border: '1px solid #e2ddd8', color: '#3d2b1f', borderRadius: '2px' }}>
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* Experience */}
        {experience.length > 0 && (
          <>
            <Divider label="Experience" />
            <section className="mb-16 space-y-10">
              {experience.map((exp, i) => (
                <div key={i} className="pb-10" style={{ borderBottom: i < experience.length - 1 ? '1px solid #e2ddd8' : 'none' }}>
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-1 mb-3">
                    <div>
                      <h3 className="text-xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: '#0d0d0d' }}>{exp.role}</h3>
                      <p className="text-sm mt-1" style={{ color: gold }}>{exp.company}</p>
                    </div>
                    <span className="text-xs flex-shrink-0 mt-1" style={{ color: lightGold, fontFamily: 'Georgia, serif' }}>{exp.period}</span>
                  </div>
                  <p className="leading-relaxed" style={{ color: '#555', fontSize: '15px' }}>{exp.description}</p>
                </div>
              ))}
            </section>
          </>
        )}

        {/* Projects */}
        <Divider label="Projects" />
        <section className="mb-16 space-y-10">
          {projects.map((p, i) => (
            <div key={i} className="pb-10" style={{ borderBottom: i < projects.length - 1 ? '1px solid #e2ddd8' : 'none' }}>
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
            </div>
          ))}
        </section>

        {/* Education */}
        {education.length > 0 && (
          <>
            <Divider label="Education" />
            <section className="mb-16 space-y-8">
              {education.map((edu, i) => (
                <div key={i} className="flex items-start gap-5 pb-8" style={{ borderBottom: i < education.length - 1 ? '1px solid #e2ddd8' : 'none' }}>
                  <div className="w-8 h-8 rounded-sm flex-shrink-0 flex items-center justify-center text-base"
                    style={{ background: '#f0ece5', border: '1px solid #e2ddd8' }}>
                    🎓
                  </div>
                  <div>
                    <p className="font-bold" style={{ fontFamily: "'Playfair Display', serif", color: '#0d0d0d' }}>{edu.degree}</p>
                    <p className="text-sm mt-1" style={{ color: gold }}>{edu.institution}</p>
                    <p className="text-xs mt-1" style={{ color: lightGold }}>{edu.year}</p>
                  </div>
                </div>
              ))}
            </section>
          </>
        )}

        {/* Contact */}
        <Divider label="Contact" />
        <section className="mb-16 text-center">
          <p className="mb-6 leading-relaxed" style={{ color: '#555', fontSize: '15px' }}>
            I'm always open to interesting conversations and new opportunities.
          </p>
          {email && (
            <a href={`mailto:${email}`} className="inline-block px-8 py-3 text-sm uppercase tracking-widest transition-all hover:opacity-80"
              style={{ background: '#0d0d0d', color: '#faf8f5', letterSpacing: '2px' }}>
              Get In Touch
            </a>
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

      <div className="h-1" style={{ background: `linear-gradient(90deg, ${lightGold}, ${gold}, ${lightGold})` }} />
    </div>
  )
}
