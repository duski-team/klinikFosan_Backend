const router=require('express').Router()
const Controller=require("../controller/userController")
 const authentification = require('../middleware/authentification')
// const authorization = require('../middleware/authorization')

router.post('/register',Controller.register)
router.post('/login', Controller.login)
router.get('/listAll',Controller.findAll)
router.get('/profile',authentification,Controller.profile)
router.post('/delete/:id',authentification,Controller.delete)


module.exports=router