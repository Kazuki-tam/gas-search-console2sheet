import { aggregateIndexStatus } from "./sheets/aggrigation/aggregateIndexStatus";
import { createChart } from "./sheets/chart/createChart";

/**
 * report function
 */
declare const global: {
	[x: string]: () => void;
};

function report() {
	aggregateIndexStatus();
	createChart();
}

global.report = report;
