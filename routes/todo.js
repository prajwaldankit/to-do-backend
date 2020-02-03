const router = require("express").Router();
const todoController = require("../controllers/todoController");
const authorization = require("../middlewares/authorization");
const checkTodo = require("../middlewares/checktodo");

router.get("/", authorization.verifyToken, todoController.getAllTodos);

router.get("/:id", authorization.verifyToken, todoController.getSpecificTodo);

router.post("/", authorization.verifyToken, todoController.addTodo);

router.delete(
  "/:id",
  authorization.verifyToken,
  checkTodo,
  todoController.deleteTodo
);

router.patch(
  "/:id",
  authorization.verifyToken,
  checkTodo,
  todoController.updateTodo
);

module.exports = router;
