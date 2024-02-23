const express = require('express')
const router = express.Router()
const {getFilters, getPlantById, getCards, filterBy } = require('../controllers/plantsController')
const { validationResult } = require('express-validator')
const validators = require('../utils/plantVal.js')

router.get('/getFilters', getFilters)

router.get('/getPlantById/:id', validators, function(req, res){
const invalid = validationResult(req)
console.log(invalid)
if(invalid.errors.length > 0){
  res.send(invalid)
} else {
  getPlantById(req, res)
}
})
router.get('/getCards', getCards)

router.post('/filterBy', filterBy)


module.exports = router;