import React from 'react';
import { 
  GridContainer, 
  Grid,
  Card, 
  CardHeader, 
  CardBody,
  Alert
} from '@trussworks/react-uswds';

/* ========== TRUSSWORKS HOME ========== */

function Home() {
  return (
    <section className="usa-section">
      <GridContainer>
        <h1 className="usa-heading">Trussworks React USWDS Templates</h1>
        <p className="usa-intro">
          Browse and preview templates built with Trussworks React USWDS components.
        </p>
        
        <Alert type="info" heading="Getting Started">
          Select a template from the sidebar to preview it. Each template uses Trussworks React USWDS components with TypeScript.
        </Alert>

        <div className="margin-top-6">
          <h2 className="usa-heading">Available Templates</h2>
          
          <Grid row gap className="margin-top-4">
            <Grid tablet={{ col: 4 }}>
              <Card>
                <CardHeader>
                  <h3 className="usa-card__heading">Dashboards</h3>
                </CardHeader>
                <CardBody>
                  <p>Type-safe dashboards with Trussworks components.</p>
                </CardBody>
              </Card>
            </Grid>
            
            <Grid tablet={{ col: 4 }}>
              <Card>
                <CardHeader>
                  <h3 className="usa-card__heading">Forms</h3>
                </CardHeader>
                <CardBody>
                  <p>Forms with built-in validation and TypeScript support.</p>
                </CardBody>
              </Card>
            </Grid>
            
            <Grid tablet={{ col: 4 }}>
              <Card>
                <CardHeader>
                  <h3 className="usa-card__heading">Landing Pages</h3>
                </CardHeader>
                <CardBody>
                  <p>Fully typed landing page components.</p>
                </CardBody>
              </Card>
            </Grid>
          </Grid>
        </div>
      </GridContainer>
    </section>
  );
}

export default Home;