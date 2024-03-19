<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>

<%@ page import="java.io.FileReader"%>
<%@ page import="java.io.FileWriter"%>
<%@ page import="java.io.IOException"%>
<%@ page import="org.json.simple.JSONArray"%>
<%@ page import="org.json.simple.JSONObject"%>
<%@ page import="org.json.simple.parser.JSONParser"%>

<%
// Check if user is blocked or deleted
String employeeID = (String) session.getAttribute("employeeID");
if (employeeID != null) {
    boolean userFound = false; // Flag to check if the user exists
    boolean userBlocked = false; // Flag to check if the user is blocked

    // Parsing the JSON file to check user status
    JSONParser parser = new JSONParser();
    try {
        JSONArray userList = (JSONArray) parser
            .parse(new FileReader("D:\\PCR\\src\\main\\webapp\\register_details.json"));

        // Iterating through the user list
        for (Object obj : userList) {
            JSONObject user = (JSONObject) obj;
            if (user.get("employeeID").equals(employeeID)) {
                userFound = true; // User found in the list
                if (Boolean.TRUE.equals(user.get("blocked"))) {
                    userBlocked = true; // User is blocked
                }
                break;
            }
        }

        // Check user status and handle accordingly
        if (!userFound || userBlocked) {
            // User is not found or is blocked, prevent login and redirect to login page
            response.sendRedirect("loginPage.jsp");
        }
    } catch (Exception e) {
        e.printStackTrace();
    }
}
%>

<!DOCTYPE html>
<html>
<head>
    <meta charset="ISO-8859-1">
    <!-- Linking to CSS stylesheet -->
    <link rel="stylesheet" href="css/styles2.css">
    <!-- Viewport meta tag for responsiveness -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0" >
    <title>Login Page</title>
</head>
<body style="background-image: url('images/banner-pic.png'); background-repeat: no-repeat;">

<main id="login-main">
    <!-- Company Logo -->
    <img src="images/logo.png" id="login-img" alt="company Logo" width="76px" height="52px" style="margin-left: 42%;">
    <p id="login-page-p">Welcome Back!</p>
    <div id="loginMessage" style="text-align: center; color: red;">
        <%-- Display login messages if any --%>
        <%
        // Checking if registrationMessage is not null and displaying it
        String registrationMessage = (String) request.getAttribute("loginMessage");
        if (registrationMessage != null) {
        %>
        <h3 id="loginMessage"><%=registrationMessage%></h3>
        <script>
            // Hide the registration message after 2 seconds
            setTimeout(function() {
                var registrationMessageElement = document.getElementById("loginMessage");
                registrationMessageElement.style.display = 'none';
            }, 2000); // 2 seconds
        </script>
        <%
        }
        %>
    </div>
    <!-- Login form -->
    <form id="loginDetails" action="loginValidateServlet" method="post" onsubmit="return validateLoginForm()">
        <!-- Email and Password Input Fields -->
        <span>
            <label for="emailID">E-mail :</label>
            <input type="text" name="emailID" id="emailID" placeholder="Enter email ID" required>
        </span>
        <span>
            <label for="password">Password:</label>
            <input type="password" name="password" id="password" placeholder="Enter password" required>
        </span>

        <!-- Submit Button -->
        <button type="submit" name="submitButton">Login</button>
        <br>
        <!-- Forgot Password link -->
        <span>
            <p>
                Forgot Password? <a href="ForgotPassword.jsp" id="forgot-btn">Click Here</a>
            </p>
        </span>
    </form>
</main>

<footer>
    <!-- Copyright and Version Information -->
    <p class="copyright">@2024, EDS Technologies Pvt Ltd. All rights reserved</p>
    <p class="version">Ver.1.0Dt18-Jan-2024*D1.0-19-Jan-2024 11:26 AM</p>
</footer>

<!-- JavaScript File Inclusion -->
<script src="Js/register.js"></script>
</body>
</html>
