import React from 'react';

/* ========== TEMPLATE PLACEHOLDER COMPONENT ========== */

function TemplatePlaceholder({ path }) {
  return (
    <div className="usa-section">
      <div className="grid-container">
        <div className="usa-alert usa-alert--info">
          <div className="usa-alert__body">
            <h4 className="usa-alert__heading">React Template Coming Soon</h4>
            <p className="usa-alert__text">
              The React template for <strong>{path}</strong> will be created here.
              Use Claude Code to generate this template.
            </p>
          </div>
        </div>
        
        <div className="margin-top-4">
          <h2 className="usa-heading">How to create this template:</h2>
          <ol className="usa-list">
            <li>Navigate to: <code>templates/react/src/templates{path}/</code></li>
            <li>Create your React component</li>
            <li>Import it in <code>App.jsx</code></li>
            <li>Refresh this page to see your template</li>
          </ol>
        </div>
      </div>
    </div>
  );
}

export default TemplatePlaceholder;