import type { ExportPort, DownloadPort } from '../../domain/export/ExportPort';
import type { ExportRequest } from '../../domain/export/ExportRequest';
import type { ExportFormat } from '../../domain/export/ExportFormat';
import { ExportRequestValidator } from '../../domain/export/ExportRequest';

/**
 * Caso de Uso: Exportar HTML a archivo
 * 
 * Responsabilidad: Orquestar el proceso de exportación validando,
 * ejecutando la exportación y descargando el resultado
 */
export class ExportHtmlUseCase {
  private readonly exportAdapter: ExportPort;
  private readonly downloadAdapter: DownloadPort;

  constructor(
    exportAdapter: ExportPort,
    downloadAdapter: DownloadPort
  ) {
    this.exportAdapter = exportAdapter;
    this.downloadAdapter = downloadAdapter;
  }

  async execute(
    html: string,
    width: number,
    height: number,
    format: ExportFormat
  ): Promise<void> {
    // 1. Crear solicitud de exportación
    const request: ExportRequest = {
      html,
      width,
      height,
      format,
    };

    // 2. Validar solicitud (regla de dominio)
    const validation = ExportRequestValidator.validate(request);
    if (!validation.valid) {
      throw new Error(validation.error);
    }

    // 3. Ejecutar exportación a través del puerto
    const result = await this.exportAdapter.export(request);

    // 4. Verificar resultado
    if (!result.success || !result.dataUrl) {
      throw new Error(result.error || 'Export failed: no data URL received');
    }

    // 5. Descargar archivo
    const filename = `export.${format}`;
    this.downloadAdapter.download(result.dataUrl, filename);
  }
}
