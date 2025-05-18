# Bananazon - Product Listing App

## Description

Bananazon is a dynamic web application that allows users to browse, search, filter, and sort through a list of products. It fetches product data from the `dummyjson.com` API and provides a user-friendly interface for an e-commerce like experience. The application also remembers user preferences for filters and sorting using localStorage.

## Features

- **Product Listing**: Displays products fetched from an external API.
- **Search Functionality**: Allows users to search for products by keywords.
- **Category Filtering**: Users can filter products based on categories.
- **Sorting Options**: Products can be sorted by:
  - Title (Ascending/Descending)
  - Price (Ascending/Descending)
- **Dynamic Loading**: Loads more products as the user might need them (pagination based).
- **Loading State Indicator**: Shows a visual cue while products are being fetched.
- **No Results Found Message**: Informs the user if no products match their criteria.
- **Active Filters Display**: Clearly shows the currently applied search and filter criteria.
- **Modular JavaScript**: Code is organized into modules for better maintainability (API handling, UI updates, localStorage, utility functions).
- **Notifications**: Provides feedback to the user through on-screen notifications (e.g., for errors).
