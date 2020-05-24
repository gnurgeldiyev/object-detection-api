const router = require('express').Router()
const { detectObjects } = require('../controller')
const { validateNewDetection } = require('../middleware')

router.post('/detection', validateNewDetection, detectObjects)

module.exports = router
