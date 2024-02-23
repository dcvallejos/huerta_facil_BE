const validations = {
usuario: {
  notEmpty: {
    errorMessage: 'Campo obligatorio',
    bail: true
  },
  isEmail: {
    errorMessage: 'Email inválido'
  } 
},
provincia: {
  notEmpty: {
    errorMessage: 'Campo obligatorio',
    bail: true
  },
  isIn: {
options: [["Jujuy","Salta","Tucumán","Catamarca","La Rioja","Santiago del Estero","Santa Fe","Entre Ríos","La Pampa","Córdoba","Ciudad Autónoma de Buenos Aires","Mendoza",
"San Juan","San Luis","Misiones","Corrientes","Chaco","Formosa","Buenos Aires","Neuquén","Río Negro","Chubut","Santa Cruz", "Tierra del Fuego"]]
  },
  errorMessage: 'Provincia inválida'
},
password: {
  notEmpty: {
    errorMessage: 'Campo obligatorio',
    bail: true
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
}

}


module.exports = validations