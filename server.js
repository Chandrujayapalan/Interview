const express =require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser =require('body-parser')
const controller = require('./routes/route')
const cors =  require('cors')
mongoose.connect("mongodb://localhost:27017/flight",{ useUnifiedTopology : true , useNewUrlParser :true})
const db = mongoose.connection 
db.on('error', (error)=>{
    console.log(error)
} )
db.on('open', () => {
    console.log("Db is connected")
})
const app = express()
app.use(cors())

app.use(morgan('dev'))
const PORT = 4000
app.use(bodyParser.urlencoded({extended :true}))
app.use(bodyParser.json())
app.listen(PORT , ( )=>{
console.log(`Api is running  ${PORT}`)
})
app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Orgin","*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    next()

})
app.get('/',(req,res)=>{
    return res.json({
        status :200,
        message : "Api is running"
    })
})
app.use("/api", controller)