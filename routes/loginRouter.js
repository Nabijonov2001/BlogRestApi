const { loginPost } = require('../controllers/loginController')

const router = require('express').Router()

router.post('/', loginPost)

module.exports = {
    path:'/api/login', router
}