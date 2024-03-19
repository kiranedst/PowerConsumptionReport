package com.pcr.edst;

import java.io.FileWriter;
import java.io.FileReader;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

@WebServlet("/changePasswordServlet")
public class changePasswordServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	@SuppressWarnings("unchecked")
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		HttpSession session = request.getSession();
		String employeeID = (String) session.getAttribute("employeeID");
		String oldPassword = request.getParameter("oldPassword");
		String newPassword = request.getParameter("newPassword");
		String confirmNewPassword = request.getParameter("confirmNewPassword");

		try {
			// Parse the JSON file
			String jsonFilePath = "D:\\PCR\\src\\main\\webapp\\register_details.json";
			JSONParser parser = new JSONParser();
			JSONArray jsonArray = (JSONArray) parser.parse(new FileReader(jsonFilePath));

			// Iterate through the array to find the user's entry
			boolean userFound = false;
			for (Object obj : jsonArray) {
				JSONObject jsonObject = (JSONObject) obj;
				String registeredEmployeeID = (String) jsonObject.get("employeeID");

				if (registeredEmployeeID.equals(employeeID)) {
					String registeredPassword = (String) jsonObject.get("password");

					// Check if the old password matches the registered password
					if (registeredPassword.equals(oldPassword)) {
						// Check if the new password and confirm password match
						if (newPassword.equals(confirmNewPassword)) {
							// Update the password in the JSON object
							jsonObject.put("password", newPassword);

							userFound = true;
							break; // Exit loop after updating the password
						} else {
							// New password and confirm password mismatch, handle accordingly
							response.sendRedirect("changePassword.jsp?error=password_mismatch");
							return;
						}
					} else {
						// Password mismatch, handle accordingly
						response.sendRedirect("changePassword.jsp?error=old_password_mismatch");
						return;
					}
				}
			}

			if (!userFound) {
				// User not found, handle accordingly
				response.sendRedirect("changePassword.jsp?error=user_not_found");
				return;
			}

			// Write the updated JSONArray back to the JSON file
			try (FileWriter file = new FileWriter(jsonFilePath)) {
				file.write(jsonArray.toJSONString());
			}

			// Invalidate the session to log out the user
			session.invalidate();

			// Redirect the user to the login page with a success message
			response.sendRedirect("index.jsp?success=password_changed");
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println("Error: " + e.getMessage()); // Log the error message
			// Handle exceptions (e.g., display an error message)
			response.sendRedirect("changePassword.jsp?error=change_password_failed");
		}
	}

	// Method to format JSON string with improved readability
	@SuppressWarnings("unused")
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
