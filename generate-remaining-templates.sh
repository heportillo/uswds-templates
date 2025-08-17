#!/bin/bash

# Script to generate remaining USWDS template categories
BASE_PATH="/home/hectorwsl/repos/uswds-templates/templates/plain/templates"

# Function to create a basic template
create_basic_template() {
    local category=$1
    local name=$2
    local title=$3
    local description=$4
    local dir="${BASE_PATH}/${category}/${name}"
    
    mkdir -p "$dir"
    
    cat > "${dir}/index.html" << EOF
<!-- ========== ${title^^} ========== -->

<!-- ========== GOVERNMENT BANNER ========== -->
<section class="usa-banner" aria-label="Official website of the United States government">
  <div class="usa-accordion">
    <header class="usa-banner__header">
      <div class="usa-banner__inner">
        <div class="grid-col-auto">
          <img aria-hidden="true" class="usa-banner__header-flag" src="https://cdn.jsdelivr.net/npm/@uswds/uswds@3.9.0/dist/img/us_flag_small.png" alt="">
        </div>
        <div class="grid-col-fill tablet:grid-col-auto" aria-hidden="true">
          <p class="usa-banner__header-text">An official website of the United States government</p>
          <p class="usa-banner__header-action">Here's how you know</p>
        </div>
        <button type="button" class="usa-accordion__button usa-banner__button" aria-expanded="false" aria-controls="gov-banner-${name}">
          <span class="usa-banner__button-text">Here's how you know</span>
        </button>
      </div>
    </header>
    <div class="usa-banner__content usa-accordion__content" id="gov-banner-${name}" hidden>
      <div class="grid-row grid-gap-lg">
        <div class="usa-banner__guidance tablet:grid-col-6">
          <img class="usa-banner__icon usa-media-block__img" src="https://cdn.jsdelivr.net/npm/@uswds/uswds@3.9.0/dist/img/icon-dot-gov.svg" role="img" alt="" aria-hidden="true">
          <div class="usa-media-block__body">
            <p>
              <strong>Official websites use .gov</strong><br/>
              A <strong>.gov</strong> website belongs to an official government organization in the United States.
            </p>
          </div>
        </div>
        <div class="usa-banner__guidance tablet:grid-col-6">
          <img class="usa-banner__icon usa-media-block__img" src="https://cdn.jsdelivr.net/npm/@uswds/uswds@3.9.0/dist/img/icon-https.svg" role="img" alt="" aria-hidden="true">
          <div class="usa-media-block__body">
            <p>
              <strong>Secure .gov websites use HTTPS</strong><br/>
              A lock or <strong>https://</strong> means you've safely connected to the .gov website. Share sensitive information only on official, secure websites.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ========== HEADER SECTION ========== -->
<header class="usa-header usa-header--basic">
  <div class="usa-nav-container">
    <div class="usa-navbar">
      <div class="usa-logo">
        <em class="usa-logo__text">
          <a href="/" title="Home">${title}</a>
        </em>
      </div>
    </div>
  </div>
</header>

<!-- ========== MAIN CONTENT ========== -->
<main id="main-content">
  <section class="usa-section">
    <div class="grid-container">
      <h1 class="usa-heading">${title}</h1>
      <p class="usa-intro">${description}</p>
      
      <div class="usa-alert usa-alert--info">
        <div class="usa-alert__body">
          <h4 class="usa-alert__heading">Template Structure Ready</h4>
          <p class="usa-alert__text">
            This ${title} template provides USWDS-compliant structure and components. 
            Ready for customization with specific functionality.
          </p>
        </div>
      </div>
      
      <div class="margin-top-4">
        <div class="grid-row grid-gap">
          <div class="tablet:grid-col-8">
            <div class="usa-card">
              <div class="usa-card__container">
                <div class="usa-card__header">
                  <h2 class="usa-card__heading">Template Features</h2>
                </div>
                <div class="usa-card__body">
                  <ul class="usa-list">
                    <li>WCAG 2.1 AA accessibility compliance</li>
                    <li>Mobile-first responsive design</li>
                    <li>Semantic HTML5 structure</li>
                    <li>USWDS component integration</li>
                    <li>Government branding standards</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="tablet:grid-col-4">
            <div class="usa-card">
              <div class="usa-card__container">
                <div class="usa-card__header">
                  <h3 class="usa-card__heading">Available Actions</h3>
                </div>
                <div class="usa-card__body">
                  <ul class="usa-list usa-list--unstyled">
                    <li class="margin-bottom-2">
                      <a href="#" class="usa-button usa-button--outline width-full">
                        Get Started
                      </a>
                    </li>
                    <li class="margin-bottom-2">
                      <a href="#" class="usa-button usa-button--outline width-full">
                        View Documentation
                      </a>
                    </li>
                    <li>
                      <a href="#" class="usa-button usa-button--outline width-full">
                        Contact Support
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</main>

<!-- ========== FOOTER SECTION ========== -->
<footer class="usa-footer usa-footer--slim">
  <div class="usa-footer__primary-section">
    <div class="usa-footer__primary-container grid-container">
      <div class="usa-footer__primary-content">
        <address class="usa-footer__address">
          <div class="grid-row grid-gap">
            <div class="grid-col-auto">
              <div class="usa-footer__contact-info">
                Support: support@agency.gov | (800) 123-4567
              </div>
            </div>
          </div>
        </address>
      </div>
    </div>
  </div>
</footer>
EOF

    echo "Created: ${category}/${name}"
}

# Create workflow templates
echo "Creating workflow templates..."
create_basic_template "workflows" "immigration-wizard" "Immigration Application Wizard" "Multi-step immigration application with document collection and review"
create_basic_template "workflows" "business-registration" "Business Registration Wizard" "Complete business setup with structure, owners, licenses, and tax IDs"
create_basic_template "workflows" "benefits-enrollment" "Benefits Enrollment Wizard" "Healthcare benefits selection with eligibility, dependents, and confirmation"
create_basic_template "workflows" "permit-application" "Permit Application Wizard" "Building permit process with type selection, requirements, and payment"
create_basic_template "workflows" "contract-negotiation" "Contract Negotiation Portal" "Contract terms, redlines, versions, and digital signatures"
create_basic_template "workflows" "grant-review" "Grant Review System" "Application scoring, comments, rankings, and award recommendations"
create_basic_template "workflows" "procurement-evaluation" "Procurement Evaluation" "Bid analysis, criteria scoring, and award recommendations"
create_basic_template "workflows" "case-review" "Case Review Interface" "Document management, timeline tracking, notes, and decisions"
create_basic_template "workflows" "budget-planning" "Budget Planning Tool" "Line item planning, scenarios, projections, and approval workflow"
create_basic_template "workflows" "document-assembly" "Document Assembly System" "Template-based document generation with data merge and preview"

# Create mobile templates
echo "Creating mobile templates..."
create_basic_template "mobile" "mobile-dashboard" "Mobile Dashboard" "Touch-optimized dashboard with swipeable cards and bottom navigation"
create_basic_template "mobile" "mobile-form" "Mobile Form Wizard" "Step-by-step mobile form with native inputs and camera integration"
create_basic_template "mobile" "mobile-search" "Mobile Search Interface" "Voice search, filter drawer, and infinite scroll results"
create_basic_template "mobile" "mobile-directory" "Mobile Directory" "Contact cards with click-to-call and native sharing"
create_basic_template "mobile" "mobile-scanner" "Mobile Scanner App" "QR/barcode scanning, OCR, and document capture with upload"
create_basic_template "mobile" "mobile-notifications" "Mobile Notifications" "Push notification management and message center"
create_basic_template "mobile" "mobile-profile" "Mobile Profile" "User profile management optimized for mobile interaction"
create_basic_template "mobile" "mobile-checklist" "Mobile Checklist" "Task completion with offline sync and progress tracking"

# Create security templates
echo "Creating security templates..."
create_basic_template "security" "security-dashboard" "Security Dashboard" "Threat monitoring, patches, compliance status, and incident tracking"
create_basic_template "security" "privacy-center" "Privacy Settings Center" "Data collection controls, sharing preferences, and deletion options"
create_basic_template "security" "consent-management" "Consent Management Portal" "Service permissions, vendor consents, and preference history"
create_basic_template "security" "audit-log-viewer" "Audit Log Viewer" "Filtered activity logs with timeline, details, and export capabilities"
create_basic_template "security" "incident-response" "Incident Response Center" "Security incident status, timeline, and system impact tracking"
create_basic_template "security" "access-control" "Access Control Management" "User permissions, role assignments, and security clearances"
create_basic_template "security" "vulnerability-tracker" "Vulnerability Tracker" "Security vulnerability assessment and remediation tracking"
create_basic_template "security" "compliance-monitor" "Compliance Monitor" "Regulatory compliance status, requirements, and audit preparation"

# Create analytics templates
echo "Creating analytics templates..."
create_basic_template "analytics" "web-analytics" "Web Analytics Dashboard" "Traffic analysis, user behavior, sources, and conversion tracking"
create_basic_template "analytics" "ab-testing" "A/B Testing Platform" "Experiment setup, variant management, results analysis, and decisions"
create_basic_template "analytics" "user-feedback" "User Feedback Analytics" "Sentiment analysis, topic trends, and actionable insights"
create_basic_template "analytics" "performance-analytics" "Performance Analytics" "Load times, error tracking, user flows, and bottleneck identification"
create_basic_template "analytics" "business-intelligence" "Business Intelligence Portal" "Executive dashboards, reports, self-service analytics, and sharing"
create_basic_template "analytics" "data-visualization" "Data Visualization Studio" "Interactive chart builder with drill-down and export capabilities"
create_basic_template "analytics" "reporting-engine" "Reporting Engine" "Automated report generation, scheduling, and distribution"
create_basic_template "analytics" "metrics-tracker" "Metrics Tracker" "KPI monitoring, goal tracking, and performance measurement"

# Create additional landing pages
echo "Creating additional landing pages..."
create_basic_template "landing" "state-portal" "State Portal Homepage" "State government services organized by category with popular tasks"
create_basic_template "landing" "city-government" "City Government Homepage" "Municipal services, mayor's office, events, and local announcements"
create_basic_template "landing" "benefits-program" "Benefits Program Landing" "Program eligibility, application process, and calculator tools"
create_basic_template "landing" "healthcare-program" "Healthcare Program Page" "Coverage details, provider networks, and enrollment information"
create_basic_template "landing" "emergency-services" "Emergency Services Portal" "Emergency contacts, preparedness resources, and current alerts"
create_basic_template "landing" "veterans-portal" "Veterans Portal Landing" "Veteran-specific benefits, healthcare, education, and career resources"
create_basic_template "landing" "public-health" "Public Health Campaign" "Health initiative information, resources, and community action"
create_basic_template "landing" "small-business" "Small Business Portal" "Business resources, loans, training programs, and success stories"

# Create additional forms
echo "Creating additional form templates..."
create_basic_template "forms" "voter-registration" "Voter Registration Form" "Voter eligibility verification, address confirmation, and party affiliation"
create_basic_template "forms" "financial-aid" "Financial Aid Application" "Income verification, dependency status, and educational costs"
create_basic_template "forms" "complaint-submission" "Complaint Submission Form" "Issue reporting with evidence upload and desired outcomes"
create_basic_template "forms" "foia-request" "FOIA Request Form" "Freedom of Information Act request with justification and delivery preferences"
create_basic_template "forms" "clinical-trial" "Clinical Trial Enrollment" "Medical history, eligibility screening, and informed consent"
create_basic_template "forms" "environmental-assessment" "Environmental Impact Assessment" "Project scope, environmental impacts, and mitigation measures"

echo "Additional template generation complete!"
echo "Total templates created in this batch: 42"