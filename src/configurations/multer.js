/* Plugins. */
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = `uploads/${req?.query?.type}`;
        if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        let sanitizedFilename = file.originalname.toLocaleLowerCase().replace(/\s+/g, '');
        let filename = crypto.randomBytes(16).toString('hex') + path.extname(sanitizedFilename);
        cb(null, filename);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 10 }
});

module.exports = upload;