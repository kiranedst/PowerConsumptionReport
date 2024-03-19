// Function to add a new field to the table
function addField() {
  // Retrieve the field name and rating input value from the form
  const fieldName = document.getElementById("fieldName").value;
  const ratingInputValue = document.getElementById("rating").value;
  const rating = ratingInputValue.replace(/,/g, ''); // Remove commas from rating value if present

  // Get the reference to the table element
  const table = document.getElementById("updatetable");

  // Validate the field name
  if (!isString(fieldName)) {
    var errorMessageElement = document.getElementById("error-message-add");

    // Set the error message
    errorMessageElement.innerText = "Enter proper inputs (Name of the field)";

    // Clear the error message after 3 seconds
    setTimeout(function () {
      errorMessageElement.innerText = "";
    }, 1000);

    // Clear field name input
    document.getElementById("fieldName").value = "";
    return;
  }

  // Validation for rating
  if (!isNumber(rating)) {
    var errorMessageElement = document.getElementById("error-message-add");

    // Set the error message
    errorMessageElement.innerText = "Enter proper inputs (Only Rating)";

    // Clear the error message after 3 seconds
    setTimeout(function () {
      errorMessageElement.innerText = "";
    }, 1000);

    // Clear rating input
    document.getElementById("rating").value = "";
    return;
  }

  // Create a new row and input elements
  const newRow = table.insertRow();
  const newItemCell = newRow.insertCell();
  const newNumberCell = newRow.insertCell();
  const newRatingCell = newRow.insertCell();
  const newDurationCell = newRow.insertCell();
  const newWorkingCell = newRow.insertCell();
  const newUnitsCell = newRow.insertCell();
  const newDeleteCell = newRow.insertCell();
  
  // Populate the cells with input elements and values
  newItemCell.innerHTML =  `<input type="text" id="${fieldName}" value="${fieldName}">`;
  newNumberCell.innerHTML = `<input type="number" id="${fieldName}Number">`;
  newRatingCell.innerHTML = `<input type="text" id="${fieldName}Rating" value="${Number(rating).toLocaleString()}" style="text-align:right;">`;
  newDurationCell.innerHTML = `<input type="number" id="${fieldName}Duration">`;
  newWorkingCell.innerHTML = `<input type="number" id="${fieldName}WorkingDays">`;
  newUnitsCell.innerHTML = `<input type="number" id="${fieldName}Units">`;
  newDeleteCell.innerHTML = `<button type="button" id="${fieldName}Delete" onclick="deleteRow1(this)">Delete</button>`;

  // Clear the field name and rating inputs
  document.getElementById("fieldName").value = "";
  document.getElementById("rating").value = "";

  // Get references to the newly created input elements
  const numberInput = newNumberCell.querySelector("input");
  const ratingInput = newRatingCell.querySelector("input");
  const durationInput = newDurationCell.querySelector("input");
  const workingDaysInput = newWorkingCell.querySelector("input");
  const unitsInput = newUnitsCell.querySelector("input");

  // Add event listeners to the input elements
  addEventListenersupdate(numberInput, ratingInput, durationInput, workingDaysInput, unitsInput);

  // Update total units
  updateTotalMonthUnits();
  console.log("heloo");

  // Send data to the backend
  sendDataToBackend(fieldName, rating);
}

// Function to check if a value is a string
function isString(value) {
  return typeof value === "string" && isNaN(value);
}

// Function to check if a value is a number
function isNumber(value) {
  return !isNaN(value);
}

// Function to delete a row from the table
function deleteRow1(button) {
  // Traverse the DOM to get the parent row element and remove it
  var row = button.parentNode.parentNode;
  row.parentNode.removeChild(row);
}

// Function to save data
function saveData() {
  // Get the current year and month
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.toLocaleString("default", { month: "long" });
  
  let TotalUnits = 0;

  // Get the table rows
  const tableRows = document.querySelectorAll("#update-main tbody tr");
  
  const rowData = [];

  // Loop through each row and extract data
  tableRows.forEach((row) => {
    const itemNameCell = row.querySelector("td:nth-child(1) input");
    const itemName = itemNameCell ? itemNameCell.value.trim() : "";

    // Check if itemName is empty before processing the row
    if (!itemName) {
      return; // Skip the current iteration and move to the next row
    }

    const ratingInput = row.querySelector("td:nth-child(3) input");
    const rating = ratingInput ? parseFloat(ratingInput.value.replace(/,/g, '')) || 0 : 0;

    const numberInput = row.querySelector("td:nth-child(2) input");
    const number = numberInput ? parseInt(numberInput.value) || 0 : 0;

    const hoursInput = row.querySelector("td:nth-child(4) input");
    const hours = hoursInput ? parseFloat(hoursInput.value) || 0 : 0;

    const workingdaysInput = row.querySelector("td:nth-child(5) input");
    const workingdays = workingdaysInput ? parseFloat(workingdaysInput.value) || 0 : 0;

    const unitsInput = row.querySelector("td:nth-child(6) input");
    const units = (unitsInput ? parseFloat(unitsInput.value.replace(/,/g, '')) || 0 : 0);

    TotalUnits = TotalUnits + units;

    // Push row data to the array
    rowData.push({
      itemName: itemName,
      rating: rating.toFixed(2),
      number: number,
      hours: hours.toFixed(2),
      workingdays: workingdays,
      units: units.toFixed(2),
    });
  });

  // Calculate the total units for the month
  const MonthTotalunits = TotalUnits.toFixed(2);

  // Send data to the backend
  sendReportDataToBackend(currentYear, currentMonth, rowData, MonthTotalunits);
  
  // Clear the total units input
  document.getElementById("totalUnits").value = "";

  // Clear input fields in each row
  const tableRows1 = document.querySelectorAll("#update-main table tbody tr");
  console.log(tableRows1);
  tableRows1.forEach((row) => {
    row.querySelector("td:nth-child(2) input").innerHTML = "";
    row.querySelector("td:nth-child(4) input").innerHTML = "";
    row.querySelector("td:nth-child(5) input").innerHTML = "";
  });
}

// Function to send data to the backend for adding a field
function sendDataToBackend(fieldName, ratingValue) {
  // Create a new XMLHttpRequest object
  var xhr = new XMLHttpRequest();

  // Configure the request
  xhr.open("POST", "AddDataServlet", true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  // Prepare the data to send
  var numberValue = document.getElementById(`${fieldName}Number`).value;
  var DurationValue = document.getElementById(`${fieldName}Duration`).value;
  var UnitsValue = document.getElementById(`${fieldName}Units`).value;
  var WorkingDaysValue = document.getElementById(`${fieldName}WorkingDays`).value;

  // Construct the data string
  var data =
    "fieldname=" +
    encodeURIComponent(fieldName) +
    "&numberValue=" +
    encodeURIComponent(numberValue) +
    "&ratingValue=" +
    encodeURIComponent(ratingValue) +
    "&DurationValue=" +
    encodeURIComponent(DurationValue) +
    "&UnitsValue=" +
    encodeURIComponent(UnitsValue) +
    "&WorkingDaysValue=" +
    encodeURIComponent(WorkingDaysValue);

  // Define the callback function
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        console.log(xhr.responseText);
      } else {
        // Error handling
        console.error("Error:", xhr.status);
      }
    }
  };

  // Send the request with the data
  xhr.send(data);
}

// Function to send report data to the backend
function sendReportDataToBackend(currentYear, currentMonth, rowDataArray, MonthTotalUnits) {
  // Create a new XMLHttpRequest object
  var xhr = new XMLHttpRequest();

  // Configure the request
  xhr.open("POST", "ComputedData", true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  var data1 =
    "currentyear=" +
    encodeURIComponent(currentYear) +
    "&currentmonth=" +
    encodeURIComponent(currentMonth) +
    "&rowDataArray=" +
    encodeURIComponent(JSON.stringify(rowDataArray)) +
    "&MonthTotalUnits=" +
    encodeURIComponent(MonthTotalUnits);

  // Define the callback function
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        var errorMessageElement = document.getElementById("error-message-save");

        // Set the success message
        errorMessageElement.innerText = "Data saved successfully.";

        // Clear the success message after 3 seconds
        setTimeout(function () {
          errorMessageElement.innerText = "";
        }, 2000);
        console.log("data sent to backend successfully");
      } else {
        // Error handling
        console.error("Error:", xhr.status);
      }
    }
  };

  // Send the request with the report data
  xhr.send(data1);
}

// Add event listeners for button clicks
document.getElementById("addField").addEventListener("click", addField);
document.getElementById("total-save").addEventListener("click", saveData);
