#!/usr/bin/env node

/**
 * Form Template Generator
 * Creates new USWDS form templates using our proven layout patterns
 */

import fs from 'fs';
import path from 'path';

// Form layout patterns based on our success
const FORM_PATTERNS = {
  twoFields: {
    name: 'Two Equal Fields',
    html: `        <div class="grid-row grid-gap">
          <div class="grid-col-12 tablet:grid-col-6">
            <label class="usa-label" for="{{field1Id}}">{{field1Label}}</label>
            {{field1Input}}
          </div>
          
          <div class="grid-col-12 tablet:grid-col-6">
            <label class="usa-label" for="{{field2Id}}">{{field2Label}}</label>
            {{field2Input}}
          </div>
        </div>`
  },

  fieldPlusOptions: {
    name: 'Field + Options Group',
    html: `        <div class="grid-row grid-gap">
          <div class="grid-col-12 tablet:grid-col-4">
            <label class="usa-label" for="{{fieldId}}">{{fieldLabel}}</label>
            {{fieldInput}}
          </div>
          
          <div class="grid-col-12 tablet:grid-col-8">
            <span class="usa-label">{{optionsLabel}}</span>
            {{optionsGroup}}
          </div>
        </div>`
  },

  threeFields: {
    name: 'Three Equal Fields',
    html: `        <div class="grid-row grid-gap">
          <div class="grid-col-12 tablet:grid-col-4">
            <label class="usa-label" for="{{field1Id}}">{{field1Label}}</label>
            {{field1Input}}
          </div>
          
          <div class="grid-col-12 tablet:grid-col-4">
            <label class="usa-label" for="{{field2Id}}">{{field2Label}}</label>
            {{field2Input}}
          </div>
          
          <div class="grid-col-12 tablet:grid-col-4">
            <label class="usa-label" for="{{field3Id}}">{{field3Label}}</label>
            {{field3Input}}
          </div>
        </div>`
  },

  singleField: {
    name: 'Single Full Width Field',
    html: `        <div class="grid-row grid-gap">
          <div class="grid-col-12">
            <label class="usa-label" for="{{fieldId}}">{{fieldLabel}}</label>
            {{fieldInput}}
          </div>
        </div>`
  }
};

// Input types
const INPUT_TYPES = {
  text: '<input class="usa-input" id="{{id}}" name="{{name}}" type="text"{{placeholder}}{{required}}>',
  email: '<input class="usa-input" id="{{id}}" name="{{name}}" type="email"{{placeholder}}{{required}}>',
  tel: '<input class="usa-input" id="{{id}}" name="{{name}}" type="tel"{{placeholder}}{{required}}>',
  select: `<select class="usa-select" id="{{id}}" name="{{name}}"{{required}}>
              {{options}}
            </select>`,
  textarea: '<textarea class="usa-textarea" id="{{id}}" name="{{name}}"{{placeholder}}{{required}}></textarea>',
  checkbox: `<div class="usa-checkbox">
              <input class="usa-checkbox__input" id="{{id}}" type="checkbox" name="{{name}}" value="{{value}}">
              <label class="usa-checkbox__label" for="{{id}}">{{label}}</label>
            </div>`,
  radio: `<div class="usa-radio">
            <input class="usa-radio__input" id="{{id}}" type="radio" name="{{name}}" value="{{value}}">
            <label class="usa-radio__label" for="{{id}}">{{label}}</label>
          </div>`
};

// Base template structure
const BASE_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{title}}</title>
  <meta name="description" content="{{description}}">
  
  <!-- USWDS CSS -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@uswds/uswds@3.9.0/dist/css/uswds.min.css">
</head>
<body>
  <!-- Government banner -->
  <section class="usa-banner" aria-label="Official website of the United States government">
    <div class="usa-accordion">
      <header class="usa-banner__header">
        <div class="usa-banner__inner">
          <div class="grid-col-auto">
            <img aria-hidden="true" class="usa-banner__header-flag" src="https://cdn.jsdelivr.net/npm/@uswds/uswds@3.9.0/dist/img/us_flag_small.png" alt="">
          </div>
          <div class="grid-col-fill tablet:grid-col-auto" aria-hidden="true">
            <p class="usa-banner__header-text">An official website of the United States government</p>
            <p class="usa-banner__header-action">Here's how you know</p>
          </div>
          <button type="button" class="usa-accordion__button usa-banner__button" aria-expanded="false" aria-controls="gov-banner-default">
            <span class="usa-banner__button-text">Here's how you know</span>
          </button>
        </div>
      </header>
      <div class="usa-banner__content usa-accordion__content" id="gov-banner-default">
        <div class="grid-row grid-gap-lg">
          <div class="usa-banner__guidance tablet:grid-col-6">
            <img class="usa-banner__icon usa-media-block__img" src="https://cdn.jsdelivr.net/npm/@uswds/uswds@3.9.0/dist/img/icon-dot-gov.svg" role="img" alt="" aria-hidden="true">
            <div class="usa-media-block__body">
              <p>
                <strong>Official websites use .gov</strong>
                <br/>
                A <strong>.gov</strong> website belongs to an official government organization in the United States.
              </p>
            </div>
          </div>
          <div class="usa-banner__guidance tablet:grid-col-6">
            <img class="usa-banner__icon usa-media-block__img" src="https://cdn.jsdelivr.net/npm/@uswds/uswds@3.9.0/dist/img/icon-https.svg" role="img" alt="" aria-hidden="true">
            <div class="usa-media-block__body">
              <p>
                <strong>Secure .gov websites use HTTPS</strong>
                <br/>
                A <strong>lock</strong> or <strong>https://</strong> means you've safely connected to the .gov website.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Skip navigation -->
  <a class="usa-skipnav" href="#main-content">Skip to main content</a>

  <!-- Header -->
  <header class="usa-header usa-header--extended">
    <div class="usa-navbar">
      <div class="usa-logo">
        <em class="usa-logo__text">
          <a href="/" title="{{title}}">{{title}}</a>
        </em>
      </div>
      <button type="button" class="usa-menu-btn">Menu</button>
    </div>
    <nav aria-label="Primary navigation" class="usa-nav">
      <div class="usa-nav__inner">
        <button type="button" class="usa-nav__close">
          <img src="https://cdn.jsdelivr.net/npm/@uswds/uswds@3.9.0/dist/img/usa-icons/close.svg" role="img" alt="Close">
        </button>
        <ul class="usa-nav__primary usa-accordion">
          <li class="usa-nav__primary-item">
            <a href="#" class="usa-nav-link usa-current">
              <span>{{navCurrent}}</span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </header>

  <!-- Main content -->
  <main id="main-content">
    <section class="grid-container padding-y-3">
      <h1 class="font-sans-2xl margin-bottom-2">{{heading}}</h1>
      <div class="usa-alert usa-alert--info margin-bottom-3">
        <div class="usa-alert__body">
          <p class="usa-alert__text">{{alertText}}</p>
        </div>
      </div>

      <!-- Form -->
      <form class="usa-form usa-form--large">
{{formRows}}

        <!-- Action Buttons -->
        <div class="grid-row">
          <div class="grid-col-12">
            <button type="submit" class="usa-button">{{submitText}}</button>
            {{secondaryButtons}}
          </div>
        </div>
      </form>
    </section>
  </main>

  <!-- Footer -->
  <footer class="usa-footer usa-footer--slim">
    <div class="grid-container usa-footer__return-to-top">
      <a href="#">Return to top</a>
    </div>
    <div class="usa-footer__primary-section">
      <div class="grid-container">
        <div class="usa-footer__primary-container grid-row">
          <div class="mobile-lg:grid-col-8">
            <nav class="usa-footer__nav" aria-label="Footer navigation">
              <ul class="grid-row grid-gap">
                <li class="mobile-lg:grid-col-auto usa-footer__primary-content">
                  <a class="usa-footer__primary-link" href="#">About</a>
                </li>
                <li class="mobile-lg:grid-col-auto usa-footer__primary-content">
                  <a class="usa-footer__primary-link" href="#">Accessibility</a>
                </li>
                <li class="mobile-lg:grid-col-auto usa-footer__primary-content">
                  <a class="usa-footer__primary-link" href="#">Privacy Policy</a>
                </li>
                <li class="mobile-lg:grid-col-auto usa-footer__primary-content">
                  <a class="usa-footer__primary-link" href="#">Contact</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </footer>

  <!-- USWDS JavaScript -->
  <script src="https://cdn.jsdelivr.net/npm/@uswds/uswds@3.9.0/dist/js/uswds.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/@uswds/uswds@3.9.0/dist/js/uswds-init.min.js"></script>
</body>
</html>`;

function generateTemplate(config) {
  const {
    title,
    description,
    heading,
    alertText,
    navCurrent,
    submitText,
    secondaryButtons = '',
    formRows
  } = config;

  let html = BASE_TEMPLATE;
  
  // Replace template variables
  html = html.replace(/\{\{title\}\}/g, title);
  html = html.replace(/\{\{description\}\}/g, description);
  html = html.replace(/\{\{heading\}\}/g, heading);
  html = html.replace(/\{\{alertText\}\}/g, alertText);
  html = html.replace(/\{\{navCurrent\}\}/g, navCurrent);
  html = html.replace(/\{\{submitText\}\}/g, submitText);
  html = html.replace(/\{\{secondaryButtons\}\}/g, secondaryButtons);
  html = html.replace(/\{\{formRows\}\}/g, formRows);

  return html;
}

// CLI interface
function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0 || args.includes('--help')) {
    console.log(`
Form Template Generator

Usage:
  node generate-form-template.js <template-name> [options]

Examples:
  node generate-form-template.js contact-form
  node generate-form-template.js benefits-application --output templates/plain/templates/forms/

Options:
  --output <dir>    Output directory (default: current directory)
  --config <file>   JSON config file with form definition
  --help           Show this help

Available patterns:
  - twoFields: Two equal width fields
  - fieldPlusOptions: Field + options group (like search + filters)
  - threeFields: Three equal width fields  
  - singleField: Single full width field
    `);
    return;
  }

  const templateName = args[0];
  const outputDir = args.includes('--output') ? args[args.indexOf('--output') + 1] : '.';
  
  // Example configuration (can be loaded from file)
  const config = {
    title: `${templateName.split('-').map(w => w[0].toUpperCase() + w.slice(1)).join(' ')}`,
    description: `Federal ${templateName} template using USWDS standards`,
    heading: `${templateName.split('-').map(w => w[0].toUpperCase() + w.slice(1)).join(' ')}`,
    alertText: 'Complete all required fields marked with an asterisk (*)',
    navCurrent: 'Form',
    submitText: 'Submit Application',
    formRows: `
        <!-- Row 1: Two Equal Fields -->
        <div class="grid-row grid-gap">
          <div class="grid-col-12 tablet:grid-col-6">
            <label class="usa-label" for="first-name">First Name *</label>
            <input class="usa-input" id="first-name" name="first-name" type="text" required>
          </div>
          
          <div class="grid-col-12 tablet:grid-col-6">
            <label class="usa-label" for="last-name">Last Name *</label>
            <input class="usa-input" id="last-name" name="last-name" type="text" required>
          </div>
        </div>

        <!-- Row 2: Field + Options -->
        <div class="grid-row grid-gap">
          <div class="grid-col-12 tablet:grid-col-6">
            <label class="usa-label" for="email">Email Address *</label>
            <input class="usa-input" id="email" name="email" type="email" required>
          </div>
          
          <div class="grid-col-12 tablet:grid-col-6">
            <span class="usa-label">Contact Preferences</span>
            <div class="usa-checkbox">
              <input class="usa-checkbox__input" id="email-updates" type="checkbox" name="preferences" value="email">
              <label class="usa-checkbox__label" for="email-updates">Email updates</label>
            </div>
          </div>
        </div>
`
  };

  const html = generateTemplate(config);
  const outputPath = path.join(outputDir, `${templateName}.html`);
  
  fs.writeFileSync(outputPath, html, 'utf8');
  
  console.log(`✅ Generated form template: ${outputPath}`);
  console.log(`📋 Applied proven layout patterns from Federal Facility Finder success`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { generateTemplate, FORM_PATTERNS, INPUT_TYPES };