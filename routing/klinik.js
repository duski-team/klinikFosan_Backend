const controller = require('../controller/klinikController')
const router = require('express').Router()
const authentification=require('../middleware/authentification')

router.post('/register',authentification,controller.register)
router.post('/update/:id',authentification,controller.update)
router.post('/delete/:id',authentification,controller.delete)
router.get('/list',authentification,controller.list)
router.get('/listById/:id',authentification,controller.listbyId)

module.exports = router