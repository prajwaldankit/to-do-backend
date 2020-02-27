const mongoose = require("mongoose");

const User = require("../models/user");
const passwordUtils = require("./../utils/password-utils");
const authorization = require("../middlewares/authorization");

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
  try {
    if (await checkForDuplicate("email", inputEmail)) {
      throw new Error("Email already exists");
    }

    if (await checkForDuplicate("username", inputUsername)) {
      throw new Error("Username already exists");
    }

    const hashedPassword = await passwordUtils.hashPassword(inputPassword);
    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      email: inputEmail,
      username: inputUsername,
      password: hashedPassword,
      level: "user"
    });

    user.save().catch(err => {
      throw new Error("Couldn't add the user right now");
    });

    return { message: "User added successfully" };
  } catch (err) {
    throw err;
  }
};

const login = async function(inputEmail, inputPassword) {
  const user = await User.findOne({ email: inputEmail });
  try {
    if (user) {
      if (await passwordUtils.checkPassword(inputPassword, user.password)) {
        const tokens = await authorization.generateTokens(user);
        return { tokens };
      } else throw new Error("Wrong Password");
    } else throw new Error("Email not Found");
  } catch (err) {
    throw err;
  }
};

const tokens = async function(data, info) {
  const tokenRefresh = data.split(" ")[1];
  const tokens = authorization.generateTokens(tokenRefresh, info);
  return tokens;
};

const users = async function() {
  const users = await User.find({ level: "user" }).select({
    _id: 1,
    username: 1,
    email: 1,
    level: 1
  });
  return users;
};

const getUserData = async function(userId) {
  const userData = await User.findById(userId).select({
    _id: 1,
    username: 1,
    email: 1,
    level: 1
  });
  return userData;
};

module.exports = {
  login,
  register,
  tokens,
  users,
  getUserData
};
