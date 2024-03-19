// This function is executed when the window has loaded
window.onload = function () {
  // Fetch data from the backend when the window loads
  fetchDataFromBackend();
  // Fetch master table data from the backend when the window loads
  fetchMasterTableFromBackend();
  // Load bill data for the current year when the window loads
  loadCurrentYearBillData();
};

// This function is executed when a form is submitted
window.onsubmit = function () {
  // Fetch data from the backend when the form is submitted
  fetchDataFromBackend();
  // Fetch master table data from the backend when the form is submitted
  fetchMasterTableFromBackend();
  // Load bill data for the current year when the form is submitted
  loadCurrentYearBillData();
};

// Function to load bill data for the current year
function loadCurrentYearBillData() {
  // Get the current date
  const currentDate = new Date();
  // Get the current year
  const currentYear = currentDate.getFullYear();
  // Get the name of the current month
  const currentMonth = currentDate.toLocaleString("default", { month: "long" });

  // Fetch bill data for the current year from the backend
  fetchBillDataFromBackend(currentYear);
  // Fetch data for the report for the current year and month from the backend
  fetchDataFromBackendForReport(currentYear, currentMonth);
}

// Event listener for changes in the filter year select element
document.getElementById("filter-year").addEventListener("change", function () {
  // Get the selected year from the filter
  var selectedYear = this.value;
  // Fetch bill data for the selected year from the backend
  fetchBillDataFromBackend(selectedYear);
});

// Function to handle changes in the filter select elements
function handleFilterChange() {
  // Get the selected year from the filter
  var selectedYear = document.getElementById("filter-year").value;
  // Get the selected month from the filter
  var selectedMonth = document.getElementById("filter-month").value;

  // Fetch data for the report for the selected year and month from the backend
  fetchDataFromBackendForReport(selectedYear, selectedMonth);
}

// Event listener for changes in the filter year select element
document.getElementById("filter-year").addEventListener("change", handleFilterChange);
// Event listener for changes in the filter month select element
document.getElementById("filter-month").addEventListener("change", handleFilterChange);

// Function to fetch master table data from the backend
function fetchMasterTableFromBackend() {
  // Create a new XMLHttpRequest object
  var xhr = new XMLHttpRequest();
  // Open a GET request to the "MasterTable" endpoint
  xhr.open("GET", "MasterTable", true);

  // Event listener to handle changes in the state of the request
  xhr.onreadystatechange = function () {
    // Check if the request is complete
    if (xhr.readyState === XMLHttpRequest.DONE) {
      // Check if the request was successful (status code 200)
      if (xhr.status === 200) {
        // Parse the response data as JSON
        var responseData = JSON.parse(xhr.responseText);
        // Call the function to populate the master table with the retrieved data
        populateMasterTable(responseData);
        // Populate table with retrieved data
      } else {
        // Log an error message if the request was not successful
        console.error("Error:", xhr.status);
      }
    }
  };

  // Send the request
  xhr.send();
}


// Function to populate the master table with data
function populateMasterTable(data) {
  // Select the table body element where data will be populated
  var tableBody = document.querySelector("#master-table tbody");
  // Clear existing table rows
  tableBody.innerHTML = "";

  // Iterate through the data and create table rows
  data.forEach(function (item) {
    // Create a new row for each item in the data
    var newRow = tableBody.insertRow();

    // Set data-email attribute to the row
    newRow.setAttribute("data-email", item.emailID);

    // Insert cells and populate with data
    var nameCell = newRow.insertCell();
    var empIdCell = newRow.insertCell();
    var emailCell = newRow.insertCell();
    var designationCell = newRow.insertCell();
    var statusCell = newRow.insertCell();
    var buttonCell = newRow.insertCell();

    // Populate cells with corresponding data
    nameCell.textContent = item.employeeName;
    empIdCell.textContent = item.employeeID;
    emailCell.textContent = item.emailID;
    designationCell.textContent = item.designation;

    // Determine the status based on the last active date
    var lastActiveDate = new Date(item.lastActiveDate);
    var currentDate = new Date();
    var oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    // Set the status cell text and add a class if not working
    if (lastActiveDate >= oneMonthAgo) {
      statusCell.textContent = "Working";
    } else {
      statusCell.textContent = "Not Working";
      newRow.classList.add("not-working"); // Add class to indicate user is not working
    }

    // Create delete button
    var deleteButton = document.createElement("button");
    deleteButton.className = "disable-btn";
    deleteButton.textContent = "Delete";

    // Attach click event to delete button
    deleteButton.onclick = function () {
      // Call deleteRow function passing email ID as parameter
      deleteRow(item.emailID);
    };

    // Append delete button to the button cell
    buttonCell.appendChild(deleteButton);

    // Disable delete button if there is only one row in the table
    if (tableBody.rows.length === 1) {
      deleteButton.disabled = true;
    }
  });
}


// Function to delete a row from the master table based on the provided emailID
function deleteRow(emailID) {
  // Send an AJAX request to delete the emailID from the backend
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "DeleteEmailServlet", true);
  // Set the content type header
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  // Prepare data to be sent in the request
  var data = "emailID=" + encodeURIComponent(emailID);

  // Event listener to handle changes in the state of the request
  xhr.onreadystatechange = function () {
    // Check if the request is complete and successful
    if (xhr.readyState === 4 && xhr.status === 200) {
      // Find the row to remove from the table
      var rowToRemove = document.querySelector('tr[data-email="' + emailID + '"]');
      // Remove the row from the table
      rowToRemove.parentNode.removeChild(rowToRemove);
    }
  };

  // Send the request with the prepared data
  xhr.send(data);
}

// Function to fetch data from the backend
function fetchDataFromBackend() {
  // Create a new XMLHttpRequest object
  var xhr = new XMLHttpRequest();
  // Open a GET request to the "AddDataServlet" endpoint
  xhr.open("GET", "AddDataServlet", true);

  // Event listener to handle changes in the state of the request
  xhr.onreadystatechange = function () {
    // Check if the request is complete
    if (xhr.readyState === XMLHttpRequest.DONE) {
      // Check if the request was successful (status code 200)
      if (xhr.status === 200) {
        // Parse the response data as JSON
        var responseData = JSON.parse(xhr.responseText);
        // Call the function to populate the table with the retrieved data
        populateTable(responseData);
        // Populate table with retrieved data
      } else {
        // Log an error message if the request was not successful
        console.error("Error:", xhr.status);
      }
    }
  };

  // Send the request
  xhr.send();
}


// Function to populate the table with data
function populateTable(data) {
  // Get the current date and year
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  // Set the current date to one month ago
  currentDate.setMonth(currentDate.getMonth() - 1);

  // Get the name of the current month
  const currentMonth = currentDate.toLocaleString("default", { month: "long" });
  
  // Get the table element by ID
  var tab = document.getElementById("updatetable");

  // Iterate through the data and create table rows
  for (var key in data) {
    if (data.hasOwnProperty(key)) {
      // Create a new row for each item in the data
      var newRow = tab.insertRow();
      // Insert cells for each field
      var newItemCell = newRow.insertCell();
      var newNumberCell = newRow.insertCell();
      var newRatingCell = newRow.insertCell();
      var newDurationCell = newRow.insertCell();
      var newWorkingCell = newRow.insertCell();
      var newUnitsCell = newRow.insertCell();
      var newDeleteCell = newRow.insertCell();

      // Set the content of the first cell with input text field
      newItemCell.innerHTML = `<input type="text" id="${key}" value="${key}">`;

      // Create input elements for number, rating, duration, working days, and units
      var numberInput = document.createElement("input");
      numberInput.setAttribute("type", "number");
      numberInput.setAttribute("id", `${key}Number`);
      newNumberCell.appendChild(numberInput);

      var ratingInput = document.createElement("input");
      ratingInput.setAttribute("type", "text");
      ratingInput.setAttribute("style","text-align:right")
      ratingInput.setAttribute("id", `${key}Rating`);
      ratingInput.setAttribute("value", Number(data[key]["fieldRating"]).toLocaleString());
      newRatingCell.appendChild(ratingInput);

      var durationInput = document.createElement("input");
      durationInput.setAttribute("type", "number");
      durationInput.setAttribute("id", `${key}Duration`);
      newDurationCell.appendChild(durationInput);

      var WorkingDaysInput = document.createElement("input");
      WorkingDaysInput.setAttribute("type", "number");
      WorkingDaysInput.setAttribute("id", `${key}WorkingDays`);
      newWorkingCell.appendChild(WorkingDaysInput);

      var unitsInput = document.createElement("input");
      unitsInput.setAttribute("type", "text");
      unitsInput.setAttribute("id", `${key}Units`);
      unitsInput.setAttribute("style","text-align:right")
      newUnitsCell.appendChild(unitsInput);

      // Create a delete button for each row
      newDeleteCell.innerHTML = `<button type="button" id="${key}Delete" onclick="deleteRow1(this)">Delete</button>`;

      // Add event listeners to each input field
      addEventListeners(
        numberInput,
        ratingInput,
        durationInput,
        WorkingDaysInput,
        unitsInput
      );
    }
  }
  // Fetch data from the backend for update
  fetchDataFromBackendForUpdate(currentYear, currentMonth);
}

function deleteRow1(button) {
    // Traverse the DOM to get the parent row element and remove it
    var row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
}
// Function to add event listeners to input fields for updating units calculation
function addEventListeners(
  numberInput,
  ratingInput,
  durationInput,
  WorkingDaysInput,
  unitsInput
) {
  // Iterate through each input field and add an input event listener
  [numberInput, ratingInput, durationInput, WorkingDaysInput].forEach(
    (input) => {
      input.addEventListener("input", function () {
        // Get values from input fields and perform calculations
        var numberValue = parseFloat(numberInput.value) || 0;
        var ratingValue = parseFloat(ratingInput.value.replace(/,/g, '')) || 0;
        var durationValue = parseFloat(durationInput.value) || 0;
        var workingdaysValue = parseFloat(WorkingDaysInput.value) || 0;
        var unitsValue =
          (numberValue * ratingValue * durationValue * workingdaysValue) / 1000;
        // Set the calculated units value to the units input field with proper formatting
        unitsInput.value = unitsValue.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
        // Call a function to update the total month units
        updateTotalMonthUnits();
      });
    }
  );
}

// Function to add event listeners to input fields for updating units calculation in report section
function addEventListenersReport(
  numberInput,
  ratingInput,
  durationInput,
  WorkingDaysInput,
  unitsInput
) {
  // Iterate through each input field and add an input event listener
  [numberInput, ratingInput, durationInput, WorkingDaysInput].forEach(
    (input) => {
      input.addEventListener("input", function () {
        // Get values from input fields and perform calculations
        var numberValue = parseFloat(numberInput.value) || 0;
        var ratingValue = parseFloat(ratingInput.value.replace(/,/g, '')) || 0;
        var durationValue = parseFloat(durationInput.value) || 0;
        var workingdaysValue = parseFloat(WorkingDaysInput.value) || 0;
        var unitsValue =
          (numberValue * ratingValue * durationValue * workingdaysValue) / 1000;
        // Set the calculated units value to the units input field with proper formatting
        unitsInput.value = unitsValue.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
        // Call a function to update the total month units in the report section
        updateTotalMonthUnitsReport();
      });
    }
  );
}

// Function to add event listeners to input fields for updating units calculation in update section
function addEventListenersupdate(
  numberInput,
  ratingInput,
  durationInput,
  WorkingDaysInput,
  unitsInput
) {
  // Iterate through each input field and add an input event listener
  [numberInput, ratingInput, durationInput, WorkingDaysInput].forEach(
    (input) => {
      input.addEventListener("input", function () {
        // Get values from input fields and perform calculations
        var numberValue = parseFloat(numberInput.value) || 0;
        var ratingValue = parseFloat(ratingInput.value.replace(/,/g, '')) || 0;
        var durationValue = parseFloat(durationInput.value) || 0;
        var workingdaysValue = parseFloat(WorkingDaysInput.value) || 0;
        var unitsValue =
          (numberValue * ratingValue * durationValue * workingdaysValue) / 1000;
        // Set the calculated units value to the units input field with proper formatting
        unitsInput.value = unitsValue.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
        // Call a function to update the total month units in the update section
        updateTotalMonthUnits();
      });
    }
  );
}

// Function to calculate the sum of units of each row
function calculateTotalUnits() {
  const tableRows = document.querySelectorAll("#update-main tbody tr");
  var totalUnits = 0;

  // Loop through each row and sum the units
  tableRows.forEach((row) => {
    const unitsInput = row.querySelector("td:nth-child(6) input");

    if (unitsInput) {
      // Remove commas and then parse as float
      const unitsValue = parseFloat(unitsInput.value.replace(/,/g, '')) || 0;
      totalUnits += unitsValue;
    }
  });

  return totalUnits;
}

// Function to calculate the total units from the report table
function calculateTotalUnitsReport() {
  // Select all the table rows in the report table
  const tableRows = document.querySelectorAll("#reporttable tbody tr");

  var totalUnits = 0;

  // Loop through each row and sum the units
  tableRows.forEach((row) => {
    // Find the input field for units in each row
    const unitsInput = row.querySelector("td:nth-child(6) input");

    // Parse the units value from the input field, replace commas with empty string, and default to 0 if not a number
    const units = unitsInput ? parseFloat(unitsInput.value.replace(/,/g, '')) || 0 : 0;

    // Add the units to the total
    totalUnits = totalUnits + units;
  });

  return totalUnits;
}

// Function to update TotalMonthUnits
function updateTotalMonthUnits() {
  var totalMonthUnits = document.getElementById("totalUnits");

  var totalUnits = calculateTotalUnits();

  // Format totalUnits with commas
  var totalMonthUnitsValue = totalUnits.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  totalMonthUnits.value = totalMonthUnitsValue;
}

function updateTotalMonthUnitsReport() {
 
  var totalMonthUnits = document.getElementById("reporteditinput");

  var totalReportUnits = calculateTotalUnitsReport();
  

  // Calculate TotalMonthUnits
  var totalMonthUnitsValue = totalReportUnits.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  totalMonthUnits.value = totalMonthUnitsValue;
}

// Function to fetch bill data from the backend for a specific year
function fetchBillDataFromBackend(year) {
  // Create a new XMLHttpRequest object
  var xhr = new XMLHttpRequest();
  // Open a GET request to the "BillTable" endpoint
  xhr.open("GET", "BillTable", true);

  // Event listener to handle changes in the state of the request
  xhr.onreadystatechange = function () {
    // Check if the request is complete
    if (xhr.readyState === XMLHttpRequest.DONE) {
      // Check if the request was successful (status code 200)
      if (xhr.status === 200) {
        // Parse the response data as JSON
        var responseData = JSON.parse(xhr.responseText);
        // Call the function to populate the bill table with the retrieved data
        populateBillTable(responseData, year);
        // Populate table with retrieved data
      } else {
        // Log an error message if the request was not successful
        console.error("Error:", xhr.status);
      }
    }
  };

  // Send the request
  xhr.send();
}

// Function to populate the bill table with data for a specific year
function populateBillTable(data, year) {
  // Select the table body element where data will be populated
  var table = document.querySelector("#data-table tbody");
  // Clear existing table rows
  table.innerHTML = "";

  // Convert data object to array
  var dataArray = Object.values(data);

  // Filter and sort the data for the given year
  var filteredData = dataArray.filter((item) => item.Year == year);

  // Sort the filtered data by month
  filteredData.sort(
    (a, b) => new Date("01 " + a.Month) - new Date("01 " + b.Month)
  );

  // Function to format numbers with commas
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  // Iterate through the sorted data and create table rows
  filteredData.forEach(function (item) {
    // Create a new row for each item in the filtered data
    var newRow = table.insertRow();
    // Insert cells for each field
    var newYearCell = newRow.insertCell();
    var newMonthCell = newRow.insertCell();
    var newUnitsCell = newRow.insertCell();
    var newViewImageCell = newRow.insertCell();
    var newEditBtnCell = newRow.insertCell();

    // Populate cells with corresponding data
    newYearCell.textContent = item.Year;
    newMonthCell.textContent = item.Month;
    newUnitsCell.textContent = numberWithCommas(item.Units); // Display units with commas

    // Create a button to view the image
    var viewImageButton = document.createElement("button");
    viewImageButton.className = "view-btn";
    viewImageButton.textContent = "View Image";
    viewImageButton.addEventListener("click", function () {
      // Open a new window to display the image if available
      if (item.Base64Image) {
        displayImage(item.Base64Image);
      } else {
        alert("No image available");
      }
    });
    newViewImageCell.appendChild(viewImageButton);

    // Create an "Edit" button for each row
    newEditBtnCell.innerHTML = '<button class="edit-btn">Edit</button>';
  });
}


// Function to display an image in a new window
function displayImage(base64Image) {
  // Open a new window
  var imageWindow = window.open("");
  // Write the image tag with the base64 encoded image data
  imageWindow.document.write(
    "<img src='data:image/jpeg;base64," +
      base64Image +
      "' style='max-width: 100%; max-height: 100%;'/>"
  );
}


// Function to fetch data from the backend for update
function fetchDataFromBackendForUpdate(year, month) {
  // Create a new XMLHttpRequest object
  var xhr = new XMLHttpRequest();
  // Open a GET request to the "ComputedDataRead" endpoint
  xhr.open("GET", "ComputedDataRead", true);

  // Event listener to handle changes in the state of the request
  xhr.onreadystatechange = function () {
    // Check if the request is complete
    if (xhr.readyState === XMLHttpRequest.DONE) {
      // Check if the request was successful (status code 200)
      if (xhr.status === 200) {
        // Parse the response data as JSON
        var responseData = JSON.parse(xhr.responseText);
        // Check if the response data contains data for the specified year and month
        if (responseData.hasOwnProperty(`${year}-${month}`)) {
          // Call the function to populate the update table with the retrieved data
          populateUpdateTable(responseData, year, month);
        }
      } else {
        // Log an error message if the request was not successful
        console.error("Error:", xhr.status);
      }
    }
  };

  // Send the request
  xhr.send();
}


// Function to populate the update table with data for the selected year and month
function populateUpdateTable(data, selectedYear, selectedMonth) {
  // Select the table body element where data will be populated
  var tableBody = document.querySelector("#updatetable tbody");
  // Clear existing table rows
  tableBody.innerHTML = "";

  // Iterate through the data and filter based on the selected year and month
  Object.entries(data).forEach(function ([key, value]) {
    var [year, month] = key.split("-");
    if (year == selectedYear && month == selectedMonth) {
      // Iterate through the rowDataArray and create table rows
      value.rowDataArray.forEach(function (rowData) {
        // Create a new row for each item in the rowDataArray
        var newRow = tableBody.insertRow();
        // Insert cells for each field
        var itemNameCell = newRow.insertCell();
        var numberCell = newRow.insertCell();
        var ratingCell = newRow.insertCell();
        var hoursCell = newRow.insertCell();
        var workingCell = newRow.insertCell();
        var unitsCell = newRow.insertCell();
        var deleteCell = newRow.insertCell();

        // Set values to input fields
        itemNameCell.innerHTML = `<input type="text" value="${rowData.itemName}">`;
        numberCell.innerHTML = `<input type="number" value="${rowData.number}">`;
        ratingCell.innerHTML = `<input type="text" style="text-align:right;" value="${Number(rowData.rating).toLocaleString()}">`;
        hoursCell.innerHTML = `<input type="number" value="${rowData.hours}">`;
        workingCell.innerHTML = `<input type="number" value="${rowData.workingdays}">`;
        unitsCell.innerHTML = `<input type="text" style="text-align:right;" value="${Number(rowData.units).toLocaleString(undefined, { minimumFractionDigits: 2 })}">`;
        deleteCell.innerHTML = `<button type="button" id="${rowData.itemName}Delete" onclick="deleteRow1(this)">Delete</button>`;

        // Select input fields
        var numberInput = numberCell.querySelector("input");
        var ratingInput = ratingCell.querySelector("input");
        var durationInput = hoursCell.querySelector("input");
        var workingDaysInput = workingCell.querySelector("input");
        var unitsInput = unitsCell.querySelector("input");

        // Add event listeners to the input fields
        addEventListenersupdate(numberInput, ratingInput, durationInput, workingDaysInput, unitsInput);
      });
      
      // Set the value of total units input field
      document.getElementById("totalUnits").value = Number(value.MonthTotalUnits).toLocaleString();
    }
  });
}

// Function to fetch data from the backend for the report
function fetchDataFromBackendForReport(year, month) {
  // Create a new XMLHttpRequest object
  var xhr = new XMLHttpRequest();
  // Open a GET request to the "ComputedDataRead" endpoint
  xhr.open("GET", "ComputedDataRead", true);

  // Event listener to handle changes in the state of the request
  xhr.onreadystatechange = function () {
    // Check if the request is complete
    if (xhr.readyState === XMLHttpRequest.DONE) {
      // Check if the request was successful (status code 200)
      if (xhr.status === 200) {
        // Parse the response data as JSON
        var responseData = JSON.parse(xhr.responseText);
        // Call the function to populate the report table with the retrieved data
        populateReportTable(responseData, year, month);
        // Populate table with retrieved data
      } else {
        // Log an error message if the request was not successful
        console.error("Error:", xhr.status);
      }
    }
  };

  // Send the request
  xhr.send();
}


// Function to populate the report table with data for the selected year and month
function populateReportTable(data, selectedYear, selectedMonth) {
  // Select the table body element where data will be populated
  var tableBody = document.querySelector("#reporttable tbody");
  // Clear existing table rows
  tableBody.innerHTML = "";

  // Iterate through the data and filter based on the selected year and month
  Object.entries(data).forEach(function ([key, value]) {
    var [year, month] = key.split("-");
    
    if (year == selectedYear && month == selectedMonth) {
      // Iterate through the rowDataArray and create table rows
      value.rowDataArray.forEach(function (rowData) {
        // Create a new row for each item in the rowDataArray
        var newRow = tableBody.insertRow();
        // Insert cells for each field
        var itemNameCell = newRow.insertCell();
        var numberCell = newRow.insertCell();
        var ratingCell = newRow.insertCell();
        var hoursCell = newRow.insertCell();
        var workingCell = newRow.insertCell();
        var unitsCell = newRow.insertCell();

        // Populate cells with corresponding data
        itemNameCell.textContent = rowData.itemName;
        numberCell.textContent = rowData.number;
        ratingCell.textContent = rowData.rating.toLocaleString();
        hoursCell.textContent = rowData.hours;
        workingCell.textContent = rowData.workingdays;
        unitsCell.textContent = Number(rowData.units).toLocaleString(undefined, { minimumFractionDigits: 2 });
      });
      
      // Set the value of total units input field
      document.getElementById("reportmonthlytotal").textContent = Number(value.MonthTotalUnits).toLocaleString();
    }
  });
}

// Function to enable editing of report table
function editReport() {
  var tableRows = document.querySelectorAll("#reporttable tbody tr");

  // Iterate through each row
  tableRows.forEach(function (row) {
    // Get cells for hours and units
    var cells = row.querySelectorAll("td:nth-child(n+2)");
    // Convert each cell into an input field for editing
    cells.forEach(function (cell) {
      var textContent = cell.innerText;
      cell.innerHTML = '<input type="text" style="width:40%;" value="' + textContent + '">';
    });

    // Get input fields for each cell
    var inputs = row.querySelectorAll("input[type='text']");

    // Add event listeners to the input fields
    var numberInput = inputs[0];
    var ratingInput = inputs[1];
    var durationInput = inputs[2];
    var workingDaysInput = inputs[3];
    var unitsInput = inputs[4];

    addEventListenersReport(numberInput, ratingInput, durationInput, workingDaysInput, unitsInput);
  });

  // Edit working days and total units
  var reportMonthlyTotal = document.getElementById("reportmonthlytotal");
  var monthlyTotalValue = reportMonthlyTotal.innerText;
  reportMonthlyTotal.innerHTML = "<input type='text' style='width:80px;' id='reporteditinput' value='" + monthlyTotalValue + "' >";

  // Toggle visibility of edit and save buttons
  var editButton = document.getElementById("edit-report");
  var saveButton = document.createElement("button");
  saveButton.className = "save-report";
  saveButton.textContent = "Save";
  saveButton.addEventListener("click", saveReport);

  // Hide edit button and show save button
  editButton.style.display = "none";
  editButton.insertAdjacentElement("afterend", saveButton);
}


// Function to save the edited report data
function saveReport() {
  // Log message indicating saving report
  console.log("Saving report...");

  // Select all rows in the report table
  var tableRows = document.querySelectorAll("#reporttable tbody tr");

  // Initialize variables to store row data array and total units
  var rowDataArray = [];
  var totalUnits = 0;

  // Iterate through each row in the table
  tableRows.forEach(function (row) {
    // Select cells in the row
    var cells = row.querySelectorAll("td:nth-child(n)");
    var rowData = {};

    // Iterate through each cell in the row
    cells.forEach(function (cell, index) {
      var input = cell.querySelector("input");
      var cellValue = input ? input.value : cell.textContent.trim();

      // Extract and format cell values based on the index of the cell
      if (index === 1) {
        var number = parseFloat(cellValue) || 0;
        rowData["number"] = number;
        cell.innerHTML = number;
      } else if (index === 0) {
        rowData["itemName"] = cellValue;
        cell.innerHTML = cellValue;
      } else if (index === 3) {
        var hours = parseFloat(cellValue) || 0;
        rowData["hours"] = hours.toFixed(2);
        cell.innerHTML = hours.toFixed(2);
      } else if (index === 2) {
        var rating = parseFloat(cellValue.replace(/,/g, '')) || 0;
        rowData["rating"] = rating.toFixed(2);
        cell.innerHTML = rating.toFixed(2);
      } else if (index === 4) {
        var workingdays = parseFloat(cellValue) || 0;
        rowData["workingdays"] = workingdays.toFixed(2);
        cell.innerHTML = workingdays.toFixed(2);
      } else if (index === 5) {
        var units = parseFloat(cellValue.replace(/,/g, '')) || 0;
        cell.innerHTML = units.toFixed(2);
        rowData["units"] = units.toFixed(2);
        totalUnits += units;
      }
    });

    // Push the rowData object to the rowDataArray
    rowDataArray.push(rowData);
  });

  // Update the total units displayed on the report
  var reportMonthlyTotal = document.getElementById("reportmonthlytotal");
  reportMonthlyTotal.innerHTML = totalUnits.toLocaleString();

  // Get the selected year and month from the filter inputs
  var year = document.getElementById("filter-year").value;
  var month = document.getElementById("filter-month").value;

  // Send the edited report data to the backend
  sendReportDataEditedBackend(year, month, totalUnits, rowDataArray);

  // Toggle visibility of edit and save buttons
  var editButton = document.getElementById("edit-report");
  var saveButton = document.querySelector(".save-report");

  saveButton.style.display = "none"; // Hide save button
  editButton.style.display = "inline-block"; // Show edit button
}

// Function to send edited report data to the backend
function sendReportDataEditedBackend(currentYear, currentMonth, MonthTotalUnits, rowDataArray) {
  // Create a new XMLHttpRequest object
  var xhr = new XMLHttpRequest();

  // Configure the request
  xhr.open("POST", "ComputedData", true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  // Construct the data to be sent in the request body
  var data = "currentyear=" + encodeURIComponent(currentYear) +
             "&currentmonth=" + encodeURIComponent(currentMonth) +
             "&rowDataArray=" + encodeURIComponent(JSON.stringify(rowDataArray)) +
             "&MonthTotalUnits=" + encodeURIComponent(MonthTotalUnits);

  // Define the callback function for handling the response
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        // Log success message if data is updated successfully
        console.log("Data updated successfully");
      } else {
        // Log error message if there's an issue with the request
        console.error("Error:", xhr.status);
      }
    }
  };

  // Send the request with the report data
  xhr.send(data);
}

