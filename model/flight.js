const mongoose = require('mongoose')
const Schema = mongoose.Schema
const flightSchema = new Schema({
    from: {
        type: String,
        require: true,
    },
    to: {
        type: String,
        require: true,

    },
    deportDate: {
        type: Date,
        require: true,
    },
    arrivalDate: {
        type: Date,
        require: true,
    },
    amount: {
        type: Number,
        require: true,
    }
}, { timestamps: true })
const Flights = mongoose.model("flight", flightSchema)
module.exports = Flights