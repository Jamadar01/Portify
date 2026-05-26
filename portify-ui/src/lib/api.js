const BASE = '/api'

function getToken() {
  return localStorage.getItem('portify_token')
}

function authHeaders() {
  const token = getToken()
  return token ? { Authorization: `Bearer ${token}` } : {}
}

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...authHeaders(), ...options.headers },
    ...options,
  })
  const json = await res.json()
  if (!res.ok) throw new Error(json.error || 'Request failed')
  return json
}

export const api = {
  auth: {
    register: (name, email, password) =>
      request('/auth/register', { method: 'POST', body: JSON.stringify({ name, email, password }) }),
    login: (email, password) =>
      request('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
    me: () => request('/auth/me'),
  },

  resume: {
    parse: (file) => {
      const form = new FormData()
      form.append('resume', file)
      return fetch(`${BASE}/resume/parse`, {
        method: 'POST',
        body: form,
      }).then(async (res) => {
        const json = await res.json()
        if (!res.ok) throw new Error(json.error || 'Parse failed')
        return json
      })
    },
  },

  portfolio: {
    save: (theme, data) =>
      request('/portfolio', { method: 'POST', body: JSON.stringify({ theme, data }) }),
    me: () => request('/portfolio/me'),
    getBySlug: (slug) => request(`/portfolio/${slug}`),
    delete: () => request('/portfolio/me', { method: 'DELETE' }),
  },

  contact: {
    send: (slug, name, email, message) =>
      request(`/contact/${slug}`, { method: 'POST', body: JSON.stringify({ name, email, message }) }),
  },
}
