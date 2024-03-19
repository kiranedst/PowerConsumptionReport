<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
pageEncoding="ISO-8859-1"%>
<!-- navbar.html -->

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Navbar</title>

    <!-- Link the CSS file -->
    <link rel="stylesheet" type="text/css" href="css/styles2.css" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
    />
</head>
<body>
    <header>
        <!-- Header title -->
        <p>Power Consumption Report</p>
        <div class="fafaicons">
            <!-- Company contact and social media icons -->
            <a href="https://edstechnologies.com/"><i class="fa-solid fa-globe"></i><span id="website-a">Website</span></a>
            <a href="mailto:info@edstechnologies.com"><i class="fa-solid fa-envelope"></i><span id="mail-a">info@edstechnologies.com</span></a>
            <a href="https://www.facebook.com/edstechnologies"><i class="fa-brands fa-facebook"></i></a>
            <a href="https://www.linkedin.com/company/eds-technologies"><i class="fa-brands fa-linkedin"></i></a>
            <a href="https://twitter.com/edstechnologies"><i class="fa-brands fa-square-x-twitter"></i></a>
            <a href="http://www.youtube.com/user/edstechnologies"><i class="fa-brands fa-youtube"></i></a>
        </div>
    </header>
    
    <nav>
        <!-- Company logo and navigation links -->
        <img id="nav-image" src="images/logo1.jpg" alt="company Logo" width="76px" height="52px" />
        <ul class="sidebar">
            <!-- Close sidebar button -->
            <li onclick="
                const sidebar= document.querySelector('.sidebar');
                sidebar.style.display='none';
            "><a href="#" ><span class="material-symbols-outlined">close</span></a></li>
            <!-- Navigation links -->
            <li><a href="home.jsp">Home</a></li>
            <li class="dropdown">
                <a href="#">Update</a>
                <div class="dropdown-content">
                    <a href="update.jsp">Machine Details</a>
                    <a href="electricity_bill_update.jsp">Electricity Bill</a>
                </div>
            </li>
            <li><a href="charts.jsp">Unit Analysis</a></li>
            <li><a href="report.jsp">Report</a></li>
            <li><a href="#dogs">Profile</a></li>
        </ul>
        
        <ul>
            <!-- Additional navigation links -->
            <li class="hideonmobile"><a href="home.jsp">Home</a></li>
            <li class="dropdown hideonmobile">
                <a href="#">Update</a>
                <div class="dropdown-content">
                    <a href="update.jsp">Machine Details</a>
                    <a href="electricity_bill_update.jsp">Electricity Bill</a>
                </div>
            </li>
            <li class="hideonmobile"><a href="charts.jsp">Unit Analysis</a></li>
            <li class="hideonmobile"><a href="report.jsp">Report</a></li>
            <li class="hideonmobile"><a href="#dogs">Profile</a></li>
            <!-- Menu button for mobile -->
            <li class="menu-btn" onclick="
                const sidebar= document.querySelector('.sidebar');
                sidebar.style.display='flex';
            "><a href="#"><span class="material-symbols-outlined">menu</span></a></li>
        </ul>
    </nav>
    
    <!-- pop-up dialog box, containing a form -->
    <div class="modal" id="dogs">
        <div class="modal-container">
            <h3 style="text-align: center">Profile</h3>
            <br />
            <div class="containera" style="text-align: center">
                <div style="text-align: left">
                    Employee ID &nbsp;: <%= session.getAttribute("employeeID") %>
                </div>
                <p style="text-align: left">
                    Email
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
                    <%= session.getAttribute("emailID") %>
                </p>
                <p style="text-align: left">
                    Name
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
                    <%= session.getAttribute("employeeName") %>
                </p>
                <p style="text-align: left">
                    Designation &nbsp;&nbsp;: <%= session.getAttribute("designation") %>
                </p>
                <br />
                <p>
                    <a href="changePassword.jsp" id="changepassword">change password</a>
                </p>
                <button id="logoutbtn"><a href="index.jsp">Logout</a></button>
                <!-- <button type="button" id="logout-btn">Logout</button> -->
            </div>
            <a href="#modal-close" id="modal-close-a">Close</a>
        </div>
    </div>

    <!-- JavaScript to handle dropdown and mobile menu -->
    <script>
        // dynamicLoad.js
        const updateLink = document.querySelector("nav li:nth-child(2) a");
        updateLink.addEventListener("click", function () {
            const dropdown = this.nextElementSibling;
            dropdown.classList.toggle("show"); // Add or remove the "show" class to toggle visibility
        });
    </script>

    <!-- JavaScript file for additional functionality -->
    <script type="text/javascript" src="Js/register.js"></script>
</body>
</html>
