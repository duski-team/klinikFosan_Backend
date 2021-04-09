const { DataTypes }=require('sequelize')
const sq=require("../config/connection");
const klinikModel = require('./klinikModel');
const users = require('./usersModel');


const poolDokter=sq.define("poolDokter",{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
});

poolDokter.belongsTo(users)
users.hasMany(poolDokter)

poolDokter.belongsTo(klinikModel)
klinikModel.hasMany(poolDokter)


poolDokter.sync({alter:true})
module.exports=poolDokter