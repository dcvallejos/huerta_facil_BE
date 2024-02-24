const validations = {
  usuario: {
    notEmpty: {
      errorMessage: "Campo obligatorio",
      bail:true
    },
    isEmail: {
      errorMessage: "Email inválido"
    }
  },
  password: {
    notEmpty: {
      errorMessage: "campo obligatorio"
    }
  }
}

module.exports = validations