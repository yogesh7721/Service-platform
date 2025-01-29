
const mongoose = require("mongoose")

const adminSchema = new mongoose.Schema({

    skill: { type: String, },
    certifications: { type: String, },
    availability: { type: String, },
    expertise: { type: String, },
    hourlyRates: { type: String, },
    time: { type: String, },
    price: { type: String, },
    location: { type: String, },
    img: { type: String, },
    experience: { type: String, },

    name: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: String, required: true },
    adminId: { type: mongoose.Types.ObjectId, ref: "auths" },
    agencyAdminId: { type: mongoose.Types.ObjectId, ref: "auths" },
    role: { type: String, enum: ["agency-admin", "admin", "customer", "electriction", "plumber", "painter", "professional"], default: "customer" },
    password: { type: String, required: true },
    isActive: { type: Boolean, default: false },
})
module.exports = mongoose.model("auths", adminSchema)