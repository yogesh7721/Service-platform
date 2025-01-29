
const {
    AdminRegister,
    AdminLogin,
    AdminLogout,
    professionalRegister,
    professionalLogin,
    professionalLogout,
    AgencyRegister,
    AgencyLogin,
    CustomerRegister,
    CustomerLogin,
    AgencyLogout,
    CustomerLogout,
    AgencyAdminProfessionalRegister,
    AgencyAdminProfessionalLogin,

} = require("../controller/auth.controller")

const { AdminProtected, agencyProtected, agencyAddProfessionalProtected, professionalProtected } = require("../middleware/Protected")

const router = require("express").Router()

router
    // Main Admin
    .post("/admin-register", AdminRegister)
    .post("/admin-login", AdminLogin)
    .post("/admin-logout", AdminLogout)

    // Professional
    .post("/professional-register", AdminProtected, professionalRegister)
    .post("/professional-register-agency-admin", agencyProtected, professionalRegister)
    // .post("/professional-register-agency-login", professionalLogin)
    .post("/professional-login", professionalLogin)
    // .post("/professional-login", professionalLogin)
    .post("/professional-logout", professionalProtected, professionalLogout)

    // // Agency
    .post("/agency-register", AdminProtected, AgencyRegister)
    .post("/agency-login", AgencyLogin)
    .post("/agency-logout", AgencyLogout)


    // // customer
    .post("/customer-register", CustomerRegister)
    .post("/customer-login", CustomerLogin)
    .post("/customer-logout", CustomerLogout)


    // Agency Admin Professional Add......
    .post("/agencyprofessionalRegister", agencyProtected, AgencyAdminProfessionalRegister)
    .post("/agencyprofessionalLogin", AgencyAdminProfessionalLogin)



module.exports = router