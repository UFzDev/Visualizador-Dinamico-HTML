import { ExportHtmlUseCase } from '../../application/export/ExportHtmlUseCase';
import { HttpExportAdapter } from '../../infrastructure/export/HttpExportAdapter';
import { BrowserDownloadAdapter } from '../../infrastructure/export/BrowserDownloadAdapter';
import { PdfDownloadAdapter } from '../../infrastructure/export/PdfDownloadAdapter';
import type { ExportFormat } from '../../domain/export/ExportFormat';

/**
 * Composición de Dependencias (Dependency Injection)
 * 
 * Este módulo ensambla las capas de la arquitectura hexagonal
 * inyectando las dependencias de infraestructura en los casos de uso
 */

/**
 * Factory: Crea caso de uso de exportación con dependencias inyectadas
 */
export function createExportUseCase(
  width: number,
  height: number,
  format: ExportFormat
): ExportHtmlUseCase {
  // Adapters de infraestructura
  const exportAdapter = new HttpExportAdapter('/api/export');
  
  // Elegir adapter de descarga según formato
  const downloadAdapter = format === 'pdf'
    ? new PdfDownloadAdapter(width, height)
    : new BrowserDownloadAdapter();

  // Inyectar dependencias en el caso de uso
  return new ExportHtmlUseCase(exportAdapter, downloadAdapter);
}
