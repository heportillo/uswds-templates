#!/usr/bin/env node

/**
 * Fix Remaining Template Quality Issues
 * Targeted fixes for accessibility, placeholders, and content quality
 */

import fs from 'fs';
import path from 'path';
import { glob } from 'glob';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Color codes
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

class TemplateFixer {
  constructor() {
    this.stats = {
      filesFixed: 0,
      altTextAdded: 0,
      ariLabelsAdded: 0,
      tableCaptionsAdded: 0,
      genericDataReplaced: 0,
      errorMessagesImproved: 0,
      responsiveClassesAdded: 0
    };

    // Context-aware replacements
    this.contextualReplacements = {
      'Sample Item': [
        'Federal Building A-12',
        'Regional Office Complex',
        'Processing Center Delta',
        'Service Hub Northeast',
        'Distribution Facility 7',
        'Training Center Alpha',
        'Research Laboratory 3',
        'Field Office Bravo'
      ],
      'Sample Data': [
        'Q4 Performance Metrics',
        'Annual Compliance Report',
        'Budget Allocation Summary',
        'Resource Utilization Stats',
        'Service Delivery Metrics',
        'Operational Efficiency Data',
        'Citizens Feedback Analysis',
        'System Health Indicators'
      ],
      'Test': [
        'Active',
        'Processing', 
        'Verified',
        'Approved',
        'Pending Review',
        'In Progress',
        'Completed',
        'Scheduled'
      ],
      'Demo': [
        'Current',
        'Historical',
        'Projected',
        'Baseline',
        'Target',
        'Actual',
        'Forecast',
        'Benchmark'
      ]
    };

    // Realistic numeric data ranges
    this.numericData = {
      small: () => Math.floor(Math.random() * 100) + 50,
      medium: () => Math.floor(Math.random() * 10000) + 1000,
      large: () => Math.floor(Math.random() * 1000000) + 100000,
      percentage: () => Math.floor(Math.random() * 30) + 70,
      currency: () => '$' + (Math.floor(Math.random() * 900) + 100) + 'K',
      days: () => Math.floor(Math.random() * 30) + 1
    };
  }

  processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    const fileName = path.relative(process.cwd(), filePath);
    let changesMade = false;

    // Skip placeholder templates
    if (content.includes('Template Coming Soon')) {
      return;
    }

    // 1. Fix all images without alt text
    content = content.replace(
      /<img(?![^>]*\balt=)([^>]*)>/gi,
      (match, attrs) => {
        // Extract src to generate meaningful alt text
        const srcMatch = attrs.match(/src="([^"]*)"/);
        if (srcMatch) {
          const filename = srcMatch[1].split('/').pop().replace(/\.[^.]+$/, '');
          const altText = this.generateAltText(filename);
          this.stats.altTextAdded++;
          changesMade = true;
          return `<img alt="${altText}"${attrs}>`;
        }
        return match;
      }
    );

    // 2. Add ARIA labels to icon buttons
    content = content.replace(
      /<button([^>]*?)>\s*<(?:img|svg|i)([^>]*?)>[\s\S]*?<\/button>/gi,
      (match, btnAttrs) => {
        if (!btnAttrs.includes('aria-label')) {
          const label = this.extractButtonPurpose(match);
          this.stats.ariaLabelsAdded++;
          changesMade = true;
          return match.replace('<button', `<button aria-label="${label}"`);
        }
        return match;
      }
    );

    // 3. Add table captions
    content = content.replace(
      /<table([^>]*class="[^"]*usa-table[^"]*"[^>]*)>(?!\s*<caption)/gi,
      (match) => {
        const caption = this.generateTableCaption(content, match);
        this.stats.tableCaptionsAdded++;
        changesMade = true;
        return match + `\n  <caption class="usa-sr-only">${caption}</caption>`;
      }
    );

    // 4. Replace remaining generic text
    Object.entries(this.contextualReplacements).forEach(([pattern, replacements]) => {
      const regex = new RegExp(`\\b${pattern}\\s*(\\d*)\\b`, 'gi');
      let replacementIndex = 0;
      content = content.replace(regex, (match) => {
        const replacement = replacements[replacementIndex % replacements.length];
        replacementIndex++;
        if (match !== replacement) {
          this.stats.genericDataReplaced++;
          changesMade = true;
        }
        return replacement;
      });
    });

    // 5. Improve error messages
    content = content.replace(
      />(Error|Failed|Unable to|Could not)([^<]*)</gi,
      (match, errorWord, restOfMessage) => {
        if (!restOfMessage.match(/please|try|contact|help/i)) {
          const improvedMessage = this.improveErrorMessage(errorWord, restOfMessage);
          this.stats.errorMessagesImproved++;
          changesMade = true;
          return `>${improvedMessage}<`;
        }
        return match;
      }
    );

    // 6. Replace single/double digit numbers with realistic values
    content = content.replace(
      />(\d{1,2})(?!\d|%|px|em|rem|\.|,)</g,
      (match, num) => {
        const parsedNum = parseInt(num);
        if (parsedNum < 50) {
          const newValue = this.getRealisticNumber(content, match);
          if (newValue !== num) {
            this.stats.genericDataReplaced++;
            changesMade = true;
            return `>${newValue}<`;
          }
        }
        return match;
      }
    );

    // 7. Add missing form labels
    content = content.replace(
      /<input([^>]*?)type="(text|email|tel|number|date)"([^>]*?)>/gi,
      (match, before, type, after) => {
        const allAttrs = before + after;
        if (!allAttrs.includes('aria-label') && !allAttrs.includes('aria-labelledby')) {
          const idMatch = allAttrs.match(/id="([^"]*)"/);
          if (idMatch) {
            // Check if a label exists for this input
            const labelRegex = new RegExp(`<label[^>]*for="${idMatch[1]}"`, 'i');
            if (!content.match(labelRegex)) {
              const label = this.generateInputLabel(type, idMatch[1]);
              this.stats.ariaLabelsAdded++;
              changesMade = true;
              return match.replace('<input', `<input aria-label="${label}"`);
            }
          }
        }
        return match;
      }
    );

    // 8. Add text-wrap classes to prevent overflow
    content = content.replace(
      /<td>([^<]{50,})<\/td>/g,
      (match, text) => {
        changesMade = true;
        return `<td class="text-wrap">${text}</td>`;
      }
    );

    // 9. Fix heading hierarchy issues
    content = this.fixHeadingHierarchy(content);
    if (content !== fs.readFileSync(filePath, 'utf8')) {
      changesMade = true;
    }

    // Save if changes were made
    if (changesMade) {
      fs.writeFileSync(filePath, content);
      this.stats.filesFixed++;
      console.log(`${colors.green}✓${colors.reset} Fixed: ${fileName}`);
    }
  }

  generateAltText(filename) {
    // Common icon/image name patterns
    const patterns = {
      'logo': 'Organization logo',
      'icon': 'Icon',
      'arrow': 'Arrow indicator',
      'close': 'Close button',
      'menu': 'Menu icon',
      'search': 'Search icon',
      'user': 'User profile',
      'chart': 'Data visualization chart',
      'graph': 'Performance graph',
      'flag': 'U.S. flag',
      'check': 'Checkmark',
      'warning': 'Warning indicator',
      'info': 'Information icon',
      'error': 'Error indicator',
      'success': 'Success indicator'
    };

    const cleanName = filename.toLowerCase().replace(/[-_]/g, ' ');
    
    for (const [key, value] of Object.entries(patterns)) {
      if (cleanName.includes(key)) {
        return value;
      }
    }
    
    // Default: capitalize and clean the filename
    return cleanName.charAt(0).toUpperCase() + cleanName.slice(1);
  }

  extractButtonPurpose(buttonHTML) {
    // Check for common button patterns
    if (buttonHTML.includes('close')) return 'Close';
    if (buttonHTML.includes('menu')) return 'Open menu';
    if (buttonHTML.includes('search')) return 'Search';
    if (buttonHTML.includes('filter')) return 'Apply filters';
    if (buttonHTML.includes('edit')) return 'Edit';
    if (buttonHTML.includes('delete')) return 'Delete';
    if (buttonHTML.includes('save')) return 'Save';
    if (buttonHTML.includes('submit')) return 'Submit';
    if (buttonHTML.includes('export')) return 'Export data';
    if (buttonHTML.includes('print')) return 'Print';
    
    return 'Perform action';
  }

  generateTableCaption(content, tableMatch) {
    // Try to find context from surrounding content
    const beforeTable = content.substring(Math.max(0, content.indexOf(tableMatch) - 200), content.indexOf(tableMatch));
    
    if (beforeTable.includes('Recent')) return 'Recent activity and updates';
    if (beforeTable.includes('Data')) return 'Data overview table';
    if (beforeTable.includes('Results')) return 'Search results table';
    if (beforeTable.includes('Performance')) return 'Performance metrics table';
    if (beforeTable.includes('Status')) return 'Status overview table';
    if (beforeTable.includes('User')) return 'User information table';
    if (beforeTable.includes('Report')) return 'Report data table';
    
    // Count columns to provide specific info
    const headerMatch = tableMatch.match(/<th/gi);
    const columnCount = headerMatch ? headerMatch.length : 'multiple';
    
    return `Data table with ${columnCount} columns`;
  }

  improveErrorMessage(errorType, message) {
    const helpfulSuffixes = [
      '. Please try again or contact support if the issue persists',
      '. Please check your input and try again',
      '. If you need assistance, please contact our help desk',
      '. Please refresh the page and try again'
    ];
    
    const improvedStarts = {
      'Error': 'We encountered an issue',
      'Failed': 'We couldn\'t complete this action',
      'Unable to': 'We\'re having trouble',
      'Could not': 'We couldn\'t'
    };
    
    const improved = improvedStarts[errorType] || errorType;
    const suffix = helpfulSuffixes[Math.floor(Math.random() * helpfulSuffixes.length)];
    
    return improved + message + suffix;
  }

  getRealisticNumber(context, match) {
    // Determine appropriate range based on context
    if (context.includes('percent') || context.includes('%')) {
      return this.numericData.percentage();
    }
    if (context.includes('$') || context.includes('cost') || context.includes('budget')) {
      return this.numericData.currency();
    }
    if (context.includes('days') || context.includes('time')) {
      return this.numericData.days();
    }
    if (context.includes('users') || context.includes('count') || context.includes('total')) {
      return this.numericData.large().toLocaleString();
    }
    
    return this.numericData.medium().toLocaleString();
  }

  generateInputLabel(type, id) {
    const labelMap = {
      'email': 'Email address',
      'tel': 'Phone number',
      'date': 'Date',
      'number': 'Number',
      'text': id.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
    };
    
    return labelMap[type] || 'Input field';
  }

  fixHeadingHierarchy(content) {
    // Extract all headings with their levels
    const headingRegex = /<h(\d)([^>]*)>(.*?)<\/h\d>/gi;
    const headings = [];
    let match;
    
    while ((match = headingRegex.exec(content)) !== null) {
      headings.push({
        level: parseInt(match[1]),
        fullMatch: match[0],
        attributes: match[2],
        text: match[3],
        index: match.index
      });
    }
    
    // Check if we need h1
    if (headings.length > 0 && !headings.some(h => h.level === 1)) {
      // Find the first h2 and make it h1
      const firstHeading = headings.find(h => h.level === 2);
      if (firstHeading) {
        content = content.replace(
          firstHeading.fullMatch,
          `<h1${firstHeading.attributes}>${firstHeading.text}</h1>`
        );
      }
    }
    
    return content;
  }

  async run(pattern = 'templates/**/*.html') {
    console.log(`${colors.blue}🔧 Fixing remaining template issues...${colors.reset}\n`);
    
    const files = glob.sync(pattern, { 
      ignore: ['**/node_modules/**', '**/dist/**', '**/build/**'] 
    });

    console.log(`Processing ${colors.cyan}${files.length}${colors.reset} files\n`);

    for (const file of files) {
      this.processFile(file);
    }

    this.printSummary();
  }

  printSummary() {
    console.log('\n' + colors.cyan + '=' .repeat(60) + colors.reset);
    console.log(colors.cyan + 'FIX SUMMARY' + colors.reset);
    console.log(colors.cyan + '=' .repeat(60) + colors.reset);
    
    console.log(`\n${colors.blue}📊 Fixes Applied:${colors.reset}`);
    console.log(`  Files fixed: ${colors.green}${this.stats.filesFixed}${colors.reset}`);
    console.log(`  Alt text added: ${colors.green}${this.stats.altTextAdded}${colors.reset}`);
    console.log(`  ARIA labels added: ${colors.green}${this.stats.ariaLabelsAdded}${colors.reset}`);
    console.log(`  Table captions added: ${colors.green}${this.stats.tableCaptionsAdded}${colors.reset}`);
    console.log(`  Generic data replaced: ${colors.green}${this.stats.genericDataReplaced}${colors.reset}`);
    console.log(`  Error messages improved: ${colors.green}${this.stats.errorMessagesImproved}${colors.reset}`);
    
    const totalFixes = Object.values(this.stats).reduce((a, b) => a + b, 0) - this.stats.filesFixed;
    console.log(`\n  ${colors.green}Total issues fixed: ${totalFixes}${colors.reset}`);
    
    console.log('\n' + colors.cyan + '=' .repeat(60) + colors.reset);
  }
}

// Run the fixer
if (import.meta.url === `file://${process.argv[1]}`) {
  const fixer = new TemplateFixer();
  const pattern = process.argv[2] || 'templates/plain/templates/**/*.html';
  
  fixer.run(pattern).catch(console.error);
}

export default TemplateFixer;