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
        // Reset to home page when switching frameworks
        this.currentPath = '/';
        window.history.pushState({}, '', '/');
        this.updateIframe();
        this.renderNavigation(); // Re-render to update availability
        this.updateActiveLink();
      });
    });
  }

  setupActions() {
    // === Copy Code ===
    document.getElementById('copyCode').addEventListener('click', () => {
      // Send message to iframe to get code
      const iframe = document.getElementById('preview');
      iframe.contentWindow.postMessage({ action: 'getCode' }, '*');
    });
    
    // === Fullscreen ===
    document.getElementById('fullscreen').addEventListener('click', () => {
      const main = document.querySelector('.dsx-main');
      main.classList.toggle('fullscreen');
    });
  }

  navigateTo(path) {
    this.currentPath = path;
    window.history.pushState({}, '', `?path=${path}`);
    this.updateIframe();
    this.updateActiveLink();
  }

  updateIframe() {
    const iframe = document.getElementById('preview');
    iframe.src = `http://localhost:${this.currentVariant}${this.currentPath}`;
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

// === Handle Copy Code Response ===
window.addEventListener('message', (e) => {
  if (e.data.action === 'codeContent') {
    navigator.clipboard.writeText(e.data.code).then(() => {
      // Visual feedback
      const btn = document.getElementById('copyCode');
      const originalText = btn.querySelector('.dsx-btn-text').textContent;
      btn.querySelector('.dsx-btn-text').textContent = 'Copied!';
      setTimeout(() => {
        btn.querySelector('.dsx-btn-text').textContent = originalText;
      }, 2000);
    });
  }
});