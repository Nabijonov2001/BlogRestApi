const { signupPost } = require('../controllers/signupController')

const router = require('express').Router()

router.post('/', signupPost)

module.exports = {
    path:'/api/signup', router
}