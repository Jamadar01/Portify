const Portfolio = require('../models/Portfolio')

function generateSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    + '-' + Math.random().toString(36).slice(2, 7)
}

async function savePortfolio(req, res) {
  try {
    const { theme, data, slug: customSlug, isPublic } = req.body
    if (!theme || !data) return res.status(400).json({ error: 'Theme and data are required' })

    let existing = await Portfolio.findOne({ userId: req.user.id })

    const slug = existing?.slug || customSlug || generateSlug(data.name || 'portfolio')

    if (existing) {
      existing.theme = theme
      existing.data = data
      existing.isPublic = isPublic !== undefined ? isPublic : existing.isPublic
      await existing.save()
      return res.json({ portfolio: existing })
    }

    const portfolio = await Portfolio.create({
      userId: req.user.id,
      theme,
      slug,
      data,
      isPublic: isPublic !== undefined ? isPublic : true,
    })
    res.status(201).json({ portfolio })
  } catch (err) {
    if (err.code === 11000) return res.status(409).json({ error: 'Slug already taken, try a different name' })
    res.status(500).json({ error: err.message })
  }
}

async function getMyPortfolio(req, res) {
  try {
    const portfolio = await Portfolio.findOne({ userId: req.user.id })
    if (!portfolio) return res.status(404).json({ error: 'No portfolio found' })
    res.json({ portfolio })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

async function getPublicPortfolio(req, res) {
  try {
    const portfolio = await Portfolio.findOne({ slug: req.params.slug, isPublic: true })
    if (!portfolio) return res.status(404).json({ error: 'Portfolio not found' })
    res.json({ portfolio })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

async function deletePortfolio(req, res) {
  try {
    await Portfolio.findOneAndDelete({ userId: req.user.id })
    res.json({ message: 'Portfolio deleted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

module.exports = { savePortfolio, getMyPortfolio, getPublicPortfolio, deletePortfolio }
