const checkPass = (nuevoPassword, { req }) => {
  const {repetirPassword} = req.body.password
  if(nuevoPassword !== repetirPassword){
    throw new Error('Las contraseñas no coinciden')
  } else return true
  
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

const checkPassObj = (nuevoPass, {req}) => {
  const passwordObj = req.body.password
  if(passwordObj){
    if(!Object.hasOwn(passwordObj, "nuevoPassword") && !Object.hasOwn(passwordObj, "repetirPassword")){
      throw new Error('Error de estructura: El objeto password debe contener nuevoPassword y repetirPassword')
    }
    if(!passwordObj.nuevoPassword || !passwordObj.repetirPassword){
      throw new Error('Campos obligatorios')
    }
  }
  return true
}

const checkAllPass =(val, {req}) => {
  checkPassObj(val, {req})
  checkPass(val, {req})
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
    optional: {
      options: {
        values: 'falsy'
      }
  },
  matches: {
    options: /^[a-zA-Z\s.]*$/,
    errorMessage: 'El nombre solo puede contener letras, espacios y puntos'
  }
},
  password: {
    optional: {
      options: {
        values: 'falsy'
      }
    },
      isObject: {
      errorMessage: "Campo inválido. Debe enviar un objeto",
      bail: true
    }
},
  "password.nuevoPassword": {
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
      options : checkAllPass,
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