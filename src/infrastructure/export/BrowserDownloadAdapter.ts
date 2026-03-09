import type { DownloadPort } from '../../domain/export/ExportPort';

/**
 * Adapter de Infraestructura: Descarga de archivos en navegador
 * 
 * Implementa DownloadPort usando APIs del navegador (DOM)
 */
export class BrowserDownloadAdapter implements DownloadPort {
  download(dataUrl: string, filename: string): void {
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = filename;
    
    // Agregar al DOM, hacer click y remover
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
