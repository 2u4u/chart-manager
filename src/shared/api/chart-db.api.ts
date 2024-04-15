export const postChart = async (body: any) => {
	// emulate a POST request
	const charts = localStorage.getItem("charts");

	if (charts === null) {
		localStorage.setItem("charts", JSON.stringify([body]));
	} else {
		const prevCharts = JSON.parse(charts);
		const newCharts = [...prevCharts, body];
		localStorage.setItem("charts", JSON.stringify(newCharts));
	}
	return true;
};

export const putChart = async (body: any) => {
	// emulate a PUT request
	const charts = localStorage.getItem("charts");
	const existingChart = JSON.parse(charts || "[]").findIndex(
		(chart: any) => chart.id === body.id
	);
	console.log("existingChart", existingChart);
	const newCharts = JSON.parse(charts || "[]");
	newCharts[existingChart] = body;
	localStorage.setItem("charts", JSON.stringify(newCharts));
};

export const getCharts = async () => {
	// emulate a GET request
	const charts = localStorage.getItem("charts");

	if (charts === null) {
		return [];
	}
	return JSON.parse(charts);
};

export const getChart = async (chartId: string) => {
	// emulate a GET request
	const charts = localStorage.getItem("charts");
	const chart = JSON.parse(charts || "[]").find((chart: any) => {
		return chart.id === chartId;
	});
	return chart;
};

export const deleteChart = async (chartId: string) => {
	// emulate a DELETE request
	const charts = localStorage.getItem("charts");
	const newCharts = JSON.parse(charts || "[]").filter((chart: any) => {
		return chart.id !== chartId;
	});
	console.log("newCharts", newCharts);
	console.log("chartId", chartId);
	localStorage.setItem("charts", JSON.stringify(newCharts));
};
