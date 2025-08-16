// Load USWDS JS from CDN as fallback
if (!window.USWDS) {
  const script = document.createElement('script');
  script.src = 'https://unpkg.com/@uswds/uswds@3.9.0/dist/js/uswds.min.js';
  script.onload = () => {
    if (window.USWDS) {
      window.USWDS.init();
    }
  };
  document.head.appendChild(script);
}