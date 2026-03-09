import type { VercelRequest, VercelResponse } from '@vercel/node';
import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium';

// Configuración optimizada para Vercel
export const config = {
  maxDuration: 30, // 30 segundos máximo (Free tier: 10s, Pro: 60s)
};

interface ExportRequest {
  html: string;
  width: number;
  height: number;
  format: 'png' | 'jpg';
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
): Promise<void> {
  // Solo permitir POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { html, width, height, format } = req.body as ExportRequest;

    // Validación de parámetros
    if (!html || !width || !height || !['png', 'jpg'].includes(format)) {
      return res.status(400).json({ error: 'Invalid parameters' });
    }

    // Validar tamaños razonables (evitar timeouts)
    if (width > 4096 || height > 4096) {
      return res.status(400).json({ 
        error: 'Dimensions too large. Maximum: 4096x4096' 
      });
    }

    // Lanzar Puppeteer con Chromium optimizado para Vercel
    const browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
    });

    try {
      const page = await browser.newPage();

      // Configurar viewport
      await page.setViewport({
        width: parseInt(String(width)),
        height: parseInt(String(height)),
      });

      // Cargar contenido HTML
      await page.setContent(html, {
        waitUntil: 'networkidle2',
        timeout: 25000, // Dejar margen para el timeout de Vercel
      });

      // Esperar que las fuentes CSS carguen
      try {
        await page.evaluateHandle('document.fonts.ready');
      } catch (e) {
        // Continuar si el timeout de fuentes falla
        console.warn('Font loading timeout');
      }

      // Esperar a que todas las imágenes carguen
      await page.evaluate(() => {
        const doc = (globalThis as any).document;
        const images = Array.from(doc?.images ?? []) as any[];

        return Promise.all(
          images
            .filter((img) => !img.complete)
            .map((img) => {
              return new Promise((resolve) => {
                img.onload = () => resolve(null);
                img.onerror = () => resolve(null);
                // Timeout por imagen
                setTimeout(() => resolve(null), 5000);
              });
            })
        );
      });

      // Pequeño delay para asegurar renderizado completo
      await new Promise((resolve) => setTimeout(resolve, 300));

      // Capturar screenshot
      const buffer = await page.screenshot({
        type: format === 'jpg' ? 'jpeg' : 'png',
        quality: format === 'jpg' ? 100 : undefined,
        fullPage: false,
        captureBeyondViewport: false,
      });

      // Convertir a base64
      const base64 = buffer.toString('base64');
      const dataUrl = `data:image/${format === 'jpg' ? 'jpeg' : 'png'};base64,${base64}`;

      await page.close();

      return res.status(200).json({ 
        success: true, 
        dataUrl 
      });
    } finally {
      await browser.close();
    }
  } catch (error: any) {
    console.error('[Export API] Error:', error.message);
    
    return res.status(500).json({ 
      error: error.message || 'Internal server error',
      success: false 
    });
  }
}
