const colors = ['#ffeb3b', '#ffcc80', '#64b5f6', '#81c784', '#ba68c8']; // Cores dos post-its

document.addEventListener('DOMContentLoaded', () => {
    loadNotes();

    // Desabilitar clique direito
    document.addEventListener('contextmenu', (e) => e.preventDefault());

    // Desabilitar atalhos de teclado
    document.addEventListener('keydown', (e) => {
        if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I')) {
            e.preventDefault();
        }
    });
});

function addNote() {
    const noteInput = document.getElementById('noteInput');
    const noteText = noteInput.value.trim();

    if (noteText) {
        const notesContainer = document.getElementById('notes');
        const noteElement = document.createElement('div');
        const color = colors[Math.floor(Math.random() * colors.length)];
        const dateTime = new Date().toLocaleString('pt-BR');

        noteElement.className = 'note';
        noteElement.style.backgroundColor = color;

        noteElement.innerHTML = `
            <button onclick="removeNote(this)">✖</button>
            <p>${noteText}</p>
            <small>${dateTime}</small>
        `;

        notesContainer.appendChild(noteElement);
        saveNote(noteText, color, dateTime);
        noteInput.value = '';
    }
}

function removeNote(button) {
    const noteElement = button.parentElement;
    const noteText = noteElement.querySelector('p').innerText;
    noteElement.remove();
    removeSavedNote(noteText);
}

function saveNote(text, color, dateTime) {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.push({ text, color, dateTime });
    localStorage.setItem('notes', JSON.stringify(notes));
}

function removeSavedNote(text) {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    const filteredNotes = notes.filter(note => note.text !== text);
    localStorage.setItem('notes', JSON.stringify(filteredNotes));
}

function loadNotes() {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    const notesContainer = document.getElementById('notes');

    notes.forEach(note => {
        const noteElement = document.createElement('div');
        noteElement.className = 'note';
        noteElement.style.backgroundColor = note.color;

        noteElement.innerHTML = `
            <button onclick="removeNote(this)">✖</button>
            <p>${note.text}</p>
            <small>${note.dateTime}</small>
        `;

        notesContainer.appendChild(noteElement);
    });
}
