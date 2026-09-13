const { NoteModel } = require('../models/Notes.js');

async function getAllNotes() { 
    const notes = await NoteModel.find().lean();
    return notes;
}

async function searchNotes(criteria, value) { 
    const query = {};
    query[criteria] = { $regex: value, $options: 'i' };
    const notes = await NoteModel.find(query).lean();
    return notes;
}

async function createNote(title, content) {
    const newNote = new NoteModel({ title, content });
    await newNote.save();
    return newNote;
}

module.exports = {
    getAllNotes,
    searchNotes,
    createNote
}