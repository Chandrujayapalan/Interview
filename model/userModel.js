const mongoose = require('mongoose')
const Schema = mongoose.Schema
const userSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique : true
    },
    phone: {
        type: Number,
        require: true,
        unique: true
    },
    password :{
        type :String,
        require: true,
    } ,
    userType : {
        type :Number
    }
}, { timestamps: true })
const User =  mongoose.model("register" , userSchema)
module.exports = User