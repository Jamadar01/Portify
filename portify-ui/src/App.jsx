import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Landing from './pages/Landing'
import Builder from './pages/Builder'
import Preview from './pages/Preview'
import PublicPortfolio from './pages/PublicPortfolio'
import Dashboard from './pages/Dashboard'
import { useAuthStore } from './lib/authStore'
import './index.css'

export default function App() {
  const { token, fetchMe } = useAuthStore()
  useEffect(() => { if (token) fetchMe() }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/builder" element={<Builder />} />
        <Route path="/preview/:theme" element={<Preview />} />
        <Route path="/p/:slug" element={<PublicPortfolio />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
