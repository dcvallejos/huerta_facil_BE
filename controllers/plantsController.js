const sql = require('../connection.js')

const plantsController = {
'getFilters': function(req, res){

},
'getPlantById': async function(req, res){
const id = req.params.id
const data = await sql `SELECT * FROM getByID(${id})`

if(data.length === 0){
  const send = {
    "errors": {
      "msg": "No se encontraron registros"
    }
  }
  res.send(send)
} else {
  const send = {
    "data": data
    }
  res.send(send)
}

},
'getAllCards': async function(req, res){
const test = await sql `SELECT * FROM obtener_datos_especies()`
res.send(test)

},
'filterBy': function(req, res){
  
}
}

module.exports = plantsController