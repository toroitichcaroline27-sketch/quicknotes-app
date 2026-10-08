// DOM Element Selection
const noteForm = document.querySelector('#note-form');
const noteInput = document.querySelector('#note-input');
const noteCategory = document.querySelector('#note-category');
const searchInput = document.querySelector('#search-input');
const notesList = document.querySelector('#notes-list');
const noteCount = document.querySelector('#note-count');
const errorMessage = document.querySelector('#error-message');
const clearAllBtn = document.querySelector('#clear-all-btn');

// Load initial notes array from localStorage
let notes = JSON.parse(localStorage.getItem('quicknotes_data')) || [];

// Save notes to localStorage
function saveNotes() {
  localStorage.setItem('quicknotes_data', JSON.stringify(notes));
}

// Dynamic Counter Update
function updateNoteCount(displayCount = notes.length) {
  if (displayCount === 0) {
    noteCount.textContent = 'You have no notes yet.';
  } else if (displayCount === 1) {
    noteCount.textContent = 'You have 1 note.';
  } else {
    noteCount.textContent = `You have ${displayCount} notes.`;
  }
}

// Single Note Removal
function deleteNote(id) {
  notes = notes.filter((note) => note.id !== id);
  saveNotes();
  render();
}

// Main Render Function
function render() {
  notesList.textContent = '';
  const query = searchInput.value.trim().toLowerCase();

  // Filter notes based on search query
  const filteredNotes = notes.filter((note) =>
    note.text.toLowerCase().includes(query)
  );

  updateNoteCount(filteredNotes.length);

  // Handle empty search results
  if (filteredNotes.length === 0 && query !== '') {
    const noResultItem = document.createElement('li');
    noResultItem.className = 'empty-search-msg';
    noResultItem.textContent = 'No notes match your search.';
    notesList.appendChild(noResultItem);
    return;
  }

  // Render cards
  filteredNotes.forEach((note) => {
    const li = document.createElement('li');
    li.className = `note-card category-${note.category.toLowerCase()}`;

    // Top Bar (Category Tag)
    const topBar = document.createElement('div');
    topBar.className = 'note-top-bar';

    const categoryTag = document.createElement('span');
    categoryTag.className = 'note-tag';
    categoryTag.textContent = note.category;
    topBar.appendChild(categoryTag);

    // Note Text (textContent prevents XSS)
    const bodyText = document.createElement('p');
    bodyText.className = 'note-body';
    bodyText.textContent = note.text;

    // Bottom Bar (Timestamp & Action)
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

  // Input Validation
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
  saveNotes();
  render();

  noteInput.value = '';
});

// Search Input Listener
searchInput.addEventListener('input', render);

// Bonus: Clear All Notes
if (clearAllBtn) {
  clearAllBtn.addEventListener('click', () => {
    if (notes.length === 0) return;

    if (confirm('Delete all notes?')) {
      notes = [];
      saveNotes();
      render();
    }
  });
}

// Initial render on load
render();