const sql = require('../connection.js')

const plantsController = {
'getFilters': function(req, res){

},
'getPlantsById': function(req, res){

},
'getAllCards': async function(req, res){
const test = await sql `SELECT * FROM obtener_datos_especies()`
res.send(test)

},
'filterBy': function(req, res){
  
}
}

module.exports = plantsController