import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;

export const getTags = async () => {
	const response = await axios.get(
		`/fred/tags?api_key=${API_KEY}&file_type=json`
	);
	return response.data;
};

export const getTagSeries = async (tagNames: string) => {
	const response = await axios.get(
		`/fred/tags/series?tag_names=${tagNames}&api_key=${API_KEY}&file_type=json`
	);
	return response.data;
};

export const getSeriesObservations = async (seriesId: string) => {
	const response = await axios.get(
		`/fred/series/observations?series_id=${seriesId}&api_key=${API_KEY}&file_type=json`
	);
	return response.data;
};
