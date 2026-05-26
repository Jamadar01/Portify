const router = require('express').Router()
const auth = require('../middleware/auth')
const { savePortfolio, getMyPortfolio, getPublicPortfolio, deletePortfolio } = require('../controllers/portfolioController')

router.post('/', auth, savePortfolio)
router.get('/me', auth, getMyPortfolio)
router.get('/:slug', getPublicPortfolio)
router.delete('/me', auth, deletePortfolio)

module.exports = router
