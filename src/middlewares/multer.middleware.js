const multer = require('multer');
const path = require("path")
const { v4: uuidv4 } = require('uuid'); 


const storage = multer.diskStorage({

    destination: '/uploads',

    filename: (req, file, cb) => {

        const ext = path.extname(file.originalname).toLowerCase();

        const fileName = `${uuidv4()}-file${ext}`;

        cb(null, fileName);
    }
});

const upload = multer({

    storage: storage,

    limits: { fileSize: 2 * 1024 * 1024 },
    
    fileFilter: (_req, file, cb) => {

        if (!['image/jpeg', 'image/png', 'image/jpg'].includes(file.mimetype)) {

            return cb(new Error("Only JPG, JPEG and PNG files are allowed"))
        }

        cb(null, true);
    }
});

module.exports = upload



