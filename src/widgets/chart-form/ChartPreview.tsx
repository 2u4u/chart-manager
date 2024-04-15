import { Stack, Typography } from "@mui/material";
import { ChartTypeEnum } from "../../shared/interface";
import { BarChart, LineChart } from "@mui/x-charts";

export const ChartPreview = ({
	chartStoreProps,
	chartPreviewProps,
	chartHeight = 500,
}: {
	chartStoreProps: {
		chartProps: any;
		bgColor: string;
		titleColor: string;
		title: string;
		titleVisible: boolean;
		type: ChartTypeEnum;
	};
	chartPreviewProps: any;
	chartHeight?: number;
}) => {
	let chart = null;
	switch (chartStoreProps.type) {
		case ChartTypeEnum.Line:
		case ChartTypeEnum.Area:
			chart = <LineChart {...chartPreviewProps} height={chartHeight} />;
			break;
		case ChartTypeEnum.Bar:
			chart = <BarChart {...chartPreviewProps} height={chartHeight} />;
			break;
		default:
			break;
	}

	return (
		<Stack
			className="tw-py-8 tw-px-4 tw-items-center"
			style={{
				backgroundColor: chartStoreProps.bgColor,
			}}
		>
			{chartStoreProps.titleVisible && (
				<div className="tw-text-center">
					<Typography
						component="h2"
						style={{
							color: chartStoreProps.titleColor,
						}}
					>
						{chartStoreProps.title}
					</Typography>
				</div>
			)}
			{chart}
		</Stack>
	);
};
