import { Svg } from "../components/Svg";
import { Tooth, ToothNumber } from "../types";

export function initializeToothStatuses<T extends string>(
    data: Tooth<T>[],
    defaultStatus: T
): Record<ToothNumber, T> {
    return Svg.reduce((acc, { tooth }) => {
        const matchedStatus = data.reduce<T | undefined>(
            (found, entry) => found ?? entry[tooth],
            undefined
        );
        acc[tooth] = matchedStatus ?? defaultStatus;
        return acc;
    }, {} as Record<ToothNumber, T>);
}

export function updateToothStatuses<T extends string>(
    prev: Record<ToothNumber, T>,
    data: Tooth<T>[],
    defaultStatus: T
): Record<ToothNumber, T> {
    return Svg.reduce((acc, { tooth }) => {
        const matchedStatus = data.reduce<T | undefined>(
            (found, entry) => found ?? entry[tooth],
            undefined
        );
        acc[tooth] = matchedStatus ?? prev[tooth] ?? defaultStatus;
        return acc;
    }, {} as Record<ToothNumber, T>);
}
