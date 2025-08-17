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
      
      // Landing Page Templates
      '/landing/agency-home': '/templates/landing/agency-home/index.html',
      '/landing/federal-department': '/templates/landing/federal-department/index.html'
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