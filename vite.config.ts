import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
	base: "./",
	plugins: [react()],
	server: {
		proxy: {
			"/fred": {
				target: "https://api.stlouisfed.org",
				changeOrigin: true,
			},
		},
	},
});
