const router = require("express").Router();

const checkTodo = require("../middlewares/checktodo");
const authorization = require("../middlewares/authorization");
const checkAccess = require("./../middlewares/privillege").checkAccess;
const todoController = require("../controllers/todoController");

router.get("/", authorization.verifyToken, todoController.getAllTodos);

router.get("/:id", authorization.verifyToken, todoController.getSpecificTodo);

// router.post("/", todoController.addTodo);
router.post("/", authorization.verifyToken, todoController.addTodo);

router.put("/:id", authorization.verifyToken, todoController.addSubTodo);

router.delete(
  "/:id",
  authorization.verifyToken,
  checkTodo,
  todoController.deleteTodo
);
router.delete(
  "/:parentId/:itemId",
  authorization.verifyToken,
  checkTodo,
  todoController.deleteSubTodo
);

router.patch(
  "/:id",
  authorization.verifyToken,
  checkTodo,
  todoController.updateTodo
);

router.patch(
  "/:parentId/:itemId",
  authorization.verifyToken,
  checkTodo,
  todoController.updateSubTodo
);

module.exports = router;
