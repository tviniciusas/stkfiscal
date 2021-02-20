const multer = require('multer')
const dia = new Date()

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null,"uploads/")
    },
    filename: function(req, file, cb) {
        cb(null,  file.originalname)
    }
})
const upload = multer({storage})

module.exports = upload;