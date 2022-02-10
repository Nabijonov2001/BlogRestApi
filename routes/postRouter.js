const { createPost, getPosts, updatePost, deletePost } = require('../controllers/postController')
const admin = require('../middlewares/admin')

const router = require('express').Router()

router.get('/posts', admin, getPosts)
router.post('/posts/create', admin, createPost)
router.put('/posts/:id', admin, updatePost)
router.delete('/posts/:id', admin, deletePost)

module.exports = {
    path:'/api/admin', router
}