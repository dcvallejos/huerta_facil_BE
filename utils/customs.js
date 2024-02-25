const customs = {
  "checkBody": (val, {req, res}) =>{
    const body = req.body
    const bodyLength = Object.entries(body).length
    if(bodyLength < 4){
      throw new Error()
    }  
    return true
  }
}

module.exports = customs