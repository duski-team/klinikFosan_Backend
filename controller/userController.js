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
        const {username,password,nama,role,alamat,tanggalLahir,jenisKelamin,noHp,specialist,golonganDarah,tinggiBadan,beratBadan,klinikId}=req.body
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
                    role:role,
                    alamat:alamat,
                    tanggalLahir:tanggalLahir,
                    jenisKelamin:jenisKelamin,
                    noHp:noHp,
                    specialist:specialist,
                    golonganDarah:golonganDarah,
                    tinggiBadan:tinggiBadan,
                    beratBadan:beratBadan
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
    
    static update(req,res){
        const {id}=req.params
        const {nama,role,alamat,tanggalLahir,jenisKelamin,noHp,specialist,golonganDarah,tinggiBadan,beratBadan}=req.body
        
        users.update({
           nama:nama,
           role:role,
           alamat:alamat,
           tanggalLahir:tanggalLahir,
           jenisKelamin:jenisKelamin,
           noHp:noHp,
           specialist:specialist,
           golonganDarah:golonganDarah,
           tinggiBadan:tinggiBadan,
           beratBadan:beratBadan,
           klinikId:klinikId
        },{
            where :{
                id:id
            },
            returning: true,
            plain:true
        })
        .then(respon=>{
            res.json(respon)
        })
        .catch(err=>{
            res.json(err)
        })

    }

    static findAll(req,res){
        
        users.findAll({})
        .then(respon=>{
            res.json({respon})
        })
        .catch(err=>{
            res.json(err)
        })
    }
    
    static profile(req,res){
        const {id} = req.dataUsers
        users.findAll({
            where:{
                id :id
            }
        },{returning:true})
        .then(respon=>{
            res.json({respon})
          
        })
        .catch(err=>{
            res.json(err)
        })
    }

    static delete(req,res){
        const {id}= req.params
        users.destroy({
            where:{
                id:id
            }
        })
        .then(data=>{
            res.json("berhasil delete")
        })
        .catch(err=>{
            res.json(err)
        })
    }
}


module.exports= Controller