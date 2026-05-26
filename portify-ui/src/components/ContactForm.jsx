import { useState } from 'react'
import { api } from '../lib/api'

export default function ContactForm({ slug, accentColor = '#7c3aed', bgColor = 'rgba(255,255,255,0.05)', borderColor = 'rgba(255,255,255,0.1)', textColor = '#fff' }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)

  const set = (field, val) => setForm((f) => ({ ...f, [field]: val }))

  const inputStyle = {
    width: '100%', padding: '10px 14px', borderRadius: '8px', fontSize: '14px',
    background: bgColor, border: `1px solid ${borderColor}`, color: textColor,
    outline: 'none', fontFamily: 'inherit',
  }

  async function submit(e) {
    e.preventDefault()
    setLoading(true)
    setStatus(null)
    try {
      await api.contact.send(slug, form.name, form.email, form.message)
      setStatus('sent')
      setForm({ name: '', email: '', message: '' })
    } catch (err) {
      setStatus('error')
    } finally {
      setLoading(false)
    }
  }

  if (status === 'sent') {
    return (
      <div className="text-center py-6">
        <div className="text-3xl mb-3">✉</div>
        <p style={{ color: accentColor, fontWeight: 600 }}>Message sent!</p>
        <p className="text-sm mt-1 opacity-60" style={{ color: textColor }}>They'll get back to you soon.</p>
        <button onClick={() => setStatus(null)} className="mt-4 text-xs underline opacity-50 hover:opacity-80" style={{ color: textColor }}>
          Send another
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={submit} style={{ maxWidth: '480px', margin: '0 auto' }}>
      <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
        <input value={form.name} onChange={(e) => set('name', e.target.value)}
          placeholder="Your name" required style={inputStyle} />
        <input value={form.email} onChange={(e) => set('email', e.target.value)}
          placeholder="Your email" type="email" required style={inputStyle} />
      </div>
      <textarea value={form.message} onChange={(e) => set('message', e.target.value)}
        placeholder="Your message..." required rows={4}
        style={{ ...inputStyle, resize: 'none', marginBottom: '12px' }} />
      {status === 'error' && (
        <p style={{ color: '#f87171', fontSize: '13px', marginBottom: '10px' }}>Failed to send. Please try again.</p>
      )}
      <button type="submit" disabled={loading}
        style={{
          width: '100%', padding: '11px', borderRadius: '8px', fontWeight: 600,
          fontSize: '14px', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1,
          background: `linear-gradient(135deg, ${accentColor}, ${accentColor}cc)`,
          color: '#fff', border: 'none', letterSpacing: '0.5px',
        }}>
        {loading ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  )
}
