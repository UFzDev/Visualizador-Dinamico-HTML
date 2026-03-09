# Arquitectura Hexagonal - Visualizador HTML

Este proyecto implementa **Arquitectura Hexagonal (Ports & Adapters)** para mantener la lógica de negocio independiente de frameworks y detalles de infraestructura.

## 📐 Estructura de Capas

```text
src/
├── domain/              # Capa de Dominio (Núcleo del negocio)
│   └── export/
│       ├── ExportFormat.ts       # Tipos de dominio
│       ├── ExportRequest.ts      # Entidades y validaciones
│       └── ExportPort.ts         # Puertos (interfaces)
│
├── application/         # Capa de Aplicación (Casos de Uso)
│   └── export/
│       └── ExportHtmlUseCase.ts  # Orquestación de negocio
│
├── infrastructure/      # Capa de Infraestructura (Detalles técnicos)
│   └── export/
│       ├── HttpExportAdapter.ts        # Implementación HTTP
│       ├── BrowserDownloadAdapter.ts   # Implementación descarga
│       └── PdfDownloadAdapter.ts       # Implementación PDF
│
├── shared/              # Código compartido
│   └── di/
│       └── exportComposition.ts  # Inyección de dependencias
│
└── ui/                  # Capa de Presentación (React)
    ├── components/
    ├── App.tsx          # Orquestador UI
    └── main.tsx
```

## 🎯 Principios Implementados

### 1. **Inversión de Dependencias**
- La capa de dominio NO depende de infraestructura
- Se usan **puertos (interfaces)** para definir contratos
- Los adapters implementan esos puertos

### 2. **Separación de Responsabilidades**
- **Domain**: Reglas de negocio puras (validaciones, tipos)
- **Application**: Casos de uso (orquestación)
- **Infrastructure**: Detalles técnicos (HTTP, jsPDF, DOM)
- **UI**: Presentación (React components)

### 3. **Inyección de Dependencias**
- `exportComposition.ts` ensambla las dependencias
- Los casos de uso reciben adapters por constructor
- Fácil de testear con mocks

## 🔌 Puertos y Adapters

### Puertos (Interfaces)

```typescript
// domain/export/ExportPort.ts
export interface ExportPort {
  export(request: ExportRequest): Promise<ExportResult>;
}

export interface DownloadPort {
  download(dataUrl: string, filename: string): void;
}
```

### Adapters (Implementaciones)

| Puerto | Adapter | Responsabilidad |
|--------|---------|-----------------|
| `ExportPort` | `HttpExportAdapter` | Exporta via HTTP a `/api/export` |
| `DownloadPort` | `BrowserDownloadAdapter` | Descarga archivos png/jpg |
| `DownloadPort` | `PdfDownloadAdapter` | Genera y descarga PDF |

## 🚀 Flujo de Exportación

```mermaid
graph LR
    UI[App.tsx] --> UC[ExportHtmlUseCase]
    UC --> |valida| DOM[ExportRequestValidator]
    UC --> |exporta| HTTP[HttpExportAdapter]
    UC --> |descarga| DL[DownloadAdapter]
    HTTP --> API[/api/export]
    DL --> BR[Browser DOM]
```

### Paso a paso:

1. **UI** llama a `createExportUseCase()` → inyecta dependencias
2. **UseCase** valida el `ExportRequest` usando reglas de dominio
3. **UseCase** llama al `ExportPort` (adapter HTTP)
4. **HttpAdapter** hace fetch a `/api/export`
5. **UseCase** llama al `DownloadPort` (adapter Browser/PDF)
6. **DownloadAdapter** descarga el archivo al cliente

## 🧪 Testing

La arquitectura hexagonal facilita el testing:

```typescript
// Ejemplo de test unitario
describe('ExportHtmlUseCase', () => {
  it('should validate request before exporting', async () => {
    // Mocks de adapters
    const mockExportAdapter: ExportPort = {
      export: jest.fn().mockResolvedValue({ success: true, dataUrl: 'data:...' })
    };
    const mockDownloadAdapter: DownloadPort = {
      download: jest.fn()
    };

    // Inyectar mocks
    const useCase = new ExportHtmlUseCase(mockExportAdapter, mockDownloadAdapter);

    // Test
    await useCase.execute('<html></html>', 800, 600, 'png');

    expect(mockExportAdapter.export).toHaveBeenCalled();
    expect(mockDownloadAdapter.download).toHaveBeenCalled();
  });
});
```

## 🔄 Extensibilidad

### Agregar nuevo formato de exportación

1. Crear nuevo adapter que implemente `DownloadPort`:
```typescript
export class SvgDownloadAdapter implements DownloadPort {
  download(dataUrl: string, filename: string): void {
    // Implementación SVG
  }
}
```

2. Actualizar `exportComposition.ts`:
```typescript
const downloadAdapter = format === 'svg'
  ? new SvgDownloadAdapter()
  : format === 'pdf'
  ? new PdfDownloadAdapter(width, height)
  : new BrowserDownloadAdapter();
```

### Agregar nuevo método de exportación

1. Crear nuevo adapter que implemente `ExportPort`:
```typescript
export class LocalExportAdapter implements ExportPort {
  async export(request: ExportRequest): Promise<ExportResult> {
    // Usar html2canvas localmente en lugar de backend
  }
}
```

2. Inyectar en composición según necesidad

## 📚 Beneficios Obtenidos

✅ **Mantenibilidad**: Código organizado en capas claras  
✅ **Testabilidad**: Facil mockear dependencias  
✅ **Independencia**: Dominio sin dependencias externas  
✅ **Escalabilidad**: Fácil agregar nuevos adapters  
✅ **Flexibilidad**: Cambiar implementación sin tocar lógica de negocio  

## 🔗 Referencias

- [Hexagonal Architecture (Alistair Cockburn)](https://alistair.cockburn.us/hexagonal-architecture/)
- [Clean Architecture (Robert C. Martin)](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [Ports and Adapters Pattern](https://herbertograca.com/2017/11/16/explicit-architecture-01-ddd-hexagonal-onion-clean-cqrs-how-i-put-it-all-together/)
