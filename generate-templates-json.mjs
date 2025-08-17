import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read all template directories
const templatesDir = path.join(__dirname, 'templates/plain/templates');
const categories = fs.readdirSync(templatesDir).filter(f => fs.statSync(path.join(templatesDir, f)).isDirectory());

let templatesJson = {};

// Process each category
categories.forEach(category => {
  templatesJson[category] = {};
  
  const categoryDir = path.join(templatesDir, category);
  const templates = fs.readdirSync(categoryDir).filter(f => fs.statSync(path.join(categoryDir, f)).isDirectory());
  
  templates.forEach(template => {
    // Convert kebab-case to Title Case
    const name = template
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    templatesJson[category][template] = {
      name: name,
      available: ["plain"]
    };
  });
});

// Sort categories alphabetically
const sortedTemplates = Object.keys(templatesJson).sort().reduce((obj, key) => {
  obj[key] = templatesJson[key];
  return obj;
}, {});

// Write the updated templates.json
fs.writeFileSync(
  path.join(__dirname, 'showcase/templates.json'),
  JSON.stringify(sortedTemplates, null, 2)
);

console.log('Generated templates.json with:');
Object.keys(sortedTemplates).forEach(cat => {
  const count = Object.keys(sortedTemplates[cat]).length;
  console.log(`- ${cat}: ${count} templates`);
});
console.log(`\nTotal: ${Object.values(sortedTemplates).reduce((sum, cat) => sum + Object.keys(cat).length, 0)} templates`);