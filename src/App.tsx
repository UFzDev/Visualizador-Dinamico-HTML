import { useState, useRef } from 'react';
import { CodeEditor } from './components/CodeEditor/CodeEditor';
import { PreviewPane } from './components/PreviewPane/PreviewPane';
import { Toolbar } from './components/Toolbar/Toolbar';
import { RESOLUTIONS } from './constants/resolutions';
import { triggerIframeExport } from './utils/exportService';

import { DEFAULT_HTML } from './constants/defaultHtml';

function App() {
  const [htmlContent, setHtmlContent] = useState<string>(DEFAULT_HTML);
  const [width, setWidth] = useState<number>(RESOLUTIONS[0].width);
  const [height, setHeight] = useState<number>(RESOLUTIONS[0].height);
  const [isExporting, setIsExporting] = useState<boolean>(false);

  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleExport = async (format: 'png' | 'jpg' | 'pdf') => {
    if (!iframeRef.current) return;

    try {
      setIsExporting(true);
      // Pequeño timeout para permitir que React actualice estado si queremos mostrar un loader
      await new Promise(resolve => setTimeout(resolve, 100));
      await triggerIframeExport(iframeRef.current, format, width, height);
    } catch (error) {
      console.error('Error exporting:', error);
      alert('Hubo un error al exportar la imagen. Revisa la consola para más detalles.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="app-container">
      <Toolbar
        width={width}
        height={height}
        onDimensionChange={(w, h) => { setWidth(w); setHeight(h); }}
        onExport={handleExport}
      />

      {isExporting && (
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'white', fontSize: '1.25rem', fontWeight: 600
        }}>
          Exportando...
        </div>
      )}

      <div className="workspace">
        <CodeEditor
          value={htmlContent}
          onChange={(val) => setHtmlContent(val || '')}
        />
        <PreviewPane
          ref={iframeRef}
          htmlContent={htmlContent}
          width={width}
          height={height}
        />
      </div>
    </div>
  );
}

export default App;

