import React from 'react';

/* ========== REACT USWDS HOME ========== */

function Home() {
  return (
    <div className="usa-section">
      <div className="grid-container">
        <h1 className="usa-heading">React USWDS Templates</h1>
        <p className="usa-intro">
          Browse and preview React components built with the U.S. Web Design System.
        </p>
        
        <div className="usa-alert usa-alert--info margin-top-4">
          <div className="usa-alert__body">
            <h4 className="usa-alert__heading">Getting Started</h4>
            <p className="usa-alert__text">
              Select a template from the sidebar to preview it. Each template is built with React and USWDS components.
            </p>
          </div>
        </div>

        <div className="margin-top-6">
          <h2 className="usa-heading">Available Templates</h2>
          
          <div className="grid-row grid-gap-4 margin-top-4">
            <div className="tablet:grid-col-4">
              <div className="usa-card">
                <div className="usa-card__container">
                  <div className="usa-card__header">
                    <h3 className="usa-card__heading">Dashboards</h3>
                  </div>
                  <div className="usa-card__body">
                    <p>Interactive dashboards with state management.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="tablet:grid-col-4">
              <div className="usa-card">
                <div className="usa-card__container">
                  <div className="usa-card__header">
                    <h3 className="usa-card__heading">Forms</h3>
                  </div>
                  <div className="usa-card__body">
                    <p>Dynamic forms with validation and state handling.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="tablet:grid-col-4">
              <div className="usa-card">
                <div className="usa-card__container">
                  <div className="usa-card__header">
                    <h3 className="usa-card__heading">Landing Pages</h3>
                  </div>
                  <div className="usa-card__body">
                    <p>Component-based landing pages.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;