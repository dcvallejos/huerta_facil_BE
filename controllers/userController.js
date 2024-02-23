// llamar a la conexión 
const sql = require('../connection.js')


const userController = {
  'login': function (req, res) {

  },
  'createUser': async function (req, res) {

    const send = {}
    const usuario = req.body.usuario,
      provincia = req.body.provincia,
      password = req.body.password;

    const test = await sql`SELECT * FROM usuarios WHERE usuario = ${usuario}`
    if (test.length >= 1) {
      send.errors = []
      const err = {
        "status": 409,
        "title": "Conflict",
        "message": "Email en uso. Utilice otro"
      }
      send.errors.push(err)
      res.send(send)
    } else {
      await sql`SELECT createUser(${usuario}, ${provincia}, ${password})`
      send.data = {
        "message": 'Usuario registrado'
      }
      res.send(send)
    }

  },
  'getFavs': async function (req, res) {
    const send = {}
    var userId = req.params.userId
    const test = await sql `SELECT checkUserById(${userId})`
    const data = await sql`SELECT * FROM getFavs(${userId})`


    if (test.length === 0) {
      send.errors = []
      const err = {
        "msg": "El usuario no existe"
      }
      send.errors.push(err)
      res.send(send)
    }
    else if (data.length === 0) {
      send.errors = []
      const err = {
        "msg": "El usuario no tiene favoritos"
      }
      send.errors.push(err)
      res.send(send)
    }
    else {
      send.data = data
      res.send(send)
    }
  },
  'updateUser': function (req, res) {

  },
  'deleteUser': function (req, res) {

  }
}


module.exports = userController;


/*updateUser(id_usuario_[int], usuario [string] (optional), provincia [string] (optional), password [string] (optional))
En base a un id_usuario, se puede modificar opcionalmente cualquier registro del mismo (dejar NULL en los espacios que no se quiera modificar nada) */