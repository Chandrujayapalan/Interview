const User = require('../model/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Key = require('../config/token')
const flight = require('../model/flight')
const offers = require('../model/offer')
const booking = require('../model/booking')
const nodemailer = require('nodemailer')
const ejs = require('ejs')
const path = require('path')

let transport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "20e4159@dgvaishnavcollege.edu.in",
        pass: "Chandru@2000",
    }
})
transport.verify((error, success) => {
    if (error) {
        console.log(error)
    } else {
        console.log("READY TO MESSAGE")
        console.log(success)
    }

})

const register = async (req, res, next) => {
    try {
        let alreadyExist = await User.findOne({ $or: [{ email: req.body.email }, { phone: req.body.phone }] })
        if (!alreadyExist) {
            let user = new User({
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                password: bcrypt.hashSync(req.body.password, 10),
                userType: req.body.userType
            })

            if (req.body.userType == 1) {
                return res.status(400).json({
                    status: 400,
                    message: "already have Admin",
                    data: user
                })

            } else {
                await user.save()
                return res.status(200).json({
                    status: 200,
                    message: "register Successfully",
                    data: user
                })

            }
        }
        else {
            return res.status(400).json({
                status: 400,
                message: "Already exists"
            })
        }

    } catch (error) {
        console.log(error)
        return res.status(400).json({
            status: 400,
            message: error
        })
    }
}

const login = async (req, res, next) => {
    try {
        let userName = req.body.userName

        let user = await User.findOne({ email: userName })
        console.log(user)
        if (user) {
            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if (err) {
                    return res.status(400).json({
                        status: 400,
                        error: err
                    })
                }
                console.log(result)
                if (result) {
                    let token = jwt.sign({ id: user.id, userType: user.userType }, Key.secretKey)
                    return res.status(200).json({
                        status: 200,
                        message: "login Successfully",
                        data: token
                    })
                } else {

                    return res.status(400).json({
                        status: 400,
                        message: 'password does not match',
                        error: err
                    })
                }
            })
        } else {

            return res.status(400).json({
                status: 400,
                message: 'user Not found',

            })
        }
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            status: 400,
            message: error
        })
    }
}
const createFights = async (req, res, next) => {
    try {
        let getfights = await flight.find({ $and: [{ from: req.body.from, to: req.body.to }] })
        if (!getfights.length) {
            let flights = new flight({
                from: req.body.from,
                to: req.body.to,
                deportDate: req.body.deportDate,
                arrivalDate: req.body.arrivalDate,
                amount: req.body.amount

            })
            await flights.save()
            return res.status(200).json({
                status: 200,
                message: " flight created",
                data: flights
            })
        } else {
            return res.status(400).json({
                status: 400,
                message: " Already added flight ",
            })
        }
    } catch (error) {
        return res.status(400).json({
            status: 400,
            message: error
        })
    }
}
const createOffers = async (req, res, next) => {
    try {
        let getOffer = await offers.findOne({ offerCode: req.body.offerCode })
        if (!getOffer) {
            let offer = new offers({
                offerCode: req.body.offerCode,
                type: req.body.type,
                value: req.body.value,
            })
            await offer.save()
            return res.status(200).json({
                status: 200,
                message: "offers created",
                data: offer
            })
        } else {
            return res.json({
                status: 400,
                message: " Already exists offer"
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            status: 400,
            message: error
        })
    }
}

const getBooking = async (req, res, next) => {
    try {
        let { from, to, date } = req.query
        date = new Date(date)
        console.log(date)
        let getBooking = await flight.find({ $and: [{ from: from }, { to: to }, { deportDate: { $gt: date } }] })
        console.log(getBooking)
        if (!getBooking.length) {
            return res.status(400).json({
                status: 400,
                message: "no flights on the date select another date"
            })
        } else {
            return res.json({
                status: 200,
                message: "Date fetched Successfully",
                data: getBooking
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            status: 400,
            message: error
        })
    }
}
const createBooking = async (req, res, next) => {
    try {
        let { offer } = req.body
        let { flights } = req.query
        console.log(flights)
        let users
        let getFight = await flight.findById(flights)
        console.log(getFight.amount)
        let bookings = {
            flight: flights,
            userId: req.user.id,
            amount: getFight.amount,
            total: getFight.amount
        }
        if (offer) {
            let lastTotal = 0
            let getOffer = await offers.findOne({ offerCode: offer })
            console.log(getOffer)
            if (getOffer.type === "amount") {
                lastTotal = getFight.amount - getOffer.value
            }
            else if (getOffer.type === "percent") {
                lastTotal = getFight.amount * getOffer.value / 100
            }
            else if (getOffer.type === "food") {
                lastTotal = getFight.amount
            }
            bookings.offer = getOffer._id
            bookings.total = lastTotal
            console.log(bookings)
            bookings = new booking(bookings)
            users =   await bookings.save()
            console.log(users, "sads")

       
        } else {
            bookings = new booking(bookings)
         users = await bookings.save()
            console.log(users ,"sads")

        }
        // users = users.map(a=>a._id)
        // console.log(users)
        let getBooking = await booking.findById({ _id :users._id}).populate('userId').populate('offer', 'offerCode').populate('flight')
        console.log(getBooking)
        const html = await ejs.renderFile(path.join(__dirname,"..//views//project.ejs"),{getBooking ,offer})
        const mailOptions = {
            from: "20e4159@dgvaishnavcollege.edu.in",
            to: getBooking.userId.email,
            subject: "confirmed Ticket",
            html: html
        }
        transport.sendMail(mailOptions)
        return res.json({
            status: 200,
            message: " created booking And ticket is sended to register email",
                   })
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            status: 400,
            message: error
        })
    }
}

const getUserBookings = async (req, res, next) => {
    try {
        console.log(req.user.id)
        let getBooking = await booking.find({ userId: req.user.id }).populate('userId', 'name').populate('offer', 'offerCode').populate('flight')
        return res.json({
            status: 200,
            message: "Date fetched Successfully",
            data: getBooking
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            status: 400,
            message: error
        })
    }
}
module.exports = { register, login, createFights, createOffers, createBooking, getBooking, getUserBookings }