// simulation.js

// Object to store the current simulation state
let simState = {
  simulateDelay: false, // Flag to enable/disable simulated delay
  delayDuration: 1000 // Duration of the simulated delay in milliseconds
};

// Function to get a copy of the current simulation state
function getSimState() {
  return { ...simState }; // Return a copy to prevent direct modification
}

// Function to apply new simulation settings
function applySimSettings(settings) {
  simState.simulateDelay = settings.simulateDelay;
  simState.delayDuration = settings.delayDuration;
  // No localStorage saving to prevent persistence
  console.log("Simulation settings applied:", simState);
}

// Function to initialize simulation controls on a page
function initializeSimulationControls(
  panelId, // ID of the simulation panel element
  toggleButtonId, // ID of the button to toggle the panel
  delayToggleId, // ID of the checkbox to toggle delay simulation
  delayInputId, // ID of the input field for delay duration
  applyButtonId, // ID of the button to apply settings
  refetchCallback // Callback function to refetch data after applying settings
) {
  // Get DOM elements for simulation controls
  const simPanel = document.getElementById(panelId);
  const toggleButton = document.getElementById(toggleButtonId);
  const delayToggle = document.getElementById(delayToggleId);
  const delayInput = document.getElementById(delayInputId);
  const applyButton = document.getElementById(applyButtonId);

  // Check if all required elements are found
  if (
    !simPanel ||
    !toggleButton ||
    !delayToggle ||
    !delayInput ||
    !applyButton
  ) {
    console.warn(
      "Simulation panel elements not found. Skipping initialization."
    );
    return;
  }

  // Set initial values of controls from current simState
  delayToggle.checked = simState.simulateDelay;
  delayInput.value = simState.delayDuration;

  // Event listener for the toggle button to show/hide the simulation panel
  toggleButton.addEventListener("click", () => {
    const isHidden = simPanel.style.display === "none";
    simPanel.style.display = isHidden ? "block" : "none";
    toggleButton.textContent = isHidden
      ? "Hide Simulation Controls"
      : "Show Simulation Controls";
  });

  // Event listener for the apply button to update simulation settings
  applyButton.addEventListener("click", () => {
    // Get new settings from the input fields
    const newSettings = {
      simulateDelay: delayToggle.checked,
      delayDuration: parseInt(delayInput.value, 10) || 0
    };
    // Apply the new settings
    applySimSettings(newSettings);
    // If a refetch callback is provided, call it
    if (typeof refetchCallback === "function") {
      console.log("Refetching data with new simulation settings...");
      refetchCallback(); // Call the provided refetch function
    } else {
      console.warn(
        "No refetch callback provided to initializeSimulationControls. Data will not be automatically reloaded."
      );
    }
  });
}

// Export functions to be used by other scripts
// This depends on how you structure your JS (ES modules, global, etc.)
// For simple global scope, they are already available.
// If using ES Modules, you would use: export { getSimState, initializeSimulationControls };
