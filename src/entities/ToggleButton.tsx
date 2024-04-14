import { ToggleButton as MUIToggleButton } from "@mui/material";

export const ToggleButton = ({
	title,
	value,
	children,
}: {
	title: string;
	value: string;
	children: React.ReactNode;
}) => (
	<MUIToggleButton
		value={value}
		aria-label={title}
		size="small"
		sx={{
			".MuiToggleButton-root": {
				backgroundColor: "#a5a3ae",
			},
			".MuiToggleButton-root.Mui-selected div": {
				backgroundColor: "#fff",
			},
		}}
	>
		{children}
	</MUIToggleButton>
);
