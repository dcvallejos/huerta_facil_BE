const customs = {
  "checkBody": (req, min) =>{
    const body = req.body
    const bodyLength = Object.entries(body).length
    if(bodyLength < min){
      throw new Error()
    }  
    return true
  }
}

module.exports = customs