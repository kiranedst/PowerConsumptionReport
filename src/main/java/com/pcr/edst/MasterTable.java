package com.pcr.edst;

import java.io.FileReader;
import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONArray;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

@WebServlet("/MasterTable")
public class MasterTable extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private static final String JSON_FILE_PATH = "D:\\PCR\\src\\main\\webapp\\register_details.json";

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		response.setContentType("application/json");

		// Read JSON file and send data to frontend
		try (FileReader reader = new FileReader(JSON_FILE_PATH)) {
			JSONParser parser = new JSONParser();
			JSONArray data = (JSONArray) parser.parse(reader);

			PrintWriter out = response.getWriter();
			out.println(data.toJSONString());
		} catch (IOException | ParseException e) {
			e.printStackTrace();
			response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
		}

	}

}
