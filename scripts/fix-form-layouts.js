#!/usr/bin/env node

/**
 * Form Layout Fix Script
 * Applies the successful Federal Facility Finder form patterns across all templates
 */

import fs from 'fs';
import path from 'path';
import { glob } from 'glob';

// Form layout issues to detect and fix
const FORM_ISSUES = [
  {
    name: 'fieldset-legend-mismatch',
    description: 'Fieldset legends creating visual hierarchy mismatches',
    detect: (content) => {
      // Look for fieldsets with single checkboxes/radios that should use usa-label instead
      const fieldsetPattern = /<fieldset[^>]*class="usa-fieldset"[^>]*>[\s\S]*?<legend[^>]*class="usa-legend"[^>]*>([^<]+)<\/legend>[\s\S]*?<div class="usa-checkbox">[\s\S]*?<\/fieldset>/gi;
      return fieldsetPattern.test(content);
    },
    fix: (content) => {
      // Convert simple fieldsets with single options to span labels
      return content.replace(
        /<fieldset[^>]*class="usa-fieldset"[^>]*>\s*<legend[^>]*class="usa-legend"[^>]*>([^<]+)<\/legend>\s*(<div class="usa-checkbox">[\s\S]*?<\/div>)\s*<\/fieldset>/gi,
        '<span class="usa-label">$1</span>\n$2'
      );
    }
  },
  
  {
    name: 'unbalanced-buttons',
    description: 'Oversized primary buttons next to normal secondary buttons',
    detect: (content) => {
      return content.includes('usa-button--big') && content.includes('usa-button--outline');
    },
    fix: (content) => {
      // Remove --big from buttons when there are multiple buttons
      return content.replace(
        /(<button[^>]*class="[^"]*usa-button)(\s+usa-button--big)([^"]*"[^>]*>[^<]*<\/button>[\s\S]*?<button[^>]*class="[^"]*usa-button[^"]*usa-button--outline)/gi,
        '$1$3'
      );
    }
  },

  {
    name: 'inconsistent-grid-gaps',
    description: 'Missing or inconsistent grid-gap usage',
    detect: (content) => {
      const hasGridRow = content.includes('grid-row');
      const hasGridGap = content.includes('grid-gap');
      return hasGridRow && !hasGridGap;
    },
    fix: (content) => {
      // Add grid-gap to grid-row elements that don't have it
      return content.replace(
        /class="grid-row"(?!\s+[^>]*grid-gap)/gi,
        'class="grid-row grid-gap"'
      );
    }
  },

  {
    name: 'missing-form-structure',
    description: 'Forms without proper usa-form class',
    detect: (content) => {
      const hasForm = /<form[^>]*>/i.test(content);
      const hasUSAForm = /<form[^>]*class="[^"]*usa-form/i.test(content);
      return hasForm && !hasUSAForm;
    },
    fix: (content) => {
      return content.replace(
        /<form([^>]*class="[^"]*)"([^>]*)>/gi,
        '<form$1 usa-form"$2>'
      ).replace(
        /<form([^>]*?)(?<!class="[^"]*)>/gi,
        '<form class="usa-form"$1>'
      );
    }
  },

  {
    name: 'narrow-multi-column-forms',
    description: 'Multi-column forms using usa-form without --large modifier',
    detect: (content) => {
      const hasUSAForm = /<form[^>]*class="[^"]*usa-form(?!\s*usa-form--large)/i.test(content);
      const hasGridColumns = /grid-col-\d+.*tablet:grid-col-[1-9](?:[^1]|1[01])/.test(content);
      return hasUSAForm && hasGridColumns;
    },
    fix: (content) => {
      return content.replace(
        /<form([^>]*class="[^"]*usa-form)(?!\s*usa-form--large)([^"]*)"([^>]*)>/gi,
        '<form$1 usa-form--large$2"$3>'
      );
    }
  },

  {
    name: 'improper-responsive-columns',
    description: 'Grid columns without mobile-first responsive classes',
    detect: (content) => {
      const hasGridCol = content.includes('grid-col-');
      const hasMobileFirst = content.includes('grid-col-12');
      return hasGridCol && !hasMobileFirst;
    },
    fix: (content) => {
      // Add mobile-first grid-col-12 to columns that don't have it
      return content.replace(
        /class="([^"]*)(tablet:|desktop:)grid-col-(\d+)([^"]*)"(?![^>]*grid-col-12)/gi,
        'class="$1grid-col-12 $2grid-col-$3$4"'
      );
    }
  }
];

// Scan for form templates
async function findFormTemplates() {
  const templateDirs = [
    'templates/plain/templates/forms/**/*.html',
    'templates/plain/templates/search/**/*.html',
    'templates/plain/templates/workflows/**/*.html',
    'templates/plain/templates/user-management/**/*.html'
  ];
  
  let allFiles = [];
  for (const pattern of templateDirs) {
    const files = await glob(pattern);
    allFiles = allFiles.concat(files);
  }
  
  return allFiles.filter(file => 
    !file.includes('node_modules') && 
    !file.includes('.git') &&
    fs.existsSync(file)
  );
}

// Analyze a template file
function analyzeTemplate(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const issues = [];
  
  for (const issue of FORM_ISSUES) {
    if (issue.detect(content)) {
      issues.push({
        type: issue.name,
        description: issue.description,
        fix: issue.fix
      });
    }
  }
  
  return { content, issues };
}

// Apply fixes to a template
function fixTemplate(filePath, analysis) {
  let { content } = analysis;
  let fixesApplied = [];
  
  for (const issue of analysis.issues) {
    const originalContent = content;
    content = issue.fix(content);
    
    if (content !== originalContent) {
      fixesApplied.push(issue.type);
    }
  }
  
  if (fixesApplied.length > 0) {
    fs.writeFileSync(filePath, content, 'utf8');
  }
  
  return fixesApplied;
}

// Generate report
function generateReport(results) {
  const report = {
    totalFiles: results.length,
    filesWithIssues: results.filter(r => r.issues.length > 0).length,
    filesFixed: results.filter(r => r.fixesApplied.length > 0).length,
    issueStats: {},
    details: results.filter(r => r.issues.length > 0)
  };
  
  // Count issue types
  for (const result of results) {
    for (const issue of result.issues) {
      report.issueStats[issue.type] = (report.issueStats[issue.type] || 0) + 1;
    }
  }
  
  return report;
}

// Main execution
async function main() {
  const dryRun = process.argv.includes('--dry-run');
  
  console.log('🔍 Scanning for form templates...');
  const templateFiles = await findFormTemplates();
  console.log(`Found ${templateFiles.length} template files`);
  
  const results = [];
  
  for (const filePath of templateFiles) {
    console.log(`Analyzing: ${filePath}`);
    const analysis = analyzeTemplate(filePath);
    
    let fixesApplied = [];
    if (!dryRun && analysis.issues.length > 0) {
      fixesApplied = fixTemplate(filePath, analysis);
    }
    
    results.push({
      file: filePath,
      issues: analysis.issues,
      fixesApplied
    });
  }
  
  const report = generateReport(results);
  
  console.log('\n📊 FORM LAYOUT FIX REPORT');
  console.log('========================');
  console.log(`Total files scanned: ${report.totalFiles}`);
  console.log(`Files with issues: ${report.filesWithIssues}`);
  if (!dryRun) {
    console.log(`Files fixed: ${report.filesFixed}`);
  }
  
  console.log('\nIssue types found:');
  for (const [issueType, count] of Object.entries(report.issueStats)) {
    console.log(`  ${issueType}: ${count} files`);
  }
  
  if (dryRun) {
    console.log('\n⚠️  DRY RUN MODE - No files were modified');
    console.log('Run without --dry-run to apply fixes');
  }
  
  // Save detailed report
  const reportPath = 'form-layout-fix-report.json';
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(`\nDetailed report saved to: ${reportPath}`);
}

// Check if this is the main module
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export { FORM_ISSUES, analyzeTemplate, fixTemplate };