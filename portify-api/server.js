require('dotenv').config()
const connectDB = require('./src/config/db')
const app = require('./src/app')

let connected = false
const connectOnce = async () => {
  if (!connected) { await connectDB(); connected = true }
}

// Vercel serverless export
module.exports = async (req, res) => {
  if (req.method === 'OPTIONS') return app(req, res)
  await connectOnce()
  return app(req, res)
}

// Local development
if (require.main === module) {
  const PORT = process.env.PORT || 5000
  connectDB()
    .then(() => app.listen(PORT, () => console.log(`Portify API running on port ${PORT}`)))
    .catch((err) => { console.error(err); process.exit(1) })
}
