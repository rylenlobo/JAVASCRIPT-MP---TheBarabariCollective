// ====================================================
// DOM MANIPULATION MODULE
// ====================================================
// This file demonstrates DOM manipulation using modern JS techniques

// Renders a collection of movies to the specified container
// CONCEPTS DEMONSTRATED:
// - Arrow functions: concise syntax for function expressions
// - Object destructuring: extracts movie properties directly in the forEach
// - Template literals: for creating HTML with embedded expressions
// - Optional chaining/nullish checks: validates input before processing
export const renderMovies = (movies, containerElement) => {
  if (!containerElement) {
    console.error("Container element not found for rendering movies.");
    return;
  }

  containerElement.innerHTML = ""; // Clear previous content

  if (!movies || movies.length === 0) {
    const emptyState = document.createElement("div");
    emptyState.className = "empty-state";
    // Template literals: multi-line strings with embedded expressions
    emptyState.innerHTML = `
      <h3>No movies found</h3>
      <p>Try adding a new movie or changing your filters.</p>
    `;
    containerElement.appendChild(emptyState);
    return;
  }

  // Create movie cards for each movie
  // CONCEPTS: Array method (forEach) with destructuring
  movies.forEach(({ title, genre, year, rating }) => {
    // Create movie card element
    const movieCard = document.createElement("div");
    movieCard.className = "movie-card";

    // Block scoping with let - appropriate for variables that change
    let ratingClass = "";
    if (rating >= 8) {
      ratingClass = "high-rating";
    } else if (rating >= 6) {
      ratingClass = "medium-rating";
    } else {
      ratingClass = "low-rating";
    }

    // Template literals: clean multiline HTML with embedded expressions
    movieCard.innerHTML = `
      <div class="movie-rating ${ratingClass}">${rating}</div>
      <div class="movie-info">
        <div class="movie-title">${title}</div>
        <div class="movie-meta">${year}</div>
        <span class="movie-genre">${genre}</span>
      </div>
    `;

    containerElement.appendChild(movieCard);
  });
};

// Shows a notification message to the user
// CONCEPTS DEMONSTRATED:
// - Arrow functions: concise syntax
// - Default parameters: duration parameter defaults to 3000ms
// - DOM manipulation with modern JS
export const showNotification = (message, duration = 3000) => {
  const notification = document.getElementById("notification");
  notification.textContent = message;
  notification.classList.add("show");

  // Arrow function in setTimeout callback
  setTimeout(() => {
    notification.classList.remove("show");
  }, duration);
};
