const controller = require('../controller/bookingController')
const router = require('express').Router()
const authentification=require('../middleware/authentification')

router.post('/bookingOrder',authentification,controller.bookingOrder)
router.get('/cekRiwayat',authentification,controller.cekRiwayat)
router.get('/cekBooking/:jadwalId',authentification,controller.cekBooking)
router.post('/update',authentification,controller.update)
router.post('/rubahStatus/:id',authentification,controller.rubahStatus)
router.delete('/delete/:id',authentification,controller.delete)


module.exports = router