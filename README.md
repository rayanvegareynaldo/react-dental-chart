# React Dental Chart

A customizable and interactive dental chart component for React applications, useful for dental records, visualization, and treatment planning.

## Features
- ✅ FDI Numbering Support: Includes both permanent and deciduous teeth based on the FDI World Dental Federation system.

- 🔄 Multiple Display Modes: Toggle between combined, permanent-only, or deciduous-only views.

- 🎨 Fully Customizable: Define custom tooth statuses with configurable colors and labels.

- 📊 Legend Support: Optional interactive legend for toggling status visibility.

- 🛠️ Interactive Controls: Built-in zoom controls and responsive behavior.

- 🧠 Strict TypeScript Typing: Supports generic type-safe status keys.

- 📱 Responsive Layout: Adapts seamlessly to various screen sizes and orientations.

- ♿ Accessibility-Ready: Includes semantic roles and accessible labels.

- 📏 Flexible Sizing: Easily constrain chart dimensions based on the viewport or container.



## Installation

```bash
npm install react-dental-chart
# or
yarn add react-dental-chart
```

## Usage

```jsx
import ReactDentalChartProvider, {
    Legend,
    ReactDentalChart,
    ToothColorStyle,
    ZoomControls,
} from "react-dental-chart";

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
```
