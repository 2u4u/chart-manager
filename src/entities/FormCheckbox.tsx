import { Checkbox, FormControlLabel } from "@mui/material";

export const FormCheckbox = ({
	onChange,
	checked,
	label,
}: {
	onChange: (_: any, checked: boolean) => void;
	checked: boolean;
	label: string;
}) => {
	return (
		<FormControlLabel
			control={
				<Checkbox
					onChange={onChange}
					checked={checked}
					className="tw-py-0 tw-pr-1"
				/>
			}
			label={label}
			className="tw-mb-5 [&>span]:tw-text-sm"
		/>
	);
};
