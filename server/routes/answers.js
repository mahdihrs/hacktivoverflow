const router = require('express').Router()
const controller = require('../controllers/answerController')
const isLogin = require('../middlewares/isLogin')
const isOwner = require('../middlewares/isAnswerOwner')

// router.get('/', controller.getAllAnswers)
router.post('/', isLogin, controller.createAnswer)
router.put('/vote/:id', isLogin, controller.vote)
router.get('/profile/getAnswers', isLogin, controller.getUsersAnswers)
// router.get('/:id', controller.getAnswer)
router.put('/:id', isLogin, isOwner, controller.editAnswer)
router.delete('/:id', isLogin, isOwner, controller.removeAnswer)

module.exports = router