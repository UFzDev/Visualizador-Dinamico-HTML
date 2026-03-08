import { jsPDF } from 'jspdf';

export const triggerIframeExport = (
    iframe: HTMLIFrameElement,
    format: 'png' | 'jpg' | 'pdf',
    width: number,
    height: number
): Promise<void> => {
    return new Promise((resolve, reject) => {
        const imageFormat = format === 'pdf' ? 'png' : format; // Para PDF necesitamos una imagen de base (PNG es lossless)

        const handleMessage = (event: MessageEvent) => {
            // Ignoramos mensajes que no sean los nuestros
            if (!event.data || !event.data.type) return;

            if (event.data.type === 'EXPORT_RESULT') {
                window.removeEventListener('message', handleMessage);
                const dataUrl = event.data.dataUrl;

                try {
                    if (format === 'pdf') {
                        // Generar PDF con jsPDF
                        // Convertimos la resolución de px a pt o mm. Por simplicidad usamos pixels (pt) como unidad
                        const pdf = new jsPDF({
                            orientation: width > height ? 'landscape' : 'portrait',
                            unit: 'px',
                            format: [width, height]
                        });
                        pdf.addImage(dataUrl, 'PNG', 0, 0, width, height);
                        pdf.save('export.pdf');
                    } else {
                        // Descargar imagen directamente
                        const a = document.createElement('a');
                        a.href = dataUrl;
                        a.download = `export.${format}`;
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                    }
                    resolve();
                } catch (err) {
                    reject(err);
                }
            } else if (event.data.type === 'EXPORT_ERROR') {
                window.removeEventListener('message', handleMessage);
                reject(new Error(event.data.error));
            }
        };

        window.addEventListener('message', handleMessage);

        // Enviar el comando de exportación al iframe
        if (iframe.contentWindow) {
            iframe.contentWindow.postMessage({
                type: 'EXPORT',
                format: imageFormat,
                width,
                height
            }, '*');
        } else {
            window.removeEventListener('message', handleMessage);
            reject(new Error('Iframe contentWindow is not accessible'));
        }
    });
};
