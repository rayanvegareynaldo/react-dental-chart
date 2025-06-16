# React Dental Chart Component

A customizable dental chart component for React applications that displays both permanent and deciduous teeth with configurable colors and labels.

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

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `width` | number \| string | `800` | Width of the chart (px or %) |
| `height` | number \| string | `400` | Height of the chart (px or %) |
| `mode` | "combined" \| "permanent" \| "deciduous" | "combined" | Display mode for teeth |
| `toothColors` | Record<T, ToothColorStyle> | - | Object mapping tooth states to color styles |
| `data` | Tooth<T>[] | - | Array of tooth data to display |
| `showLegend` | boolean | `false` | Whether to show the color legend |
| `legendLabel` | string | "Legend" | Label for the legend |
| `showControls` | boolean | `false` | Whether to show interactive controls |
| `onDataChanged` | (data: Record<ToothNumber, T>) => void | - | Callback when tooth data changes |
| `className` | string | - | Additional CSS class for the container |
| `ariaLabel` | string | "Dental chart" | ARIA label for accessibility |