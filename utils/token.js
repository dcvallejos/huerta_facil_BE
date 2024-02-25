require('dotenv').config()
require('cookie-parser')
const jwt = require('jsonwebtoken')

const tokenFunctions = {
  "generateToken": (user) => {
    return jwt.sign(user, process.env.SECRET, { expiresIn: "30m" })
  },
  "validateToken": (req, res, next) => {
    const accessToken = req.cookies.jwt
    if (!accessToken) {
      res.status(401).send({ errors: [{ status: "401", title: "unauthorized", message: 'No autorizado' }] })
    }
    jwt.verify(accessToken, process.env.SECRET, (err, user) => {
      if (err) {
        console.log(err)
        res.status(401).send({ errors: [{ status: "401", title: "unauthorized", message: 'Token expirado o incorrecto' }] })
      } else {
        next()
      }
    })
  }
}

module.exports = tokenFunctions