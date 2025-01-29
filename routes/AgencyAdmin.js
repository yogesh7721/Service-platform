// const { getagencyProfessional, } = require("../controller/agencyProfessional.controller")
// const { agencyProtected } = require("../middleware/Protected")

const { getAgencyAdminProfile, getagencyProfessional, getAllAgencyAdmin, deleteAgencyAdmin, getAgencyAdminViewProfile, updateAgecyAdminProfile, activeAgencyAdminProfessional, deActiveAgencyAdminProfessional, updateAgencyAdminProfessional, getAgencyAdminProfessionalBooking } = require("../controller/agencyAdmin")
const { agencyProtected, AdminProtected } = require("../middleware/Protected")



const router = require("express").Router()

router
    .get("/agencyadmin-profilefetch", agencyProtected, getAgencyAdminProfile)
    .get("/agencyprofessional-fetch", agencyProtected, getagencyProfessional)
    .get("/agencyadmin-ViewProfessional/:id", AdminProtected, getAgencyAdminViewProfile)
    .get("/agencyAdmin-fetch", getAllAgencyAdmin)
    .get("/professionalbooking-fetch/:id", agencyProtected, getAgencyAdminProfessionalBooking)


    .put("/activeagencyAdmin/:id", activeAgencyAdminProfessional)
    .put("/deactiveagencyAdmin/:id", deActiveAgencyAdminProfessional)



    ///update
    .put("/agencyadminprofile-update", agencyProtected, updateAgecyAdminProfile)
    .put("/agencyAdminProfessional-update", agencyProtected, updateAgencyAdminProfessional)




    //// delete
    .delete("/delete-agencyAdmin/:id", deleteAgencyAdmin)


module.exports = router