import { forwardRef } from 'react';
import './PreviewPane.css';

interface PreviewPaneProps {
  htmlContent: string;
  width: number;
  height: number;
}

export const PreviewPane = forwardRef<HTMLIFrameElement, PreviewPaneProps>(
  ({ htmlContent, width, height }, ref) => {
    // El HTML se muestra directamente en el iframe sin scripts inyectados
    // La exportación se maneja por Puppeteer en el servidor
    const srcDoc = htmlContent;

    return (
      <div className="preview-panel">
        <div
          className="preview-container"
          style={{ width: `${width}px`, height: `${height}px` }}
        >
          <iframe
            ref={ref}
            title="Preview HTML"
            srcDoc={srcDoc}
            className="preview-iframe"
            sandbox="allow-scripts allow-same-origin"
          />
        </div>
      </div>
    );
  }
);

PreviewPane.displayName = 'PreviewPane';
