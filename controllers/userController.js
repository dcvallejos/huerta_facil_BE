// llamar a la conexión 



const userController = {
  'login': function (req, res) {

  },
  'createUser': function (req, res) {

    const send = {
      "data": {}
    }
    res.send('hola')
  },
  'getFavs': function (req, res) {
    
    res.send("pelele")

  },
  'updateUser': function (req, res) {

  },
  'deleteUser': function (req, res) {

  }
}


module.exports = userController;