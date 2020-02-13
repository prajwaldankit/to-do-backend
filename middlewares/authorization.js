const env = require("dotenv");
const jwt = require("jsonwebtoken");

env.config();

const jwtSecretKey = process.env.JWT_SECRET_ACCESS;
const jwtSecretKeyRefresh = process.env.JWT_SECRET_REFRESH;

const verifyToken = (req, res, next) => {
  try {
    // console.log("token in original format", req.headers.authorization);
    const token = req.headers.authorization.split(" ")[1];
    // console.log("Authorization 6, Token: ", token);
    const decoded = jwt.verify(token, jwtSecretKey);
    // console.log("Authorization 8, Decoded Data: ", decoded);
    req.userData = decoded;
    // console.log("Authorization 10, Token Verified");
    next();
  } catch (error) {
    // console.log("Authorization 13, Token Verification Failed");
    next({ status: 401, message: "Token Verification Failed" });
  }
};

const generateTokenAccess = user => {
  const token = jwt.sign(
    {
      email: user.email,
      userId: user._id
    },
    jwtSecretKey,
    {
      expiresIn: "10m"
    }
  );
  return token;
};

const generateTokenRefresh = user => {
  const token = jwt.sign(
    {
      email: user.email,
      userId: user._id
    },
    jwtSecretKeyRefresh,
    {
      expiresIn: "7d"
    }
  );
  return token;
};

const generateTokens = user => {
  const token = generateTokenAccess(user);
  const tokenRefresh = generateTokenRefresh(user);
  return {
    token,
    tokenRefresh
  };
};

module.exports = {
  verifyToken,
  generateTokens
};
