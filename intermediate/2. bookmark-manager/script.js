// Using Object.freeze() for immutable default settings
const DEFAULT_SETTINGS = Object.freeze({
  storageKey: "bookmarksData",
  categories: ["Work", "Study", "Entertainment"],
  defaultCategory: "Work"
});

// State variables
let bookmarks = [];
let currentFilter = "All";

// DOM elements
const form = document.getElementById("bookmarkForm");
const bookmarksList = document.getElementById("bookmarksList");
const filterButtons = document.querySelectorAll(".filter-btn");

// Function to load bookmarks from localStorage
function loadBookmarks() {
  const storedBookmarks = localStorage.getItem(DEFAULT_SETTINGS.storageKey);
  bookmarks = storedBookmarks ? JSON.parse(storedBookmarks) : [];
}

// Function to save bookmarks to localStorage
function saveBookmarks() {
  localStorage.setItem(DEFAULT_SETTINGS.storageKey, JSON.stringify(bookmarks));
}

// Function to filter bookmarks by category
function filterBookmarks(categoryFilter) {
  // Return all bookmarks if "All" is selected
  if (categoryFilter === "All") {
    return bookmarks;
  }

  // Manual filtering using a for loop
  const result = [];
  for (let i = 0; i < bookmarks.length; i++) {
    if (bookmarks[i].category === categoryFilter) {
      result.push(bookmarks[i]);
    }
  }
  return result;
}

// Function to delete a bookmark by ID
function deleteBookmark(id) {
  bookmarks = bookmarks.filter((bookmark) => bookmark.id !== id);
  saveBookmarks();
  renderBookmarks();
}

// Function to render bookmarks to the DOM
function renderBookmarks() {
  // Clear current list
  bookmarksList.innerHTML = "";

  // Filter bookmarks based on selected category
  const filteredBookmarks = filterBookmarks(currentFilter);

  // Check if we have bookmarks
  if (filteredBookmarks.length === 0) {
    bookmarksList.innerHTML = "<p>No bookmarks found.</p>";
    return;
  }

  // Render each bookmark
  filteredBookmarks.forEach((bookmark) => {
    const { id, title, url, category } = bookmark;

    const bookmarkElement = document.createElement("div");
    bookmarkElement.classList.add("bookmark-item");
    bookmarkElement.innerHTML = `
            <div class="bookmark-info">
                <h3>${title}</h3>
                <a href="${url}" class="bookmark-link" target="_blank">${url}</a>
                <div class="bookmark-category">${category}</div>
            </div>
            <button class="delete-btn" data-id="${id}">Delete</button>
        `;

    // Add delete event listener
    const deleteButton = bookmarkElement.querySelector(".delete-btn");
    deleteButton.addEventListener("click", () => deleteBookmark(id));

    bookmarksList.appendChild(bookmarkElement);
  });
}

// Function to add a new bookmark
function addBookmark(e) {
  e.preventDefault();

  // Get form values
  const websiteTitle = document.getElementById("websiteTitle").value;
  const websiteUrl = document.getElementById("websiteUrl").value;
  const category = document.getElementById("category").value;

  // Create new bookmark object
  const newBookmark = {
    id: Date.now(),
    title: websiteTitle,
    url: websiteUrl,
    category
  };

  // Add to bookmarks array
  bookmarks.push(newBookmark);

  // Save to localStorage
  saveBookmarks();

  // Reset form
  form.reset();

  // Re-render bookmarks
  renderBookmarks();
}

// Initialize the app
function init() {
  // Load bookmarks from localStorage
  loadBookmarks();

  // Render bookmarks
  renderBookmarks();

  // Set up event listeners
  form.addEventListener("submit", addBookmark);

  // Set up filter buttons
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Update active class
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      // Set current filter and re-render
      currentFilter = button.dataset.category;
      renderBookmarks();
    });
  });
}

// Initialize the app when DOM is fully loaded
document.addEventListener("DOMContentLoaded", init);
