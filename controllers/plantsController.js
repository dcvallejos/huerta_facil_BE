const sql = require('../connection.js')

const plantsController = {
'getFilters': function(req, res){

},
'getPlantsById': function(req, res){

},
'getCards': async function(req, res){
// agregar lógica de paginado
const data = await sql`SELECT * FROM getCards()`
res.send(data)
},
'filterBy': function(req, res){
  
}
}

module.exports = plantsController