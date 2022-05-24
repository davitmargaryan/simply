// var createError = require("http-errors");
// var express = require("express");
// var path = require("path");
// var cookieParser = require("cookie-parser");
// var logger = require("morgan");

// var indexRouter = require("./routes/index");
// var usersRouter = require("./routes/users");
// var app = express();

// const dbConn = require("./config/config.js");

// // view engine setup
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "jade");

// app.use(logger("dev"));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));

// app.use("/", indexRouter);
// app.use("/users", usersRouter);

// // catch 404 and forward to error handler
// // app.use(function (req, res, next) {
// //   next(createError(404));
// // });

// // error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render("error");
// });

// module.exports = app;
const usersRouter = require("./routes/users");
const rolesRouter = require("./routes/roles");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
// create express app
const app = express();
app.use(cors());
// Setup server port
const port = process.env.PORT || 4000;
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse requests of content-type - application/json
app.use(bodyParser.json());
app.use(function (req, res, next) {
  console.log("asdasd");
  next();
});
app.use(function (req, res, next) {
  console.log("dsadsa");
  next();
});
// define a root route
app.use("/users", usersRouter);
app.use("/roles", rolesRouter);
app.get("/", (req, res) => {
  res.send("Hello World");
});
// listen for requests
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
