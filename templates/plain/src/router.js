/* ========== PLAIN USWDS ROUTER ========== */
// USWDS CSS and JS are loaded in index.html

class Router {
  constructor() {
    this.routes = {
      '/': '/templates/home.html',
      '/dashboards/federal-analytics': '/templates/dashboards/federal-analytics/index.html',
      '/dashboards/citizen-portal': '/templates/dashboards/citizen-portal/index.html',
      '/dashboards/case-management': '/templates/dashboards/case-management/index.html',
      '/forms/benefits-application': '/templates/forms/benefits-application/index.html',
      '/forms/permit-request': '/templates/forms/permit-request/index.html',
      '/landing/agency-home': '/templates/landing/agency-home/index.html'
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