// DOM elements
const timeElement = document.getElementById("time");
const dateElement = document.getElementById("date");
const formatToggleBtn = document.getElementById("format-toggle");

// Settings
let is24HourFormat = false;

// Update clock display
function updateClock() {
  const now = new Date();

  // Update time display
  timeElement.textContent = formatTime(now);

  // Update date display (DD/MM/YYYY)
  dateElement.textContent = formatDate(now);
}

// Format time based on selected format
function formatTime(date) {
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  if (is24HourFormat) {
    return `${hours.toString().padStart(2, "0")}:${minutes}:${seconds}`;
  } else {
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // Convert 0 to 12
    return `${hours.toString().padStart(2, "0")}:${minutes}:${seconds} ${ampm}`;
  }
}

// Format date as DD/MM/YYYY
function formatDate(date) {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

// Toggle time format
formatToggleBtn.addEventListener("click", function () {
  is24HourFormat = !is24HourFormat;
  formatToggleBtn.textContent = is24HourFormat
    ? "Switch to 12-hour format"
    : "Switch to 24-hour format";
  updateClock();
});

// Initialize
setInterval(updateClock, 1000);
updateClock();
