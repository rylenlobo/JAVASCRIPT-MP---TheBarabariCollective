// Wait for the HTML document to be fully loaded and parsed
document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements Selection
  // Input field where the user enters the word/phrase
  const palindromeInput = document.getElementById("palindrome-input");
  // Button to trigger the palindrome check
  const checkBtn = document.getElementById("check-btn");
  // Div element to display the overall result (palindrome/not palindrome/error)
  const result = document.getElementById("result");
  // H2 element within the result div to show the result text
  const resultText = document.getElementById("result-text");
  // Div element within the result div to show an emoji corresponding to the result
  const resultEmoji = document.getElementById("result-emoji");
  // Div element containing the step-by-step comparison details
  const comparisonSteps = document.getElementById("comparison-steps");
  // Unordered list element where individual comparison steps are added
  const stepsList = document.getElementById("steps-list");

  // Array of denied words/phrases for demonstration of array methods
  // Used for basic content filtering
  const denyList = ["badword", "inappropriate", "offensive"];

  // Event Listeners Setup
  // Add click event listener to the check button
  checkBtn.addEventListener("click", checkPalindrome);

  // Add keydown event listener to the input field for Enter key press
  palindromeInput.addEventListener("keydown", (e) => {
    // If the pressed key is 'Enter', trigger the palindrome check
    if (e.key === "Enter") {
      checkPalindrome();
    }
  });

  /**
   * Main function to check if the input is a palindrome.
   * Handles input retrieval, validation, cleaning, and calls helper functions.
   */
  function checkPalindrome() {
    // Clear previous results and hide result/steps sections
    result.className = "hidden"; // Hide the result area
    comparisonSteps.className = "hidden"; // Hide the steps area
    stepsList.innerHTML = ""; // Clear previous steps

    // Get the input value and remove leading/trailing whitespace
    let input = palindromeInput.value.trim();

    // Input Validation: Check if the input is empty
    if (input === "") {
      showError("Please enter a word or phrase"); // Display error if input is empty
      return;
    }

    // Content Filtering: Check if the input contains any denied words
    // Using Array method some() to check against deny list
    if (denyList.some((word) => input.toLowerCase().includes(word))) {
      showError("Please use appropriate language"); // Display error for inappropriate language
      return;
    }

    // Input Cleaning: Remove non-alphanumeric characters and convert to lowercase
    // Using RegEx to clean the input - removing non-alphanumeric characters
    const cleanInput = input.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();

    // Validation after cleaning: Check if the cleaned input is empty
    if (cleanInput === "") {
      showError("Please enter at least one alphanumeric character"); // Display error if only non-alphanumeric chars were entered
      return;
    }

    // Perform palindrome check using recursion and collect steps
    const steps = []; // Array to store the comparison steps
    const isPalindrome = checkPalindromeRecursive(
      cleanInput,
      0,
      cleanInput.length - 1,
      steps
    );

    // Display the final result and the comparison steps
    displayResult(isPalindrome, input); // Show whether it's a palindrome or not
    displaySteps(steps); // Show the step-by-step comparison
  }

  /**
   * Recursively checks if a string is a palindrome.
   * @param {string} str - The string to check (cleaned version).
   * @param {number} start - The starting index for the current comparison.
   * @param {number} end - The ending index for the current comparison.
   * @param {Array} steps - An array to record the comparison steps.
   * @returns {boolean} - True if the string is a palindrome, false otherwise.
   */
  function checkPalindromeRecursive(str, start, end, steps) {
    // Base case 1: If start index crosses or meets end index, it's a palindrome
    if (start >= end) {
      return true; // All characters matched or single character/empty string
    }

    // Compare characters at the current start and end positions
    const match = str[start] === str[end];

    // Record the current comparison step
    steps.push({
      left: str[start], // Character at the start index
      right: str[end], // Character at the end index
      leftIndex: start, // Original start index (for display)
      rightIndex: end, // Original end index (for display)
      match: match // Boolean indicating if characters matched
    });

    // Base case 2: If characters don't match, it's not a palindrome
    if (!match) {
      return false; // Mismatch found
    }

    // Recursive step: Move inwards and check the next pair of characters
    return checkPalindromeRecursive(str, start + 1, end - 1, steps);
  }

  /**
   * Displays the final result (palindrome or not) in the UI.
   * @param {boolean} isPalindrome - Whether the input was determined to be a palindrome.
   * @param {string} originalInput - The original user input string.
   */
  function displayResult(isPalindrome, originalInput) {
    result.classList.remove("hidden"); // Make the result section visible

    // Apply appropriate styling and text based on whether it's a palindrome
    if (isPalindrome) {
      result.classList.add("is-palindrome");
      result.classList.remove("not-palindrome");
      resultText.textContent = `"${originalInput}" is a palindrome!`;
      resultEmoji.textContent = "🎉"; // Success emoji
    } else {
      result.classList.add("not-palindrome");
      result.classList.remove("is-palindrome");
      resultText.textContent = `"${originalInput}" is not a palindrome.`;
      resultEmoji.textContent = "😕"; // Failure/neutral emoji
    }
  }

  /**
   * Displays the step-by-step comparison process in the UI.
   * steps - An array of objects, each representing a comparison step.
   */
  function displaySteps(steps) {
    // Don't display the steps section if there were no steps (e.g., single character input)
    if (steps.length === 0) return;

    comparisonSteps.classList.remove("hidden"); // Make the steps section visible

    // Create and append list items for each step
    steps.forEach((step, index) => {
      const li = document.createElement("li"); // Create a list item element

      // Create span for step number
      const stepNumber = document.createElement("span");
      stepNumber.textContent = `Step ${index + 1}: `;

      // Create span for the comparison details
      const comparison = document.createElement("span");
      // Use innerHTML to render characters correctly
      comparison.innerHTML = `Comparing '${step.left}' (position ${
        step.leftIndex + 1 // Display 1-based index
      }) with '${step.right}' (position ${step.rightIndex + 1}): `; // Display 1-based index

      // Create span for the match/mismatch result
      const resultSpan = document.createElement("span");
      if (step.match) {
        resultSpan.textContent = "Match! ✓";
        resultSpan.className = "step-match"; // Apply green styling
      } else {
        resultSpan.textContent = "Mismatch! ✗";
        resultSpan.className = "step-mismatch"; // Apply red styling
      }

      // Append the created elements to the list item
      li.appendChild(stepNumber);
      li.appendChild(comparison);
      li.appendChild(resultSpan);
      // Append the list item to the steps list in the DOM
      stepsList.appendChild(li);
    });
  }

  /**
   * Displays an error message in the result area.
   *The error message to display.
   */
  function showError(message) {
    result.classList.remove("hidden", "is-palindrome"); // Make result area visible and remove success styling
    result.classList.add("not-palindrome"); // Apply error/warning styling
    resultText.textContent = message; // Set the error message text
    resultEmoji.textContent = "⚠️"; // Warning emoji
  }
});
