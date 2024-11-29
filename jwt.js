const jwt = require('jsonwebtoken');
require('dotenv').config();

function generateToken(payload, expiresIn = '1h') {
  return jwt.sign(payload, process.env.JWT_SECRET);
}

const payload = { lesson: 'cloudinaryUpload' };
const token = generateToken(payload);
console.log('Generated Token:', token);