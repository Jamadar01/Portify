require('dotenv').config()
const connectDB = require('./src/config/db')
const app = require('./src/app')

const PORT = process.env.PORT || 5000

async function start() {
  await connectDB()
  app.listen(PORT, () => console.log(`Portify API running on port ${PORT}`))
}

start().catch((err) => { console.error(err); process.exit(1) })
