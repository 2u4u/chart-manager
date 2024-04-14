export const putChart = async (body: any) => {
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
};

export const deleteChart = async (chartId: string) => {
	// emulate a DELETE request
	const charts = localStorage.getItem("charts");
	const newCharts = JSON.parse(charts || "[]").filter((chart: any) => {
		return chart.id !== chartId;
	});
	localStorage.setItem("charts", JSON.stringify(newCharts));
};
