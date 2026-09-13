const mongoose = require("mongoose");
const { NoteModel } = require("../models/Notes.js");

async function runDB() {
	try {
		await mongoose.connect("mongodb://127.0.0.1:27017/Query-Method-Demo");
		await NoteModel.init();
		console.log("Database is running...");
	} catch (error) {
		console.log("Error connecting to MongoDB:", error);
	}
}

module.exports = {
	runDB,
};
