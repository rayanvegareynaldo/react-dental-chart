# React Dental Chart

A customizable and interactive dental chart component for React applications, useful for dental records, visualization, and treatment planning.

## Features

- Supports both permanent and deciduous teeth (FDI numbering system)
- Three display modes: combined, permanent-only, or deciduous-only
- Customizable tooth colors and labels
- Optional legend display
- Optional controls for interactive use
- TypeScript support with strict typing
- Responsive design
- Accessibility support
- Customizable dimensions

## Installation

```bash
npm install react-dental-chart
# or
yarn add react-dental-chart
```

## Usage

```jsx
import { ReactDentalChart, type ToothColorStyle } from "react-dental-chart";

type ToothStatus = "healthy" | "decayed" | "extracted" | "denture" | "filled";

const toothColors: Record<ToothStatus, ToothColorStyle> = {
  healthy: { stroke: "#4CAF50", fill: "none" },
  decayed: { stroke: "#B71C1C", fill: "none" },
  extracted: { stroke: "#9E9E9E", fill: "none" },
  denture: { stroke: "#1976D2", fill: "none" },
  filled: { stroke: "#FFC107", fill: "none" },
};

const toothLabels: Record<ToothStatus, string> = {
  healthy: "Healthy",
  decayed: "Decayed",
  extracted: "Extracted",
  denture: "Denture",
  filled: "Filled",
};

const initialData = [
  { "11": "decayed" },
  { "21": "decayed" },
  { "32": "denture" },
  { "15": "filled" },
  { "16": "extracted" },
] as const;

export default function App() {
  return (
    <ReactDentalChart<ToothStatus>
        showControls
        showLegend
        legendLabel="Legend"
        toothLabels={toothLabels}
        toothColors={toothColors}
        data={initialData}
        onDataChanged={(updatedData) => {
          console.log("Updated Tooth Data:", updatedData);
        }}
    />
  );
}
```
## Props

 | Prop            | Type                                       | Default          | Description                                                              |
| --------------- | ------------------------------------------ | ---------------- | ------------------------------------------------------------------------ |
| `width`         | `number \| string`                         | `"800"`          | Width of the chart (in pixels or percentage)                             |
| `height`        | `number \| string`                         | `"400"`          | Height of the chart (in pixels or percentage)                            |
| `mode`          | `"combined" \| "permanent" \| "deciduous"` | `"combined"`     | Display mode for the chart: combined, permanent-only, or deciduous-only  |
| `data`          | `Array<Record<ToothNumber, T>>`            | `[]`             | Array of tooth data keyed by FDI tooth number                            |
| `toothColors`   | `Record<T, ToothColorStyle>`               | `undefined`      | Mapping of tooth states to color styles (`stroke` and `fill`)            |
| `toothLabels`   | `Record<T, string>`                        | `undefined`      | Human-readable labels for each tooth state                               |
| `showLegend`    | `boolean`                                  | `false`          | Whether to display a legend showing the tooth state labels and colors    |
| `legendLabel`   | `string`                                   | `"Legend"`       | Title or label for the legend                                            |
| `showControls`  | `boolean`                                  | `false`          | Whether to enable interactive controls (click events, state changes)     |
| `onDataChanged` | `(data: Record<ToothNumber, T>) => void`   | `undefined`      | Callback triggered when tooth state changes (e.g., via user interaction) |
