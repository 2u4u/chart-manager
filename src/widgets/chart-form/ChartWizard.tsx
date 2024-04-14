import { CircularProgress, Grid, Stack } from "@mui/material";
import {
	ChartAxisEnum,
	ChartAxisXProps,
	ChartAxisYProps,
	ChartLineTypeEnum,
	ChartSettingsProps,
	ChartStyleProps,
	ChartTypeEnum,
	SeriesObservationProps,
	SeriesObservationsResponseProps,
	TagSeriesProps,
} from "../../shared/interface";
import { useState } from "react";
import { FormHeader } from "./FormHeader";
import { FormFooter } from "./FormFooter";
import { getSeriesObservations, putChart } from "../../shared/api";
import { ChartForm } from "./ChartForm";
import { ChartPreview } from "./ChartPreview";
import { useChart } from "../../shared/hooks/useChart";
import { v4 as uuidv4 } from "uuid";

export const ChartWizard = ({
	onClose,
	onLoadData,
}: {
	onClose: (event: React.KeyboardEvent | React.MouseEvent) => void;
	onLoadData: () => Promise<void>;
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

	const handleSelectSeries = async (series: TagSeriesProps | null) => {
		setSelectedSeries(series?.id || null);
		if (series?.id) {
			setSeriesDataLoading(true);
			const seriesData: SeriesObservationsResponseProps =
				await getSeriesObservations(series.id);
			setSeriesData(seriesData.observations);
			setSeriesDataLoading(false);
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
		await putChart({
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
			<FormHeader onClose={onClose} />
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
			<FormFooter onSubmit={handleSubmit} />
		</Stack>
	);
};
