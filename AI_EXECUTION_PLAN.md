# 🤖 AI Autonomous Execution Plan

## CRITICAL: Read This First!
This document enables AI agents to work autonomously on creating 240+ USWDS templates. Each section provides specific instructions for parallel execution across multiple Claude instances.

---

## 🚀 IMMEDIATE START INSTRUCTIONS

### Window 1 - Dashboard Specialist
```bash
# YOUR ASSIGNMENT: Create all 40 dashboard templates
# Start immediately with these commands:
cd /home/hectorwsl/repos/uswds-templates
grep "^[0-9].*Dashboard" TEMPLATE_CATALOG.md > dashboards.txt

# Begin creating dashboards from the list
# Each dashboard should take 30-45 minutes
# You have permission to use: mkdir, touch, cp, mv, rm, grep, find
```

### Window 2 - Forms Specialist
```bash
# YOUR ASSIGNMENT: Create all 50 form templates
# Start immediately with these commands:
cd /home/hectorwsl/repos/uswds-templates
grep "^[4-9][0-9]\." TEMPLATE_CATALOG.md | head -50 > forms.txt

# Begin creating forms from the list
# Focus on multi-step wizards and complex validations
# Each form should take 20-30 minutes
```

### Window 3 - Landing Page Specialist
```bash
# YOUR ASSIGNMENT: Create all 30 landing pages
# Start immediately with these commands:
cd /home/hectorwsl/repos/uswds-templates
grep "^[9][0-9]\|^1[0-2][0-9]\." TEMPLATE_CATALOG.md | head -30 > landing.txt

# Begin creating landing pages
# Focus on agency homepages and program pages
# Each landing page should take 20-25 minutes
```

### Window 4 - Search & Data Specialist
```bash
# YOUR ASSIGNMENT: Create all search and data display templates
# Start immediately with these commands:
cd /home/hectorwsl/repos/uswds-templates
grep -E "Search|Results|Data|Table|Grid" TEMPLATE_CATALOG.md > search-data.txt

# Begin creating search interfaces and data displays
# Include filtering, sorting, pagination
# Each template should take 25-35 minutes
```

### Window 5 - Workflow Specialist
```bash
# YOUR ASSIGNMENT: Create all complex workflows and wizards
# Start immediately with these commands:
cd /home/hectorwsl/repos/uswds-templates
grep -E "Wizard|Workflow|Multi-Step|Complex" TEMPLATE_CATALOG.md > workflows.txt

# Begin creating complex multi-step processes
# Include progress indicators and state management
# Each workflow should take 40-50 minutes
```

---

## 📁 TEMPLATE CREATION PATTERN

### For EVERY template you create, follow this EXACT pattern:

```bash
# 1. Create directory
mkdir -p templates/plain/templates/[category]/[template-name]

# 2. Create the HTML file with ALL required elements:
cat > templates/plain/templates/[category]/[template-name]/index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>[Template Title] - U.S. Government</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@uswds/uswds@3.9.0/dist/css/uswds.min.css">
</head>
<body>

<!-- REQUIRED: Government Banner -->
<section class="usa-banner" aria-label="Official website of the United States government">
  <!-- Full banner code from AI_TEMPLATE_RULES.md -->
</section>

<!-- Navigation -->
<header class="usa-header usa-header--extended">
  <!-- Appropriate navigation for template type -->
</header>

<!-- Main Content -->
<main id="main-content">
  <!-- Template-specific content with realistic data -->
</main>

<!-- Footer -->
<footer class="usa-footer">
  <!-- Appropriate footer content -->
</footer>

<script src="https://cdn.jsdelivr.net/npm/@uswds/uswds@3.9.0/dist/js/uswds.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@uswds/uswds@3.9.0/dist/js/uswds-init.min.js"></script>
</body>
</html>
EOF

# 3. Update router
# Add route to templates/plain/src/router.js
```

---

## 🎯 SPECIFIC TEMPLATE REQUIREMENTS

### Dashboard Templates MUST Include:
- [ ] Key metrics cards (4-6 cards)
- [ ] Data visualization area (charts/graphs)
- [ ] Recent activity/items table
- [ ] Quick actions section
- [ ] Status indicators (badges, alerts)
- [ ] Filters and date ranges
- [ ] Export/download options

### Form Templates MUST Include:
- [ ] Proper fieldsets and legends
- [ ] Input validation indicators
- [ ] Help text and tooltips
- [ ] Progress indicators (for multi-step)
- [ ] Save draft functionality UI
- [ ] Required field indicators
- [ ] Submit and cancel buttons
- [ ] Success/error messaging

### Landing Pages MUST Include:
- [ ] Hero section with call-to-action
- [ ] Service/feature cards
- [ ] News/announcements section
- [ ] Quick links section
- [ ] Contact information
- [ ] Search functionality
- [ ] Responsive image handling

### Search Templates MUST Include:
- [ ] Search input with suggestions
- [ ] Filter sidebar/panel
- [ ] Results count and pagination
- [ ] Sort options
- [ ] View toggle (list/grid/map)
- [ ] No results messaging
- [ ] Loading states

### Workflow Templates MUST Include:
- [ ] Step indicator component
- [ ] Previous/Next navigation
- [ ] Save and exit option
- [ ] Review summary page
- [ ] Confirmation page
- [ ] Progress saving UI
- [ ] Validation between steps

---

## 🔧 AUTOMATION SCRIPTS

### Create this helper script: `generate-template.sh`
```bash
#!/bin/bash
# Save as: /home/hectorwsl/repos/uswds-templates/generate-template.sh

CATEGORY=$1
NAME=$2
TITLE=$3

# Create directory
mkdir -p "templates/plain/templates/${CATEGORY}/${NAME}"

# Generate template (you'll expand this)
cat > "templates/plain/templates/${CATEGORY}/${NAME}/index.html" << EOF
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${TITLE} - U.S. Government</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@uswds/uswds@3.9.0/dist/css/uswds.min.css">
</head>
<body>
<!-- Template content here -->
</body>
</html>
EOF

echo "Created: ${CATEGORY}/${NAME}"
```

### Batch Processing Script: `batch-generate.sh`
```bash
#!/bin/bash
# Save as: /home/hectorwsl/repos/uswds-templates/batch-generate.sh

# Read template list and generate
while IFS= read -r line; do
  # Parse line and generate template
  ./generate-template.sh "$category" "$name" "$title"
done < template-list.txt
```

---

## 🏃 PARALLEL EXECUTION STRATEGY

### Phase 1 (Hours 1-2): Foundation Templates
- **All Windows**: Create the most commonly used templates first
- System Admin Dashboard, User Profile, Search Results, Basic Forms
- These will serve as references for other templates

### Phase 2 (Hours 3-5): Category Deep Dive
- **Window 1**: Complete all dashboards
- **Window 2**: Complete all forms
- **Window 3**: Complete all landing pages
- **Window 4**: Complete all search/data displays
- **Window 5**: Complete all workflows

### Phase 3 (Hours 6-7): Specialized Templates
- **All Windows**: Pick up remaining templates from other categories
- Mobile-first templates
- Security and privacy templates
- Analytics dashboards
- Utility pages

### Phase 4 (Hour 8): Quality & Cleanup
- **All Windows**: Review and fix any issues
- Update routers
- Test navigation
- Commit changes

---

## ✅ QUALITY CHECKLIST

For EVERY template, verify:

```markdown
- [ ] Government banner present and hidden by default
- [ ] Semantic HTML5 structure
- [ ] ARIA labels on interactive elements
- [ ] Responsive grid classes used
- [ ] Real USWDS classes only (no custom CSS)
- [ ] Realistic government data/content
- [ ] Proper form structure (if applicable)
- [ ] Tables are responsive (if applicable)
- [ ] Navigation is contextual
- [ ] Footer includes agency info
- [ ] Print styles considered
- [ ] Skip navigation link present
```

---

## 🎨 REALISTIC DATA EXAMPLES

### Use these patterns for realistic content:

#### Case/Reference Numbers:
- `CM-2024-001234`
- `REQ-2024-56789`
- `APP-2024-98765`
- `DOC-2024-43210`

#### Government Departments:
- Department of Veterans Affairs
- Social Security Administration
- Internal Revenue Service
- Department of Homeland Security
- Environmental Protection Agency

#### Common Status Values:
- Pending Review
- In Progress
- Approved
- Denied
- Under Investigation
- Awaiting Documentation
- Completed
- Archived

#### Date Formats:
- `January 15, 2024`
- `01/15/2024`
- `2024-01-15`
- `15 Jan 2024`

#### Money Formats:
- `$1,234,567.89`
- `$45,678`
- `$123.45`

---

## 🚦 PERMISSION NOTES

You have AUTOMATIC permission for these commands:
- `mkdir -p` - Create directories
- `touch` - Create files
- `cp` - Copy files/templates
- `mv` - Move/rename files
- `rm` - Remove files (use carefully)
- `grep` - Search content
- `find` - Find files
- `sed` - Text replacement
- `cat` - Read/write files
- `echo` - Output text
- `npm install` - Install packages
- `npm run` - Run scripts
- `git add/commit/push` - Version control

NO PERMISSION NEEDED for these actions:
- Creating new templates
- Updating router files
- Adding realistic data
- Creating directory structures
- Modifying existing templates
- Running build commands

---

## 📊 PROGRESS TRACKING

### Create a progress file: `progress.md`
```markdown
# Template Generation Progress

## Window 1 - Dashboards (0/40)
- [ ] System Administrator Dashboard
- [ ] Content Management Dashboard
...

## Window 2 - Forms (0/50)
- [ ] Passport Application
- [ ] Driver's License Renewal
...

## Window 3 - Landing Pages (0/30)
- [ ] Federal Department Homepage
- [ ] State Portal Homepage
...

## Window 4 - Search & Data (0/50)
- [ ] Advanced Search Portal
- [ ] Database Search Interface
...

## Window 5 - Workflows (0/25)
- [ ] Immigration Application Wizard
- [ ] Tax Filing Wizard
...
```

Update this file after completing each template.

---

## 🎯 SUCCESS METRICS

By the end of the session, we should have:
- ✅ 240+ unique templates created
- ✅ All templates follow USWDS standards
- ✅ Realistic government context in all templates
- ✅ Proper navigation and routing
- ✅ Responsive design implemented
- ✅ Accessibility standards met
- ✅ All templates committed to git

---

## 🔥 START NOW!

Each AI window should:
1. Read their assigned section above
2. Start creating templates immediately
3. No need to ask for permission
4. Work through the list systematically
5. Commit every 5-10 templates
6. Update progress tracking

The goal is maximum productivity with minimal human intervention. You have all the information and permissions needed. Begin creating templates now!