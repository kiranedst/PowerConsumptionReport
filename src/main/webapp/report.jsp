<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Update Information</title>
    <!-- Link to external stylesheets -->
    <link rel="stylesheet" type="text/css" href="css/styles2.css" />
</head>
<body>
    <main id="report-main">
        <!-- Year and month selection -->
        <div id="year-month">
            <div id="report-year-select">
                <label for="filter-year">Select Year: </label> 
                <select id="filter-year" name="filter-year">
                    <option value="2024">2024</option>
                    <option value="2021">2021</option>
                    <option value="2022">2022</option>
                    <option value="2023">2023</option>
                    <option value="2025">2025</option>
                </select>
            </div>
            <div id="report-month-select">
                <label for="filter-month" style="margin-left: 15px">Select Month: </label> 
                <select id="filter-month" name="filter-month">
                    <option value="February">February</option>
                    <option value="January">January</option>
                    <option value="March">March</option>
                    <option value="April">April</option>
                    <option value="May">May</option>
                    <option value="June">June</option>
                    <option value="July">July</option>
                    <option value="August">August</option>
                    <option value="September">September</option>
                    <option value="October">October</option>
                    <option value="November">November</option>
                    <option value="December">December</option>
                </select>
            </div>
        </div>
        <br />
        <!-- Table for displaying computed units -->
        <h4 style="text-align: center; margin-bottom: 5px">Computed Units Based on Appliances available</h4>
        <div id="report-scroll">
            <table id="reporttable" class="display">
                <thead>
                    <tr>
                        <th>Items</th>
                        <th>Number of Items</th>
                        <th>Rating (Watts)</th>
                        <th>Duration (Hours)</th>
                        <th>Working Days</th>
                        <th>Units (kWh)</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>
        <!-- Total units for the month -->
        <div id="totalunitsreportmonthly">
            <span> Total Units (kWh) : </span> 
            <span id="reportmonthlytotal"></span>
        </div>
    </main>

    <!-- JavaScript files for functionality -->
    <script type="application/javascript" src="Js/machine_update.js"></script>
    <script type="application/javascript" src="Js/dynamicLoad.js"></script>
    <script type="application/javascript" src="Js/tableupdates1.js"></script>
</body>
</html>
