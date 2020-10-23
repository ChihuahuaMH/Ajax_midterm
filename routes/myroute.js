var express = require("express");
var router = express.Router();

router.get("/test", function (req, res) {
	res.send("test ...");
});

router.get("/test/1", function (req, res) {
	res.send("test1 ...");
});

router.get("/get1", function (req, res) {
	res.render("get_1");
});

router.get("/get2", function (req, res) {
	res.render("get_2");
});

router.get("/post1", function (req, res) {
	res.render("post_1");
});

router.get("/post2", function (req, res) {
	res.render("post_2");
});

router.get("/getb", function (req, res) {
	res.send("getb ... ");
});

router.get("/get3", function (req, res) {
	res.render("get_3");
});

router.get("/mydata", function (req, res) {
	const data = { name: "chihuahua", age: 100 };
	res.render("myData", data);
});

router.get("/ejs1", function (req, res) {
	const data = {
		username: "chihuahua",
		interest: "<p>interest</p><hr>",
		item: ["sleep", "eat", "sleep"],
	};
	res.render("ejs_1", data);
});
module.exports = router;
