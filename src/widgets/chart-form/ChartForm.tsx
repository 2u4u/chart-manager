import { Divider, Stack } from "@mui/material";
import {
	ChartAxisXProps,
	ChartAxisYProps,
	ChartSettingsProps,
	ChartStyleProps,
	TagSeriesProps,
} from "../../shared/interface";
import { FormDataBlock } from "./FormDataBlock";
import { FormSettingsBlock } from "./FormSettingsBlock";
import { FormAxisBlock } from "./FormAxisBlock";
import { FormStylingBlock } from "./FormStylingBlock";

export const ChartForm = ({
	onSelectSeries,
	selectedSeries,
	chartSettings,
	onChangeSettings,
	chartAxisX,
	onChangeAxisX,
	chartAxisY,
	onChangeAxisY,
	chartStyle,
	onChangeStyle,
}: {
	onSelectSeries: (series: TagSeriesProps | null) => void;
	selectedSeries: string | null;
	chartSettings: ChartSettingsProps;
	onChangeSettings: (newSettings: ChartSettingsProps) => void;
	chartAxisX: ChartAxisXProps;
	onChangeAxisX: (newAxisX: ChartAxisXProps) => void;
	chartAxisY: ChartAxisYProps;
	onChangeAxisY: (newAxisY: ChartAxisYProps) => void;
	chartStyle: ChartStyleProps;
	onChangeStyle: (newStyle: ChartStyleProps) => void;
}) => {
	return (
		<>
			<Stack className="tw-h-full tw-overflow-hidden">
				<div className="tw-overflow-hidden">
					<Stack
						spacing={2}
						className="tw-overflow-y-auto tw-overflow-x-hidden tw-mt-0 tw-h-full"
					>
						<FormDataBlock handleSelectSeries={onSelectSeries} />
						{selectedSeries && (
							<>
								<FormSettingsBlock
									chartSettings={chartSettings}
									onChangeSettings={onChangeSettings}
								/>
								<FormAxisBlock
									chartAxisX={chartAxisX}
									onChangeAxisX={onChangeAxisX}
									chartAxisY={chartAxisY}
									onChangeAxisY={onChangeAxisY}
									chartSettings={chartSettings}
								/>
								<FormStylingBlock
									chartStyle={chartStyle}
									onChangeStyle={onChangeStyle}
									chartSettings={chartSettings}
								/>
							</>
						)}
					</Stack>
				</div>
			</Stack>
			<Divider
				orientation="vertical"
				className="tw-absolute tw-top-0 tw-right-0"
			/>
		</>
	);
};
