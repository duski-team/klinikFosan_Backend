const { DataTypes }=require('sequelize')
const sq=require("../config/connection")
const klinik = require('./klinikModel')


const users=sq.define("users",{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    username:{
        type:DataTypes.STRING,
        defaultValue:""
    },
    password:{
        type:DataTypes.STRING,
        
    },
    nama:{
        type: DataTypes.STRING,
        defaultValue:""
    },
    role:{
        type:DataTypes.STRING,
        defaultValue:"pasien"
    },
    alamat:{
        type:DataTypes.STRING,
        defaultValue:""
    },
    tanggalLahir:{
        type:DataTypes.DATE,
    },
    jenisKelamin:{
        type:DataTypes.STRING,
        defaultValue:""
    },
    noHp:{
        type:DataTypes.STRING,
    },
    specialist:{
        type:DataTypes.STRING,
        defaultValue:""
    },
    golonganDarah:{
        type:DataTypes.STRING,
        defaultValue:""
    },
    tinggiBadan:{
        type:DataTypes.INTEGER,
        defaultValue:0
    },
    beratBadan:{
        type:DataTypes.INTEGER,
        defaultValue:0
    }
});

users.belongsTo(klinik)
klinik.hasMany(users)

users.sync({alter:true})
module.exports=users