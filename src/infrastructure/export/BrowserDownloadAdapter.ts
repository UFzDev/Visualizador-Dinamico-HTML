import type { DownloadPort } from '../../domain/export';

/**
 * Adapter de Infraestructura: Descarga de archivos en navegador
 * 
 * Implementa DownloadPort usando APIs del navegador (DOM)
 */
export class BrowserDownloadAdapter implements DownloadPort {
  download(fileUrl: string, filename: string): void {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = filename;
    
    // Agregar al DOM, hacer click y remover
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Liberar memoria cuando el adapter recibe object URLs
    if (fileUrl.startsWith('blob:')) {
      URL.revokeObjectURL(fileUrl);
    }
  }
}
