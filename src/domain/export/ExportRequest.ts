import type { ExportFormat } from './ExportFormat';

/**
 * Dominio: Solicitud de exportación
 */
export interface ExportRequest {
  readonly html: string;
  readonly width: number;
  readonly height: number;
  readonly format: ExportFormat;
}

/**
 * Dominio: Resultado de exportación
 */
export interface ExportResult {
  readonly success: boolean;
  readonly dataUrl?: string;
  readonly error?: string;
}

/**
 * Validaciones de dominio
 */
export class ExportRequestValidator {
  private static readonly MAX_DIMENSION = 4096;

  static validate(request: ExportRequest): { valid: boolean; error?: string } {
    if (!request.html || request.html.trim() === '') {
      return { valid: false, error: 'HTML content is required' };
    }

    if (request.width <= 0 || request.height <= 0) {
      return { valid: false, error: 'Width and height must be positive' };
    }

    if (request.width > this.MAX_DIMENSION || request.height > this.MAX_DIMENSION) {
      return {
        valid: false,
        error: `Dimensions too large. Maximum: ${this.MAX_DIMENSION}x${this.MAX_DIMENSION}`,
      };
    }

    return { valid: true };
  }
}
