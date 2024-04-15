import { Box, CircularProgress, Drawer, Stack } from "@mui/material";
import { ChartItem, Header } from "../features";
import { useEffect, useState } from "react";
import { ChartWizard } from "../widgets";
import { getChart, getCharts } from "../shared/api";
import { ChartProps } from "../shared/interface";

export const Dashboard = () => {
	const [openDrawer, setOpenDrawer] = useState(false);
	const [loading, setLoading] = useState(true);
	const [charts, setCharts] = useState<any[]>([]);
	const [chart, setChart] = useState<ChartProps | undefined>(undefined);

	const handleDrawerOpen =
		(open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
			if (
				event.type === "keydown" &&
				((event as React.KeyboardEvent).key === "Tab" ||
					(event as React.KeyboardEvent).key === "Shift")
			) {
				return;
			}

			setOpenDrawer(open);
		};

	const handleLoadData = async () => {
		try {
			const data: any[] = await getCharts();
			setCharts(data);
			setLoading(false);
		} catch {
			throw new Error("Unable to load data");
		}
	};

	useEffect(() => {
		handleLoadData();
	}, []);

	const handleEditChart = async (id: string) => {
		setOpenDrawer(true);
		const chart = await getChart(id);
		setChart(chart);
	};

	useEffect(() => {
		if (!openDrawer) {
			setChart(undefined);
		}
	}, [openDrawer]);

	return (
		<>
			<Header onClick={handleDrawerOpen(true)} />
			<div className="tw-w-full tw-flex tw-flex-col tw-overflow-y-auto tw-mt-20 no-scrollbar">
				{loading ? (
					<div className="tw-flex tw-w-full tw-h-full tw-items-center tw-justify-center">
						<CircularProgress />
					</div>
				) : (
					<Stack className="tw-mt-4 tw-w-full tw-items-center">
						{charts.map((chart) => (
							<ChartItem
								chart={chart}
								key={chart.id}
								onLoadData={handleLoadData}
								onEditChart={handleEditChart}
							/>
						))}
					</Stack>
				)}
				<Drawer
					anchor="right"
					open={openDrawer}
					onClose={handleDrawerOpen(false)}
				>
					<Box className="tw-w-[80vw] tw-h-full tw-overflow-hidden">
						<ChartWizard
							onClose={handleDrawerOpen(false)}
							onLoadData={handleLoadData}
							chart={chart}
						/>
					</Box>
				</Drawer>
			</div>
		</>
	);
};
