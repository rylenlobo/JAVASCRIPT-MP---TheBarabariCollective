// Ensures the script runs only after the HTML document is fully loaded and parsed.
document.addEventListener("DOMContentLoaded", function () {
  // DOM element references for form and inputs
  const form = document.getElementById("registrationForm");
  const nameInput = document.getElementById("name");
  const ageInput = document.getElementById("age");
  const emailInput = document.getElementById("email");
  const phoneInput = document.getElementById("phone");
  const genderSelect = document.getElementById("gender");
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirmPassword");
  const successMessage = document.getElementById("successMessage");
  const togglePass = document.getElementById("togglePassword"); // Checkbox to show/hide password

  // DOM element references for error messages
  const nameError = document.getElementById("nameError");
  const ageError = document.getElementById("ageError");
  const emailError = document.getElementById("emailError");
  const phoneError = document.getElementById("phoneError");
  const genderError = document.getElementById("genderError");
  const passwordError = document.getElementById("passwordError");
  const confirmPasswordError = document.getElementById("confirmPasswordError");

  // --- Validation Functions ---

  /**
   * Validates the name input field.
   * Checks if the name is provided and is at least 3 characters long.
   * Updates styles and error messages accordingly.
   * True if valid, false otherwise.
   */
  function validateName() {
    if (nameInput.value.trim() === "") {
      nameError.textContent = "Name is required";
      nameInput.classList.add("error");
      nameInput.classList.remove("success");
      return false;
    } else if (nameInput.value.trim().length < 3) {
      nameError.textContent = "Name must be at least 3 characters";
      nameInput.classList.add("error");
      nameInput.classList.remove("success");
      return false;
    } else {
      nameError.textContent = "";
      nameInput.classList.remove("error");
      nameInput.classList.add("success");
      return true;
    }
  }

  /**
   * Validates the age input field.
   * Checks if age is provided, is a number, and is between 18 and 120.
   * Updates styles and error messages accordingly.
   * True if valid, false otherwise.
   */
  function validateAge() {
    if (ageInput.value.trim() === "") {
      ageError.textContent = "Age is required";
      ageInput.classList.add("error");
      ageInput.classList.remove("success");
      return false;
    } else if (
      isNaN(ageInput.value) ||
      +ageInput.value < 18 ||
      +ageInput.value > 120
    ) {
      ageError.textContent = "Please enter a valid age between 18 and 120";
      ageInput.classList.add("error");
      ageInput.classList.remove("success");
      return false;
    } else {
      ageError.textContent = "";
      ageInput.classList.remove("error");
      ageInput.classList.add("success");
      return true;
    }
  }

  /**
   * Validates the email input field.
   * Checks if email is provided and matches a standard email format.
   * Updates styles and error messages accordingly.
   * True if valid, false otherwise.
   */
  function validateEmail() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailInput.value.trim() === "") {
      emailError.textContent = "Email is required";
      emailInput.classList.add("error");
      emailInput.classList.remove("success");
      return false;
    } else if (!emailInput.value.trim().match(emailRegex)) {
      emailError.textContent = "Please enter a valid email";
      emailInput.classList.add("error");
      emailInput.classList.remove("success");
      return false;
    } else {
      emailError.textContent = "";
      emailInput.classList.remove("error");
      emailInput.classList.add("success");
      return true;
    }
  }

  /**
   * Validates the phone number input field.
   * Checks if phone number is provided and contains exactly 10 digits.
   * Updates styles and error messages accordingly.
   * True if valid, false otherwise.
   */
  function validatePhone() {
    const phoneRegex = /^\d{10}$/;
    if (phoneInput.value.trim() === "") {
      phoneError.textContent = "Phone number is required";
      phoneInput.classList.add("error");
      phoneInput.classList.remove("success");
      return false;
    } else if (!phoneInput.value.replace(/\D/g, "").match(phoneRegex)) {
      phoneError.textContent = "Please enter a valid 10-digit phone number";
      phoneInput.classList.add("error");
      phoneInput.classList.remove("success");
      return false;
    } else {
      phoneError.textContent = "";
      phoneInput.classList.remove("error");
      phoneInput.classList.add("success");
      return true;
    }
  }

  /**
   * Validates the gender selection field.
   * Checks if a gender option has been selected.
   * Updates styles and error messages accordingly.
   * True if valid, false otherwise.
   */
  function validateGender() {
    if (genderSelect.value === "") {
      genderError.textContent = "Please select a gender";
      genderSelect.classList.add("error");
      genderSelect.classList.remove("success");
      return false;
    } else {
      genderError.textContent = "";
      genderSelect.classList.remove("error");
      genderSelect.classList.add("success");
      return true;
    }
  }

  /**
   * Validates the password input field.
   * Checks if password is provided and is at least 6 characters long.
   * Updates styles and error messages accordingly.
   * True if valid, false otherwise.
   */
  function validatePassword() {
    if (passwordInput.value === "") {
      passwordError.textContent = "Password is required";
      passwordInput.classList.add("error");
      passwordInput.classList.remove("success");
      return false;
    } else if (passwordInput.value.length < 6) {
      passwordError.textContent = "Password must be at least 6 characters";
      passwordInput.classList.add("error");
      passwordInput.classList.remove("success");
      return false;
    } else {
      passwordError.textContent = "";
      passwordInput.classList.remove("error");
      passwordInput.classList.add("success");
      return true;
    }
  }

  /**
   * Validates the confirm password input field.
   * Checks if confirm password is provided and matches the original password.
   * Updates styles and error messages accordingly.
   * True if valid, false otherwise.
   */
  function validateConfirmPassword() {
    if (confirmPasswordInput.value === "") {
      confirmPasswordError.textContent = "Please confirm your password";
      confirmPasswordInput.classList.add("error");
      confirmPasswordInput.classList.remove("success");
      return false;
    } else if (confirmPasswordInput.value !== passwordInput.value) {
      confirmPasswordError.textContent = "Passwords do not match";
      confirmPasswordInput.classList.add("error");
      confirmPasswordInput.classList.remove("success");
      return false;
    } else {
      confirmPasswordError.textContent = "";
      confirmPasswordInput.classList.remove("error");
      confirmPasswordInput.classList.add("success");
      return true;
    }
  }

  /**
   * Toggles the password input field type between 'password' and 'text'.
   * Triggered by the 'Show Password' checkbox.
   */
  function togglePassword() {
    passwordInput.type = this.checked ? "text" : "password";
  }

  // --- Event Listeners for Real-time Validation ---
  // Attach validation functions to input/change events for immediate feedback.
  nameInput.addEventListener("input", validateName);
  ageInput.addEventListener("input", validateAge);
  emailInput.addEventListener("input", validateEmail);
  phoneInput.addEventListener("input", validatePhone);
  genderSelect.addEventListener("change", validateGender);
  togglePass.addEventListener("change", togglePassword); // Listener for the show/hide password checkbox
  passwordInput.addEventListener("input", validatePassword);
  confirmPasswordInput.addEventListener("input", validateConfirmPassword);

  // --- Password Strength Meter Functionality ---
  // Updates the password strength meter based on input.
  passwordInput.addEventListener("input", function () {
    const password = passwordInput.value;
    // DOM elements for the strength meter
    const strengthBar = document.getElementById("strength-bar");
    const strengthText = document.getElementById("strength-text");

    // Reset meter if password is empty
    if (password === "") {
      strengthBar.style.width = "0";
      strengthText.textContent = "Password strength";
      strengthBar.style.backgroundColor = "#eee"; // Reset color
      strengthText.style.color = "#555"; // Reset text color
      return;
    }

    // Define criteria for password strength
    const criteria = [
      password.length >= 8, // Minimum length
      password.match(/[A-Z]/), // Contains uppercase letter
      password.match(/[a-z]/), // Contains lowercase letter
      password.match(/[0-9]/), // Contains number
      password.match(/[^A-Za-z0-9]/) // Contains special character
    ];

    // Calculate strength score by counting met criteria
    const strength = criteria.reduce(
      (acc, criterion) => acc + (criterion ? 1 : 0),
      0
    );

    // Define strength levels with corresponding styles and text
    const strengthLevels = [
      { threshold: 1, text: "Very Weak", color: "#e74c3c", percent: 20 },
      { threshold: 2, text: "Weak", color: "#e67e22", percent: 40 },
      { threshold: 3, text: "Medium", color: "#f1c40f", percent: 60 },
      { threshold: 4, text: "Strong", color: "#2ecc71", percent: 80 },
      { threshold: 5, text: "Very Strong", color: "#27ae60", percent: 100 }
    ];

    // Determine the current strength level based on the score
    // Default to the lowest level if strength is 0 or 1
    const currentLevel =
      strengthLevels.find((level) => strength <= level.threshold) ||
      strengthLevels[0];

    // Update the strength meter's visual appearance (bar width, color, text)
    strengthBar.style.width = `${currentLevel.percent}%`;
    strengthBar.style.backgroundColor = currentLevel.color;
    strengthText.textContent = currentLevel.text;
    strengthText.style.color = currentLevel.color; // Match text color to bar color
  });

  // --- Form Submission Handling ---
  // Handles the form submission event.
  form.addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent default form submission behavior

    // Run all validation functions to check the entire form
    const isNameValid = validateName();
    const isAgeValid = validateAge();
    const isEmailValid = validateEmail();
    const isPhoneValid = validatePhone();
    const isGenderValid = validateGender();
    const isPasswordValid = validatePassword();
    const isConfirmPasswordValid = validateConfirmPassword();

    // Get all selected interests using array methods
    // Convert NodeList to Array to use map
    const interestCheckboxes = Array.from(
      document.querySelectorAll('input[name="interests"]:checked')
    );
    // Extract the 'value' from each checked checkbox
    const selectedInterests = interestCheckboxes.map(
      (checkbox) => checkbox.value
    );

    // Log selected interests if any
    if (selectedInterests.length > 0) {
      console.log("Selected interests:", selectedInterests.join(", "));
    }

    // Check if all individual validations passed
    if (
      isNameValid &&
      isAgeValid &&
      isEmailValid &&
      isPhoneValid &&
      isGenderValid &&
      isPasswordValid &&
      isConfirmPasswordValid
    ) {
      // Create a FormData object from the form
      const formData = new FormData(form);
      // Convert FormData to a plain JavaScript object for easier logging/handling
      const formDataObj = Object.fromEntries(formData.entries());

      // Log the collected form data to the console
      console.log("Form submission data:", formDataObj);

      // Display the success message
      successMessage.classList.remove("hidden");

      // Reset the form and hide success message after a delay (3 seconds)
      setTimeout(() => {
        form.reset(); // Clear all form fields
        successMessage.classList.add("hidden"); // Hide the success message
        // Remove success classes from inputs to reset visual state
        nameInput.classList.remove("success");
        ageInput.classList.remove("success");
        emailInput.classList.remove("success");
        phoneInput.classList.remove("success");
        genderSelect.classList.remove("success");
        passwordInput.classList.remove("success");
        confirmPasswordInput.classList.remove("success");
        // Reset password strength meter manually as form.reset() might not trigger its listener
        const strengthBar = document.getElementById("strength-bar");
        const strengthText = document.getElementById("strength-text");
        strengthBar.style.width = "0";
        strengthText.textContent = "Password strength";
        strengthBar.style.backgroundColor = "#eee";
        strengthText.style.color = "#555";
      }, 3000);
    }
  });
});
