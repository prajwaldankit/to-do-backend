const checkAdmin = function(req, res, next) {
  try {
    if (req.userData.level === "admin") next();
  } catch (error) {
    next({
      status: 403,
      message: "Forbidden Access"
    });
  }
};

const checkMod = function(req, res, next) {
  try {
    if (req.userData.level === "moderator" || req.userData.level === "admin")
      next();
  } catch (error) {
    next({
      status: 403,
      message: "Forbidden Access"
    });
  }
};

const checkUser = function(req, res, next) {
  try {
    if (req.userData.level === "user") next();
  } catch (error) {
    next({
      status: 403,
      message: "Forbidden Access"
    });
  }
};

const checkAccess = function(req, res, next) {
  try {
    if (req.userData.level === "admin") next();
    if (req.userData.level === "moderator") next();
  } catch (error) {
    next({ status: 403, data: error });
  }
};

module.exports = {
  checkAdmin,
  checkMod,
  checkUser,
  checkAccess
};
