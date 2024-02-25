const express = require('express');
const router = express.Router();
const validations = require('../utils/registerVal.js')
const idValidations = require('../utils/plantVal.js')
const favsValidations = require('../utils/favsVal.js')
const loginValidations = require('../utils/loginVal.js')
const delUserValidations = require('../utils/deleteUserVal.js')
const { checkSchema, validationResult } = require('express-validator')
const { login, createUser, getFavs, setFav, updateUser, deleteUser, getProvincias } = require('../controllers/userController')
const cookieParser = require('cookie-parser')
const { validateToken } = require('../utils/token')

router.use(cookieParser())

router.post('/login', checkSchema(loginValidations), function(req,res) {
  const invalid = validationResult(req)
  if (!invalid.isEmpty()) {
    res.send(invalid)
  }
  else {
    login(req, res)
  }
})

router.post('/createUser', checkSchema(validations), function (req, res) {
  const invalid = validationResult(req)
  if(!invalid.isEmpty()){
    invalid.errors.some(el => el.path === 'body') ?
    res.status(400).send({ errors: [{
        "status": 400,
        "title": "Bad Request",
        "message": "Solicitud incorrecta, el request body debe contener email, password, nombre y provincia"
      }]
    })
    :
    res.send(invalid)
  }
  createUser(req, res)
})

router.get('/getProvincias', getProvincias)


// A partir de aqui todos los endpoints estan sujetos bajo validacion JWT

router.use(validateToken)

router.get('/getFavs/:id', idValidations, function (req, res) {
  const invalid = validationResult(req)
  console.log(invalid)
  if (invalid.errors.length > 0) {
    res.send(invalid)
  } else {
    getFavs(req, res)
  }
})

router.put('/updateUser', updateUser)

router.delete('/deleteUser', checkSchema(delUserValidations), function (req, res) {
  const invalid = validationResult(req)
  console.log(invalid)
  if (!invalid.isEmpty()) {
    res.send(invalid)
  }
  else {
    deleteUser(req, res)
  }
})

router.post('/setFav/', checkSchema(favsValidations), function (req, res) {
  const invalid = validationResult(req)
  if (!invalid.isEmpty()) {
    const send = {
      "errors": invalid
    }
    res.send(send)
  }
  else {
    setFav(req, res)
  }
})
module.exports = router;