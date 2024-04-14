import { Button, Divider } from "@mui/material";

export const FormFooter = ({ onSubmit }: { onSubmit: () => void }) => {
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
					Add
				</Button>
			</div>
		</div>
	);
};
