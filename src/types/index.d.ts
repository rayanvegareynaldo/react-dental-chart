/**
 * Represents a dental record with optional status for each tooth number.
 * @typeParam T - The type of status that can be assigned to teeth (extends string)
 */
export type Tooth<T extends string = string> = Partial<Record<ToothNumber, T>>;

/**
 * Defines the color style for a tooth status.
 */
export type ToothColorStyle = {
    /** Outline color of the tooth */
    stroke: string;
    /** Fill color of the tooth */
    fill: string;
};

/**
 * Enumerates all FDI-standard tooth numbers,
 * covering both permanent and deciduous teeth.
 */
export type ToothNumber =
    // Permanent teeth: Upper right (11–18), upper left (21–28)
    | "11" | "12" | "13" | "14" | "15" | "16" | "17" | "18"
    | "21" | "22" | "23" | "24" | "25" | "26" | "27" | "28"
    // Permanent teeth: Lower left (31–38), lower right (41–48)
    | "31" | "32" | "33" | "34" | "35" | "36" | "37" | "38"
    | "41" | "42" | "43" | "44" | "45" | "46" | "47" | "48"
    // Deciduous teeth: Upper right (51–55), upper left (61–65)
    | "51" | "52" | "53" | "54" | "55"
    | "61" | "62" | "63" | "64" | "65"
    // Deciduous teeth: Lower left (71–75), lower right (81–85)
    | "71" | "72" | "73" | "74" | "75"
    | "81" | "82" | "83" | "84" | "85";

/**
 * Mode for viewing the dental chart.
 */
export type ToothMode =
    /** Show all teeth (permanent + deciduous) */
    | "combined"
    /** Show permanent teeth only */
    | "permanent"
    /** Show deciduous (baby) teeth only */
    | "deciduous";

/**
 * A key representing the status assigned to a tooth.
 * It can be customized via generics across the library.
 */
export type ChartStatusKey = string;

/**
 * Context structure for the React Dental Chart.
 * Allows full customization and state control of the chart.
 */
export type ReactDentalChartContextType<T extends ChartStatusKey = string> = {
    /** Current chart display mode (combined, permanent, or deciduous) */
    mode: ToothMode;

    /** Setter to change chart display mode */
    setMode: (mode: ToothMode) => void;

    /** Color configuration per tooth status */
    colors: Record<T, ToothColorStyle>;

    /** Label configuration per tooth status */
    labels: Record<T, string>;

    /** Count of teeth for each status (computed externally) */
    counts: Record<T, number>;

    /** Setter to update computed counts */
    setCounts: (counts: Record<T, number>) => void;

    /** Flags indicating which statuses are hidden from the chart */
    hiddenStatuses: Record<T, boolean>;

    /** Setter to show/hide specific statuses manually */
    setHiddenStatuses: (statuses: Record<T, boolean>) => void;

    /** Toggles visibility of a given status */
    toggleStatusVisibility: (status: T) => void;

    /** Current zoom level of the chart (e.g., 1 = 100%) */
    zoom: number;

    /** Setter to control zoom, typically between 0.5–2 */
    setZoom: React.Dispatch<React.SetStateAction<number>>;
};
