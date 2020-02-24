const todoService = require("../services/todoService");

const getAllTodos = async function(req, res, next) {
  console.log(req.userData);
  const response = await todoService.getAllTodos(
    req.userData.userId,
    req.userData.level
  );

  if (response) {
    res.status(200).json(response);
  } else {
    next({
      status: 409,
      message: "could not get the list right now"
    });
  }
};

const getSpecificTodo = async function(req, res, next) {
  console.log("inside spec constrol");
  const todoId = req.params.id;
  console.log(req.params);
  const response = await todoService.getSpecificTodo(
    req.userData.userId,
    todoId
  );
  if (response) {
    res.status(200).json(response);
  } else {
    next({
      status: 409,
      message: "could not get the sub list right now"
    });
  }
};

const addTodo = async function(req, res, next) {
  const response = await todoService.addTodo(req.userData, req.body);
  if (response) {
    res.status(201).json({
      message: "Todo Added Successfully",
      todo: response
    });
  } else {
    next({
      status: 409,
      message: "could not get a response"
    });
  }
};

const addSubTodo = async function(req, res, next) {
  const todoId = req.params.id;
  console.log("todoid", todoId);
  console.log("req.body", req.body);
  subTodoProps = {
    ...req.body,
    createdAt: new Date().toString(),
    checked: false
  };
  const response = await todoService.addSubTodo(todoId, subTodoProps);
  if (response) {
    res.status(201).json({
      message: "subtask added succesfully",
      todo: response
    });
  } else {
    next({
      status: 409,
      message: "Couldnot add the sub task right now"
    });
  }
};

const updateTodo = async function(req, res, next) {
  const todoId = req.params.id;

  const response = await todoService.updateTodo(
    req.userData.userId,
    req.userData.isAdmin,
    todoId,
    req.body
  );

  if (response) {
    res.status(200).json({
      message: "Todo Updated Successfully",
      updateTodo: response
    });
  } else
    next({
      status: 409,
      message: "Couldnot update todo right now"
    });
};

const updateSubTodo = async function(req, res, next) {
  const parentId = req.params.parentId;
  const itemId = req.params.itemId;

  const response = await todoService.updateSubTodo(
    req.userData.userId,
    req.userData.isAdmin,
    parentId,
    itemId,
    req.body
  );

  if (response) {
    res.status(200).json({
      message: "Todo Updated Successfully",
      updateTodo: response
    });
  } else
    next({
      status: 409,
      message: "Couldnot update todo right now"
    });
};

const deleteTodo = async function(req, res, next) {
  const todoId = req.params.id;
  const response = await todoService.deleteTodo(
    req.userData.userId,
    req.userData.isAdmin,
    todoId
  );
  if (response) {
    res.status(200).json({
      message: "Todo Deleted Successfully"
    });
  } else {
    next({
      status: 409,
      message: "Couldnot delete todo right now"
    });
  }
};

const deleteSubTodo = async function(req, res, next) {
  const parentId = req.params.parentId;
  const itemId = req.params.itemId;
  const response = await todoService.deleteSubTodo(parentId, itemId);
  if (response) {
    res.status(200).json({
      message: "Sub Todo Deleted Successfully"
    });
  } else {
    next({
      status: 409,
      message: "Couldnot delete sub todo right now"
    });
  }
};

module.exports = {
  getAllTodos,
  getSpecificTodo,
  deleteTodo,
  addTodo,
  updateTodo,
  addSubTodo,
  deleteSubTodo,
  updateSubTodo
};
