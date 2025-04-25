// Wait for the HTML document to be fully loaded and parsed
document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements References
  const gradeInput = document.getElementById("grade-input"); // Input field for grade entry
  const addBtn = document.getElementById("add-btn"); // Button to add a grade
  const analyzeBtn = document.getElementById("analyze-btn"); // Button to analyze grades
  const resetBtn = document.getElementById("reset-btn"); // Button to reset the application
  const gradesList = document.getElementById("grades-list"); // Container to display added grades
  const resultsSection = document.getElementById("results"); // Section displaying analysis results
  const totalGradesEl = document.getElementById("total-grades"); // Element to show total grades count
  const highestGradeEl = document.getElementById("highest-grade"); // Element to show the highest grade
  const lowestGradeEl = document.getElementById("lowest-grade"); // Element to show the lowest grade
  const averageGradeEl = document.getElementById("average-grade"); // Element to show the average grade
  const sortedGradesEl = document.getElementById("sorted-grades"); // Container for sorted grades display
  const passingGradesEl = document.getElementById("passing-grades"); // Container for passing grades display
  const passingRateEl = document.getElementById("passing-rate"); // Element to show the passing rate
  const passingAverageEl = document.getElementById("passing-average"); // Element to show the average of passing grades

  // Application State
  let grades = []; // Array to store the entered grades

  // Event Listeners Setup
  addBtn.addEventListener("click", addGrade); // Add grade on button click
  analyzeBtn.addEventListener("click", analyzeGrades); // Analyze grades on button click
  resetBtn.addEventListener("click", resetAll); // Reset all on button click
  // Add grade when Enter key is pressed in the input field
  gradeInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") addGrade();
  });

  /**
   * Adds a new grade entered by the user.
   * Validates the input, adds it to the grades array, and updates the UI.
   */
  function addGrade() {
    // Convert input to number using Number()
    const grade = Number(gradeInput.value);

    // Validate input
    if (isNaN(grade) || grade < 0 || grade > 100 || gradeInput.value === "") {
      showInputError();
      return;
    }

    // Add grade to array
    grades.push(grade);

    // Update UI
    updateGradesList();

    // Clear input and focus
    gradeInput.value = "";
    gradeInput.focus();

    // Enable analyze button if we have grades
    if (grades.length > 0) {
      analyzeBtn.disabled = false;
    }
  }

  /**
   * Updates the list of grades displayed in the UI.
   * Clears the current list and re-renders it based on the grades array.
   */
  function updateGradesList() {
    // Clear current list
    gradesList.innerHTML = "";

    if (grades.length === 0) {
      gradesList.innerHTML = '<p class="empty-message">No grades added yet</p>';
      return;
    }

    // Add each grade as a pill with student index
    grades.forEach((grade, index) => {
      const gradeItem = document.createElement("div");
      gradeItem.className = "grade-item"; // Container for one grade entry

      const studentIndex = document.createElement("span");
      studentIndex.textContent = `Student ${index + 1}:`; // Label like "Student 1:"
      studentIndex.className = "student-index";

      const pill = document.createElement("span");
      pill.textContent = grade; // The grade value
      pill.className = "grade-pill"; // Base class for styling

      // Add color class based on grade value for visual feedback
      if (grade < 40) {
        pill.classList.add("fail"); // Red for failing
      } else if (grade < 60) {
        pill.classList.add("pass"); // Orange for basic pass
      } else if (grade < 80) {
        pill.classList.add("good"); // Blue for good
      } else {
        pill.classList.add("excellent"); // Green for excellent
      }

      // Append elements to the list item and then to the main list
      gradeItem.appendChild(studentIndex);
      gradeItem.appendChild(pill);
      gradesList.appendChild(gradeItem);
    });
  }

  /**
   * Analyzes the current list of grades.
   * Calculates statistics (total, highest, lowest, average, passing info) and updates the results UI.
   */
  function analyzeGrades() {
    if (grades.length === 0) return;

    // Using sort() to sort grades from lowest to highest
    const sortedGrades = [...grades].sort((a, b) => a - b);

    // Using Math.min() and Math.max() to find lowest and highest
    const lowestGrade = Math.min(...grades);
    const highestGrade = Math.max(...grades);

    // Using filter() to get only passing grades (>=40)
    const passingGrades = grades.filter((grade) => grade >= 40);

    // Using reduce() to calculate averages
    const average =
      grades.length > 0
        ? Math.floor(
            grades.reduce((sum, grade) => sum + grade, 0) / grades.length
          )
        : 0;

    const passingAverage =
      passingGrades.length > 0
        ? Math.floor(
            passingGrades.reduce((sum, grade) => sum + grade, 0) /
              passingGrades.length
          )
        : 0;

    // Calculate passing rate using length property
    const passingRate =
      grades.length > 0
        ? Math.floor((passingGrades.length / grades.length) * 100)
        : 0;

    // Update UI with results
    totalGradesEl.textContent = grades.length;
    highestGradeEl.textContent = highestGrade;
    lowestGradeEl.textContent = lowestGrade;
    averageGradeEl.textContent = average;

    // Show sorted grades
    displayGradePills(sortedGradesEl, sortedGrades);

    // Show passing grades
    displayGradePills(passingGradesEl, passingGrades);

    passingRateEl.textContent = `${passingRate}%`;
    passingAverageEl.textContent = passingAverage;

    // Show results section
    resultsSection.classList.remove("hidden");
  }

  /**
   * Helper function to display an array of grades as pills in a specified container.
   * @param {HTMLElement} container - The DOM element to display the grade pills in.
   * @param {number[]} gradesArray - The array of grades to display.
   */
  function displayGradePills(container, gradesArray) {
    container.innerHTML = "";

    if (gradesArray.length === 0) {
      container.innerHTML =
        '<p class="empty-message">No grades in this category</p>';
      return;
    }

    // Iterate through the grades and create pill elements similar to updateGradesList
    gradesArray.forEach((grade, index) => {
      const gradeItem = document.createElement("div");
      gradeItem.className = "grade-item";

      // Note: Index here might not correspond to the original student index if the array is filtered/sorted
      const studentIndex = document.createElement("span");
      // We might want to adjust this label if context changes (e.g., for sorted list)
      // For simplicity, keeping it as "Student X:" based on the current array's index
      studentIndex.textContent = `Grade ${index + 1}:`; // Adjusted label for sorted/filtered lists
      studentIndex.className = "student-index";

      const pill = document.createElement("span");
      pill.textContent = grade;
      pill.className = "grade-pill";

      // Apply color coding based on grade value
      if (grade < 40) {
        pill.classList.add("fail");
      } else if (grade < 60) {
        pill.classList.add("pass");
      } else if (grade < 80) {
        pill.classList.add("good");
      } else {
        pill.classList.add("excellent");
      }

      gradeItem.appendChild(studentIndex); // Append index label
      gradeItem.appendChild(pill); // Append grade pill
      container.appendChild(gradeItem); // Append item to the container
    });
  }

  /**
   * Resets the application state.
   * Clears the grades array, resets the input field, hides results, and disables the analyze button.
   */
  function resetAll() {
    // Clear grades array
    grades = [];

    // Reset UI
    gradeInput.value = "";
    updateGradesList();
    resultsSection.classList.add("hidden");
    analyzeBtn.disabled = true;
  }

  /**
   * Provides visual feedback for invalid grade input.
   * Adds an error class to the input, clears it, shows an error message, and removes the error state after a delay.
   */
  function showInputError() {
    gradeInput.classList.add("error");
    gradeInput.value = "";
    gradeInput.placeholder = "Please enter a valid grade (0-100)";

    setTimeout(() => {
      gradeInput.classList.remove("error");
      gradeInput.placeholder = "Enter grade (0-100)";
    }, 2000);
  }
});
