<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
  <head>
    <!-- Meta information -->
    <meta charset="ISO-8859-1" />
    <title>Change Password</title>
    <!-- Link to external stylesheet -->
    <link rel="stylesheet" href="css/styles2.css" />
  </head>
  <body>
    <main>
      <!-- Back link -->
      <div style="text-align: right">
        <a href="" id="close-change-password">Back</a>
      </div>
      <!-- Logo and change password form -->
      <div class="containerb">
        <img
          src="images/logo.png"
          alt="company Logo"
          width="76px"
          height="52px"
          style="margin-left: 42%"
        /><br />
        <form
          id="changePasswordForm"
          action="changePasswordServlet"
          method="post"
        >
          <h3>Change Password</h3>
          <!-- Employee ID field -->
          <label for="employeeID">Employee ID:</label>
          <input type="text" name="employeeID" id="employeeID" placeholder="Enter employee ID" value="<%= session.getAttribute("employeeID") %>" readonly>
          <!-- Old password field -->
          <label for="oldPassword">Enter Old Password:</label>
          <input
            type="password"
            name="oldPassword"
            id="oldPassword"
            placeholder="Enter Old password"
            required
          />
          <!-- New password field -->
          <label for="newPassword">Enter New Password:</label>
          <input
            type="password"
            name="newPassword"
            id="newPassword"
            placeholder="Enter New password"
            required
          />
          <!-- Confirm new password field -->
          <label for="confirmNewPassword">Confirm New Password:</label>
          <input
            type="password"
            name="confirmNewPassword"
            id="confirmNewpassword"
            placeholder="Confirm new password"
            required
          />
          <!-- Submit Button -->
          <button type="submit" name="submitButton">Submit</button>
        </form>
      </div>

      <% 
        // Error and success messages handling
        String error = request.getParameter("error"); 
        String success = request.getParameter("success"); 
        if (error != null) { // to check if there is a password mismatch.
          if(error.equals("password_mismatch")) { 
            out.println("<p style='color: red'>New password and confirm password must match.</p>"); 
          }
          else if (error.equals("old_password_mismatch")) { //checking if old password is correct or not
            out.println("<p style='color: red'>Old password is incorrect.</p>");
          }
          else if (error.equals("user_not_found")) { //checking if the user is registered in our database
            out.println("<p style='color: red'>User not found.</p>"); 
          }
        }
        
        if (success != null && success.equals("password_changed")) {
          out.println("<p style='color: green'>Password changed successfully.</p>"); 
        } 
      %>
    </main>
    <!-- JavaScript for closing the page -->
    <script>
      // Add an event listener to the "Close" link
      document.querySelector('a[href=""]').addEventListener("click", function (event) {
        // Prevent the default behavior of the link
        event.preventDefault();
        // Go back to the previous page
        history.go(-1);
      });
    </script>
    <!-- External JavaScript file -->
    <script type="application/javascript" src="Js/dynamicLoad.js"></script>
  </body>
</html>
