import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './templates/Home';
import TemplatePlaceholder from './components/TemplatePlaceholder';

/* ========== REACT USWDS APP ========== */

function App() {
  useEffect(() => {
    // Initialize USWDS components
    if (window.USWDS) {
      window.USWDS.init();
    }

    // Setup message listener for code copying
    const handleMessage = (e) => {
      if (e.data.action === 'getCode') {
        const root = document.getElementById('root');
        const code = root.innerHTML;
        e.source.postMessage({
          action: 'codeContent',
          code: code
        }, '*');
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboards/federal-analytics" element={<TemplatePlaceholder path="/dashboards/federal-analytics" />} />
      <Route path="/dashboards/citizen-portal" element={<TemplatePlaceholder path="/dashboards/citizen-portal" />} />
      <Route path="/dashboards/case-management" element={<TemplatePlaceholder path="/dashboards/case-management" />} />
      <Route path="/forms/benefits-application" element={<TemplatePlaceholder path="/forms/benefits-application" />} />
      <Route path="/landing/agency-home" element={<TemplatePlaceholder path="/landing/agency-home" />} />
      <Route path="/landing/program-overview" element={<TemplatePlaceholder path="/landing/program-overview" />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function NotFound() {
  return (
    <div className="usa-section">
      <div className="grid-container">
        <h1 className="usa-heading">404 - Template Not Found</h1>
        <p className="usa-intro">The requested template does not exist in React variant.</p>
      </div>
    </div>
  );
}

export default App;