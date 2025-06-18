import { useContext, useEffect } from "react";
import { ChartStatusKey, ReactDentalChartContextType, ToothNumber } from "../types";
import { ReactDentalChartContext } from "../provider"

export function useDentalChart<T extends ChartStatusKey = string>() {
    const ctx = useContext(ReactDentalChartContext as unknown as React.Context<ReactDentalChartContextType<T>>);
    if (!ctx) throw new Error("useDentalChart must be used within ReactDentalChartProvider");
    return ctx;
}

export function useUpdateToothStatusCounts<T extends string>(
    toothStatuses: Record<string, T | undefined>,
    activeTeeth: Set<ToothNumber>
) {
    const { setCounts } = useDentalChart();

    useEffect(() => {
        const counts: Partial<Record<T, number>> = {};

        Object.entries(toothStatuses).forEach(([tooth, status]) => {
            if (!status || !activeTeeth.has(tooth as ToothNumber)) return;

            counts[status] = (counts[status] ?? 0) + 1;
        });

        setCounts(counts as Record<T, number>);
    }, [toothStatuses, activeTeeth, setCounts]);
}


