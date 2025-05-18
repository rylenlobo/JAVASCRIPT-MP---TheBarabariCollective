// ====================================================
// MAIN APPLICATION MODULE
// ====================================================
// This file demonstrates ES6 modules (import/export), let/const usage,
// arrow functions, and other modern JavaScript features

// Import modules - ES6 Module System
// CONCEPT: ES6 Modules (import/export)
import { movies } from "./movieData.js";
import {
  addMovie,
  filterByGenre,
  filterByRating,
  sortByYear,
  sortByTitle,
  sortByRatingDescending
} from "./utils.js";
import { renderMovies, showNotification } from "./dom.js";

// State management - our single source of truth for the app
// CONCEPT: let/const for block scoping, spread operator
let movieCollection = [...movies]; // Use spread to create a copy of the initial movies

// Common movie genres for datalist
// CONCEPT: const for unchanging data
const movieGenres = [
  "Action",
  "Adventure",
  "Animation",
  "Biography",
  "Comedy",
  "Crime",
  "Documentary",
  "Drama",
  "Family",
  "Fantasy",
  "Film-Noir",
  "History",
  "Horror",
  "Music",
  "Musical",
  "Mystery",
  "Romance",
  "Sci-Fi",
  "Sport",
  "Thriller",
  "War",
  "Western"
];

// DOM elements
// CONCEPT: const for references that don't change
const movieListDiv = document.getElementById("movie-list");
const addMovieForm = document.getElementById("add-movie-form");
const filterGenreInput = document.getElementById("filter-genre");
const filterRatingSelect = document.getElementById("filter-rating");
const sortBySelect = document.getElementById("sort-by");
const resetFiltersBtn = document.getElementById("reset-filters");
const genreDatalist = document.getElementById("genre-list");

// Populate genre datalist
// CONCEPT: Regular function declaration syntax
function populateGenreDatalist() {
  // Clear existing options
  genreDatalist.innerHTML = "";

  // Add all common genres
  // CONCEPT: Arrow function in forEach
  movieGenres.forEach((genre) => {
    const option = document.createElement("option");
    option.value = genre;
    genreDatalist.appendChild(option);
  });

  // Also add unique genres from the existing collection
  // CONCEPT: Spread operator with Set for unique values
  // CONCEPT: Array method (map) with arrow function
  const existingGenres = [
    ...new Set(movieCollection.map((movie) => movie.genre))
  ];
  existingGenres.forEach((genre) => {
    // Only add if it's not already in the common genres
    if (!movieGenres.includes(genre) && genre !== "Unknown") {
      const option = document.createElement("option");
      option.value = genre;
      genreDatalist.appendChild(option);
    }
  });
}

// Call the function to populate the datalist
populateGenreDatalist();

// Initial display
renderMovies(movieCollection, movieListDiv);

// Add new movie form submission handler
// CONCEPT: Event listener with arrow function
addMovieForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent form from submitting normally

  // Get form values using object destructuring
  // CONCEPT: Object destructuring
  const { title, genre, year, rating } = {
    title: document.getElementById("title").value.trim(),
    genre: document.getElementById("genre").value.trim(),
    year: document.getElementById("year").value,
    rating: document.getElementById("rating").value
  };

  // Validate title is provided
  if (!title) {
    showNotification("Please enter a movie title", 3000);
    return;
  }

  // Add the new movie to our collection using the addMovie function
  // CONCEPT: Default parameter values (in addMovie function)
  // CONCEPT: Destructured object as argument
  movieCollection = addMovie(movieCollection, {
    title,
    genre: genre || "Unknown",
    year: year || new Date().getFullYear(),
    rating: rating || 5.0
  });

  // Show success notification using template literals
  // CONCEPT: Template literals
  showNotification(`🎬 Added "${title}" to your collection!`);

  // Reset the form fields
  addMovieForm.reset();

  // Re-apply current filters and sort
  applyFiltersAndSort();

  // Update the genre datalist with potential new genres
  populateGenreDatalist();
});

// Filter and sort event listeners using arrow functions
// CONCEPT: Arrow functions
filterGenreInput.addEventListener("input", () => applyFiltersAndSort());
filterRatingSelect.addEventListener("change", () => applyFiltersAndSort());
sortBySelect.addEventListener("change", () => applyFiltersAndSort());

// Reset filters button handler
// CONCEPT: Arrow function
resetFiltersBtn.addEventListener("click", () => {
  filterGenreInput.value = "";
  filterRatingSelect.value = "";
  sortBySelect.value = "title";
  applyFiltersAndSort();
  showNotification("Filters reset");
});

/**
 * Apply current filters and sort settings to the movie collection
 * This demonstrates using array methods with arrow functions
 */
function applyFiltersAndSort() {
  // Start with the full collection
  // CONCEPT: Spread operator for immutability
  let filteredMovies = [...movieCollection];

  // Apply genre filter if set using the filterByGenre utility function
  const genreFilter = filterGenreInput.value.trim();
  if (genreFilter) {
    filteredMovies = filterByGenre(filteredMovies, genreFilter);
  }

  // Apply rating filter if set using the filterByRating utility function
  const ratingFilter = filterRatingSelect.value;
  if (ratingFilter) {
    filteredMovies = filterByRating(filteredMovies, ratingFilter);
  }

  // Apply sorting based on selected option
  const sortOption = sortBySelect.value;
  switch (sortOption) {
    case "year":
      filteredMovies = sortByYear(filteredMovies);
      break;
    case "rating":
      filteredMovies = sortByRatingDescending(filteredMovies);
      break;
    case "title":
    default:
      filteredMovies = sortByTitle(filteredMovies);
      break;
  }

  // Update the movie list display with filtered and sorted results
  renderMovies(filteredMovies, movieListDiv);
}

// Add some starter movies using default parameters and object destructuring
// CONCEPT: Array of objects
const starterMovies = [
  {
    title: "The Godfather",
    genre: "Crime",
    year: 1972,
    rating: 9.2
  },
  {
    title: "Everything Everywhere All at Once",
    genre: "Sci-Fi",
    year: 2022,
    rating: 8.0
  }
];

// Add each starter movie to the collection
// CONCEPT: forEach with arrow function and destructuring
starterMovies.forEach((movie) => {
  const { title, genre, year, rating } = movie; // Destructuring
  movieCollection = addMovie(movieCollection, { title, genre, year, rating });
});

// Apply initial sort (alphabetical by default)
applyFiltersAndSort();
