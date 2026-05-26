const router = require('express').Router()
const upload = require('../middleware/upload')
const { parseResume } = require('../controllers/resumeController')

router.post('/parse', upload.single('resume'), parseResume)

module.exports = router
