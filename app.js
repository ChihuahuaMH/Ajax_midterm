var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var myRouter = require("./routes/myroute"); // 20200913 Add

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs"); // Mark

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/my", myRouter);

app.get("/geta", function (req, res) {
	res.end("Ajax get ");
});

app.get("/getb", function (req, res) {
	res.end("getb... ");
});

app.post("/posta", function (req, res) {
	res.end("posta... ");
});

app.get("/getc", function (req, res) {
	var data = req.query.username;
	res.end("name: " + data);
});

app.post("/postb", function (req, res) {
	var data = req.body.username;
	res.end("name:" + data);
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render("error");
});

module.exports = app;