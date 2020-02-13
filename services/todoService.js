const mongoose = require("mongoose");
const Todo = require("../models/todo");

const getAllTodos = async function(userId) {
  const response = await Todo.find({ authorId: userId }).exec();
  return response;
};

const getSpecificTodo = async function(userId, todoId) {
  const response = await Todo.find({
    authorId: userId,
    _id: todoId
  });
  console.log("TS14", response);
  return response;
};

const addTodo = async function(userId, todoBody, hasChild = false) {
  const todo = new Todo(
    new Todo({
      _id: new mongoose.Types.ObjectId(),
      title: todoBody.title,
      content: todoBody.content,
      authorId: userId,
      createdAt: new Date().toString(),
      checked: false
    })
  );
  const response = await todo.save().catch(err => err);

  return response;
};

const deleteTodo = async function(userId, todoId) {
  await Todo.deleteOne({
    _id: todoId,
    authorId: userId
  });
};

const updateTodo = async function(userId, todoId, updatedTodo) {
  console.log("Updated Todo", updatedTodo);
  const response = await Todo.update(
    { authorId: userId, _id: todoId },
    { checked: updatedTodo.checked }
  );
  console.log("resp", response);
  return response;
};

module.exports = {
  getAllTodos: getAllTodos,
  getSpecificTodo: getSpecificTodo,
  addTodo: addTodo,
  deleteTodo: deleteTodo,
  updateTodo: updateTodo
};
