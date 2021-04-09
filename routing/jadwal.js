const controller = require('../controller/jadwalController')
const router = require('express').Router()
const authentification=require('../middleware/authentification')

router.post('/register',authentification,controller.register)
router.get('/cekJadwal',authentification,controller.cekJadwal)
router.post('/cekJadwalByDokter',authentification,controller.CekJadwalbyDokter)
router.get('/cekAllJadwal',authentification,controller.list)
router.post('/update/:id',authentification,controller.update)
router.post('/delete/:id',authentification,controller.delete)


module.exports = router