import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import puppeteer from 'puppeteer';
import type { IncomingMessage, ServerResponse } from 'http';
import type { Plugin, ViteDevServer } from 'vite';
import { ExportRequestValidator, normalizeExportRequest } from './src/domain/export';

// Singleton para la instancia del navegador
let browserInstance: any = null;

async function getBrowser() {
  if (!browserInstance) {
    browserInstance = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
  }
  return browserInstance;
}

/**
 * Plugin personalizado que maneja el endpoint /api/export
 * Utiliza Puppeteer para renderizar HTML a screenshot exacto
 */
function exportApiPlugin(): Plugin {
  return {
    name: 'export-api-plugin',
    apply: 'serve',
    configureServer(server: ViteDevServer) {
      server.middlewares.use('/api/export', async (req: IncomingMessage, res: ServerResponse) => {
          if (req.method !== 'POST') {
            res.writeHead(405, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Method not allowed' }));
            return;
          }

          let body = '';

          req.on('data', (chunk) => {
            body += chunk.toString();
          });

          req.on('end', async () => {
            try {
              const request = normalizeExportRequest(JSON.parse(body));

              // Validación de parámetros
              if (!request) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Invalid parameters' }));
                return;
              }

              const validation = ExportRequestValidator.validate(request);
              if (!validation.valid) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: validation.error }));
                return;
              }

              const browser = await getBrowser();
              const page = await browser.newPage();

              try {
                // Configurar viewport
                await page.setViewport({
                  width: request.width,
                  height: request.height
                });

                // Cargar contenido HTML
                await page.setContent(request.html, {
                  waitUntil: 'networkidle2',
                  timeout: 30000
                });

                // Esperar que las fuentes CSS carguen
                try {
                  await page.evaluateHandle('document.fonts.ready');
                } catch (e) {
                  // Continuar si el timeout de fuentes falla
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
                          img.onload = resolve;
                          img.onerror = resolve;
                        });
                      })
                  );
                });

                // Pequeño delay para asegurar que todo esté renderizado
                await new Promise((resolve) => setTimeout(resolve, 300));

                // Capturar screenshot
                const buffer = await page.screenshot({
                  type: 'png',
                  fullPage: false,
                  captureBeyondViewport: false
                });

                res.writeHead(200, {
                  'Content-Type': 'image/png',
                  'Cache-Control': 'no-store'
                });
                res.end(buffer);
              } finally {
                await page.close();
              }
            } catch (error: any) {
              console.error('[Export API] Error:', error.message);
              res.writeHead(500, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: error.message }));
            }
          });
        });
    }
  };
}

// Cleanup de Puppeteer al cerrar
process.on('SIGINT', async () => {
  if (browserInstance) {
    await browserInstance.close();
  }
  process.exit();
});

export default defineConfig({
  plugins: [react(), exportApiPlugin()]
});
