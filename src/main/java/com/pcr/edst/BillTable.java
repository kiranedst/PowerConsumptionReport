package com.pcr.edst;

import java.io.FileReader;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

@WebServlet("/BillTable")
public class BillTable extends HttpServlet {
    private static final long serialVersionUID = 1L;
    private static final String JSON_FILE_PATH = "D:\\PCR\\src\\main\\webapp\\Ebill.json";

    // Handle GET requests to retrieve data
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        // Read data from the JSON file
        JSONObject jsonData = readDataFromJsonFile();

        // Set the response content type
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        // Send the JSON data to the frontend
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
}
