import { ToggleButtonGroup as MUIToggleButtonGroup } from "@mui/material";

export const ToggleButtonGroup = ({
	value,
	onChange,
	id,
	children,
}: {
	value: string;
	onChange: (
		event: React.MouseEvent<HTMLElement, MouseEvent>,
		value: any
	) => void;
	id: string;
	children: React.ReactNode | React.ReactNode[];
}) => (
	<MUIToggleButtonGroup
		color="primary"
		value={value}
		exclusive
		onChange={onChange}
		aria-label={id}
		sx={{
			".MuiToggleButton-root.Mui-selected": {
				backgroundColor: "#7367f0",
				color: "#fff",
				opacity: 1,
				"&:hover": {
					backgroundColor: "#7367f0",
					color: "#fff",
					"& [data-type='nested']": {
						backgroundColor: "#fff",
					},
				},
				"& [data-type='nested']": {
					backgroundColor: "#fff",
				},
			},
			".MuiToggleButton-primary": {
				color: "#a5a3ae",
				paddingLeft: "1.5rem",
				paddingRight: "1.5rem",
				"&:hover": {
					backgroundColor: "#fff",
					color: "#7367f0",
					borderColor: "#7367f0",
					"& [data-type='nested']": {
						backgroundColor: "#7367f0",
					},
				},
				"& [data-type='nested']": {
					backgroundColor: "#a5a3ae",
				},
			},
		}}
	>
		{children}
	</MUIToggleButtonGroup>
);
