const express = require("express");
const morgan = require("morgan");
const userRoutes = require("./routes/user");
const todoRoutes = require("./routes/todo");
const parser = require("./utils/parser");
const app = express();
const mongoConnection = require("./database/connection");
const errorRoute = require("./utils/error");
const cors = require("cors");

app.use(cors());
mongoConnection.start();
app.use(morgan("dev"));
parser(app);
app.use("/users", userRoutes);
app.use("/api/todos", todoRoutes);
app.use("/", errorRoute);

app.listen(8000);

module.exports = app;
