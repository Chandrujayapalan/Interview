const jwt  = require('jsonwebtoken')
const key = require('../config/token')
const auth = (req, res, next) => {
try {
    const token =  req.headers.authorization.split(' ')[1]
    const decode = jwt.verify(token ,key.secretKey )
    req.user = decode
    console.log(req.user)
    next()
} catch (error) {
    console.log(error)
    return res.status(400).json({
        status :400 ,
        message : "you not verifed"


    })
    
}
}
const admin = (req, res, next) => {

        try {
            console.log(req.user.userType)

         let check = req.user.userType 
         if(check === 1){
             next()
         }else {
            return res.json({
                status : 401,
                message : 'forbidden'
            })
         }
          
        } catch (error) {
            return res.status(400).json({
                status: 400,
                message: "you not verifed"
            })
     
        }
}
module.exports = {
auth,admin
}