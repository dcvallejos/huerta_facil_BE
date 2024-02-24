const express = require('express');
const router = express.Router();
const validations = require('../utils/registerVal.js')
const idValidations = require('../utils/plantVal.js')
const favsValidations = require('../utils/favsVal.js')
const delUserValidations = require('../utils/deleteUserVal.js')
const updateUserValidations = require('../utils/updateUserVal.js')
const { body, checkSchema, validationResult } = require('express-validator')
const { login, createUser, getFavs, setFav, updateUser, deleteUser } = require('../controllers/userController')

router.post('/login', login)
router.post('/createUser', checkSchema(validations), function (req, res) {
  const invalid = validationResult(req)
  if (!invalid.isEmpty()) {
    const send = {
      "errors": invalid
    }
    res.send(send)
  }
  else {
    createUser(req, res)
  }
})

router.get('/getFavs/:id', idValidations, function (req, res) {
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

router.put('/updateUser', checkSchema(updateUserValidations), function(req,res){

const data = validationResult(req)
if(data.errors.some(el => el.path === 'custom')){
  return res.status(400).json({
    errors: [
      {
        status: '400',
        title: 'Bad Request',
        detail: 'Debe especificar al menos un campo entre los siguientes: usuario, provincia, nombreUsuario, password'
      }
    ]
  });
} else {
  res.send(data)
}
})

// updateUser(req, res)


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
module.exports = router;

