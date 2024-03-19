package com.pcr.edst;

import java.io.IOException;
import java.io.PrintWriter;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

@MultipartConfig
@WebServlet("/ElectricityBillUpdate")
public class ElectricityBillUpdate extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private static final String JSON_FILE_PATH = "D:\\PCR\\src\\main\\webapp\\Ebill.json";

	@SuppressWarnings("unchecked")
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		response.setContentType("application/json");

		// Get the data sent from the frontend
		String Year = request.getParameter("year");
		String Month = request.getParameter("month");
		String Units = request.getParameter("units");

		Part imagePart = request.getPart("image");

		// Read the image as a byte array
		byte[] imageData = imagePart.getInputStream().readAllBytes();

		// Encode the image data to Base64
		String base64Image = Base64.getEncoder().encodeToString(imageData);

		JSONObject jsonResponse = new JSONObject();

		JSONObject users = readBillFromJsonFile();

		if (users.containsKey(Year + "-" + Month)) {
			jsonResponse.put("success", false);
		} else {
			// Update user data
			JSONObject userInfoJson = new JSONObject();
			userInfoJson.put("Year", Year);
			userInfoJson.put("Month", Month);
			userInfoJson.put("Units", Units);
			userInfoJson.put("Base64Image", base64Image);
			users.put(Year + "-" + Month, userInfoJson);
			writeBillToJsonFile(users);

			jsonResponse.put("success", true);
		}

		// Write the JSON response
		PrintWriter out = response.getWriter();
		out.println(jsonResponse.toJSONString());
		out.flush();
	}

	public JSONObject readBillFromJsonFile() {
		JSONObject users = new JSONObject();
		Path path = Paths.get(JSON_FILE_PATH);

		if (Files.exists(path)) {
			try {
				String jsonContent = Files.readString(path);
				JSONParser parser = new JSONParser();
				users = (JSONObject) parser.parse(jsonContent);
			} catch (IOException | ParseException e) {
				e.printStackTrace();
			}
		}

		return users;
	}

	private void writeBillToJsonFile(JSONObject users) {
		Path path = Paths.get(JSON_FILE_PATH);

		try {
			if (!Files.exists(path)) {
				Files.createFile(path);
			}

			// Write user data to JSON file
			Files.writeString(path, users.toJSONString());
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

}
