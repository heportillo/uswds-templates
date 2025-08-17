#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import * as cheerio from 'cheerio';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ANSI color codes for terminal output
const colors = {
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  reset: '\x1b[0m'
};

// Accessibility check results
const results = {
  totalFiles: 0,
  filesWithIssues: 0,
  totalIssues: 0,
  criticalIssues: 0,
  warnings: 0,
  issuesByType: {},
  fileIssues: []
};

// Check for accessibility issues in a single HTML file
function checkAccessibility(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const $ = cheerio.load(content);
  const issues = [];
  
  // Check 1: Images without alt text
  $('img:not([alt])').each((i, elem) => {
    const src = $(elem).attr('src') || 'unknown';
    issues.push({
      type: 'critical',
      category: 'missing-alt-text',
      message: `Image missing alt attribute: ${src}`,
      element: $.html(elem).substring(0, 100)
    });
  });
  
  // Check 2: Form inputs without labels or aria-label
  $('input:not([type="hidden"]):not([type="submit"]):not([type="button"])').each((i, elem) => {
    const $elem = $(elem);
    const id = $elem.attr('id');
    const ariaLabel = $elem.attr('aria-label');
    const ariaLabelledby = $elem.attr('aria-labelledby');
    const hasLabel = id && $(`label[for="${id}"]`).length > 0;
    
    if (!hasLabel && !ariaLabel && !ariaLabelledby) {
      issues.push({
        type: 'critical',
        category: 'missing-label',
        message: `Form input missing label or aria-label: ${$elem.attr('name') || $elem.attr('type') || 'unknown'}`,
        element: $.html(elem).substring(0, 100)
      });
    }
  });
  
  // Check 3: Select elements without labels
  $('select').each((i, elem) => {
    const $elem = $(elem);
    const id = $elem.attr('id');
    const ariaLabel = $elem.attr('aria-label');
    const ariaLabelledby = $elem.attr('aria-labelledby');
    const hasLabel = id && $(`label[for="${id}"]`).length > 0;
    
    if (!hasLabel && !ariaLabel && !ariaLabelledby) {
      issues.push({
        type: 'critical',
        category: 'missing-label',
        message: `Select element missing label or aria-label: ${$elem.attr('name') || 'unknown'}`,
        element: $.html(elem).substring(0, 100)
      });
    }
  });
  
  // Check 4: Textarea elements without labels
  $('textarea').each((i, elem) => {
    const $elem = $(elem);
    const id = $elem.attr('id');
    const ariaLabel = $elem.attr('aria-label');
    const ariaLabelledby = $elem.attr('aria-labelledby');
    const hasLabel = id && $(`label[for="${id}"]`).length > 0;
    
    if (!hasLabel && !ariaLabel && !ariaLabelledby) {
      issues.push({
        type: 'critical',
        category: 'missing-label',
        message: `Textarea missing label or aria-label: ${$elem.attr('name') || 'unknown'}`,
        element: $.html(elem).substring(0, 100)
      });
    }
  });
  
  // Check 5: Buttons without accessible text
  $('button').each((i, elem) => {
    const $elem = $(elem);
    const text = $elem.text().trim();
    const ariaLabel = $elem.attr('aria-label');
    const title = $elem.attr('title');
    
    if (!text && !ariaLabel && !title) {
      issues.push({
        type: 'critical',
        category: 'missing-button-text',
        message: 'Button missing accessible text or aria-label',
        element: $.html(elem).substring(0, 100)
      });
    }
  });
  
  // Check 6: Links without accessible text
  $('a').each((i, elem) => {
    const $elem = $(elem);
    const text = $elem.text().trim();
    const ariaLabel = $elem.attr('aria-label');
    const title = $elem.attr('title');
    
    if (!text && !ariaLabel && !title) {
      // Check if it contains an image with alt text
      const imgAlt = $elem.find('img[alt]').attr('alt');
      if (!imgAlt) {
        issues.push({
          type: 'critical',
          category: 'missing-link-text',
          message: 'Link missing accessible text or aria-label',
          element: $.html(elem).substring(0, 100)
        });
      }
    }
  });
  
  // Check 7: Tables without proper headers
  $('table').each((i, elem) => {
    const $table = $(elem);
    const hasCaption = $table.find('caption').length > 0;
    const hasTh = $table.find('th').length > 0;
    const hasScope = $table.find('th[scope]').length > 0;
    
    if (!hasCaption) {
      issues.push({
        type: 'warning',
        category: 'missing-table-caption',
        message: 'Table missing caption element',
        element: '<table>...'
      });
    }
    
    if (!hasTh) {
      issues.push({
        type: 'critical',
        category: 'missing-table-headers',
        message: 'Table missing header cells (th elements)',
        element: '<table>...'
      });
    } else if (!hasScope) {
      issues.push({
        type: 'warning',
        category: 'missing-scope',
        message: 'Table headers missing scope attribute',
        element: '<table>...'
      });
    }
  });
  
  // Check 8: Fieldsets without legends
  $('fieldset').each((i, elem) => {
    const $fieldset = $(elem);
    const hasLegend = $fieldset.find('legend').length > 0;
    
    if (!hasLegend) {
      issues.push({
        type: 'warning',
        category: 'missing-legend',
        message: 'Fieldset missing legend element',
        element: $.html(elem).substring(0, 100)
      });
    }
  });
  
  // Check 9: Skip navigation link
  const hasSkipNav = $('a[href="#main-content"]').length > 0 || 
                     $('.usa-skipnav').length > 0;
  if (!hasSkipNav) {
    issues.push({
      type: 'warning',
      category: 'missing-skip-nav',
      message: 'Page missing skip navigation link',
      element: 'N/A'
    });
  }
  
  // Check 10: Main landmark
  const hasMain = $('main').length > 0 || $('[role="main"]').length > 0;
  if (!hasMain) {
    issues.push({
      type: 'critical',
      category: 'missing-main',
      message: 'Page missing main landmark',
      element: 'N/A'
    });
  }
  
  // Check 11: Custom CSS classes (non-USWDS)
  const customClasses = [];
  $('[class]').each((i, elem) => {
    const classes = $(elem).attr('class').split(' ');
    classes.forEach(cls => {
      if (cls && !cls.startsWith('usa-') && !cls.startsWith('grid-') && 
          !cls.startsWith('tablet:') && !cls.startsWith('desktop:') && 
          !cls.startsWith('mobile:') && !cls.startsWith('widescreen:') &&
          !['container', 'row', 'col'].includes(cls)) {
        if (!customClasses.includes(cls)) {
          customClasses.push(cls);
        }
      }
    });
  });
  
  if (customClasses.length > 0) {
    issues.push({
      type: 'warning',
      category: 'custom-css',
      message: `Non-USWDS classes found: ${customClasses.join(', ')}`,
      element: 'Various elements'
    });
  }
  
  // Check 12: Form validation attributes
  $('input[required], select[required], textarea[required]').each((i, elem) => {
    const $elem = $(elem);
    const ariaRequired = $elem.attr('aria-required');
    const ariaInvalid = $elem.attr('aria-invalid');
    
    if (!ariaRequired) {
      issues.push({
        type: 'warning',
        category: 'missing-aria-required',
        message: `Required field missing aria-required attribute: ${$elem.attr('name') || $elem.attr('id') || 'unknown'}`,
        element: $.html(elem).substring(0, 100)
      });
    }
  });
  
  return issues;
}

// Recursively find all HTML files
function findHtmlFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
      findHtmlFiles(filePath, fileList);
    } else if (file.endsWith('.html')) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

// Main audit function
function runAudit() {
  console.log(`${colors.blue}Starting USWDS Accessibility Audit...${colors.reset}\n`);
  
  const templatesDir = path.join(__dirname, '..', 'templates', 'plain', 'templates');
  const htmlFiles = findHtmlFiles(templatesDir);
  
  results.totalFiles = htmlFiles.length;
  
  htmlFiles.forEach(file => {
    const relativePath = path.relative(process.cwd(), file);
    const issues = checkAccessibility(file);
    
    if (issues.length > 0) {
      results.filesWithIssues++;
      results.totalIssues += issues.length;
      
      const fileResult = {
        path: relativePath,
        issues: issues,
        criticalCount: 0,
        warningCount: 0
      };
      
      issues.forEach(issue => {
        if (issue.type === 'critical') {
          results.criticalIssues++;
          fileResult.criticalCount++;
        } else {
          results.warnings++;
          fileResult.warningCount++;
        }
        
        if (!results.issuesByType[issue.category]) {
          results.issuesByType[issue.category] = 0;
        }
        results.issuesByType[issue.category]++;
      });
      
      results.fileIssues.push(fileResult);
    }
  });
  
  // Sort files by number of critical issues
  results.fileIssues.sort((a, b) => b.criticalCount - a.criticalCount);
  
  // Display results
  console.log(`${colors.blue}═══════════════════════════════════════════════════════${colors.reset}`);
  console.log(`${colors.blue}                  AUDIT SUMMARY                        ${colors.reset}`);
  console.log(`${colors.blue}═══════════════════════════════════════════════════════${colors.reset}\n`);
  
  console.log(`Total files scanned: ${results.totalFiles}`);
  console.log(`Files with issues: ${colors.yellow}${results.filesWithIssues}${colors.reset}`);
  console.log(`Total issues found: ${colors.yellow}${results.totalIssues}${colors.reset}`);
  console.log(`Critical issues: ${colors.red}${results.criticalIssues}${colors.reset}`);
  console.log(`Warnings: ${colors.yellow}${results.warnings}${colors.reset}\n`);
  
  console.log(`${colors.blue}Issues by Type:${colors.reset}`);
  Object.entries(results.issuesByType)
    .sort((a, b) => b[1] - a[1])
    .forEach(([type, count]) => {
      const color = type.includes('missing') ? colors.red : colors.yellow;
      console.log(`  ${color}${type}: ${count}${colors.reset}`);
    });
  
  console.log(`\n${colors.blue}Top 10 Files with Most Critical Issues:${colors.reset}`);
  results.fileIssues.slice(0, 10).forEach(file => {
    console.log(`\n${colors.yellow}${file.path}${colors.reset}`);
    console.log(`  Critical: ${colors.red}${file.criticalCount}${colors.reset}, Warnings: ${colors.yellow}${file.warningCount}${colors.reset}`);
    
    // Show first 3 issues for each file
    file.issues.slice(0, 3).forEach(issue => {
      const color = issue.type === 'critical' ? colors.red : colors.yellow;
      console.log(`  ${color}• ${issue.message}${colors.reset}`);
    });
    
    if (file.issues.length > 3) {
      console.log(`  ... and ${file.issues.length - 3} more issues`);
    }
  });
  
  // Save detailed report to JSON
  const reportPath = path.join(__dirname, '..', 'accessibility-audit-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
  console.log(`\n${colors.green}Detailed report saved to: ${reportPath}${colors.reset}`);
  
  // Exit with error code if critical issues found
  if (results.criticalIssues > 0) {
    console.log(`\n${colors.red}Audit failed with ${results.criticalIssues} critical issues${colors.reset}`);
    process.exit(1);
  } else if (results.warnings > 0) {
    console.log(`\n${colors.yellow}Audit completed with ${results.warnings} warnings${colors.reset}`);
  } else {
    console.log(`\n${colors.green}Audit passed with no issues!${colors.reset}`);
  }
}

// Run the audit
runAudit();