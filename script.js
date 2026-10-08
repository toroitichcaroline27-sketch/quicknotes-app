// DOM Element Selection
const noteForm = document.querySelector('#note-form');
const noteInput = document.querySelector('#note-input');
const noteCategory = document.querySelector('#note-category');
const notesList = document.querySelector('#notes-list');

// Data Storage Array
let notes = [];

// Rebuild and Render Notes List
function render() {
  // Clear existing list elements
  notesList.textContent = '';

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

    // Note Body Text (textContent prevents XSS)
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

    bottomBar.appendChild(timeSpan);
    bottomBar.appendChild(deleteBtn);

    // Assemble components into card
    li.appendChild(topBar);
    li.appendChild(bodyText);
    li.appendChild(bottomBar);

    notesList.appendChild(li);
  });
}

// Add Note Handler
noteForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const textValue = noteInput.value.trim();
  const categoryValue = noteCategory.value;

  // Temporary guard until Task 4
  if (!textValue) return;

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