const { DataTypes }=require('sequelize')
const sq=require("../config/connection")


const klinikModel=sq.define("klinik",{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    namaKlinik:{
        type: DataTypes.STRING,
        defaultValue:""
    },
    alamatKlinik:{
        type:DataTypes.STRING,
        defaultValue:""  
    },
});
klinikModel.sync({alter:true})
module.exports=klinikModel