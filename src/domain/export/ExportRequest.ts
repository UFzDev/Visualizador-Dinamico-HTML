/**
 * Dominio: Solicitud de exportación
 */
export interface ExportRequest {
  readonly html: string;
  readonly width: number;
  readonly height: number;
}

type ExportRequestInput = {
  html: unknown;
  width: unknown;
  height: unknown;
};

export type ValidationResult =
  | { valid: true }
  | { valid: false; error: string };

/**
 * Dominio: Resultado de exportación
 */
export interface ExportResult {
  readonly success: boolean;
  readonly fileUrl?: string;
  readonly error?: string;
}

/**
 * Normaliza un payload externo a ExportRequest.
 * Retorna null cuando faltan campos requeridos.
 */
export function normalizeExportRequest(payload: unknown): ExportRequest | null {
  if (!payload || typeof payload !== 'object') {
    return null;
  }

  const { html, width, height } = payload as ExportRequestInput;
  if (html === undefined || width === undefined || height === undefined) {
    return null;
  }

  return {
    html: String(html),
    width: Number(width),
    height: Number(height),
  };
}

/**
 * Validaciones de dominio
 */
export class ExportRequestValidator {
  private static readonly MIN_DIMENSION = 1;
  private static readonly MAX_DIMENSION = 4096;

  static validate(request: ExportRequest): ValidationResult {
    if (!request.html || request.html.trim() === '') {
      return { valid: false, error: 'HTML content is required' };
    }

    if (!Number.isFinite(request.width) || !Number.isFinite(request.height)) {
      return { valid: false, error: 'Width and height must be valid numbers' };
    }

    if (!Number.isInteger(request.width) || !Number.isInteger(request.height)) {
      return { valid: false, error: 'Width and height must be integers' };
    }

    if (request.width < this.MIN_DIMENSION || request.height < this.MIN_DIMENSION) {
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
