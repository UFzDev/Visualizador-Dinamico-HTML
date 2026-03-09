import { forwardRef } from 'react';
import './PreviewPane.css';

interface PreviewPaneProps {
  htmlContent: string;
  width: number;
  height: number;
}

export const PreviewPane = forwardRef<HTMLIFrameElement, PreviewPaneProps>(
  ({ htmlContent, width, height }, ref) => {

    // Construimos el HTML seguro anexando la librería html2canvas
    // y el listener de exportación directamente al contenido del usuario.
    const injectedLogic = `
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
    <script>
      function waitForResources() {
        var promises = [];
        if (document.fonts && document.fonts.ready) promises.push(document.fonts.ready);
        var images = document.getElementsByTagName('img');
        for (var i = 0; i < images.length; i++) {
          if (!images[i].complete) {
            promises.push(new Promise(function(resolve) {
              images[i].onload = resolve;
              images[i].onerror = resolve;
            }));
          }
        }
        var timeoutPromise = new Promise(function(resolve) { setTimeout(resolve, 1500); });
        return Promise.race([Promise.all(promises), timeoutPromise]);
      }

      window.addEventListener('message', function(event) {
        if (event.data && event.data.type === 'EXPORT') {
          var format = event.data.format;
          var width = event.data.width;
          var height = event.data.height;
          var scale = window.devicePixelRatio || 2;
          
          window.scrollTo(0, 0);
          
          waitForResources().then(function() {
            setTimeout(function() {
              window.scrollTo(0, 0); // Re-afirmar 0,0 por si acaso
              try {
                if (typeof html2canvas === 'undefined') throw new Error('html2canvas no se cargó.');
                
                var allEls = document.querySelectorAll('*');
                var fixedData = {};
                var markedEls = [];
                
                // Mapeo PRE-render: guardar estilos computados de todo elemento fixed
                for (var i = 0; i < allEls.length; i++) {
                  var el = allEls[i];
                  var cs = window.getComputedStyle(el);
                  if (cs.position === 'fixed') {
                    var id = 'h2c_fix_' + i;
                    el.setAttribute('data-h2c-id', id);
                    markedEls.push(el);
                    
                    // Guardar TODAS las propiedades de posicionamiento para replicar
                    fixedData[id] = {
                      top: cs.top,
                      bottom: cs.bottom,
                      left: cs.left,
                      right: cs.right,
                      width: cs.width,
                      height: cs.height,
                      zIndex: cs.zIndex,
                      display: cs.display
                    };
                  }
                }
                
                html2canvas(document.body, {
                  scale: scale,
                  useCORS: true,
                  allowTaint: true,
                  width: width,
                  height: height,
                  windowWidth: width,
                  windowHeight: height,
                  scrollX: 0,
                  scrollY: 0,
                  backgroundColor: null,
                  onclone: function(clonedDoc) {
                    // Forzar dimensiones del viewport en el clon para que bottom/right funcionen
                    clonedDoc.documentElement.style.setProperty('width', width + 'px', 'important');
                    clonedDoc.documentElement.style.setProperty('height', height + 'px', 'important');
                    clonedDoc.body.style.setProperty('width', width + 'px', 'important');
                    clonedDoc.body.style.setProperty('height', height + 'px', 'important');
                    clonedDoc.body.style.setProperty('margin', '0', 'important');
                    clonedDoc.body.style.setProperty('padding', '0', 'important');
                    clonedDoc.body.style.setProperty('position', 'relative', 'important');
                    clonedDoc.body.style.setProperty('overflow', 'hidden', 'important');

                    var clonedFixed = clonedDoc.querySelectorAll('[data-h2c-id]');
                    for (var j = 0; j < clonedFixed.length; j++) {
                      var cEl = clonedFixed[j];
                      var data = fixedData[cEl.getAttribute('data-h2c-id')];
                      if (data) {
                        cEl.style.setProperty('position', 'absolute', 'important');
                        
                        // Aplicar propiedades originales. html2canvas respetará el anclaje 
                        // si el body del clon tiene el tamaño correcto.
                        cEl.style.setProperty('top', data.top, 'important');
                        cEl.style.setProperty('bottom', data.bottom, 'important');
                        cEl.style.setProperty('left', data.left, 'important');
                        cEl.style.setProperty('right', data.right, 'important');
                        cEl.style.setProperty('width', data.width, 'important');
                        cEl.style.setProperty('height', data.height, 'important');
                        cEl.style.setProperty('z-index', data.zIndex, 'important');
                        cEl.style.setProperty('margin', '0', 'important');
                        cEl.style.setProperty('transform', 'none', 'important');
                        
                        // Mover al body principal para escapar de cualquier stacking context roto
                        if (cEl.parentNode !== clonedDoc.body) {
                          clonedDoc.body.appendChild(cEl);
                        }
                      }
                    }
                  }
                }).then(function(canvas) {
                  cleanup();
                  var dataUrl = format === 'jpg' ? canvas.toDataURL('image/jpeg', 1.0) : canvas.toDataURL('image/png');
                  window.parent.postMessage({ type: 'EXPORT_RESULT', dataUrl: dataUrl, pixelRatio: scale }, '*');
                }).catch(function(error) {
                  cleanup();
                  window.parent.postMessage({ type: 'EXPORT_ERROR', error: error.toString() }, '*');
                });
                
                function cleanup() {
                  for (var k = 0; k < markedEls.length; k++) {
                    markedEls[k].removeAttribute('data-h2c-id');
                  }
                }
              } catch (err) {
                window.parent.postMessage({ type: 'EXPORT_ERROR', error: err.toString() }, '*');
              }
            }, 1000); 
          });
        }
      });
    </script>
  `;

    const srcDoc = htmlContent + injectedLogic;

    return (
      <div className="preview-panel">
        <div
          className="preview-container"
          style={{ width: `${width}px`, height: `${height}px` }}
        >
          <iframe
            ref={ref}
            title="Preview HTML"
            srcDoc={srcDoc}
            className="preview-iframe"
            sandbox="allow-scripts allow-same-origin"
          />
        </div>
      </div>
    );
  }
);
