// DOM elements
const timeElement = document.getElementById("time"); // Gets the element to display the time
const dateElement = document.getElementById("date"); // Gets the element to display the date
const formatToggleBtn = document.getElementById("format-toggle"); // Gets the button to toggle time format

// Settings
let is24HourFormat = false; // Tracks the current time format (12-hour by default)

// Update clock display
// This function is called every second to update the time and date displayed on the page.
function updateClock() {
  const now = new Date();

  // Update time display
  timeElement.textContent = formatTime(now);

  // Update date display (DD/MM/YYYY)
  dateElement.textContent = formatDate(now);
}

// Format time based on selected format
// Takes a Date object and returns a formatted time string (HH:MM:SS or HH:MM:SS AM/PM).
function formatTime(date) {
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  if (is24HourFormat) {
    // 24-hour format
    return `${hours.toString().padStart(2, "0")}:${minutes}:${seconds}`;
  } else {
    // 12-hour format
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // Convert hour 0 to 12 for 12-hour format
    return `${hours.toString().padStart(2, "0")}:${minutes}:${seconds} ${ampm}`;
  }
}

// Format date as DD/MM/YYYY
// Takes a Date object and returns a formatted date string.
function formatDate(date) {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is 0-indexed, so add 1
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

// Toggle time format
// Event listener for the format toggle button.
formatToggleBtn.addEventListener("click", function () {
  is24HourFormat = !is24HourFormat; // Flip the format flag
  // Update button text based on the new format
  formatToggleBtn.textContent = is24HourFormat
    ? "Switch to 12-hour format"
    : "Switch to 24-hour format";
  updateClock(); // Update the clock immediately to reflect the change
});

// Initialize
// Set an interval to call updateClock every 1000 milliseconds (1 second)
setInterval(updateClock, 1000);
// Call updateClock once immediately to display the time when the page loads
updateClock();
