const express = require('express')
const router = express.Router()
const {getFilters, getPlantsById, getCards, filterBy } = require('../controllers/plantsController')

router.get('/getFilters', getFilters)
router.get('/getPlantsById/:id', getPlantsById)
router.get('/getCards', getCards)

router.post('/filterBy', filterBy)


module.exports = router;