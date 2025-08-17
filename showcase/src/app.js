/* ========== SHOWCASE APP CONTROLLER ========== */

class ShowcaseApp {
  constructor() {
    this.currentVariant = '3000';
    this.currentPath = '/';
    this.templates = null;
    
    this.init();
  }

  async init() {
    // === Load Templates Registry ===
    await this.loadTemplates();
    
    // === Setup Event Listeners ===
    this.setupToggle();
    this.setupVariantSelector();
    this.setupActions();
    
    // === Load Initial State ===
    this.loadFromURL();
  }

  async loadTemplates() {
    try {
      const response = await fetch('/templates.json');
      this.templates = await response.json();
      this.renderNavigation();
    } catch (error) {
      console.log('No templates.json found, using defaults');
      this.templates = this.getDefaultTemplates();
      this.renderNavigation();
    }
  }

  getDefaultTemplates() {
    return {
      "dashboards": {
        "federal-analytics": {
          "name": "Federal Analytics",
          "available": ["plain", "react", "trussworks"]
        },
        "citizen-portal": {
          "name": "Citizen Portal", 
          "available": ["plain", "react"]
        }
      },
      "forms": {
        "benefits-application": {
          "name": "Benefits Application",
          "available": ["plain", "react", "trussworks"]
        },
        "permit-request": {
          "name": "Permit Request",
          "available": ["plain"]
        }
      },
      "landing": {
        "agency-home": {
          "name": "Agency Homepage",
          "available": ["plain", "react"]
        }
      }
    };
  }

  renderNavigation() {
    const nav = document.getElementById('nav');
    const variantMap = {
      '3000': 'plain',
      '3001': 'react',
      '3002': 'trussworks'
    };
    const currentVariant = variantMap[this.currentVariant];
    
    let html = '';
    
    for (const [category, templates] of Object.entries(this.templates)) {
      html += `<div class="dsx-category">`;
      html += `<h3 class="dsx-category-title">${this.formatCategoryName(category)}</h3>`;
      
      for (const [slug, template] of Object.entries(templates)) {
        const path = `/${category}/${slug}`;
        const isAvailable = template.available.includes(currentVariant);
        const isActive = this.currentPath === path;
        
        html += `<a 
          href="?path=${path}" 
          class="dsx-template-link ${isActive ? 'active' : ''} ${!isAvailable ? 'dsx-template-unavailable' : ''}"
          data-path="${path}"
          ${!isAvailable ? 'title="Not available in ' + currentVariant + '"' : ''}
        >
          ${template.name}
        </a>`;
      }
      
      html += `</div>`;
    }
    
    nav.innerHTML = html;
    
    // === Add Click Handlers ===
    nav.querySelectorAll('.dsx-template-link').forEach(link => {
      link.addEventListener('click', (e) => {
        if (link.classList.contains('dsx-template-unavailable')) {
          e.preventDefault();
          return;
        }
        e.preventDefault();
        const path = link.dataset.path;
        this.navigateTo(path);
      });
    });
  }

  formatCategoryName(category) {
    return category
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  setupToggle() {
    const toggle = document.getElementById('toggle');
    const sidebar = document.getElementById('sidebar');
    
    toggle.addEventListener('click', () => {
      sidebar.classList.toggle('collapsed');
    });
  }

  setupVariantSelector() {
    const radios = document.querySelectorAll('input[name="variant"]');
    
    radios.forEach(radio => {
      radio.addEventListener('change', (e) => {
        this.currentVariant = e.target.value;
        // Keep the same path when switching frameworks
        // Check if current path is available in new framework
        const variantMap = {
          '3000': 'plain',
          '3001': 'react',
          '3002': 'trussworks'
        };
        const newVariant = variantMap[this.currentVariant];
        
        // Check if current template exists in new framework
        if (this.currentPath !== '/' && this.currentPath !== '') {
          const [_, category, slug] = this.currentPath.split('/');
          if (category && slug && this.templates[category] && this.templates[category][slug]) {
            const template = this.templates[category][slug];
            if (!template.available.includes(newVariant)) {
              // Template not available in new framework, reset to home
              this.currentPath = '/';
              window.history.pushState({}, '', '/');
            }
          }
        }
        
        this.updateIframe();
        this.renderNavigation(); // Re-render to update availability
        this.updateActiveLink();
      });
    });
  }

  setupActions() {
    // === Copy Code ===
    document.getElementById('copyCode').addEventListener('click', () => {
      this.showCodeModal();
    });
    
    // === Fullscreen ===
    document.getElementById('fullscreen').addEventListener('click', () => {
      const main = document.querySelector('.dsx-main');
      main.classList.toggle('fullscreen');
    });
  }

  async showCodeModal() {
    // Create modal if it doesn't exist
    let modal = document.getElementById('codeModal');
    if (!modal) {
      modal = this.createCodeModal();
      document.body.appendChild(modal);
    }
    
    // Show loading state
    const codeContent = modal.querySelector('.dsx-modal-code');
    codeContent.textContent = 'Loading code...';
    modal.style.display = 'flex';
    
    // Fetch the actual source code based on framework
    try {
      const code = await this.fetchSourceCode();
      codeContent.textContent = code;
    } catch (error) {
      codeContent.textContent = 'Error loading source code: ' + error.message;
    }
  }

  async fetchSourceCode() {
    const variantMap = {
      '3000': 'plain',
      '3001': 'react', 
      '3002': 'trussworks'
    };
    
    const framework = variantMap[this.currentVariant];
    
    if (this.currentPath === '/' || this.currentPath === '') {
      return '// Select a template to view its source code';
    }
    
    // Parse the path
    const [_, category, slug] = this.currentPath.split('/');
    
    if (!category || !slug) {
      throw new Error('Invalid path');
    }
    
    let fileUrl;
    let response;
    
    switch (framework) {
      case 'plain':
        // Fetch the HTML source from our source server
        try {
          const sourceUrl = `http://localhost:4001/source?framework=plain&category=${category}&slug=${slug}`;
          response = await fetch(sourceUrl);
          if (!response.ok) {
            // Fallback to direct fetch
            fileUrl = `http://localhost:3000/templates${this.currentPath}/index.html`;
            response = await fetch(fileUrl);
            if (!response.ok) throw new Error('Failed to fetch template');
          }
          return await response.text();
        } catch (error) {
          return `// Unable to fetch Plain USWDS source code
// Path: ${this.currentPath}
// Error: ${error.message}`;
        }
        
      case 'react':
        // React source viewing coming soon
        return `// React source code viewing coming soon\n// Template: ${this.currentPath}`;
        
      case 'trussworks':
        // Fetch the actual TypeScript source from our source server
        try {
          const sourceUrl = `http://localhost:4001/source?framework=trussworks&category=${category}&slug=${slug}`;
          response = await fetch(sourceUrl);
          if (!response.ok) {
            throw new Error('Failed to fetch source');
          }
          return await response.text();
        } catch (error) {
          // Fallback if source server is not available
          const componentName = this.formatComponentName(slug);
          return `// Unable to fetch Trussworks source code
// Component: ${componentName}
// Path: ${this.currentPath}
// Error: ${error.message}

// Make sure the source server is running on port 4001`;
        }
        
      default:
        throw new Error('Unknown framework');
    }
  }

  formatComponentName(slug) {
    // Convert kebab-case to PascalCase
    return slug.split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join('');
  }

  createCodeModal() {
    const modal = document.createElement('div');
    modal.id = 'codeModal';
    modal.className = 'dsx-modal';
    modal.innerHTML = `
      <div class="dsx-modal-content">
        <div class="dsx-modal-header">
          <h2 class="dsx-modal-title">Template Code</h2>
          <button class="dsx-modal-close" aria-label="Close">
            <span>×</span>
          </button>
        </div>
        <div class="dsx-modal-body">
          <pre class="dsx-modal-code"></pre>
        </div>
        <div class="dsx-modal-footer">
          <button class="dsx-modal-btn dsx-modal-copy">Copy Code</button>
          <button class="dsx-modal-btn dsx-modal-close-btn">Close</button>
        </div>
      </div>
    `;
    
    // Close button handlers
    modal.querySelector('.dsx-modal-close').addEventListener('click', () => {
      modal.style.display = 'none';
    });
    
    modal.querySelector('.dsx-modal-close-btn').addEventListener('click', () => {
      modal.style.display = 'none';
    });
    
    // Copy button handler
    modal.querySelector('.dsx-modal-copy').addEventListener('click', () => {
      const code = modal.querySelector('.dsx-modal-code').textContent;
      navigator.clipboard.writeText(code).then(() => {
        const btn = modal.querySelector('.dsx-modal-copy');
        const originalText = btn.textContent;
        btn.textContent = 'Copied!';
        setTimeout(() => {
          btn.textContent = originalText;
        }, 2000);
      });
    });
    
    // Close on backdrop click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    });
    
    return modal;
  }

  navigateTo(path) {
    this.currentPath = path;
    window.history.pushState({}, '', `?path=${path}`);
    this.updateIframe();
    this.updateActiveLink();
  }

  updateIframe() {
    const iframe = document.getElementById('preview');
    // Plain USWDS needs /templates prefix and trailing slash
    let path = this.currentPath;
    if (this.currentVariant === '3000') {
      path = `/templates${this.currentPath}/`;
    }
    iframe.src = `http://localhost:${this.currentVariant}${path}`;
  }

  updateActiveLink() {
    document.querySelectorAll('.dsx-template-link').forEach(link => {
      if (link.dataset.path === this.currentPath) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  loadFromURL() {
    const params = new URLSearchParams(window.location.search);
    const path = params.get('path');
    
    if (path) {
      this.currentPath = path;
      this.updateIframe();
      this.updateActiveLink();
    }
  }
}

// === Initialize App ===
document.addEventListener('DOMContentLoaded', () => {
  new ShowcaseApp();
});

// Message handler removed - now fetching source directly