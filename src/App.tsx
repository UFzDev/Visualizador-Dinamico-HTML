import { useState, useRef, useCallback } from 'react';
import { CodeEditor } from './components/CodeEditor/CodeEditor';
import { PreviewPane } from './components/PreviewPane/PreviewPane';
import { Toolbar } from './components/Toolbar/Toolbar';
import { RESOLUTIONS } from './constants/resolutions';
import { DEFAULT_HTML } from './constants/defaultHtml';
import { createExportUseCase } from './shared/di/exportComposition';
import './App.css';

const DEFAULT_WIDTH = 390;
const DEFAULT_HEIGHT = 844;

function App() {
  const initialResolution = RESOLUTIONS.find((resolution) => resolution.width > 0 && resolution.height > 0);
  const [htmlContent, setHtmlContent] = useState<string>(DEFAULT_HTML);
  const [width, setWidth] = useState<number>(initialResolution?.width ?? DEFAULT_WIDTH);
  const [height, setHeight] = useState<number>(initialResolution?.height ?? DEFAULT_HEIGHT);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleExport = useCallback(async () => {
    if (!iframeRef.current) return;

    try {
      setError(null);
      setIsExporting(true);
      
      // Obtener HTML del iframe
      const htmlContent = iframeRef.current.srcdoc;
      if (!htmlContent) {
        throw new Error('No HTML content found in iframe');
      }

      // Usar caso de uso de la arquitectura hexagonal
      const exportUseCase = createExportUseCase();
      await exportUseCase.execute(htmlContent, width, height);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error occurred';
      console.error('[App] Export error:', err);
      setError(`Export failed: ${message}`);
    } finally {
      setIsExporting(false);
    }
  }, [width, height]);

  const handleDimensionChange = useCallback((w: number, h: number) => {
    setWidth(w);
    setHeight(h);
  }, []);

  const handleHtmlChange = useCallback((val: string) => {
    setHtmlContent(val);
  }, []);

  return (
    <div className="app-container">
      <Toolbar
        width={width}
        height={height}
        onDimensionChange={handleDimensionChange}
        onExport={handleExport}
      />

      {isExporting && <ExportOverlay />}

      {error && <ErrorNotification message={error} onClose={() => setError(null)} />}

      <div className="workspace">
        <CodeEditor value={htmlContent} onChange={handleHtmlChange} />
        <PreviewPane ref={iframeRef} htmlContent={htmlContent} width={width} height={height} />
      </div>
    </div>
  );
}

/**
 * Componente que muestra un overlay mientras se exporta
 */
function ExportOverlay() {
  return <div className="export-overlay">Exportando...</div>;
}

/**
 * Componente que muestra notificación de error
 */
function ErrorNotification({ message, onClose }: { message: string; onClose: () => void }) {
  return (
    <div className="error-notification">
      <p>{message}</p>
      <button onClick={onClose}>Cerrar</button>
    </div>
  );
}

export default App;

