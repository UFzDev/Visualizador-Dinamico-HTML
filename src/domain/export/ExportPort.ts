import type { ExportRequest, ExportResult } from './ExportRequest';

/**
 * Puerto de salida: Contrato para servicios de exportación
 * Este puerto define la interfaz que debe implementar cualquier
 * adaptador de infraestructura que realice exportaciones
 */
export interface ExportPort {
  /**
   * Exporta HTML a imagen/PDF
   */
  export(request: ExportRequest): Promise<ExportResult>;
}

/**
 * Puerto de salida: Contrato para descarga de archivos
 */
export interface DownloadPort {
  /**
   * Descarga un archivo desde una URL de datos
   */
  download(dataUrl: string, filename: string): void;
}
