#!/usr/bin/env node

/**
 * Template Quality Validation Script
 * Checks all templates for quality issues based on design excellence standards
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
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  gray: '\x1b[90m'
};

// Validation rules configuration
const validationRules = {
  // Generic placeholder patterns that should not exist
  genericPlaceholders: [
    /METRIC\d+_VALUE/gi,
    /METRIC\d+_DESC/gi,
    /METRIC\d+_LABEL/gi,
    /Metric \d+/gi,
    /Lorem ipsum/gi,
    /placeholder text/gi,
    /TODO:/gi,
    /FIXME:/gi,
    /XXX:/gi,
    /\[INSERT.*?\]/gi,
    /\[PLACEHOLDER\]/gi,
    /Sample Text/gi,
    /Test Data/gi,
    /Demo Content/gi
  ],

  // Required accessibility attributes
  accessibilityChecks: {
    images: {
      selector: /<img(?![^>]*\balt=)[^>]*>/gi,
      message: 'Image missing alt attribute'
    },
    formLabels: {
      selector: /<input(?![^>]*\b(aria-label|aria-labelledby|id)=)[^>]*type="(?!hidden|submit|button)[^"]*"[^>]*>/gi,
      message: 'Form input potentially missing label association'
    },
    buttons: {
      selector: /<button[^>]*>\s*<\/button>/gi,
      message: 'Empty button (no text content)'
    },
    skipNav: {
      selector: /usa-skipnav/,
      required: true,
      message: 'Missing skip navigation link'
    },
    mainContent: {
      selector: /id="main-content"/,
      required: true,
      message: 'Missing main-content landmark'
    },
    ariaLive: {
      selector: /usa-alert(?![^>]*\brole="alert")[^>]*>/gi,
      message: 'Alert missing role="alert" for screen readers'
    },
    tableCaptions: {
      selector: /<table(?![^>]*class="[^"]*usa-table[^"]*")[^>]*>(?![\s\S]*?<caption)/gi,
      message: 'Table missing caption for screen readers'
    },
    headingHierarchy: {
      check: 'custom',
      message: 'Heading hierarchy issue (skipped levels)'
    }
  },

  // Responsive layout patterns
  responsivePatterns: {
    gridClasses: {
      selector: /grid-col-\d+/,
      required: false,
      variants: ['tablet:grid-col-', 'desktop:grid-col-', 'mobile-lg:grid-col-']
    },
    overflowHandling: {
      patterns: [
        /overflow:\s*hidden/,
        /text-overflow:\s*ellipsis/,
        /usa-table-container--scrollable/,
        /text-truncate/,
        /text-wrap/
      ]
    },
    viewportMeta: {
      selector: /<meta[^>]*name="viewport"[^>]*content="[^"]*width=device-width/,
      required: true,
      message: 'Missing or incorrect viewport meta tag'
    }
  },

  // Content quality checks
  contentQuality: {
    emptyStates: {
      patterns: [
        /No results found/i,
        /No data available/i,
        /Empty state/i
      ],
      requiresAction: true,
      message: 'Empty state should include actionable next steps'
    },
    loadingStates: {
      patterns: [
        /loading/i,
        /skeleton/i,
        /spinner/i,
        /please wait/i
      ]
    },
    errorStates: {
      patterns: [
        /error/i,
        /failed/i,
        /unable to/i,
        /could not/i
      ],
      requiresHelp: true,
      message: 'Error messages should be helpful, not scary'
    },
    realData: {
      check: 'custom',
      message: 'Using generic data instead of realistic examples'
    }
  },

  // Visual hierarchy checks
  visualHierarchy: {
    primaryActions: {
      selector: /usa-button(?!.*usa-button--(outline|secondary|unstyled))/g,
      maxCount: 2,
      message: 'Too many primary actions (should be 1-2 per view)'
    },
    textReadability: {
      patterns: [
        /max-width:\s*\d+(ch|em)/,
        /measure-(narrow|optimal|wide)/
      ],
      message: 'Text blocks should have optimal reading width (45-85ch)'
    }
  },

  // Performance considerations
  performance: {
    inlineStyles: {
      selector: /style="[^"]{200,}"/gi,
      message: 'Excessive inline styles (consider moving to CSS)'
    },
    imageOptimization: {
      selector: /<img[^>]*src="[^"]*\.(jpg|jpeg|png)"/gi,
      message: 'Consider using WebP format for better performance'
    }
  }
};

// Main validation class
class TemplateValidator {
  constructor() {
    this.results = {
      totalFiles: 0,
      filesWithIssues: 0,
      totalIssues: 0,
      issuesByType: {},
      fileIssues: {},
      placeholderTemplates: 0
    };
  }

  validateFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const fileName = path.relative(process.cwd(), filePath);
    const issues = [];

    // Check if it's a placeholder template
    if (this.isPlaceholderTemplate(content)) {
      this.results.placeholderTemplates++;
      return { fileName, issues: [], isPlaceholder: true };
    }

    // Run all validation checks
    issues.push(...this.checkGenericPlaceholders(content));
    issues.push(...this.checkAccessibility(content));
    issues.push(...this.checkResponsive(content));
    issues.push(...this.checkContentQuality(content));
    issues.push(...this.checkVisualHierarchy(content));
    issues.push(...this.checkPerformance(content));
    issues.push(...this.checkHeadingHierarchy(content));

    if (issues.length > 0) {
      this.results.filesWithIssues++;
      this.results.fileIssues[fileName] = issues;
    }

    this.results.totalIssues += issues.length;

    return { fileName, issues };
  }

  isPlaceholderTemplate(content) {
    return content.includes('Template Coming Soon') || 
           content.includes('PLACEHOLDER') ||
           content.includes('template will be created here');
  }

  checkGenericPlaceholders(content) {
    const issues = [];
    
    validationRules.genericPlaceholders.forEach(pattern => {
      const matches = content.match(pattern);
      if (matches) {
        matches.forEach(match => {
          issues.push({
            type: 'generic-placeholder',
            severity: 'error',
            message: `Found generic placeholder: "${match}"`,
            line: this.getLineNumber(content, match)
          });
        });
      }
    });

    return issues;
  }

  checkAccessibility(content) {
    const issues = [];

    Object.entries(validationRules.accessibilityChecks).forEach(([key, rule]) => {
      if (rule.check === 'custom') {
        // Handle custom checks separately
        return;
      }

      if (rule.required) {
        // Check for required elements
        if (!content.match(rule.selector)) {
          issues.push({
            type: 'accessibility',
            severity: 'error',
            message: rule.message
          });
        }
      } else if (rule.selector) {
        // Check for problematic patterns
        const matches = content.match(rule.selector);
        if (matches) {
          matches.forEach(match => {
            issues.push({
              type: 'accessibility',
              severity: 'warning',
              message: rule.message,
              snippet: match.substring(0, 100)
            });
          });
        }
      }
    });

    return issues;
  }

  checkHeadingHierarchy(content) {
    const issues = [];
    const headingPattern = /<h(\d)[^>]*>/gi;
    const headings = [];
    let match;

    while ((match = headingPattern.exec(content)) !== null) {
      headings.push({
        level: parseInt(match[1]),
        position: match.index
      });
    }

    // Check for skipped heading levels
    for (let i = 1; i < headings.length; i++) {
      const currentLevel = headings[i].level;
      const previousLevel = headings[i - 1].level;
      
      if (currentLevel > previousLevel + 1) {
        issues.push({
          type: 'accessibility',
          severity: 'warning',
          message: `Heading hierarchy issue: h${previousLevel} followed by h${currentLevel} (skipped level)`
        });
      }
    }

    // Check if h1 exists
    if (headings.length > 0 && !headings.some(h => h.level === 1)) {
      issues.push({
        type: 'accessibility',
        severity: 'warning',
        message: 'Page missing h1 heading'
      });
    }

    return issues;
  }

  checkResponsive(content) {
    const issues = [];

    // Check viewport meta
    if (!content.match(validationRules.responsivePatterns.viewportMeta.selector)) {
      issues.push({
        type: 'responsive',
        severity: 'error',
        message: validationRules.responsivePatterns.viewportMeta.message
      });
    }

    // Check for responsive grid classes
    const hasResponsiveGrid = validationRules.responsivePatterns.gridClasses.variants.some(variant => 
      content.includes(variant)
    );

    if (content.includes('grid-col-') && !hasResponsiveGrid) {
      issues.push({
        type: 'responsive',
        severity: 'warning',
        message: 'Grid layout missing responsive breakpoints (tablet:, desktop:)'
      });
    }

    // Check for overflow handling
    const hasOverflowHandling = validationRules.responsivePatterns.overflowHandling.patterns.some(pattern =>
      content.match(pattern)
    );

    if (content.includes('usa-table') && !content.includes('usa-table-container--scrollable')) {
      issues.push({
        type: 'responsive',
        severity: 'warning',
        message: 'Table might need scrollable container for mobile devices'
      });
    }

    return issues;
  }

  checkContentQuality(content) {
    const issues = [];

    // Check for unhelpful error messages
    const errorPattern = /error|failed|unable/gi;
    const errorMatches = content.match(errorPattern);
    
    if (errorMatches) {
      errorMatches.forEach(match => {
        const context = this.getContext(content, match, 50);
        if (!context.match(/help|try|please|contact|support/i)) {
          issues.push({
            type: 'content-quality',
            severity: 'warning',
            message: 'Error message might not be helpful enough',
            snippet: context
          });
        }
      });
    }

    // Check for realistic data
    const unrealisticPatterns = [
      /\d{1,2}(?!\d)/g, // Single or double digit numbers (likely too small for gov data)
      /Test \w+/gi,
      /Example \w+/gi,
      /Demo \w+/gi
    ];

    unrealisticPatterns.forEach(pattern => {
      const matches = content.match(pattern);
      if (matches && matches.length > 3) {
        issues.push({
          type: 'content-quality',
          severity: 'info',
          message: 'Consider using more realistic government-scale data',
          count: matches.length
        });
      }
    });

    return issues;
  }

  checkVisualHierarchy(content) {
    const issues = [];

    // Count primary buttons
    const primaryButtons = content.match(validationRules.visualHierarchy.primaryActions.selector);
    if (primaryButtons && primaryButtons.length > validationRules.visualHierarchy.primaryActions.maxCount) {
      issues.push({
        type: 'visual-hierarchy',
        severity: 'warning',
        message: validationRules.visualHierarchy.primaryActions.message,
        count: primaryButtons.length
      });
    }

    // Check for text readability
    const hasReadabilityStyles = validationRules.visualHierarchy.textReadability.patterns.some(pattern =>
      content.match(pattern)
    );

    const longTextBlocks = content.match(/<p[^>]*>[^<]{200,}<\/p>/gi);
    if (longTextBlocks && !hasReadabilityStyles) {
      issues.push({
        type: 'visual-hierarchy',
        severity: 'info',
        message: 'Long text blocks should have optimal reading width constraints'
      });
    }

    return issues;
  }

  checkPerformance(content) {
    const issues = [];

    // Check for excessive inline styles
    const inlineStyles = content.match(validationRules.performance.inlineStyles.selector);
    if (inlineStyles) {
      inlineStyles.forEach(style => {
        issues.push({
          type: 'performance',
          severity: 'info',
          message: validationRules.performance.inlineStyles.message,
          length: style.length
        });
      });
    }

    // Check image formats
    const unoptimizedImages = content.match(validationRules.performance.imageOptimization.selector);
    if (unoptimizedImages) {
      issues.push({
        type: 'performance',
        severity: 'info',
        message: validationRules.performance.imageOptimization.message,
        count: unoptimizedImages.length
      });
    }

    return issues;
  }

  getLineNumber(content, searchString) {
    const index = content.indexOf(searchString);
    if (index === -1) return null;
    
    const lines = content.substring(0, index).split('\n');
    return lines.length;
  }

  getContext(content, searchString, contextLength = 50) {
    const index = content.indexOf(searchString);
    if (index === -1) return '';
    
    const start = Math.max(0, index - contextLength);
    const end = Math.min(content.length, index + searchString.length + contextLength);
    
    return content.substring(start, end).replace(/\s+/g, ' ').trim();
  }

  generateReport() {
    console.log('\n' + colors.cyan + '=' .repeat(80) + colors.reset);
    console.log(colors.cyan + 'TEMPLATE QUALITY VALIDATION REPORT' + colors.reset);
    console.log(colors.cyan + '=' .repeat(80) + colors.reset);

    // Summary statistics
    console.log('\n' + colors.blue + '📊 Summary Statistics:' + colors.reset);
    console.log(`  Total files scanned: ${colors.cyan}${this.results.totalFiles}${colors.reset}`);
    console.log(`  Placeholder templates: ${colors.yellow}${this.results.placeholderTemplates}${colors.reset}`);
    console.log(`  Files with issues: ${colors.yellow}${this.results.filesWithIssues}${colors.reset}`);
    console.log(`  Total issues found: ${colors.red}${this.results.totalIssues}${colors.reset}`);

    // Issue breakdown by type
    console.log('\n' + colors.blue + '📈 Issues by Type:' + colors.reset);
    const issueTypes = {};
    
    Object.values(this.results.fileIssues).forEach(issues => {
      issues.forEach(issue => {
        issueTypes[issue.type] = (issueTypes[issue.type] || 0) + 1;
      });
    });

    Object.entries(issueTypes).forEach(([type, count]) => {
      const icon = this.getIssueIcon(type);
      console.log(`  ${icon} ${type}: ${colors.yellow}${count}${colors.reset}`);
    });

    // Files with most issues
    const sortedFiles = Object.entries(this.results.fileIssues)
      .sort((a, b) => b[1].length - a[1].length)
      .slice(0, 10);

    if (sortedFiles.length > 0) {
      console.log('\n' + colors.blue + '⚠️  Files with Most Issues (Top 10):' + colors.reset);
      sortedFiles.forEach(([file, issues]) => {
        console.log(`  ${colors.gray}${file}${colors.reset}: ${colors.red}${issues.length} issues${colors.reset}`);
        
        // Group issues by type for this file
        const typeCount = {};
        issues.forEach(issue => {
          typeCount[issue.type] = (typeCount[issue.type] || 0) + 1;
        });
        
        Object.entries(typeCount).forEach(([type, count]) => {
          console.log(`    ${colors.gray}└─ ${type}: ${count}${colors.reset}`);
        });
      });
    }

    // Recommendations
    console.log('\n' + colors.blue + '💡 Recommendations:' + colors.reset);
    
    if (issueTypes['generic-placeholder'] > 0) {
      console.log(`  ${colors.yellow}•${colors.reset} Replace generic placeholders with realistic, contextual data`);
    }
    
    if (issueTypes['accessibility'] > 0) {
      console.log(`  ${colors.yellow}•${colors.reset} Add missing accessibility attributes (alt, labels, ARIA)`);
    }
    
    if (issueTypes['responsive'] > 0) {
      console.log(`  ${colors.yellow}•${colors.reset} Implement responsive breakpoints and overflow handling`);
    }
    
    if (issueTypes['content-quality'] > 0) {
      console.log(`  ${colors.yellow}•${colors.reset} Use realistic government-scale data and helpful error messages`);
    }

    if (this.results.placeholderTemplates > 0) {
      console.log(`  ${colors.yellow}•${colors.reset} Complete ${this.results.placeholderTemplates} placeholder templates`);
    }

    // Success message if no issues
    if (this.results.totalIssues === 0 && this.results.placeholderTemplates === 0) {
      console.log('\n' + colors.green + '✅ All templates pass quality validation!' + colors.reset);
    } else {
      console.log('\n' + colors.yellow + `📝 Action needed: Address ${this.results.totalIssues} issues and complete ${this.results.placeholderTemplates} placeholder templates` + colors.reset);
    }

    console.log('\n' + colors.cyan + '=' .repeat(80) + colors.reset);

    // Export detailed report
    this.exportDetailedReport();
  }

  exportDetailedReport() {
    const reportPath = path.join(process.cwd(), 'validation-report.json');
    const report = {
      timestamp: new Date().toISOString(),
      summary: {
        totalFiles: this.results.totalFiles,
        filesWithIssues: this.results.filesWithIssues,
        placeholderTemplates: this.results.placeholderTemplates,
        totalIssues: this.results.totalIssues
      },
      issues: this.results.fileIssues
    };

    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log(`\n${colors.gray}Detailed report saved to: ${reportPath}${colors.reset}`);
  }

  getIssueIcon(type) {
    const icons = {
      'generic-placeholder': '📝',
      'accessibility': '♿',
      'responsive': '📱',
      'content-quality': '✍️',
      'visual-hierarchy': '👁️',
      'performance': '⚡'
    };
    return icons[type] || '•';
  }

  run(pattern = 'templates/**/*.html') {
    console.log(colors.blue + '🔍 Starting template validation...' + colors.reset);
    
    const files = glob.sync(pattern, { 
      ignore: ['**/node_modules/**', '**/dist/**', '**/build/**'] 
    });

    console.log(`Found ${files.length} template files to validate\n`);

    const progressBar = this.createProgressBar(files.length);

    files.forEach((file, index) => {
      this.results.totalFiles++;
      const result = this.validateFile(file);
      
      progressBar.update(index + 1);
      
      if (result.issues.length > 0 && process.env.VERBOSE) {
        console.log(`\n${colors.yellow}Issues in ${result.fileName}:${colors.reset}`);
        result.issues.forEach(issue => {
          console.log(`  ${colors.red}[${issue.severity}]${colors.reset} ${issue.message}`);
        });
      }
    });

    progressBar.complete();
    this.generateReport();
  }

  createProgressBar(total) {
    let current = 0;
    const barLength = 40;

    return {
      update: (value) => {
        current = value;
        const percentage = Math.floor((current / total) * 100);
        const filled = Math.floor((current / total) * barLength);
        const bar = '█'.repeat(filled) + '░'.repeat(barLength - filled);
        
        process.stdout.write(`\r${colors.cyan}Progress: [${bar}] ${percentage}% (${current}/${total})${colors.reset}`);
      },
      complete: () => {
        console.log('\n');
      }
    };
  }
}

// Run the validator
if (import.meta.url === `file://${process.argv[1]}`) {
  const validator = new TemplateValidator();
  const pattern = process.argv[2] || 'templates/**/*.html';
  
  // Set verbose mode if flag is present
  if (process.argv.includes('--verbose') || process.argv.includes('-v')) {
    process.env.VERBOSE = 'true';
  }

  validator.run(pattern);
  
  // Exit with error code if issues found
  if (validator.results.totalIssues > 0) {
    process.exit(1);
  }
}

export default TemplateValidator;