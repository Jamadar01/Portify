import { create } from 'zustand'
import { api } from './api'

const stored = localStorage.getItem('portify_token')

export const useAuthStore = create((set) => ({
  token: stored || null,
  user: null,

  login: async (email, password) => {
    const res = await api.auth.login(email, password)
    localStorage.setItem('portify_token', res.token)
    set({ token: res.token, user: res.user })
    return res
  },

  register: async (name, email, password) => {
    const res = await api.auth.register(name, email, password)
    localStorage.setItem('portify_token', res.token)
    set({ token: res.token, user: res.user })
    return res
  },

  logout: () => {
    localStorage.removeItem('portify_token')
    set({ token: null, user: null })
  },

  fetchMe: async () => {
    try {
      const res = await api.auth.me()
      set({ user: res.user })
    } catch {
      localStorage.removeItem('portify_token')
      set({ token: null, user: null })
    }
  },
}))
