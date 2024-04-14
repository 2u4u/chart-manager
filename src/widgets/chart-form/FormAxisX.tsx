import { Box, Slider, Stack, TextField, Typography } from "@mui/material";
import { FormBlock, FormCheckbox, ShowMoreButton } from "../../entities";
import { ChangeEvent, useState } from "react";
import { ChartAxisXProps } from "../../shared/interface";
import { tickIntervalMarks } from "../../shared/constants";

export const FormAxisX = ({
	chartAxisX,
	onChangeAxisX,
}: {
	chartAxisX: ChartAxisXProps;
	onChangeAxisX: (newAxisX: ChartAxisXProps) => void;
}) => {
	const [showMoreX, setShowMoreX] = useState(false);

	const handleShowMoreX = () => {
		setShowMoreX(!showMoreX);
	};

	const handleChangeAxisVisibility = (_: any, checked: boolean) => {
		onChangeAxisX({
			...chartAxisX,
			axisVisible: checked,
		});
	};

	const handleChangeChartAxisX = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		onChangeAxisX({
			...chartAxisX,
			axisLabel: e.target.value,
		});
	};

	const handleChangeAxisGridlines = (_: any, checked: boolean) => {
		onChangeAxisX({
			...chartAxisX,
			axisGridlines: checked,
		});
	};

	const handleChangeAxisTickInterval = (_: Event, value: number | number[]) => {
		onChangeAxisX({
			...chartAxisX,
			tickInterval: value as number,
		});
	};

	const handleChangeAxisLabelTickInterval = (
		_: Event,
		value: number | number[]
	) => {
		onChangeAxisX({
			...chartAxisX,
			tickLabelInterval: value as number,
		});
	};

	return (
		<Box>
			<FormCheckbox
				onChange={handleChangeAxisVisibility}
				checked={chartAxisX.axisVisible}
				label="Show X-axis"
			/>
			<FormBlock id="axis-labels" title="Label">
				<TextField
					id="axis-labels"
					label="X-axis label"
					variant="outlined"
					size="small"
					className="tw-w-full"
					onChange={handleChangeChartAxisX}
					value={chartAxisX.axisLabel}
				/>
			</FormBlock>
			{showMoreX && (
				<>
					<FormCheckbox
						onChange={handleChangeAxisGridlines}
						checked={chartAxisX.axisGridlines}
						label="Show X-axis Gridlines"
					/>
					<FormBlock
						id="axis-tick-interval"
						title="Tick interval (every X years)"
					>
						<Stack>
							<Slider
								id="axis-tick-interval"
								value={chartAxisX.tickInterval}
								onChange={handleChangeAxisTickInterval}
								valueLabelDisplay="auto"
								min={1}
								max={10}
								marks={tickIntervalMarks}
								step={1}
								sx={{ mt: 2 }}
							/>
							<Box className="tw-flex tw-justify-between">
								<Typography variant="caption">1</Typography>
								<Typography variant="caption">10</Typography>
							</Box>
						</Stack>
					</FormBlock>
					<FormBlock
						id="axis-tick-label-interval"
						title="Tick label interval (every X years)"
					>
						<Stack>
							<Slider
								id="axis-tick-label-interval"
								value={chartAxisX.tickLabelInterval}
								onChange={handleChangeAxisLabelTickInterval}
								valueLabelDisplay="auto"
								min={1}
								max={10}
								marks={tickIntervalMarks}
								step={1}
								sx={{ mt: 2 }}
							/>
							<Box className="tw-flex tw-justify-between">
								<Typography variant="caption">1</Typography>
								<Typography variant="caption">10</Typography>
							</Box>
						</Stack>
					</FormBlock>
				</>
			)}
			<ShowMoreButton
				onShowMore={handleShowMoreX}
				showMore={showMoreX}
				text="advanced X-axis settings"
			/>
		</Box>
	);
};
