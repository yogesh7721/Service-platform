const { getProfessionalProfile, getViewProfessional, getAllProfessional, deleteProfessional, updateProfessionalProfile, deActiveProfessional, getBookingProfessional, acceptProfessional, ActiveProfessional, } = require("../controller/professional.controller")
const { professionalProtected, AdminProtected } = require("../middleware/Protected")



const router = require("express").Router()

router
    .get("/professionalprofile-fetch", professionalProtected, getProfessionalProfile)
    .get("/viewprofessional-fetch/:id", AdminProtected, getViewProfessional)
    .get("/professional-fetch", AdminProtected, getAllProfessional)
    .get("/bookingProfessional-fetch", professionalProtected, getBookingProfessional)

    /// update
    .put("/professionalprofile-update", professionalProtected, updateProfessionalProfile)
    .put("/activeprofessional/:id", ActiveProfessional)
    .put("/deactiveprofessional/:id", deActiveProfessional)
    .put("/acceptprofessional/:id", acceptProfessional)



    .delete("/deleteprofessional/:id", deleteProfessional)


module.exports = router