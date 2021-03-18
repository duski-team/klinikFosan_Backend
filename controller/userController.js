const users=require("../model/usersModel")
const bcrypt=require("../helper/bcrypt")
const jwt= require("../helper/jwt")

function createAdmin() {
    let adminpass = bcrypt.hashPassword("admin")
    users.findOrCreate({

        where: {
            username: "admin"
        },
        defaults: {
            password: adminpass,
            role : "admin"
        }
    })
}

createAdmin()


class Controller{

    static register(req,res){
        const {username,nama,password,jabatan,alamat,noTelp,jenisKelamin,tanggalLahir}=req.body
        let encryptedPassword = bcrypt.hashPassword(password)
        users.findAll({where:{username:username}})
        .then(data=>{
            if(data.length){
            res.json('username sudah ada')
            }
            else{
                users.create({
                    username:username,
                    nama:nama,
                    password:encryptedPassword,
                    jabatan:jabatan,
                    alamat:alamat,
                    noTelp:noTelp,
                    jenisKelamin:jenisKelamin,
                    tanggalLahir:tanggalLahir,
                },{returning:true}).then(respon=>{
                    res.status(200).json(respon)
                }).catch(err=>{
                    res.status(500).json(err)
                })
            }   
        })
    }
    static login(req,res){
        const {username,password}=req.body
        users.findAll({where:{username:username}})
        .then(data=>{
            if(data.length){
            let hasil = bcrypt.compare(password, data[0].dataValues.password)
            if(hasil){
                res.status(200).json([{token : jwt.generateToken(data[0].dataValues)},{id:data[0].id},{jabatan:data[0].jabatan}])
            }
            else{
                res.status(400).json({message:"password salah"})
            }
        }
            else{
            res.status(400).json('maaf username tidak ditemukan')
        }
        })
        .catch(err => {
            res.status(500).json({message:err})
        })
    }
}


module.exports= Controller