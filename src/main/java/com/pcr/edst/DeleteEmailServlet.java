package com.pcr.edst;

import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

@WebServlet("/DeleteEmailServlet")
public class DeleteEmailServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	@SuppressWarnings("unchecked")
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		String emailID = request.getParameter("emailID");
		System.out.println(emailID);
		// Logic to delete the email ID from the backend JSON file
		try {
			// Read existing JSON data from file
			JSONParser jsonParser = new JSONParser();
			JSONArray jsonArray;

			try (FileReader fileReader = new FileReader("D:\\PCR\\src\\main\\webapp\\register_details.json")) {
				jsonArray = (JSONArray) jsonParser.parse(fileReader);

				// Find and remove the user entry with the specified email
				JSONArray updatedArray = new JSONArray();
				for (Object obj : jsonArray) {
					JSONObject user = (JSONObject) obj;
					String userEmail = (String) user.get("emailID");

					if (!userEmail.equals(emailID)) {
						updatedArray.add(user);
					}
				}

				// Write the updated JSON data back to the file
				try (FileWriter fileWriter = new FileWriter("D:\\PCR\\src\\main\\webapp\\register_details.json")) {
					fileWriter.write(updatedArray.toJSONString());
				}
			}

			// Send success response code
			response.setStatus(HttpServletResponse.SC_OK);
		} catch (Exception e) {
			// Handle exceptions
			e.printStackTrace();
			// Send error response code
			response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
		}
	}

}
