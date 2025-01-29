


const mongoose = require("mongoose")

const BookingSchema = new mongoose.Schema({
    customer: { type: mongoose.Types.ObjectId, ref: "auths", },
    professional: { type: mongoose.Types.ObjectId, ref: "auths", },
    date: { type: String, required: true },
    mobile: { type: String, required: true },
    time: { type: String, required: true },
    reason: { type: String, required: true },
    location: { type: String, required: true },
    isAccept: { type: String, enum: ["pending", "accept", "reject"], default: "pending" },

}, { timestamps: true })
module.exports = mongoose.model("booking", BookingSchema)
