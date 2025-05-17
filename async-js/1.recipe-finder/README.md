# Recipe Finder Features

- **Recipe Listing (Home Page)**

  - Fetches and displays a list of recipes from the `https://dummyjson.com/recipes` API.
  - Includes a search bar to filter recipes by name.
  - Handles loading states with a visual spinner and text messages.
  - Displays error messages if fetching fails.
  - Recipes are displayed in a responsive grid layout.
  - Each recipe card links to a detailed view of the recipe.

- **Recipe Detail View**
  - Displays detailed information for a single recipe, fetched by its ID.
  - Shows recipe image, title, ingredients, step-by-step instructions, and other metadata (e.g., cuisine, difficulty, prep time, cook time, calories, rating).
  - Includes a "Back to Recipes" link for easy navigation.
  - Manages its own loading and error states during data fetching.

### API Interaction

- Uses the `fetch` API for asynchronous calls to `https://dummyjson.com/recipes`.
- Basic error handling for network issues or unsuccessful API responses.

### Development & Helper Features

- **Delay Simulation using Promises**
  - Supports toggling a simulated network delay.
  - Allows setting a custom duration for the simulated delay.
  - Helps in testing loading states and UI responsiveness under different network conditions.
