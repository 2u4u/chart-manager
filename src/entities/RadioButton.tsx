import { FormControlLabel, Radio } from "@mui/material";

export const RadioButton = ({
	value,
	label,
}: {
	value: string;
	label: string;
}) => (
	<FormControlLabel
		value={value}
		control={<Radio className="tw-p-1" />}
		label={label}
		className="-tw-ml-1"
	/>
);
