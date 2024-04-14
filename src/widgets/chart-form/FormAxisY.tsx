import { Box, TextField } from "@mui/material";
import {
	FormBlock,
	FormCheckbox,
	ToggleButton,
	ToggleButtonGroup,
} from "../../entities";
import { ChangeEvent } from "react";
import {
	ChartAxisEnum,
	ChartAxisYProps,
	ChartSettingsProps,
	ChartTypeEnum,
} from "../../shared/interface";
import Icon from "@mdi/react";
import { mdiVectorLine, mdiVectorRadius } from "@mdi/js";

export const FormAxisY = ({
	chartAxisY,
	onChangeAxisY,
	chartSettings,
}: {
	chartAxisY: ChartAxisYProps;
	onChangeAxisY: (newAxisY: ChartAxisYProps) => void;
	chartSettings: ChartSettingsProps;
}) => {
	const handleChangeAxisVisibility = (_: any, checked: boolean) => {
		onChangeAxisY({
			...chartAxisY,
			axisVisible: checked,
		});
	};

	const handleChangeChartAxisY = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		onChangeAxisY({
			...chartAxisY,
			axisLabel: e.target.value,
		});
	};

	const handleChangeAxisView = (_: any, view: ChartAxisEnum) => {
		onChangeAxisY({ ...chartAxisY, view });
	};

	return (
		<Box>
			<FormCheckbox
				onChange={handleChangeAxisVisibility}
				checked={chartAxisY.axisVisible}
				label="Show Y-axis"
			/>
			<FormBlock id="axis-labels" title="Label">
				<TextField
					id="axis-labels"
					label="Y-axis label"
					variant="outlined"
					size="small"
					className="tw-w-full"
					onChange={handleChangeChartAxisY}
					value={chartAxisY.axisLabel}
				/>
			</FormBlock>
			{chartSettings.type === ChartTypeEnum.Line && (
				<FormBlock id="axis-view" title="Axis view">
					<ToggleButtonGroup
						value={chartAxisY.view}
						onChange={handleChangeAxisView}
						id="axis-view"
					>
						<ToggleButton
							value={ChartAxisEnum.Linear}
							title={ChartAxisEnum.Linear}
						>
							<Icon
								path={mdiVectorLine}
								size={1}
								title={ChartAxisEnum.Linear}
							/>
						</ToggleButton>
						<ToggleButton value={ChartAxisEnum.Log} title={ChartAxisEnum.Log}>
							<Icon
								path={mdiVectorRadius}
								size={1}
								title={ChartAxisEnum.Log}
								rotate={270}
							/>
						</ToggleButton>
					</ToggleButtonGroup>
				</FormBlock>
			)}
		</Box>
	);
};
