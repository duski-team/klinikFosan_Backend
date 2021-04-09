const {verifyToken} = require('../helper/jwt')
const users = require('../model/usersModel')

function authorizationAdmin(req,res,next){
    
    
 const decode = verifyToken(req.headers.accesstoken)
 users.findAll({
        where:{
            password:decode.password
        }
    })
    .then(data=>{   
        if(data[0].dataValues.role=="admin"){ 
            next()
        }
        else{
            res.json({status : 400,message :"anda bukan admin" })
        }
    })
    .catch(err=>{
        next(err)
        
    })
}



module.exports = {authorizationAdmin}
