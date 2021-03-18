const router=require('express').Router()
const Controller=require("../controller/userController")
// const authentification = require('../middleware/authentification')
// const authorization = require('../middleware/authorization')

router.post('/register',Controller.register)
router.post('/login', Controller.login)


module.exports=router