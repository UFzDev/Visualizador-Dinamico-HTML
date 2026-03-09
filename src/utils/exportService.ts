import { jsPDF } from 'jspdf';

interface ExportRequest {
  html: string;
  width: number;
  height: number;
  format: 'png' | 'jpg' | 'pdf';
}

interface ExportResponse {
  success: boolean;
  dataUrl?: string;
  error?: string;
}

/**
 * Exporta contenido HTML a una imagen usando Puppeteer en el servidor
 * @param iframe - Elemento iframe que contiene el HTML
 * @param format - Formato de salida: 'png', 'jpg' o 'pdf'
 * @param width - Ancho en píxeles
 * @param height - Alto en píxeles
 */
export const triggerIframeExport = async (
  iframe: HTMLIFrameElement,
  format: 'png' | 'jpg' | 'pdf',
  width: number,
  height: number
): Promise<void> => {
  try {
    const htmlContent = iframe.srcdoc;

    if (!htmlContent) {
      throw new Error('No HTML content found in iframe');
    }

    const response = await fetch('/api/export', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        html: htmlContent,
        width,
        height,
        format
      } as ExportRequest)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Export request failed');
    }

    const data = (await response.json()) as ExportResponse;

    if (!data.success || !data.dataUrl) {
      throw new Error('Export failed: no dataUrl received');
    }

    downloadFile(data.dataUrl, format, width, height);
  } catch (error) {
    console.error('[Export Service] Error:', error);
    throw error;
  }
};

/**
 * Descarga el archivo exportado
 */
function downloadFile(dataUrl: string, format: string, width: number, height: number): void {
  if (format === 'pdf') {
    generatePDF(dataUrl, width, height);
  } else {
    downloadImage(dataUrl, format);
  }
}

/**
 * Genera un PDF a partir de la imagen
 */
function generatePDF(dataUrl: string, width: number, height: number): void {
  const pdf = new jsPDF({
    orientation: width > height ? 'landscape' : 'portrait',
    unit: 'px',
    format: [width, height]
  });

  pdf.addImage(dataUrl, 'PNG', 0, 0, width, height);
  pdf.save('export.pdf');
}

/**
 * Descarga la imagen (PNG o JPG)
 */
function downloadImage(dataUrl: string, format: 'png' | 'jpg'): void {
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = `export.${format}`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
