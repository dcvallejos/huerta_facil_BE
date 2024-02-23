const { param } = require('express-validator')

const validations = {
  id_usuario :  {
    notEmpty: {
      errorMessage: 'Campo obligatorio de Id de especie sin completar',
      bail: true
    },
    isInt: {
      errorMessage: 'Ingrese un numero correcto del Id del usuario'
    }    
  },
  id_especie:{
    notEmpty: {
      errorMessage: 'Campo obligatorio de Id de especie sin completar',
      bail: true
    },
    isInt: {
      errorMessage: 'Ingrese el numero correcto del Id de la especie'
    },
    
  }
}

module.exports = validations