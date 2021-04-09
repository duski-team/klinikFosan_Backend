const sequelize = require('sequelize')
const booking = require("../model/bookingModel")
const jadwal = require("../model/jadwalModel")
const users = require("../model/usersModel")
const bcrypt = require("../helper/bcrypt")

class Controller{

    static bookingOrder(req, res){
        
        const dataId = req.dataUsers.id
        const {jadwalId,keluhan} = req.body
        const x = bcrypt.hashPassword( jadwalId )
        let bookingCode = x.slice(7, 11) + dataId
        console.log(x);
        booking.findAll({
            where: {
                jadwalId: jadwalId
            }
        }).then(nomor => {
            const noUrut = nomor.length + 1
            booking.findAll({
                where: { 
                    userId: dataId,
                    jadwalId: jadwalId,
                    keluhan:keluhan
                }
            }).then(data => {
                if (data.length) {
                    res.json('jadwal sudah ada')
                }
                else {
                    booking.create({
                        userId: dataId,
                        jadwalId: jadwalId,
                        keluhan: keluhan,
                        nomorUrut: noUrut,
                        kodeBooking: bookingCode
                    }).then(data => {
                        res.status(200).json(data)
                    })
                }
            })

        }).catch(err => {
            res.status(400).json(err)
        })
    }
    static cekRiwayat(req, res) {
        const dataId = req.dataUsers.id
        booking.findAll({
            where: {
                userId: dataId
            }, 
            include: [{
                model: jadwal,
                include:[ users ]
            }]
        }).then(data => {
            res.status(200).json(data)
        }).catch(err => {
            res.status(500).json(err)
        })
    }

    static cekBooking(req, res) {
        const {jadwalId} = req.params
        booking.findAll({
            attributes:[
                [sequelize.fn('COUNT',sequelize.col('status')),'jumlahBookingan']
            ],
            where: {
                jadwalId: jadwalId,
                status:1
            }, 
            
        }).then(data => {
            booking.findAll({
                where:{
                    jadwalId:jadwalId,
                },
                include: [{
                    model: jadwal,
                    include:[ users ]
                }]
            }).then(data2=>{
                data2[0].dataValues.jumlahBooking = data[0].dataValues.jumlahBookingan
                res.status(200).json(data2)
            })
        }).catch(err => {
            res.status(500).json(err)
        })
    }

    

    static update(req,res){
        const dataId = req.dataUsers.id
        // console.log(dataId);
        const{ jadwalId, } =req.body
        booking.findAll({
            where:{
                userId: dataId
            }
        }).then(data=>{
            if(data.length){
            booking.update({
                    jadwalId:jadwalId,
                    keluhan: keluhan
            }, {
                where: {
                    userId: dataId
                }
            }).then(data=>{
                res.status(200).json(data)
            })
        }
        }).catch(err=>{
            res.status(500).json(err)
        })
    }

    static rubahStatus(req,res){
        const {id}=req.params
        const dataId = req.dataUsers.id
        const{ status,keterangan } =req.body
        booking.findAll({
            where:{
                id:id
            }
        }).then(data=>{
            if(data.length){
            booking.update({
                    status:status,
                    updatedBy:dataId,
                    keterangan:keterangan
            }, {
                where: {
                    id: id
                }
            }).then(data=>{
                res.status(200).json("update sukses")
            })
        }
        }).catch(err=>{
            res.status(500).json(err)
        })
    }

    static delete(req,res){
        const{id}=req.params;
        console.log(id)
        booking.destroy({
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