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

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.JSONValue;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

@WebServlet("/ComputedData")
public class ComputedData extends HttpServlet {
    private static final long serialVersionUID = 1L;
    private static final String JSON_FILE_PATH = "D:\\PCR\\src\\main\\webapp\\computed.json";

    // Handle POST requests to save data
    @SuppressWarnings("unchecked")
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/plain");
        response.setCharacterEncoding("UTF-8");

        // Get the data sent from the frontend
        String currentYear = request.getParameter("currentyear");
        String currentMonth = request.getParameter("currentmonth");
        String rowDataArrayString = request.getParameter("rowDataArray");
        String MonthTotalUnits = request.getParameter("MonthTotalUnits");

        // Read existing data from the JSON file
        JSONObject users = readBillFromJsonFile();

        try {
            // Convert the JSON string to a JSONArray
            JSONArray rowDataArray = (JSONArray) JSONValue.parse(rowDataArrayString);

            // Create a JSONObject to store all the data
            JSONObject jsonData = new JSONObject();
            jsonData.put("rowDataArray", rowDataArray);
            jsonData.put("MonthTotalUnits", MonthTotalUnits);

            // Write the data to the JSON file under the specific year and month
            users.put(currentYear + "-" + currentMonth, jsonData);
            writeDataToJsonFile(users);

            // Send a response to the client
            PrintWriter out = response.getWriter();
            out.println("Data saved successfully");
        } catch (Exception e) {
            e.printStackTrace();
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        }
    }

    // Read data from the JSON file
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

    // Write data to the JSON file
    private void writeDataToJsonFile(JSONObject info) {
        Path path = Paths.get(JSON_FILE_PATH);

        try {
            if (!Files.exists(path)) {
                Files.createFile(path);
            }
            // Write user data to JSON file
            Files.writeString(path, info.toJSONString());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
