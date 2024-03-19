// Function to validate the registration form
function validateForm() {
  // Retrieve form input elements
  var employeeID = document.getElementById("employeeID");
  var emailID = document.getElementById("emailID");
  var employeeName = document.getElementById("employeeName");
  var designation = document.getElementById("designation");
  var password = document.getElementById("password");
  var confirmPassword = document.getElementById("confirmPassword");

  // Regular expressions for validation
  var employeeIDRegex = /^\d{6}$/; // 6 digit number only
  var emailIDRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,12}$/; // At least one uppercase, lowercase, special character, and number, min length 8, max length 12
  var employeeNameRegex = /^[A-Za-z\s]+$/;
  var designationRegex = /^[A-Za-z\s]+$/;

  var isValid = true;

  // Employee ID validation
  if (!employeeID.value.match(employeeIDRegex)) {
    alert("Please enter a valid 6-digit Employee ID.");
    employeeID.style.borderColor = "red";
    isValid = false;
  } else {
    employeeID.style.borderColor = "green"; // Reset border color if valid
  }

  // Email ID validation
  if (!emailID.value.match(emailIDRegex)) {
    alert("Please enter a valid EmailID");
    emailID.style.borderColor = "red";
    isValid = false;
  } else {
    emailID.style.borderColor = "green"; // Reset border color if valid
  }

  // Employee Name validation
  if (!employeeName.value.match(employeeNameRegex)) {
    alert("Please enter a valid Employee Name.");
    employeeName.style.borderColor = "red";
    isValid = false;
  } else {
    employeeName.style.borderColor = "green"; // Reset border color if valid
  }

  // Designation validation
  if (!designation.value.match(designationRegex)) {
    alert("Please enter a valid Designation.");
    designation.style.borderColor = "red";
    isValid = false;
  } else {
    designation.style.borderColor = "green"; // Reset border color if valid
  }

  // Password validation
  if (!password.value.match(passwordRegex)) {
    alert(
      "Password should contain at least one uppercase letter, one lowercase letter, one special character, one number, and be between 8 and 12 characters long."
    );
    password.style.borderColor = "red";
    isValid = false;
  } else {
    password.style.borderColor = "green"; // Reset border color if valid
  }

  // Confirm Password validation
  if (password.value !== confirmPassword.value) {
    alert("Password and confirm password do not match.");
    confirmPassword.style.borderColor = "red";
    isValid = false;
  } else {
    confirmPassword.style.borderColor = "green"; // Reset border color if valid
  }

  return isValid;
}

// Function to validate the login form
function validateLoginForm() {
  var emailID = document.getElementById("emailID").value;
  var password = document.getElementById("password").value;

  // Regular expressions for validation
  var emailIDRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Email validation regex
  var passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,12}$/; // Password validation regex

  var isValid = true;

  // Email ID validation
  if (!emailID.match(emailIDRegex)) {
    alert("Please enter a valid EmailID");
    emailID.style.borderColor = "red";
    isValid = false;
  } else {
    emailID.style.borderColor = "green"; // Reset border color if valid
  }

  // Password validation
  if (!password.match(passwordRegex)) {
    alert(
      "Password should contain at least one uppercase letter, one lowercase letter, one special character, one number, and be between 8 and 12 characters long."
    );
    password.style.borderColor = "red";
    isValid = false;
  } else {
    password.style.borderColor = "green"; // Reset border color if valid
  }

  return isValid;
}

// Function to toggle dropdown menu visibility
function toggleDropdown() {
  var dropdownMenu = document.getElementById("dropdownMenu");
  if (dropdownMenu.style.display === "block") {
    dropdownMenu.style.display = "none";
  } else {
    dropdownMenu.style.display = "block";
  }
}

// Function to logout user
function logout() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "Logout", true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      // Clear browser history and redirect to login page
      clearBrowserHistoryAndRedirect();
    }
  };
  xhr.send();
}

// Function to clear browser history and redirect to login page
function clearBrowserHistoryAndRedirect() {
  window.history.forward();
  history.pushState(null, null, location.href);
  window.onpopstate = function () {
    window.location.href = "index.jsp";
  };
}
