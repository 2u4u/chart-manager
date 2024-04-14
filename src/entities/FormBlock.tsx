import { FormLabel } from "@mui/material";
import { ErrorBoundary } from "../features";

export const FormBlock = ({
	id,
	title,
	children,
}: {
	id: string;
	title: string;
	children: React.ReactNode;
}) => (
	<div className="tw-pb-5">
		<FormLabel
			id={id}
			className="tw-mb-2 tw-block tw-text-xs tw-text-subheader"
		>
			{title}
		</FormLabel>
		<ErrorBoundary>{children}</ErrorBoundary>
	</div>
);
