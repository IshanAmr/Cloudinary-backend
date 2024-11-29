const path = require('path');

const fileTypeValidator = (file) => {
    const fileTypes = /jpeg|jpg|gif|png/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);
    return extname && mimetype;
}

module.exports = { fileTypeValidator }