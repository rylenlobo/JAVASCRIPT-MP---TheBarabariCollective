document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("registrationForm");
  const nameInput = document.getElementById("name");
  const ageInput = document.getElementById("age");
  const emailInput = document.getElementById("email");
  const phoneInput = document.getElementById("phone");
  const genderSelect = document.getElementById("gender");
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirmPassword");
  const successMessage = document.getElementById("successMessage");

  // Error elements
  const nameError = document.getElementById("nameError");
  const ageError = document.getElementById("ageError");
  const emailError = document.getElementById("emailError");
  const phoneError = document.getElementById("phoneError");
  const genderError = document.getElementById("genderError");
  const passwordError = document.getElementById("passwordError");
  const confirmPasswordError = document.getElementById("confirmPasswordError");

  // Validation functions
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

  // Add event listeners for real-time validation
  nameInput.addEventListener("input", validateName);
  ageInput.addEventListener("input", validateAge);
  emailInput.addEventListener("input", validateEmail);
  phoneInput.addEventListener("input", validatePhone);
  genderSelect.addEventListener("change", validateGender);
  passwordInput.addEventListener("input", validatePassword);
  confirmPasswordInput.addEventListener("input", validateConfirmPassword);

  // Add password strength meter functionality
  passwordInput.addEventListener("input", function () {
    const password = passwordInput.value;
    const strengthBar = document.getElementById("strength-bar");
    const strengthText = document.getElementById("strength-text");

    if (password === "") {
      strengthBar.style.width = "0";
      strengthText.textContent = "Password strength";
      return;
    }

    // Calculate password strength
    const criteria = [
      password.length >= 8, // Length
      password.match(/[A-Z]/), // Uppercase
      password.match(/[a-z]/), // Lowercase
      password.match(/[0-9]/), // Numbers
      password.match(/[^A-Za-z0-9]/) // Special chars
    ];

    // Use reduce to count how many criteria are met
    const strength = criteria.reduce(
      (acc, criterion) => acc + (criterion ? 1 : 0),
      0
    );

    // Map the strength to a percentage using array mapping
    const strengthLevels = [
      { threshold: 1, text: "Very Weak", color: "#e74c3c", percent: 20 },
      { threshold: 2, text: "Weak", color: "#e67e22", percent: 40 },
      { threshold: 3, text: "Medium", color: "#f1c40f", percent: 60 },
      { threshold: 4, text: "Strong", color: "#2ecc71", percent: 80 },
      { threshold: 5, text: "Very Strong", color: "#27ae60", percent: 100 }
    ];

    // Find the appropriate strength level
    const strengthLevel =
      strengthLevels.find((level) => strength <= level.threshold) ||
      strengthLevels[strengthLevels.length - 1];

    // Update the strength meter
    strengthBar.style.width = `${strengthLevel.percent}%`;
    strengthBar.style.backgroundColor = strengthLevel.color;
    strengthText.textContent = strengthLevel.text;
    strengthText.style.color = strengthLevel.color;
  });

  // Form submission
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Validate all fields
    const isNameValid = validateName();
    const isAgeValid = validateAge();
    const isEmailValid = validateEmail();
    const isPhoneValid = validatePhone();
    const isGenderValid = validateGender();
    const isPasswordValid = validatePassword();
    const isConfirmPasswordValid = validateConfirmPassword();

    // Get all selected interests using array methods
    const interestCheckboxes = Array.from(
      document.querySelectorAll('input[name="interests"]:checked')
    );
    const selectedInterests = interestCheckboxes.map(
      (checkbox) => checkbox.value
    );

    if (selectedInterests.length > 0) {
      console.log("Selected interests:", selectedInterests.join(", "));
    }

    // If all validations pass
    if (
      isNameValid &&
      isAgeValid &&
      isEmailValid &&
      isPhoneValid &&
      isGenderValid &&
      isPasswordValid &&
      isConfirmPasswordValid
    ) {
      // Create an object with all form data using Object.fromEntries and FormData
      const formData = new FormData(form);
      const formDataObj = Object.fromEntries(formData.entries());

      // Log the collected data
      console.log("Form submission data:", formDataObj);

      // Show success message
      successMessage.classList.remove("hidden");

      // Reset form after successful submission
      setTimeout(() => {
        form.reset();
        successMessage.classList.add("hidden");
        nameInput.classList.remove("success");
        ageInput.classList.remove("success");
        emailInput.classList.remove("success");
        phoneInput.classList.remove("success");
        genderSelect.classList.remove("success");
        passwordInput.classList.remove("success");
        confirmPasswordInput.classList.remove("success");
      }, 3000);
    }
  });
});
