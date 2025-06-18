import React, {
    createContext,
    useContext,
    useState,
    ReactNode,
} from "react";

import {
    ReactDentalChartContextType,
    ToothMode,
    ToothColorStyle,
    ChartStatusKey,
} from "../types";

export const ReactDentalChartContext = createContext<ReactDentalChartContextType<any> | undefined>(undefined);

type ReactDentalChartProviderProps<T extends ChartStatusKey = string> = {
    children: ReactNode;
    defaultMode?: ToothMode;
    colors: Record<T, ToothColorStyle>;
    labels: Record<T, string>;
    defaultHidden?: Partial<Record<T, boolean>>;
    defaultZoom?: number;
};

function ReactDentalChartProvider<T extends ChartStatusKey = string>({
    children,
    defaultMode = "combined",
    colors,
    labels,
    defaultHidden = {},
    defaultZoom = 1.0,
}: ReactDentalChartProviderProps<T>) {
    const [mode, setMode] = useState<ToothMode>(defaultMode);
    const [zoom, setZoom] = useState<number>(defaultZoom);

    const [counts, setCounts] = useState<Record<T, number> | {}>({});
    const [hiddenStatuses, setHiddenStatuses] = useState<Record<T, boolean>>({
        ...(defaultHidden as Record<T, boolean>),
    });

    const toggleStatusVisibility = (status: T) => {
        setHiddenStatuses((prev) => ({
            ...prev,
            [status]: !prev[status],
        }));
    };

    return (
        <ReactDentalChartContext.Provider
            value={{
                mode,
                setMode,
                colors,
                labels,
                counts,
                setCounts,
                hiddenStatuses,
                setHiddenStatuses,
                toggleStatusVisibility,
                zoom,
                setZoom,
            }}
        >
            {children}
        </ReactDentalChartContext.Provider>
    );
}

export default ReactDentalChartProvider;
