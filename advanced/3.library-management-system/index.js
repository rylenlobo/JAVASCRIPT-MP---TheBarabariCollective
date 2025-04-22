// Book class definition - simpler version
class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
    this.id = Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
    this.isAvailable = true;
    this.borrower = null;
    this.type = "physical";
  }

  getDetails() {
    return `${this.title} by ${this.author}`;
  }

  borrow(borrower) {
    if (!this.isAvailable) return false;

    this.isAvailable = false;
    this.borrower = borrower;
    return true;
  }

  return() {
    if (this.isAvailable) return false;

    this.isAvailable = true;
    this.borrower = null;
    return true;
  }

  getHtml() {
    const statusClass = this.isAvailable ? "" : "borrowed";

    return `
      <div class="book-card ${statusClass}" data-id="${this.id}">
        <h3 class="book-title">${this.title}</h3>
        <div class="book-meta">Author: ${this.author}</div>
        <div class="book-meta">
          Status: ${
            this.isAvailable ? "Available" : `Borrowed by ${this.borrower}`
          }
        </div>
        <div class="book-actions">
          ${
            this.isAvailable
              ? '<button class="btn btn-borrow">Borrow</button>'
              : '<button class="btn btn-return">Return</button>'
          }
          <button class="btn btn-remove">Remove</button>
        </div>
      </div>
    `;
  }
}

// EBook class that extends Book
class EBook extends Book {
  constructor(title, author, fileSize) {
    super(title, author);
    this.fileSize = fileSize;
    this.type = "ebook";
  }

  getDetails() {
    return `${super.getDetails()} | E-Book (${this.fileSize} MB)`;
  }

  // Override borrow method to reflect e-book behavior
  borrow(borrower) {
    // E-books can be borrowed but remain available for others
    this.borrower = borrower;
    // We don't change isAvailable for ebooks
    return true;
  }

  // Override return method for e-books
  return() {
    if (!this.borrower) return false;

    this.borrower = null;
    return true;
  }

  getHtml() {
    return `
      <div class="book-card ebook" data-id="${this.id}">
        <h3 class="book-title">${this.title}</h3>
        <div class="book-meta">Author: ${this.author}</div>
        <div class="book-meta">File Size: ${this.fileSize} MB</div>
        <div class="book-meta">
          Status: ${
            !this.borrower ? "Available" : `Downloaded by ${this.borrower}`
          }
        </div>
        <div class="book-actions">
          ${
            !this.borrower
              ? '<button class="btn btn-borrow">Download</button>'
              : '<button class="btn btn-return">Return</button>'
          }
          <button class="btn btn-remove">Remove</button>
        </div>
      </div>
    `;
  }
}

// Library management
class Library {
  constructor() {
    this.books = [];
    this.loadBooks();

    // If no books were loaded, add default books
    if (this.books.length === 0) {
      this.addDefaultBooks();
    }
  }

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

    // Add all default books to the library
    [...defaultBooks, ...defaultEbooks].forEach((book) => {
      this.books.push(book);
    });

    // Save to localStorage
    this.saveBooks();
  }

  addBook(book) {
    this.books.push(book);
    this.saveBooks();
    this.displayBooks();
  }

  removeBook(id) {
    this.books = this.books.filter((book) => book.id !== id);
    this.saveBooks();
    this.displayBooks();
  }

  getBookById(id) {
    return this.books.find((book) => book.id === id);
  }

  borrowBook(id, borrower) {
    const book = this.getBookById(id);
    if (book && book.borrow(borrower)) {
      this.saveBooks();
      this.displayBooks();
    }
  }

  returnBook(id) {
    const book = this.getBookById(id);
    if (book && book.return()) {
      this.saveBooks();
      this.displayBooks();
    }
  }

  saveBooks() {
    localStorage.setItem("books", JSON.stringify(this.books));
  }

  loadBooks() {
    const savedBooks = localStorage.getItem("books");
    if (savedBooks) {
      const bookObjects = JSON.parse(savedBooks);
      this.books = bookObjects.map((obj) => {
        if (obj.type === "ebook") {
          const ebook = new EBook(obj.title, obj.author, obj.fileSize);
          ebook.id = obj.id;
          ebook.isAvailable = obj.isAvailable;
          ebook.borrower = obj.borrower;
          return ebook;
        } else {
          const book = new Book(obj.title, obj.author);
          book.id = obj.id;
          book.isAvailable = obj.isAvailable;
          book.borrower = obj.borrower;
          return book;
        }
      });
    }
  }

  displayBooks() {
    const bookList = document.getElementById("book-list");
    bookList.innerHTML = "";

    if (this.books.length === 0) {
      bookList.innerHTML = "<p>No books in the library.</p>";
      return;
    }

    this.books.forEach((book) => {
      bookList.innerHTML += book.getHtml();
    });

    // Add event listeners to book action buttons
    document.querySelectorAll(".btn-borrow").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const bookId = e.target.closest(".book-card").dataset.id;
        const borrower = prompt("Enter your name:");
        if (borrower) {
          this.borrowBook(bookId, borrower);
        }
      });
    });

    document.querySelectorAll(".btn-return").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const bookId = e.target.closest(".book-card").dataset.id;
        this.returnBook(bookId);
      });
    });

    document.querySelectorAll(".btn-remove").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const bookId = e.target.closest(".book-card").dataset.id;
        const confirmRemove = confirm(
          "Are you sure you want to remove this book?"
        );
        if (confirmRemove) {
          this.removeBook(bookId);
        }
      });
    });
  }
}

// Initialize app
document.addEventListener("DOMContentLoaded", () => {
  const library = new Library();
  const bookForm = document.getElementById("book-form");
  const typeSelect = document.getElementById("type");
  const ebookDetails = document.getElementById("ebook-details");
  const toggleFormBtn = document.getElementById("toggle-form");
  const addBookSection = document.querySelector(".add-book-section");

  // Toggle the add book form display
  toggleFormBtn.addEventListener("click", () => {
    if (addBookSection.style.display === "none") {
      addBookSection.style.display = "block";
      toggleFormBtn.textContent = "Hide Form";
    } else {
      addBookSection.style.display = "none";
      toggleFormBtn.textContent = "Add New Book";
    }
  });

  // Show/hide ebook details based on type selection
  typeSelect.addEventListener("change", () => {
    ebookDetails.style.display =
      typeSelect.value === "ebook" ? "block" : "none";
  });

  // Handle form submission
  bookForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const type = typeSelect.value;

    let book;
    if (type === "ebook") {
      const fileSize = document.getElementById("fileSize").value;
      book = new EBook(title, author, fileSize);
    } else {
      book = new Book(title, author);
    }

    library.addBook(book);

    // Reset form
    bookForm.reset();
    ebookDetails.style.display = "none";

    // Optionally hide the form after adding a book
    // addBookSection.style.display = "none";
    // toggleFormBtn.textContent = "Add New Book";
  });

  // Initial display of books
  library.displayBooks();
});
