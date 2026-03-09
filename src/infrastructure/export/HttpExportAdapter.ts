import type { ExportPort, ExportRequest, ExportResult } from '../../domain/export';

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
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return {
          success: false,
          error: errorData.error || `HTTP ${response.status}: ${response.statusText}`,
        };
      }

      const contentType = response.headers.get('content-type') || '';
      if (!contentType.includes('image/png')) {
        return {
          success: false,
          error: `Unexpected response content-type: ${contentType || 'unknown'}`,
        };
      }

      const imageBlob = await response.blob();
      const fileUrl = URL.createObjectURL(imageBlob);
      return {
        success: true,
        fileUrl,
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
