const router = require("express").Router();
const userController = require("../controllers/userController");

router.get("/users", userController.users);
router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/tokens", userController.tokens);
router.get("/:userId", userController.userData);

module.exports = router;
