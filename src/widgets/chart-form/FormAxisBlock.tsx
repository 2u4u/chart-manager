import { Box, Divider } from "@mui/material";
import { FormBlockHeader } from "../../entities";
import {
	ChartAxisXProps,
	ChartAxisYProps,
	ChartSettingsProps,
} from "../../shared/interface";
import { FormAxisX } from "./FormAxisX";
import { FormAxisY } from "./FormAxisY";

export const FormAxisBlock = ({
	chartAxisX,
	onChangeAxisX,
	chartAxisY,
	onChangeAxisY,
	chartSettings,
}: {
	chartAxisX: ChartAxisXProps;
	onChangeAxisX: (newAxisX: ChartAxisXProps) => void;
	chartAxisY: ChartAxisYProps;
	onChangeAxisY: (newAxisY: ChartAxisYProps) => void;
	chartSettings: ChartSettingsProps;
}) => (
	<>
		<Box className="tw-px-5 tw-pt-2">
			<FormBlockHeader text="Axis Configuration" />
			<FormAxisX chartAxisX={chartAxisX} onChangeAxisX={onChangeAxisX} />
			<FormAxisY
				chartSettings={chartSettings}
				chartAxisY={chartAxisY}
				onChangeAxisY={onChangeAxisY}
			/>
		</Box>
		<Divider />
	</>
);
