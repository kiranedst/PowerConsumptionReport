<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Forgot Password</title>
<link rel="stylesheet" href="css/styles2.css">
</head>
<body>
<main>
    <!-- Company logo -->
    <img src="images/logo.png" alt="company Logo" width="76px" height="52px" style="margin-left:42%;" >
    <div class="signup-container" id="signinform">
        <!-- Header for forgot password -->
        <h4 class="signup-header">FORGOT PASSWORD</h4>
        <!-- Form for submitting email for password recovery -->
        <form id="loginform" method="post" action="ForgotPasswordServlet">
            <input type="text" name="email" id="loginEmail" placeholder="Enter email ID" required><!--  input field for collecting email -->
            <button type="submit" id="loginButton">Submit</button>
        </form>
        
        <% 
        /* Block to display error message if present */
        String errorMessage = request.getParameter("error");
        if (errorMessage != null && !errorMessage.isEmpty()) { 
        %>
        <!-- Display error message in case of error -->
        <div id="errormesssage2" style="color:red; text-align: center;"> 
            <%
            switch (errorMessage) {
                case "Invalid Email":
                    out.print("Invalid Email, Signup with Email and UserName");
                    break;
                default:
                    out.print("An error occurred.");
                    break;
            }
            %>
        </div>
        <% } %>
    </div>
    <!-- Script to hide error message after 3 seconds -->
    <script>
        setTimeout(function(){
            var displayErrorMessage = document.getElementById('errormesssage2');
            displayErrorMessage.style.display = "none";
        }, 3000);
    </script>
</main>
</body>
</html>
