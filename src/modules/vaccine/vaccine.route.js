const express = require('express')
const vaccineController = require('./controllers/vaccine.controller')
const router = express.Router()

//Log activity จะแสดงผลใน terminal
router.use(function timelog (req, res, next){
    console.log(`NOW -> ${new Date()}`)
    next()
})

router.get('/', vaccineController.getVaccines)
router.get('/byId=:id', vaccineController.getVaccineById)
router.get('/byName=:name', vaccineController.getVaccineByName)
router.post('/', vaccineController.createVaccine)

module.exports = router