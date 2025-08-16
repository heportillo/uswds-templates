import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { GridContainer } from '@trussworks/react-uswds';
import Home from './templates/Home';
import TemplatePlaceholder from './components/TemplatePlaceholder';

/* ========== TRUSSWORKS REACT USWDS APP ========== */

function App() {
  useEffect(() => {
    // Setup message listener for code copying
    const handleMessage = (e: MessageEvent) => {
      if (e.data.action === 'getCode') {
        const root = document.getElementById('root');
        const code = root?.innerHTML || '';
        e.source?.postMessage({
          action: 'codeContent',
          code: code
        }, '*' as any);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboards/federal-analytics" element={<TemplatePlaceholder path="/dashboards/federal-analytics" />} />
      <Route path="/dashboards/case-management" element={<TemplatePlaceholder path="/dashboards/case-management" />} />
      <Route path="/forms/benefits-application" element={<TemplatePlaceholder path="/forms/benefits-application" />} />
      <Route path="/landing/program-overview" element={<TemplatePlaceholder path="/landing/program-overview" />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function NotFound() {
  return (
    <section className="usa-section">
      <GridContainer>
        <h1 className="usa-heading">404 - Template Not Found</h1>
        <p className="usa-intro">The requested template does not exist in Trussworks variant.</p>
      </GridContainer>
    </section>
  );
}

export default App;