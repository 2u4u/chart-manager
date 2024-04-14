import {
	Checkbox,
	FormControlLabel as MUIFormControlLabel,
} from "@mui/material";

export const FormControlLabel = ({
	onChange,
	checked,
}: {
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	checked: boolean;
}) => (
	<MUIFormControlLabel
		control={
			<Checkbox
				onChange={onChange}
				checked={checked}
				className="tw-py-0 tw-pr-1"
			/>
		}
		label="Show title"
		className="tw-mb-5 [&>span]:tw-text-sm"
	/>
);
