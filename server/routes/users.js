const router = require('express').Router()
const controller = require('../controllers/userController')

router.get('/', controller.allUsers)
router.post('/', controller.register)
router.post('/login', controller.login)
router.get('/:id', controller.getUser)
router.put('/:id', controller.editProfile)
router.delete('/:id', controller.removeUser)

module.exports = router