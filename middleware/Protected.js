
const jwt = require("jsonwebtoken")

exports.AdminProtected = (req, res, next) => {
    // cookie
    const { admin } = req.cookies
    // console.log(admin, "admin cookie");

    if (!admin) {
        return res.status(401).json({ message: "No Cookie Found...!" })
    }
    jwt.verify(admin, process.env.JWT_KEY, (error, decode) => {
        if (error) {
            console.log(error);
            return res.status(401).json({ message: "Invalid Token" })
        }
        req.user = decode._id
    })
    next()
}

//professional 
exports.professionalProtected = (req, res, next) => {
    const { professional } = req.cookies
    console.log(professional, "professional");

    if (!professional) {
        return res.status(401).json({ message: "No Cookie Found...!" })
    }
    jwt.verify(professional, process.env.JWT_KEY, (error, decode) => {
        if (error) {
            console.log(error);
            return res.status(401).json({ message: "Invalid Token" })
        }
        req.user = decode._id
        // console.log("req.user", req.user);

    })
    next()
}


// customer protected

exports.customerProtected = (req, res, next) => {
    const { customer } = req.cookies
    if (!customer) {
        return res.status(401).json({ message: "No Cookie Found...!" })
    }
    jwt.verify(customer, process.env.JWT_KEY, (error, decode) => {
        if (error) {
            console.log(error);
            return res.status(401).json({ message: "Invalid Token" })
        }
        req.user = decode._id
        // console.log(req.user, "from protected");


    })
    next()
}

// Agency
exports.agencyProtected = (req, res, next) => {
    // console.log(req.cookie);
    const { agency } = req.cookies

    if (!agency) {
        return res.status(401).json({ message: "No Cookie Found...!" })
    }
    jwt.verify(agency, process.env.JWT_KEY, (error, decode) => {
        if (error) {
            console.log(error);
            return res.status(401).json({ message: "Invalid Token" })
        }
        req.user = decode._id
        // console.log("req.user", req.user);
    })
    next()
}



// exports.agencyAddProfessionalProtected = (req, res, next) => {
//     const { employee } = req.cookies
//     console.log(employee);

//     if (!employee) {
//         return res.status(401).json({ message: "No Cookie Found...!" })
//     }
//     jwt.verify(employee, process.env.JWT_KEY, (error, decode) => {
//         if (error) {
//             return res.status(401).json({ message: "Invalid Token" })
//         }
//         req.user = decode._id
//         console.log(req.user, "req.user");

//     })
//     next()

// }

