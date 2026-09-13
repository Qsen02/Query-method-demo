const express = require("express");
const { setCors } = require("../middlewares/cors.js");

function expressConfig(app) {
	app.use(setCors());
	app.use(express.json());
}

module.exports = {
	expressConfig,
};
