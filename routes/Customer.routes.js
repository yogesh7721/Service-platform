const { getAllCustomer, deleteCustomer, findAllElectriction, findAllPlumber, findAllPainter, BookingProfessional, getCustomerProfile, getCustomerBooking, updateCustomerProfile } = require("../controller/customer.controller")
const { customerProtected } = require("../middleware/Protected")

const router = require("express").Router()


router

    .get("/customer-fetch", getAllCustomer)

    .get("/findelectriction", findAllElectriction)
    .get("/findplumber", findAllPlumber)
    .get("/findpainter", findAllPainter)
    .get("/customerprofile-fetch", customerProtected, getCustomerProfile)
    .get("/customerBooking-fetch", customerProtected, getCustomerBooking)


    .put("/customerprofile-update", customerProtected, updateCustomerProfile)

    .post("/booking-professional", customerProtected, BookingProfessional)


    .delete("/deletecustomer/:id", deleteCustomer)

module.exports = router