/** @type {import('tailwindcss').Config} */

export default {
	corePlugins: {
		preflight: false,
	},
	prefix: "tw-",
	content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
	important: "#root",
	theme: {
		extend: {
			fontFamily: {
				sans: ['"Public Sans"', "sans-serif"],
			},
			fontSize: {
				sm: [
					"0.9375rem",
					{
						lineHeight: "1.37",
					},
				],
				xs: ["0.8125rem"],
			},

			colors: {
				primary: "#7367f0",
				header: "#6f6b7d",
				subheader: "#5d596c",
			},
			dropShadow: {
				md: "0 .125rem .25rem rgba(165,163,174,.3)",
			},
		},
	},
	plugins: [],
};
