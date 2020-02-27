const env = require("dotenv");
const jwt = require("jsonwebtoken");

env.config();

const jwtSecretKey = process.env.JWT_SECRET_ACCESS;
const jwtSecretKeyRefresh = process.env.JWT_SECRET_REFRESH;

const decodeToken = function(token, key) {
  return jwt.verify(token, key);
};

const generateToken = function(payload, key, time) {
  return jwt.sign(payload, key, time);
};

const verifyToken = function(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = decodeToken(token, jwtSecretKey);
    req.userData = decoded;
    next();
  } catch (error) {
    next({ status: 401, message: "TokenExpired" });
  }
};

const generateTokenAccess = function(tokenRefresh) {
  try {
    const user = decodeToken(tokenRefresh, jwtSecretKeyRefresh);
    return generateToken(
      {
        userId: user.userId,
        email: user.email,
        level: user.level || "user"
      },
      jwtSecretKey,
      {
        expiresIn: "2m"
      }
    );
  } catch (error) {
    throw error;
  }
};

const generateTokenRefresh = function(user) {
  return generateToken(
    {
      email: user.email,
      userId: user.userId,
      level: user.level || "user"
    },
    jwtSecretKeyRefresh,
    {
      expiresIn: "7d"
    }
  );
};

const generateTokens = function(user, info) {
  if (info == "withRefresh") {
    decoded = decodeToken(user, jwtSecretKeyRefresh);
    user = decoded;
  } else {
    user.userId = user._id;
  }
  const tokenRefresh = generateTokenRefresh(user);
  const token = generateTokenAccess(tokenRefresh);

  return {
    token,
    tokenRefresh
  };
};

module.exports = {
  verifyToken,
  generateTokens
};
