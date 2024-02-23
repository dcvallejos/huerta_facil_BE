const express = require('express');
const router = express.Router();
const { login, createUser, getFavs, setFav, updateUser, deleteUser } = require('../controllers/userController')
const validations = require('../utils/registerVal.js')
const plantValidations = require('../utils/plantVal.js')
const favsValidations = require('../utils/favsVal.js')
const { checkSchema, validationResult } = require('express-validator')

router.post('/login', login)
router.post('/createUser', checkSchema(validations), function (req, res) {
  const invalid = validationResult(req)
  if (invalid) {
    const send = {
      "errors": invalid
    }
    res.send(send)
  }
  else {
    createUser(req, res)
  }
})

router.get('/getFavs/:id', plantValidations, function (req, res) {
  const invalid = validationResult(req)
  console.log(invalid)
  if (invalid.errors.length > 0) {
    res.send(invalid)
  } else {
    getFavs(req, res)
  }
})

router.post('/setFav/', checkSchema(favsValidations), function (req, res) {
  const invalid = validationResult(req)
  if (invalid) {
    const send = {
      "errors": invalid
    }
    res.send(send)
  }
  else {
    setFav(req, res)
  }
})

router.put('/updateUser', updateUser)

router.delete('/deleteUser', deleteUser)

module.exports = router;