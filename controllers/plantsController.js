const { escape } = require('mysql2')
const sql = require('../connection.js')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const plantsController = {

  'filterBy': async function (req, res) {
    // agregar lógica de paginado
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 15
    var clima = (req.query.clima) || null
    var provincia = (req.query.provincia) || null
    var tipoPlanta = (req.query.tipo_planta) || null

    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    try {
      tipoPlanta === "null" ? tipoPlanta = null : decodeURIComponent(tipoPlanta)
      provincia === "null" ? provincia = null : decodeURIComponent(provincia)
      clima === "null" ? clima = null : decodeURIComponent(clima)

      const totalPags = await sql`SELECT * FROM filterBy(provincia_param => ${provincia}, clima_param => ${clima}, tipo_planta_param =>${tipoPlanta})`
      const data = await sql`SELECT * FROM filterBy(offset_param => ${startIndex}, limit_param => ${limit}, provincia_param => ${provincia}, clima_param => ${clima}, tipo_planta_param =>${tipoPlanta})`
      const paginado = {
        total: totalPags.length,
        items_per_page: limit == null?  'all' : limit,
        current_page: page,
        total_pages:  limit == null ? 1 : Math.ceil(totalPags.length / limit)

      }

      if (startIndex > 0){
        paginado.previous_page = page - 1
        paginado.previous_url = (`${process.env.HOST_URL}/plants/filterBy?page=${page - 1}&limit=${limit}&clima=${encodeURIComponent(clima)}&provincia=${encodeURIComponent(provincia)}&tipoPlanta=${encodeURIComponent(tipoPlanta)}`)
      }
        
      if (endIndex < totalPags.length - 1 && paginado.total_pages > 1) {
        paginado.next_page = page + 1;
        paginado.next_url = (`${process.env.HOST_URL}/plants/filterBy?page=${page + 1}&limit=${limit}&clima=${encodeURIComponent(clima)}&provincia=${encodeURIComponent(provincia)}&tipoPlanta=${encodeURIComponent(tipoPlanta)}`)
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
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 15

    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    try {
      const totalPags = await sql`SELECT * FROM getCards()`
      const data = await sql`SELECT * FROM getCards(offset_val => ${startIndex}, limit_val => ${limit})`
      const paginado = {
        total: totalPags.length,
        items_per_page: limit,
        current_page: page,
        total_pages: Math.ceil(totalPags.length / limit)

      }
      if (startIndex > 0) {
        paginado.previous_page = page - 1
        paginado.previous_url = (`${process.env.HOST_URL}/plants/getCards?page=${page - 1}&limit=${limit}`)
        
      }
      if (endIndex < totalPags.length - 1  && paginado.total_pages > 1) {
        paginado.next_page = page + 1;
        paginado.next_url = `${process.env.HOST_URL}/plants/getCards?page=${page + 1}&limit=${limit}`
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
  },

  'recommendedPlants': async function (req,res){
    var page = parseInt(req.query.page) || 1
    var limit = parseInt(req.query.limit) || 15
    const cookieToken = req.cookies.jwt
    const userData = jwt.verify(cookieToken, process.env.SECRET)
    var provinciaData = await sql `SELECT * FROM getUserById(${userData.id_usuario}) `
    var provincia = provinciaData[0].provincia 

    console.log(page)
    
    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    try {
      const totalPags = await sql`SELECT * FROM filterBy(provincia_param => ${provincia})`
      const data = await sql`SELECT id_especie, nombre, img, climas, tipo_planta, toxica_para_mascotas FROM filterBy(offset_param => ${startIndex}, limit_param => ${limit}, provincia_param => ${provincia})`
      const paginado = {
        total: totalPags.length,
        items_per_page: limit,
        current_page: page,
        total_pages: Math.ceil(totalPags.length / limit)
      }

      if (startIndex > 0){
        paginado.previous_page = page - 1
        paginado.previous_url = (`${process.env.HOST_URL}/plants/recommendedPlants?page=${page - 1}&limit=${limit}`)
      }
        
      if (endIndex < totalPags.length - 1 && paginado.total_pages > 1) {
        paginado.next_page = page + 1;
        paginado.next_url = (`${process.env.HOST_URL}/plants/recommendedPlants?page=${page + 1}&limit=${limit}`)
      }
      res.send({ pagination: paginado, data: data })
    } catch (err) {
      console.log(err)
      res.status(500).send({ errors: [ {"status": 500, "title": "Internal error", "message": "Error del servidor, contáctese con el administrador" }]})
    }

  }
}

module.exports = plantsController
