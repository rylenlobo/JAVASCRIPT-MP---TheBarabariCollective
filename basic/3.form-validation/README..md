# Form Validation Project

## Description

This project implements a client-side registration form validation using HTML, CSS, and JavaScript. It provides real-time feedback to the user as they fill out the form, ensuring data integrity before submission. The form includes various input types and validation rules.

## Features

- **Real-time Validation:** Input fields are validated as the user types or changes selections.
- **Visual Feedback:** Input fields change border colors (green for success, red for error) based on validation status.
- **Clear Error Messages:** Specific error messages are displayed below fields that fail validation.
- **Required Fields:** Name, Age, Email, Phone, Gender, Password, and Confirm Password are required.
- **Specific Validation Rules:**
  - Name: Minimum 3 characters.
  - Age: Must be between 18 and 120.
  - Email: Must follow a standard email format.
  - Phone: Must be exactly 10 digits.
  - Password: Minimum 6 characters.
  - Confirm Password: Must match the entered password.
- **Password Visibility Toggle:** A checkbox allows users to show or hide the password they are typing.
- **Password Strength Meter:** Provides visual feedback on the strength of the entered password (Very Weak, Weak, Medium, Strong, Very Strong).
- **Optional Interests:** Users can select multiple interests via checkboxes.
- **Success Message:** Displays a confirmation message upon successful validation and submission.
- **Form Reset:** Automatically clears the form fields after successful submission.
- **Console Logging:** Logs the submitted form data to the browser's console.
