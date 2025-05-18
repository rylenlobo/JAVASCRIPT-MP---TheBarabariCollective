// ====================================================
// UTILITY FUNCTIONS MODULE
// ====================================================
// This file demonstrates ES6 modules (import/export) pattern
// by exporting utility functions for the movie collection app

// Adds a new movie to the collection
// CONCEPTS DEMONSTRATED:
// - Default parameters: provides fallback values for missing properties
// - Object destructuring: extracts properties from the passed object
// - Enhanced object literals: shorthand property names (title, genre)
// - Spread operator: creates a new array with the added movie, preserving immutability
export function addMovie(
  collection,
  { title = "Untitled", genre = "Unknown", year = 2000, rating = 5.0 } = {}
) {
  const newMovie = {
    title,
    genre,
    year: parseInt(year, 10) || 2000,
    rating: parseFloat(rating) || 5.0
  }; // Ensure year is int, rating is float
  return [...collection, newMovie]; // ← using spread to keep immutability
}

// Filters movies by genre (case-insensitive)
// CONCEPTS DEMONSTRATED:
// - Arrow functions: concise syntax for function expressions
// - Array methods (filter): declarative array processing
// - Conditional (ternary) operator: compact conditional logic
export const filterByGenre = (movies, genre) => {
  if (!genre) return movies; // If no genre is provided, return all movies
  return movies.filter((movie) =>
    movie.genre.toLowerCase().includes(genre.toLowerCase())
  );
};

// Filters movies by minimum rating
// CONCEPTS DEMONSTRATED:
// - Arrow functions: concise syntax for function expressions
// - Array methods (filter): declarative array manipulation
export const filterByRating = (movies, minRating) => {
  if (!minRating) return movies; // If no rating is provided, return all movies
  return movies.filter((movie) => movie.rating >= parseFloat(minRating));
};

// Sorts movies by year (ascending)
// CONCEPTS DEMONSTRATED:
// - Arrow functions: concise one-line function
// - Spread operator: creates a new array to avoid mutating the original
// - Array methods (sort): functional programming approach to sorting
export const sortByYear = (movies) =>
  [...movies].sort((a, b) => a.year - b.year);

// Sorts movies by title alphabetically
// CONCEPTS DEMONSTRATED:
// - Arrow functions: concise one-line function
// - Spread operator: creates a new array to avoid mutating the original
// - String method (localeCompare): proper string comparison
export const sortByTitle = (movies) =>
  [...movies].sort((a, b) => a.title.localeCompare(b.title));

// Sorts movies by rating (descending)
// CONCEPTS DEMONSTRATED:
// - Arrow functions: concise one-line function
// - Spread operator: creates a new array to avoid mutating the original
export const sortByRatingDescending = (movies) =>
  [...movies].sort((a, b) => b.rating - a.rating);
