const mongoose = require("mongoose");

const User = require("../models/user");
const passwordUtils = require("./../utils/password-utils");
const authorization = require("../middlewares/authorization");

const sendResponse = function(status, msg, token, user) {
  if (token) {
    return {
      statusCode: status,
      data: {
        message: msg,
        tokens: token,
        user: { username: user.username, level: user.level }
      }
    };
  } else {
    return {
      statusCode: status,
      data: {
        message: msg
      }
    };
  }
};

const checkForDuplicate = async function(key, value) {
  let isDuplicate = false;
  await User.findOne({ [key]: value }).then(response => {
    if (response) {
      isDuplicate = true;
    }
  });
  return isDuplicate;
};

const register = async function(inputEmail, inputUsername, inputPassword) {
  if (await checkForDuplicate("email", inputEmail)) {
    return sendResponse(409, "Email already exists");
  }

  if (await checkForDuplicate("username", inputUsername)) {
    return sendResponse(409, "Username already exists");
  }

  const hashedPassword = await passwordUtils.hashPassword(inputPassword);
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    email: inputEmail,
    username: inputUsername,
    password: hashedPassword,
    level: "user"
  });

  user
    .save()
    .catch(err => sendResponse(409, "Couldn't add the user right now"));

  return sendResponse(200, "User added successfully");
};

const login = async function(inputEmail, inputPassword) {
  const user = await User.findOne({ email: inputEmail });
  if (user) {
    try {
      if (await passwordUtils.checkPassword(inputPassword, user.password)) {
        const token = authorization.generateTokens(user);
        return sendResponse(200, "Authorization successful", token, {
          username: user.username,
          level: user.level
        });
      } else return sendResponse(402, "Wrong Password");
    } catch (error) {
      throw error;
    }
  } else return sendResponse(402, "Email not Found");
};

const tokens = async function(data, info) {
  const tokenRefresh = data.split(" ")[1];
  const tokens = authorization.generateTokens(tokenRefresh, info);
  return sendResponse(200, "new refresh token", tokens, {
    username: "",
    level: ""
  });
};

const users = async function() {
  const users = await User.find({ level: "user" });
  return sendResponse(200, users);
};

const getUserData = async function(userId) {
  const { _id, username, email } = await User.findById(userId);
  console.log("userData", { _id, username, email });
  return sendResponse(200, { _id, username, email });
};

module.exports = {
  login,
  register,
  tokens,
  users,
  getUserData
};
