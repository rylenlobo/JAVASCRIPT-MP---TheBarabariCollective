// recipe-detail.js

// Get DOM elements for recipe detail display, loading spinner, and error messages
const recipeDetailContainer = document.getElementById("recipeDetailContainer");
const loadingSpinner = document.getElementById("detailLoadingSpinner"); // Corrected ID for the detail page spinner
const errorMessageElement = document.getElementById("detailErrorMessage"); // Element to display error messages

// Base URL for the recipe API
const BASE_URL = "https://dummyjson.com/recipes";

// --- UI Update Functions ---

// Function to show the loading spinner and hide content/error messages
function showLoadingDetail() {
  if (loadingSpinner) loadingSpinner.style.display = "block";
  if (errorMessageElement) errorMessageElement.style.display = "none";
  recipeDetailContainer.style.display = "none"; // Hide content area while loading
}

// Function to show an error message and hide content/spinner
function showErrorDetail(message) {
  if (errorMessageElement) {
    errorMessageElement.textContent = message;
    errorMessageElement.style.display = "block";
  }
  if (loadingSpinner) loadingSpinner.style.display = "none";
  recipeDetailContainer.style.display = "none"; // Hide content area on error
}

// Function to hide loading spinner and error messages, and show content
function hideLoadingAndErrorDetail() {
  if (loadingSpinner) loadingSpinner.style.display = "none";
  if (errorMessageElement) errorMessageElement.style.display = "none";
  recipeDetailContainer.style.display = "block"; // Show content area
}

// --- Custom Promise for Simulated Delay (can be shared or duplicated if not using modules) ---
// Removed delay function as it was only for simulation (simulation.js handles this now)

// Asynchronously fetches details for a specific recipe by its ID
async function fetchRecipeDetails(id) {
  showLoadingDetail(); // Show loading indicator

  // Get simulation state for potential delay
  const currentSimState =
    typeof getSimState === "function"
      ? getSimState()
      : { simulateDelay: false, delayDuration: 0 };

  try {
    // Simulate delay if enabled
    if (currentSimState.simulateDelay && currentSimState.delayDuration > 0) {
      await new Promise((resolve) =>
        setTimeout(resolve, currentSimState.delayDuration)
      );
    }

    // Fetch recipe data from the API
    const response = await fetch(`${BASE_URL}/${id}`);
    if (!response.ok) {
      // Handle HTTP errors
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const recipe = await response.json(); // Parse JSON response
    displayRecipeDetails(recipe); // Display the fetched recipe details
  } catch (error) {
    // Handle fetch or other errors
    console.error("Failed to fetch recipe details:", error);
    showErrorDetail(
      `Failed to load recipe details: ${error.message}. Please try again.`
    );
  }
}

// Function to display the fetched recipe details in the UI
function displayRecipeDetails(recipe) {
  if (!recipe) {
    // Handle case where recipe data is missing
    showErrorDetail("Recipe data not found.");
    return;
  }
  hideLoadingAndErrorDetail(); // Hide loading/error messages

  // Populate the recipe detail container with HTML content
  recipeDetailContainer.innerHTML = `
        <div class="recipe-detail-content">
            <img src="${recipe.image}" alt="${
    recipe.name
  }" class="recipe-image-large">
            <h2>${recipe.name}</h2>

            <div class="recipe-meta">
                <p><strong>Cuisine:</strong> ${recipe.cuisine}</p>
                <p><strong>Difficulty:</strong> ${recipe.difficulty}</p>
                <p><strong>Servings:</strong> ${recipe.servings}</p>
                <p><strong>Prep Time:</strong> ${
                  recipe.prepTimeMinutes
                } mins</p>
                <p><strong>Cook Time:</strong> ${
                  recipe.cookTimeMinutes
                } mins</p>
                <p><strong>Calories:</strong> ${
                  recipe.caloriesPerServing
                } per serving</p>
                <p><strong>Rating:</strong> ${recipe.rating} (${
    recipe.reviewCount
  } reviews)</p>
            </div>

            <h3 class="section-title">Ingredients</h3>
            <ul class="ingredients-list">
                ${recipe.ingredients.map((ing) => `<li>${ing}</li>`).join("")}
            </ul>

            <h3 class="section-title">Instructions</h3>
            <ol class="instructions-list">
                ${recipe.instructions
                  .map((step) => `<li>${step}</li>`)
                  .join("")}
            </ol>

            <div class="tags-container">
                <h3 class="section-title">Tags</h3>
                ${recipe.tags
                  .map((tag) => `<span class="tag">${tag}</span>`)
                  .join("")}
            </div>
        </div>
    `;
}

// Asynchronously initializes the recipe detail page
async function initRecipeDetail() {
  // Get recipe ID from URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const recipeId = urlParams.get("id");

  if (!recipeId) {
    // Handle missing recipe ID
    showErrorDetail("No recipe ID provided in the URL.");
    console.error("No recipe ID found in URL parameters.");
    return;
  }

  // Initialize simulation controls if available
  if (typeof initializeSimulationControls === "function") {
    initializeSimulationControls(
      "simulationPanel", // Assuming a panel might be added to recipe-detail.html
      "toggleSimPanelButton",
      "simulateDelayToggle",
      "delayDurationInput",
      "applySimSettingsButton",
      () => fetchRecipeDetails(recipeId) // Refetch current recipe on settings change
    );
  }

  try {
    // Fetch and display recipe details
    await fetchRecipeDetails(recipeId);
  } catch (error) {
    // Errors are handled within fetchRecipeDetails, but log here for broader context if needed
    console.error("Error initializing recipe details page:", error);
  }
}

// Event listener to initialize the page when DOM content is loaded
document.addEventListener("DOMContentLoaded", initRecipeDetail);
