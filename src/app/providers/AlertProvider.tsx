import { Alert, Snackbar } from "@mui/material";
import { SyntheticEvent, useCallback, useState } from "react";
import { AlertContext } from "../../shared/context";

export const AlertProvider = ({ children }: { children: React.ReactNode }) => {
	const [open, setOpen] = useState(false);
	const [alertMessage, setAlertMessage] = useState("");
	const [severity, setSeverity] = useState<any>("info");

	const showAlert = useCallback((newMessage: string, alertType: string) => {
		setAlertMessage(newMessage);
		setSeverity(alertType);
		setOpen(true);
	}, []);

	const handleCloseAlert = (
		_: Event | SyntheticEvent<unknown, Event>,
		reason?: string
	) => {
		if (reason === "clickaway") {
			return;
		}
		setAlertMessage("");
		setSeverity("info");
	};

	return (
		<AlertContext.Provider value={{ showAlert }}>
			{children}
			<Snackbar
				open={open}
				autoHideDuration={6000}
				onClose={handleCloseAlert}
				anchorOrigin={{ vertical: "top", horizontal: "center" }}
			>
				<Alert
					onClose={handleCloseAlert}
					severity={severity}
					variant="filled"
					sx={{ width: "100%" }}
				>
					{alertMessage}
				</Alert>
			</Snackbar>
		</AlertContext.Provider>
	);
};
