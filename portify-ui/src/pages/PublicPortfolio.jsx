import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { api } from '../lib/api'
import Cosmic from '../components/themes/Cosmic'
import Cyberpunk from '../components/themes/Cyberpunk'
import DeepOcean from '../components/themes/DeepOcean'
import MinimalPaper from '../components/themes/MinimalPaper'

const THEMES = { cosmic: Cosmic, cyberpunk: Cyberpunk, deepocean: DeepOcean, minimalpaper: MinimalPaper }

export default function PublicPortfolio() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [portfolio, setPortfolio] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    api.portfolio.getBySlug(slug)
      .then((res) => setPortfolio(res.portfolio))
      .catch(() => setError('Portfolio not found'))
  }, [slug])

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center"
        style={{ background: '#070810', color: '#fff', fontFamily: "'Space Grotesk', sans-serif" }}>
        <div className="text-center">
          <p className="text-white/50 mb-4">{error}</p>
          <button onClick={() => navigate('/')} className="text-violet-400 hover:text-violet-300">← Go Home</button>
        </div>
      </div>
    )
  }

  if (!portfolio) {
    return (
      <div className="min-h-screen flex items-center justify-center"
        style={{ background: '#070810', fontFamily: "'Space Grotesk', sans-serif" }}>
        <div className="w-8 h-8 rounded-full border-2 border-violet-500 border-t-transparent animate-spin" />
      </div>
    )
  }

  const ThemeComponent = THEMES[portfolio.theme]
  if (!ThemeComponent) return null

  return <ThemeComponent data={portfolio.data} slug={slug} />
}
