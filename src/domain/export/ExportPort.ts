import type { ExportRequest, ExportResult } from './ExportRequest';

/**
 * Puerto de salida: Contrato para servicios de exportación
 * Este puerto define la interfaz que debe implementar cualquier
 * adaptador de infraestructura que realice exportaciones
 */
export interface ExportPort {
  /**
   * Exporta HTML a imagen PNG
   */
  export(request: ExportRequest): Promise<ExportResult>;
}

/**
 * Puerto de salida: Contrato para descarga de archivos
 */
export interface DownloadPort {
  /**
   * Descarga un archivo desde una URL local (blob/object URL)
   */
  download(fileUrl: string, filename: string): void;
}
