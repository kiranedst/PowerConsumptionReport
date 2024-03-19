package com.pcr.edst;

import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

@WebServlet("/registerDetailsServlet")
public class registerDetailsServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	@SuppressWarnings("unchecked")
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		response.setContentType("text/html");
		PrintWriter out = response.getWriter();
		String employeeID = request.getParameter("employeeID");
		String emailID = request.getParameter("emailID");
		String employeeName = request.getParameter("employeeName");
		String designation = request.getParameter("designation");

		String password = request.getParameter("password");
		/* String confirmPassword = request.getParameter("confirmPassword"); */

		// Create JSONObject
		JSONObject registerDetails = new JSONObject();
		registerDetails.put("employeeID", employeeID);
		registerDetails.put("emailID", emailID);
		registerDetails.put("employeeName", employeeName);
		registerDetails.put("designation", designation);
		registerDetails.put("lastActiveDate", "");
		registerDetails.put("password", password);
		/* registerDetails.put("confirmPassword", confirmPassword); */

		// Read existing JSON data from file
		JSONArray existingData = null;
		try (FileReader fileReader = new FileReader("D:\\PCR\\src\\main\\webapp\\register_details.json")) {
			JSONParser jsonParser = new JSONParser();
			existingData = (JSONArray) jsonParser.parse(fileReader);
		} catch (IOException ioException) {
			System.err.println("IOException occurred: " + ioException.getMessage());
			ioException.printStackTrace();
			existingData = new JSONArray(); // Initialize existingData with an empty JSONArray
		} catch (org.json.simple.parser.ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		boolean isDuplicate = false;
		for (Object obj : existingData) {
			JSONObject existingEntry = (JSONObject) obj;
			String existingEmail = (String) existingEntry.get("emailID");
			String existingEmpID = (String) existingEntry.get("employeeID");
			if (emailID.equals(existingEmail) || employeeID.equals(existingEmpID)) {
				isDuplicate = true;
				break;
			}
		}

		// If email or employee ID already exists, return an error message or alert
		if (isDuplicate) {
			// Set an attribute in the request to indicate that the user is already
			// registered
			request.setAttribute("registrationMessage", "User is already registered.");
			// Forward the request to the registerpage.jsp
			request.getRequestDispatcher("registrationPage.jsp").forward(request, response);
			return; // Stop further processing
		}

		// Add new employee data to existing data array
		existingData.add(registerDetails);

		// Write updated data array back to the file with formatted JSON
		try (FileWriter fileWriter = new FileWriter("D:\\PCR\\src\\main\\webapp\\register_details.json")) {
			// Convert existingData JSONArray to a formatted JSON string
			String formattedJson = formatJson(existingData);

			// Write the formatted JSON string to the file
			fileWriter.write(formattedJson);
			fileWriter.flush();

		} catch (IOException e) {
			e.printStackTrace();
		}

		// Redirect to a success page or do further processing
		response.sendRedirect("master_home.jsp");
	}

	// Method to format JSON string with improved readability
	private String formatJson(JSONArray jsonArray) {
		StringBuilder formattedJson = new StringBuilder();
		formattedJson.append("[\n");

		// Loop through JSONArray elements
		for (int i = 0; i < jsonArray.size(); i++) {
			JSONObject jsonObject = (JSONObject) jsonArray.get(i);
			formattedJson.append("    {\n");

			// Loop through JSONObject entries
			for (Object key : jsonObject.keySet()) {
				String keyStr = (String) key;
				Object value = jsonObject.get(keyStr);
				formattedJson.append("        \"").append(keyStr).append("\": ");

				// Check if value is a string
				if (value instanceof String) {
					formattedJson.append("\"").append(value).append("\"");
				} else {
					formattedJson.append(value);
				}

				// Add comma if not the last entry
				if (!key.equals(jsonObject.keySet().toArray()[jsonObject.size() - 1])) {
					formattedJson.append(",");
				}
				formattedJson.append("\n");
			}

			formattedJson.append("    }");

			// Add comma if not the last element
			if (i < jsonArray.size() - 1) {
				formattedJson.append(",");
			}
			formattedJson.append("\n");
		}

		formattedJson.append("]\n");
		return formattedJson.toString();
	}
}
