# 🎨 Visualizador HTML Avanzado

Una herramienta de desarrollo web en tiempo real construida con **React**, **TypeScript** y **Vite**, diseñada para renderizar, auditar y exportar código HTML/Tailwind moderno de forma inmediata con **arquitectura hexagonal**.

## 🚀 Características Principales

- **Renderizado en Tiempo Real**: Editor Monaco integrado con preview instantáneo en iframe aislado
- **Manejo de Resoluciones**: Simulación de dispositivos (iPhone 14 Pro, iPad Air, etc.) con resoluciones exactas y soporte manual
- **Exportación Pixel-Perfect**: Puppeteer serverless en Vercel para capturas precisas (PNG/JPG/PDF) sin limitaciones de `html2canvas`
- **Entorno Seguro**: Sandboxing completo vía iframe, protegiendo la app de conflictos CSS/JS
- **Tailwind CSS Optimizado**: CDN integrado para renderizado inmediato de clases utilitarias
- **Arquitectura Hexagonal**: Domain-driven design con separación clara de responsabilidades

## 🛠️ Stack Tecnológico

### Frontend
- **React 19.2.0** + **TypeScript 5.9.3** + **Vite 7.3.1**
- **Monaco Editor** (VS Code engine)
- **Radix UI** (primitivas accesibles)
- **Lucide React** (iconografía)
- **jsPDF 4.2.0** (generación PDF)

### Backend
- **Vercel Serverless Functions**
- **Puppeteer-core 23.11.1** + **@sparticuz/chromium 143.0.4** (~50MB optimizado)

## 📐 Arquitectura Hexagonal

Este proyecto sigue el patrón **Ports & Adapters** para mantener la lógica de negocio independiente de frameworks.

```text
src/
├── domain/              # Núcleo del negocio (reglas, validaciones)
│   └── export/
│       ├── ExportFormat.ts       # Tipos de dominio
│       ├── ExportRequest.ts      # Entidades y validaciones
│       └── ExportPort.ts         # Puertos (interfaces)
│
├── application/         # Casos de uso (orquestación)
│   └── export/
│       └── ExportHtmlUseCase.ts  # Lógica de exportación
│
├── infrastructure/      # Detalles técnicos (HTTP, PDF, DOM)
│   └── export/
│       ├── HttpExportAdapter.ts        # Fetch a /api/export
│       ├── BrowserDownloadAdapter.ts   # Descarga PNG/JPG
│       └── PdfDownloadAdapter.ts       # Generación PDF
│
├── shared/
│   └── di/
│       └── exportComposition.ts  # Inyección de dependencias
│
└── components/          # UI (React)
```

### Flujo de Exportación

```
Usuario → App.tsx → ExportHtmlUseCase
                    ├── Valida: ExportRequestValidator
                    ├── Exporta: HttpExportAdapter → /api/export (Puppeteer)
                    └── Descarga: BrowserDownloadAdapter | PdfDownloadAdapter
```

**Beneficios**:
- ✅ **Testeable**: Fácil mockear adapters
- ✅ **Mantenible**: Código organizado en capas claras
- ✅ **Escalable**: Agregar formatos/métodos sin tocar lógica core
- ✅ **Independiente**: Domain sin dependencias de frameworks

## 📦 Instalación y Uso Local

```bash
# Clonar e instalar dependencias
npm install

# Desarrollo (puerto 5173)
npm run dev

# Build de producción
npm run build

# Preview de build local
npm run preview
```

## 🚀 Deployment a Vercel

### Quick Deploy

```bash
npm install -g vercel
vercel login
vercel --prod
```

### Configuración (vercel.json)

```json
{
  "functions": {
    "api/export.ts": {
      "maxDuration": 30,     // 30s (ajustar según plan)
      "memory": 3008         // 3GB RAM (Pro plan)
    }
  }
}
```

### Límites por Plan

| Plan | Timeout | RAM | Exportaciones/mes* |
|------|---------|-----|-------------------|
| **Hobby (Free)** | 10s | 1GB | ~5,000 |
| **Pro ($20/mes)** | 60s | 3GB | ~180,000 |
| **Enterprise** | 900s | 3GB | Ilimitado |

_*Asumiendo 2s promedio por exportación_

### Deploy con GitHub (Recomendado)

1. Sube el repo a GitHub
2. Conecta en [vercel.com](https://vercel.com)
3. Vercel detecta automáticamente la config
4. Deploy automático en cada push a `main`

### Verificación Post-Deploy

Después del deployment:

1. Abre `https://tu-proyecto.vercel.app`
2. Prueba exportar una captura
3. Revisa logs en Vercel Dashboard si hay errores

**Troubleshooting común**:
- **Timeout**: Reduce dimensiones o upgrade a Pro
- **Memory exceeded**: Upgrade a Vercel Pro (3GB RAM)
- **Blank capture**: Aumenta timeouts en `api/export.ts` línea 61

## 💡 Motivación Técnica

### Problema: html2canvas tiene limitaciones

La exportación con `html2canvas` falla con:
- Elementos `position: fixed` (headers, navbars)
- Transformaciones CSS complejas
- Transparencias y overlays

### Solución: Puppeteer Serverless

Usamos **Chromium real** en Vercel Functions para:
1. Renderizar HTML completo en headless browser
2. Capturar screenshot pixel-perfect con API nativa
3. Retornar imagen base64 al frontend

**Resultado**: Exportaciones 100% precisas sin limitaciones.

## 🧪 Testing (Ejemplo)

Gracias a la arquitectura hexagonal, los tests son triviales:

```typescript
describe('ExportHtmlUseCase', () => {
  it('should validate and export', async () => {
    // Mock adapters
    const mockExport: ExportPort = {
      export: jest.fn().mockResolvedValue({ 
        success: true, 
        dataUrl: 'data:image/png;base64,...' 
      })
    };
    const mockDownload: DownloadPort = {
      download: jest.fn()
    };

    const useCase = new ExportHtmlUseCase(mockExport, mockDownload);
    
    await useCase.execute('<html></html>', 800, 600, 'png');

    expect(mockExport.export).toHaveBeenCalled();
    expect(mockDownload.download).toHaveBeenCalled();
  });
});
```

## 🔄 Extensibilidad

### Agregar nuevo formato (ej: SVG)

```typescript
// 1. Crear adapter
export class SvgDownloadAdapter implements DownloadPort {
  download(dataUrl: string, filename: string): void {
    // Lógica SVG
  }
}

// 2. Actualizar DI en exportComposition.ts
const downloadAdapter = format === 'svg'
  ? new SvgDownloadAdapter()
  : format === 'pdf'
  ? new PdfDownloadAdapter(width, height)
  : new BrowserDownloadAdapter();
```

## 🤝 Contribuciones

Requerimientos antes de commit:

- ✅ TypeScript strict mode
- ✅ Componentes funcionales + hooks
- ✅ `npm run lint` pasa sin errores
- ✅ Seguir estructura hexagonal para nueva lógica de negocio

## 📚 Referencias Arquitectura

- [Hexagonal Architecture (Alistair Cockburn)](https://alistair.cockburn.us/hexagonal-architecture/)
- [Clean Architecture (Uncle Bob)](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [Ports and Adapters Pattern](https://herbertograca.com/2017/11/16/explicit-architecture-01-ddd-hexagonal-onion-clean-cqrs-how-i-put-it-all-together/)

---

✨ **Hecho con arquitectura hexagonal y optimizado para Vercel**
