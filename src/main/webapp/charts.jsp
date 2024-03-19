<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<!-- Title -->
<title>Chart</title>
<!-- chart.js library -->
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<!-- chart.js datalabels plugin -->
<script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels@2.0.0"></script>
<script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels"></script>
<!-- chart.js library hand gesture -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/hammer.js/2.0.8/hammer.min.js" integrity="sha512-UXumZrZNiOwnTcZSHLOfcTs0aos2MzBWHXOHOuB0J/R44QB0dwY5JgfbvljXcklVf65Gc4El6RjZ+lnwd2az2g==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<!-- chart.js library for zoom -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/chartjs-plugin-zoom/2.0.1/chartjs-plugin-zoom.min.js" integrity="sha512-wUYbRPLV5zs6IqvWd88HIqZU/b8TBx+I8LEioQ/UC0t5EMCLApqhIAnUg7EsAzdbhhdgW07TqYDdH3QEXRcPOQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<!-- link to custom css file  -->
<link rel="stylesheet" type="text/css" href="css/styles2.css" />
</head>
<body>
<!-- Main section of the page -->
	<main id="chart-main">
		<div id="chart">  
			<div id="chart1">
				<canvas id="myChart1" width="600px;" height="540px;"
					style="margin-right: 10px"></canvas>
			</div>
			<div id="chart2">
				<canvas id="myChart2" width="600px;" height="500px;"
					style="margin-left: 10px"></canvas>
			</div>
		</div>
	</main>
	<!-- Javascript function for plotting first graph -->
	<script>
      // Function to fetch JSON file
      function fetchJSON(callback) {
        fetch("BillTable")
          .then((response) => response.json())
          .then((data) => callback(data))
          .catch((error) => console.error("Error fetching JSON:", error));
      }

      // Define colors array
      var colors = [
        "rgba(255, 0, 0, 0.2)",
        "rgba(0, 255, 0, 0.2)",
        "rgba(0, 0, 255, 0.2)",
        "rgba(255, 255, 0, 0.2)",
        "rgba(255, 0, 255, 0.2)",
        "rgba(0, 255, 255, 0.2)",
        "rgba(128, 0, 0, 0.2)",
        "rgba(0, 128, 0, 0.2)",
        "rgba(0, 0, 128, 0.2)",
        "rgba(128, 128, 128, 0.2)",
      ];

      // Callback function to handle JSON data
      function handleJSON(jsonData) {
        // Extracting data from JSON and sorting
        var sortedData = Object.keys(jsonData).sort(function (a, b) {
          var [aYear, aMonth] = a.split("-");
          var [bYear, bMonth] = b.split("-");
          return (
            new Date(
              parseInt(aYear),
              new Date(Date.parse(aMonth + " 1, 2000")).getMonth()
            ) -
            new Date(
              parseInt(bYear),
              new Date(Date.parse(bMonth + " 1, 2000")).getMonth()
            )
          );
        });

        var months = [];
        var units = [];
        var years = []; // New array to hold years for tooltip
        var colorsMap = {}; // Object to hold color mapping for years

        sortedData.forEach(function (key) {
          var data = jsonData[key];
          var year = data.Year;

          if (!(year in colorsMap)) {
            // If year not in color mapping, assign a color
            colorsMap[year] = colors.shift();
          }

          months.push(data.Month.substring(0, 3) + " " + year); // Concatenate month and year
          units.push(parseFloat(data.Units));
          years.push(year); // Collecting years
        });
        // Create a bar graph
        var ctx = document.getElementById("myChart1").getContext("2d");
        var chart = new Chart(ctx, {
          type: "bar",
          data: {
            labels: months,
             datasets: [
              {
                label: "Units",
                data: units,
                backgroundColor: years.map((year) => colorsMap[year]), // Get color based on year
                borderColor: years.map((year) =>
                  colorsMap[year].replace("0.2", "1")
                ), // Darker version of colors
                borderWidth: 1,
              },
            ], 
          },
          plugins: [ChartDataLabels],
          options: {
        	  scales: {
                  y: {
                    beginAtZero: true,
                    title: {
                      display: true,
                      text: "Units (KWh)",
                    },
                  },
                  x: {
                    title: {
                      display: true,
                      text: "Month",
                    },
                  },
                },
               
                plugins: {
              title: {
                display: true,
                text: "Monthly units consumption",
              },
              datalabels: {
                anchor: "end", // Position the labels at the end of the bars
                align: "top", // Align the labels at the top of the bars
                rotation: -90, // Rotate the labels by -90 degrees (vertical text)
                color: "black", // Color of the labels
                font: {
                  weight: "bold",
                  size:"9vw"// Font weight of the labels
                },formatter: function(value) {
                    // Use the toLocaleString() method to format the value with commas
                    return value.toLocaleString();
                }
              },
              zoom:{
            	       
            	  zoom:{
            		   
            		   overScaleMode:'xy', 
            		     wheel:{
            			  enabled:true,
            			  speed:0.1
            		  },   
            		   drag:{
            			  enabled:true
            		  } 
              
            	  }  
              }
            },
            
            tooltips: {
              callbacks: {
                title: function (tooltipItems, data) {
                  var index = tooltipItems[0].index;
                  return data.labels[index];
                },
              },
            },
          },
        });
        
      }
	
      // Call fetchJSON function to load JSON data
      fetchJSON(handleJSON);
    </script>

	<script>
      // Fetch data from JSON file
      fetch("BillTable")
        .then((response) => response.json())
        .then((data) => {
          // Process the data
          const totalUnitsByYear = {};

          // Calculate total units consumed for each year
          for (const key in data) {
            const year = data[key].Year;
            const units = parseFloat(data[key].Units);

            if (totalUnitsByYear[year]) {
              totalUnitsByYear[year] += units;
            } else {
              totalUnitsByYear[year] = units;
            }
          }

          // Extract years and total units consumed for the chart
          const years = Object.keys(totalUnitsByYear);
          const totalUnits = Object.values(totalUnitsByYear);

          // Create a chart using Chart.js
          const ctx = document.getElementById("myChart2").getContext("2d");
          const chart = new Chart(ctx, {
            type: "bar",
            data: {
              labels: years,
              datasets: [
                {
                  label: "Total Units Consumed annually",
                  data: totalUnits,
                  backgroundColor: "rgba(54, 162, 235, 0.6)",
                  borderColor: "rgba(54, 162, 235, 1)",
                  borderWidth: 1,
                },
              ],
            },
            plugins: [ChartDataLabels],
            options: {
              plugins: {
                title: {
                  display: true,
                  text: "Annual Units Consumption",
                },
                datalabels: {
                  anchor: "end", // Position the labels at the end of the bars
                  align: "top", // Align the labels at the top of the bars
                  rotation: -90, // Rotate the labels by -90 degrees (vertical text)
                  color: "black", // Color of the labels
                  font: {
                    weight: "bold", // Font weight of the labels
                  },formatter: function(value) {
                      // Use the toLocaleString() method to format the value with commas
                      return value.toLocaleString();
                  }
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                  title: {
                    display: true,
                    text: "Units (KWh)",
                  },
                },
                x: {
                  title: {
                    display: true,
                    text: "Year",
                  },
                },
              },
              tooltips: {
                callbacks: {
                  title: function (tooltipItems, data) {
                    var index = tooltipItems[0].index;
                    return data.labels[index];
                  },
                },
              },
            },
          });
        })
        .catch((error) => console.error("Error fetching data:", error));
    </script>
	<script type="application/javascript" src="Js/dynamicLoad.js"></script>
	<script type="application/javascript" src="Js/tableupdates1.js"></script>
</body>
</html>
