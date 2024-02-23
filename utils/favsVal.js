const validations = {
  id_usuario :  {
    custom:{
      options: val =>{
        return Number.isInteger(val)
      },
      errorMessage : 'El valor tiene que ser en formato numérico'
    },
    notEmpty: {
      errorMessage: 'Campo obligatorio de Id de especie sin completar',
      bail: true
    },
    isInt: {
      errorMessage: 'Ingrese un numero correcto del Id del usuario'
    }
  },
  id_especie:{
    custom:{
      options: val =>{
        return Number.isInteger(val)
      },
      errorMessage : 'El valor tiene que ser en formato numérico'
    },
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