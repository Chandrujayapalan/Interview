const { number } = require('joi')
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const offerSchema = new Schema({
    offerCode: {
        type: String,
        require: true,
    },
    type: {
        type: String,
        enum: ['amount', 'food' , "percent"],
        require: true,
    },
    value: {
        type: Number,
        require: true,
   },
    status: {
        type: Boolean,
        default :true
    },

}, { timestamps: true })
const Offers = mongoose.model("offers", offerSchema)
module.exports = Offers