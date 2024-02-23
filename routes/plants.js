const express = require('express')
const router = express.Router()
const {getFilters, getPlantById, getAllCards, filterBy } = require('../controllers/plantsController')

router.get('/getFilters', getFilters)
router.get('/getPlantById/:id', getPlantById)
router.get('/getAllCards', getAllCards)

router.post('/filterBy', filterBy)


module.exports = router;