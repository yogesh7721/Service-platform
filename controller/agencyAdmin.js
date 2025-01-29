const asynchandler = require("express-async-handler")
const Auth = require("../models/Auth")
const { checkEmpty } = require("../utils/checkEmpty")
const { upload } = require("../utils/upload")
const cloudinary = require("../utils/cloudinary.config")
const Booking = require("../models/Booking")


exports.getAgencyAdminProfile = asynchandler(async (req, res) => {
    const result = await Auth.findOne({ _id: req.user })
    res.json({ message: "AgencyAdmin Profile Fetch Success...!", result })
})

exports.getAgencyAdminProfessionalBooking = asynchandler(async (req, res) => {
    const result = await Booking.find({ professional: req.params.id }).populate("customer").populate("professional")
    res.json({ message: 'Professional Booking Fetch Success', result })

})

exports.updateAgecyAdminProfile = asynchandler(async (req, res) => {
    try {
        upload(req, res, async err => {
            if (err) {
                return res.status(400).json({ message: "server error" })
            }
            const { name, email, mobile, skill, certifications, availability, expertise, hourlyRates, time, price, location, experience } = req.body
            const { isError, error } = checkEmpty({ name, email, mobile, skill, certifications, availability, expertise, hourlyRates, time, price, location, experience })
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
            await Auth.findByIdAndUpdate(req.user, { name, email, mobile, skill, certifications, availability, expertise, hourlyRates, time, price, location, img, experience })
            res.json({ message: "Professional Profil Update Success...!" })
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Professional Profile Not Update..." })

    }
})

exports.getagencyProfessional = asynchandler(async (req, res) => {
    const result = await Auth.find({ agencyAdminId: req.user, })
    res.json({ message: "Professional Fetch Success...!", result })
})

exports.updateAgencyAdminProfessional = asynchandler(async (req, res) => {
    const { id } = req.params
    await Auth.findByIdAndUpdate(req.user, req.body)
    res.json({ message: "Professional Update Success...!" })
})

exports.getAllAgencyAdmin = asynchandler(async (req, res) => {
    const result = await Auth.find({ role: "agency-admin" })
    res.json({ message: "Agency-Admin Fetch Success", result })
})

exports.activeAgencyAdminProfessional = asynchandler(async (req, res) => {
    try {
        const { id } = req.params
        await Auth.findByIdAndUpdate(id, { isActive: true });
        res.json({ message: "AgencyProfessional Activate Success" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error", error: error.message })
    }
})

exports.deActiveAgencyAdminProfessional = async (req, res) => {
    try {
        const { id } = req.params;
        await Auth.findByIdAndUpdate(id, { isActive: false });
        res.json({ message: "AgencyProfessional Deactive Success" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error", error: error.message })
    }
};

exports.getAgencyAdminViewProfile = asynchandler(async (req, res) => {
    const result = await Auth.findById(req.params.id)
    res.json({ message: "Professional View fetch success", result })
    console.log(result, "---");
})


//////// delete

exports.deleteAgencyAdmin = asynchandler(async (req, res) => {
    await Auth.findByIdAndDelete(req.params.id)
    res.json({ message: "Delete Agency-Admin Success...!" })
})

