const router =require('express').Router()
const users=require("./users")
const klinik = require('./klinik')
const poolDokter = require('./poolDokter')
const jadwal = require('./jadwal')
const booking = require('./booking')

router.use('/users',users)
router.use('/klinik',klinik)
router.use('/poolDokter',poolDokter)
router.use('/jadwal',jadwal)
router.use('/booking',booking)

module.exports=router
