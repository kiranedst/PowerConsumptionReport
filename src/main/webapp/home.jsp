<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" >
    <title>Power Consumption Report</title>
    <!-- Linking to the CSS file for styling -->
    <link rel="stylesheet" type="text/css" href="css/styles2.css" />
  </head>
  <body class="home-body">
    <!-- Main content section -->
    <main id="home-main">
      <!-- Table for displaying monthly consumption -->
      <table id="home-table">
        <thead>
          <tr>
            <!-- Table header for monthly consumption -->
            <th>&#9733;&nbsp;&nbsp;&nbsp;Electricity Consumption</th>
            <th>Units (kWh)</th>
          </tr>
        </thead>
        <tbody>
          <!-- Table rows for monthly consumption -->
          <tr>
            <td>Average Monthly Consumption</td>
            <td></td>
          </tr>
          <tr>
            <td>Maximum Monthly Consumption</td>
            <td></td>
          </tr>
          <tr>
            <td>Minimum Monthly Consumption</td>
            <td></td>
          </tr>
        </tbody>
      </table>
      <!-- Marquee element for indicating the time frame of the data -->
      <marquee behavior="scroll" direction="left">
        <p class="marquee-para">Last one Year*</p>
      </marquee>
      <br />
      <br />
      <!-- Table for displaying annual consumption -->
      <table id="home-table">
        <thead>
          <tr>
            <!-- Table header for annual consumption -->
            <th>&#9733;&#9733;&nbsp;&nbsp;&nbsp;Electricity Consumption</th>
            <th>Units (kWh)</th>
          </tr>
        </thead>
        <tbody>
          <!-- Table rows for annual consumption -->
          <tr>
            <td>Annual Average Consumption</td>
            <td></td>
          </tr>
          <tr>
            <td>Maximum Annual Consumption</td>
            <td></td>
          </tr>
          <tr>
            <td>Minimum Annual Consumption</td>
            <td></td>
          </tr>
        </tbody>
      </table>
      <!-- Marquee element for indicating the time frame of the data -->
      <marquee behavior="scroll" direction="left">
        <p class="marquee-para">Last three Years**</p>
      </marquee>
    </main>
    <!-- JavaScript files for various functionalities -->
    <script type="application/javascript" src="Js/script2.js"></script>
    <script type="application/javascript" src="Js/dynamicLoad.js"></script>
    <script type="application/javascript" src="Js/tableupdates1.js"></script>
  </body>
</html>
