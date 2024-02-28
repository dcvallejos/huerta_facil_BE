const express = require('express')
const router = express.Router()
const {recomendedPlants, filterBy, getPlantById, getCards, getProvincias, getClimas, getTiposPlanta } = require('../controllers/plantsController')
const { validationResult } = require('express-validator')
const validators = require('../utils/plantVal.js')
const cookieParser = require('cookie-parser')
router.use(cookieParser())
const { validateToken } = require('../utils/token')


router.get('/recomendedPlants', validateToken, recomendedPlants)

router.get('/getPlantById/:id', validators, function(req, res){
const invalid = validationResult(req)
console.log(invalid)
if(invalid.errors.length > 0){
  res.send(invalid)
} else {
  getPlantById(req, res)
}
})
router.get('/getProvincias', getProvincias)

router.get('/getClimas', getClimas)

router.get('/getTiposPlanta', getTiposPlanta)

router.get('/getCards', getCards)

router.get('/filterBy', filterBy)

module.exports = router;