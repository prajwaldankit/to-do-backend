const todoService = require("../services/todoService");

const getAllTodos = async function(req, res, next) {
  const response = await todoService.getAllTodos(req.userData.userId);

  res.status(200).json(response);
};

const getSpecificTodo = async function(req, res, next) {
  const todoId = req.params.id;
  const response = await todoService.getSpecificTodo(
    req.userData.userId,
    todoId
  );
  res.status(200).json(response);
};

const addTodo = async function(req, res, next) {
  const response = await todoService.addTodo(req.userData.userId, req.body);
  res.status(200).json({
    message: "Todo Added Successfully",
    todo: response
  });
};

const updateTodo = async function(req, res, next) {
  const todoId = req.params.id;

  const response = await todoService.updateTodo(
    req.userData.userId,
    todoId,
    req.body
  );

  res.status(200).json({
    message: "Todo Updated Successfully",
    updateTodo: response
  });
};

const deleteTodo = async function(req, res, next) {
  const todoId = req.params.id;
  await todoService.deleteTodo(req.userData.userId, todoId);
  res.status(200).json({
    message: "Todo Deleted Successfully"
  });
};

module.exports = {
  getAllTodos: getAllTodos,
  getSpecificTodo: getSpecificTodo,
  deleteTodo: deleteTodo,
  addTodo: addTodo,
  updateTodo: updateTodo
};
