

const Auth = require("../models/Auth")
const asynchandler = require("express-async-handler")
const Booking = require("../models/Booking")

exports.getAdminProfile = asynchandler(async (req, res) => {
    const result = await Auth.find({ role: "admin" })
    res.json({ message: "Admin Fetch Success...", result })
})

exports.getAllBookings = asynchandler(async (req, res) => {
    const result = await Booking.find().populate("customer").populate("professional")
    // console.log(result)
    res.status(200).json({ message: "Fetch All Booking Success...!", result })
})

exports.getCustomerViewProfile = asynchandler(async (req, res) => {
    const id = req.params.id
    if (!id) {
        return res.json({ message: "Customer ID Required." })
    }
    const result = await Auth.findOne({ _id: id })
    res.json({ message: "Customer View fetch success", result })
})

//.populate("customer") populate("professional")