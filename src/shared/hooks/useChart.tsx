import {
	ChartAxisEnum,
	ChartAxisXProps,
	ChartAxisYProps,
	ChartLineTypeEnum,
	ChartSettingsProps,
	ChartStyleProps,
	ChartTypeEnum,
	SeriesObservationProps,
} from "../../shared/interface";
import { useMemo } from "react";

export const useChart = ({
	chartData,
	chartSettings,
	chartAxisX,
	chartAxisY,
	chartStyle,
}: {
	chartData: SeriesObservationProps[] | null;
	chartSettings: ChartSettingsProps;
	chartAxisX: ChartAxisXProps;
	chartAxisY: ChartAxisYProps;
	chartStyle: ChartStyleProps;
}) => {
	const dates = useMemo(
		() => chartData?.map((data: SeriesObservationProps) => new Date(data.date)),
		[chartData]
	);

	const series = useMemo(
		() =>
			chartData?.map((data) =>
				isNaN(Number(data.value)) ? null : Number(data.value)
			),
		[chartData]
	);

	const nonNullDates = useMemo(
		() =>
			chartData
				?.filter((data: SeriesObservationProps) => !isNaN(Number(data.value)))
				.map((data: SeriesObservationProps) => new Date(data.date)),
		[chartData]
	);

	const nonNullSeries = useMemo(
		() =>
			chartData
				?.filter((data: SeriesObservationProps) => !isNaN(Number(data.value)))
				.map((data: SeriesObservationProps) => Number(data.value)),
		[chartData]
	);

	const dateFormatter = (date: Date) => date.getFullYear().toString();

	const chartProps: any = {
		xAxis: [
			{
				valueFormatter: dateFormatter,
			},
		],
		series: [{}],
		colors: [],
	};

	if (chartSettings.type === ChartTypeEnum.Bar) {
		chartProps.xAxis = [
			(chartProps.xAxis[0] = {
				...chartProps.xAxis[0],
				data: dates,
				scaleType: "band",
			}),
		];
		chartProps.series = [
			(chartProps.series[0] = {
				...chartProps.series[0],
				data: series,
			}),
		];
		if (chartStyle.barColor) {
			chartProps.colors = [chartStyle.barColor];
		}
	}

	if (chartSettings.type !== ChartTypeEnum.Bar) {
		chartProps.xAxis = [
			(chartProps.xAxis[0] = {
				...chartProps.xAxis[0],
				data: dates,
				scaleType: "time",
			}),
		];
		chartProps.yAxis = [{ id: "yAxis", scaleType: "linear" }];
		chartProps.leftAxis = "yAxis";
		chartProps.series = [
			(chartProps.series[0] = {
				...chartProps.series[0],
				data: series,
				yAxisKey: "yAxis",
				showMark: false,
			}),
		];
		chartProps.sx = {
			"& .MuiLineElement-root": {
				strokeWidth: 2,
			},
		};

		if (chartAxisX.tickInterval && dates) {
			chartProps.xAxis = [
				(chartProps.xAxis[0] = {
					...chartProps.xAxis[0],
					tickInterval: [
						...dates.filter((_, i) => i % (12 * chartAxisX.tickInterval) === 0),
					],
				}),
			];
		}

		if (chartStyle.lineThickness) {
			chartProps.sx = {
				...chartProps.sx,
				"& .MuiLineElement-root": {
					...chartProps.sx["& .MuiLineElement-root"],
					strokeWidth: chartStyle.lineThickness,
				},
			};
		}

		if (chartStyle.lineType === ChartLineTypeEnum.Dashed) {
			chartProps.sx = {
				...chartProps.sx,
				"& .MuiLineElement-root": {
					...chartProps.sx["& .MuiLineElement-root"],
					strokeDasharray: `${6 * chartStyle.lineThickness} ${
						3 * chartStyle.lineThickness
					}`,
				},
			};
		}

		if (chartStyle.lineType === ChartLineTypeEnum.Dotted) {
			chartProps.sx = {
				...chartProps.sx,
				"& .MuiLineElement-root": {
					...chartProps.sx["& .MuiLineElement-root"],
					strokeDasharray: `${1 * chartStyle.lineThickness} ${
						2 * chartStyle.lineThickness
					}`,
				},
			};
		}

		if (chartStyle.lineType === ChartLineTypeEnum.DashDotted) {
			chartProps.sx = {
				...chartProps.sx,
				"& .MuiLineElement-root": {
					...chartProps.sx["& .MuiLineElement-root"],
					strokeDasharray: `${6 * chartStyle.lineThickness} ${
						3 * chartStyle.lineThickness
					} ${2 * chartStyle.lineThickness} ${1 * chartStyle.lineThickness}`,
				},
			};
		}

		if (chartStyle.lineColor) {
			chartProps.series = [
				(chartProps.series[0] = {
					...chartProps.series[0],
					color: chartStyle.lineColor,
				}),
			];
		}
	}

	if (chartSettings.type === ChartTypeEnum.Area) {
		chartProps.series = [
			(chartProps.series[0] = {
				...chartProps.series[0],
				area: true,
			}),
		];
	}

	if (!chartAxisX.axisVisible) {
		chartProps.bottomAxis = {
			disableLine: true,
		};
	}

	if (chartAxisX.axisLabel) {
		chartProps.xAxis = [
			(chartProps.xAxis[0] = {
				...chartProps.xAxis[0],
				label: chartAxisX.axisLabel,
			}),
		];
	}

	if (chartAxisX.axisGridlines) {
		chartProps.grid = { ...chartProps.grid, horizontal: true };
	}

	if (
		chartSettings.type !== ChartTypeEnum.Bar &&
		chartAxisX.tickLabelInterval &&
		dates
	) {
		chartProps.xAxis = [
			(chartProps.xAxis[0] = {
				...chartProps.xAxis[0],
				tickLabelInterval: (date: Date) => {
					const firstYear = new Date(dates[0]).getFullYear();
					const currentYear = date.getFullYear();
					const tick =
						currentYear === firstYear ||
						(currentYear - firstYear) % chartAxisX.tickLabelInterval === 0;
					return tick;
				},
			}),
		];
	}

	if (!chartAxisY.axisVisible) {
		chartProps.leftAxis = {
			disableLine: true,
		};
	}

	if (chartAxisY.axisLabel) {
		chartProps.yAxis = [
			(chartProps.yAxis[0] = {
				...chartProps.yAxis[0],
				label: chartAxisY.axisLabel,
			}),
		];
	}

	if (
		chartSettings.type === ChartTypeEnum.Line &&
		chartAxisY.view === ChartAxisEnum.Log
	) {
		chartProps.xAxis = [
			(chartProps.xAxis[0] = {
				...chartProps.xAxis[0],
				data: nonNullDates,
			}),
		];
		chartProps.yAxis = [
			(chartProps.yAxis[0] = { ...chartProps.yAxis[0], scaleType: "log" }),
		];
		chartProps.series = [
			(chartProps.series[0] = {
				...chartProps.series[0],
				data: nonNullSeries,
			}),
		];
	}

	if (chartStyle.tickColor) {
		chartProps.sx = {
			...chartProps.sx,
			".MuiChartsAxis-bottom .MuiChartsAxis-tick": {
				stroke: chartStyle.tickColor,
			},
			".MuiChartsAxis-left .MuiChartsAxis-tick": {
				stroke: chartStyle.tickColor,
			},
		};
	}

	if (chartStyle.labelColor) {
		chartProps.sx = {
			...chartProps.sx,
			".MuiChartsAxis-bottom .MuiChartsAxis-label": {
				fill: chartStyle.labelColor,
			},
			".MuiChartsAxis-left .MuiChartsAxis-label": {
				fill: chartStyle.labelColor,
			},
		};
	}

	if (chartStyle.axisColor) {
		chartProps.sx = {
			...chartProps.sx,
			".MuiChartsAxis-bottom .MuiChartsAxis-line": {
				stroke: chartStyle.axisColor,
			},
			".MuiChartsAxis-left .MuiChartsAxis-line": {
				stroke: chartStyle.axisColor,
			},
		};
	}

	if (chartStyle.areaColor) {
		chartProps.sx = {
			...chartProps.sx,
			".MuiAreaElement-root": {
				fill: chartStyle.areaColor,
			},
		};
	}

	const chartPreviewProps = {
		...chartProps,
	};

	const chartStoreProps = {
		chartProps,
		bgColor: chartStyle.bgColor,
		titleColor: chartStyle.titleColor,
		title: chartSettings.title,
		titleVisible: chartSettings.titleVisible,
		type: chartSettings.type,
	};

	return {
		chartStoreProps,
		chartPreviewProps,
	};
};
