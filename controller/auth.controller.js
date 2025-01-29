
const validator = require("validator")
const asynchandler = require("express-async-handler")
const bcrypt = require("bcryptjs")
const Professional = require("../models/Professional")
const jwt = require("jsonwebtoken")
const Auth = require("../models/Auth")
const { checkEmpty } = require("../utils/checkEmpty")
const sendEmail = require("../utils/email")


exports.AdminRegister = asynchandler(async (req, res) => {
    const { name, email, mobile, password } = req.body
    const { error, isError } = checkEmpty({ name, email, mobile, password })
    if (isError) {
        return res.status(400).json({ message: "All Field is Required", error })
    }
    const result = await Auth.findOne({ email })
    if (result) {
        return res.status(400).json({ message: "Email Already Exist...!" })
    }
    if (!validator.isEmail(email)) {
        return res.status(400).json({ message: "Invalid Crediential" })
    }
    if (!validator.isStrongPassword(password)) {
        return res.status(400).json({ message: "Provide Strong Password" })
    }
    const hash = await bcrypt.hash(password, 10)
    await Auth.create({ name, email, mobile, role: "admin", password: hash })

    await sendEmail({
        email: email,
        subject: "Your Registration Successfully",
        message: `Congratulation your registration is successfully  💐💐
        your Email - ${email} .
        your password - ${password}`
    })

    res.json({ message: "Admin Register Success...!" })
})

exports.AdminLogin = asynchandler(async (req, res) => {
    const { email, password } = req.body
    const { isError, error } = checkEmpty({ email, password })
    if (isError) {
        return res.status(400).json({ message: "All Field is Required", error })
    }
    const result = await Auth.findOne({ email })
    if (!result) {
        return res.status(401).json({ message: "Invalid Crediential" })
    }
    const isVerify = await bcrypt.compare(password, result.password)
    if (!isVerify) {
        return res.status(401).json({ message: "Invalid Crediential" })
    }

    /// create Token
    const Token = jwt.sign({ _id: result._id, name: result.name }, process.env.JWT_KEY)
    if (result.role === "admin") {
        res.cookie("admin", Token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 })
    } else if (result.role === "agency-admin") {
        res.cookie("agency", Token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 })
    } else if (result.role === "customer") {
        res.cookie("customer", Token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 })
    } else if (result.role === "electriction" || "plumber" || "painter") {
        res.cookie("professional", Token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 })
    }


    res.json({
        message: "admin Login Success", result: {
            _id: result._id,
            name: result.name,
            email: result.email,
            role: result.role,
            mobile: result.role,
        }
    })
})

exports.AdminLogout = asynchandler(async (req, res) => {
    res.clearCookie("admin")
    res.json({ message: "Admin logout Succes...!" })
})

//   professional 


exports.professionalRegister = asynchandler(async (req, res) => {
    const { name, email, mobile, password, role } = req.body
    const { error, isError } = checkEmpty({ name, email, mobile, password, role })
    if (isError) {
        return res.status(400).json({ message: "All Field is Required", error })
    }
    const result = await Auth.findOne({ email })
    if (result) {
        return res.status(400).json({ message: "Email Already Exist...!" })
    }
    if (!validator.isEmail(email)) {
        return res.status(400).json({ message: "Invalid Crediential" })
    }
    if (!validator.isStrongPassword(password)) {
        return res.status(400).json({ message: "Provide Strong Password" })
    }
    const hash = await bcrypt.hash(password, 10)

    await Auth.create({ ...req.body, password: hash, adminId: req.user })

    await sendEmail({
        email: email,
        subject: "Your Registration Successfully",
        message: `Congratulation your registration is successfully  💐💐
        your Email - ${email} .
        your password - ${password}`
    })

    res.json({ message: "Professional Register Success...!" })
})


exports.professionalLogin = asynchandler(async (req, res) => {
    try {
        const { email, password } = req.body
        const { isError, error } = checkEmpty({ email, password, })
        if (isError) {
            return res.status(401).json({ message: "All Field is Required", error })
        }
        const result = await Auth.findOne({ email })
        if (!result) {
            return res.status(401).json({ message: "Invalid Email" })
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "invalid Credientials" })
        }
        if (!validator.isStrongPassword(password)) {
            return res.status(400).json({ message: "Provide strong password" })
        }
        const verify = await bcrypt.compare(password, result.password)
        if (!verify) {
            return res.status(401).json({ message: "Invalid Password" })
        }
        /// create Token
        const Token = jwt.sign({ _id: result._id, name: result.name }, process.env.JWT_KEY)

        //send cookies
        res.cookie("professional", Token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 })
        res.json({
            message: "Professional Login Success", result: {
                _id: result._id,
                name: result.name,
                email: result.email,
                role: result.role,
                mobile: result.mobile,
            }
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error In Professional" })
    }
})

exports.professionalLogout = asynchandler(async (req, res) => {
    res.clearCookie("professional")
    res.json({ message: "Professional logout Succes...!" })
})

// agency

exports.AgencyRegister = asynchandler(async (req, res) => {
    const { name, email, password, mobile, role } = req.body
    const { isError, error } = checkEmpty({ name, email, password, mobile })
    if (isError) {
        return res.status(400).json({ message: "All Field Required", error })
    }
    const result = await Auth.findOne({ email })
    if (result) {
        return res.status(400).json({ message: "Email Alredy Exist" })
    }
    if (!validator.isEmail(email)) {
        return res.status(404).json({ message: "Invalid Crediential" })
    }
    if (!validator.isStrongPassword(password)) {
        return res.status(400).json({ message: "Provide Strong Password...!" })
    }
    const hash = await bcrypt.hash(password, 10)
    // console.log(req.user);
    await Auth.create({ name, email, mobile, password: hash, role, adminId: req.user })

    await sendEmail({
        email: email,
        subject: "Your Registration Successfully",
        message: `Congratulation your registration is successfully  💐💐
        your Email - ${email} .
        your password - ${password}`
    })

    res.json({ message: "Agency Register Success...!" })
})

exports.AgencyLogin = asynchandler(async (req, res) => {
    try {
        const { email, password } = req.body
        const { isError, error } = checkEmpty({ email, password })
        if (isError) {
            return res.status(401).json({ message: "All Field is Required", error })
        }
        const result = await Auth.findOne({ email })
        if (!result) {
            return res.status(401).json({ message: "Invalid Email" })
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "invalid Credientials" })
        }
        if (!validator.isStrongPassword(password)) {
            return res.status(400).json({ message: "Provide strong password" })
        }
        const verify = await bcrypt.compare(password, result.password)
        if (!verify) {
            return res.status(401).json({ message: "Invalid Password" })
        }
        /// create Token
        const Token = jwt.sign({ _id: result._id, name: result.name }, process.env.JWT_KEY)

        //send cookies
        res.cookie("agency", Token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 })
        res.json({
            message: "Agency Login Success", result: {
                _id: result._id,
                name: result.name,
                email: result.email,
                mobile: result.mobile,
                role: result.role,
                password: result.password,
            }
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Inter Server Error In Professional" })
    }
})

exports.AgencyLogout = asynchandler(async (req, res) => {
    res.clearCookie("agency")
    res.json({ message: "Agency Logout Success" })
})

exports.CustomerRegister = asynchandler(async (req, res) => {
    try {
        const { name, email, password, mobile, professional } = req.body
        const { isError, error } = checkEmpty({ name, email, password, mobile })
        if (isError) {
            return res.status(400).json({ message: "All Field Required", error })
        }
        const result = await Auth.findOne({ email })
        if (result) {
            return res.status(400).json({ message: "Email Already Exist" })
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Invalid Crediential" })
        }
        if (!validator.isStrongPassword(password)) {
            return res.status(400).json({ message: "Strong Password is Mendatory" })
        }
        const hash = await bcrypt.hash(password, 10)

        await Auth.create({ name, email, mobile, password: hash, })
        ///////

        await sendEmail({
            email: email,
            subject: "Your Registration Successfully",
            message: `Congratulation your registration is successfully  💐💐
            your Email - ${email} .
            your password - ${password}`
        })
        ///
        res.json({ message: "Customer Register Success...!" })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Inter Server Error In Professional" })
    }
})

exports.CustomerLogin = asynchandler(async (req, res) => {
    const { email, password } = req.body
    const { isError, error } = checkEmpty({ email, password })
    if (isError) {
        return res.status(400).json({ message: "All Field is Required", error })
    }
    const result = await Auth.findOne({ email })
    if (!result) {
        return res.status(400).json({ message: "Email Already Exist...!" })
    }
    if (!validator.isEmail(email)) {
        return res.status(400).json({ message: "Invalid Crediential" })
    }
    if (!validator.isStrongPassword(password)) {
        return res.status(400).json({ message: "Strong Password is Mendatory" })
    }
    const verify = await bcrypt.compare(password, result.password)
    if (!verify) {
        return res.status(400).json({ message: "Invalid Password " })
    }
    // TOKEN
    const Token = jwt.sign({ _id: result._id, name: result.name }, process.env.JWT_KEY)
    //COOKIE
    res.cookie("customer", Token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 })
    res.json({
        message: "Customer Login Success", result: {
            _id: result._id,
            name: result.name,
            email: result.email,
            mobile: result.mobile,
            password: result.password,
        }
    })

})

exports.CustomerLogout = asynchandler(async (req, res) => {
    res.clearCookie("customer")
    res.json({ message: "Customer Logout Success...!" })
})


////////  Agency-Admin Employee Add.....

exports.AgencyAdminProfessionalRegister = asynchandler(async (req, res) => {
    const { name, email, password, mobile, role } = req.body
    const { isError, error } = checkEmpty({ name, email, password, mobile, role })
    if (isError) {
        return res.status(400).json({ message: "All Field Required", error })
    }
    const result = await Auth.findOne({ email })
    if (result) {
        return res.status(400).json({ message: "Email Already Exist" })
    }
    if (!validator.isEmail(email)) {
        return res.status(400).json({ message: "Invalid Crediential" })
    }
    if (!validator.isStrongPassword(password)) {
        return res.status(400).json({ message: "Strong Password is Mendatory" })
    }
    const hash = await bcrypt.hash(password, 10)

    await Auth.create({ name, email, mobile, password: hash, agencyAdminId: req.user, role })

    res.json({ message: "Professional Register...!" })
})

exports.AgencyAdminProfessionalLogin = asynchandler(async (req, res) => {
    const { email, password } = req.body
    const { isError, error } = checkEmpty({ email, password })
    if (isError) {
        return res.status(400).json({ message: "All Field is Required", error })
    }
    const result = await Auth.findOne({ email })
    if (!result) {
        return res.status(400).json({ message: "Email Already Exist...!" })
    }
    if (!validator.isEmail(email)) {
        return res.status(400).json({ message: "Invalid Crediential" })
    }
    if (!validator.isStrongPassword(password)) {
        return res.status(400).json({ message: "Strong Password is Mendatory" })
    }
    const verify = await bcrypt.compare(password, result.password)
    if (!verify) {
        return res.status(400).json({ message: "Invalid Password " })
    }
    // TOKEN
    const Token = jwt.sign({ _id: result._id, name: result.name }, process.env.JWT_KEY)
    //COOKIE
    res.cookie("employee", Token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 })
    res.json({
        message: "Professional Login Success", result: {
            _id: result._id,
            name: result.name,
            email: result.email,
            mobile: result.mobile,
            password: result.password,
        }
    })
})