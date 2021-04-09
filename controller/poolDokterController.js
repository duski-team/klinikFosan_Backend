const poolDokter = require('../model/poolDokterModel')


class Controller{

    static register(req,res){
        const{userId,klinikId}= req.body
        poolDokter.findAll({
            where:{
                userId:userId
            }
        })
        .then(data=>{
            if(data.length){
                res.json({message :"data sudah ada"})
            }
            else{
                poolDokter.create({userId:userId,klinikId:klinikId},{returning:true})
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
        poolDokter.findAll({})
        .then(data=>{
            res.json(data)
        })
        .catch(err=>{
            res.json(err)
        })
    }


    static update(req,res){
        const {id}=req.params
        const{userId,klinikId}= req.body
        
        poolDokter.update({
            userId:userId,
            klinikId:klinikId
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
        poolDokter.destroy({
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