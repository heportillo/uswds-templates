const fs = require('fs');
const path = require('path');

// Read all template directories
const templatesDir = path.join(__dirname, 'templates/plain/templates');
const categories = fs.readdirSync(templatesDir).filter(f => fs.statSync(path.join(templatesDir, f)).isDirectory());

let routes = {};

// Skip home.html as it's not in a subdirectory
categories.forEach(category => {
  if (category === 'home.html') return;
  
  const categoryDir = path.join(templatesDir, category);
  const templates = fs.readdirSync(categoryDir).filter(f => fs.statSync(path.join(categoryDir, f)).isDirectory());
  
  templates.forEach(template => {
    const routePath = `/${category}/${template}`;
    const filePath = `/templates/${category}/${template}/index.html`;
    routes[routePath] = filePath;
  });
});

// Add home route
routes['/'] = '/templates/home.html';

// Sort routes alphabetically
const sortedRoutes = Object.keys(routes).sort().reduce((obj, key) => {
  obj[key] = routes[key];
  return obj;
}, {});

// Generate the router.js content
const routerContent = `/* ========== PLAIN USWDS ROUTER ========== */
// USWDS CSS and JS are loaded in index.html
// Auto-generated router with all templates

class Router {
  constructor() {
    this.routes = ${JSON.stringify(sortedRoutes, null, 6).replace(/"/g, "'")};
    
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
    return \`
      <div class="usa-section">
        <div class="grid-container">
          <h1 class="usa-heading">404 - Template Not Found</h1>
          <p class="usa-intro">The requested template does not exist.</p>
          <a href="/" class="usa-button">Return Home</a>
        </div>
      </div>
    \`;
  }

  getTemplatePlaceholder(path) {
    return \`
      <div class="usa-section">
        <div class="grid-container">
          <div class="usa-alert usa-alert--info">
            <div class="usa-alert__body">
              <h4 class="usa-alert__heading">Template Coming Soon</h4>
              <p class="usa-alert__text">
                The template for <strong>\${path}</strong> will be created here.
              </p>
            </div>
          </div>
        </div>
      </div>
    \`;
  }
}

// Initialize router
new Router();
`;

// Write the updated router
fs.writeFileSync(path.join(__dirname, 'templates/plain/src/router.js'), routerContent);

console.log(`Updated router.js with ${Object.keys(sortedRoutes).length} routes`);
console.log('\nCategories included:');
categories.forEach(cat => {
  const count = Object.keys(sortedRoutes).filter(r => r.startsWith(`/${cat}/`)).length;
  if (count > 0) {
    console.log(`- ${cat}: ${count} templates`);
  }
});