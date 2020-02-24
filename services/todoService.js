const Todo = require("../models/todo");
const User = require("./../models/user");

const getAllTodos = async function(userId, level) {
  if (level === "admin") {
    const response = await Todo.find()
      .populate("author", "username")
      .populate("assignedTo", "username")
      .exec();
    return response;
  } else {
    const response = await Todo.find({ assignedTo: userId })
      .populate("author", "username")
      .populate("assignedTo", "username")
      .exec();
    return response;
  }
};

const getSpecificTodo = async function(userId, todoId) {
  const response = await Todo.findOne({
    _id: todoId
  });
  return response;
};

const addTodo = async function(userData, todoBody) {
  console.log("todoBody", todoBody);
  console.log("user data", userData);
  if (userData.level === "admin") {
    const todo = new Todo({
      title: todoBody.title,
      content: todoBody.content,
      author: userData.userId,
      assignedTo: todoBody.assignedTo,
      priority: todoBody.priority,
      createdAt: new Date().toString(),
      checked: false
    });
    console.log("added todo", todo);
    const parent = await User.findOne({ _id: userData.userId });
    parent.listItem.push(todo._id);
    await parent.save().catch(err => err);
    const response = await todo.save().catch(err => err);
    console.log("response, response", response);
    return response;
  } else {
    const todo = new Todo({
      title: todoBody.title,
      content: todoBody.content,
      author: userData.userId,
      assignedTo: userData.userId,
      priority: todoBody.priority,
      createdAt: new Date().toString(),
      checked: false
    });
    const parent = await User.findOne({ _id: userData.userId });
    parent.listItem.push(todo._id);
    await parent.save().catch(err => err);
    const response = await todo.save().catch(err => err);
    return response;
  }
};

const addSubTodo = async function(todoId, subTodo) {
  const parent = await Todo.findOne({ _id: todoId });
  parent.subTodos.push(subTodo);
  const response = await parent.save().catch(err => err);

  return response;
};

const deleteTodo = async function(userId, isAdmin, todoId) {
  const response = await Todo.deleteOne({
    _id: todoId
  });
  return response;
};

const deleteSubTodo = async function(parentId, itemId) {
  const parent = await Todo.findOne({ _id: parentId });
  parent.subTodos.id(itemId).remove();
  const response = await parent.save().catch(err => err);
  return response;
};

const updateTodo = async function(userId, isAdmin, todoId, updatedTodo) {
  const response = await Todo.updateOne({ _id: todoId }, updatedTodo);

  return response;
};

const updateSubTodo = async function(
  userId,
  isAdmin,
  parentId,
  itemId,
  updatedSubTodo
) {
  console.log("before executing");
  const parent = await Todo.findOne({ _id: parentId });
  parent.subTodos.id(itemId).set(updatedSubTodo);
  const response = parent.save().catch(err => err);

  return response;
};

// var newdoc = parent.children.create({ name: "Aaron" });

module.exports = {
  getAllTodos,
  getSpecificTodo,
  addTodo,
  deleteTodo,
  updateTodo,
  addSubTodo,
  deleteSubTodo,
  updateSubTodo
};
