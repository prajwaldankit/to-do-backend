const express = require("express");

const errorGeneral = (req, res, next) => {
  next({
    status: 404,
    message: "Not found"
  });
};

const errorwithmessage = (error, req, res, next) => {
  res.status(error.status).json({
    message: error.message
  });
};

module.exports = { errorGeneral, errorwithmessage };
