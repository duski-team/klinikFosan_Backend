const {verifyToken} = require('../helper/jwt')
const users = require('../model/usersModel')

function authentification(req,res,next){
    
    // console.log(req.headers.token, "auten")
 const decode = verifyToken(req.headers.token)

   users.findAll({
        where:{
            id : decode.id,
            password:decode.password
        }
    })
    .then(data=>{
        //  console.log(data.length)
        if(data.length>0){ 
            // console.log("masuk data")
            req.dataUsers=decode
            next()
        }
        else{
            // console.log("masuk else")
            res.json("anda belum login")
        }
    })
    .catch(err=>{
       
        next(err)
        
    })
}

module.exports = authentification
