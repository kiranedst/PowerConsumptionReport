package com.pcr.edst;

import java.io.FileReader;
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
import org.json.simple.parser.ParseException;

@WebServlet("/AddDataServlet")
public class AddDataServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    // Path to the JSON file storing the data
    private static final String JSON_FILE_PATH = "D:\\PCR\\src\\main\\webapp\\items.json";

    @SuppressWarnings("unchecked")
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html");
        PrintWriter out = response.getWriter();

        // Retrieve data sent from the frontend
        String fieldName = request.getParameter("fieldname");
        String fieldNumber = request.getParameter("numberValue");
        String fieldRating = request.getParameter("ratingValue");
        String fieldDuration = request.getParameter("DurationValue");
        String fieldWorkingDays = request.getParameter("WorkingDaysValue");
        String fieldUnits = request.getParameter("UnitsValue");

        JSONObject jsonResponse = new JSONObject();

        // Read existing data from the JSON file
        JSONObject users = readUsersFromJsonFile();

        // Check if the provided field name already exists
        if (users.containsKey(fieldName)) {
            jsonResponse.put("success", false);
            jsonResponse.put("message", "Field Name already exists. Please choose a different Field Name.");
        } else {
            // Update user data
            JSONObject userInfoJson = new JSONObject();
            userInfoJson.put("fieldNumber", fieldNumber);
            userInfoJson.put("fieldRating", fieldRating);
            userInfoJson.put("fieldDuration", fieldDuration);
            userInfoJson.put("fieldUnits", fieldUnits);
            userInfoJson.put("fieldWorkingDays", fieldWorkingDays);
            users.put(fieldName, userInfoJson);
            writeUsersToJsonFile(users);

            jsonResponse.put("success", true);
            jsonResponse.put("message", "Field added successfully!");
        }

        out.println(jsonResponse.toJSONString());
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        // Read data from the JSON file
        JSONObject jsonData = readDataFromJsonFile();

        // Set the response content type
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        // Send the JSON data to the front-end
        PrintWriter out = response.getWriter();
        out.print(jsonData.toJSONString());
        out.flush();
    }

    // Read data from the JSON file
    private JSONObject readDataFromJsonFile() {
        JSONObject data = new JSONObject();
        JSONParser parser = new JSONParser();

        try (FileReader reader = new FileReader(JSON_FILE_PATH)) {
            // Parse JSON file and cast it to JSONObject
            data = (JSONObject) parser.parse(reader);
        } catch (IOException | ParseException e) {
            e.printStackTrace();
        }

        return data;
    }

    // Read data from the JSON file
    public JSONObject readUsersFromJsonFile() {
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

    // Write data to the JSON file
    private void writeUsersToJsonFile(JSONObject users) {
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
