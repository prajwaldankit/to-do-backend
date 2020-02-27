const router = require("express").Router();

const authorization = require("./../middlewares/authorization");
const userController = require("../controllers/userController");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/tokens", userController.tokens);
router.get("/users", userController.users);
router.get("/user", authorization.verifyToken, userController.userData);

module.exports = router;
