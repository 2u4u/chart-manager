import {
	ChartAxisEnum,
	ChartLineTypeEnum,
	ChartTypeEnum,
} from "./series.interface";

export interface ChartSettingsProps {
	title: string;
	titleVisible: boolean;
	type: ChartTypeEnum;
}
export interface ChartAxisXProps {
	axisVisible: boolean;
	axisLabel: string;
	axisGridlines: boolean;
	tickInterval: number;
	tickLabelInterval: number;
}
export interface ChartAxisYProps {
	axisVisible: boolean;
	axisLabel: string;
	axisGridlines: boolean;
	view: ChartAxisEnum;
}
export interface ChartStyleProps {
	lineType: ChartLineTypeEnum;
	lineThickness: number;
	barColor: string;
	areaColor: string;
	titleColor: string;
	lineColor: string;
	bgColor: string;
	axisColor: string;
	tickColor: string;
	labelColor: string;
}
