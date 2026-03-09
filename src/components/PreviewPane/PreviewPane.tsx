import { forwardRef, useMemo } from 'react';
import type { CSSProperties } from 'react';
import './PreviewPane.css';

interface PreviewPaneProps {
  htmlContent: string;
  width: number;
  height: number;
}

export const PreviewPane = forwardRef<HTMLIFrameElement, PreviewPaneProps>(
  ({ htmlContent, width, height }, ref) => {
    const previewSize = useMemo<CSSProperties>(
      () => ({ width: `${width}px`, height: `${height}px` }),
      [width, height]
    );

    return (
      <div className="preview-panel">
        <div className="preview-container" style={previewSize}>
          <iframe
            ref={ref}
            title="Preview HTML"
            srcDoc={htmlContent}
            className="preview-iframe"
            sandbox="allow-scripts allow-same-origin"
          />
        </div>
      </div>
    );
  }
);

PreviewPane.displayName = 'PreviewPane';
