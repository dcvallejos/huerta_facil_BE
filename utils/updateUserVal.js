const checkPass = (pass2, { req }) => {
  const {password} = req.body
  if (!password) {
    return true
  }
  if(!pass2 && password){
    throw new Error('Debe repetir el password')
  } 
  if(pass2 !== password){
    throw new Error('Las contraseñas no coinciden')
  } 
  return true
}

const checkBody = (val, {req}) =>{
  const body = req.body
  const bodyLength = Object.entries(body).length

  if(bodyLength === 0){
    throw new Error('Entró en no tiene nada')
  } 
  const entries = Object.entries(body).some(el => el[1])
  if(!entries){
    throw new Error("Entró en empty fields")
  } 
  return true
}


const validations = {
  usuario: {
    optional: {
      options: {
        values: 'falsy'
      }
    },
    isEmail: {
      errorMessage: "Email inválido"
    }
  },
  provincia: {
    optional: {
      options: {
        values: 'falsy'
      }
    },
    isIn: {
      options: [["Jujuy","Salta","Tucumán","Catamarca","La Rioja","Santiago del Estero","Santa Fe","Entre Ríos","La Pampa","Córdoba","Ciudad Autónoma de Buenos Aires","Mendoza",
          "San Juan","San Luis","Misiones","Corrientes","Chaco","Formosa","Buenos Aires","Neuquén","Río Negro","Chubut","Santa Cruz", "Tierra del Fuego"]]
        },
      errorMessage: 'Provincia inválida'  
  }, 
  nombreUsuario: {

  },
  custom: {
    custom: {
      options: checkBody
    }
  }
}

module.exports = validations