const express = require("express");
const { uploadFile } = require("../controllers/fileController");
const { authenticateJwt } = require("../middleware/authentication");
const { imageResize } = require("../middleware/imageResize");

const router = express.Router();

router.post("/upload", authenticateJwt, imageResize, uploadFile);

module.exports = router;
