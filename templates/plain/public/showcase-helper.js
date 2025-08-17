// Helper script for showcase functionality
(function() {
  // Listen for messages from the showcase iframe
  window.addEventListener('message', (e) => {
    if (e.data && e.data.action === 'getCode') {
      // Get the entire HTML content
      const html = document.documentElement.outerHTML;
      
      // Send it back to the parent window
      e.source.postMessage({
        action: 'codeContent',
        code: html
      }, e.origin);
    }
  });
})();