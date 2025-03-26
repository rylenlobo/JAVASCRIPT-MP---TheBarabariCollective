document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const gradeInput = document.getElementById("grade-input");
  const addBtn = document.getElementById("add-btn");
  const analyzeBtn = document.getElementById("analyze-btn");
  const resetBtn = document.getElementById("reset-btn");
  const gradesList = document.getElementById("grades-list");
  const resultsSection = document.getElementById("results");
  const totalGradesEl = document.getElementById("total-grades");
  const highestGradeEl = document.getElementById("highest-grade");
  const lowestGradeEl = document.getElementById("lowest-grade");
  const averageGradeEl = document.getElementById("average-grade");
  const sortedGradesEl = document.getElementById("sorted-grades");
  const passingGradesEl = document.getElementById("passing-grades");
  const passingRateEl = document.getElementById("passing-rate");
  const passingAverageEl = document.getElementById("passing-average");

  // Store grades
  let grades = [];

  // Event Listeners
  addBtn.addEventListener("click", addGrade);
  analyzeBtn.addEventListener("click", analyzeGrades);
  resetBtn.addEventListener("click", resetAll);
  gradeInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") addGrade();
  });

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
      gradeItem.className = "grade-item";

      const studentIndex = document.createElement("span");
      studentIndex.textContent = `Student ${index + 1}:`;
      studentIndex.className = "student-index";

      const pill = document.createElement("span");
      pill.textContent = grade;
      pill.className = "grade-pill";

      // Add color class based on grade
      if (grade < 40) {
        pill.classList.add("fail");
      } else if (grade < 60) {
        pill.classList.add("pass");
      } else if (grade < 80) {
        pill.classList.add("good");
      } else {
        pill.classList.add("excellent");
      }

      gradeItem.appendChild(studentIndex);
      gradeItem.appendChild(pill);
      gradesList.appendChild(gradeItem);
    });
  }

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

  function displayGradePills(container, gradesArray) {
    container.innerHTML = "";

    if (gradesArray.length === 0) {
      container.innerHTML =
        '<p class="empty-message">No grades in this category</p>';
      return;
    }

    gradesArray.forEach((grade, index) => {
      const gradeItem = document.createElement("div");
      gradeItem.className = "grade-item";

      const studentIndex = document.createElement("span");
      studentIndex.textContent = `Student ${index + 1}:`;
      studentIndex.className = "student-index";

      const pill = document.createElement("span");
      pill.textContent = grade;
      pill.className = "grade-pill";

      if (grade < 40) {
        pill.classList.add("fail");
      } else if (grade < 60) {
        pill.classList.add("pass");
      } else if (grade < 80) {
        pill.classList.add("good");
      } else {
        pill.classList.add("excellent");
      }

      gradeItem.appendChild(studentIndex);
      gradeItem.appendChild(pill);
      container.appendChild(gradeItem);
    });
  }

  function resetAll() {
    // Clear grades array
    grades = [];

    // Reset UI
    gradeInput.value = "";
    updateGradesList();
    resultsSection.classList.add("hidden");
    analyzeBtn.disabled = true;
  }

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
