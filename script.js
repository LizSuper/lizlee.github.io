// script.js
let notes = JSON.parse(localStorage.getItem('notes')) || [];

const addNoteBtn = document.getElementById('addNoteBtn');
const saveNoteBtn = document.getElementById('saveNoteBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const modal = document.getElementById('modal');
const noteContent = document.getElementById('noteContent');
const notesList = document.getElementById('notesList');

const renderNotes = () => {
    notesList.innerHTML = '';
    notes.forEach((note, index) => {
        const noteItem = document.createElement('div');
        noteItem.className = 'note-item';

        const noteText = document.createElement('div');
        noteText.textContent = note.content;
        noteItem.appendChild(noteText);

        const noteTime = document.createElement('div');
        noteTime.textContent = `Last edited: ${note.time}`;
        noteItem.appendChild(noteTime);

        const noteActions = document.createElement('div');
        noteActions.className = 'note-actions';

        const editBtn = document.createElement('button');
        editBtn.className = 'edit-btn';
        editBtn.textContent = 'Edit';
        editBtn.onclick = () => editNote(index);
        noteActions.appendChild(editBtn);

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = () => deleteNote(index);
        noteActions.appendChild(deleteBtn);

        noteItem.appendChild(noteActions);
        notesList.appendChild(noteItem);
    });
};

const saveNote = () => {
    const content = noteContent.value.trim();
    if (content) {
        const newNote = {
            content: content,
            time: new Date().toLocaleString()
        };
        notes.push(newNote);
        localStorage.setItem('notes', JSON.stringify(notes));
        noteContent.value = '';
        modal.style.display = 'none';
        renderNotes();
    }
};

const editNote = (index) => {
    const editedContent = prompt('Edit your note:', notes[index].content);
    if (editedContent !== null) {
        notes[index].content = editedContent;
        notes[index].time = new Date().toLocaleString();
        localStorage.setItem('notes', JSON.stringify(notes));
        renderNotes();
    }
};

const deleteNote = (index) => {
    if (confirm('Are you sure you want to delete this note?')) {
        notes.splice(index, 1);
        localStorage.setItem('notes', JSON.stringify(notes));
        renderNotes();
    }
};

addNoteBtn.addEventListener('click', () => {
    modal.style.display = 'flex';
});

closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    noteContent.value = '';
});

saveNoteBtn.addEventListener('click', saveNote);

renderNotes();
