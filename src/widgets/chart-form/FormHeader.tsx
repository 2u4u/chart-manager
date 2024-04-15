import { Box, Button, Divider, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export const FormHeader = ({
	onClose,
	text,
}: {
	onClose: (event: React.KeyboardEvent | React.MouseEvent) => void;
	text: string;
}) => (
	<>
		<Box className="tw-px-5 tw-py-4">
			<Typography
				variant="h6"
				component="h1"
				className="tw-text-lg tw-font-medium"
			>
				{text}
			</Typography>
		</Box>
		<Button
			variant="text"
			className="tw-absolute tw-top-5 tw-right-4 tw-p-0 tw-m-0 tw-min-w-0 tw-text-black"
			onClick={onClose}
		>
			<CloseIcon />
		</Button>
		<Divider />
	</>
);
