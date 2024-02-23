const express = require('express')
const router = express.Router()
const {getFilters, getPlantById, getAllCards, filterBy } = require('../controllers/plantsController')
const { validationResult } = require('express-validator')
const validators = require('../utils/plantVal.js')

router.get('/getFilters', getFilters)
router.get('/getPlantById/:id', validators, function(req, res){
const invalid = validationResult(req)
if(invalid.errors.length > 0){
  res.send(invalid)
} else {
  getPlantById(req, res)
}
})
router.get('/getAllCards', getAllCards)

router.post('/filterBy', filterBy)


module.exports = router;