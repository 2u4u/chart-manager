import { Button, CircularProgress, Menu, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import {
	ChartProps,
	SeriesObservationProps,
	SeriesObservationsResponseProps,
} from "../shared/interface";
import { deleteChart, getSeriesObservations } from "../shared/api";
import { useChart } from "../shared/hooks/useChart";
import { ChartPreview } from "../widgets/chart-form/ChartPreview";
import Icon from "@mdi/react";
import { mdiDotsVertical } from "@mdi/js";

export const ChartItem = ({
	chart,
	onLoadData,
	onEditChart,
}: {
	chart: ChartProps;
	onLoadData: () => Promise<void>;
	onEditChart: (id: string) => void;
}) => {
	const [loading, setLoading] = useState(true);
	const [seriesData, setSeriesData] = useState<SeriesObservationProps[] | null>(
		null
	);
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleDelete = async () => {
		await deleteChart(chart.id);
		await onLoadData();
		handleClose();
	};

	const handleEdit = async () => {
		onEditChart(chart.id);
		handleClose();
	};

	useEffect(() => {
		const handleLoadData = async () => {
			if (chart.seriesId) {
				setLoading(true);
				const seriesData: SeriesObservationsResponseProps =
					await getSeriesObservations(chart.seriesId);
				setSeriesData(seriesData.observations);
				setLoading(false);
			}
		};

		handleLoadData();
	}, [chart]);

	const { chartStoreProps, chartPreviewProps } = useChart({
		chartData: seriesData,
		chartSettings: chart.chartSettings,
		chartAxisX: chart.chartAxisX,
		chartAxisY: chart.chartAxisY,
		chartStyle: chart.chartStyle,
	});

	return (
		<div className="tw-container tw-rounded-md tw-bg-white tw-shadow-md tw-py-4 tw-px-6 tw-mb-6 tw-h[500px] tw-relative">
			<div className="tw-absolute tw-right-4 ">
				<Button
					id="basic-button"
					aria-controls={open ? "item-menu" : undefined}
					aria-haspopup="true"
					aria-expanded={open ? "true" : undefined}
					onClick={handleClick}
				>
					<Icon
						path={mdiDotsVertical}
						size={1}
						className="tw-text-header tw-cursor-pointer"
					/>
				</Button>
				<Menu
					id="item-menu"
					anchorEl={anchorEl}
					open={open}
					onClose={handleClose}
					MenuListProps={{
						"aria-labelledby": "basic-button",
					}}
				>
					<MenuItem onClick={handleDelete}>Delete chart</MenuItem>
					<MenuItem onClick={handleEdit}>Edit chart</MenuItem>
				</Menu>
			</div>
			{loading ? (
				<div className="tw-flex tw-w-full tw-h-full tw-items-center tw-justify-center">
					<CircularProgress />
				</div>
			) : (
				<ChartPreview
					chartStoreProps={chartStoreProps}
					chartPreviewProps={chartPreviewProps}
				/>
			)}
		</div>
	);
};
