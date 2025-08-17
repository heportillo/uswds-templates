# USWDS Template Quality Enhancements

## Overview
Systematic quality improvements for all 240+ USWDS templates based on design excellence and emotional intelligence principles.

## 1. CSS Enhancement Library
**File:** `templates/plain/assets/css/uswds-enhancements.css`

### Features:
- **Text Overflow Handling:** Elegant truncation classes for preventing layout breaks
- **Loading States:** Skeleton loaders, spinners, and pulse animations
- **Entrance Animations:** Subtle fade-in and stagger effects
- **Responsive Utilities:** Clamp-based font sizing and optimal reading widths
- **Interaction States:** Enhanced hover, focus, and touch targets
- **Performance Optimizations:** GPU acceleration and reduced motion support

### Usage:
```html
<!-- Add to template <head> -->
<link rel="stylesheet" href="/assets/css/uswds-enhancements.css">

<!-- Apply classes -->
<h2 class="card-title-safe">Long title that won't break layout</h2>
<div class="skeleton-loading skeleton-text"></div>
<div class="animate-on-load">Content with entrance animation</div>
```

## 2. Template Validation Script
**File:** `scripts/validate-templates.js`

### Features:
- Checks for generic placeholders (METRIC1_VALUE, Lorem ipsum)
- Validates accessibility attributes (alt text, labels, ARIA)
- Verifies responsive layouts and breakpoints
- Assesses content quality and realistic data usage
- Reviews visual hierarchy and performance

### Usage:
```bash
# Validate all templates
node scripts/validate-templates.js

# Validate specific directory
node scripts/validate-templates.js "templates/plain/templates/dashboards/**/*.html"

# Verbose mode (show all issues)
node scripts/validate-templates.js --verbose
```

### Output:
- Console report with issue summary
- `validation-report.json` with detailed findings

## Quality Report Summary

### Current Status (259 templates analyzed):
- **256 files** have quality issues
- **1,535 total issues** identified
- **3 placeholder templates** need completion

### Top Issues by Category:
1. **Accessibility (693):** Missing alt attributes, labels, ARIA roles
2. **Content Quality (280):** Generic data, unhelpful error messages
3. **Performance (252):** Unoptimized images, excessive inline styles
4. **Generic Placeholders (140):** METRIC_VALUE, "Metric 1" headings
5. **Visual Hierarchy (98):** Too many primary actions, missing text constraints
6. **Responsive (72):** Missing breakpoints, overflow handling

## Recommended Next Steps

### Quick Wins:
1. **Apply CSS enhancements** to all templates:
   ```bash
   # Add to all template headers
   <link rel="stylesheet" href="/assets/css/uswds-enhancements.css">
   ```

2. **Replace generic placeholders** using the agent prompt patterns:
   ```html
   <!-- Replace -->
   <span>METRIC1_VALUE</span>
   
   <!-- With -->
   <span class="metric-value">324 MWh</span>
   ```

3. **Add missing accessibility attributes:**
   ```html
   <!-- Images need alt text -->
   <img src="chart.png" alt="Energy consumption trend showing 12% decrease">
   
   <!-- Tables need captions -->
   <table><caption class="usa-sr-only">Monthly energy usage data</caption>
   ```

### Systematic Improvements:
1. **Create a template update script** to batch-apply CSS enhancements
2. **Generate realistic data sets** for each dashboard type
3. **Implement responsive breakpoints** consistently
4. **Add loading/error/empty states** to all data-driven templates

## Integration with Development Workflow

### Pre-commit Hook:
```json
// package.json
{
  "scripts": {
    "validate": "node scripts/validate-templates.js",
    "pre-commit": "npm run validate"
  }
}
```

### CI/CD Pipeline:
```yaml
# .github/workflows/quality-check.yml
- name: Validate Templates
  run: npm run validate
```

## Benefits

1. **Improved User Experience:** Professional, polished interfaces that reduce anxiety
2. **Better Accessibility:** WCAG AA compliance across all templates
3. **Consistent Quality:** Systematic approach ensures no template is overlooked
4. **Performance:** Optimized loading states and animations
5. **Maintainability:** Clear patterns and reusable utilities

## Resources

- [Agent Prompt Guide](./agent-prompt.md) - Design philosophy and patterns
- [USWDS Documentation](https://designsystem.digital.gov/)
- [Validation Report](../validation-report.json) - Detailed issue breakdown