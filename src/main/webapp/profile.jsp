<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="ISO-8859-1" />
    <title>User Profile</title>
    <link rel="stylesheet" href="CSS/form.css" />
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
    />
  </head>
  <body id="homePage">
    <div class="top-bar">
      <p>Salary Structure Definition</p>
      <div class="fafaicons">
        <a href="#"><i class="fa fa-home"></i> Home</a>
        <a href="#"><i class="fa fa-envelope"></i> Messages</a>
        <a href="#"><i class="fa fa-bell"></i> Notifications</a>
      </div>
    </div>

    <header>
      <div class="logo">
        <img src="images/EDST Logo.jpg" id="edstlogo" />
      </div>
      <nav>
        <a href="home.jsp">Home</a>
        <a href="adminPanel.jsp">Admin</a>
        <a href="EmployeeDetails.jsp">Generate Salary Structure</a>
        <a href="formsDashboard.jsp">Forms</a>
      </nav>
      <!-- Profile Section -->
      <div class="profile-section">
        <div class="user-info">
          <span class="user-name">
            <% String employeeName = (String)
            session.getAttribute("employeeName"); 
            if (employeeName != null) {
            out.println(employeeName); 
            } else { 
            	out.println("Employee Name Not Available"); } %>
          </span>
          <span class="user-id">
            ID: <% String employeeID = (String)
            session.getAttribute("employeeID"); if (employeeID != null) {
            out.println(employeeID); } else { out.println("Employee ID Not Available"); } %>
          </span>
        </div>
        <div class="profile-icon" onclick="toggleDropdown()">
          <img src="images/profileicon.jpg" id="profileicon" />
        </div>
        <div class="dropdown-menu" id="dropdownMenu">
          <a href="profile.jsp">Profile</a>
          <a href="loginPage.jsp" onclick="logout()">Logout</a>
        </div>
      </div>
    </header>

    <div class="containera">
      <h1>User Information</h1>
      <form id="userInformation" action="" method="post">
        <label for="employeeID">Employee ID:</label>
        <input type="text" name="employeeID" id="employeeID" placeholder="Enter
        employee ID" value="<%= session.getAttribute("employeeID") %>" readonly>

        <label for="emailID">E-Mail ID:</label>
        <input type="text" name="emailID" id="emailID" placeholder="Enter email
        ID" value="<%= session.getAttribute("emailID") %>" readonly>

        <label for="employeeName">Name:</label>
        <input type="text" name="employeeName" id="employeeName"
        placeholder="Enter employee name (Full Name)" value="<%=
        session.getAttribute("employeeName") %>" readonly>

        <!-- Add more input fields for other user information -->
        <label for="designation">Designation:</label>
        <input type="text" name="designation" id="designation"
        placeholder="Enter designation" value="<%=
        session.getAttribute("designation") %>" readonly>

        <label for="department">Department:</label>
        <input type="text" name="department" id="department" placeholder="Enter
        department" value="<%= session.getAttribute("department") %>" readonly>

        <label for="location">Company Location:</label>
        <input type="text" name="location" id="location" placeholder="Enter
        company location" value="<%= session.getAttribute("location") %>"
        readonly>
        <!-- Submit Button 
            <button type="submit" name="submitButton">Save</button>-->
      </form>
    </div>

    <div class="containerb">
      <form
        id="changePasswordForm"
        action="changePasswordServlet"
        method="post"
      >
        <h1>Change Password</h1>
        <label for="employeeID">Employee ID:</label>
        <input type="text" name="employeeID" id="employeeID" placeholder="Enter
        employee ID" value="<%= session.getAttribute("employeeID") %>" readonly>

        <label for="oldPassword">Enter Old Password:</label>
        <input
          type="password"
          name="oldPassword"
          id="oldPassword"
          placeholder="Enter Old password"
          required
        />

        <label for="newPassword">Enter Old Password:</label>
        <input
          type="password"
          name="newPassword"
          id="newPassword"
          placeholder="Enter New password"
          required
        />

        <label for="confirmNewPassword">Confirm Password:</label>
        <input
          type="password"
          name="confirmNewPassword"
          id="confirmNewpassword"
          placeholder="Confirm new password"
          required
        />

        <!-- Submit Button -->
        <button type="submit" name="submitButton">Change Password</button>
      </form>
    </div>
    <!-- Add this code where you want to display error/success messages -->
    <% String error = request.getParameter("error"); String success =
    request.getParameter("success"); if (error != null) { 
    	if(error.equals("password_mismatch")) { 
    		out.println("<p style='color: red'>New password and confirm password must match.</p>"); 
    		} else if (error.equals("old_password_mismatch")) { 
    			out.println("<p style='color: red'>Old password is incorrect.</p>"); 
    			} else if (error.equals("user_not_found")) { 
    				out.println("<p style='color: red'>User not found.</p>"); } } 
    if (success != null && success.equals("password_changed")) {
    out.println("<p style='color: green'>Password changed successfully.</p>"); } %>
    <script src="JavaScript/register.js"></script>
  </body>
</html>
