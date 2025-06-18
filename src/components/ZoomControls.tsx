import { useDentalChart } from '../hooks'
import React from 'react'

type IconType = React.ReactNode | string

interface ZoomControlsProps {
    /** Tailwind classes for the root container */
    className?: string
    /** Tailwind classes for the buttons container */
    containerClass?: string
    /** Tailwind classes applied to all buttons */
    buttonClass?: string
    /** Tailwind classes for the zoom-in button */
    zoomInClass?: string
    /** Tailwind classes for the zoom-out button */
    zoomOutClass?: string
    /** Tailwind classes for the reset button */
    resetClass?: string
    /** Zoom increment step (default: 0.1) */
    step?: number
    /** Minimum zoom level (default: 0.5) */
    minZoom?: number
    /** Maximum zoom level (default: 2) */
    maxZoom?: number
    /** Custom zoom in icon/component */
    zoomInIcon?: IconType
    /** Custom zoom out icon/component */
    zoomOutIcon?: IconType
    /** Custom reset zoom icon/component */
    resetIcon?: IconType
    /** Additional buttons to render */
    additionalButtons?: React.ReactNode
    /** Callback when zoom changes */
    onZoomChange?: (newZoom: number) => void
}

const defaultIcons = {
    zoomIn: '+',
    zoomOut: '−',
    reset: '⟳'
}

function ZoomControls({
    className = 'flex justify-center py-20 select-none',
    containerClass = 'inline-flex items-center gap-1.5 p-1.5 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm border border-gray-200',
    buttonClass = 'flex items-center justify-center size-8 rounded-md bg-white hover:bg-gray-50 text-gray-700 hover:text-gray-900 transition-colors border border-gray-200',
    zoomInClass = '',
    zoomOutClass = '',
    resetClass = '',
    step = 0.1,
    minZoom = 0.5,
    maxZoom = 2,
    zoomInIcon = defaultIcons.zoomIn,
    zoomOutIcon = defaultIcons.zoomOut,
    resetIcon = defaultIcons.reset,
    additionalButtons,
    onZoomChange
}: ZoomControlsProps) {
    const { setZoom } = useDentalChart()

    const handleZoom = (operation: 'in' | 'out' | 'reset') => {
        setZoom((currentZoom) => {
            let newZoom = currentZoom

            switch (operation) {
                case 'in':
                    newZoom = Math.min(currentZoom + step, maxZoom)
                    break
                case 'out':
                    newZoom = Math.max(currentZoom - step, minZoom)
                    break
                case 'reset':
                    newZoom = 1
                    break
            }

            onZoomChange?.(newZoom)
            return newZoom
        })
    }

    const renderIcon = (icon: IconType) =>
        typeof icon === 'string' ? (
            <span className="text-base font-medium leading-none">{icon}</span>
        ) : (
            icon
        )

    return (
        <div className={className}>
            <div className={containerClass}>
                <button
                    className={`${buttonClass} ${zoomInClass}`}
                    onClick={() => handleZoom('in')}
                    aria-label="Zoom in"
                >
                    {renderIcon(zoomInIcon)}
                </button>

                <button
                    className={`${buttonClass} ${zoomOutClass}`}
                    onClick={() => handleZoom('out')}
                    aria-label="Zoom out"
                >
                    {renderIcon(zoomOutIcon)}
                </button>

                <button
                    className={`${buttonClass} ${resetClass}`}
                    onClick={() => handleZoom('reset')}
                    aria-label="Reset zoom"
                >
                    {renderIcon(resetIcon)}
                </button>

                {additionalButtons}
            </div>
        </div>
    )
}

export default ZoomControls