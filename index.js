const express = require("express");
const morgan = require("morgan");
const path = require("path");

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
app.use("/static", express.static(path.join(__dirname, "public")));
app.use("/users", userRoutes);
app.use("/api/todos", todoRoutes);
app.use("/", errorRoute.errorGeneral);
app.use("/", errorRoute.errorwithmessage);

app.listen(8000, (err, succ) => {
  if (!err) {
    console.log("server is up and running");
  } else {
    console.log("server could not be started");
  }
});

module.exports = app;
