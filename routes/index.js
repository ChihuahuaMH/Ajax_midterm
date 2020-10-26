const express = require("express");
const router = express.Router();

const imageDetails = require('../detail.json');

/* GET home page. */
router.get("/", (req, res) => {
	res.render("index");
});

/* GET random image info */
router.get("/random", (req, res) => {
	res.send(imageDetails[Math.floor(Math.random() * imageDetails.length)]);
});

module.exports = router;
