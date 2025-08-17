#!/bin/bash

# Create simplified template function
create_quick_template() {
  local category=$1
  local name=$2
  local title=$3
  
  mkdir -p "templates/plain/templates/$category/$name"
  
  cat > "templates/plain/templates/$category/$name/index.html" << EOF
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>$title - U.S. Government</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@uswds/uswds@3.9.0/dist/css/uswds.min.css">
</head>
<body>
<section class="usa-banner" aria-label="Official website of the United States government">
  <div class="usa-accordion">
    <header class="usa-banner__header">
      <div class="usa-banner__inner">
        <div class="grid-col-auto">
          <img aria-hidden="true" class="usa-banner__header-flag" src="https://cdn.jsdelivr.net/npm/@uswds/uswds@3.9.0/dist/img/us_flag_small.png" alt="">
        </div>
        <div class="grid-col-fill tablet:grid-col-auto" aria-hidden="true">
          <p class="usa-banner__header-text">An official website of the United States government</p>
        </div>
      </div>
    </header>
  </div>
</section>
<a class="usa-skipnav" href="#main-content">Skip to main content</a>
<header class="usa-header usa-header--basic">
  <div class="usa-nav-container">
    <div class="usa-navbar">
      <div class="usa-logo">
        <em class="usa-logo__text"><a href="/">$title</a></em>
      </div>
    </div>
  </div>
</header>
<main id="main-content">
  <div class="grid-container">
    <h1>$title</h1>
    <p class="usa-intro">This is the $title page for official government services.</p>
    <div class="grid-row grid-gap margin-top-4">
      <div class="grid-col-12">
        <div class="usa-alert usa-alert--info">
          <div class="usa-alert__body">
            <p class="usa-alert__text">This template demonstrates USWDS components for $title functionality.</p>
          </div>
        </div>
      </div>
    </div>
    <div class="grid-row grid-gap margin-top-4">
      <div class="grid-col-6">
        <div class="usa-card">
          <div class="usa-card__container">
            <div class="usa-card__header">
              <h2 class="usa-card__heading">Quick Actions</h2>
            </div>
            <div class="usa-card__body">
              <p>Access frequently used features and services.</p>
            </div>
            <div class="usa-card__footer">
              <a href="#" class="usa-button">Get Started</a>
            </div>
          </div>
        </div>
      </div>
      <div class="grid-col-6">
        <div class="usa-card">
          <div class="usa-card__container">
            <div class="usa-card__header">
              <h2 class="usa-card__heading">Resources</h2>
            </div>
            <div class="usa-card__body">
              <p>Find helpful guides and documentation.</p>
            </div>
            <div class="usa-card__footer">
              <a href="#" class="usa-button usa-button--outline">Learn More</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</main>
<footer class="usa-footer usa-footer--slim">
  <div class="grid-container usa-footer__return-to-top">
    <a href="#">Return to top</a>
  </div>
</footer>
<script src="https://cdn.jsdelivr.net/npm/@uswds/uswds@3.9.0/dist/js/uswds.min.js"></script>
</body>
</html>
EOF
  
  echo "Created: $category/$name"
}

# Create Registration Forms (70-80)
create_quick_template "forms" "voter-registration" "Voter Registration Form"
create_quick_template "forms" "event-registration" "Event Registration Portal"
create_quick_template "forms" "training-enrollment" "Training Enrollment Form"
create_quick_template "forms" "volunteer-registration" "Volunteer Registration"
create_quick_template "forms" "clinical-services" "Clinical Services Enrollment"
create_quick_template "forms" "school-enrollment" "School Enrollment Form"
create_quick_template "forms" "program-participation" "Program Participation Form"
create_quick_template "forms" "membership-application" "Membership Application"
create_quick_template "forms" "newsletter-subscription" "Newsletter Subscription"
create_quick_template "forms" "research-participant" "Research Participant Registration"

# Create Compliance Forms (81-90)
create_quick_template "forms" "disclosure-statement" "Disclosure Statement Form"
create_quick_template "forms" "certification-renewal" "Certification Renewal Form"
create_quick_template "forms" "audit-response" "Audit Response Form"
create_quick_template "forms" "incident-report" "Incident Report Form"
create_quick_template "forms" "safety-inspection" "Safety Inspection Checklist"
create_quick_template "forms" "environmental-assessment" "Environmental Impact Assessment"
create_quick_template "forms" "privacy-assessment" "Privacy Impact Assessment"
create_quick_template "forms" "risk-assessment" "Risk Assessment Form"
create_quick_template "forms" "change-request" "Change Request Form"
create_quick_template "forms" "exception-request" "Exception Request Form"

# Create Campaign Pages (101-105)
create_quick_template "landing" "public-health-campaign" "Public Health Campaign"
create_quick_template "landing" "environmental-initiative" "Environmental Initiative"
create_quick_template "landing" "safety-awareness" "Safety Awareness Campaign"
create_quick_template "landing" "recruitment-campaign" "Recruitment Campaign"
create_quick_template "landing" "census-campaign" "Census Campaign Landing"

# Create Service Landing Pages (106-110)
create_quick_template "landing" "emergency-services" "Emergency Services Portal"
create_quick_template "landing" "legal-aid" "Legal Aid Landing Page"
create_quick_template "landing" "transportation-services" "Transportation Services"
create_quick_template "landing" "parks-recreation" "Parks & Recreation Portal"
create_quick_template "landing" "library-services" "Library Services Landing"

# Create Information Hubs (111-115)
create_quick_template "landing" "covid-info" "COVID-19 Information Hub"
create_quick_template "landing" "disaster-response" "Disaster Response Center"
create_quick_template "landing" "economic-recovery" "Economic Recovery Portal"
create_quick_template "landing" "climate-action" "Climate Action Hub"
create_quick_template "landing" "digital-services" "Digital Services Portal"

# Create Special Audience Pages (116-120)
create_quick_template "landing" "veterans-portal" "Veterans Portal Landing"
create_quick_template "landing" "senior-services" "Senior Services Homepage"
create_quick_template "landing" "youth-programs" "Youth Programs Portal"
create_quick_template "landing" "new-residents" "New Residents Guide"
create_quick_template "landing" "tourist-info" "Tourist Information Portal"

# Create Discovery Tools (141-145)
create_quick_template "search" "resource-discovery" "Resource Discovery Portal"
create_quick_template "search" "research-repository" "Research Repository Search"
create_quick_template "search" "archive-search" "Archive Search Interface"
create_quick_template "search" "media-library" "Media Library Search"
create_quick_template "search" "api-catalog" "API Catalog Browser"

# Create Account Management (146-150)
create_quick_template "user-management" "user-profile" "User Profile Page"
create_quick_template "user-management" "account-settings" "Account Settings Panel"
create_quick_template "user-management" "role-management" "Role Management Interface"
create_quick_template "user-management" "team-management" "Team Management Console"
create_quick_template "user-management" "access-request" "Access Request Portal"

# Create Authentication Pages (151-155)
create_quick_template "user-management" "multi-factor-login" "Multi-Factor Login Page"
create_quick_template "user-management" "sso-portal" "Single Sign-On Portal"
create_quick_template "user-management" "password-reset" "Password Reset Wizard"
create_quick_template "user-management" "account-recovery" "Account Recovery Page"
create_quick_template "user-management" "session-management" "Session Management Page"

# Create User Directories (156-160)
create_quick_template "user-management" "employee-directory" "Employee Directory Grid"
create_quick_template "user-management" "contractor-directory" "Contractor Directory List"
create_quick_template "user-management" "expert-network" "Expert Network Browser"
create_quick_template "user-management" "community-directory" "Community Member Directory"
create_quick_template "user-management" "stakeholder-registry" "Stakeholder Registry"

# Create Tables & Grids (166-170)
create_quick_template "data-displays" "sortable-table" "Sortable Data Table"
create_quick_template "data-displays" "expandable-table" "Expandable Row Table"
create_quick_template "data-displays" "pivot-table" "Pivot Table Interface"
create_quick_template "data-displays" "comparison-table" "Comparison Table"
create_quick_template "data-displays" "realtime-grid" "Real-time Data Grid"

# Create Visualizations (171-175)
create_quick_template "data-displays" "chart-dashboard" "Interactive Chart Dashboard"
create_quick_template "data-displays" "geographic-map" "Geographic Data Map"
create_quick_template "data-displays" "timeline-view" "Timeline Visualization"
create_quick_template "data-displays" "network-diagram" "Network Diagram Viewer"
create_quick_template "data-displays" "tree-view" "Hierarchical Tree View"

# Create Reports (176-180)
create_quick_template "data-displays" "annual-report" "Annual Report Layout"
create_quick_template "data-displays" "financial-statement" "Financial Statement View"
create_quick_template "data-displays" "compliance-report" "Compliance Report Template"
create_quick_template "data-displays" "performance-report" "Performance Report Card"
create_quick_template "data-displays" "executive-summary" "Executive Summary Dashboard"

# Create Data Entry (181-185)
create_quick_template "data-displays" "batch-entry" "Batch Data Entry Form"
create_quick_template "data-displays" "survey-collection" "Survey Data Collection"
create_quick_template "data-displays" "time-entry" "Time Entry Interface"
create_quick_template "data-displays" "inspection-checklist" "Inspection Checklist App"
create_quick_template "data-displays" "inventory-count" "Inventory Count Interface"

# Create Data Management (186-190)
create_quick_template "data-displays" "data-import" "Data Import Wizard"
create_quick_template "data-displays" "data-export" "Data Export Center"
create_quick_template "data-displays" "data-quality" "Data Quality Dashboard"
create_quick_template "data-displays" "master-data" "Master Data Management"
create_quick_template "data-displays" "data-lineage" "Data Lineage Viewer"

# Create System Pages (191-195)
create_quick_template "utility" "system-status" "System Status Page"
create_quick_template "utility" "release-notes" "Release Notes Page"
create_quick_template "utility" "api-docs" "API Documentation Portal"
create_quick_template "utility" "help-center" "Help Center Homepage"
create_quick_template "utility" "sitemap" "Sitemap Page"

# Create Error & Feedback (196-200)
create_quick_template "utility" "404-error" "404 Error Page"
create_quick_template "utility" "500-error" "500 Error Page"
create_quick_template "utility" "maintenance-mode" "Maintenance Mode Page"
create_quick_template "utility" "feedback-portal" "Feedback Portal"
create_quick_template "utility" "bug-report" "Bug Report Form"

# Create Legal & Compliance (201-205)
create_quick_template "utility" "privacy-policy" "Privacy Policy Page"
create_quick_template "utility" "terms-service" "Terms of Service Page"
create_quick_template "utility" "accessibility" "Accessibility Statement"
create_quick_template "utility" "cookie-consent" "Cookie Consent Manager"
create_quick_template "utility" "foia-reading" "FOIA Reading Room"

# Create Multi-Step Wizards (206-210)
create_quick_template "workflows" "immigration-wizard" "Immigration Application Wizard"
create_quick_template "workflows" "tax-filing-wizard" "Tax Filing Wizard"
create_quick_template "workflows" "permit-wizard" "Permit Application Wizard"
create_quick_template "workflows" "benefits-enrollment" "Benefits Enrollment Wizard"
create_quick_template "workflows" "business-registration" "Business Registration Wizard"

# Create Complex Interactions (211-215)
create_quick_template "workflows" "case-review" "Case Review Interface"
create_quick_template "workflows" "contract-negotiation" "Contract Negotiation Portal"
create_quick_template "workflows" "grant-review" "Grant Review System"
create_quick_template "workflows" "procurement-evaluation" "Procurement Evaluation"
create_quick_template "workflows" "investigation-management" "Investigation Management"

# Create Specialized Tools (216-220)
create_quick_template "workflows" "budget-planning" "Budget Planning Tool"
create_quick_template "workflows" "scheduling-coordinator" "Scheduling Coordinator"
create_quick_template "workflows" "document-assembly" "Document Assembly System"
create_quick_template "workflows" "workflow-designer" "Workflow Designer"
create_quick_template "workflows" "report-builder" "Report Builder Interface"

echo "Final batch templates created successfully!"