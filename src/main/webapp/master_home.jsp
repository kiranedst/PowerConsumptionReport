<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Power Consumption Report</title>
    <!-- Link to external stylesheets -->
    <link rel="stylesheet" href="css/styles2.css" />
    <link rel="stylesheet" href="path/to/font-awesome/css/font-awesome.min.css">
</head>

<body>
    <header>
        <!-- Header title -->
        <h6>Power Consumption Report</h6>
    </header>

    <nav>
        <!-- Navigation menu with company logo and logout link -->
        <img src="images/logo1.jpg" alt="company Logo" width="76px" height="52px" id="masterlogo" />
        <ul>
            <li><a href="index.jsp">Logout</a></li>
        </ul>
    </nav>

    <main id="master-home">
        <!-- Button to add admin -->
        <div>
            <button><a href="registrationPage.jsp">Add Admin</a></button>
        </div>
        <br />
        <br />
        <!-- Table for displaying data -->
        <table id="master-table">
            <thead>
                <tr>
                    <!-- Table headers -->
                    <th>Name</th>
                    <th>Emp Id</th>
                    <th>Email</th>
                    <th>Designation</th>
                    <th>Status</th>
                    <th>Button</th>
                </tr>
            </thead>
            <tbody></tbody>
        </table>
    </main>

    <!-- Scripts for updating table and registration -->
    <script src="Js/tableupdates1.js"></script>
    <script src="Js/register.js"></script>
</body>
</html>
