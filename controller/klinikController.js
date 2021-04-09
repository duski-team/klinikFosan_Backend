const klinik = require('../model/klinikModel')


class Controller{

    static register(req,res){
        const{namaKlinik,alamatKlinik}= req.body
        klinik.findAll({
            where:{
                alamatKlinik:alamatKlinik
            }
        })
        .then(data=>{
            if(data.length){
                res.json({message :"data sudah ada"})
            }
            else{
                klinik.create({namaKlinik:namaKlinik,alamatKlinik:alamatKlinik},{returning:true})
                .then(data2=>{
                    res.json(data2)
                })
                .catch(err=>{
                    res.json(err)
                })
            }
        })
    }

    static list(req,res){
        klinik.findAll({})
        .then(data=>{
            res.json(data)
        })
        .catch(err=>{
            res.json(err)
        })
    }

    static listbyId(req,res){
        const {id}= req.params
        klinik.findAll({
            where:{
                id:id
            }
        })
        .then(data=>{
            res.json(data)
        })
        .catch(err=>{
            res.json(err)
        })
    }

    static update(req,res){
        const {id}=req.params
        const{namaKlinik,alamatKlinik}= req.body
        
        klinik.update({
            namaKlinik:namaKlinik,
            alamatKlinik:alamatKlinik
        },{
            where :{
                id:id
            },
            returning: true,
            plain:true
        })
        .then(respon=>{
            res.json("berhasil di edit")
        })
        .catch(err=>{
            res.json(err)
        })
    }

    static delete(req,res){
        const {id}= req.params
        klinik.destroy({
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

module.exports=Controller