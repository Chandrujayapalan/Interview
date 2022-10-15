const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bookingSchema = new Schema({  
    flight: {
        type: Schema.Types.ObjectId,
        ref: 'flight',
        require: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'register',
        require: true,
    },
    offer: {
        type: Schema.Types.ObjectId,
        ref: 'offers',
        require: true,
    },
    total : {
        type: Number,
        require: true,
    },
     amount: {
        type: Number,
        require: true,
    }
}, { timestamps: true })
const Booking = mongoose.model("booking", bookingSchema)
module.exports = Booking