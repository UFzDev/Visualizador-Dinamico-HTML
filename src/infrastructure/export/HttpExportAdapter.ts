import type { ExportPort } from '../../domain/export/ExportPort';
import type { ExportRequest, ExportResult } from '../../domain/export/ExportRequest';

/**
 * Adapter de Infraestructura: Exportación vía HTTP
 * 
 * Implementa ExportPort usando fetch al backend /api/export
 */
export class HttpExportAdapter implements ExportPort {
  private readonly apiUrl: string;

  constructor(apiUrl: string = '/api/export') {
    this.apiUrl = apiUrl;
  }

  async export(request: ExportRequest): Promise<ExportResult> {
    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          html: request.html,
          width: request.width,
          height: request.height,
          format: request.format,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return {
          success: false,
          error: errorData.error || `HTTP ${response.status}: ${response.statusText}`,
        };
      }

      const data = await response.json();
      return {
        success: data.success ?? true,
        dataUrl: data.dataUrl,
        error: data.error,
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      return {
        success: false,
        error: `Network error: ${message}`,
      };
    }
  }
}
