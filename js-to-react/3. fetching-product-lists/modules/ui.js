/**
 * UI Module - Handles DOM manipulation and rendering
 */

/**
 * Render products to the DOM
 */
export function renderProducts(productArray, productListElement) {
  productArray.forEach((product) => {
    const productElement = document.createElement("div");
    productElement.className = "product";

    // Determine stock status text and class
    let stockStatus, stockClass;
    if (product.stock <= 0) {
      stockStatus = "Out of Stock";
      stockClass = "out-of-stock";
    } else if (product.stock < 10) {
      stockStatus = "Low Stock";
      stockClass = "low-stock";
    } else {
      stockStatus = "In Stock";
      stockClass = "in-stock";
    }

    // Render with Optional Chaining and Nullish Coalescing
    productElement.innerHTML = `
      <img class="product-image" src="${
        product?.thumbnail ??
        "https://via.placeholder.com/300x200?text=No+Image"
      }" alt="${product?.title ?? "Product"}">
      <div class="product-info">
        <h3 class="product-title">${product?.title ?? "Unknown Product"}</h3>
        <p class="product-description">${
          product?.description ?? "No description available"
        }</p>
        <div class="product-details">
          <div class="product-price">$${
            product?.price?.toFixed(2) ?? "0.00"
          }</div>
          <div class="product-rating">
            <i class="fas fa-star"></i>
            ${product?.rating?.toFixed(1) ?? "0.0"}
          </div>
        </div>
        <span class="product-stock ${stockClass}">${stockStatus}</span>
      </div>
    `;

    productListElement.appendChild(productElement);
  });
}

/**
 * Show a notification to the user
 */
export function showNotification(message, type = "success") {
  // Create notification element
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.innerHTML = `
    <i class="fas ${
      type === "success" ? "fa-check-circle" : "fa-exclamation-circle"
    }"></i>
    <span>${message}</span>
  `;

  // Add to DOM
  document.body.appendChild(notification);

  // Trigger animation
  setTimeout(() => {
    notification.classList.add("show");
  }, 10);

  // Remove after delay
  setTimeout(() => {
    notification.classList.remove("show");
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 3000);
}

/**
 * Toggle loading indicator visibility
 */
export function toggleLoadingIndicator(loadingElement, visible) {
  if (visible) {
    loadingElement.classList.add("visible");
  } else {
    loadingElement.classList.remove("visible");
  }
}

/**
 * Add a filter pill to the active filters display
 */
export function addFilterPill(
  activeFiltersElement,
  type,
  value,
  removeCallback
) {
  const pill = document.createElement("div");
  pill.className = "filter-pill";
  pill.innerHTML = `
    <span>${type}: ${value}</span>
    <button aria-label="Remove filter"><i class="fas fa-times"></i></button>
  `;

  pill.querySelector("button").addEventListener("click", removeCallback);
  activeFiltersElement.appendChild(pill);
}

/**
 * Update active filters display
 */
export function updateActiveFilters(
  activeFiltersElement,
  searchInput,
  categorySelect,
  sortSelect,
  resetAndFetchProducts
) {
  activeFiltersElement.innerHTML = "";

  const searchValue = searchInput.value.trim();
  const categoryValue = categorySelect.value;
  const sortValue = sortSelect.value;

  if (searchValue) {
    addFilterPill(activeFiltersElement, "Search", searchValue, () => {
      searchInput.value = "";
      resetAndFetchProducts();
    });
  }

  if (categoryValue) {
    const categoryText =
      categorySelect.options[categorySelect.selectedIndex].text;
    addFilterPill(activeFiltersElement, "Category", categoryText, () => {
      categorySelect.value = "";
      resetAndFetchProducts();
    });
  }

  if (sortValue) {
    const sortText = sortSelect.options[sortSelect.selectedIndex].text;
    addFilterPill(activeFiltersElement, "Sort", sortText, () => {
      sortSelect.value = "";
      resetAndFetchProducts();
    });
  }
}
