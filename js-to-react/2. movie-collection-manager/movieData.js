// ====================================================
// MOVIE DATA MODULE
// ====================================================
// This file demonstrates ES6 modules by exporting initial movie data

// Initial movies array with sample data
// CONCEPTS DEMONSTRATED:
// - ES6 Modules: exported constant for use in other modules
// - const: using constant for an array that shouldn't be reassigned
// - Array of objects: structured data model
export const movies = [
  { title: "Inception", genre: "Sci-Fi", year: 2010, rating: 8.8 },
  { title: "The Matrix", genre: "Sci-Fi", year: 1999, rating: 8.7 },
  {
    title: "The Shawshank Redemption",
    genre: "Drama",
    year: 1994,
    rating: 9.3
  },
  { title: "Pulp Fiction", genre: "Crime", year: 1994, rating: 8.9 }
];
