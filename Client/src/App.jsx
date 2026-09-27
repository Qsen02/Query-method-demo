import { useEffect, useState } from "react";
import NoteItem from "./components/NoteItem";

function App() {
	const [notes, setNotes] = useState([]);
	const [searchValue, setSearchValue] = useState({
		value: "",
		criteria: "title",
	});

	function handleSearch(event) {
		const { name, value } = event.currentTarget;
		setSearchValue((prev) => ({
			...prev,
			[name]: value
		}));
	}

	async function onSearch() {
		const response = await fetch(`http://localhost:3000/notes/search`, {
			method: "QUERY",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ criteria: searchValue.criteria, value: searchValue.value }),
		});
		const data = await response.json();
		setNotes(data);
	}

	useEffect(() => {
		(async () => { 
			const response = await fetch('http://localhost:3000/notes');
			const data = await response.json();
			setNotes(data);
		})()
	}, []);

	return (
		<main>
			<section>
				<h1>Welcome to http method Query demo</h1>
				<p>This is simple app for notes to test new http methods</p>
			</section>
			<form>
				<h2>Search notes</h2>
				<div>
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
					<button type="button" onClick={onSearch}>
						Search
					</button>
				</div>
			</form>
			<section>
				<h2>Notes</h2>
				<section>
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
