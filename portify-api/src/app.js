const express = require('express')
const cors = require('cors')

const authRoutes = require('./routes/auth')
const resumeRoutes = require('./routes/resume')
const portfolioRoutes = require('./routes/portfolio')
const contactRoutes = require('./routes/contact')

const app = express()

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:4173',
  process.env.CLIENT_URL,
].filter(Boolean).map(o => o.replace(/\/$/, ''))

const corsOptions = {
  origin: (origin, cb) => {
    if (!origin) return cb(null, true)
    const clean = origin.replace(/\/$/, '')
    if (allowedOrigins.includes(clean) || clean.endsWith('.vercel.app')) {
      return cb(null, true)
    }
    cb(new Error(`CORS: origin ${origin} not allowed`))
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}

app.use(cors(corsOptions))
app.options('*', cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/api/health', (req, res) => res.json({ status: 'ok' }))

app.use('/api/auth', authRoutes)
app.use('/api/resume', resumeRoutes)
app.use('/api/portfolio', portfolioRoutes)
app.use('/api/contact', contactRoutes)

app.use((err, req, res, next) => {
  const status = err.status || 500
  res.status(status).json({ error: err.message || 'Internal server error' })
})

module.exports = app
