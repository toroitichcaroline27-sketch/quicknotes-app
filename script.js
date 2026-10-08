// DOM Element Selection
const noteForm = document.querySelector('#note-form');
const noteInput = document.querySelector('#note-input');
const noteCategory = document.querySelector('#note-category');
const notesList = document.querySelector('#notes-list');
const noteCount = document.querySelector('#note-count');
const errorMessage = document.querySelector('#error-message');

// Data Storage Array
let notes = [];

// Update Note Counter Display
function updateNoteCount() {
  const count = notes.length;
  if (count === 0) {
    noteCount.textContent = 'You have no notes yet.';
  } else if (count === 1) {
    noteCount.textContent = 'You have 1 note.';
  } else {
    noteCount.textContent = `You have ${count} notes.`;
  }
}

// Delete Note Function
function deleteNote(id) {
  notes = notes.filter((note) => note.id !== id);
  render();
}

// Rebuild and Render Notes List
function render() {
  notesList.textContent = '';
  updateNoteCount();

  notes.forEach((note) => {
    // Create card wrapper
    const li = document.createElement('li');
    li.className = `note-card category-${note.category.toLowerCase()}`;

    // Top Bar (Category Tag)
    const topBar = document.createElement('div');
    topBar.className = 'note-top-bar';

    const categoryTag = document.createElement('span');
    categoryTag.className = 'note-tag';
    categoryTag.textContent = note.category;
    topBar.appendChild(categoryTag);

    // Note Body Text
    const bodyText = document.createElement('p');
    bodyText.className = 'note-body';
    bodyText.textContent = note.text;

    // Bottom Bar (Timestamp & Delete Button)
    const bottomBar = document.createElement('div');
    bottomBar.className = 'note-bottom-bar';

    const timeSpan = document.createElement('span');
    timeSpan.className = 'note-timestamp';
    timeSpan.textContent = note.createdAt;

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => deleteNote(note.id));

    bottomBar.appendChild(timeSpan);
    bottomBar.appendChild(deleteBtn);

    // Assemble components into card
    li.appendChild(topBar);
    li.appendChild(bodyText);
    li.appendChild(bottomBar);

    notesList.appendChild(li);
  });
}

// Add Note Handler with Validation
noteForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const textValue = noteInput.value.trim();
  const categoryValue = noteCategory.value;

  // Validation Checks
  if (!textValue) {
    errorMessage.textContent = 'Please type a note first.';
    return;
  }

  if (textValue.length > 200) {
    errorMessage.textContent = 'Notes must be 200 characters or fewer.';
    return;
  }

  // Clear previous validation error
  errorMessage.textContent = '';

  const newNote = {
    id: Date.now().toString(),
    text: textValue,
    category: categoryValue,
    createdAt: new Date().toLocaleString()
  };

  notes.unshift(newNote);
  render();

  // Reset input field
  noteInput.value = '';
});