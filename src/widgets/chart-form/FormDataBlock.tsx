import { Box, Divider } from "@mui/material";
import { Autocomplete, FormBlock, FormBlockHeader } from "../../entities";
import { getTagSeries, getTags } from "../../shared/api";
import {
	TagProps,
	TagSeriesProps,
	TagSeriesResponseProps,
	TagsResponseProps,
} from "../../shared/interface";
import { useState } from "react";

export const FormDataBlock = ({
	handleSelectSeries,
}: {
	handleSelectSeries: (series: TagSeriesProps | null) => void;
}) => {
	const [selectedTag, setSelectedTag] = useState<string | null>(null);

	const handleLoadTags = async () => {
		try {
			const data = await getTags();
			return data;
		} catch {
			throw new Error("Unable to load tags");
		}
	};

	const handleTagsData = (data: TagsResponseProps) => {
		return data.tags;
	};

	const handleLoadSeries = async () => {
		if (selectedTag) {
			try {
				const data = await getTagSeries(selectedTag);
				return data;
			} catch {
				throw new Error("Unable to load series");
			}
		}
	};

	const handleSeriesData = (data: TagSeriesResponseProps) => {
		return data.seriess;
	};

	const handleSelectTag = (tag: TagProps | null) => {
		setSelectedTag(tag?.name || null);
		if (!tag) {
			handleSelectSeries(null);
		}
	};

	return (
		<>
			<Box className="tw-px-5 tw-pt-6">
				<FormBlockHeader text="Data Source" />
				<FormBlock id="chart-tag" title="Select tag">
					<Autocomplete
						id="chart-tag"
						onLoadData={handleLoadTags}
						onModifyLoadedData={handleTagsData}
						idenitifier="name"
						onSelect={handleSelectTag}
					/>
				</FormBlock>
				{selectedTag && (
					<FormBlock id="chart-series" title="Select series">
						<Autocomplete
							id="chart-series"
							onLoadData={handleLoadSeries}
							onModifyLoadedData={handleSeriesData}
							idenitifier="title"
							onSelect={handleSelectSeries}
						/>
					</FormBlock>
				)}
			</Box>
			<Divider />
		</>
	);
};
