const checkPass = (nuevoPassword, { req }) => {
  const {repetirPassword} = req.body.password
  return nuevoPassword === repetirPassword
  
}

const checkBody = (val, {req}) =>{
  const body = req.body
  const bodyLength = Object.entries(body).length
  const values = Object.entries(body).some(el => el[1])

  if(bodyLength === 0 || !values){
    throw new Error()
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
  password: {
    isObject: {
      errorMessage: "Campo inválido. Debe enviar un objeto",
      bail: true
    }
  },
  "password.nuevoPassword": {
    exists: {
      errorMessage: "Error de estructura: password debe contener nuevoPassword",
      bail: true
    },
    notEmpty:{
      errorMessage: "Campo obligatorio",
      bail: true
    },
    isStrongPassword: {
      options: {
        minLength: 5,
        maxLength: 24,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
      },
      errorMessage: "La contraseña debe contener entre 5 y 24 caracteres, al menos una minúscula, una mayúscula, un número y un caracter especial"
    },
    custom: {
      options : checkPass,
      errorMessage: "Las contraseñas no coinciden",
      bail: true
    }
  },
  "password.repetirPassword": {
    exists: {
      errorMessage: "Error de estructura: password debe contener repetirPassword",
      bail: true
    },
    notEmpty:{
      errorMessage: "Campo obligatorio",
      bail: true
    }
  },
  custom: {
    custom: {
      options: checkBody
    }
  }
}

module.exports = validations