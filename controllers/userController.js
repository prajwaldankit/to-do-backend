const httpStatus = require("http-status-codes");

const userService = require("../services/userService");

const userData = async function(req, res, next) {
  const userId = req.params.userId;
  const response = await userService.getUserData(userId);
  return res.status(httpStatus.OK).json(response.data);
};

const users = async function(req, res, next) {
  const response = await userService.users();
  res.status(response.statusCode).json(response.data);
};

const register = async function(req, res, next) {
  const response = await userService.register(
    req.body.email,
    req.body.username,
    req.body.password
  );
  res.status(response.statusCode).send(response.data);
};

const login = async function(req, res, next) {
  userService
    .login(req.body.email, req.body.password)
    .then(response => {
      console.log(response);
      res.status(httpStatus.OK).send(response.data);
    })
    .catch(error => {
      console.log("error", error);
      next(error);
    });
};

const tokens = async function(req, res, next) {
  const response = await userService.tokens(
    req.body.refreshToken,
    req.body.info
  );
  res.status(response.statusCode).send(response.data);
};

module.exports = {
  register,
  login,
  tokens,
  users,
  userData
};
