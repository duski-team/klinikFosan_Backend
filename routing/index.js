const router =require('express').Router()
const users=require("./users")
const klinik = require('./klinik')
const poolDokter = require('./poolDokter')
const jadwal = require('./jadwal')

router.use('/users',users)
router.use('/klinik',klinik)
router.use('/poolDokter',poolDokter)
router.use('/jadwal',jadwal)

module.exports=router
