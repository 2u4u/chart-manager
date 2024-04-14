export interface TagProps {
	name: string;
	group_id: string;
	notes: string;
	created: string;
	popularity: number;
	series_count: number;
}
export interface TagsResponseProps {
	realtime_start: string;
	realtime_end: string;
	order_by: string;
	sort_order: string;
	count: number;
	offset: number;
	limit: number;
	tags: TagProps[];
}
export interface TagSeriesProps {
	id: string;
	realtime_start: string;
	realtime_end: string;
	title: string;
	observation_start: string;
	observation_end: string;
	frequency: string;
	frequency_short: string;
	units: string;
	units_short: string;
	seasonal_adjustment: string;
	seasonal_adjustment_short: string;
	last_updated: string;
	popularity: number;
	group_popularity: number;
	notes: string;
}
export interface TagSeriesResponseProps {
	realtime_start: string;
	realtime_end: string;
	order_by: string;
	sort_order: string;
	count: number;
	offset: number;
	limit: number;
	seriess: TagSeriesProps[];
}
export interface SeriesObservationProps {
	realtime_start: string;
	realtime_end: string;
	date: string;
	value: string;
}
export interface SeriesObservationsResponseProps {
	realtime_start: string;
	realtime_end: string;
	observation_start: string;
	observation_end: string;
	units: string;
	output_type: number;
	file_type: string;
	order_by: string;
	sort_order: string;
	count: number;
	offset: number;
	limit: number;
	observations: SeriesObservationProps[];
}
export enum ChartTypeEnum {
	Area = "Area",
	Bar = "Bar",
	Line = "Line",
}
export enum ChartAxisEnum {
	Linear = "Linear",
	Log = "Log",
}
export enum ChartLineTypeEnum {
	Solid = "Solid",
	Dashed = "Dashed",
	Dotted = "Dotted",
	DashDotted = "DashDotted",
}
