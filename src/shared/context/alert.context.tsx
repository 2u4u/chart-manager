import { createContext } from "react";

interface AlertContextProps {
	showAlert: (newMessage: string, newSeverity: string) => void;
}

export const AlertContext = createContext<AlertContextProps>({
	showAlert: () => {},
});
