/**
 * Errores de dominio para el flujo de exportacion.
 */
export class ExportValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ExportValidationError';
  }
}

export class ExportExecutionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ExportExecutionError';
  }
}
