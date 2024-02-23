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
    if(test.length >= 1){
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
  'getFavs': function (req, res) {

  },
  'updateUser': function (req, res) {

  },
  'deleteUser': function (req, res) {

  }
}


module.exports = userController;