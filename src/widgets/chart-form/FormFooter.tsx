import { Button, Divider } from "@mui/material";

export const FormFooter = ({
	onSubmit,
	text,
}: {
	onSubmit: () => void;
	text: string;
}) => {
	return (
		<div className="tw-mt-auto tw-mb-0">
			<Divider />
			<div className="tw-py-6 tw-px-5">
				<Button
					variant="contained"
					className="tw-bg-primary tw-w-full"
					size="large"
					onClick={onSubmit}
				>
					{text}
				</Button>
			</div>
		</div>
	);
};
