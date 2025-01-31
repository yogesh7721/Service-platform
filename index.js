
const cookieParser = require("cookie-parser")
const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
require("dotenv").config()  ///sensitive  data 
const path = require('path')


const app = express()
app.use(express.json())
app.use(express.static("dist"))
app.use(cookieParser())

app.use(cors({
    origin: true,
    credentials: true
}))


app.use("/api/auth", require("./routes/Auth.routes"))
app.use("/api/admin", require("./routes/Admin.routes"))
app.use("/api/agencyadmin", require("./routes/AgencyAdmin"))
app.use("/api/professional", require("./routes/Professionals.routes"))
app.use("/api/customer", require("./routes/Customer.routes"))

app.use("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"))
    // res.status(404).json({ message: "Resource Not Found...!" })
})
mongoose.connect(process.env.MONGO_URL)

mongoose.connection.once("open", () => {
    console.log("MONGO CONNECTED")
    app.listen(process.env.PORT, console.log("SERVER RUNNNING 🏃‍♂️"))
})