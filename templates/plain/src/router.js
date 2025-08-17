/* ========== PLAIN USWDS ROUTER ========== */
// USWDS CSS and JS are loaded in index.html

class Router {
  constructor() {
    this.routes = {
      '/': '/templates/home.html',
      
      // Dashboard Templates
      '/dashboards/federal-analytics': '/templates/dashboards/federal-analytics/index.html',
      '/dashboards/citizen-portal': '/templates/dashboards/citizen-portal/index.html',
      '/dashboards/case-management': '/templates/dashboards/case-management/index.html',
      '/dashboards/app-management': '/templates/dashboards/app-management/index.html',
      '/dashboards/compliance-monitoring': '/templates/dashboards/compliance-monitoring/index.html',
      '/dashboards/content-management': '/templates/dashboards/content-management/index.html',
      '/dashboards/fleet-management': '/templates/dashboards/fleet-management/index.html',
      '/dashboards/inventory-management': '/templates/dashboards/inventory-management/index.html',
      '/dashboards/performance-metrics': '/templates/dashboards/performance-metrics/index.html',
      '/dashboards/resource-allocation': '/templates/dashboards/resource-allocation/index.html',
      '/dashboards/security-operations': '/templates/dashboards/security-operations/index.html',
      '/dashboards/system-admin': '/templates/dashboards/system-admin/index.html',
      '/dashboards/user-management': '/templates/dashboards/user-management/index.html',
      '/dashboards/benefits-overview': '/templates/dashboards/benefits-overview/index.html',
      '/dashboards/tax-dashboard': '/templates/dashboards/tax-dashboard/index.html',
      '/dashboards/healthcare-portal': '/templates/dashboards/healthcare-portal/index.html',
      '/dashboards/veterans-affairs': '/templates/dashboards/veterans-affairs/index.html',
      '/dashboards/emergency-response': '/templates/dashboards/emergency-response/index.html',
      '/dashboards/education-dashboard': '/templates/dashboards/education-dashboard/index.html',
      '/dashboards/immigration-status': '/templates/dashboards/immigration-status/index.html',
      '/dashboards/social-security': '/templates/dashboards/social-security/index.html',
      '/dashboards/business-owner': '/templates/dashboards/business-owner/index.html',
      '/dashboards/grant-management': '/templates/dashboards/grant-management/index.html',
      '/dashboards/contractor-dashboard': '/templates/dashboards/contractor-dashboard/index.html',
      
      // Form Templates
      '/forms/benefits-application': '/templates/forms/benefits-application/index.html',
      '/forms/permit-request': '/templates/forms/permit-request/index.html',
      '/forms/tax-filing-wizard': '/templates/forms/tax-filing-wizard/index.html',
      '/forms/service-request': '/templates/forms/service-request/index.html',
      '/forms/passport-application': '/templates/forms/passport-application/index.html',
      '/forms/drivers-license-renewal': '/templates/forms/drivers-license-renewal/index.html',
      '/forms/business-license': '/templates/forms/business-license/index.html',
      '/forms/building-permit': '/templates/forms/building-permit/index.html',
      '/forms/grant-application': '/templates/forms/grant-application/index.html',
      '/forms/job-application': '/templates/forms/job-application/index.html',
      '/forms/vendor-registration': '/templates/forms/vendor-registration/index.html',
      '/forms/maintenance-request': '/templates/forms/maintenance-request/index.html',
      '/forms/voter-registration': '/templates/forms/voter-registration/index.html',
      '/forms/financial-aid': '/templates/forms/financial-aid/index.html',
      '/forms/complaint-submission': '/templates/forms/complaint-submission/index.html',
      '/forms/foia-request': '/templates/forms/foia-request/index.html',
      '/forms/clinical-trial': '/templates/forms/clinical-trial/index.html',
      '/forms/environmental-assessment': '/templates/forms/environmental-assessment/index.html',
      
      // Search Templates
      '/search/advanced-search': '/templates/search/advanced-search/index.html',
      '/search/document-search': '/templates/search/document-search/index.html',
      '/search/people-finder': '/templates/search/people-finder/index.html',
      '/search/location-search': '/templates/search/location-search/index.html',
      '/search/search-results-grid': '/templates/search/search-results-grid/index.html',
      '/search/search-results-list': '/templates/search/search-results-list/index.html',
      
      // User Management Templates
      '/user-management/user-profile': '/templates/user-management/user-profile/index.html',
      '/user-management/account-settings': '/templates/user-management/account-settings/index.html',
      '/user-management/role-management': '/templates/user-management/role-management/index.html',
      '/user-management/multi-factor-login': '/templates/user-management/multi-factor-login/index.html',
      '/user-management/password-reset': '/templates/user-management/password-reset/index.html',
      '/user-management/employee-directory': '/templates/user-management/employee-directory/index.html',
      
      // Data Display Templates
      '/data-displays/sortable-data-table': '/templates/data-displays/sortable-data-table/index.html',
      '/data-displays/interactive-charts': '/templates/data-displays/interactive-charts/index.html',
      '/data-displays/annual-report': '/templates/data-displays/annual-report/index.html',
      '/data-displays/real-time-grid': '/templates/data-displays/real-time-grid/index.html',
      
      // Utility Templates
      '/utility/system-status': '/templates/utility/system-status/index.html',
      '/utility/404-error': '/templates/utility/404-error/index.html',
      '/utility/500-error': '/templates/utility/500-error/index.html',
      '/utility/maintenance-mode': '/templates/utility/maintenance-mode/index.html',
      '/utility/privacy-policy': '/templates/utility/privacy-policy/index.html',
      '/utility/accessibility-statement': '/templates/utility/accessibility-statement/index.html',
      
      // Workflow Templates
      '/workflows/immigration-wizard': '/templates/workflows/immigration-wizard/index.html',
      '/workflows/business-registration': '/templates/workflows/business-registration/index.html',
      '/workflows/benefits-enrollment': '/templates/workflows/benefits-enrollment/index.html',
      '/workflows/permit-application': '/templates/workflows/permit-application/index.html',
      '/workflows/contract-negotiation': '/templates/workflows/contract-negotiation/index.html',
      '/workflows/grant-review': '/templates/workflows/grant-review/index.html',
      '/workflows/procurement-evaluation': '/templates/workflows/procurement-evaluation/index.html',
      '/workflows/case-review': '/templates/workflows/case-review/index.html',
      '/workflows/budget-planning': '/templates/workflows/budget-planning/index.html',
      '/workflows/document-assembly': '/templates/workflows/document-assembly/index.html',
      
      // Mobile Templates
      '/mobile/mobile-dashboard': '/templates/mobile/mobile-dashboard/index.html',
      '/mobile/mobile-form': '/templates/mobile/mobile-form/index.html',
      '/mobile/mobile-search': '/templates/mobile/mobile-search/index.html',
      '/mobile/mobile-directory': '/templates/mobile/mobile-directory/index.html',
      '/mobile/mobile-scanner': '/templates/mobile/mobile-scanner/index.html',
      '/mobile/mobile-notifications': '/templates/mobile/mobile-notifications/index.html',
      '/mobile/mobile-profile': '/templates/mobile/mobile-profile/index.html',
      '/mobile/mobile-checklist': '/templates/mobile/mobile-checklist/index.html',
      
      // Security Templates
      '/security/security-dashboard': '/templates/security/security-dashboard/index.html',
      '/security/privacy-center': '/templates/security/privacy-center/index.html',
      '/security/consent-management': '/templates/security/consent-management/index.html',
      '/security/audit-log-viewer': '/templates/security/audit-log-viewer/index.html',
      '/security/incident-response': '/templates/security/incident-response/index.html',
      '/security/access-control': '/templates/security/access-control/index.html',
      '/security/vulnerability-tracker': '/templates/security/vulnerability-tracker/index.html',
      '/security/compliance-monitor': '/templates/security/compliance-monitor/index.html',
      
      // Analytics Templates
      '/analytics/web-analytics': '/templates/analytics/web-analytics/index.html',
      '/analytics/ab-testing': '/templates/analytics/ab-testing/index.html',
      '/analytics/user-feedback': '/templates/analytics/user-feedback/index.html',
      '/analytics/performance-analytics': '/templates/analytics/performance-analytics/index.html',
      '/analytics/business-intelligence': '/templates/analytics/business-intelligence/index.html',
      '/analytics/data-visualization': '/templates/analytics/data-visualization/index.html',
      '/analytics/reporting-engine': '/templates/analytics/reporting-engine/index.html',
      '/analytics/metrics-tracker': '/templates/analytics/metrics-tracker/index.html',
      
      // Landing Page Templates
      '/landing/agency-home': '/templates/landing/agency-home/index.html',
      '/landing/federal-department': '/templates/landing/federal-department/index.html',
      '/landing/state-portal': '/templates/landing/state-portal/index.html',
      '/landing/city-government': '/templates/landing/city-government/index.html',
      '/landing/benefits-program': '/templates/landing/benefits-program/index.html',
      '/landing/healthcare-program': '/templates/landing/healthcare-program/index.html',
      '/landing/emergency-services': '/templates/landing/emergency-services/index.html',
      '/landing/veterans-portal': '/templates/landing/veterans-portal/index.html',
      '/landing/public-health': '/templates/landing/public-health/index.html',
      '/landing/small-business': '/templates/landing/small-business/index.html'
    };
    
    this.init();
  }

  init() {
    // Load initial route
    this.loadRoute(this.getCurrentPath());
    
    // Handle browser navigation
    window.addEventListener('popstate', () => {
      this.loadRoute(this.getCurrentPath());
    });
  }

  getCurrentPath() {
    return window.location.pathname || '/';
  }

  async loadRoute(path) {
    const app = document.getElementById('app');
    const templatePath = this.routes[path];
    
    if (!templatePath) {
      app.innerHTML = this.get404Page();
      return;
    }
    
    try {
      const response = await fetch(templatePath);
      if (!response.ok) throw new Error('Template not found');
      
      const html = await response.text();
      app.innerHTML = html;
      
      // Re-initialize USWDS components
      if (window.USWDS) {
        window.USWDS.init();
      }
      
      // Setup code copy listener
      this.setupCodeListener();
    } catch (error) {
      app.innerHTML = this.getTemplatePlaceholder(path);
    }
  }

  setupCodeListener() {
    window.addEventListener('message', (e) => {
      if (e.data.action === 'getCode') {
        // Get the current template HTML
        const app = document.getElementById('app');
        const code = app.innerHTML;
        
        // Send it back to showcase
        e.source.postMessage({
          action: 'codeContent',
          code: code
        }, '*');
      }
    });
  }

  get404Page() {
    return `
      <div class="usa-section">
        <div class="grid-container">
          <h1 class="usa-heading">404 - Template Not Found</h1>
          <p class="usa-intro">The requested template does not exist.</p>
        </div>
      </div>
    `;
  }

  getTemplatePlaceholder(path) {
    return `
      <div class="usa-section">
        <div class="grid-container">
          <div class="usa-alert usa-alert--info">
            <div class="usa-alert__body">
              <h4 class="usa-alert__heading">Template Coming Soon</h4>
              <p class="usa-alert__text">
                The template for <strong>${path}</strong> will be created here.
                Use Claude Code to generate this template.
              </p>
            </div>
          </div>
          
          <div class="margin-top-4">
            <h2 class="usa-heading">How to create this template:</h2>
            <ol class="usa-list">
              <li>Navigate to: <code>templates/plain${path}/</code></li>
              <li>Create <code>index.html</code> with your USWDS template</li>
              <li>Refresh this page to see your template</li>
            </ol>
          </div>
        </div>
      </div>
    `;
  }
}

// Initialize router
new Router();