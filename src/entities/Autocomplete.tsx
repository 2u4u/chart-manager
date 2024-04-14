import {
	Autocomplete as MUIAutocomplete,
	CircularProgress,
	TextField,
} from "@mui/material";
import { SyntheticEvent, useEffect, useState } from "react";
import { useAlert } from "../shared/hooks";

export const Autocomplete = <T,>({
	id,
	onLoadData,
	onModifyLoadedData,
	idenitifier,
	onSelect,
}: {
	id: string;
	onLoadData: () => Promise<any>;
	onModifyLoadedData: (data: any) => T[];
	idenitifier: string;
	onSelect: (value: T | null) => void;
}) => {
	const [openAutocomplete, setOpenAutocomplete] = useState(false);
	const [loading, setLoading] = useState(false);
	const [options, setOptions] = useState<T[]>([]);
	const { showAlert } = useAlert();

	useEffect(() => {
		const handleLoadOptions = async () => {
			try {
				const data = await onLoadData();
				setOptions(onModifyLoadedData(data));
			} catch {
				showAlert("Unable to load data", "error");
			}
		};

		const asyncLoading = async () => {
			if (!openAutocomplete) {
				setLoading(false);
			} else {
				setLoading(true);
				await handleLoadOptions();
				setLoading(false);
			}
		};
		asyncLoading();
	}, [onModifyLoadedData, onLoadData, openAutocomplete, showAlert]);

	const handleOpenAutocomplete = (state: boolean) => () => {
		setOpenAutocomplete(state);
	};

	const handleSelect = (_: SyntheticEvent<Element, Event>, value: T | null) => {
		onSelect(value);
	};

	return (
		<MUIAutocomplete
			id={id}
			open={openAutocomplete}
			onOpen={handleOpenAutocomplete(true)}
			onClose={handleOpenAutocomplete(false)}
			isOptionEqualToValue={(option: any, value: any) =>
				option[idenitifier] === value[idenitifier]
			}
			getOptionLabel={(option: any) => option[idenitifier]}
			options={options}
			loading={loading}
			onChange={handleSelect}
			renderInput={(params) => (
				<TextField
					{...params}
					size="small"
					label=""
					InputProps={{
						...params.InputProps,
						endAdornment: (
							<>
								{loading ? (
									<CircularProgress color="inherit" size={20} />
								) : null}
								{params.InputProps.endAdornment}
							</>
						),
					}}
				/>
			)}
		/>
	);
};
