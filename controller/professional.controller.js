
const asynchandler = require("express-async-handler")
const Auth = require("../models/Auth")
const { checkEmpty } = require("../utils/checkEmpty")
const { upload } = require("../utils/upload")
const cloudinary = require("../utils/cloudinary.config")
const Booking = require("../models/Booking")



exports.getAllProfessional = asynchandler(async (req, res) => {
    const result = await Auth.find({ adminId: req.user })
    const arr = []
    for (let i = 0; i < result.length; i++) {
        if (result[i].role === "electriction" || result[i].role === "plumber" ||
            result[i].role === "painter") {
            arr.push(result[i])
        }
    }
    res.json({ message: "Professional Fetch Success...!", result: arr })
})
exports.getProfessionalProfile = asynchandler(async (req, res) => {
    const result = await Auth.findOne({ _id: req.user })
    res.json({ message: "Professional Profile fetch success", result })
})

exports.getViewProfessional = asynchandler(async (req, res) => {
    const result = await Auth.findById(req.params.id)
    res.json({ message: "Professional View fetch success", result })
})

exports.getBookingProfessional = asynchandler(async (req, res) => {
    // const result = await Booking.findOne({ customer: req.user })
    const result = await Booking.find({ professional: req.user }).populate("customer").populate("professional")
    res.json({ message: 'Professional Booking Fetch Success', result })
})

exports.updateProfessionalProfile = asynchandler(async (req, res) => {
    try {
        upload(req, res, async err => {
            if (err) {
                return res.status(400).json({ message: "server error" })
            }
            const { name, email, mobile, hourlyRates, time, price, location, experience, skill } = req.body
            const { isError, error } = checkEmpty({ name, email, mobile, hourlyRates, time, price, location, experience })
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
            await Auth.findByIdAndUpdate(req.user, { name, email, mobile, hourlyRates, time, price, skill, location, img, experience })
            res.json({ message: "Professional Profil Update Success...!" })
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Professional Profile Not Update..." })

    }
})


exports.acceptProfessional = asynchandler(async (req, res) => {
    try {
        const { id } = req.params
        const { isAccept } = req.body
        await Booking.findByIdAndUpdate(id, { isAccept });
        res.json({ message: "Professional Activate Success" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error", error: error.message })
    }
})
exports.ActiveProfessional = async (req, res) => {
    try {
        const { id } = req.params;
        await Auth.findByIdAndUpdate(id, { isActive: true });
        res.json({ message: "Product Deactive Success" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error", error: error.message })
    }
};

exports.deActiveProfessional = async (req, res) => {
    try {
        const { id } = req.params;
        await Auth.findByIdAndUpdate(id, { isActive: false });
        res.json({ message: "Product Deactive Success" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error", error: error.message })
    }
};

///////// Delete......

exports.deleteProfessional = asynchandler(async (req, res) => {
    await Auth.findByIdAndDelete(req.params.id)
    res.json({ message: "Professional Delete Success" })
})