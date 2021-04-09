const { DataTypes } = require('sequelize')
const sq = require("../config/connection");
const jadwal = require('./jadwalModel');
const Jadwa = require('./jadwalModel');
const users = require('./usersModel');
const user= require('./usersModel')

const booking = sq.define("booking", {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    keluhan: {
        type:DataTypes.STRING,
        defaulValue:""
    },
    status: {
        type:DataTypes.INTEGER,
        defaultValue:0
    },
    nomorUrut: {
        type:DataTypes.INTEGER,
    },
    keterangan:{
        type:DataTypes.STRING,
        defaultValue:""
    },
    kodeBooking:{
        type:DataTypes.STRING,
    }
});

booking.belongsTo(jadwal)
jadwal.hasMany(booking)

booking.belongsTo(users, {foreignKey: 'updatedBy'});
users.hasMany(booking)

booking.sync({alter:true})
module.exports = booking