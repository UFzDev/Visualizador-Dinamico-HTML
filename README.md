# Visualizador HTML Avanzado

Una herramienta de desarrollo web en tiempo real construida con **React**, **TypeScript** y **Vite** diseñada para renderizar, auditar y exportar código HTML/Tailwind moderno de forma inmediata.

## 🚀 Características Principales

- **Renderizado en Tiempo Real**: Editor de código Monaco integrado que refleja los cambios instantáneamente en un panel de vista previa (iframe aislado).
- **Manejo de Resoluciones**: Simulación dinámica de múltiples dispositivos (móvil, tablet, escritorio) con resoluciones exactas (ej. iPhone 14 Pro, iPad Air), y soporte para resoluciones manuales.
- **Exportación Pixel-Perfect (`html2canvas`)**: Sistema avanzado de captura de pantalla con parcheo de inyección en caliente. Mantiene la fidelidad de diseño, resolviendo de forma nativa los históricos fallos de renderizado que enfrentan elementos de UI complejos como `position: fixed`, interfaces transparentes y transformaciones al convertirlos en imágenes estáticas (PNG/JPG).
- **Entorno Seguro (Sandboxing)**: El panel de vista previa inyecta el código en un `iframe`, protegiendo la aplicación principal de conflictos de estilos CSS globales o scripts JavaScript conflictivos.
- **Aceleración Tailwind CSS**: Configurado de fábrica para interceptar y renderizar de inmediato clases de Tailwind inyectadas mediante enlace CDN en el preview.

## 🛠️ Stack Tecnológico

- **Core**: React 18, TypeScript, Vite
- **Estilos**: Tailwind CSS (v3.x / Play CDN injection), Lucide React (Iconografía)
- **Componentes**: Radix UI (Primitivas), Vite/SWC
- **Editores/Captura**: Monaco Editor (via React Monaco), html2canvas

## 📦 Instalación y Uso Local

1. **Clonar repositorio** e instalar dependencias usando tu gestor preferido (npm recomendado):
   ```bash
   npm install
   ```
2. **Arrancar el servidor de desarrollo**:
   ```bash
   npm run dev
   ```
   La aplicación correrá típicamente en `http://localhost:5173`.

## 💡 Motivación de Arquitectura

El foco principal de esta refactorización fue **estabilizar la exportación de layouts modernos**. 

La exportación en canvas suele romperse con diseños flotantes (ej. Headers o Bottom Navigation con `position: fixed`). Nuestro mecanismo de exportación realiza una **pasada en vivo pre-render**, memorizando las coordenadas exactas de pantalla de la UI flotante usando `getBoundingClientRect()` y marcándolos con atributos (sin afectar el DOM vivo). Durante la fase invisible de clonación de visualización, este esquema de rastreo altera _el clon_ a `position: absolute` y lo redibuja píxel a píxel sobre el canvas, produciendo una salida final infalible.

## 🤝 Contribuciones

Si planeas contribuir, asegúrate de utilizar:
- Tipado TypeScript estricto.
- Componentes funcionales simples y mantenibles.
- Las guías de estilo globales (`npm run lint` requerido antes del commit).
