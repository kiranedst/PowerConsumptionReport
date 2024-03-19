// Function to handle form submission for adding electricity bill data
document.getElementById("electric-submit").addEventListener("click", function (event) {
  event.preventDefault(); // Prevent the default form submission

  // Get values from the form
  var year = document.getElementById("year").value;
  var month = document.getElementById("month").value;
  var units = document.getElementById("units").value;
  var image = document.getElementById("image").files[0]; // Get the selected image file

  // Check if any of the fields are empty
  if (year.trim() === "" || month.trim() === "" || units.trim() === "" || !image) {
    var errorMessageElement = document.getElementById("error-message");
    errorMessageElement.innerText = "Please fill all the fields and upload the image";
    setTimeout(function () {
      errorMessageElement.innerText = "";
    }, 3000);
  } else {
    // Create a FormData object to send data including files
    var formData = new FormData();
    formData.append("year", year);
    formData.append("month", month);
    formData.append("units", units);
    formData.append("image", image);

    // Send data to backend
    sendBillDataToBackend(formData);
  }
});

// Function to send electricity bill data to the backend
function sendBillDataToBackend(formData) {
  var request = new XMLHttpRequest();
  request.open("POST", "ElectricityBillUpdate", true);

  // Define callback function to handle response
  request.onreadystatechange = function () {
    if (request.readyState === XMLHttpRequest.DONE) {
      if (request.status === 200) {
        var response = JSON.parse(request.responseText);
        if (response.success) {
          var errorMessageElement = document.getElementById("error-message");
          errorMessageElement.innerText = "Data added successfully.";
          setTimeout(function () {
            errorMessageElement.innerText = "";
          }, 3000);
          // Reset form fields after successful submission
          document.getElementById("year").value = "2024";
          document.getElementById("month").value = "January";
          document.getElementById("units").value = "";
          document.getElementById("image").value = null;
          // Reload bill data for the current year
          loadCurrentYearBillData();
        } else {
          var errorMessageElement = document.getElementById("error-message");
          errorMessageElement.innerText = "This month of that particular year already exists.";
          setTimeout(function () {
            errorMessageElement.innerText = "";
          }, 3000);
          // Reset form fields after failed submission
          document.getElementById("year").value = "2024";
          document.getElementById("month").value = "January";
          document.getElementById("units").value = "";
          document.getElementById("image").value = null;
        }
      } else {
        console.error("Error:", request.status);
      }
    }
  };

  // Send FormData to the backend
  request.send(formData);
}

// Function to handle edit button click
document.getElementById("data-table").addEventListener("click", function (event) {
  if (event.target.classList.contains("edit-btn")) {
    var cellToEdit = event.target.parentNode;

    // Traverse through previous siblings twice to reach the cell with data
    for (var i = 0; i < 2; i++) {
      cellToEdit = cellToEdit.previousSibling;

      // Skip text nodes and continue until an element node is found
      while (cellToEdit && cellToEdit.nodeType !== 1) {
        cellToEdit = cellToEdit.previousSibling;
      }

      // Break if no more siblings exist
      if (!cellToEdit) {
        break;
      }
    }

    // Extract the cell value and relevant row data
    var cellValue = cellToEdit.innerText;
    var row = event.target.parentNode.parentNode;
    var cells = row.getElementsByTagName("td");
    var Year = cells[0].innerText;
    var Month = cells[1].innerText;

    // Replace the cell content with an input field for editing
    cellToEdit.innerHTML =
      '<input type="text" style="width:100px; margin:0px; padding:0px;" value="' + cellValue + '">';
    event.target.style.display = "none";

    // Create a save button for saving the edited data
    var saveButton = document.createElement("button");
    saveButton.className = "save-btn";
    saveButton.textContent = "Save";

    // Add click event listener to the save button
    saveButton.addEventListener("click", function (event) {
      var inputValue = cellToEdit.querySelector("input").value;
      cellToEdit.innerHTML = inputValue;

      saveButton.style.display = "none";
      event.target.parentNode.querySelector(".edit-btn").style.display = "block";

      // Send edited data to the backend for saving
      sendDataToBackendToEdit(Year, Month, inputValue);
    });

    // Append the save button to the parent node
    event.target.parentNode.appendChild(saveButton);
  }
});

// Function to send edited data to the backend for saving
function sendDataToBackendToEdit(Year, Month, inputValue) {
  // Create a new XMLHttpRequest object
  var xhr = new XMLHttpRequest();

  // Configure the request
  xhr.open("POST", "ElectricityBillEdit", true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  // Construct the data string
  var data =
    "Year=" + encodeURIComponent(Year) +
    "&Month=" + encodeURIComponent(Month) +
    "&inputValue=" + encodeURIComponent(inputValue);

  // Define the callback function to handle response
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        console.log(xhr.responseText); // Handle the response from the servlet
      } else {
        console.error("Error:", xhr.status);
      }
    }
  };

  // Send the request with the data
  xhr.send(data);
}
