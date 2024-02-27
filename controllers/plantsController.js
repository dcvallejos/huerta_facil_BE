const { escape } = require('mysql2')
const sql = require('../connection.js')

const plantsController = {
  'filterBy': async function (req, res) {
    // agregar lógica de paginado
    const page = parseInt(req.query.page) || null
    const limit = parseInt(req.query.limit) || null
    var clima = (req.query.clima) || null
    var provincia = (req.query.provincia) || null
    var tipoPlanta = (req.query.tipo_planta) || null

    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    try {
      tipoPlanta === "null" ? tipoPlanta = null : decodeURIComponent(tipoPlanta)
      provincia === "null" ? provincia = null : decodeURIComponent(provincia)
      clima === "null" ? clima = null : decodeURIComponent(clima)

      console.log(clima)
      const totalPags = await sql`SELECT * FROM getFiltered(provincia_param => ${provincia}, clima_param => ${clima}, tipo_planta_param =>${tipoPlanta})`
      const data = await sql`SELECT * FROM getFiltered(offset_param => ${page}, limit_param => ${limit}, provincia_param => ${provincia}, clima_param => ${clima}, tipo_planta_param =>${tipoPlanta})`
      const paginado = {
        total: totalPags.length,
        items_per_page: limit,
        current_page: page,
        total_pages: Math.ceil(totalPags.length / limit)

      }

      if (startIndex > 0){
        paginado.previous_page = page - 1
        paginado.next_url = (`http://localhost:3000/plants/getFilters?page=${page - 1}&limit=${limit}&clima=${encodeURIComponent(clima)}&provincia=${encodeURIComponent(provincia)}&tipoPlanta=${encodeURIComponent(tipoPlanta)}`)
      }
        
      if (endIndex < totalPags.length - 1) {
        paginado.next_page = page + 1;
        paginado.next_url = (`http://localhost:3000/plants/getFilters?page=${page + 1}&limit=${limit}&clima=${encodeURIComponent(clima)}&provincia=${encodeURIComponent(provincia)}&tipoPlanta=${encodeURIComponent(tipoPlanta)}`)
      }
      res.send({ pagination: paginado, data: data })
    } catch (err) {
      console.log(err)
      res.status(500).send({ errors: [ {"status": 500, "title": "Internal error", "message": "Error del servidor, contáctese con el administrador" }]})
    }
  },
  
  'getPlantById': async function (req, res) {
    const id = req.params.id

    try {
      const data = await sql`SELECT * FROM getByID(${id})`

      if (data.length === 0)  res.status(404).send({"errors": [{"status": 404,"title": "Not found", "message": "No existe esa planta" }] })

      else res.send({"data": data })

    } 
    catch {
      res.status(500).send({ errors: [ { "status": 500, "title": "Internal error", "message": "Error del servidor, contáctese con el administrador" }]})
    }

  },

  'getCards': async function (req, res) {
    // agregar lógica de paginado
    const page = parseInt(req.query.page) || null
    const limit = parseInt(req.query.limit) || null

    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    try {
      const totalPags = await sql`SELECT * FROM getCards()`
      const data = await sql`SELECT * FROM getCards(offset_val => ${page}, limit_val => ${limit})`
      const paginado = {
        total: totalPags.length,
        items_per_page: limit,
        current_page: page,
        total_pages: Math.ceil(totalPags.length / limit)

      }
      if (startIndex > 0) paginado.previous_page = page - 1
      if (endIndex < totalPags.length - 1) {
        paginado.next_page = page + 1;
        paginado.next_url = `https://huertafacil-back-dev-szgg.2.us-1.fl0.io/plants/getCards?page=${page + 1}&limit=${limit}`
      }

      res.send({ pagination: paginado, data: data })
    } catch (err) {
      console.log(err)
      res.status(500).send({ errors: [ {"status": 500,"title": "Internal error", "message": "Error del servidor, contáctese con el administrador" }] })
    }
  },

  'getProvincias': async function (req, res) {
    // Devuelve listado completo de provincias con su numero de Id
    try {
      const data = await sql`SELECT * FROM getProvinces()`
      return res.send({ data })
    } catch {
      return res.status(500).send({ errors: [{ "status": 500, "title": "Internal error", "message": "Error del servidor, contáctese con el administrador" }] })
    }
  },

  'getClimas': async function (req, res) {
    // Devuelve listado completo de climas con su numero de Id
    try {
      const data = await sql`SELECT * FROM getWeathers()`
      return res.send({ data })
    } catch {
      return res.status(500).send({ errors: [{ "status": 500, "title": "Internal error", "message": "Error del servidor, contáctese con el administrador" }] })
    }
  },

  'getTiposPlanta': async function (req, res) {
    // Devuelve listado completo de tipos de planta con su numero de Id
    try {
      const data = await sql`SELECT * FROM getPlantTypes()`
      return res.send({ data })
    } catch {
      return res.status(500).send({ errors: [{ "status": 500, "title": "Internal error", "message": "Error del servidor, contáctese con el administrador" }] })
    }
  }
}

module.exports = plantsController
