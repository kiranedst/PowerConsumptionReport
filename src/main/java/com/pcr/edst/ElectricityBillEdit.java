package com.pcr.edst;

import java.io.IOException;
import java.io.PrintWriter;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

@WebServlet("/ElectricityBillEdit")
public class ElectricityBillEdit extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		response.setContentType("text/html");

		// Get the data sent from the front-end
		PrintWriter out = response.getWriter();

		// Get parameters from the form
		String Year = request.getParameter("Year");
		String Month = request.getParameter("Month");
		String inputValue = request.getParameter("inputValue");

		// Update JSON file with new user type
		updateJsonFile(Year, Month, inputValue);

		out.println("User Type Updated Successfully!");
	}
	

	@SuppressWarnings("unchecked")
	private void updateJsonFile(String Year, String Month, String inputValue) {
		try {
			// Path to your JSON file
			String filePath = "D:\\PCR\\src\\main\\webapp\\Ebill.json";
			Path path = Paths.get(filePath);

			// Read JSON content from file
			String jsonContent = Files.readString(path);
			JSONParser parser = new JSONParser();
			JSONObject users = (JSONObject) parser.parse(jsonContent);

			// Update user type
			JSONObject userData = (JSONObject) users.get(Year + "-" + Month);
			userData.put("Units", inputValue);

			// Write updated content back to the file
			Files.writeString(path, users.toJSONString());
		} catch (Exception e) {
			e.printStackTrace();

		}

	}
}
