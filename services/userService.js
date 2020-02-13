const mongoose = require("mongoose");

const User = require("../models/user");
const authorization = require("../middlewares/authorization");
const passwordUtils = require("./../utils/password-utils");

const sendResponse = function(status, msg, token) {
  if (token) {
    return {
      statusCode: status,
      data: {
        message: msg,
        tokens: token
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
    if (!response) {
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

  const hashInformation = await passwordUtils.hashPassword(inputPassword);
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    email: inputEmail,
    username: inputUsername,
    password: hashInformation.hash
  });

  user
    .save()
    .catch(err => sendResponse(409, "Couldn't add the user right now"));

  return sendResponse(200, "User added successfully");
};

const login = async function(inputEmail, inputPassword) {
  const response = await User.findOne({ email: inputEmail });
  if (response) {
    if (await passwordUtils.checkPassword(inputPassword, response.password)) {
      const token = authorization.generateTokens(response);
      return sendResponse(200, "Authorization successful", token);
    } else return sendResponse(401, "Wrong Password");
  } else return sendResponse(401, "Email not Found");
};

module.exports = {
  login,
  register
};
