import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePortfolioStore } from '../lib/portfolioStore'
import { useAuthStore } from '../lib/authStore'
import { api } from '../lib/api'
import AuthModal from '../components/AuthModal'

const THEME_LABELS = {
  cosmic: '🌌 Cosmic',
  cyberpunk: '⚡ Cyberpunk',
  deepocean: '🌊 Deep Ocean',
  minimalpaper: '📄 Minimal Paper',
}

function StepIndicator({ current }) {
  const steps = ['Theme', 'Details', 'Preview']
  return (
    <div className="flex items-center justify-center gap-2 mb-10">
      {steps.map((s, i) => {
        const idx = i + 1
        const active = idx === current
        const done = idx < current
        return (
          <div key={s} className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all"
                style={{
                  background: done ? '#7c3aed' : active ? 'linear-gradient(135deg,#7c3aed,#a855f7)' : 'rgba(255,255,255,0.05)',
                  color: active || done ? '#fff' : 'rgba(255,255,255,0.3)',
                  boxShadow: active ? '0 0 15px rgba(168,85,247,0.5)' : 'none',
                }}
              >
                {done ? '✓' : idx}
              </div>
              <span className="text-sm hidden sm:block"
                style={{ color: active ? '#fff' : 'rgba(255,255,255,0.3)' }}>
                {s}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className="w-12 h-px mx-1" style={{ background: done ? '#7c3aed' : 'rgba(255,255,255,0.1)' }} />
            )}
          </div>
        )
      })}
    </div>
  )
}

function SkillsInput({ skills, onChange }) {
  const [input, setInput] = useState('')

  const add = () => {
    const trimmed = input.trim()
    if (trimmed && !skills.includes(trimmed)) {
      onChange([...skills, trimmed])
      setInput('')
    }
  }

  return (
    <div>
      <div className="flex gap-2 mb-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), add())}
          placeholder="e.g. React, Node.js..."
          className="flex-1 px-3 py-2 rounded-lg text-sm bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-violet-500"
        />
        <button onClick={add} type="button"
          className="px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:brightness-110"
          style={{ background: 'linear-gradient(135deg,#7c3aed,#a855f7)' }}>
          Add
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {skills.map((s, i) => (
          <span key={i} className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs"
            style={{ background: 'rgba(168,85,247,0.15)', border: '1px solid rgba(168,85,247,0.3)', color: '#c084fc' }}>
            {s}
            <button onClick={() => onChange(skills.filter((_, j) => j !== i))}
              type="button" className="hover:text-red-400 transition-colors">×</button>
          </span>
        ))}
      </div>
    </div>
  )
}

function ProjectsInput({ projects, onChange }) {
  const add = () => onChange([...projects, { title: '', description: '', link: '' }])
  const update = (i, field, val) => {
    const next = [...projects]
    next[i] = { ...next[i], [field]: val }
    onChange(next)
  }
  const remove = (i) => onChange(projects.filter((_, j) => j !== i))

  return (
    <div className="space-y-4">
      {projects.map((p, i) => (
        <div key={i} className="p-4 rounded-xl border border-white/10 space-y-3"
          style={{ background: 'rgba(255,255,255,0.02)' }}>
          <div className="flex justify-between items-center">
            <span className="text-xs text-white/40 uppercase tracking-wider">Project {i + 1}</span>
            <button onClick={() => remove(i)} type="button"
              className="text-white/30 hover:text-red-400 text-sm transition-colors">
              Remove
            </button>
          </div>
          {[
            { field: 'title', placeholder: 'Project Name' },
            { field: 'description', placeholder: 'Short description' },
            { field: 'link', placeholder: 'Link (optional)' },
          ].map(({ field, placeholder }) => (
            <input key={field}
              value={p[field]}
              onChange={(e) => update(i, field, e.target.value)}
              placeholder={placeholder}
              className="w-full px-3 py-2 rounded-lg text-sm bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-violet-500"
            />
          ))}
        </div>
      ))}
      <button onClick={add} type="button"
        className="w-full py-2 rounded-xl text-sm text-white/50 border border-dashed border-white/20 hover:border-violet-500 hover:text-violet-400 transition-all">
        + Add Project
      </button>
    </div>
  )
}

function ExperienceInput({ experience, onChange }) {
  const add = () => onChange([...experience, { company: '', role: '', period: '', description: '' }])
  const update = (i, field, val) => { const next = [...experience]; next[i] = { ...next[i], [field]: val }; onChange(next) }
  const remove = (i) => onChange(experience.filter((_, j) => j !== i))
  return (
    <div className="space-y-4">
      {experience.map((exp, i) => (
        <div key={i} className="p-4 rounded-xl border border-white/10 space-y-3" style={{ background: 'rgba(255,255,255,0.02)' }}>
          <div className="flex justify-between items-center">
            <span className="text-xs text-white/40 uppercase tracking-wider">Position {i + 1}</span>
            <button onClick={() => remove(i)} type="button" className="text-white/30 hover:text-red-400 text-sm transition-colors">Remove</button>
          </div>
          {[
            { field: 'company', placeholder: 'Company Name' },
            { field: 'role', placeholder: 'Your Role / Title' },
            { field: 'period', placeholder: 'e.g. 2022 — Present' },
          ].map(({ field, placeholder }) => (
            <input key={field} value={exp[field]} onChange={(e) => update(i, field, e.target.value)} placeholder={placeholder}
              className="w-full px-3 py-2 rounded-lg text-sm bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-violet-500" />
          ))}
          <textarea value={exp.description} onChange={(e) => update(i, 'description', e.target.value)}
            placeholder="What did you do? Key achievements..." rows={2}
            className="w-full px-3 py-2 rounded-lg text-sm bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-violet-500 resize-none" />
        </div>
      ))}
      <button onClick={add} type="button" className="w-full py-2 rounded-xl text-sm text-white/50 border border-dashed border-white/20 hover:border-violet-500 hover:text-violet-400 transition-all">
        + Add Position
      </button>
    </div>
  )
}

function EducationInput({ education, onChange }) {
  const add = () => onChange([...education, { institution: '', degree: '', year: '' }])
  const update = (i, field, val) => { const next = [...education]; next[i] = { ...next[i], [field]: val }; onChange(next) }
  const remove = (i) => onChange(education.filter((_, j) => j !== i))
  return (
    <div className="space-y-4">
      {education.map((edu, i) => (
        <div key={i} className="p-4 rounded-xl border border-white/10 space-y-3" style={{ background: 'rgba(255,255,255,0.02)' }}>
          <div className="flex justify-between items-center">
            <span className="text-xs text-white/40 uppercase tracking-wider">Entry {i + 1}</span>
            <button onClick={() => remove(i)} type="button" className="text-white/30 hover:text-red-400 text-sm transition-colors">Remove</button>
          </div>
          {[
            { field: 'institution', placeholder: 'University / School / Platform' },
            { field: 'degree', placeholder: 'Degree or Certification' },
            { field: 'year', placeholder: 'Year (e.g. 2020)' },
          ].map(({ field, placeholder }) => (
            <input key={field} value={edu[field]} onChange={(e) => update(i, field, e.target.value)} placeholder={placeholder}
              className="w-full px-3 py-2 rounded-lg text-sm bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-violet-500" />
          ))}
        </div>
      ))}
      <button onClick={add} type="button" className="w-full py-2 rounded-xl text-sm text-white/50 border border-dashed border-white/20 hover:border-violet-500 hover:text-violet-400 transition-all">
        + Add Education
      </button>
    </div>
  )
}

const THEME_KEYS = ['cosmic', 'cyberpunk', 'deepocean', 'minimalpaper']

const inputClass = "w-full px-3 py-2.5 rounded-lg text-sm bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-violet-500"

export default function Builder() {
  const navigate = useNavigate()
  const { step, setStep, theme, setTheme, data, setData } = usePortfolioStore()
  const { token } = useAuthStore()
  const fileRef = useRef(null)
  const [parsing, setParsing] = useState(false)
  const [parseError, setParseError] = useState('')
  const [showAuth, setShowAuth] = useState(false)

  async function handleResumeUpload(e) {
    const file = e.target.files[0]
    if (!file) return
    setParsing(true)
    setParseError('')
    try {
      const res = await api.resume.parse(file)
      setData(res.data)
    } catch (err) {
      setParseError(err.message || 'Failed to parse resume')
    } finally {
      setParsing(false)
      e.target.value = ''
    }
  }

  return (
    <div
      className="min-h-screen w-full px-6 py-12"
      style={{ width: '100%', background: '#070810', fontFamily: "'Space Grotesk', sans-serif", color: '#fff' }}
    >
      {/* Nav */}
      <div className="flex items-center justify-between max-w-3xl mx-auto mb-8">
        <button onClick={() => navigate('/')}
          className="flex items-center gap-2 text-white/40 hover:text-white text-sm transition-colors">
          ← Back
        </button>
        <div className="flex items-center gap-2 text-sm font-bold">
          <div className="w-6 h-6 rounded flex items-center justify-center text-xs"
            style={{ background: 'linear-gradient(135deg, #7c3aed, #a855f7)' }}>P</div>
          Portify
        </div>
      </div>

      {showAuth && (
        <AuthModal
          onClose={() => setShowAuth(false)}
          onSuccess={() => setShowAuth(false)}
        />
      )}

      <div className="max-w-3xl mx-auto">
        <StepIndicator current={step} />

        {/* Step 1: Theme */}
        {step === 1 && (
          <div>
            <h2 className="text-2xl font-bold mb-2 text-center">Pick your theme</h2>
            <p className="text-white/40 text-sm text-center mb-8">You can change this later</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {THEME_KEYS.map((t) => (
                <button key={t} onClick={() => { setTheme(t); setStep(2) }}
                  className="p-4 rounded-2xl text-left transition-all hover:scale-105"
                  style={{
                    border: `1px solid ${theme === t ? '#7c3aed' : 'rgba(255,255,255,0.08)'}`,
                    background: theme === t ? 'rgba(124,58,237,0.15)' : 'rgba(255,255,255,0.03)',
                    boxShadow: theme === t ? '0 0 20px rgba(124,58,237,0.3)' : 'none',
                  }}>
                  <div className="text-2xl mb-2">{THEME_LABELS[t].split(' ')[0]}</div>
                  <div className="text-sm font-semibold">{THEME_LABELS[t].split(' ').slice(1).join(' ')}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Details */}
        {step === 2 && (
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-2xl font-bold">Your details</h2>
              <span className="text-xs px-2 py-0.5 rounded-full"
                style={{ background: 'rgba(168,85,247,0.15)', color: '#c084fc' }}>
                {THEME_LABELS[theme]}
              </span>
            </div>
            <p className="text-white/40 text-sm mb-6">Fill in your info below</p>

            {/* Resume upload */}
            <div className="mb-8 p-4 rounded-xl border border-dashed border-white/10 hover:border-violet-500/50 transition-colors"
              style={{ background: 'rgba(124,58,237,0.04)' }}>
              <input ref={fileRef} type="file" accept=".pdf" onChange={handleResumeUpload} className="hidden" />
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                  <p className="text-sm font-semibold text-white">Upload Resume (PDF)</p>
                  <p className="text-xs text-white/40 mt-0.5">Auto-fill the form using AI — saves you time</p>
                </div>
                <button type="button" onClick={() => fileRef.current?.click()} disabled={parsing}
                  className="px-4 py-2 rounded-lg text-xs font-semibold transition-all hover:brightness-110 disabled:opacity-50"
                  style={{ background: 'linear-gradient(135deg,#7c3aed,#a855f7)' }}>
                  {parsing ? 'Parsing...' : 'Upload PDF'}
                </button>
              </div>
              {parseError && <p className="text-red-400 text-xs mt-3">{parseError}</p>}
              {parsing && <p className="text-violet-400 text-xs mt-3">Reading your resume with AI...</p>}
            </div>

            <form
              className="space-y-6"
              onSubmit={(e) => { e.preventDefault(); setStep(3); navigate(`/preview/${theme}`) }}
            >
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-white/50 uppercase tracking-widest mb-2">Full Name</label>
                  <input value={data.name} onChange={(e) => setData({ name: e.target.value })}
                    placeholder="Alex Rivera" className={inputClass} />
                </div>
                <div>
                  <label className="block text-xs text-white/50 uppercase tracking-widest mb-2">Role / Title</label>
                  <input value={data.role} onChange={(e) => setData({ role: e.target.value })}
                    placeholder="Full Stack Developer" className={inputClass} />
                </div>
              </div>

              <div>
                <label className="block text-xs text-white/50 uppercase tracking-widest mb-2">Email</label>
                <input value={data.email || ''} onChange={(e) => setData({ email: e.target.value })}
                  placeholder="you@example.com" type="email" className={inputClass} />
              </div>

              <div>
                <label className="block text-xs text-white/50 uppercase tracking-widest mb-2">Bio</label>
                <textarea value={data.bio} onChange={(e) => setData({ bio: e.target.value })}
                  rows={3} placeholder="A short description about yourself..."
                  className={`${inputClass} resize-none`} />
              </div>

              <div>
                <label className="block text-xs text-white/50 uppercase tracking-widest mb-2">Skills</label>
                <SkillsInput skills={data.skills} onChange={(skills) => setData({ skills })} />
              </div>

              <div>
                <label className="block text-xs text-white/50 uppercase tracking-widest mb-2">Experience</label>
                <ExperienceInput experience={data.experience || []} onChange={(experience) => setData({ experience })} />
              </div>

              <div>
                <label className="block text-xs text-white/50 uppercase tracking-widest mb-2">Projects</label>
                <ProjectsInput projects={data.projects} onChange={(projects) => setData({ projects })} />
              </div>

              <div>
                <label className="block text-xs text-white/50 uppercase tracking-widest mb-2">Education</label>
                <EducationInput education={data.education || []} onChange={(education) => setData({ education })} />
              </div>

              <div>
                <label className="block text-xs text-white/50 uppercase tracking-widest mb-2">Social Links</label>
                <div className="space-y-3">
                  {['github', 'linkedin', 'twitter'].map((platform) => (
                    <input key={platform}
                      value={data.socials[platform] || ''}
                      onChange={(e) => setData({ socials: { ...data.socials, [platform]: e.target.value } })}
                      placeholder={`${platform.charAt(0).toUpperCase() + platform.slice(1)} URL`}
                      className={inputClass}
                    />
                  ))}
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button type="button" onClick={() => setStep(1)}
                  className="px-6 py-3 rounded-xl text-sm border border-white/10 text-white/60 hover:text-white hover:border-white/20 transition-all">
                  ← Back
                </button>
                <button type="submit"
                  className="flex-1 py-3 rounded-xl text-sm font-semibold transition-all hover:brightness-110"
                  style={{ background: 'linear-gradient(135deg,#7c3aed,#a855f7)', boxShadow: '0 0 20px rgba(124,58,237,0.4)' }}>
                  Preview My Portfolio →
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
