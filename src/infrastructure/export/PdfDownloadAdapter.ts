import { jsPDF } from 'jspdf';
import type { DownloadPort } from '../../domain/export/ExportPort';

/**
 * Adapter de Infraestructura: Generación de PDF
 * 
 * Convierte una imagen (dataURL) a PDF usando jsPDF
 * y lo descarga directamente
 */
export class PdfDownloadAdapter implements DownloadPort {
  private readonly width: number;
  private readonly height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  download(dataUrl: string, filename: string): void {
    const pdf = new jsPDF({
      orientation: this.width > this.height ? 'landscape' : 'portrait',
      unit: 'px',
      format: [this.width, this.height],
    });

    pdf.addImage(dataUrl, 'PNG', 0, 0, this.width, this.height);
    
    // Usar nombre base sin extensión, jsPDF agrega .pdf
    const baseName = filename.replace(/\.pdf$/, '');
    pdf.save(`${baseName}.pdf`);
  }
}
