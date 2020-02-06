const jwt = require("jsonwebtoken");
const env = require('dotenv');
env.config();
const jwtSecretKey = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log(req.headers);
    console.log("Authorization 6, Token: ", token);
    const decoded = jwt.verify(token, jwtSecretKey);
    console.log("Authorization 8, Decoded Data: ", decoded);
    req.userData = decoded;
    console.log("Authorization 10, Token Verified");
    next();
  } catch (error) {
    console.log("Authorization 13, Token Verification Failed");
    next({ status: 401, message: "Token Verification Failed" });
  }
};

const generateToken = user => {
  const token = jwt.sign(
    {
      email: user[0].email,
      userId: user[0]._id
    },
    jwtSecretKey,
    {
      expiresIn: "1h"
    }
  );
  return token;
};

module.exports = {
  verifyToken: verifyToken,
  generateToken: generateToken
};
