<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="ISO-8859-1" />
    <link rel="stylesheet" href="css/styles2.css" />
    <title>Registration Page</title>
  </head>
  <body>
    <main>
      <div style="text-align: right">
        <!-- Back link -->
        <a href="" id="close-change-password">Back</a>
      </div>
      <!-- Company logo -->
      <img
        src="images/logo1.jpg"
        alt="company Logo"
        width="76px"
        height="52px"
        style="margin-left: 42%"
      />
      <h3>Registration</h3>
      <!-- Registration message -->
      <div id="registrationMessage" style="text-align: center; color: red">
        <%  
        // Retrieve registration message from request attribute
        String registrationMessage = (String)request.getAttribute("registrationMessage"); 
        if (registrationMessage != null) { %>
        <!-- Display registration message -->
        <h3 id="registrationMessage"><%= registrationMessage %></h3>
        <script>
          // Hide the registration message after 2 seconds
          setTimeout(function () {
            var registrationMessageElement = document.getElementById(
              "registrationMessage"
            );
            registrationMessageElement.style.display = "none";
          }, 2000); // 2 seconds
        </script>
        <% } %>
      </div>
      <!-- Registration form -->
      <form
        id="registrationForm"
        action="registerDetailsServlet"
        method="post"
        onsubmit="return validateForm()"
      >
        <span>
          <label for="employeeID">Employee ID:</label>
          <input
            type="text"
            name="employeeID"
            id="employeeID"
            placeholder="Enter employee ID"
            required
          />
        </span>

        <span>
          <label for="emailID">E-Mail ID:</label>
          <input
            type="text"
            name="emailID"
            id="emailID"
            placeholder="Enter email ID"
            required
          />
        </span>

        <span>
          <label for="employeeName">Employee Name (Full Name):</label>
          <input
            type="text"
            name="employeeName"
            id="employeeName"
            placeholder="Enter employee name (Full Name)"
            required
          />
        </span>

        <span>
          <label for="designation">Designation:</label>
          <input
            type="text"
            name="designation"
            id="designation"
            placeholder="Enter designation"
            required
          />
        </span>

        <span>
          <label for="password">Enter Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter password"
            required
          />
        </span>

        <span>
          <label for="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="Confirm password"
            required
          />
        </span>

        <!-- Submit Button -->
        <button type="submit" name="submitButton">Add</button>
      </form>
    </main>
    <!-- JavaScript to handle the "Back" link -->
    <script>
      // Add an event listener to the "Close" link
      document
        .querySelector('a[href=""]')
        .addEventListener("click", function (event) {
          // Prevent the default behavior of the link
          event.preventDefault();

          // Go back to the previous page
          history.go(-1);
        });
    </script>
    <!-- JavaScript file for form validation -->
    <script src="Js/register.js"></script>
  </body>
</html>
