const jadwal = require("../model/jadwalModel")
const users = require("../model/usersModel")

class Controller{

    static register(req, res){
        const { userId, jamAwal, jamAkhir, tanggal } = req.body
        
        const jam = `${jamAwal} - ${jamAkhir}`
        jadwal.findAll({
            where: { 
                userId: userId,
                jam: jam,
                tanggal:tanggal
            }
        }).then(data => {
            if (data.length) {
                res.json('jadwal sudah ada')
            }
            else {
                jadwal.create({
                    jam: jam,
                    tanggal: tanggal,
                    userId: userId
                }).then(data => {
                    res.json(data)
                })
            }
        }).catch(err => {
            res.json(err)
        })
    }
    static cekJadwal(req,res){
        const dataId=req.dataUser.id
        // console.log(dataId);
        jadwal.findAll({
            where:{
                userId: dataId
            },
            include:[{
                model: users
            }]
        },).then(data=>{
            res.json(data)
        }).catch(err=>{
            res.json(err)
        })
    }

    static CekJadwalbyDokter(req,res){
        const {tanggal,userId}= req.body
        jadwal.findAll({
            where:{
                tanggal:tanggal,
                userId:userId
            },
            include:users
        }).then(data=>{
            res.json(data)
        }).catch(err=>{
            res.json(err)
        })
    }

    static list(req,res){
        jadwal.findAll({
         
            include:[users]
        }).then(data=>{
            res.json(data)
        }).catch(err=>{
            res.json(err)
        })
    }
    static update (req,res){
        const {id}= req.params
        const {jamAwal, jamAkhir, tanggal } = req.body
        jadwal.findAll({
            where:{
                id:id
            }
        }).then(data=>{
            if(data.length){
                console.log("asdsad")
                jadwal.update({
                    jamAwal:jamAwal,
                    jamAkhir:jamAkhir,
                    tanggal : tanggal
                },{
                    where :{
                        id:id
                    }
                }).then(data=>{
                    res.json("berhasil di edit")
                })
            }
        }).catch(err=>{
            res.json(err)
        })
    }
    static delete (req,res){
        const{id}=req.headers;
            jadwal.destroy({
                where:{
                    id:id
                }
            }).then(data=>{
                res.status(200).json({message:'sukses'})
            }).catch(data=>{
                res.status(500).json({message:'gagal'})
            })
    }

}
module.exports = Controller