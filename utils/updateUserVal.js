const checkPass = (pass2, { req }) => {
  if (!req.body.password) {
    return true
  }
  if(!pass2 && req.body.password){
    throw new Error('Debe especificar una nueva contraseña')
  } 
  if(pass2 !== req.body.password){
    throw new Error('Las contraseñas no coinciden')
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
      messageError: "Email inválido"
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
  password:{
    optional: {
      options: {
        values: 'falsy'
      }
    },
    isStrongPassword: {
      options: {minLength: 5,
      maxLength: 24,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1
      },
      errorMessage: "La contraseña debe tener entre 5 y 24 caracteres, al menos una mayúscula, una minúscula, un número y un caracter especial."
    }
  },
  passwordRepetido:{
    custom: {
      options: checkPass
    }
  }
}

module.exports = validations