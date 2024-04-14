import { Box } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

export const ShowMoreButton = ({
	showMore,
	onShowMore,
	text,
}: {
	showMore: boolean;
	onShowMore: () => void;
	text: string;
}) => {
	return (
		<Box>
			<span
				className="tw-flex tw-cursor-pointer tw-mb-4 tw-text-sm tw-text-primary"
				onClick={onShowMore}
			>
				{showMore ? "Hide" : "Show"} {text}
				{showMore ? <ExpandLessIcon /> : <ExpandMoreIcon />}
			</span>
		</Box>
	);
};
