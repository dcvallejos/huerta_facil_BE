// llamar a la conexión 
const sql = require('../connection.js')
const bcrypt = require('bcrypt')
const { generateToken } = require('../utils/token')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const userController = {

  'login': async function (req, res) {
    const usuario = req.body.usuario
    const password = req.body.password
    const send = {}
    try {
      const data = await sql`SELECT * FROM usuarios WHERE usuario = ${usuario}`
      const user = data[0]

      if (data.length === 0) {
        return res.status(409).send({ errors: [{ status: "409", title: "Conflict", message: 'El usuario no existe' }] })
      }
      else if (bcrypt.compareSync(password, user.pass)) {
        const token = generateToken(user)
        send.data = { type: 'response', attributes: { status: "200", title: "Transaction OK", message: 'Sesión iniciada' } }
        res.cookie('jwt', token)
      }
      else {
        send.errors = [{ status: "409", title: "Conflict", message: 'Contraseña incorrecta' }]
      }
      return res.send(send)
    }
    catch {
      res.status(500).send({ errors: [ { "status": 500,"title": "Internal error", "message": "Error del servidor, contáctese con el administrador" }]})
    }
  },

  'createUser': async function (req, res) {

      const email = req.body.email,
      provincia = req.body.provincia,
      password = req.body.password,
      nombre = req.body.nombre;
    try {
      const test = await sql`SELECT checkUserName(${email})`
      if (test.length >= 1) {
        return res.send({ errors: [{  "status": 409, "title": "Conflict", "message": "Email en uso. Utilice otro" }] })
      } 
      else {
        const hashPass = bcrypt.hashSync(password, 12)
        await sql`SELECT createUser(${email}, ${provincia}, ${hashPass}, ${nombre})`
        return res.send({ type: 'response', attributes: { status: "200", title: "Transaction OK", message: 'Usuario creado exitosamente' } })
      }
    } catch {
      return res.status(500).send({ errors: [ { "status": 500,"title": "Internal error","message": "Error del servidor, contáctese con el administrador" }] })
    }
  },

  'getFavs': async function (req, res) {
    /*Retorna todas los nombres de las plantas favoritas del usuario logueado, precisa que el mismo este en sesion iniciada*/
    var loggedUser = jwt.decode(req.cookies.jwt, process.env.SECRET)
    var extractedUserId = loggedUser["id_usuario"]
    const data = await sql`SELECT * FROM getFavs(${extractedUserId})`

    if (data.length === 0) return res.status(404).send({ errors: [{ "status": 404, "title": "Not Found", "message": "El usuario no tiene favoritos" }] })

    else {
      try {
        return res.send(data)
      } catch (error) {
        return res.status(500).send({ errors: [{ "status": 500, "title": "Internal error", "message": "Error del servidor, contáctese con el administrador" }] })
      }
    }
  },

  'setFav': async function (req, res) {

    // Datos de usuario tomados desde el token
    var loggedUser = jwt.decode(req.cookies.jwt, process.env.SECRET)
    var id_usuario = loggedUser["id_usuario"]
    var id_especie = req.body.id_especie
    const plantTest = await sql`SELECT * FROM getById(${id_especie})`

    if (plantTest.length === 0) return res.status(404).send({ errors: [{ "status": 404, "title": "Not found", "message": "La planta ingresada no existe" }] })

    else {
      try {
        await sql`SELECT setFav(${id_usuario},${id_especie})`
        return res.status(200).send({ errors: [{ "status": 200, "title": "Transaction OK", "message": "Favorito agregado" }] })
      }
      catch {
        // Borra la planta en el caso de que esta ya este en el listado de favoritos
        await sql`SELECT deleteFav(${id_usuario},${id_especie})`
        res.status(200).send({ errors: [{ "status": 200, "title": "Transaction OK", "message": "Planta eliminada del listado de favoritos del usuario" }] })
      }
    }
  },

  'updateUser': async function (req, res) {
    const cookieToken = req.cookies.jwt
    const userData = jwt.verify(cookieToken, process.env.SECRET)

    const email = req.body.email || null
    const provincia = req.body.provincia || null
    const nombre = req.body.nombre || null

    try {
      const test = await sql`SELECT checkUserName(${email})`
      if (test.length >= 1) {
        res.send({
          errors: [{ "status": 409, "title": "Conflict", "message": "Email en uso. Utilice otro" }]})
      } 
      else {
        await sql`SELECT updateUser(${userData.id_usuario}, ${email}, ${provincia}, NULL , ${nombre})`

        // Cambiar por un SP o modificar sp updateUser para que devuelva los datos modificados
        const user = await sql`SELECT * FROM getUserById(${userData.id_usuario})`
        const token = generateToken(user[0])
        res.cookie('jwt', token)
        res.send({ type: 'response', attributes: { status: "200", title: "Transaction OK", message: 'Datos modificados correctamente' } })
      }
    } catch (err) {
      console.log(err)
      res.status(500).send({
        errors: [ {"status": 500,"title": "Internal error", "message": "Error del servidor, contáctese con el administrador" }]})
    }
  },

  'deleteUser': async function (req, res) {
    /*  Elimina un usuario pasado dentro del elemento del body "id_usuario" y activa un trigger 
        que elimina previamente todos sus favoritos */

    var loggedUser = jwt.decode(req.cookies.jwt, process.env.SECRET)
    var id_usuario = loggedUser['id_usuario']
    var key_usuario = req.body.password

    // Verifica si la password hasheada coincide con la enviada
    if (!bcrypt.compareSync(key_usuario, loggedUser.pass)) return res.status(401).send({ errors: [{ "status": 401, "title": "Unauthorized", "message": "Contraseña incorrecta" }] })

    else {
      try {
        await sql`SELECT deleteUser(${loggedUser.pass}, ${id_usuario})`
        res.clearCookie("jwt")
        return res.status(200).send({ errors: [{ "status": 200, "title": "ransaction OK", "message": "Usuario correctamente eliminado" }] })
      }
      catch (error){
        console.log(error.message)
        return res.status(500).send({ errors: [{ "status": 500, "title": "Internal server error", "message": "Error del servidor, contáctese con el administrador" }] })
      }
    }
  },

  'setPassword': async function (req, res) {
    const passwordActual = req.body.passwordActual
    const nuevoPassword = req.body.nuevoPassword
    const cookieToken = req.cookies.jwt
    const userData = jwt.verify(cookieToken, process.env.SECRET)

    try {
      if (!bcrypt.compareSync(passwordActual, userData.pass)) {
        return res.status(409).send({ errors: [{ "status": 409, "title": "Conflict","message": "Password incorrecto" }] })}
      else {
        const hashPass = bcrypt.hashSync(nuevoPassword, 12)
        await sql`SELECT updateUser(${userData.id_usuario}, NULL, NULL, ${hashPass} , NULL)`

        // Cambiar por un SP o modificar sp updateUser para que devuelva los datos modificados
        const user = await sql`SELECT * FROM usuarios WHERE id_usuario = ${userData.id_usuario}`
        const token = generateToken(user[0])
        res.cookie('jwt', token)
        return res.status(200).send({ type: 'response', attributes: { status: "200", title: "Transaction OK", message: 'Contraseña modificada correctamente' } })
      }
    } catch (err) {
      console.log(err)
      res.status(500).send({ errors: [ {"status": 500, "title": "Internal error","message": "Error del servidor, contáctese con el administrador" }]})
    }
  },

  'logout': function (req, res) {
    // solo verifica que haya una cookie (cualquiera con titulo jwt) para poder cerrar la sesion
    const inSession = req.cookies.jwt
    if (inSession) {
      res.clearCookie("jwt")
      res.status(200).send({ data: [{ 'status': 200, 'title': 'Transaction OK', 'Message': 'Sesion correctamente cerrada' }] })
    }
    else {
      res.status(403).send({ data: [{ 'status': 403, 'title': 'Forbidden', 'Message': 'Necesitas inciar sesion antes' }] })
    }
  }
}
module.exports = userController;