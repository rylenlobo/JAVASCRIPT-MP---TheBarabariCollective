// Imports
import {
  fetchProductsFromAPI,
  fetchCategoriesFromAPI,
  PRODUCT_LIMIT
} from "./modules/api.js";
import {
  renderProducts,
  showNotification,
  toggleLoadingIndicator,
  updateActiveFilters
} from "./modules/ui.js";
import { debounce } from "./modules/utils.js";

// DOM Elements
const productListElement = document.getElementById("product-list");
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const categorySelect = document.getElementById("category-select");
const sortSelect = document.getElementById("sort-select");
const loadingIndicator = document.getElementById("loading-indicator");
const noResultsElement = document.getElementById("no-results");
const activeFiltersElement = document.getElementById("active-filters");

// State
let currentPage = 0;
let currentSearch = "";
let currentCategory = "";
let currentSort = "";
let isLoading = false;
let hasMore = true;
let allProducts = [];

// --- Initialization ---
document.addEventListener("DOMContentLoaded", initializeApp);

/**
 * Initializes the application.
 * Populates categories, sets up event listeners, fetches initial products, and updates active filters.
 */
async function initializeApp() {
  await populateCategories();
  setupEventListeners();
  await fetchAndRenderProducts(true);
  updateActiveFiltersUI();
}

// --- Data Fetching and Rendering ---
/**
 * Fetches products from the API and renders them.
 * Handles loading states, pagination, and errors.
 * isNewQuery - True for a new search/filter, false for loading more.
 */
async function fetchAndRenderProducts(isNewQuery = false) {
  if (isLoading) return;

  isLoading = true;
  toggleLoadingIndicator(loadingIndicator, true);

  if (isNewQuery) {
    currentPage = 0;
    allProducts = [];
    productListElement.innerHTML = "";
    noResultsElement.classList.add("hidden");
    hasMore = true;
  }

  try {
    const data = await fetchProductsFromAPI(
      currentPage,
      currentSearch,
      currentCategory,
      currentSort
    );

    if (data.products && data.products.length > 0) {
      renderProducts(data.products, productListElement);
      allProducts = allProducts.concat(data.products);
      currentPage++;

      hasMore =
        data.products.length === PRODUCT_LIMIT &&
        allProducts.length < data.total;

      if (!hasMore && allProducts.length > 0) {
        // Check if allProducts has items before showing "All products loaded"
        showNotification("All products loaded.", "success");
      }
    } else {
      hasMore = false;
      if (allProducts.length === 0) {
        noResultsElement.classList.remove("hidden");
      }
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    showNotification(
      "Failed to fetch products. Please try again later.",
      "error"
    );
    hasMore = false;
  } finally {
    isLoading = false;
    toggleLoadingIndicator(loadingIndicator, false);
  }
}

/**
 * Fetches and populates product categories in the dropdown.
 */
async function populateCategories() {
  try {
    const categories = await fetchCategoriesFromAPI();
    categories.forEach((category) => {
      const option = document.createElement("option");
      option.value = category.slug || category;
      option.textContent = category.name || category;
      categorySelect.appendChild(option);
    });
    // No need to restore category from preferences as it's not stored anymore
    // if (currentCategory) {
    //   categorySelect.value = currentCategory;
    // }
  } catch (error) {
    console.error("Error fetching categories:", error);
    showNotification("Failed to load categories.", "error");
  }
}

// --- Event Listeners ---
/**
 * Sets up event listeners for user interactions.
 */
function setupEventListeners() {
  searchButton.addEventListener("click", handleSearch);
  searchInput.addEventListener("keyup", debounce(handleSearch, 500));
  categorySelect.addEventListener("change", handleCategoryChange);
  sortSelect.addEventListener("change", handleSortChange);

  // Infinite scroll
  window.addEventListener("scroll", () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
      !isLoading &&
      hasMore
    ) {
      fetchAndRenderProducts();
    }
  });
}

// --- Event Handlers ---

/**
 * Handles search interaction.
 */
function handleSearch() {
  currentSearch = searchInput.value.trim();
  fetchAndRenderProducts(true);
  updateActiveFiltersUI();
}

/**
 * Handles category selection changes.
 */
function handleCategoryChange() {
  currentCategory = categorySelect.value;
  fetchAndRenderProducts(true);
  updateActiveFiltersUI();
}

/**
 * Handles sort option changes.
 */
function handleSortChange() {
  currentSort = sortSelect.value;
  fetchAndRenderProducts(true);
  updateActiveFiltersUI();
}

// --- UI Updates ---
/**
 * Updates the display of active filter pills.
 */
function updateActiveFiltersUI() {
  updateActiveFilters(
    activeFiltersElement,
    searchInput,
    categorySelect,
    sortSelect,
    resetAndFetchProducts // Pass the callback function to allow pills to reset filters.
  );
}

/**
 * Resets a filter and re-fetches products.
 * filterType - 'search', 'category', or 'sort'.
 */
function resetAndFetchProducts(filterType) {
  // Demonstrates: Conditional logic with if/else if.
  if (filterType === "search") {
    searchInput.value = ""; // Clear input field.
    currentSearch = ""; // Reset state.
  } else if (filterType === "category") {
    categorySelect.value = ""; // Reset dropdown.
    currentCategory = ""; // Reset state.
  } else if (filterType === "sort") {
    sortSelect.value = ""; // Reset dropdown.
    currentSort = ""; // Reset state.
  }
  fetchAndRenderProducts(true); // Re-fetch with the cleared filter.
  updateActiveFiltersUI(); // Update the pill display.
}

// --- Concepts Covered & React Relevance ---
// This section can be kept if it's for educational purposes, or removed if not needed.
// Fetch API: Used in `api.js` to get data from 'dummyjson.com'. Core for web apps.
// JSON.parse / JSON.stringify: Previously in `storage.js`, implicit in Fetch.
// Array methods:
//   - `forEach`: Used in `populateCategories` and `ui.js`'s `renderProducts`.
//   - `concat`: Used in `fetchAndRenderProducts`.
//   - `map` (conceptual).
//   - `filter` (conceptual).
//   - `find` (conceptual).
// Ternary operator: Useful for conditional rendering/logic.
// Optional chaining (`?.`): For safe property access (e.g., `product?.thumbnail`).
