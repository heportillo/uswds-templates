# AI Agent Instructions for USWDS Template Generation

## Quick Start Command
When user says: `#create-template [type] [variant] [name]`
Example: `#create-template dashboard plain case-management`

## Project Structure Overview
```
uswds-templates/
├── showcase/              # Preview wrapper (port 4000)
├── templates/
│   ├── plain/            # Vanilla HTML/CSS (port 3000)
│   ├── react/            # React components (port 3001)
│   └── trussworks/       # Trussworks React (port 3002)
├── docs/
│   └── agent-prompt.md   # This file
└── AI_TEMPLATE_RULES.md  # USWDS compliance rules
```

## Template Creation Workflow

### 1. Understand the Request
When user asks for a template (dashboard, form, landing page, etc.), determine:
- **Variant**: plain, react, or trussworks
- **Category**: dashboards, forms, landing, data, projects
- **Name**: kebab-case naming (e.g., case-management, benefits-portal)

### 2. Create Template Structure

#### For Plain USWDS:
```bash
templates/plain/templates/[category]/[name]/
└── index.html    # Complete HTML template
```

#### For React:
```bash
templates/react/src/templates/[category]/[name]/
├── index.jsx     # React component
└── styles.css    # Optional styles (prefer USWDS classes)
```

#### For Trussworks:
```bash
templates/trussworks/src/templates/[category]/[name]/
├── index.tsx     # TypeScript component
└── types.ts      # TypeScript interfaces
```

### 3. Follow USWDS Rules
**ALWAYS review against `/AI_TEMPLATE_RULES.md`:**
- ✅ Government banner at top
- ✅ Proper card structure (header/body/footer)
- ✅ Buttons in card footers, not bodies
- ✅ Use real USWDS classes (no made-up classes like `usa-section--condensed`)
- ✅ Semantic HTML5 elements
- ✅ Minimal wrapper divs

### 4. Template Requirements

#### Every Template MUST Have:
```html
<!-- 1. Government Banner (first after body) -->
<section class="usa-banner" aria-label="Official website of the United States government">
  <!-- Full banner code from AI_TEMPLATE_RULES.md -->
</section>

<!-- 2. Semantic Structure -->
<header class="usa-header">...</header>
<main id="main-content">...</main>
<footer class="usa-footer">...</footer>

<!-- 3. Section Comments -->
<!-- ========== MAJOR SECTION ========== -->
<!-- === Subsection === -->
```

#### Use REAL USWDS Classes:
```html
<!-- ✅ CORRECT Spacing -->
<section class="usa-section padding-y-3">
<section class="usa-section padding-top-4 padding-bottom-2">

<!-- ❌ WRONG (made-up classes) -->
<section class="usa-section usa-section--condensed">
```

### 5. Variant-Specific Guidelines

#### Plain USWDS
- Use CDN for USWDS: `https://cdn.jsdelivr.net/npm/@uswds/uswds@3.9.0/dist/`
- Pure HTML, no framework
- Initialize USWDS JS after content loads

#### React
- Use CDN for USWDS styles
- Functional components with hooks
- className instead of class
- Keep components simple and reusable

#### Trussworks
- Import components: `import { Button, Card } from '@trussworks/react-uswds'`
- Use TypeScript interfaces
- Leverage Trussworks components over raw HTML

### 6. Common Templates to Create

#### Dashboards
- Analytics Dashboard (metrics, charts, KPIs)
- Case Management (workflow, status tracking)
- Operations Center (real-time monitoring)
- Program Overview (performance metrics)

#### Forms
- Multi-step Application (wizard pattern)
- Single Page Form (all fields visible)
- Document Upload (file management)
- Survey/Feedback (questionnaire)

#### Landing Pages
- Agency Homepage (hero, services, news)
- Program Landing (information, CTA)
- Campaign Page (focused message)
- Resource Hub (documentation, guides)

#### Data Displays
- Search Results (filters, pagination)
- Data Tables (sortable, filterable)
- Report Viewer (printable layouts)
- Map Interface (geographic data)

### 7. Quality Checklist

Before completing any template:
- [ ] Government banner present
- [ ] All buttons in proper containers
- [ ] No custom CSS overrides
- [ ] Semantic HTML structure
- [ ] ARIA labels on interactive elements
- [ ] Real USWDS classes only
- [ ] Clean, minimal markup
- [ ] Comments for major sections
- [ ] Responsive grid classes used
- [ ] Tested in browser preview

### 8. File System Integration

After creating a template:
1. Update route in appropriate router file
2. Add to showcase navigation (if needed)
3. Verify it appears in sidebar
4. Test in browser at correct port

### 9. Creative Freedom Guidelines

While following USWDS rules, be creative with:
- **Content**: Realistic government scenarios
- **Layout**: Different grid arrangements
- **Components**: Mix and match USWDS components
- **Features**: Add interactive elements appropriately
- **Data**: Use realistic example data

### 10. Common Pitfalls to Avoid

❌ **DON'T:**
- Create custom CSS classes
- Use fake USWDS classes
- Put buttons as last child in card bodies
- Create unnecessary wrapper divs
- Use inline styles
- Forget the government banner
- Use local asset paths that don't exist

✅ **DO:**
- Use official USWDS classes
- Follow semantic HTML patterns
- Keep markup clean and minimal
- Use CDN for assets
- Test in browser
- Review against AI_TEMPLATE_RULES.md
- Create organized folder structure

## Example Creation Flow

User: "Create a case management dashboard for plain USWDS"

AI should:
1. Create: `templates/plain/templates/dashboards/case-management/index.html`
2. Include: Government banner, header, main sections, footer
3. Add: Case listings, status indicators, filters, actions
4. Use: Proper USWDS cards, tables, buttons, forms
5. Follow: All rules in AI_TEMPLATE_RULES.md
6. Test: Verify it loads at http://localhost:3000/dashboards/case-management

## Reference Commands

- `#create-template [type] [variant] [name]` - Create new template
- `#review-template [path]` - Review against USWDS rules
- `#list-templates [variant]` - Show existing templates
- `#update-routes` - Update routing for new templates

## Key Files to Reference

1. **AI_TEMPLATE_RULES.md** - USWDS compliance rules
2. **docs/agent-prompt.md** - This file
3. **showcase/templates.json** - Template registry
4. **templates/[variant]/src/router.js** - Routing configuration

## Success Criteria

A successfully created template:
- Renders without errors
- Follows all USWDS patterns
- Looks professional and government-appropriate
- Is accessible and semantic
- Can be easily modified later
- Serves as a good starting point for developers