const mongoose = require("mongoose");
const authorization = require("../middlewares/authorization");
const User = require("../models/user");

const sendResponse = function(status, msg, token) {
  if (token) {
    return {
      statusCode: status,
      data: {
        message: msg,
        token: token
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
  await User.find({ [key]: value }).then(response => {
    if (!(response.length == 0)) {
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

  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    email: inputEmail,
    username: inputUsername,
    password: inputPassword
  });

  await user.save().catch(err => console.log(err));

  return sendResponse(200, "User added successfully");
};

const login = async function(inputEmail, inputPassword) {
  const response = await User.find({ email: inputEmail }).then(response => {
    if (response.length > 0) {
      if (inputPassword == response[0].password) {
        const token = authorization.generateToken(response);
        return sendResponse(200, "Authorization successful", token);
      } else return sendResponse(401, "Wrong Password");
    } else return sendResponse(401, "Email not found");
  });
  return response;
};

module.exports = {
  login: login,
  register: register
};
