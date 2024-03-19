<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Update Password</title>
<link rel="stylesheet" href="css/styles2.css">
</head>
<body>
<main>
    <!-- Company logo -->
    <img src="images/logo1.jpg" alt="company Logo" width="76px" height="52px" style="margin-left:42%;" >
    <div class="signup-container">
        <!-- Header -->
        <h3 class="signup-header">UPDATE PASSWORD</h3>
        
        <!-- Password update form -->
        <form id="signupform" action="ForgotUpdateServlet" method="post" >
            <!-- Hidden input for email -->
            <input type="hidden" name="email" value="<%= session.getAttribute("email") %>">
           
            <!-- Password input field -->
            <input type="password" name="updatepassword" placeholder="Create a password"  id="password" required> 
    
            <!-- Confirm password input field -->
            <input type="password" name="confirm_update" placeholder="Confirm password" id="confirmPassword" required> 
    
            <!-- Submit button -->
            <button type="submit" id="signupbutton">Update</button>
 
            <!-- Error message section -->
            <div id="errormesssage" style="color:red">
            <% 
                // Display error message if exists
                String errorMessage = request.getParameter("error");
                if (errorMessage != null && !errorMessage.isEmpty()) { 
                %>
                <!-- Error message display -->
                <%
                // Map error codes to user-friendly error messages
                switch (errorMessage) {
                    case "New and confirm passwords do not match":
                        out.print("New and confirm passwords do not match");
                        break;
                    default:
                        out.print("An error occurred.");
                        break;
                }
                }
            %>
            </div>
        </form>
        <!-- Sign-in link -->
        <p class="login-link">Remember Password <a href="index.jsp" id="close-change-password">Signin</a></p>
    </div>
</main>
</body>
</html>
