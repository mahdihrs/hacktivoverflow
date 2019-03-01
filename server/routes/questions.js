const router = require('express').Router()
const controller = require('../controllers/questionController')
const isLogin = require('../middlewares/isLogin')
const isOwner = require('../middlewares/isQuestionOwner')

router.get('/', controller.getAllQuestions)
router.post('/', isLogin, controller.createQuestion)
router.put('/vote/:id', isLogin, controller.vote)
router.get('/profile/getQuestions', isLogin, controller.getUsersQuestion)
router.get('/search-tag/:tagId', controller.searchByTag)
router.get('/:id', controller.getQuestion)
router.put('/:id', isLogin, isOwner, controller.editQuestion)
router.delete('/:id', isLogin, isOwner, controller.removeQuestion)

module.exports = router