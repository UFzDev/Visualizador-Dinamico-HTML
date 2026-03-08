import { useState } from 'react';
import type { ChangeEvent, FC } from 'react';

import { RESOLUTIONS } from '../../constants/resolutions';

interface ToolbarProps {
    width: number;
    height: number;
    onDimensionChange: (width: number, height: number) => void;
    onExport: (format: 'png' | 'jpg' | 'pdf') => void;
}

export const Toolbar: FC<ToolbarProps> = ({
    width,
    height,
    onDimensionChange,
    onExport
}) => {
    const [isCustom, setIsCustom] = useState(false);

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
                <select className="select-input" onChange={handlePresetChange} defaultValue={RESOLUTIONS[2].label}>
                    {RESOLUTIONS.map(res => (
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
                <button className="button button-secondary" onClick={() => onExport('png')}>
                    Export PNG
                </button>
                <button className="button button-secondary" onClick={() => onExport('jpg')}>
                    Export JPG
                </button>
                <button className="button button-primary" onClick={() => onExport('pdf')}>
                    Export PDF
                </button>
            </div>
        </div>
    );
};
