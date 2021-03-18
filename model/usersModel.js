const { DataTypes }=require('sequelize')
const sq=require("../config/connection")


const UserModel=sq.define("users",{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    username:{
        type:DataTypes.STRING,
        defaultValue:""
    },
    nama:{
        type: DataTypes.STRING,
        defaultValue:""
    },
    password:{
        type:DataTypes.STRING,
        
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
    noTelp:{
        type:DataTypes.STRING,
        
    },
});
UserModel.sync({alter:true})
module.exports=UserModel