const express = require('express')
const router = express.Router()
const userController = require('../controller/userController')
const validator = require('../middleware/validator')
const offer = require('../middleware/authendication')

router.post("/register",validator.regValidator, userController.register )
router.post("/login", validator.logvalidator, userController.login)
router.post("/flight", validator.flightValidator, [offer.auth,offer.admin],userController.createFights)
router.post("/offer", validator.offerValidator, [offer.auth, offer.admin], userController.createOffers)
router.get("/viewBooking", [offer.auth], userController.getBooking)
router.post("/createBooking", [offer.auth], userController.createBooking)
router.get("/getBooking", [offer.auth], userController.getUserBookings)








module.exports= router