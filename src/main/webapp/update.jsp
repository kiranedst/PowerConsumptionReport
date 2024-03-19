<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Update Information</title>
    <!-- Link to external stylesheet -->
    <link rel="stylesheet" type="text/css" href="css/styles2.css" />
</head>
<body>
    <!-- Main content section -->
    <main id="update-main">
        <!-- Form section for adding fields -->
        <section>
            <!-- Form for adding new fields -->
            <form id="add-field-form">
                <div id="add-fields">
                    <div class="update-field-class">
                        <label for="fieldName">Name of the field to be added:</label> 
                        <input type="text" id="fieldName" name="fieldname" />
                    </div>
                    <div class="update-field-class">
                        <label for="rating" style="margin-left: 20px">Rating (W):</label>
                        <input type="text" id="rating" name="rating" />
                    </div>
                    <div>
                        <button type="button" id="addField">Add</button>
                    </div>
                </div>
                <!-- Error message section for field addition -->
                <div id="error-message-add" style="color: red; text-align: center"></div>
            </form>
        </section>
        <!-- Horizontal line separator -->
        <hr />
        <hr />
        <section>
            <!-- Update details section -->
            <h2>Update Details</h2>
            <div id="update-div">
                <!-- Table for displaying update details -->
                <table id="updatetable">
                    <thead>
                        <!-- Table header -->
                        <tr>
                            <th>Item</th>
                            <th>Number of Items</th>
                            <th>Rating (Watts)</th>
                            <th>Duration (Hours)</th>
                            <th>Working Days</th>
                            <th>Units (kWh)</th>
                            <th>Button</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- Table body -->
                        <tr></tr>
                    </tbody>
                </table>
            </div>
            <!-- Error message section for saving -->
            <div id="error-message-save" style="color: red; text-align: center"></div>
            <!-- Total units and save button section -->
            <div id="totalunits-save">
                <label for="totalUnits">Total Units (kWh):</label> 
                <input type="text" id="totalUnits" name="totalUnits" />
                <button type="button" id="total-save">Save</button>
            </div>
        </section>
    </main>
    <!-- JavaScript for formatting rating input -->
    <script>
    document.addEventListener('DOMContentLoaded', function () {
        var ratingInput = document.getElementById('rating');

        // Function to add commas to the number with decimal places
        function addCommas(input) {
            // Regex to match characters that are not digits or a dot
            var nonDigitsOrDot = /[^\d.]/g;

            // Remove non-digits and add commas
            var parts = input.split('.');
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            return parts.join('.');
        }

        ratingInput.addEventListener('input', function (event) {
            // Get the current value of the input field
            var inputValue = event.target.value;

            // Remove non-digit characters except dots and add commas
            var formattedValue = addCommas(inputValue.replace(/[^\d.]/g, ''));

            // Update the input field value with formatted value
            event.target.value = formattedValue;
        });
    });
    </script>
    <!-- JavaScript files for various functionalities -->
    <script type="application/javascript" src="Js/machine_update.js"></script>
    <script type="application/javascript" src="Js/dynamicLoad.js"></script>
    <script type="application/javascript" src="Js/tableupdates1.js"></script>
</body>
</html>
