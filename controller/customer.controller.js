
const asynchandler = require("express-async-handler")
const Auth = require("../models/Auth")
const { checkEmpty } = require("../utils/checkEmpty")
const Booking = require("../models/Booking")
const sendEmail = require("../utils/email")
const { upload } = require("../utils/upload")
const cloudinary = require("../utils/cloudinary.config")


exports.getAllCustomer = asynchandler(async (req, res) => {
    const result = await Auth.find({ role: "customer" })
    res.json({ message: "Customers Fetch Success", result })
})
exports.getCustomerProfile = asynchandler(async (req, res) => {
    const result = await Auth.findOne({ _id: req.user })
    res.json({ message: "Customer Profile fetch success", result })
})



exports.findAllElectriction = asynchandler(async (req, res) => {
    const result = await Auth.find({ role: "electriction", isActive: true })
    res.json({ message: 'Electriction Fetch Success', result })
})
exports.findAllPlumber = asynchandler(async (req, res) => {
    const result = await Auth.find({ role: "plumber", isActive: true })
    res.json({ message: 'Plumber Fetch Success', result })
})
exports.findAllPainter = asynchandler(async (req, res) => {
    const result = await Auth.find({ role: "painter", isActive: true })
    res.json({ message: 'Painter Fetch Success', result })
})


exports.BookingProfessional = asynchandler(async (req, res) => {

    const { date, time, reason, location, mobile, professional } = req.body;
    const { isError, error } = checkEmpty({ date, time, reason, location, mobile, professional })
    if (isError) {
        return res.status(400).json({ message: "All Field Is Required", error })
    }
    // Create booking
    // console.log(professional.name);

    const customer = await Auth.findOne({ _id: req.user })
    const newprofessional = await Auth.findOne({ _id: professional })
    // console.log(professinal.name);

    await sendEmail({
        email: customer.email,
        subject: "Yout Booking Successfully",
        message: `Your Order is Placed successfull 💐 you booked a ${newprofessional.role} its name is ${newprofessional.name}, 
            Your contact Numer is ${newprofessional.mobile}`
    })
    await sendEmail({
        email: newprofessional.email,
        message: `You how a new booking requset ${newprofessional.name}  is Book You`,
        subject: "You have a new server "
    })

    const booking = await Booking.create({ customer: req.user, date, time, reason, location, mobile, professional });
    res.status(201).json({ message: 'Booking successful!', booking });

});
exports.getCustomerBooking = asynchandler(async (req, res) => {
    // const result = await Booking.findOne({ customer: req.user })
    const result = await Booking.find({ customer: req.user }).populate("customer").populate("professional")
    res.json({ message: 'Customer Booking Fetch Success', result })
})

exports.updateCustomerProfile = asynchandler(async (req, res) => {
    try {
        upload(req, res, async err => {
            if (err) {
                return res.status(400).json({ message: "server error" })
            }
            const { name, email, mobile, } = req.body
            const { isError, error } = checkEmpty({ name, email, mobile, })
            if (isError) {
                return res.status(400).json({ message: "All Fields Required." })
            }
            let img = []
            if (req.file) {
                //File Upload Code 
                const { secure_url } = await cloudinary.uploader.upload(req.file.path)
                // console.log(secure_url)
                img = secure_url
            }
            await Auth.findByIdAndUpdate(req.user, { name, email, mobile, img })
            res.json({ message: "Customer Profil Update Success...!" })
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Customer Profile Not Update..." })

    }
})


exports.deleteCustomer = asynchandler(async (req, res) => {
    await Auth.findByIdAndDelete(req.params.id)
    res.json({ message: "Customer Delete Success...!" })
})