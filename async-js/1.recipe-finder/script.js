// Get DOM elements for recipes container, search input, search button, and status messages
const recipesContainer = document.getElementById("recipesContainer");
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const loadingSpinner = document.getElementById("loadingSpinner");
const loadingMessage = document.getElementById("loadingMessage"); // Text message for loading state
const errorMessage = document.getElementById("errorMessage"); // Element to display error messages

// Base URL for the recipe API
const BASE_URL = "https://dummyjson.com/recipes";

// --- Event Listeners ---

// Event listener for the search button click
searchButton.addEventListener("click", handleSearch);
// Event listener for the search input (Enter key press)
searchInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    handleSearch();
  }
});

// Event listener for when the DOM content is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize simulation controls if the function is available (from simulation.js)
  if (typeof initializeSimulationControls === "function") {
    initializeSimulationControls(
      "simulationPanel",
      "toggleSimPanelButton",
      "simulateDelayToggle",
      "delayDurationInput",
      "applySimSettingsButton",
      handleSearch // Pass handleSearch as the refetch callback
    );
  } else {
    // Log an error if simulation controls cannot be initialized
    console.error(
      "initializeSimulationControls is not defined. Ensure simulation.js is loaded before script.js."
    );
  }
  init(); // Load initial set of recipes
});

// --- UI Update Functions ---

// Function to show the loading spinner and hide content/error messages
function showLoading() {
  loadingSpinner.style.display = "block";
  loadingMessage.style.display = "none"; // Hide text message if spinner is shown
  errorMessage.style.display = "none";
  recipesContainer.style.display = "none"; // Hide recipe content area while loading
}

// Function to show an error message and hide content/spinner
function showError(message) {
  errorMessage.textContent = message;
  errorMessage.style.display = "block";
  loadingSpinner.style.display = "none";
  loadingMessage.style.display = "none";
  recipesContainer.style.display = "none"; // Hide recipe content area on error
}

// Function to hide loading spinner and error messages, and show recipe content
function hideLoadingAndError() {
  loadingSpinner.style.display = "none";
  loadingMessage.style.display = "none";
  errorMessage.style.display = "none";
  recipesContainer.style.display = "grid"; // Display recipes in a grid layout
}

// --- Custom Promise for Simulated Delay ---
// This function creates a promise that resolves after a specified duration.
// It's used by fetchWithRetry if simulation is enabled.
function delay(duration) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}

// --- Core Fetch Logic ---

// Asynchronously fetches data from a given URL with retry logic and simulated delay
async function fetchWithRetry(url) {
  // Get current simulation state (delay enabled, duration)
  const currentSimState =
    typeof getSimState === "function"
      ? getSimState()
      : { simulateDelay: false, delayDuration: 0 };

  showLoading(); // Show loading indicator

  try {
    // If delay simulation is active, wait for the specified duration
    if (currentSimState.simulateDelay && currentSimState.delayDuration > 0) {
      await delay(currentSimState.delayDuration);
    }

    // Perform the actual fetch request
    const response = await fetch(url);
    // Check if the response was successful
    if (!response.ok) {
      if (response.status === 404 && url.includes("/search")) {
        throw new Error(
          "No recipes found for your search. Try different keywords."
        );
      } else if (response.status === 404) {
        throw new Error("Recipe not found (404).");
      }
      throw new Error(
        `HTTP error! status: ${response.status} - ${response.statusText}`
      );
    }
    // Parse the JSON response
    const data = await response.json();
    return data; // Return the fetched data
  } catch (error) {
    // Log and display any errors that occur during fetching
    console.error(`Fetch failed:`, error.message);
    showError(
      error.message || "Could not fetch recipes. Please try again later."
    );
    throw error; // Re-throw the error to be caught by the caller
  }
}

// --- Display Recipes ---

// Function to display recipes in the UI
function displayRecipes(data) {
  recipesContainer.innerHTML = ""; // Clear any previous recipe content
  hideLoadingAndError(); // Hide loading/error indicators and show the recipes container

  // Check if there are any recipes to display
  if (!data?.recipes?.length) {
    // Display a message if no recipes are found
    recipesContainer.innerHTML =
      '<p class="no-recipes-message">No recipes found. Try a different search or check back later.</p>';
    return;
  }

  // Iterate over each recipe and create a card for it
  data.recipes.forEach((recipe) => {
    const recipeCard = document.createElement("div");
    recipeCard.className = "recipe-card";
    recipeCard.innerHTML = `
            <a href="recipe-detail.html?id=${recipe.id}" class="recipe-link">
                <img src="${recipe.image}" alt="${recipe.name}" class="recipe-card-image">
                <div class="recipe-card-content">
                    <h3>${recipe.name}</h3>
                </div>
            </a>
        `;
    recipesContainer.appendChild(recipeCard); // Add the recipe card to the container
  });
}

// --- Event Handlers ---

// Asynchronously handles the search functionality
async function handleSearch() {
  const searchTerm = searchInput.value.trim(); // Get and trim the search term
  let url = BASE_URL; // Default URL to fetch all recipes
  // If a search term is provided, modify the URL to search for recipes
  if (searchTerm) {
    url = `${BASE_URL}/search?q=${encodeURIComponent(searchTerm)}`;
  }
  // If searchTerm is empty, url remains BASE_URL (fetches all recipes)

  try {
    // Fetch recipes based on the constructed url
    const data = await fetchWithRetry(url);
    if (data) {
      displayRecipes(data); // Display the fetched recipes
    }
  } catch (error) {
    // Errors are handled by fetchWithRetry and showError,
    // but this catch block can be used for additional error handling if needed.
    console.error("Search failed:", error);
  }
}

// --- Initialization ---

// Asynchronously initializes the page by fetching and displaying all recipes
async function init() {
  // Initial fetch - no search term, so fetch all recipes
  try {
    const data = await fetchWithRetry(BASE_URL); // Fetch all recipes
    if (data) {
      displayRecipes(data); // Display the fetched recipes
    }
  } catch (error) {
    // Errors are handled by fetchWithRetry and showError.
    console.error("Initialization failed:", error);
  }
}
