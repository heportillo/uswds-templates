#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import * as cheerio from 'cheerio';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ANSI color codes
const colors = {
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
  reset: '\x1b[0m'
};

// Custom CSS class mappings to USWDS equivalents
const classReplacements = {
  // Custom animation and interaction classes
  'animate-on-load': '',
  'focus-ring-enhanced': '',
  
  // Custom color classes
  'bg-primary': '',
  'bg-secondary': '',
  'bg-success': '',
  'bg-info': '',
  'bg-warning': '',
  'bg-error': '',
  'bg-accent-warm': '',
  'bg-accent-cool': '',
  'bg-base-lighter': '',
  'bg-base-lightest': '',
  'bg-indigo-warm-60v': '',
  'bg-violet-60v': '',
  'bg-blue-60v': '',
  'bg-cyan-40v': '',
  
  // Custom text classes
  'text-ink': '',
  'text-base': '',
  'text-base-dark': '',
  'text-bold': '',
  'text-success': '',
  'text-error': '',
  'text-right': 'text-right',  // Keep this one as it's valid USWDS
  
  // Custom spacing classes - convert to USWDS
  'margin-top-4': '',
  'margin-top-3': '',
  'margin-top-2': '',
  'margin-top-6': '',
  'margin-top-5': '',
  'margin-top-05': '',
  'margin-bottom-2': '',
  'margin-bottom-3': '',
  'margin-bottom-1': '',
  'margin-left-1': '',
  'margin-left-auto': '',
  'margin-0': '',
  'margin-y-0': 'margin-y-0',  // Keep this one as it's valid USWDS
  'padding-y-3': '',
  'padding-y-1': 'padding-y-1',  // Keep this one as it's valid USWDS
  'padding-top-4': '',
  
  // Custom layout classes
  'width-full': '',
  'width-auto': '',
  'display-flex': 'display-flex',  // Keep this one as it's valid USWDS
  'flex-justify': 'flex-justify-space-between',
  'flex-align-center': 'flex-align-center',  // Keep this one as it's valid USWDS
  'flex-justify-space-between': 'flex-justify-space-between',  // Keep this one
  
  // Custom typography classes
  'font-heading-xl': 'font-sans-3xl',
  'font-body-lg': '',
  'font-sans-2xl': 'font-sans-2xl',  // Keep this one as it's valid USWDS
  'font-sans-lg': 'font-sans-lg',  // Keep this one as it's valid USWDS
  
  // Border classes
  'border-top-1px': 'border-top',
  'border-bottom-1px': 'border-bottom',
  'border-base-light': '',
  'border-base-lighter': '',
  
  // Mobile/responsive classes that aren't standard USWDS
  'mobile-lg:grid-col-8': 'tablet:grid-col-8',
  'mobile-lg:grid-col-4': 'tablet:grid-col-4',
  'mobile-lg:grid-col-12': 'tablet:grid-col-12',
  'mobile-lg:grid-col-auto': 'tablet:grid-col-auto'
};

let totalClassesRemoved = 0;
let filesModified = 0;

// Clean custom CSS classes from HTML file
function cleanCustomClasses(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const $ = cheerio.load(content, { decodeEntities: false });
  let modified = false;
  const removedClasses = new Set();
  
  // Find all elements with class attribute
  $('[class]').each((i, elem) => {
    const $elem = $(elem);
    const originalClasses = $elem.attr('class');
    if (!originalClasses) return;
    
    const classes = originalClasses.split(/\s+/).filter(c => c);
    const newClasses = [];
    
    classes.forEach(cls => {
      if (classReplacements.hasOwnProperty(cls)) {
        const replacement = classReplacements[cls];
        if (replacement) {
          // Replace with USWDS equivalent
          if (!newClasses.includes(replacement)) {
            newClasses.push(replacement);
          }
        }
        // Track removed class
        removedClasses.add(cls);
        modified = true;
      } else if (isValidUswdsClass(cls)) {
        // Keep valid USWDS classes
        newClasses.push(cls);
      } else {
        // Remove unknown custom class
        removedClasses.add(cls);
        modified = true;
      }
    });
    
    if (newClasses.length > 0) {
      $elem.attr('class', newClasses.join(' '));
    } else {
      $elem.removeAttr('class');
    }
  });
  
  if (modified) {
    filesModified++;
    totalClassesRemoved += removedClasses.size;
    const html = $.html();
    fs.writeFileSync(filePath, html);
    return removedClasses;
  }
  
  return null;
}

// Check if a class is a valid USWDS class
function isValidUswdsClass(cls) {
  // USWDS class patterns
  return cls.startsWith('usa-') ||
         cls.startsWith('grid-') ||
         cls.startsWith('tablet:') ||
         cls.startsWith('desktop:') ||
         cls.startsWith('mobile:') ||
         cls.startsWith('widescreen:') ||
         cls === 'container' ||
         cls === 'row' ||
         cls === 'col' ||
         // Valid USWDS utility classes
         cls === 'display-flex' ||
         cls === 'flex-justify-space-between' ||
         cls === 'flex-align-center' ||
         cls === 'text-center' ||
         cls === 'text-right' ||
         cls === 'text-left' ||
         cls === 'margin-y-0' ||
         cls === 'margin-x-0' ||
         cls === 'padding-y-1' ||
         cls === 'padding-y-2' ||
         cls === 'padding-x-1' ||
         cls === 'padding-x-2' ||
         cls === 'border-top' ||
         cls === 'border-bottom' ||
         cls === 'border-left' ||
         cls === 'border-right' ||
         cls.startsWith('font-sans-') ||
         cls.startsWith('font-serif-') ||
         cls.startsWith('font-mono-');
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

// Main function
function main() {
  console.log(`${colors.blue}Removing custom CSS classes and replacing with USWDS...${colors.reset}\n`);
  
  const templatesDir = path.join(__dirname, '..', 'templates', 'plain', 'templates');
  const htmlFiles = findHtmlFiles(templatesDir);
  
  const allRemovedClasses = new Set();
  
  htmlFiles.forEach(file => {
    const relativePath = path.relative(process.cwd(), file);
    const removedClasses = cleanCustomClasses(file);
    
    if (removedClasses) {
      console.log(`${colors.green}✓${colors.reset} Cleaned: ${relativePath}`);
      console.log(`  ${colors.yellow}Removed: ${Array.from(removedClasses).join(', ')}${colors.reset}`);
      removedClasses.forEach(cls => allRemovedClasses.add(cls));
    }
  });
  
  console.log(`\n${colors.blue}Summary:${colors.reset}`);
  console.log(`Files modified: ${colors.yellow}${filesModified}${colors.reset}`);
  console.log(`Unique custom classes removed: ${colors.green}${allRemovedClasses.size}${colors.reset}`);
  
  if (allRemovedClasses.size > 0) {
    console.log(`\n${colors.blue}All removed classes:${colors.reset}`);
    Array.from(allRemovedClasses).sort().forEach(cls => {
      console.log(`  ${colors.red}- ${cls}${colors.reset}`);
    });
  }
}

// Run the script
main();