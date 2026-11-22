import { useEffect, useState } from "react";
import NoteItem from "./components/NoteItem";
import CreateNoteForm from "./components/CreateNote";

function App() {
	const [notes, setNotes] = useState([]);
	const [searchValue, setSearchValue] = useState({
		value: "",
		criteria: "title",
	});
	const [showCreateForm, setShowCreateForm] = useState(false);

	function handleSearch(event) {
		const { name, value } = event.currentTarget;
		setSearchValue((prev) => ({
			...prev,
			[name]: value,
		}));
	}

	async function onSearch() {
		const response = await fetch(`http://localhost:3000/notes/search`, {
			method: "QUERY",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				criteria: searchValue.criteria,
				value: searchValue.value,
			}),
		});
		const data = await response.json();
		setNotes(data);
	}

	useEffect(() => {
		(async () => {
			const response = await fetch("http://localhost:3000/notes");
			const data = await response.json();
			setNotes(data);
		})();
	}, []);

	return (
		<main>
			<section className="title-section">
				<h1>Welcome to http method Query demo</h1>
				<p>This is simple app for notes to test new http methods</p>
			</section>
			{showCreateForm ? (
				<button
					className="button"
					type="button"
					onClick={() => setShowCreateForm(false)}
				>
					Hide Create Note Form
				</button>
			) : (
				<button
					className="button"
					type="button"
					onClick={() => setShowCreateForm(true)}
				>
					Show Create Note Form
				</button>
			)}
			{showCreateForm && <CreateNoteForm notesHandler={setNotes} />}
			<form className="form-section">
				<h2>Search notes</h2>
				<div className="inputs">
					<input
						id="value"
						type="text"
						placeholder="Search notes..."
						name="value"
						onChange={handleSearch}
					/>
					<select
						name="criteria"
						id="criteria"
						onChange={handleSearch}
					>
						<option value="title">Title</option>
						<option value="content">Content</option>
					</select>
					<button type="button" onClick={onSearch} className="button">
						Search
					</button>
				</div>
			</form>
			<section className="notes-section">
				<h2>Notes</h2>
				<section className="notes-container">
					{notes.map((note) => (
						<NoteItem
							key={note._id}
							title={note.title}
							content={note.content}
						/>
					))}
				</section>
			</section>
		</main>
	);
}

export default App;
