<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
  <head>
    <title>Electricity Bill Update</title>
    <!-- Linking to CSS stylesheet -->
    <link rel="stylesheet" type="text/css" href="css/styles2.css" />
  </head>
  <body>
    <!-- Main section for updating electricity bill -->
    <main id="update-main-ele">
      <h2>Update Electricity Bill</h2>
      <!-- Form for updating electricity bill -->
      <form class="container" id="update-form" method="post" action="ElectricityBillUpdate" enctype="multipart/form-data">
        <!-- Form fields -->
        <div class="form-group">
          <label for="year">Year:</label>
          <!-- Dropdown for selecting year -->
          <select id="year" name="year">
            <option value="2024">2024</option>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
            <option value="2025">2025</option>
          </select>
        </div>

        <div class="form-group">
          <label for="month">Month:</label>
          <!-- Dropdown for selecting month -->
          <select id="month" name="month">
            <option value="January">January</option>
            <option value="February">February</option>
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

        <div class="form-group" id="units-enter">
          <label for="units" style="margin-top:0px; width:10vw;">Units Consumed:</label>
          <!-- Input field for entering units consumed -->
          <input type="number" id="units" placeholder="Enter Units Consumed" name="units" style="width:150px;  padding:3px;"/>
        </div>
        <div class="form-group">
          <!-- File input for uploading image -->
          <label for="image" style="margin-top:0px; width:10vw;">Upload Image:</label>
          <input type="file" id="image" name="image" accept="image/*"   />
        </div>
        
        <!-- Submit button -->
        <button type="button" id="electric-submit">Submit</button>
      </form>
		
      <br />
      <br />
      <hr>
		<hr>
      <!-- Error message display area -->
      <div id="error-message" style="color: red; text-align:center"></div>
      <!-- Year dropdown to filter the table -->
      <div id="select-year">
        <label for="filter-year">Select Year: </label>
        <select id="filter-year" name="filter-year">
          <option value="2024">2024</option>
          <option value="2021">2021</option>
          <option value="2022">2022</option>
          <option value="2023">2023</option>
          <option value="2025">2025</option>
        </select>
      </div>
    
      <!-- Table for displaying electricity bill data -->
      <div id="elec-div">
        <table id="data-table">
          <thead>
            <tr>
              <th>Year</th>
              <th>Month</th>
              <th>Units Consumed</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <!-- Table body content will be dynamically populated -->
            <tr>
            </tr>
          </tbody>
        </table>
      </div>
    </main>

    <!-- JavaScript files inclusion -->
    <script type="application/javascript" src="Js/electricity_bill_updates.js"></script>
    <script type="application/javascript" src="Js/dynamicLoad.js"></script>
    <script type="application/javascript" src="Js/machine_update.js"></script>
    <script type="application/javascript" src="Js/tableupdates1.js"></script>
  </body>
</html>
