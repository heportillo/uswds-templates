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
  reset: '\x1b[0m'
};

let totalFixed = 0;
let filesModified = 0;

// Fix aria-required attributes in HTML file
function fixAriaRequired(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const $ = cheerio.load(content, { decodeEntities: false });
  let modified = false;
  
  // Find all required form fields without aria-required
  $('input[required]:not([aria-required]), select[required]:not([aria-required]), textarea[required]:not([aria-required])').each((i, elem) => {
    const $elem = $(elem);
    $elem.attr('aria-required', 'true');
    modified = true;
    totalFixed++;
  });
  
  if (modified) {
    filesModified++;
    const html = $.html();
    fs.writeFileSync(filePath, html);
    return true;
  }
  
  return false;
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
  console.log(`${colors.blue}Adding aria-required attributes to form fields...${colors.reset}\n`);
  
  const templatesDir = path.join(__dirname, '..', 'templates', 'plain', 'templates');
  const htmlFiles = findHtmlFiles(templatesDir);
  
  htmlFiles.forEach(file => {
    const relativePath = path.relative(process.cwd(), file);
    if (fixAriaRequired(file)) {
      console.log(`${colors.green}✓${colors.reset} Fixed: ${relativePath}`);
    }
  });
  
  console.log(`\n${colors.blue}Summary:${colors.reset}`);
  console.log(`Files modified: ${colors.yellow}${filesModified}${colors.reset}`);
  console.log(`Total fields fixed: ${colors.green}${totalFixed}${colors.reset}`);
}

// Run the script
main();