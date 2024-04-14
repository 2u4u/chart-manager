import { Box, Divider, TextField } from "@mui/material";
import {
	FormBlock,
	FormBlockHeader,
	FormCheckbox,
	ToggleButton,
	ToggleButtonGroup,
} from "../../entities";
import Icon from "@mdi/react";
import { mdiChartAreasplineVariant, mdiChartBar, mdiChartLine } from "@mdi/js";
import { ChartSettingsProps, ChartTypeEnum } from "../../shared/interface";

export const FormSettingsBlock = ({
	chartSettings,
	onChangeSettings,
}: {
	chartSettings: ChartSettingsProps;
	onChangeSettings: (newSettings: ChartSettingsProps) => void;
}) => {
	const handleChangeTitleVisibility = (_: any, checked: boolean) => {
		onChangeSettings({ ...chartSettings, titleVisible: checked });
	};

	const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
		onChangeSettings({ ...chartSettings, title: e.target.value });
	};

	const handleChangeChartType = (_: any, type: ChartTypeEnum) => {
		onChangeSettings({ ...chartSettings, type });
	};

	return (
		<>
			<Box className="tw-px-5 tw-pt-2">
				<FormBlockHeader text="Chart Settings" />
				<FormCheckbox
					onChange={handleChangeTitleVisibility}
					checked={chartSettings.titleVisible}
					label="Show title"
				/>
				{chartSettings.titleVisible && (
					<FormBlock id="chart-title" title="Chart title">
						<TextField
							id="chart-title"
							variant="outlined"
							label="Title"
							size="small"
							className="tw-w-full"
							value={chartSettings.title}
							onChange={handleChangeTitle}
						/>
					</FormBlock>
				)}
				<FormBlock id="chart-type" title="Chart type">
					<ToggleButtonGroup
						value={chartSettings.type}
						onChange={handleChangeChartType}
						id="chart-type"
					>
						<ToggleButton value={ChartTypeEnum.Line} title="Line Chart">
							<Icon path={mdiChartLine} size={1} title="Line Chart" />
						</ToggleButton>
						<ToggleButton value={ChartTypeEnum.Area} title="Area Chart">
							<Icon
								path={mdiChartAreasplineVariant}
								size={1}
								title="Area Chart"
							/>
						</ToggleButton>
						<ToggleButton value={ChartTypeEnum.Bar} title="Bar Chart">
							<Icon path={mdiChartBar} size={1} title="Bar Chart" />
						</ToggleButton>
					</ToggleButtonGroup>
				</FormBlock>
			</Box>
			<Divider />
		</>
	);
};
