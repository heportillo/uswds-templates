import React from 'react';
import { GridContainer, Alert } from '@trussworks/react-uswds';

/* ========== TEMPLATE PLACEHOLDER COMPONENT ========== */

interface TemplatePlaceholderProps {
  path: string;
}

function TemplatePlaceholder({ path }: TemplatePlaceholderProps) {
  return (
    <section className="usa-section">
      <GridContainer>
        <Alert type="info" heading="Trussworks Template Coming Soon">
          The Trussworks template for <strong>{path}</strong> will be created here.
          Use Claude Code to generate this template with TypeScript and Trussworks components.
        </Alert>
        
        <div className="margin-top-4">
          <h2 className="usa-heading">How to create this template:</h2>
          <ol className="usa-list">
            <li>Navigate to: <code>templates/trussworks/src/templates{path}/</code></li>
            <li>Create your TypeScript component using Trussworks components</li>
            <li>Import it in <code>App.tsx</code></li>
            <li>Refresh this page to see your template</li>
          </ol>
        </div>
      </GridContainer>
    </section>
  );
}

export default TemplatePlaceholder;