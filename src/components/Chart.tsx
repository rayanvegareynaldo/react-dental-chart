import { useEffect, useMemo, useState } from "react";
import { ALL_TOOTH_NUMBERS, DECIDUOUS_NUMBERS, DEFAULT_DIMENSIONS, PERMANENT_NUMBERS } from "./Constants";
import { Svg } from "./Svg";
import type { ToothColorStyle, ToothMode, ToothNumber } from "./Types";

type Tooth<T extends string = string> = Partial<{
    [key in ToothNumber]: T;
}>;

type ReactDentalChartProps<T extends string = string> = {
    width?: number | string;
    height?: number | string;
    mode?: ToothMode
    toothLabels?: Record<T, string>;
    toothColors: Record<T, ToothColorStyle>;
    data: Tooth<T>[];
    showLegend?: boolean;
    legendLabel?: string;
    showControls?: boolean;
    onDataChanged?: (data: Record<ToothNumber, T>) => void,
};

export default function ReactDentalChart<T extends string = string>({
    width = DEFAULT_DIMENSIONS.width,
    height = DEFAULT_DIMENSIONS.height,
    mode = "combined",
    toothColors,
    data,
    showLegend = false,
    legendLabel = "Legend",
    showControls = false,
    onDataChanged
}: ReactDentalChartProps<T>) {
    const statusOrder = Object.keys(toothColors);
    const defaultStatus = statusOrder[0] as T;

    const [currentMode, setMode] = useState<ToothMode>(mode);

    const activeTeeth = useMemo(() => {
        switch (currentMode) {
            case "permanent":
                return new Set(PERMANENT_NUMBERS);
            case "deciduous":
                return new Set(DECIDUOUS_NUMBERS);
            default:
                return new Set(ALL_TOOTH_NUMBERS);
        }
    }, [currentMode]);

    const [zoom, setZoom] = useState(1);

    const [hiddenStatuses, setHiddenStatuses] = useState<Record<T, boolean>>(() => {
        const initial = {} as Record<T, boolean>;
        for (const status of statusOrder) {
            initial[status as T] = false;
        }
        return initial;
    });

    const [toothStatuses, setToothStatuses] = useState<Record<ToothNumber, T>>(() => {
        return Svg.reduce((acc, { tooth }) => {
            let matchedStatus: T | undefined = undefined;
            for (const entry of data) {
                const status = entry[tooth];
                if (status) {
                    matchedStatus = status;
                    break;
                }
            }
            acc[tooth] = matchedStatus ?? defaultStatus;
            return acc;
        }, {} as Record<ToothNumber, T>);
    });

    // Update on `data` change
    useEffect(() => {
        setToothStatuses((prev) =>
            Svg.reduce((acc, { tooth }) => {
                let matchedStatus: T | undefined = undefined;
                for (const entry of data) {
                    const status = entry[tooth];
                    if (status) {
                        matchedStatus = status;
                        break;
                    }
                }
                acc[tooth] = matchedStatus ?? prev[tooth] ?? defaultStatus;
                return acc;
            }, {} as Record<ToothNumber, T>)
        );
    }, [data]);

    function getNextStatus(current: T): T {
        const visibleStatuses = statusOrder.filter(
            (status) => !hiddenStatuses[status as T]
        ) as T[];

        const currentIndex = visibleStatuses.indexOf(current);
        if (currentIndex === -1 || visibleStatuses.length === 0) {
            return visibleStatuses[0] ?? current;
        }

        return visibleStatuses[(currentIndex + 1) % visibleStatuses.length];
    }

    const statusCounts = useMemo(() => {
        const counts: Partial<Record<T, number>> = {};

        Object.entries(toothStatuses).forEach(([tooth, status]) => {
            if (!status || !activeTeeth.has(tooth as ToothNumber)) return;

            counts[status] = (counts[status] ?? 0) + 1;
        });

        return counts;
    }, [toothStatuses, activeTeeth]);

    return (
        <div className="flex flex-col md:flex-row gap-10 items-center">
            <div className="relative">
                <div
                    className="transform transition-transform duration-300 origin-center grid place-items-center"
                    style={{ transform: `scale(${zoom})` }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        version="1.1"
                        width={width}
                        height={height}
                        viewBox={`0 0 ${width} ${height}`}
                        role="img"
                        aria-labelledby="dental-chart-title"
                    >
                        <title id="dental-chart-title">Human Dental Arches</title>
                        <desc>A diagram of human dental arches showing tooth positions</desc>

                        <defs>
                            <marker id="tooth-marker" refX="0" refY="0" orient="auto" overflow="visible">
                                <circle r="0.8" cy="0" cx="3" />
                                <circle r="0.8" cy="0" cx="6.5" />
                                <circle r="0.8" cy="0" cx="10" />
                            </marker>

                            {["small", "medium", "large"].map((size) => (
                                <marker key={size} id={`arrow-${size}`} orient="auto" refY="0" refX="0" overflow="visible">
                                    <path
                                        d={
                                            size === "small"
                                                ? "m5.77 0-8.65 5 0-10 8.65 5z"
                                                : "M0 0 5-5-12.5 0 5 5 0 0z"
                                        }
                                        transform={
                                            size === "small"
                                                ? "scale(-0.2,-0.2)"
                                                : size === "medium"
                                                    ? "matrix(0.2,0,0,0.2,1.2,0)"
                                                    : "matrix(0.8,0,0,0.8,10,0)"
                                        }
                                        style={{
                                            fillRule: "evenodd",
                                            strokeWidth: "1pt",
                                            stroke: "#000",
                                        }}
                                    />
                                </marker>
                            ))}
                        </defs>


                        {Svg.filter(({ tooth }) => activeTeeth.has(tooth)).map(({ tooth, paths }) => {
                            const matchedStatus: T = toothStatuses[tooth] || defaultStatus;
                            const color = toothColors[matchedStatus];
                            const isHidden = hiddenStatuses[matchedStatus];

                            if (isHidden) return null;

                            return (
                                <g
                                    key={tooth}
                                    onClick={() => {
                                        setToothStatuses((prev) => {
                                            const updated = {
                                                ...prev,
                                                [tooth]: getNextStatus(prev[tooth] || defaultStatus),
                                            };
                                            onDataChanged?.(updated);
                                            return updated;
                                        });
                                    }}
                                    className="cursor-pointer"
                                >
                                    {paths(tooth, color.stroke, color.fill)}
                                </g>
                            );
                        })}

                    </svg>

                    {showLegend && (
                        <div className="select-none min-w-[200px]">
                            <div className="flex justify-center items-center gap-5 mt-5">
                                <div className="flex">
                                    <h2 className="font-medium text-sm text-center md:text-left">
                                        {legendLabel}
                                    </h2>
                                </div>

                                <select
                                    value={currentMode}
                                    onChange={(e) => setMode(e.target.value.toLowerCase() as ToothMode)}
                                    className="text-sm shadow-md w-fit rounded-md font-normal px-5 py-2 outline-none"
                                >
                                    <option value="deciduous">Deciduous</option>
                                    <option value="permanent">Permanent</option>
                                    <option value="combined">Combined</option>
                                </select>
                            </div>
                            <ul className="mt-4 flex gap-4 flex-wrap justify-center">
                                {(Object.keys(toothColors) as T[]).map((status) => {
                                    const color = toothColors[status];
                                    const isHidden = hiddenStatuses[status];

                                    return (
                                        <li
                                            key={status}
                                            onClick={() =>
                                                setHiddenStatuses((prev) => ({
                                                    ...prev,
                                                    [status]: !prev[status],
                                                }))
                                            }
                                            className={`flex items-center gap-2 cursor-pointer select-none ${isHidden ? "opacity-50 line-through" : ""
                                                }`}
                                        >
                                            <div
                                                className="w-4 h-4 border rounded"
                                                style={{
                                                    backgroundColor: color.fill === "none" ? "#fff" : color.fill,
                                                    borderColor: color.stroke,
                                                }}
                                            />
                                            <span className="capitalize text-sm">{status}</span>
                                            <span className="text-gray-500 text-sm">
                                                ({statusCounts[status] || 0})
                                            </span>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    )}
                </div>
            </div>

            {showControls && (
                <div className="relative bottom-2 right-2 flex flex-col gap-1 bg-white/80 p-2 rounded shadow-md select-none">
                    <button
                        onClick={() => setZoom((z) => Math.min(z + 0.1, 2))}
                        className="px-2 text-sm font-bold rounded bg-gray-200 hover:bg-gray-300"
                    >
                        +
                    </button>
                    <button
                        onClick={() => setZoom((z) => Math.max(z - 0.1, 0.5))}
                        className="px-2 text-sm font-bold rounded bg-gray-200 hover:bg-gray-300"
                    >
                        −
                    </button>
                    <button
                        onClick={() => setZoom(1)}
                        className="px-2 text-sm font-bold rounded bg-gray-100 hover:bg-gray-200"
                    >
                        ⟳
                    </button>
                </div>
            )}
        </div>
    );
}
