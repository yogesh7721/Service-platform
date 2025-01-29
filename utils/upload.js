
const multer = require("multer")
const path = require("path")

const Storage = multer.diskStorage({
    filename: (req, file, cd) => {
        const fn = Date.now() + path.extname(file.originalname)
        cd(null, fn)
    }
})

const upload = multer({ storage: Storage }).single("img")

module.exports = { upload }