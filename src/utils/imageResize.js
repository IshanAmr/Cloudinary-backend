const sharp = require("sharp");
const path = require("path");

const imageResizer = async (req) => {
    const originalFilePath = req.file.path;
    const parsedPath = path.parse(originalFilePath);
    const outputFilePath = path.join(parsedPath.dir, 'resized-' + parsedPath.name + '.jpeg');
    
    await sharp(originalFilePath).resize({width : 1500}).jpeg({
        quality : 100,
        mozjpeg : true, 
        chromaSubsampling: '4:4:4',
        trellisQuantisation: true,
        overshootDeringing: true,
        optimiseScans: true,
        progressive: true
    }).toFile(outputFilePath);
    
    req.file.path = originalFilePath;
    req.originalFilePath = originalFilePath;
    return req;
}

module.exports = { imageResizer }
