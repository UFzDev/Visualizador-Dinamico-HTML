# 🚀 Deployment a Vercel

Este proyecto está configurado para funcionar completamente en Vercel utilizando Serverless Functions con Puppeteer.

## 📋 Requisitos

- Cuenta de Vercel (gratuita o Pro)
- Node.js 18+ instalado localmente

## 🔧 Configuración

### 1. Instalar Dependencias

```bash
npm install
```

Esto instalará:
- `@sparticuz/chromium`: Chromium optimizado para serverless (~50MB comprimido)
- `puppeteer-core`: Puppeteer sin el binario de Chromium
- `@vercel/node`: Types para Vercel Serverless Functions

### 2. Probar Localmente (Desarrollo)

```bash
npm run dev
```

En desarrollo, el endpoint `/api/export` funciona mediante el plugin de Vite con Puppeteer completo.

### 3. Probar Build de Producción Localmente

```bash
npm run build
npx vercel dev
```

Esto simula el entorno de Vercel localmente, incluyendo las Serverless Functions.

## ☁️ Deploy a Vercel

### Opción A: Deploy con CLI

```bash
npm install -g vercel
vercel login
vercel --prod
```

### Opción B: Deploy con GitHub

1. Sube tu repositorio a GitHub
2. Ve a [vercel.com](https://vercel.com)
3. Click en "Add New Project"
4. Importa tu repositorio
5. Vercel detectará automáticamente la configuración

## ⚙️ Configuración de Vercel

El archivo `vercel.json` configura:

```json
{
  "functions": {
    "api/export.ts": {
      "maxDuration": 30,     // 30 segundos timeout (ajusta según tu plan)
      "memory": 3008         // 3GB RAM (máximo en Pro plan)
    }
  }
}
```

### Límites por Plan

| Plan | maxDuration | Memory | Tamaño Bundle |
|------|-------------|--------|---------------|
| **Hobby (Free)** | 10s | 1024 MB | 50 MB |
| **Pro** | 60s | 3008 MB | 250 MB |
| **Enterprise** | 900s | 3008 MB | 250 MB |

**Nota**: Si usas plan Free, cambia `maxDuration: 10` en `vercel.json` y `api/export.ts`.

## 🔍 Verificación Post-Deploy

Una vez desplegado:

1. Abre tu aplicación en `https://tu-proyecto.vercel.app`
2. Prueba exportar una captura de pantalla
3. Verifica los logs en el Dashboard de Vercel

Si hay errores de timeout:
- Reduce la dimensión máxima de exportación
- Optimiza el HTML (reduce imágenes externas pesadas)
- Considera upgrade a plan Pro para 60s timeout

## 🐛 Troubleshooting

### Error: "Function invocation timeout"
- **Causa**: La exportación toma más de 10s/30s/60s
- **Solución**: Reduce tamaño de export o mejora plan de Vercel

### Error: "Memory limit exceeded"
- **Causa**: Chromium + página grande exceden 1GB RAM
- **Solución**: Upgrade a Vercel Pro (3GB RAM)

### Error: "Cannot find module @sparticuz/chromium"
- **Causa**: Dependencias no instaladas correctamente
- **Solución**: Ejecuta `npm install` y redeploy

### Capture sale en blanco
- **Causa**: Timeout de carga de recursos externos
- **Solución**: Aumenta timeouts en `api/export.ts` (línea 61)

## 📊 Costos Estimados

**Plan Hobby (Free)**:
- ✅ 100 GB-hours de invocaciones
- ✅ ~5,000 exportaciones/mes (asumiendo 2s promedio)
- ⚠️ Solo 10s timeout

**Plan Pro ($20/mes)**:
- ✅ 1,000 GB-hours de invocaciones
- ✅ ~180,000 exportaciones/mes
- ✅ 60s timeout
- ✅ 3GB RAM

## 🔐 Variables de Entorno (Opcional)

Si quieres agregar autenticación o rate limiting:

```bash
# En Vercel Dashboard > Settings > Environment Variables
API_SECRET=tu-secret-key
RATE_LIMIT=100
```

Luego modifica `api/export. ts` para validar el header.

## 📝 Notas Adicionales

- **Primera invocación**: La primera llamada después de inactividad puede tardar ~5-8s (cold start de Chromium)
- **Warm instances**: Llamadas subsecuentes son más rápidas (~1-3s)
- **Región**: Vercel despliega automáticamente en edge locations globales
- **Monitoreo**: Usa Vercel Analytics para trackear performance

---

✨ Tu app ahora está lista para producción en Vercel con exportación pixel-perfect via Puppeteer.
