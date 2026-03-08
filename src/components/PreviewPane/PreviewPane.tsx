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
                var fixedRects = {};
                var markedEls = [];
                
                // Mapeo PRE-render: guardar boundingClient de todo elemento fixed
                for (var i = 0; i < allEls.length; i++) {
                  var el = allEls[i];
                  var cs = window.getComputedStyle(el);
                  if (cs.position === 'fixed') {
                    var id = 'h2c_fix_' + i;
                    el.setAttribute('data-h2c-id', id);
                    markedEls.push(el);
                    fixedRects[id] = el.getBoundingClientRect();
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
                    // Global fixes
                    var s = clonedDoc.createElement('style');
                    s.textContent = '* { box-sizing: border-box !important; }';
                    clonedDoc.head.appendChild(s);
                    
                    // Hacer body relativo asegura que "absolute" coordene a (0,0) del viewport simulado
                    clonedDoc.body.style.setProperty('position', 'relative', 'important');
                    
                    // Restaurar los elementos marked a "absolute" con sus medidas PRE-render exactas
                    var clonedFixed = clonedDoc.querySelectorAll('[data-h2c-id]');
                    for (var j = 0; j < clonedFixed.length; j++) {
                      var cEl = clonedFixed[j];
                      var rect = fixedRects[cEl.getAttribute('data-h2c-id')];
                      if (rect) {
                        cEl.style.setProperty('position', 'absolute', 'important');
                        cEl.style.setProperty('top', rect.top + 'px', 'important');
                        cEl.style.setProperty('left', rect.left + 'px', 'important');
                        cEl.style.setProperty('width', rect.width + 'px', 'important');
                        cEl.style.setProperty('height', rect.height + 'px', 'important');
                        cEl.style.setProperty('bottom', 'auto', 'important');
                        cEl.style.setProperty('right', 'auto', 'important');
                        cEl.style.setProperty('margin', '0', 'important');
                        cEl.style.setProperty('transform', 'none', 'important');
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
                window.parent.postMessage({ type: 'EXPORT_ERROR', error: err.toString() }, '*');
              }
            }, 1000); 
          });
        }
      });
    </script>
    <style>
      /* Normalize body to prevent unexpected scrolls or margins during export */
      html, body {
        width: ${width}px !important;
        height: ${height}px !important;
        margin: 0 !important;
        padding: 0 !important;
        overflow: hidden !important;
        box-sizing: border-box !important;
      }
      ::-webkit-scrollbar {
        display: none !important;
      }
    </style>
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
