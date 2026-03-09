import { useState } from 'react';
import type { ChangeEvent, FC } from 'react';

import { RESOLUTIONS } from '../../constants/resolutions';

interface ToolbarProps {
    width: number;
    height: number;
    onDimensionChange: (width: number, height: number) => void;
    onExport: () => void;
}

export const Toolbar: FC<ToolbarProps> = ({
    width,
    height,
    onDimensionChange,
    onExport
}) => {
    const resolutionOptions = RESOLUTIONS.length > 0
        ? RESOLUTIONS
        : [{ label: 'Custom...', width: 0, height: 0 }];
    const defaultPreset = resolutionOptions.find((resolution) => resolution.width > 0)?.label ?? 'custom';
    const [isCustom, setIsCustom] = useState(defaultPreset === 'custom');

    const handlePresetChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const val = e.target.value;
        if (val === 'custom') {
            setIsCustom(true);
        } else {
            setIsCustom(false);
            const res = RESOLUTIONS.find(r => r.label === val);
            if (res) onDimensionChange(res.width, res.height);
        }
    };

    return (
        <div className="toolbar">
            <div className="toolbar-group">
                <select className="select-input" onChange={handlePresetChange} defaultValue={defaultPreset}>
                    {resolutionOptions.map(res => (
                        <option key={res.label} value={res.width === 0 ? 'custom' : res.label}>
                            {res.label}
                        </option>
                    ))}
                </select>

                {isCustom && (
                    <>
                        <input
                            type="number"
                            className="input-text"
                            value={width}
                            onChange={e => onDimensionChange(Number(e.target.value), height)}
                            style={{ width: '80px' }}
                            placeholder="W"
                        />
                        <span style={{ color: 'var(--text-secondary)' }}>x</span>
                        <input
                            type="number"
                            className="input-text"
                            value={height}
                            onChange={e => onDimensionChange(width, Number(e.target.value))}
                            style={{ width: '80px' }}
                            placeholder="H"
                        />
                    </>
                )}
            </div>

            <div className="toolbar-group">
                <button className="button button-primary" onClick={onExport}>
                    Export PNG
                </button>
            </div>
        </div>
    );
};
