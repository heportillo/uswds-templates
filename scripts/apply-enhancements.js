#!/usr/bin/env node

/**
 * Apply Quality Enhancements to All Templates
 * Systematically updates templates with CSS enhancements and fixes common issues
 */

import fs from 'fs';
import path from 'path';
import { glob } from 'glob';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  gray: '\x1b[90m'
};

class TemplateEnhancer {
  constructor() {
    this.stats = {
      filesProcessed: 0,
      cssEnhancementsAdded: 0,
      placeholdersReplaced: 0,
      accessibilityFixed: 0,
      responsiveFixed: 0,
      totalChanges: 0
    };

    // Realistic data mappings for different contexts
    this.realisticData = {
      dashboards: {
        'energy-consumption': {
          metric1: { value: '324 MWh', label: 'Daily Consumption', desc: 'Current 24-hour usage' },
          metric2: { value: '42%', label: 'Renewable Energy', desc: 'Solar and wind sources' },
          metric3: { value: '$1.2M', label: 'Monthly Cost', desc: 'Projected expenses' },
          metric4: { value: '99.97%', label: 'Grid Reliability', desc: 'Uptime this quarter' }
        },
        'healthcare-portal': {
          metric1: { value: '12,847', label: 'Active Claims', desc: 'Processing this week' },
          metric2: { value: '3.2 days', label: 'Avg Process Time', desc: 'Down from 4.1 days' },
          metric3: { value: '87%', label: 'Satisfaction Rate', desc: 'Patient feedback score' },
          metric4: { value: '4.2%', label: 'Denial Rate', desc: 'Below national average' }
        },
        'immigration-services': {
          metric1: { value: '8,432', label: 'Applications', desc: 'Pending review' },
          metric2: { value: '127 days', label: 'Avg Wait Time', desc: 'For initial review' },
          metric3: { value: '73%', label: 'Approval Rate', desc: 'Last 90 days' },
          metric4: { value: '342', label: 'Interviews Today', desc: 'Scheduled appointments' }
        },
        'federal-analytics': {
          metric1: { value: '2.4M', label: 'Site Visitors', desc: 'Monthly unique users' },
          metric2: { value: '68%', label: 'Task Completion', desc: 'Successful outcomes' },
          metric3: { value: '1.8s', label: 'Page Load Time', desc: 'Average response' },
          metric4: { value: '92/100', label: 'Accessibility Score', desc: 'WCAG compliance' }
        },
        'veterans-affairs': {
          metric1: { value: '847K', label: 'Veterans Served', desc: 'This fiscal year' },
          metric2: { value: '18 min', label: 'Avg Response Time', desc: 'Support tickets' },
          metric3: { value: '$3.2B', label: 'Benefits Distributed', desc: 'Year to date' },
          metric4: { value: '94%', label: 'Service Rating', desc: 'Veteran satisfaction' }
        },
        'emergency-response': {
          metric1: { value: '147', label: 'Active Incidents', desc: 'Currently responding' },
          metric2: { value: '6.3 min', label: 'Response Time', desc: 'Average dispatch' },
          metric3: { value: '2,847', label: 'Resources Deployed', desc: 'Personnel and equipment' },
          metric4: { value: 'Level 3', label: 'Alert Status', desc: 'Elevated readiness' }
        },
        'default': {
          metric1: { value: '45,892', label: 'Total Records', desc: 'In active database' },
          metric2: { value: '78%', label: 'Completion Rate', desc: 'Current progress' },
          metric3: { value: '$4.7M', label: 'Budget Utilized', desc: 'Fiscal year to date' },
          metric4: { value: '99.2%', label: 'System Uptime', desc: 'Last 30 days' }
        }
      }
    };
  }

  processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    const fileName = path.relative(process.cwd(), filePath);
    let changesMade = false;

    // Skip if it's a placeholder template
    if (content.includes('Template Coming Soon') || content.includes('PLACEHOLDER')) {
      console.log(`${colors.gray}Skipping placeholder: ${fileName}${colors.reset}`);
      return;
    }

    // 1. Add CSS enhancement link if not present
    if (!content.includes('uswds-enhancements.css')) {
      const cssLink = '  <link rel="stylesheet" href="/assets/css/uswds-enhancements.css">';
      
      // Find the right place to insert (after main USWDS CSS)
      const uswdsLinkPattern = /<link[^>]*uswds[^>]*\.css[^>]*>/i;
      const match = content.match(uswdsLinkPattern);
      
      if (match) {
        const insertPos = content.indexOf(match[0]) + match[0].length;
        content = content.slice(0, insertPos) + '\n' + cssLink + content.slice(insertPos);
        this.stats.cssEnhancementsAdded++;
        changesMade = true;
      }
    }

    // 2. Replace generic placeholders with realistic data
    const dashboardType = this.detectDashboardType(filePath);
    const data = this.realisticData.dashboards[dashboardType] || this.realisticData.dashboards.default;
    
    // Replace METRIC patterns
    content = content.replace(/METRIC1_VALUE/g, data.metric1.value);
    content = content.replace(/METRIC1_LABEL/g, data.metric1.label);
    content = content.replace(/METRIC1_DESC/g, data.metric1.desc);
    content = content.replace(/Metric 1/g, data.metric1.label);
    
    content = content.replace(/METRIC2_VALUE/g, data.metric2.value);
    content = content.replace(/METRIC2_LABEL/g, data.metric2.label);
    content = content.replace(/METRIC2_DESC/g, data.metric2.desc);
    content = content.replace(/Metric 2/g, data.metric2.label);
    
    content = content.replace(/METRIC3_VALUE/g, data.metric3.value);
    content = content.replace(/METRIC3_LABEL/g, data.metric3.label);
    content = content.replace(/METRIC3_DESC/g, data.metric3.desc);
    content = content.replace(/Metric 3/g, data.metric3.label);
    
    content = content.replace(/METRIC4_VALUE/g, data.metric4.value);
    content = content.replace(/METRIC4_LABEL/g, data.metric4.label);
    content = content.replace(/METRIC4_DESC/g, data.metric4.desc);
    content = content.replace(/Metric 4/g, data.metric4.label);

    if (content.includes(data.metric1.value) || content.includes(data.metric1.label)) {
      this.stats.placeholdersReplaced++;
      changesMade = true;
    }

    // 3. Add text overflow protection to metric values
    content = content.replace(
      /<span class="font-sans-3xl text-bold">([^<]+)<\/span>/g,
      '<span class="font-sans-3xl text-bold metric-value">$1</span>'
    );

    // 4. Fix missing alt attributes on images
    content = content.replace(
      /<img([^>]*?)src="([^"]*usa-icons\/([^"\/]+))"([^>]*?)>/g,
      (match, before, src, iconName, after) => {
        if (!match.includes('alt=')) {
          const altText = iconName.replace(/[-_]/g, ' ').replace('.svg', '');
          this.stats.accessibilityFixed++;
          changesMade = true;
          return `<img${before}src="${src}" alt="${altText}"${after}>`;
        }
        return match;
      }
    );

    // 5. Add responsive grid classes where missing
    content = content.replace(
      /class="grid-col-(\d+)"(?![^>]*tablet:|[^>]*desktop:)/g,
      (match, cols) => {
        const tabletCols = Math.min(parseInt(cols) * 2, 12);
        const desktopCols = cols;
        this.stats.responsiveFixed++;
        changesMade = true;
        return `class="grid-col-12 tablet:grid-col-${tabletCols} desktop:grid-col-${desktopCols}"`;
      }
    );

    // 6. Add loading state classes to cards
    content = content.replace(
      /<div class="usa-card">/g,
      '<div class="usa-card animate-on-load">'
    );

    // 7. Add table scroll containers
    content = content.replace(
      /<table class="usa-table([^"]*)">/g,
      (match, classes) => {
        if (!content.includes('usa-table-container--scrollable')) {
          changesMade = true;
          return `<div class="usa-table-container--scrollable" tabindex="0">\n  <table class="usa-table${classes}">`;
        }
        return match;
      }
    );

    // Close table containers
    content = content.replace(
      /<\/table>(?!\s*<\/div>)/g,
      '</table>\n</div>'
    );

    // 8. Add skip navigation if missing
    if (!content.includes('usa-skipnav') && content.includes('<body>')) {
      const skipNav = '\n<a class="usa-skipnav" href="#main-content">Skip to main content</a>\n';
      content = content.replace(/<body[^>]*>/, (match) => match + skipNav);
      this.stats.accessibilityFixed++;
      changesMade = true;
    }

    // 9. Add aria-label to icon-only buttons
    content = content.replace(
      /<button([^>]*?)>[\s]*<img[^>]*alt="([^"]*)"[^>]*>[\s]*<\/button>/g,
      (match, attrs, altText) => {
        if (!attrs.includes('aria-label')) {
          changesMade = true;
          return `<button${attrs} aria-label="${altText}">${match.match(/<img[^>]*>/)[0]}</button>`;
        }
        return match;
      }
    );

    // 10. Add focus-visible enhancement class to interactive elements
    content = content.replace(
      /<(button|a)([^>]*class="[^"]*)(")>/g,
      (match, tag, classStart, classEnd) => {
        if (!classStart.includes('focus-ring-enhanced')) {
          changesMade = true;
          return `<${tag}${classStart} focus-ring-enhanced${classEnd}>`;
        }
        return match;
      }
    );

    // Save the file if changes were made
    if (changesMade) {
      fs.writeFileSync(filePath, content);
      this.stats.filesProcessed++;
      this.stats.totalChanges++;
      console.log(`${colors.green}✓${colors.reset} Enhanced: ${fileName}`);
    } else {
      console.log(`${colors.gray}○${colors.reset} No changes needed: ${fileName}`);
    }
  }

  detectDashboardType(filePath) {
    const pathLower = filePath.toLowerCase();
    
    if (pathLower.includes('energy')) return 'energy-consumption';
    if (pathLower.includes('healthcare') || pathLower.includes('health')) return 'healthcare-portal';
    if (pathLower.includes('immigration')) return 'immigration-services';
    if (pathLower.includes('federal') || pathLower.includes('analytics')) return 'federal-analytics';
    if (pathLower.includes('veteran')) return 'veterans-affairs';
    if (pathLower.includes('emergency')) return 'emergency-response';
    
    return 'default';
  }

  async run(pattern = 'templates/**/*.html') {
    console.log(`${colors.blue}🚀 Starting template enhancement process...${colors.reset}\n`);
    
    const files = glob.sync(pattern, { 
      ignore: ['**/node_modules/**', '**/dist/**', '**/build/**'] 
    });

    console.log(`Found ${colors.cyan}${files.length}${colors.reset} template files\n`);

    for (const file of files) {
      this.processFile(file);
    }

    this.printSummary();
  }

  printSummary() {
    console.log('\n' + colors.cyan + '=' .repeat(60) + colors.reset);
    console.log(colors.cyan + 'ENHANCEMENT SUMMARY' + colors.reset);
    console.log(colors.cyan + '=' .repeat(60) + colors.reset);
    
    console.log(`\n${colors.blue}📊 Statistics:${colors.reset}`);
    console.log(`  Files processed: ${colors.green}${this.stats.filesProcessed}${colors.reset}`);
    console.log(`  CSS enhancements added: ${colors.green}${this.stats.cssEnhancementsAdded}${colors.reset}`);
    console.log(`  Placeholders replaced: ${colors.green}${this.stats.placeholdersReplaced}${colors.reset}`);
    console.log(`  Accessibility fixes: ${colors.green}${this.stats.accessibilityFixed}${colors.reset}`);
    console.log(`  Responsive fixes: ${colors.green}${this.stats.responsiveFixed}${colors.reset}`);
    console.log(`  Total improvements: ${colors.green}${this.stats.totalChanges}${colors.reset}`);
    
    if (this.stats.totalChanges > 0) {
      console.log(`\n${colors.green}✅ Successfully enhanced ${this.stats.filesProcessed} templates!${colors.reset}`);
      console.log(`\n${colors.blue}💡 Next steps:${colors.reset}`);
      console.log(`  1. Run validation script to check remaining issues`);
      console.log(`  2. Test templates in browser for visual quality`);
      console.log(`  3. Commit changes to version control`);
    } else {
      console.log(`\n${colors.yellow}ℹ️  No changes were needed${colors.reset}`);
    }
    
    console.log('\n' + colors.cyan + '=' .repeat(60) + colors.reset);
  }
}

// Run the enhancer
if (import.meta.url === `file://${process.argv[1]}`) {
  const enhancer = new TemplateEnhancer();
  const pattern = process.argv[2] || 'templates/**/*.html';
  
  enhancer.run(pattern).catch(console.error);
}

export default TemplateEnhancer;