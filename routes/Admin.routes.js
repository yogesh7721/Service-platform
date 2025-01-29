


const { getAdminProfile, getAllBookings, getCustomerViewProfile, } = require("../controller/admin.controller")
const { AdminProtected, customerProtected } = require("../middleware/Protected")

const router = require("express").Router()

router
    ////get
    .get("/adminprofile-fetch", getAdminProfile)
    .get("/allbooking-fetch", AdminProtected, getAllBookings)
    .get("/viewcustomerprofile-fetch/:id", getCustomerViewProfile)

// Delete
// .delete("/delete-agencyAdmin/:id", deleteAgencyAdmin)

module.exports = router