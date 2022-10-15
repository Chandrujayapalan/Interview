const joi = require('joi')


const regValidator = async (req, res, next) => {
    try {
        let option = joi.object().keys({
            name: joi.string().required(),
            email: joi.string().email().required(),
            phone: joi.number().required(),
            password: joi.string().required(),
            userType: joi.number().required(),

        })
        const { error } = option.validate(req.body)
        if (error) {
            return res.status(400).json({
                message: error.message
            })
        } else {
            next()
        }
} catch (error) {
        console.log(error)
    }
}

const logvalidator = async (req, res, next) => {
    try {
        let option = joi.object().keys({
            userName: joi.string().required(),
            password: joi.string().required(),
                   })
        const { error } = option.validate(req.body)
        if (error) {
            return res.status(400).json({
                message: error.message
            })
        } else {
            next()
        }
    } catch (error) {
        console.log(error)
    }
}
const flightValidator = async (req, res, next) => {
    try {
        let option = joi.object().keys({
            from: joi.string().required(),
            to: joi.string().required(),
            deportDate: joi.date().required(),
            arrivalDate: joi.date().required(),
            amount : joi.number()
        })
        const { error } = option.validate(req.body)
        if (error) {
            return res.status(400).json({
                message: error.message
            })
        } else {
            next()
        }
    } catch (error) {
        console.log(error)
    }
}
const offerValidator = async (req, res, next) => {
    try {
        let option = joi.object().keys({
            offerCode: joi.string().required(),
            type: joi.string().required(),
            value: joi.number()
        })
        const { error } = option.validate(req.body)
        if (error) {
            return res.status(400).json({
                message: error.message
            })
        } else {
            next()
        }
    } catch (error) {
        console.log(error)
    }
}
const bookingValidator = async (req, res, next) => {
    try {
        let option = joi.object().keys({
            from: joi.string().required(),
            to: joi.string().required(),
            date: joi.date()
        })
        const { error } = option.validate(req.body)
        if (error) {
            return res.status(400).json({
                message: error.message
            })
        } else {
            next()
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    regValidator, logvalidator, flightValidator, offerValidator, bookingValidator
}