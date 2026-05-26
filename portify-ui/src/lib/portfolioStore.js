import { create } from 'zustand'

export const defaultData = {
  name: 'Alex Rivera',
  role: 'Full Stack Developer',
  bio: 'Passionate developer crafting seamless digital experiences. I love turning complex problems into elegant solutions with clean code and thoughtful design.',
  email: 'alex@example.com',
  skills: ['React', 'Node.js', 'Python', 'TypeScript', 'PostgreSQL', 'Docker', 'AWS', 'Figma'],
  experience: [
    {
      company: 'Nexus Technologies',
      role: 'Senior Full Stack Developer',
      period: '2022 — Present',
      description: 'Led a team of 6 engineers building a SaaS analytics platform serving 200k+ users. Reduced API latency by 40% through caching strategies and query optimization.',
    },
    {
      company: 'BlueWave Studios',
      role: 'Frontend Engineer',
      period: '2020 — 2022',
      description: 'Built interactive data visualization dashboards with React and D3.js. Shipped 12 major features across 2 product lines, improving user retention by 28%.',
    },
    {
      company: 'Freelance',
      role: 'Full Stack Developer',
      period: '2018 — 2020',
      description: 'Delivered 20+ web applications for clients across e-commerce, healthcare, and fintech. Stack: React, Node.js, PostgreSQL, AWS.',
    },
  ],
  projects: [
    {
      title: 'NovaSphere',
      description: 'A real-time collaboration platform with WebSocket-powered live editing for distributed teams.',
      link: 'https://github.com',
    },
    {
      title: 'PulseAPI',
      description: 'High-performance REST API gateway handling 50k+ requests/sec with intelligent caching.',
      link: 'https://github.com',
    },
    {
      title: 'Mindflow',
      description: 'AI-driven journaling app that analyzes mood patterns and surfaces personal insights.',
      link: 'https://github.com',
    },
  ],
  education: [
    {
      institution: 'MIT',
      degree: 'B.S. Computer Science',
      year: '2018',
    },
    {
      institution: 'Coursera / Google',
      degree: 'Professional Certificate — Cloud Architecture',
      year: '2021',
    },
  ],
  socials: {
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
  },
  avatarUrl: '',
}

export const usePortfolioStore = create((set) => ({
  step: 1,
  theme: '',
  data: { ...defaultData },

  setStep: (step) => set({ step }),
  setTheme: (theme) => set({ theme }),
  setData: (data) => set((state) => ({ data: { ...state.data, ...data } })),
  resetData: () => set({ data: { ...defaultData } }),
}))
