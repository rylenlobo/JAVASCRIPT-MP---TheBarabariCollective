/**
 * API Module - Handles all API communications
 */

// API Constants
const API_BASE_URL = "https://dummyjson.com";
const PRODUCT_LIMIT = 12;

/**
 * Fetch products based on filters
 */
export async function fetchProductsFromAPI(
  page,
  searchQuery,
  category,
  sortOption
) {
  const [sortBy, order] = sortOption?.split("-") ?? [];
  const skip = page * PRODUCT_LIMIT;

  // Determine the appropriate URL based on filters
  let url;
  if (searchQuery) {
    // Search endpoint
    url = `${API_BASE_URL}/products/search?q=${searchQuery}&limit=${PRODUCT_LIMIT}&skip=${skip}`;
  } else if (category) {
    // Category endpoint
    url = `${API_BASE_URL}/products/category/${category}?limit=${PRODUCT_LIMIT}&skip=${skip}`;
  } else {
    // Default products endpoint
    url = `${API_BASE_URL}/products?limit=${PRODUCT_LIMIT}&skip=${skip}`;
  }

  // Add sorting if specified
  if (sortBy && order) {
    url += `&sortBy=${sortBy}&order=${order}`;
  }

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

/**
 * Fetch all product categories
 */
export async function fetchCategoriesFromAPI() {
  const response = await fetch(`${API_BASE_URL}/products/category-list`);

  if (!response.ok) {
    throw new Error(`Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

// Export constants
export { PRODUCT_LIMIT };
