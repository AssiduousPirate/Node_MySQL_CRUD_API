const multer = require('multer')
const path = require('path')
const fs = require('fs')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(__dirname, '..', 'images')
        fs.mkdir(uploadDir, { recursive: true }, function (err) {
            if (err) {
                console.log(err)
            } else {
                cb(null, uploadDir)
            }
        })
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now() + "." + "png")
    }
})
const upload = multer({ storage: storage })
module.exports = { upload }