#!/bin/bash

# Script to generate basic USWDS template structures
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
          <h4 class="usa-alert__heading">Template Under Development</h4>
          <p class="usa-alert__text">
            This ${title} template provides a basic USWDS structure. 
            Additional functionality and content will be added in future updates.
          </p>
        </div>
      </div>
      
      <div class="margin-top-4">
        <div class="grid-row grid-gap">
          <div class="tablet:grid-col-8">
            <div class="usa-card">
              <div class="usa-card__container">
                <div class="usa-card__header">
                  <h2 class="usa-card__heading">Key Features</h2>
                </div>
                <div class="usa-card__body">
                  <ul class="usa-list">
                    <li>Government banner and accessibility compliance</li>
                    <li>Responsive USWDS design components</li>
                    <li>Semantic HTML5 structure</li>
                    <li>Mobile-first responsive layout</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="tablet:grid-col-4">
            <div class="usa-card">
              <div class="usa-card__container">
                <div class="usa-card__header">
                  <h3 class="usa-card__heading">Quick Actions</h3>
                </div>
                <div class="usa-card__body">
                  <ul class="usa-list usa-list--unstyled">
                    <li class="margin-bottom-2">
                      <a href="#" class="usa-button usa-button--outline width-full">
                        Primary Action
                      </a>
                    </li>
                    <li class="margin-bottom-2">
                      <a href="#" class="usa-button usa-button--outline width-full">
                        Secondary Action
                      </a>
                    </li>
                    <li>
                      <a href="#" class="usa-button usa-button--outline width-full">
                        Learn More
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

# Create remaining dashboard templates
echo "Creating dashboard templates..."
create_basic_template "dashboards" "education-dashboard" "Education Dashboard" "Student courses, grades, financial aid, and academic records"
create_basic_template "dashboards" "immigration-status" "Immigration Status Dashboard" "Case status, documents, appointments, and timeline tracking"
create_basic_template "dashboards" "social-security" "Social Security Dashboard" "Benefits, earnings history, and retirement planning tools"
create_basic_template "dashboards" "business-owner" "Business Owner Dashboard" "Licenses, permits, tax filings, and compliance tracking"
create_basic_template "dashboards" "grant-management" "Grant Management Dashboard" "Applications, awards, reporting, and deadline tracking"
create_basic_template "dashboards" "contractor-dashboard" "Contractor Dashboard" "Contracts, invoices, certifications, and opportunities"

# Create more form templates
echo "Creating form templates..."
create_basic_template "forms" "passport-application" "Passport Application" "Multi-step passport application with document upload"
create_basic_template "forms" "drivers-license-renewal" "Driver's License Renewal" "License renewal with personal info and payment"
create_basic_template "forms" "business-license" "Business License Application" "Business registration and licensing application"
create_basic_template "forms" "building-permit" "Building Permit Application" "Construction permit with project details and plans"
create_basic_template "forms" "grant-application" "Grant Application Form" "Comprehensive grant application with budget planning"
create_basic_template "forms" "job-application" "Job Application Portal" "Government job application with resume upload"
create_basic_template "forms" "vendor-registration" "Vendor Registration Form" "Supplier registration with certifications"
create_basic_template "forms" "maintenance-request" "Maintenance Request Form" "Facility maintenance and service requests"

# Create search templates
echo "Creating search templates..."
create_basic_template "search" "advanced-search" "Advanced Search Portal" "Multi-filter search interface with facets"
create_basic_template "search" "document-search" "Document Search System" "Full-text document search with metadata filters"
create_basic_template "search" "people-finder" "People Finder Search" "Employee and contact directory search"
create_basic_template "search" "location-search" "Location Search Portal" "Geographic location finder with map integration"
create_basic_template "search" "search-results-grid" "Search Results Grid View" "Card-based search results with sorting"
create_basic_template "search" "search-results-list" "Search Results List View" "Detailed list view of search results"

# Create user management templates
echo "Creating user management templates..."
create_basic_template "user-management" "user-profile" "User Profile Page" "Personal information, preferences, and activity"
create_basic_template "user-management" "account-settings" "Account Settings Panel" "Privacy, notifications, and security settings"
create_basic_template "user-management" "role-management" "Role Management Interface" "User permissions and role assignments"
create_basic_template "user-management" "multi-factor-login" "Multi-Factor Login Page" "Secure authentication with MFA options"
create_basic_template "user-management" "password-reset" "Password Reset Wizard" "Step-by-step password recovery process"
create_basic_template "user-management" "employee-directory" "Employee Directory Grid" "Staff directory with photos and contact info"

# Create utility templates
echo "Creating utility templates..."
create_basic_template "utility" "system-status" "System Status Page" "Service uptime and incident reporting"
create_basic_template "utility" "404-error" "404 Error Page" "Page not found with helpful navigation"
create_basic_template "utility" "500-error" "500 Error Page" "Server error with support contact information"
create_basic_template "utility" "maintenance-mode" "Maintenance Mode Page" "Planned maintenance notification page"
create_basic_template "utility" "privacy-policy" "Privacy Policy Page" "Data privacy and protection policies"
create_basic_template "utility" "accessibility-statement" "Accessibility Statement" "WCAG compliance and accessibility features"

# Create data display templates
echo "Creating data display templates..."
create_basic_template "data-displays" "sortable-data-table" "Sortable Data Table" "Interactive table with sorting and filtering"
create_basic_template "data-displays" "interactive-charts" "Interactive Chart Dashboard" "Multiple chart types with drill-down capability"
create_basic_template "data-displays" "annual-report" "Annual Report Layout" "Comprehensive report with charts and narratives"
create_basic_template "data-displays" "real-time-grid" "Real-time Data Grid" "Live updating data with status indicators"

echo "Basic template generation complete!"