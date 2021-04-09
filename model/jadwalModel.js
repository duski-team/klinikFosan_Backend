const { DataTypes }=require('sequelize')
const sq=require("../config/connection");
const users = require('./usersModel');


const jadwal=sq.define("jadwal",{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    jam: {
        type: DataTypes.STRING,
    },
    tanggal: {
        type: DataTypes.DATEONLY,
    }
});

jadwal.belongsTo(users)
users.hasMany(jadwal)

jadwal.sync({alter:true})
module.exports=jadwal