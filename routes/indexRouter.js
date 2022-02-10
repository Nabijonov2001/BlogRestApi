const { getCategories, getPosts, sortPostsByCategory, getSinglePost } = require('../controllers/indexController')
const auth = require('../middlewares/auth')
const router = require('express').Router()

router.get('/blog', getPosts)
router.get('/blog/categories', getCategories)
router.get('/blog/category/:category', sortPostsByCategory)
router.get('/blog/:id', auth, getSinglePost)

module.exports = {
    path:'/api', router
}