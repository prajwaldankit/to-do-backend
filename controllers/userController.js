const userService = require("../services/userService");

const register = async function(req, res, next) {
  const response = await userService.register(
    req.body.email,
    req.body.username,
    req.body.password
  );
  res.status(response.statusCode).send(response.data);
};

const login = async function(req, res, next) {
  const response = await userService.login(req.body.email, req.body.password);
  res.status(response.statusCode).send(response.data);
};

module.exports = {
  register: register,
  login: login
};
