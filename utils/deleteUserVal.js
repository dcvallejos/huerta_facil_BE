const validations = {
  id_usuario :  {
    isInt: {
      errorMessage: 'Ingrese un numero correcto del Id del usuario'
    },
    custom:{
      options: val =>{
        return Number.isInteger(val)
      },
      errorMessage : 'El valor tiene que ser en formato numérico',
    }
  }
}


module.exports = validations