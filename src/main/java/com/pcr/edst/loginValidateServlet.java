package com.pcr.edst;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.io.FileReader;
import java.io.FileWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

@WebServlet("/loginValidateServlet")
public class loginValidateServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	@SuppressWarnings("unchecked")
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		response.setContentType("text/html");
		String emailID = request.getParameter("emailID");
		String password = request.getParameter("password");

		try {
			// Parse the JSON file
			JSONParser parser = new JSONParser();
			JSONArray jsonArray;
			try (FileReader fileReader = new FileReader("D:\\PCR\\src\\main\\webapp\\register_details.json")) {
				jsonArray = (JSONArray) parser.parse(fileReader);
			}

			// Check if email ID and password match any registered user
			boolean validEmail = false;
			boolean validPassword = false;
			boolean validMasterEmail = false;
			boolean validMasterPassword = false;
			String employeeName = null;
			String employeeID = null;
			String designation = null;
			String userEmail = null;

			LocalDateTime lastLogin = null;

			for (Object obj : jsonArray) {
				JSONObject jsonObject = (JSONObject) obj;
				String registeredEmail = (String) jsonObject.get("emailID");
				String registeredPassword = (String) jsonObject.get("password");

				if (MasterCredentials.isValidMasterCredentials(emailID, password)) {
					validMasterEmail = true;
					validMasterPassword = true;
					break;
				} else if (registeredEmail.equals(emailID) && registeredPassword.equals(password)) {
					validEmail = true;
					validPassword = true;

					// Additional user information
					employeeName = (String) jsonObject.get("employeeName");
					employeeID = (String) jsonObject.get("employeeID");
					designation = (String) jsonObject.get("designation");
					userEmail = registeredEmail; // Store user's email

					lastLogin = LocalDateTime.now(); // Capture current timestamp as the last login

					// Update last login timestamp in the JSON file
					jsonObject.put("lastActiveDate", lastLogin.format(DateTimeFormatter.ISO_LOCAL_DATE_TIME));

					// Exit loop if email and password match
					break;
				}
			}

			if (validMasterEmail || validMasterPassword) {
				// Redirect to master_home.jsp if master credentials are valid
				response.sendRedirect("master_home.jsp");
			} else if (validEmail && validPassword) {
				// Set session attributes for user information
				HttpSession session = request.getSession();
				session.setAttribute("employeeName", employeeName);
				session.setAttribute("employeeID", employeeID);
				session.setAttribute("designation", designation);
				session.setAttribute("emailID", userEmail); // Set user's email

				// Write the updated JSON array back to the file
				try (FileWriter fileWriter = new FileWriter("D:\\PCR\\src\\main\\webapp\\register_details.json")) {
					fileWriter.write(jsonArray.toJSONString());
				}

				// Redirect to home.jsp upon successful login
				response.sendRedirect("home.jsp");
			} else {
				// Set an attribute in the request to indicate invalid login
				request.setAttribute("loginMessage", "Invalid Email or Password.");
				// Forward the request to the login page
				request.getRequestDispatcher("index.jsp").forward(request, response);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		/*
		 * response.setContentType("text/html"); PrintWriter out = response.getWriter();
		 * 
		 * String emailID = request.getParameter("emailID"); String password =
		 * request.getParameter("password");
		 * 
		 * try { // Parse the JSON file JSONParser parser = new JSONParser(); JSONArray
		 * jsonArray = (JSONArray) parser.parse(new
		 * FileReader("D:\\PCR\\src\\main\\webapp\\register_details.json"));
		 * 
		 * // Check if email ID and password match any registered user boolean
		 * validEmail = false; boolean validPassword = false; boolean
		 * validMasterEmail=false; boolean validMasterPassword=false; String
		 * employeeName = null; String employeeID = null; String designation = null;
		 * String userEmail = null; for (Object obj : jsonArray) { JSONObject jsonObject
		 * = (JSONObject) obj; String registeredEmail = (String)
		 * jsonObject.get("emailID"); String registeredPassword = (String)
		 * jsonObject.get("password");
		 * if(MasterCredentials.isValidMasterCredentials(emailID, password)) {
		 * validMasterEmail = true; validMasterPassword = true; break; } else if
		 * (registeredEmail.equals(emailID) && registeredPassword.equals(password)) {
		 * validEmail = true; validPassword = true;
		 * 
		 * // Additional user information employeeName = (String)
		 * jsonObject.get("employeeName"); employeeID = (String)
		 * jsonObject.get("employeeID"); designation = (String)
		 * jsonObject.get("designation");
		 * 
		 * userEmail = registeredEmail; // Store user's email
		 * 
		 * // Exit loop if email and password match break; } } if(validMasterEmail ||
		 * validMasterPassword) { response.sendRedirect("master_home.jsp"); } else { if
		 * (!validEmail || !validPassword) {
		 * 
		 * // Set an attribute in the request to indicate that the user is already
		 * registered request.setAttribute("loginMessage",
		 * "Inavlid Email and Password."); // Forward the request to the
		 * registerpage.jsp request.getRequestDispatcher("index.jsp").forward(request,
		 * response); return; // Stop further processing } else { // Set session
		 * attributes for user information
		 * 
		 * 
		 * // Log user activity
		 * 
		 * 
		 * HttpSession session = request.getSession();
		 * session.setAttribute("employeeName", employeeName);
		 * session.setAttribute("employeeID", employeeID);
		 * session.setAttribute("designation", designation);
		 * session.setAttribute("emailID", userEmail); // Set user's email
		 * 
		 * // Redirect to home.jsp upon successful login
		 * response.sendRedirect("home.jsp"); } }} catch (Exception e) {
		 * e.printStackTrace(); }
		 */
	}
}
