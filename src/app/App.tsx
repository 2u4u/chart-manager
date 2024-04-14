import { Dashboard } from "../pages";
import { StyledEngineProvider } from "@mui/material/styles";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { AlertProvider } from "./providers/AlertProvider";
import "../shared/styles/app.css";

const App = () => {
	const rootElement = document.getElementById("root");

	const theme = createTheme({
		typography: {
			fontFamily: `"Public Sans", sans-serif`,
		},
		palette: {
			primary: {
				main: "#7367f0",
			},
		},
		components: {
			MuiPopover: {
				defaultProps: {
					container: rootElement,
				},
			},
			MuiPopper: {
				defaultProps: {
					container: rootElement,
				},
			},
			MuiDialog: {
				defaultProps: {
					container: rootElement,
				},
			},
			MuiModal: {
				defaultProps: {
					container: rootElement,
				},
			},
			MuiCheckbox: {
				defaultProps: {
					color: "primary",
				},
			},
		},
	});

	return (
		<StyledEngineProvider injectFirst>
			<AlertProvider>
				<ThemeProvider theme={theme}>
					<CssBaseline />
					<Dashboard />
				</ThemeProvider>
			</AlertProvider>
		</StyledEngineProvider>
	);
};

export default App;
