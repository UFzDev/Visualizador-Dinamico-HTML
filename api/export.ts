import type { VercelRequest, VercelResponse } from '@vercel/node';
import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium';
import { ExportRequestValidator, normalizeExportRequest } from '../src/domain/export';

// Configuración optimizada para Vercel
export const config = {
  maxDuration: 30, // 30 segundos máximo (Free tier: 10s, Pro: 60s)
};

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
): Promise<void> {
  // Solo permitir POST
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const request = normalizeExportRequest(req.body);

    // Validación de parámetros
    if (!request) {
      res.status(400).json({ error: 'Invalid parameters' });
      return;
    }

    const validation = ExportRequestValidator.validate(request);
    if (!validation.valid) {
      res.status(400).json({ error: validation.error });
      return;
    }

    // Lanzar Puppeteer con Chromium optimizado para Vercel
    const browser = await puppeteer.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath(),
      headless: true,
    });

    try {
      const page = await browser.newPage();

      // Configurar viewport
      await page.setViewport({
        width: request.width,
        height: request.height,
      });

      // Cargar contenido HTML
      await page.setContent(request.html, {
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
        type: 'png',
        fullPage: false,
        captureBeyondViewport: false,
      });

      await page.close();

      res.setHeader('Content-Type', 'image/png');
      res.setHeader('Cache-Control', 'no-store');
      res.status(200).send(buffer);
      return;
    } finally {
      await browser.close();
    }
  } catch (error: any) {
    console.error('[Export API] Error:', error.message);
    
    res.status(500).json({ 
      error: error.message || 'Internal server error',
      success: false 
    });
    return;
  }
}
