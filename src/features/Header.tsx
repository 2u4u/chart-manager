import { AppBar, Button, Toolbar } from "@mui/material";

export const Header = ({
	onClick,
}: {
	onClick: (event: React.KeyboardEvent | React.MouseEvent) => void;
}) => {
	return (
		<div className="tw-w-full tw-fixed tw-z-10">
			<AppBar
				position="static"
				className="tw-container tw-mx-auto tw-rounded-md tw-bg-white tw-shadow-md tw-mt-4"
			>
				<Toolbar>
					<Button
						variant="contained"
						className="tw-bg-primary"
						onClick={onClick}
					>
						Add new chart
					</Button>
				</Toolbar>
			</AppBar>
		</div>
	);
};
