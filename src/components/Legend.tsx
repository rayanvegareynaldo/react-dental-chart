import { ChangeEvent } from "react";
import { useDentalChart } from "../hooks";
import { ToothMode } from "../types";

type StatusIndicatorProps = {
    color: {
        fill: string;
        stroke: string;
    };
    className?: string;
    style?: React.CSSProperties;
};

const StatusIndicator = ({
    color,
    className = "w-4 h-4 border-2 rounded",
    style
}: StatusIndicatorProps) => (
    <div
        className={className}
        style={{
            backgroundColor: color.fill === "none" ? "#fff" : color.fill,
            borderColor: color.stroke,
            ...style,
        }}
    />
);

type ModeSelectorProps = {
    mode: ToothMode;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    className?: string;
    options?: {
        value: ToothMode;
        label: string;
    }[];
};

const ModeSelector = ({
    mode,
    onChange,
    className = "text-sm shadow-md w-fit rounded-md font-normal px-5 py-2 outline-none",
    options = [
        { value: "deciduous", label: "Deciduous" },
        { value: "permanent", label: "Permanent" },
        { value: "combined", label: "Combined" },
    ]
}: ModeSelectorProps) => (
    <select
        value={mode}
        onChange={onChange}
        className={className}
    >
        {options.map(option => (
            <option key={option.value} value={option.value}>
                {option.label}
            </option>
        ))}
    </select>
);

type StatusItemProps<T extends string> = {
    status: T;
    color: {
        fill: string;
        stroke: string;
    };
    isHidden: boolean;
    label: string;
    count: number;
    onClick: () => void;
    className?: string;
    labelClassName?: string;
    countClassName?: string;
    StatusIndicator?: React.ComponentType<StatusIndicatorProps>;
};

function StatusItem<T extends string>({
    status,
    color,
    isHidden,
    label,
    count,
    onClick,
    className = "flex items-center gap-2 cursor-pointer select-none",
    labelClassName = "capitalize text-sm",
    countClassName = "text-gray-500 text-sm",
    StatusIndicator: CustomStatusIndicator = StatusIndicator,
}: StatusItemProps<T>) {
    return (
        <li
            key={status}
            onClick={onClick}
            className={`${className} ${isHidden ? "opacity-50 line-through" : ""}`}
        >
            <CustomStatusIndicator color={color} />
            <span className={labelClassName}>{label}</span>
            <span className={countClassName}>({count})</span>
        </li>
    );
}

type LegendProps<T extends string = string> = {
    title?: string;
    className?: string;
    titleClassName?: string;
    headerClassName?: string;
    listClassName?: string;
    statusItem?: {
        className?: string;
        labelClassName?: string;
        countClassName?: string;
        StatusIndicator?: React.ComponentType<StatusIndicatorProps>;
    };
    modeSelector?: {
        className?: string;
        options?: {
            value: ToothMode;
            label: string;
        }[];
    };
};

function Legend<T extends string = string>({
    title = "React Dental Chart",
    className = "select-none",
    titleClassName = "font-medium text-sm text-center md:text-left",
    headerClassName = "flex justify-center items-center gap-5 mt-5",
    listClassName = "mt-4 flex gap-4 flex-wrap justify-center",
    statusItem,
    modeSelector,
}: LegendProps<T>) {
    const {
        mode,
        setMode,
        hiddenStatuses,
        toggleStatusVisibility,
        colors,
        labels,
        counts,
    } = useDentalChart<T>();

    const handleModeChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setMode(e.target.value.toLowerCase() as ToothMode);
    };

    return (
        <div className={className}>
            <div className={headerClassName}>
                {title && <h2 className={titleClassName}>{title}</h2>}
                <ModeSelector
                    mode={mode}
                    onChange={handleModeChange}
                    className={modeSelector?.className}
                    options={modeSelector?.options}
                />
            </div>

            <ul className={listClassName}>
                {(Object.keys(labels) as T[]).map((status) => {
                    const color = colors[status];
                    const isHidden = hiddenStatuses[status];
                    const statusLabel = labels[status] || status;
                    const statusCount = counts[status] || 0;

                    return (
                        <StatusItem
                            key={status}
                            status={status}
                            color={color}
                            isHidden={isHidden}
                            label={statusLabel}
                            count={statusCount}
                            onClick={() => toggleStatusVisibility(status)}
                            className={statusItem?.className}
                            labelClassName={statusItem?.labelClassName}
                            countClassName={statusItem?.countClassName}
                            StatusIndicator={statusItem?.StatusIndicator}
                        />
                    );
                })}
            </ul>
        </div>
    );
}

export default Legend;