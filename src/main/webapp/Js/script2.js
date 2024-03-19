fetch("BillTable")
	.then((response) => response.json())
	.then((data) => {
		Object.keys(data).forEach((key) => {
			data[key]["Units"] = parseInt(data[key]["Units"]);
		});

		//let total_consumption = Object.values(data).reduce((sum, entry) => sum + entry["Units"], 0);

		let currentMonth = new Date().toISOString().slice(0, 7);
		let twelveMonthsAgo = new Date(
			new Date().setFullYear(new Date().getFullYear() - 1)
		);
		let lastTwelveData = Object.entries(data)
			.filter(([key, entry]) => new Date(key) >= twelveMonthsAgo)
			.map(([key, entry]) => entry["Units"]);
		let monthlyAvg =
			lastTwelveData.reduce((sum, units) => sum + units, 0) /
			lastTwelveData.length;
		let monthlyHighest = Math.max(...lastTwelveData);
		let monthlyLowest = Math.min(...lastTwelveData);

		// Calculate metrics for the second table (yearly consumption)
		let yearlyData = {};
		Object.entries(data).forEach(([key, entry]) => {
			let year = new Date(key).getFullYear();
			let units = entry["Units"];
			if (!yearlyData[year]) {
				yearlyData[year] = [units];
			} else {
				yearlyData[year].push(units);
			}
		});

		// Calculate yearly totals and averages
		let yearlyTotals = Object.entries(yearlyData).map(([year, unitsList]) => ({
			year: year,
			total: unitsList.reduce((sum, units) => sum + units, 0),
			average:
				unitsList.reduce((sum, units) => sum + units, 0) / unitsList.length,
		}));

		// Find minimum and maximum yearly totals
		let minYearlyTotal = Math.min(...yearlyTotals.map((entry) => entry.total));
		let maxYearlyTotal = Math.max(...yearlyTotals.map((entry) => entry.total));

		// Find average yearly consumption
		let totalYears = yearlyTotals.length;
		let totalYearlyConsumption = yearlyTotals.reduce(
			(sum, entry) => sum + entry.total,
			0
		);
		let averageYearlyConsumption = totalYearlyConsumption / totalYears;



		// Now you can populate your table with the calculated metrics
		// Populate table on homepage
		document.querySelector(
			"table:first-of-type tbody tr:nth-child(1) td:nth-child(2)"
		).textContent =  monthlyAvg.toLocaleString(undefined, { maximumFractionDigits: 2 });
		document.querySelector(
			"table:first-of-type tbody tr:nth-child(2) td:nth-child(2)"
		).textContent = monthlyHighest.toLocaleString(undefined, { minimumFractionDigits: 2 });
		document.querySelector(
			"table:first-of-type tbody tr:nth-child(3) td:nth-child(2)"
		).textContent = monthlyLowest.toLocaleString(undefined, { minimumFractionDigits: 2 });

		// Populate the second table with calculated metrics
		document.querySelector(
			"table:last-of-type tbody tr:nth-child(1) td:nth-child(2)"
		).textContent = averageYearlyConsumption.toLocaleString(undefined, { minimumFractionDigits: 2 });
		document.querySelector(
			"table:last-of-type tbody tr:nth-child(2) td:nth-child(2)"
		).textContent =maxYearlyTotal.toLocaleString(undefined, { minimumFractionDigits: 2 });
		document.querySelector(
			"table:last-of-type tbody tr:nth-child(3) td:nth-child(2)"
		).textContent = minYearlyTotal.toLocaleString(undefined, { minimumFractionDigits: 2 });
	})
	.catch((error) => console.error("Error fetching data:", error));
