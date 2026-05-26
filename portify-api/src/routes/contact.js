const router = require('express').Router()
const { sendContact } = require('../controllers/contactController')

router.post('/:slug', sendContact)

module.exports = router
