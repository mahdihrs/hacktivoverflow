const router = require('express').Router()
const questions = require('../routes/questions')
const answers = require('../routes/answers')
const users = require('../routes/users')

router.use('/questions', questions)
router.use('/answers', answers)
router.use('/users', users)

module.exports = router