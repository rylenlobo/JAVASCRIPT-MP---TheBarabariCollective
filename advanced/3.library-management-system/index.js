// Book class definition - represents a physical book
class Book {
  // Constructor for creating a new Book instance
  constructor(title, author) {
    this.title = title; // Book title
    this.author = author; // Book author
    // Generate a unique ID for the book using slice instead of deprecated substr
    this.id = Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
    this.isAvailable = true; // Availability status
    this.borrower = null; // Name of the borrower, null if available
    this.type = "physical"; // Type identifier
  }

  // Method to get basic book details
  getDetails() {
    return `${this.title} by ${this.author}`;
  }

  // Method to borrow the book
  borrow(borrower) {
    // Cannot borrow if already borrowed
    if (!this.isAvailable) return false;

    this.isAvailable = false; // Mark as unavailable
    this.borrower = borrower; // Record the borrower
    return true; // Indicate successful borrowing
  }

  // Method to return the book
  return() {
    // Cannot return if already available
    if (this.isAvailable) return false;

    this.isAvailable = true; // Mark as available
    this.borrower = null; // Clear the borrower
    return true; // Indicate successful return
  }

  // Method to generate HTML representation of the book card
  getHtml() {
    // Determine CSS class based on availability
    const statusClass = this.isAvailable ? "" : "borrowed";

    // Return HTML string for the book card
    return `
      <div class="book-card ${statusClass}" data-id="${this.id}">
        <h3 class="book-title">${this.title}</h3>
        <div class="book-meta">Author: ${this.author}</div>
        <div class="book-meta">
          Status: ${
            // Display status and borrower if applicable
            this.isAvailable ? "Available" : `Borrowed by ${this.borrower}`
          }
        </div>
        <div class="book-actions">
          ${
            // Conditionally render Borrow or Return button
            this.isAvailable
              ? '<button class="btn btn-borrow">Borrow</button>'
              : '<button class="btn btn-return">Return</button>'
          }
          <button class="btn btn-remove">Remove</button> <!-- Remove button -->
        </div>
      </div>
    `;
  }
}

// EBook class that extends Book - represents an electronic book
class EBook extends Book {
  // Constructor for creating a new EBook instance
  constructor(title, author, fileSize) {
    super(title, author); // Call the parent class constructor
    this.fileSize = fileSize; // File size specific to EBooks
    this.type = "ebook"; // Type identifier
  }

  // Override getDetails to include file size
  getDetails() {
    return `${super.getDetails()} | E-Book (${this.fileSize} MB)`;
  }

  // Override borrow method for e-book behavior (can be borrowed multiple times)
  borrow(borrower) {
    // E-books can be "borrowed" (downloaded) but remain available conceptually
    this.borrower = borrower; // Record the downloader
    // We don't change isAvailable for ebooks as they can be downloaded by multiple users
    return true; // Indicate successful download
  }

  // Override return method for e-books (clears the last downloader)
  return() {
    // Cannot return if not currently "borrowed" (downloaded)
    if (!this.borrower) return false;

    this.borrower = null; // Clear the borrower/downloader
    return true; // Indicate successful return/clearing
  }

  // Override getHtml to generate HTML for an EBook card
  getHtml() {
    // Return HTML string for the EBook card
    return `
      <div class="book-card ebook" data-id="${this.id}">
        <h3 class="book-title">${this.title}</h3>
        <div class="book-meta">Author: ${this.author}</div>
        <div class="book-meta">File Size: ${this.fileSize} MB</div>
        <div class="book-meta">
          Status: ${
            // Display status based on whether it's downloaded
            !this.borrower ? "Available" : `Downloaded by ${this.borrower}`
          }
        </div>
        <div class="book-actions">
          ${
            // Conditionally render Download or Return button
            !this.borrower
              ? '<button class="btn btn-borrow">Download</button>'
              : '<button class="btn btn-return">Return</button>'
          }
          <button class="btn btn-remove">Remove</button> <!-- Remove button -->
        </div>
      </div>
    `;
  }
}

// Library class to manage the collection of books
class Library {
  // Constructor for creating a new Library instance
  constructor() {
    this.books = []; // Array to hold book objects
    this.loadBooks(); // Load books from localStorage on initialization

    // If no books were loaded (e.g., first time use), add default books
    if (this.books.length === 0) {
      this.addDefaultBooks();
    }
  }

  // Method to add default physical and e-books to the library
  addDefaultBooks() {
    // Add some physical books
    const defaultBooks = [
      new Book("To Kill a Mockingbird", "Harper Lee"),
      new Book("1984", "George Orwell"),
      new Book("The Great Gatsby", "F. Scott Fitzgerald"),
      new Book("Pride and Prejudice", "Jane Austen")
    ];

    // Add some e-books
    const defaultEbooks = [
      new EBook("The Digital Age", "Mark Stevenson", 3.5),
      new EBook("Programming Basics", "John Smith", 8.2),
      new EBook("Artificial Intelligence", "Alan Turing", 5.7)
    ];

    // Add all default books to the library's book array
    [...defaultBooks, ...defaultEbooks].forEach((book) => {
      this.books.push(book);
    });

    // Save the updated book list to localStorage
    this.saveBooks();
  }

  // Method to add a new book to the library
  addBook(book) {
    this.books.push(book); // Add the book object to the array
    this.saveBooks(); // Save the updated list to localStorage
    this.displayBooks(); // Refresh the displayed book list
  }

  // Method to remove a book from the library by its ID
  removeBook(id) {
    // Filter out the book with the matching ID
    this.books = this.books.filter((book) => book.id !== id);
    this.saveBooks(); // Save the updated list
    this.displayBooks(); // Refresh the display
  }

  // Method to find a book by its ID
  getBookById(id) {
    return this.books.find((book) => book.id === id);
  }

  // Method to handle borrowing a book
  borrowBook(id, borrower) {
    const book = this.getBookById(id); // Find the book
    // If the book exists and the borrow operation is successful (using optional chaining)
    if (book?.borrow(borrower)) {
      this.saveBooks(); // Save the changes
      this.displayBooks(); // Refresh the display
    }
  }

  // Method to handle returning a book
  returnBook(id) {
    const book = this.getBookById(id); // Find the book
    // If the book exists and the return operation is successful (using optional chaining)
    if (book?.return()) {
      this.saveBooks(); // Save the changes
      this.displayBooks(); // Refresh the display
    }
  }

  // Method to save the current list of books to localStorage
  saveBooks() {
    // Convert the books array to a JSON string and store it
    localStorage.setItem("books", JSON.stringify(this.books));
  }

  // Method to load books from localStorage
  loadBooks() {
    const savedBooks = localStorage.getItem("books"); // Retrieve saved books string
    if (savedBooks) {
      const bookObjects = JSON.parse(savedBooks); // Parse the JSON string
      // Re-instantiate Book or EBook objects from the plain objects
      this.books = bookObjects.map((obj) => {
        if (obj.type === "ebook") {
          // Create EBook instance
          const ebook = new EBook(obj.title, obj.author, obj.fileSize);
          // Restore properties
          ebook.id = obj.id;
          ebook.isAvailable = obj.isAvailable;
          ebook.borrower = obj.borrower;
          return ebook;
        } else {
          // Create Book instance
          const book = new Book(obj.title, obj.author);
          // Restore properties
          book.id = obj.id;
          book.isAvailable = obj.isAvailable;
          book.borrower = obj.borrower;
          return book;
        }
      });
    }
  }

  // Method to display all books in the HTML
  displayBooks() {
    // Get the container element for the book list
    const bookList = document.getElementById("book-list");
    bookList.innerHTML = ""; // Clear the current list

    // Display a message if the library is empty
    if (this.books.length === 0) {
      bookList.innerHTML = "<p>No books in the library.</p>";
      return;
    }

    // Generate and append HTML for each book
    this.books.forEach((book) => {
      bookList.innerHTML += book.getHtml();
    });

    // Add event listeners to all borrow/download buttons
    document.querySelectorAll(".btn-borrow").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        // Get the book ID from the parent card's data attribute
        const bookId = e.target.closest(".book-card").dataset.id;
        const borrower = prompt("Enter your name:"); // Prompt for borrower name
        if (borrower) {
          this.borrowBook(bookId, borrower); // Call borrow method
        }
      });
    });

    // Add event listeners to all return buttons
    document.querySelectorAll(".btn-return").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        // Get the book ID from the parent card's data attribute
        const bookId = e.target.closest(".book-card").dataset.id;
        this.returnBook(bookId); // Call return method
      });
    });

    // Add event listeners to all remove buttons
    document.querySelectorAll(".btn-remove").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        // Get the book ID from the parent card's data attribute
        const bookId = e.target.closest(".book-card").dataset.id;
        // Confirm removal with the user
        const confirmRemove = confirm(
          "Are you sure you want to remove this book?"
        );
        if (confirmRemove) {
          this.removeBook(bookId); // Call remove method
        }
      });
    });
  }
}

// Initialize app logic when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Create a new Library instance
  const library = new Library();
  // Get references to DOM elements
  const bookForm = document.getElementById("book-form"); // The add book form
  const typeSelect = document.getElementById("type"); // Book type dropdown
  const ebookDetails = document.getElementById("ebook-details"); // Ebook specific input section
  const toggleFormBtn = document.getElementById("toggle-form"); // Button to show/hide the form
  const addBookSection = document.querySelector(".add-book-section"); // The section containing the form

  // Event listener for the toggle form button
  toggleFormBtn.addEventListener("click", () => {
    // Check current display state and toggle it
    if (addBookSection.style.display === "none") {
      addBookSection.style.display = "block"; // Show the form
      toggleFormBtn.textContent = "Hide Form"; // Update button text
    } else {
      addBookSection.style.display = "none"; // Hide the form
      toggleFormBtn.textContent = "Add New Book"; // Update button text
    }
  });

  // Event listener for the book type dropdown
  typeSelect.addEventListener("change", () => {
    // Show or hide the file size input based on selected type
    ebookDetails.style.display =
      typeSelect.value === "ebook" ? "block" : "none";
  });

  // Event listener for the add book form submission
  bookForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Get values from form inputs
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const type = typeSelect.value;

    let book; // Variable to hold the new book instance
    // Create either an EBook or a Book instance based on the selected type
    if (type === "ebook") {
      const fileSize = document.getElementById("fileSize").value;
      book = new EBook(title, author, fileSize);
    } else {
      book = new Book(title, author);
    }

    library.addBook(book); // Add the created book to the library

    // Reset the form fields
    bookForm.reset();
    ebookDetails.style.display = "none"; // Hide ebook details again

    // Optionally hide the form after adding a book (currently commented out)
    // addBookSection.style.display = "none";
    // toggleFormBtn.textContent = "Add New Book";
  });

  // Initial display of books when the page loads
  library.displayBooks();
});
