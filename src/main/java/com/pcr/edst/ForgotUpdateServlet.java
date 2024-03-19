package com.pcr.edst;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

@WebServlet("/ForgotUpdateServlet")
public class ForgotUpdateServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		String email = request.getParameter("email");
		String newPassword = request.getParameter("updatepassword");

		// Validate new and confirm passwords
		String confirmNewPassword = request.getParameter("confirm_update");

		if (!newPassword.equals(confirmNewPassword)) {
			response.sendRedirect("updatePassword.jsp?error=New and confirm passwords do not match");
			return;
		}

		try {
			// Read users from JSON file
			JSONArray usersArray = readUsersFromJsonFile();

			// Check if the user with the given email exists
			int userIndex = getUserIndex(usersArray, email);
			if (userIndex != -1) {
				// Update password for the user with the given email
				updateUserPassword(usersArray, userIndex, newPassword);

				// Write updated users back to JSON file
				writeUsersToJsonFile(usersArray);

				// Redirect to a success page
				response.sendRedirect("index.jsp");
			} else {
				// Redirect with an error if the user doesn't exist
				response.sendRedirect("updatePassowrd.jsp?error=User with email not found");
			}
		} catch (ParseException e) {
			e.printStackTrace();
			response.sendRedirect("updatePassowrd.jsp?error=Error updating password");
		}
	}

	// Helper method to read users from JSON file
	private JSONArray readUsersFromJsonFile() throws ParseException, IOException {
		Path path = Paths.get("D:\\PCR\\src\\main\\webapp\\register_details.json");
		byte[] jsonData = Files.readAllBytes(path);
		String content = new String(jsonData, "UTF-8");
		JSONParser parser = new JSONParser();
		return (JSONArray) parser.parse(content);
	}

	// Helper method to find the index of the user with the given email
	private int getUserIndex(JSONArray usersArray, String email) {
		for (int i = 0; i < usersArray.size(); i++) {
			JSONObject user = (JSONObject) usersArray.get(i);
			if (email.equals(user.get("emailID"))) {
				return i;
			}
		}
		return -1; // User not found
	}

	// Helper method to update user password in the JSON array
	private void updateUserPassword(JSONArray usersArray, int userIndex, String newPassword) {
		JSONObject user = (JSONObject) usersArray.get(userIndex);
		user.put("password", newPassword);
	}

	// Helper method to write users back to JSON file
	private void writeUsersToJsonFile(JSONArray usersArray) throws IOException {
		Path path = Paths.get("D:\\PCR\\src\\main\\webapp\\register_details.json");
		Files.write(path, usersArray.toJSONString().getBytes());
	}
}
