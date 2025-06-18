import { default as ReactDentalChartProvider } from "./provider";

import Chart from "./components/Chart";
import Legend from "./components/Legend";
import ZoomControls from "./components/ZoomControls";

export {
    type ToothColorStyle,
    type ToothNumber,
    type ToothMode
} from "./types"

export default ReactDentalChartProvider

export {
    Legend,
    ZoomControls,
    Chart as ReactDentalChart
}