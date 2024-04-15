import { CircularProgress, Grid, Stack } from "@mui/material";
import {
	ChartAxisEnum,
	ChartAxisXProps,
	ChartAxisYProps,
	ChartLineTypeEnum,
	ChartSettingsProps,
	ChartStyleProps,
	ChartTypeEnum,
	ChartProps,
	SeriesObservationProps,
	SeriesObservationsResponseProps,
	TagSeriesProps,
} from "../../shared/interface";
import { useEffect, useState } from "react";
import { FormHeader } from "./FormHeader";
import { FormFooter } from "./FormFooter";
import { getSeriesObservations, postChart, putChart } from "../../shared/api";
import { ChartForm } from "./ChartForm";
import { ChartPreview } from "./ChartPreview";
import { useChart } from "../../shared/hooks/useChart";
import { v4 as uuidv4 } from "uuid";

export const ChartWizard = ({
	onClose,
	onLoadData,
	chart,
}: {
	onClose: (event: React.KeyboardEvent | React.MouseEvent) => void;
	onLoadData: () => Promise<void>;
	chart?: ChartProps;
}) => {
	const [selectedSeries, setSelectedSeries] = useState<string | null>(null);
	const [seriesDataLoading, setSeriesDataLoading] = useState<boolean>(false);
	const [seriesData, setSeriesData] = useState<SeriesObservationProps[] | null>(
		null
	);
	const [chartSettings, setChartSettings] = useState<ChartSettingsProps>({
		title: "",
		titleVisible: true,
		type: ChartTypeEnum.Line,
	});
	const [chartAxisX, setChartAxisX] = useState<ChartAxisXProps>({
		axisVisible: true,
		axisLabel: "",
		axisGridlines: true,
		tickInterval: 2,
		tickLabelInterval: 2,
	});
	const [chartAxisY, setChartAxisY] = useState<ChartAxisYProps>({
		axisVisible: true,
		axisLabel: "",
		axisGridlines: true,
		view: ChartAxisEnum.Linear,
	});
	const [chartStyle, setChartStyle] = useState<ChartStyleProps>({
		lineType: ChartLineTypeEnum.Solid,
		lineThickness: 2,
		titleColor: "#000000",
		lineColor: "#29dac7",
		bgColor: "#ffffff",
		axisColor: "#000000",
		tickColor: "#000000",
		labelColor: "#000000",
		areaColor: "#29dac7",
		barColor: "#fcaa5f",
	});

	useEffect(() => {
		const hadleLoadData = async () => {
			if (chart) {
				setChartSettings(chart.chartSettings);
				setChartAxisX(chart.chartAxisX);
				setChartAxisY(chart.chartAxisY);
				setChartStyle(chart.chartStyle);
				setSelectedSeries(chart.seriesId);
			}
			if (chart?.seriesId) {
				await handleLoadSeriesData(chart.seriesId);
			}
		};
		hadleLoadData();
	}, [chart]);

	const handleLoadSeriesData = async (seriesId: string) => {
		if (seriesId) {
			setSeriesDataLoading(true);
			const seriesData: SeriesObservationsResponseProps =
				await getSeriesObservations(seriesId);
			setSeriesData(seriesData.observations);
			setSeriesDataLoading(false);
		}
	};

	const handleSelectSeries = async (series: TagSeriesProps | null) => {
		setSelectedSeries(series?.id || null);
		if (series?.id) {
			await handleLoadSeriesData(series.id);
		}
		if (series?.title) {
			setChartSettings({
				...chartSettings,
				title: series.title,
			});
		} else {
			setChartSettings({
				...chartSettings,
				title: "",
			});
		}
	};

	const handleChangeChartSettings = (chartSettings: ChartSettingsProps) => {
		setChartSettings(chartSettings);
	};

	const handleChangeChartAxisX = (chartAxisX: ChartAxisXProps) => {
		setChartAxisX(chartAxisX);
	};

	const handleChangeChartAxisY = (chartAxisY: ChartAxisYProps) => {
		setChartAxisY(chartAxisY);
	};

	const handleChangeChartStyle = (chartStyle: ChartStyleProps) => {
		setChartStyle(chartStyle);
	};

	const { chartStoreProps, chartPreviewProps } = useChart({
		chartData: seriesData,
		chartSettings,
		chartAxisX,
		chartAxisY,
		chartStyle,
	});

	const handleSubmit = async () => {
		if (chart?.id) {
			await putChart({
				chartSettings,
				chartAxisX,
				chartAxisY,
				chartStyle,
				seriesId: selectedSeries,
				id: chart.id,
			});
			await onLoadData();
			return;
		}
		await postChart({
			chartSettings,
			chartAxisX,
			chartAxisY,
			chartStyle,
			seriesId: selectedSeries,
			id: uuidv4(),
		});
		await onLoadData();
	};

	return (
		<Stack className="tw-h-full tw-overflow-hidden tw-relative tw-text-header">
			<FormHeader
				onClose={onClose}
				text={chart?.id ? "Edit Chart" : "Add Chart"}
			/>
			<Grid container className="tw-h-full tw-overflow-hidden">
				<Grid item xs={6} className="tw-h-full tw-relative">
					<ChartForm
						onSelectSeries={handleSelectSeries}
						selectedSeries={selectedSeries}
						chartSettings={chartSettings}
						onChangeSettings={handleChangeChartSettings}
						chartAxisX={chartAxisX}
						onChangeAxisX={handleChangeChartAxisX}
						chartAxisY={chartAxisY}
						onChangeAxisY={handleChangeChartAxisY}
						chartStyle={chartStyle}
						onChangeStyle={handleChangeChartStyle}
						isEdit={!!chart?.id}
					/>
				</Grid>
				<Grid item xs={6} className="tw-h-full tw-w-full">
					{selectedSeries && seriesDataLoading && (
						<div className="tw-w-full tw-h-full tw-flex tw-items-center tw-justify-center">
							<CircularProgress />
						</div>
					)}
					{seriesData?.length && (
						<ChartPreview
							chartStoreProps={chartStoreProps}
							chartPreviewProps={chartPreviewProps}
						/>
					)}
				</Grid>
			</Grid>
			<FormFooter onSubmit={handleSubmit} text={chart?.id ? "Edit" : "Add"} />
		</Stack>
	);
};
