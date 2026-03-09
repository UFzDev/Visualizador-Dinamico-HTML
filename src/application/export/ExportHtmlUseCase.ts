import {
  ExportExecutionError,
  ExportRequestValidator,
  ExportValidationError,
  type DownloadPort,
  type ExportPort,
  type ExportRequest,
} from '../../domain/export';

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
    height: number
  ): Promise<void> {
    // 1. Crear solicitud de exportación
    const request: ExportRequest = {
      html,
      width,
      height,
    };

    // 2. Validar solicitud (regla de dominio)
    const validation = ExportRequestValidator.validate(request);
    if (!validation.valid) {
      throw new ExportValidationError(validation.error);
    }

    // 3. Ejecutar exportación a través del puerto
    const result = await this.exportAdapter.export(request);

    // 4. Verificar resultado
    if (!result.success || !result.fileUrl) {
      throw new ExportExecutionError(result.error || 'Export failed: no file URL received');
    }

    // 5. Descargar archivo
    const filename = 'export.png';
    this.downloadAdapter.download(result.fileUrl, filename);
  }
}
