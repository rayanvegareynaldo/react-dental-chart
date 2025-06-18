import { useEffect, useMemo, useState, useCallback } from "react";
import { ALL_TOOTH_NUMBERS, DECIDUOUS_NUMBERS, DEFAULT_DIMENSIONS, PERMANENT_NUMBERS } from "../constants";
import { Svg } from "./Svg";
import type { Tooth, ToothNumber } from "../types";
import { useDentalChart, useUpdateToothStatusCounts } from "../hooks";
import { initializeToothStatuses, updateToothStatuses } from "../helpers";

type ReactDentalChartProps<T extends string = string> = {
    // Dimensions
    width?: number | string;
    height?: number | string;

    // Data
    data: Tooth<T>[];
    onDataChanged?: (data: Record<ToothNumber, T>) => void;

    // SVG Styling
    svgClasses?: string;
    zoomContainerClasses?: string;

    // Tooth Styling
    toothClasses?: string | ((status: T, toothNumber: ToothNumber) => string);
    activeToothClasses?: string;

    // Marker Customization
    markerSize?: 'sm' | 'md' | 'lg';
    markerColor?: string;

    // Callbacks
    onToothClick?: (toothNumber: ToothNumber, status: T) => void;
    onToothHover?: (toothNumber: ToothNumber, status: T) => void;
};

export default function ReactDentalChart<T extends string = string>({
    // Dimensions
    width = DEFAULT_DIMENSIONS.width,
    height = DEFAULT_DIMENSIONS.height,

    // Data
    data,
    onDataChanged,

    // SVG Styling
    svgClasses = "",
    zoomContainerClasses = "",

    // Tooth Styling
    toothClasses = "cursor-pointer hover:opacity-90 transition-opacity",
    activeToothClasses = "",

    // Marker Customization
    markerSize = 'md',
    markerColor = "#000",

    // Callbacks
    onToothClick,
    onToothHover,
}: ReactDentalChartProps<T>) {
    const { zoom, mode, hiddenStatuses, colors } = useDentalChart<T>();
    const statusOrder = Object.keys(colors);
    const defaultStatus = statusOrder[0] as T;

    const activeTeeth = useMemo(() => {
        switch (mode) {
            case "permanent": return new Set(PERMANENT_NUMBERS);
            case "deciduous": return new Set(DECIDUOUS_NUMBERS);
            default: return new Set(ALL_TOOTH_NUMBERS);
        }
    }, [mode]);

    const [toothStatuses, setToothStatuses] = useState<Record<ToothNumber, T>>(() =>
        initializeToothStatuses(data, defaultStatus)
    );

    useEffect(() => {
        setToothStatuses(prev => updateToothStatuses(prev, data, defaultStatus));
    }, [data, defaultStatus]);

    const getNextStatus = useCallback((current: T): T => {
        const visibleStatuses = statusOrder.filter(
            status => !hiddenStatuses[status as T]
        ) as T[];

        if (visibleStatuses.length === 0) return current;

        const currentIndex = visibleStatuses.indexOf(current);
        return visibleStatuses[
            currentIndex === -1 ? 0 : (currentIndex + 1) % visibleStatuses.length
        ];
    }, [statusOrder, hiddenStatuses]);

    const handleToothClick = useCallback((tooth: ToothNumber) => {
        const newStatus = getNextStatus(toothStatuses[tooth] || defaultStatus);
        setToothStatuses(prev => {
            const updated = { ...prev, [tooth]: newStatus };
            onDataChanged?.(updated);
            return updated;
        });
        onToothClick?.(tooth, newStatus);
    }, [getNextStatus, defaultStatus, onDataChanged, onToothClick, toothStatuses]);

    const handleToothHover = useCallback((tooth: ToothNumber) => {
        onToothHover?.(tooth, toothStatuses[tooth] || defaultStatus);
    }, [onToothHover, toothStatuses, defaultStatus]);

    useUpdateToothStatusCounts(toothStatuses, activeTeeth);

    const visibleSvgElements = useMemo(() => (
        Svg.filter(({ tooth }) => (
            activeTeeth.has(tooth) &&
            !hiddenStatuses[toothStatuses[tooth] || defaultStatus]
        ))
    ), [activeTeeth, hiddenStatuses, toothStatuses, defaultStatus]);

    const getToothClass = useCallback((status: T, toothNumber: ToothNumber) => {
        const baseClass = typeof toothClasses === "function"
            ? toothClasses(status, toothNumber)
            : toothClasses;

        return activeToothClasses ? `${baseClass} ${activeToothClasses}` : baseClass;
    }, [toothClasses, activeToothClasses]);

    return (
        <div className="relative">
            <div
                className="grid place-items-center transform origin-center transition-transform duration-300"
                style={{
                    transform: `scale(${zoom})`,
                    height: `${100 * zoom * 4}px`,
                    ...(zoomContainerClasses ? { className: zoomContainerClasses } : {})
                }}
            >
                <DentalChartSVG
                    width={width}
                    height={height}
                    visibleSvgElements={visibleSvgElements}
                    toothStatuses={toothStatuses}
                    colors={colors}
                    defaultStatus={defaultStatus}
                    onToothClick={handleToothClick}
                    onToothHover={handleToothHover}
                    svgClasses={svgClasses}
                    getToothClass={getToothClass}
                    markerSize={markerSize}
                    markerColor={markerColor}
                />
            </div>
        </div>
    );
}

// SVG Component Props
type DentalChartSVGProps<T extends string> = {
    width: number | string;
    height: number | string;
    visibleSvgElements: typeof Svg;
    toothStatuses: Record<ToothNumber, T>;
    colors: Record<T, { stroke: string; fill: string }>;
    defaultStatus: T;
    onToothClick: (tooth: ToothNumber) => void;
    onToothHover?: (tooth: ToothNumber) => void;
    svgClasses?: string;
    getToothClass: (status: T, toothNumber: ToothNumber) => string;
    markerSize?: 'sm' | 'md' | 'lg';
    markerColor?: string;
};

function DentalChartSVG<T extends string>({
    width,
    height,
    visibleSvgElements,
    toothStatuses,
    colors,
    defaultStatus,
    onToothClick,
    onToothHover,
    svgClasses,
    getToothClass,
    markerSize = 'md',
    markerColor = "#000",
}: DentalChartSVGProps<T>) {
    const markerSizeMap = {
        sm: "scale(-0.2,-0.2)",
        md: "matrix(0.2,0,0,0.2,1.2,0)",
        lg: "matrix(0.8,0,0,0.8,10,0)"
    };

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            className={svgClasses}
        >
            <defs>
                <marker id="tooth-marker" refX="0" refY="0" orient="auto" overflow="visible">
                    <circle r="0.8" cy="0" cx="3" fill={markerColor} />
                    <circle r="0.8" cy="0" cx="6.5" fill={markerColor} />
                    <circle r="0.8" cy="0" cx="10" fill={markerColor} />
                </marker>

                {["small", "medium", "large"].map((size) => (
                    <marker
                        key={size}
                        id={`arrow-${size}`}
                        orient="auto"
                        refY="0"
                        refX="0"
                        overflow="visible"
                    >
                        <path
                            d={size === "small"
                                ? "m5.77 0-8.65 5 0-10 8.65 5z"
                                : "M0 0 5-5-12.5 0 5 5 0 0z"}
                            transform={markerSizeMap[size as 'sm' | 'md' | 'lg']}
                            style={{
                                fillRule: "evenodd",
                                strokeWidth: "1pt",
                                stroke: markerColor,
                                fill: markerColor,
                            }}
                        />
                    </marker>
                ))}
            </defs>

            {visibleSvgElements.map(({ tooth, paths }) => {
                const status = toothStatuses[tooth] || defaultStatus;
                const { stroke, fill } = colors[status];
                const toothClass = getToothClass(status, tooth);

                return (
                    <g
                        key={tooth}
                        onClick={() => onToothClick(tooth)}
                        onMouseEnter={() => onToothHover?.(tooth)}
                        className={toothClass}
                    >
                        {paths(tooth, stroke, fill)}
                    </g>
                );
            })}
        </svg>
    );
}