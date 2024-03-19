<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Reset Password</title>
<link rel="stylesheet" href="css/styles2.css">
</head>
<body>
<main>
    <!-- Company logo -->
    <img src="images/logo1.jpg" alt="company Logo" width="76px" height="52px" style="margin-left:42%;" >
    <div class="signup-container" id="signinform">
        <!-- Header -->
        <h4 class="signup-header">RESET PASSWORD</h4>
        <!-- Reset password form -->
        <form id="resetPasswordForm" method="post" action="ResetPasswordServlet">
            <!-- Hidden input for email -->
            <input type="hidden" name="email" value="<%= request.getParameter("email") %>">
            <!-- OTP input field -->
            <input type="password" name="otp" placeholder="Enter OTP" required>
            <!-- Verify button -->
            <button type="submit" id="loginButton">Verify</button>
            <!-- Sign in link -->
            <p class="signup-link">Remember your password? <a href="index.jsp" id="close-change-password">Sign In</a></p>
        </form>
        
        <% 
        // Display error message if exists
        String errorMessage = request.getParameter("error");
        if (errorMessage != null && !errorMessage.isEmpty()) { 
        %>
        <!-- Error message display -->
        <div id="errormesssage" style="color:red">
            <%
            // Map error codes to user-friendly error messages
            switch (errorMessage) {
                default:
                    out.print("Invalid OTP");
                    break;
            }
            %>
        </div>
        <% } %>
    </div>
</main>
</body>
</html>
