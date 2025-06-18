import ReactDentalChartProvider, {
    Legend,
    ReactDentalChart,
    ToothColorStyle,
    ZoomControls,
} from "../src";

type ToothStatus = "healthy" | "decayed" | "extracted" | "denture" | "filled";

const colors: Record<ToothStatus, ToothColorStyle> = {
    healthy: {
        stroke: "#4CAF50",
        fill: "none",
    },
    decayed: {
        stroke: "#B71C1C",
        fill: "none",
    },
    extracted: {
        stroke: "#9E9E9E",
        fill: "none",
    },
    denture: {
        stroke: "#1976D2",
        fill: "none",
    },
    filled: {
        stroke: "#FFC107",
        fill: "none",
    },
};

const labels: Record<ToothStatus, string> = {
    decayed: "Decayed",
    healthy: "Healthy",
    extracted: "Extracted",
    filled: "Filled",
    denture: "Denture",
};

export default function App() {
    return (
        <ReactDentalChartProvider<ToothStatus> colors={colors} labels={labels} >

            <ReactDentalChart<ToothStatus>
                data={[
                    { "11": "decayed" },
                    { "21": "decayed" },
                    { "32": "denture" },
                    { "15": "filled" },
                    { "16": "extracted" },
                    { "22": "denture" },
                    { "85": "healthy" },
                ]}
                onDataChanged={(data) => {
                    console.log(data);
                }}
            />

            <Legend<ToothStatus> title="React Dental Chart" />

            <ZoomControls />
        </ReactDentalChartProvider>
    );
}
