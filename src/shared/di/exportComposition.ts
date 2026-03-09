import { ExportHtmlUseCase } from '../../application/export/ExportHtmlUseCase';
import { HttpExportAdapter } from '../../infrastructure/export/HttpExportAdapter';
import { BrowserDownloadAdapter } from '../../infrastructure/export/BrowserDownloadAdapter';

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
): ExportHtmlUseCase {
  // Adapters de infraestructura
  const exportAdapter = new HttpExportAdapter('/api/export');

  // Solo se soporta descarga de PNG
  const downloadAdapter = new BrowserDownloadAdapter();

  // Inyectar dependencias en el caso de uso
  return new ExportHtmlUseCase(exportAdapter, downloadAdapter);
}
