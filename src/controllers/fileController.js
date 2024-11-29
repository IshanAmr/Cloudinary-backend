const fs = require("fs");
const cloudinaryUpload = require("../service/fileService.js");
const { upload } = require("../middleware/fileUpload.js");
const { imageResizer } = require("../utils/imageResize.js");
const { fileTypeValidator } = require("../utils/fileTypeValidators.js");
const UNEXPECTED_FILE_TYPE = require("../constants/file.js");

if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

const uploadFile = (req, res) => {
  const singleUpload = upload.single("file");

 singleUpload(req, res, async (err) => {
    if (err) {
      console.error("Error during file upload:", err);
      return res.status(500).send({ error: "Failed to upload file." });
    }
    const file = req.file;

    
     const isValidFile = fileTypeValidator(file);
     if(!isValidFile) return res.status(500).json(UNEXPECTED_FILE_TYPE);

    await imageResizer(req);


    if (!file) {
      return res.status(400).send({ error: "No file uploaded!" });
    }

    const response = await cloudinaryUpload(file);
    res.status(200).json({ message : "File uploaded successfully", uploadResult : response });

  });
};

module.exports = { uploadFile };
