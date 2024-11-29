const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const imageResize = async(req, res, next) => {
    try {
       next();
    } catch (error) {
        return res.status(500).json({ error: { description : error.message }});
    }
}

module.exports = { imageResize }