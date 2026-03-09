export const DEFAULT_HTML = `
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Visualizador HTML - Bienvenido</title>
<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    line-height: 1.6;
    color: #333;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    padding: 20px;
  }
  
  .container {
    max-width: 600px;
    margin: 0 auto;
    background: white;
    border-radius: 16px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    overflow: hidden;
  }
  
  header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 40px 30px;
    text-align: center;
  }
  
  header h1 {
    font-size: 2em;
    margin-bottom: 10px;
    font-weight: 700;
  }
  
  header p {
    opacity: 0.95;
    font-size: 0.95em;
  }
  
  .content {
    padding: 40px 30px;
  }
  
  .section {
    margin-bottom: 35px;
  }
  
  .section h2 {
    color: #667eea;
    font-size: 1.3em;
    margin-bottom: 15px;
    padding-bottom: 10px;
    border-bottom: 2px solid #667eea;
    display: inline-block;
  }
  
  .section p {
    color: #555;
    margin-bottom: 10px;
    line-height: 1.8;
  }
  
  .feature-list {
    list-style: none;
    margin-top: 15px;
  }
  
  .feature-list li {
    padding: 12px 0;
    padding-left: 30px;
    position: relative;
    color: #555;
  }
  
  .feature-list li:before {
    content: "✓";
    position: absolute;
    left: 0;
    color: #667eea;
    font-weight: bold;
    font-size: 1.2em;
  }
  
  .example-code {
    background: #f5f5f5;
    border-left: 4px solid #667eea;
    padding: 15px;
    margin: 15px 0;
    border-radius: 6px;
    font-family: 'Courier New', monospace;
    font-size: 0.9em;
    overflow-x: auto;
  }
  
  .tip-box {
    background: #fffacd;
    border-left: 4px solid #ffc107;
    padding: 15px;
    margin: 15px 0;
    border-radius: 6px;
    font-size: 0.95em;
    color: #666;
  }
  
  .tip-box strong {
    color: #ff9800;
  }
  
  footer {
    background: #f8f9fa;
    padding: 30px;
    text-align: center;
    border-top: 1px solid #e0e0e0;
    color: #666;
    font-size: 0.9em;
  }
  
  footer a {
    color: #667eea;
    text-decoration: none;
    font-weight: 500;
  }
  
  @media (max-width: 480px) {
    header {
      padding: 30px 20px;
    }
    
    header h1 {
      font-size: 1.6em;
    }
    
    .content {
      padding: 30px 20px;
    }
    
    .section h2 {
      font-size: 1.1em;
    }
  }
</style>
</head>
<body>
  <div class="container">
    <header>
      <h1>🎨 Visualizador HTML</h1>
      <p>Crea, edita y exporta interfaces web en tiempo real</p>
    </header>
    
    <div class="content">
      <div class="section">
        <h2>👋 ¡Bienvenido!</h2>
        <p>Esta es una herramienta profesional para visualizar y exportar código HTML y CSS. En el panel izquierdo puedes escribir tu código, y verás una vista previa en tiempo real.</p>
      </div>
      
      <div class="section">
        <h2>🚀 Cómo Comenzar</h2>
        <ul class="feature-list">
          <li>Escribe tu HTML o CSS en el editor izquierdo</li>
          <li>Observa los cambios en tiempo real a la derecha</li>
          <li>Selecciona una resolución preestablecida en la barra superior</li>
          <li>Exporta tu diseño como PNG de alta calidad</li>
        </ul>
      </div>
      
      <div class="section">
        <h2>💡 Ejemplo Básico</h2>
        <p>Prueba con este código:</p>
        <div class="example-code">&lt;div style="text-align: center; padding: 40px;"&gt;
  &lt;h1 style="color: #667eea; font-size: 2em;"&gt;
    ¡Hola Mundo!
  &lt;/h1&gt;
  &lt;p style="color: #666; font-size: 1.1em;"&gt;
    Edita el código para crear tu propio contenido
  &lt;/p&gt;
&lt;/div&gt;</div>
      </div>
      
      <div class="section">
        <h2>📱 Resoluciones</h2>
        <p>La barra de herramientas incluye resoluciones preestablecidas para diferentes dispositivos:</p>
        <ul class="feature-list">
          <li>iPhone 12 (390×844)</li>
          <li>iPad 10 (820×1180)</li>
          <li>Desktop HD (1280×720)</li>
          <li>Custom - Define tus propias dimensiones</li>
        </ul>
      </div>
      
      <div class="section">
        <h2>🖼️ Exportar como PNG</h2>
        <p>Una vez que tengas tu diseño listo:</p>
        <ol style="list-style-position: inside; color: #555;">
          <li style="margin-bottom: 8px;">Selecciona la resolución deseada</li>
          <li style="margin-bottom: 8px;">Haz clic en el botón "Exportar"</li>
          <li>Se descargará una imagen PNG de tu diseño</li>
        </ol>
      </div>
      
      <div class="tip-box">
        <strong>💡 Tip:</strong> Puedes incluir CSS inline en tu HTML para estilar los elementos sin necesidad de etiquetas <code>&lt;style&gt;</code>.
      </div>
      
      <div class="section">
        <h2>✨ Características</h2>
        <ul class="feature-list">
          <li>Editor de código con sintaxis highlighting</li>
          <li>Vista previa en vivo e instantánea</li>
          <li>Soporte para múltiples resoluciones</li>
          <li>Exportación a PNG de alta calidad</li>
          <li>Interfaz responsiva y moderna</li>
          <li>Sin depender de internet para procesar</li>
        </ul>
      </div>
      
      <div class="section">
        <h2>🔒 Seguridad</h2>
        <p>Tu código se ejecuta en un sandbox seguro. No se envía a servidores externos sin tu consentimiento, excepto al exportar como PNG.</p>
      </div>
    </div>
    
    <footer>
      <p>Visualizador HTML Dinámico • Diseñado para crear y prototipar interfaces rápidamente</p>
      <p style="margin-top: 10px;">Haz clic en "Nuevo" en la barra de herramientas para comenzar con este template nuevamente</p>
    </footer>
  </div>
</body></html>
`;
