document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const palindromeInput = document.getElementById("palindrome-input");
  const checkBtn = document.getElementById("check-btn");
  const result = document.getElementById("result");
  const resultText = document.getElementById("result-text");
  const resultEmoji = document.getElementById("result-emoji");
  const comparisonSteps = document.getElementById("comparison-steps");
  const stepsList = document.getElementById("steps-list");

  // Array of denied words/phrases for demonstration of array methods
  const denyList = ["badword", "inappropriate", "offensive"];

  // Event Listeners
  checkBtn.addEventListener("click", checkPalindrome);

  // Keyboard Event Handling for Enter key
  palindromeInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      checkPalindrome();
    }
  });

  function checkPalindrome() {
    // Clear previous results
    result.className = "hidden";
    comparisonSteps.className = "hidden";
    stepsList.innerHTML = "";

    let input = palindromeInput.value.trim();

    // Validation
    if (input === "") {
      showError("Please enter a word or phrase");
      return;
    }

    // Using Array method some() to check against deny list
    if (denyList.some((word) => input.toLowerCase().includes(word))) {
      showError("Please use appropriate language");
      return;
    }

    // Using RegEx to clean the input - removing non-alphanumeric characters
    const cleanInput = input.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();

    if (cleanInput === "") {
      showError("Please enter at least one alphanumeric character");
      return;
    }

    // Perform palindrome check and collect steps
    const steps = [];
    const isPalindrome = checkPalindromeRecursive(
      cleanInput,
      0,
      cleanInput.length - 1,
      steps
    );

    // Display results
    displayResult(isPalindrome, input);
    displaySteps(steps);
  }

  // Recursive function to check if a string is a palindrome
  function checkPalindromeRecursive(str, start, end, steps) {
    // Base case: if we've checked all characters or there's only one character left
    if (start >= end) {
      return true;
    }

    // Compare characters at start and end positions
    const match = str[start] === str[end];

    // Record this step
    steps.push({
      left: str[start],
      right: str[end],
      leftIndex: start,
      rightIndex: end,
      match: match
    });

    // If characters don't match, it's not a palindrome
    if (!match) {
      return false;
    }

    // Recursive call: check the substring without the first and last characters
    return checkPalindromeRecursive(str, start + 1, end - 1, steps);
  }

  function displayResult(isPalindrome, originalInput) {
    result.classList.remove("hidden");

    if (isPalindrome) {
      result.classList.add("is-palindrome");
      result.classList.remove("not-palindrome");
      resultText.textContent = `"${originalInput}" is a palindrome!`;
      resultEmoji.textContent = "🎉";
    } else {
      result.classList.add("not-palindrome");
      result.classList.remove("is-palindrome");
      resultText.textContent = `"${originalInput}" is not a palindrome.`;
      resultEmoji.textContent = "😕";
    }
  }

  function displaySteps(steps) {
    if (steps.length === 0) return;

    comparisonSteps.classList.remove("hidden");

    steps.forEach((step, index) => {
      const li = document.createElement("li");

      const stepNumber = document.createElement("span");
      stepNumber.textContent = `Step ${index + 1}: `;

      const comparison = document.createElement("span");
      comparison.innerHTML = `Comparing '${step.left}' (position ${
        step.leftIndex + 1
      }) with '${step.right}' (position ${step.rightIndex + 1}): `;

      const result = document.createElement("span");
      if (step.match) {
        result.textContent = "Match! ✓";
        result.className = "step-match";
      } else {
        result.textContent = "Mismatch! ✗";
        result.className = "step-mismatch";
      }

      li.appendChild(stepNumber);
      li.appendChild(comparison);
      li.appendChild(result);
      stepsList.appendChild(li);
    });
  }

  function showError(message) {
    result.classList.remove("hidden", "is-palindrome");
    result.classList.add("not-palindrome");
    resultText.textContent = message;
    resultEmoji.textContent = "⚠️";
  }
});
