const {
	getAllNotes,
	createNote,
	searchNotes,
} = require("../services/Notes.js");

function routerConfig(app) {
	app.get("/notes", async (req, res) => {
		const notes = await getAllNotes();
		res.json(notes);
	});

	app.post("/notes", async (req, res) => {
		const fields = req.body;
		const newNote = await createNote(fields.title, fields.content);
		res.json(newNote);
	});

	app.all("/notes/search", async (req, res) => {
		if (req.method !== "QUERY") {
			return res.status(405).json({ error: "Method not allowed" });
		}
		const query = req.body;
		const notes = await searchNotes(query.criteria, query.value);
		res.json(notes);
	});
}

module.exports = {
	routerConfig,
};
