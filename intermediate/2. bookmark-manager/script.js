// Using Object.freeze() for immutable default settings
const DEFAULT_SETTINGS = Object.freeze({
  storageKey: "bookmarksData",
  categories: ["Work", "Study", "Entertainment"],
  defaultCategory: "Work"
});

// State variables
let bookmarks = []; // Array to hold bookmark objects
let currentFilter = "All"; // String to hold the current category filter

// DOM elements
const form = document.getElementById("bookmarkForm"); // The form element for adding bookmarks
const bookmarksList = document.getElementById("bookmarksList"); // The container element where bookmarks are displayed
const filterButtons = document.querySelectorAll(".filter-btn"); // NodeList of all filter buttons

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
  // Filter out the bookmark with the matching ID
  bookmarks = bookmarks.filter((bookmark) => bookmark.id !== id);
  // Save the updated list to localStorage
  saveBookmarks();
  // Re-render the bookmarks list
  renderBookmarks();
}

// Function to render bookmarks to the DOM
function renderBookmarks() {
  // Clear current list
  bookmarksList.innerHTML = "";

  // Filter bookmarks based on selected category
  const filteredBookmarks = filterBookmarks(currentFilter);

  // Check if we have bookmarks to display
  if (filteredBookmarks.length === 0) {
    bookmarksList.innerHTML = "<p>No bookmarks found.</p>";
    return;
  }

  // Render each bookmark
  filteredBookmarks.forEach((bookmark) => {
    const { id, title, url, category } = bookmark;

    // Create a new div element for the bookmark
    const bookmarkElement = document.createElement("div");
    bookmarkElement.classList.add("bookmark-item");
    // Set the inner HTML of the bookmark element
    bookmarkElement.innerHTML = `
            <div class="bookmark-info">
                <h3>${title}</h3>
                <a href="${url}" class="bookmark-link" target="_blank">${url}</a>
                <div class="bookmark-category">${category}</div>
            </div>
            <button class="delete-btn" data-id="${id}">Delete</button>
        `;

    // Add delete event listener to the delete button
    const deleteButton = bookmarkElement.querySelector(".delete-btn");
    deleteButton.addEventListener("click", () => deleteBookmark(id));

    // Append the new bookmark element to the list container
    bookmarksList.appendChild(bookmarkElement);
  });
}

// Function to add a new bookmark
function addBookmark(e) {
  // Prevent the default form submission behavior
  e.preventDefault();

  // Get form values from input fields
  const websiteTitle = document.getElementById("websiteTitle").value;
  const websiteUrl = document.getElementById("websiteUrl").value;
  const category = document.getElementById("category").value;

  // Create new bookmark object with a unique ID based on timestamp
  const newBookmark = {
    id: Date.now(),
    title: websiteTitle,
    url: websiteUrl,
    category
  };

  // Add the new bookmark to the bookmarks array
  bookmarks.push(newBookmark);

  // Save the updated bookmarks array to localStorage
  saveBookmarks();

  // Reset the form fields
  form.reset();

  // Re-render the bookmarks list to include the new bookmark
  renderBookmarks();
}

// Initialize the application
function init() {
  // Load existing bookmarks from localStorage
  loadBookmarks();

  // Render the loaded bookmarks to the page
  renderBookmarks();

  // Set up event listener for the form submission
  form.addEventListener("submit", addBookmark);

  // Set up event listeners for filter buttons
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Update active class on filter buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      // Set current filter based on the clicked button's data attribute
      currentFilter = button.dataset.category;
      // Re-render the bookmarks list with the new filter applied
      renderBookmarks();
    });
  });
}

// Initialize the app when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", init);
