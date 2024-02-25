const sql = require('../connection.js')

const plantsController = {
'getFilters': function(req, res){

},
'getPlantById': async function(req, res){
const id = req.params.id

try {
  const data = await sql `SELECT * FROM getByID(${id})`

if(data.length === 0){
  const send = {
    "errors":[ {
      "status": 404,
      "title": "Not found",
      "message": "No existe esa planta"
    }]
  }
  res.send(send)
} else {
  const send = {
    "data": data
    }
  res.send(send)
}
} catch {
  res.status(500).send({errors: [
    {
      "status": 500,
      "title": "Internal error",
      "message": "Error del servidor, contáctese con el administrador"
    }]
  })
}
},
'getCards': async function(req, res){
// agregar lógica de paginado
try {
  const data = await sql`SELECT * FROM getCards()`
  res.send(data)
} catch {
  res.status(500).send({errors: [
    {
      "status": 500,
      "title": "Internal error",
      "message": "Error del servidor, contáctese con el administrador"
    }]
  })
}
},
'filterBy': function(req, res){
}
}

module.exports = plantsController