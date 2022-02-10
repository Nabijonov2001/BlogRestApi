const {
    createCategory, getCategories,
    updateCategory, deleteCategory} = require('../controllers/adminController')
const admin = require('../middlewares/admin')

const router = require('express').Router()

router.get('/categories', admin, getCategories)
router.post('/categories', admin, createCategory)
router.put('/categories/:id', admin, updateCategory)
router.delete('/categories/:id', admin, deleteCategory)

module.exports = {
    path: '/api/admin', router
}