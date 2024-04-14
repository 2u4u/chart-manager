import { Box, Slider, Stack, Typography } from "@mui/material";
import {
	FormBlock,
	FormBlockHeader,
	ShowMoreButton,
	ToggleButton,
	ToggleButtonGroup,
} from "../../entities";
import { tickIntervalMarks } from "../../shared/constants";
import {
	ChartLineTypeEnum,
	ChartSettingsProps,
	ChartStyleProps,
	ChartTypeEnum,
} from "../../shared/interface";
import { useState } from "react";

export const FormStylingBlock = ({
	chartStyle,
	onChangeStyle,
	chartSettings,
}: {
	chartStyle: ChartStyleProps;
	onChangeStyle: (newStyle: ChartStyleProps) => void;
	chartSettings: ChartSettingsProps;
}) => {
	const [showMore, setShowMore] = useState(false);

	const handleShowMore = () => {
		setShowMore(!showMore);
	};

	const handleChangeLineStyle = (_: any, lineType: ChartLineTypeEnum) => {
		onChangeStyle({ ...chartStyle, lineType });
	};

	const handleChangeThickness = (_: Event, value: number | number[]) => {
		onChangeStyle({ ...chartStyle, lineThickness: value as number });
	};

	const handleChangeLineColor = (e: React.ChangeEvent<HTMLInputElement>) => {
		onChangeStyle({ ...chartStyle, lineColor: e.target.value });
	};

	const handleChangeBgColor = (e: React.ChangeEvent<HTMLInputElement>) => {
		onChangeStyle({ ...chartStyle, bgColor: e.target.value });
	};

	const handleChangeAreaColor = (e: React.ChangeEvent<HTMLInputElement>) => {
		onChangeStyle({ ...chartStyle, areaColor: e.target.value });
	};

	const handleChangeAxisColor = (e: React.ChangeEvent<HTMLInputElement>) => {
		onChangeStyle({ ...chartStyle, axisColor: e.target.value });
	};

	const handleChangeLabelColor = (e: React.ChangeEvent<HTMLInputElement>) => {
		onChangeStyle({ ...chartStyle, labelColor: e.target.value });
	};

	const handleChangeTickColor = (e: React.ChangeEvent<HTMLInputElement>) => {
		onChangeStyle({ ...chartStyle, tickColor: e.target.value });
	};

	const handleChangeTitleColor = (e: React.ChangeEvent<HTMLInputElement>) => {
		onChangeStyle({ ...chartStyle, titleColor: e.target.value });
	};

	const handleChangebarColor = (e: React.ChangeEvent<HTMLInputElement>) => {
		onChangeStyle({ ...chartStyle, barColor: e.target.value });
	};

	return (
		<Box className="tw-px-5 tw-pt-2">
			<FormBlockHeader text="Styling" />
			{chartSettings.type !== ChartTypeEnum.Bar && (
				<>
					<FormBlock id="line-style" title="Line style">
						<ToggleButtonGroup
							value={chartStyle.lineType}
							onChange={handleChangeLineStyle}
							id="line-style"
						>
							<ToggleButton value={ChartLineTypeEnum.Solid} title="Solid Line">
								<div
									data-type="nested"
									className="tw-w-[18px] tw-mx-[3px] tw-h-[2px] tw-my-[11px"
								/>
							</ToggleButton>
							<ToggleButton
								value={ChartLineTypeEnum.Dotted}
								title="Dotted Line"
							>
								<div className="tw-flex tw-gap-1 tw-mx-[4px] tw-my-[11px]">
									<div
										data-type="nested"
										className="tw-w-[3px] tw-h-[2px] tw-rounded-full"
									/>
									<div
										data-type="nested"
										className="tw-w-[3px] tw-h-[2px] tw-rounded-full"
									/>
									<div
										data-type="nested"
										className="tw-w-[3px] tw-h-[2px] tw-rounded-full"
									/>
								</div>
							</ToggleButton>
							<ToggleButton
								value={ChartLineTypeEnum.Dashed}
								title="Dashed Line"
							>
								<div className="tw-flex tw-gap-[2px] tw-mx-[3px] tw-my-[11px]">
									<div
										data-type="nested"
										className="tw-w-[8px] tw-h-[2px] tw-rounded-full"
									/>
									<div
										data-type="nested"
										className="tw-w-[8px] tw-h-[2px] tw-rounded-full"
									/>
								</div>
							</ToggleButton>
							<ToggleButton
								value={ChartLineTypeEnum.DashDotted}
								title="Dash-dotted Line"
							>
								<div className="tw-flex tw-gap-[3px] tw-mx-[5px] tw-my-[11px]">
									<div
										data-type="nested"
										className="tw-w-[3px] tw-h-[2px] tw-rounded-full"
									/>
									<div
										data-type="nested"
										className="tw-w-[8px] tw-h-[2px] tw-rounded-full"
									/>
								</div>
							</ToggleButton>
						</ToggleButtonGroup>
					</FormBlock>
					<FormBlock id="line-thickness" title="Line thickness">
						<Stack>
							<Slider
								id="line-thickness"
								value={chartStyle.lineThickness}
								onChange={handleChangeThickness}
								valueLabelDisplay="auto"
								min={1}
								max={10}
								marks={tickIntervalMarks}
								defaultValue={2}
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
			<FormBlock id="title-color" title="Title color">
				<div>
					<input
						type="color"
						id="title-color-input"
						name="title-color-input"
						value={chartStyle.titleColor}
						className="tw-w-full"
						onChange={handleChangeTitleColor}
					/>
				</div>
			</FormBlock>
			{chartSettings.type === ChartTypeEnum.Bar && (
				<FormBlock id="bar-color" title="bar color">
					<div>
						<input
							type="color"
							id="bar-color-input"
							name="bar-color-input"
							value={chartStyle.barColor}
							className="tw-w-full"
							onChange={handleChangebarColor}
						/>
					</div>
				</FormBlock>
			)}
			{chartSettings.type !== ChartTypeEnum.Bar && (
				<FormBlock id="line-color" title="Line color">
					<div>
						<input
							type="color"
							id="line-color-input"
							name="line-color-input"
							value={chartStyle.lineColor}
							className="tw-w-full"
							onChange={handleChangeLineColor}
						/>
					</div>
				</FormBlock>
			)}
			<FormBlock id="bg-color" title="Background color">
				<input
					type="color"
					id="bg-color-input"
					name="bg-color-input"
					value={chartStyle.bgColor}
					className="tw-w-full"
					onChange={handleChangeBgColor}
				/>
			</FormBlock>
			{chartSettings.type === ChartTypeEnum.Area && (
				<FormBlock id="area-color" title="Area color">
					<div>
						<input
							type="color"
							id="area-color-input"
							name="area-color-input"
							value={chartStyle.areaColor}
							className="tw-w-full"
							onChange={handleChangeAreaColor}
						/>
					</div>
				</FormBlock>
			)}

			{showMore && (
				<>
					<FormBlock id="axis-color" title="Axis color">
						<div>
							<input
								type="color"
								id="axis-color-input"
								name="axis-color-input"
								value={chartStyle.axisColor}
								className="tw-w-full"
								onChange={handleChangeAxisColor}
							/>
						</div>
					</FormBlock>
					<FormBlock id="label-color" title="Label color">
						<div>
							<input
								type="color"
								id="label-color-input"
								name="label-color-input"
								value={chartStyle.labelColor}
								className="tw-w-full"
								onChange={handleChangeLabelColor}
							/>
						</div>
					</FormBlock>
					<FormBlock id="tick-color" title="Tick color">
						<div>
							<input
								type="color"
								id="tick-color-input"
								name="tick-color-input"
								value={chartStyle.tickColor}
								className="tw-w-full"
								onChange={handleChangeTickColor}
							/>
						</div>
					</FormBlock>
				</>
			)}

			<ShowMoreButton
				onShowMore={handleShowMore}
				showMore={showMore}
				text="advanced color settings"
			/>
		</Box>
	);
};
