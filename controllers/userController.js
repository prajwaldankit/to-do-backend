const httpStatus = require("http-status-codes");

const userService = require("../services/userService");

const userData = async function(req, res, next) {
  const userId = req.userData.userId;
  const response = await userService.getUserData(userId);
  return res.status(httpStatus.OK).send(response);
};

const users = async function(req, res, next) {
  userService
    .users()
    .then(response => {
      res.status(httpStatus.OK).json(response);
    })
    .catch(err =>
      next({
        status: httpStatus.FORBIDDEN,
        message: err.message
      })
    );
};

const register = async function(req, res, next) {
  userService
    .register(req.body.email, req.body.username, req.body.password)
    .then(response => {
      res.status(httpStatus.OK).send(response);
    })
    .catch(err =>
      next({
        status: httpStatus.CONFLICT,
        message: err.message
      })
    );
};

const login = async function(req, res, next) {
  userService
    .login(req.body.email, req.body.password)
    .then(response => {
      res.status(httpStatus.OK).send(response);
    })
    .catch(error => {
      next({
        status: httpStatus.FORBIDDEN,
        message: error.message
      });
    });
};

const tokens = async function(req, res, next) {
  const response = await userService.tokens(
    req.body.refreshToken,
    req.body.info
  );
  res.status(httpStatus.OK).send(response);
};

module.exports = {
  register,
  login,
  tokens,
  users,
  userData
};
