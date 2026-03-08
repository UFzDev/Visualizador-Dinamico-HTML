export const DEFAULT_HTML = `
<!-- Diseño Premium Mobile-First con Glassmorphism -->
<div class="mobile-app">
  <header>
    <h1>Visualizador HTML</h1>
    <div class="avatar">✨</div>
  </header>
  
  <div class="balance-card glass">
    <p class="label">Poder de Renderizado</p>
    <h2 class="amount">100% Nativo</h2>
    <div class="trend">Exporta Pixel-Perfect</div>
  </div>

  <section class="actions">
    <button class="action-btn"><span class="icon">💻</span>Escribe Código</button>
    <button class="action-btn"><span class="icon">🪄</span>Mira la Web</button>
    <button class="action-btn"><span class="icon">📸</span>Toma un PNG</button>
  </section>

  <section class="transactions">
    <h3>Características</h3>
    <div class="trx-item">
      <div class="trx-icon netflix">🚀</div>
      <div class="trx-info">
        <h4>Renderizado en vivo</h4>
        <p>Los cambios se reflejan al instante</p>
      </div>
    </div>
    <div class="trx-item">
      <div class="trx-icon work">📸</div>
      <div class="trx-info">
        <h4>Exportación html2canvas</h4>
        <p>Soporte full para SVG, Webfonts y Absolutos</p>
      </div>
    </div>
  </section>
</div>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700&display=swap');

  body {
    margin: 0;
    font-family: 'Outfit', sans-serif;
    background: #0f172a radial-gradient(circle at top right, #3b82f6 0%, transparent 40%);
    color: #f8fafc;
    min-height: 100vh;
  }
  
  .mobile-app {
    padding: 24px;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  header h1 { margin: 0; font-size: 1.5rem; font-weight: 600; }
  .avatar {
    width: 40px; height: 40px;
    border-radius: 50%;
    background: linear-gradient(45deg, #ec4899, #8b5cf6);
    display: flex; align-items: center; justify-content: center; font-size: 1.2rem;
  }

  .glass {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 20px;
  }

  .balance-card {
    padding: 24px;
    position: relative;
    overflow: hidden;
  }
  .balance-card::before {
    content: ''; position: absolute; top: -50px; right: -50px;
    width: 150px; height: 150px;
    background: #8b5cf6; filter: blur(60px); opacity: 0.5; z-index: -1;
  }
  .label { margin: 0 0 8px 0; color: #94a3b8; font-size: 0.9rem; }
  .amount { margin: 0 0 12px 0; font-size: 2rem; font-weight: 700; }
  .trend {
    display: inline-block;
    background: rgba(16, 185, 129, 0.2);
    color: #10b981;
    padding: 4px 10px;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 600;
  }

  .actions { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
  .action-btn {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: white; border-radius: 16px; padding: 16px 8px;
    display: flex; flex-direction: column; align-items: center; gap: 8px;
    font-family: inherit; font-size: 0.85rem; cursor: pointer; transition: 0.2s;
  }
  .action-btn:hover { background: rgba(255, 255, 255, 0.1); }
  .icon {
    display: flex; align-items: center; justify-content: center;
    width: 32px; height: 32px; border-radius: 50%;
    background: #1e293b; font-size: 1rem;
  }

  .transactions h3 { font-size: 1.1rem; color: #cbd5e1; margin-bottom: 16px; }
  .trx-item {
    display: flex; align-items: center; gap: 16px; margin-bottom: 16px;
    padding: 12px; border-radius: 12px;
    background: rgba(255,255,255,0.02);
  }
  .trx-icon {
    width: 44px; height: 44px; border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    font-size: 1.5rem;
  }
  .netflix { background: #e5091422; color: #e50914; }
  .work { background: #10b98122; color: #10b981; }
  .trx-info { flex: 1; }
  .trx-info h4 { margin: 0 0 4px 0; font-size: 1rem; }
  .trx-info p { margin: 0; font-size: 0.8rem; color: #94a3b8; }
</style>
`;
