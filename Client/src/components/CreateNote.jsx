import { useState } from "react";
import styles from "./CreateNote.module.css";

export default function CreateNoteForm({ notesHandler }) { 
    const [formValues,setFormValues]=useState({
        title:"",
        content:""
    })

    function changeFormValues(event){
        const {name,value}=event.currentTarget;
        setFormValues((prevState)=>{
            return {
                ...prevState,
                [name]: value
            }
        })
    }

    async function submitForm(event){
        event.preventDefault();
        const response = await fetch(`http://localhost:3000/notes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formValues)
        });
        const data = await response.json();
        notesHandler((prevNotes) => [...prevNotes, data]);
        setFormValues({
            title: "",
            content: ""
        });
    }

    return (
		<form className="form-section">
			<h2>Create Note</h2>
            <div className="inputs">
                <label htmlFor="title">Title</label>
				<input
					type="text"
					name="title"
					value={formValues.title}
					onChange={changeFormValues}
				/>
            </div>
            <div className="inputs">
                <label htmlFor="content">Content</label>
				<textarea
					name="content"
					value={formValues.content}
					onChange={changeFormValues}
				/>
            </div>
			<button type="submit" className="button" onClick={submitForm}>
				Create
			</button>
		</form>
	);
}