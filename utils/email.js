
// const nodemailer = require("nodemailer")

// const sendEmail = ({ subject, to, message, html }) => new Promise((resolve, reject) => {
//     console.log(subject);
//     console.log(to);
//     console.log(message);
//     const Transport = nodemailer.createTransport({
//         service: "gmail",
//         auth: {
//             user: process.env.FROM_EMAIL,
//             pass: process.env.EMAIL_PASS,
//         }
//     })
//     Transport.sendMail({
//         from: process.env.FROM_EMAIL,
//         to: to,
//         subject: subject,
//         html: html,
//         text: message
//     }, (err) => {
//         if (err) {
//             console.log(err);
//             reject(false)
//         } else {
//             resolve(true)
//         }
//     })
// })
// module.exports = sendEmail




const nodeMailer = require("nodemailer")

const sendEmail = ({ email, subject, message }) => new Promise((resolve, reject) => {
    const mailer = nodeMailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.FROM_EMAIL,
            pass: process.env.EMAIL_PASS
        }
    })
    mailer.sendMail({
        to: email,
        subject: subject,
        text: message
    }, err => {
        if (err) {
            console.log(err);
            console.log("Unable To Send Email");
            reject("Unable To Send Email")
        } else {
            console.log("email Send Success");
            resolve("email Send Success")
        }
    })

})

module.exports = sendEmail