const {getUsers, addOrRemoveAdmin } = require('../controllers/superAdminController')
const superadmin = require('../middlewares/superadmin')

const router = require('express').Router()

router.get('/', superadmin, getUsers)
router.put('/:id', superadmin, addOrRemoveAdmin)

module.exports  = {
    path:'/api/superadmin', router
}