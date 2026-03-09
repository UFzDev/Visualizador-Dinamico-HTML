/**
 * Dominio: Formatos de exportación soportados
 */
export type ExportFormat = 'png' | 'jpg' | 'pdf';

/**
 * Validador de formato
 */
export function isValidExportFormat(format: string): format is ExportFormat {
  return ['png', 'jpg', 'pdf'].includes(format);
}
