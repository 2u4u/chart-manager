import { Typography } from "@mui/material";

export const FormBlockHeader = ({ text }: { text: string }) => (
	<Typography
		component="h2"
		className="tw-mb-3 tw-text-subheader tw-text-sm tw-font-medium"
	>
		{text}
	</Typography>
);
