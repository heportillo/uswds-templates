# AI Agent Instructions for USWDS Template Generation v2.0

## 🎯 Mission
Create beautiful, accessible, and emotionally intelligent USWDS templates that serve real people in real government scenarios. Every template should tell a story, solve a problem, and respect the user's time and dignity.

## 🚀 Quick Start Command
When user says: `#create-template [type] [variant] [name]`
Example: `#create-template dashboard plain energy-consumption`

## 📐 Design Philosophy

### Core Principles
1. **Empathy First**: Consider the emotional state of users (stressed, confused, hopeful)
2. **Clarity Over Cleverness**: Simple, clear interfaces that guide users
3. **Progressive Disclosure**: Show what's needed when it's needed
4. **Respect for Time**: Every interaction should feel efficient
5. **Dignity in Design**: Government services should feel professional and trustworthy

## 📖 Template Story Framework

### Before Creating Any Template, Define:

```yaml
template_story:
  persona: 
    name: "Maria Rodriguez"
    role: "Case Worker"
    context: "Managing 150+ active cases, needs quick status updates"
    pain_points: 
      - "Can't see all critical information at once"
      - "Too many clicks to common actions"
      - "Loses context when switching between cases"
    emotional_state: "Overwhelmed but determined"
  
  user_journey:
    trigger: "Morning case review routine"
    goal: "Review overnight changes and prioritize day"
    success_metric: "Can review 20 cases in under 10 minutes"
    
  data_story:
    source: "Real-time from 5 integrated systems"
    update_frequency: "Every 30 seconds for critical metrics"
    peak_load: "Monday mornings, 500+ concurrent users"
    
  conversion_considerations:
    react_hooks: ["useState for filters", "useEffect for polling"]
    api_endpoints: ["/api/cases", "/api/metrics", "/api/alerts"]
    state_management: "Context API for user preferences"
```

## 🎨 Design Quality Standards

### Text & Typography
```css
/* ALWAYS handle text overflow elegantly */
.metric-value {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
}

/* Use responsive font sizes */
.metric-label {
  font-size: clamp(0.875rem, 2vw, 1rem);
}

/* Ensure readable line lengths */
.content-text {
  max-width: 65ch; /* Optimal reading length */
}
```

### Responsive Breakpoints
```html
<!-- Mobile First: 320px minimum -->
<div class="grid-col-12 tablet:grid-col-6 desktop:grid-col-3">
  <!-- Content adapts at each breakpoint -->
</div>

<!-- Always test at these viewports -->
<!-- 320px (mobile), 640px (tablet), 1024px (desktop), 1400px (widescreen) -->
```

### Visual Hierarchy
1. **Primary Action**: One clear primary action per view
2. **Secondary Actions**: 2-3 supporting actions maximum
3. **Information Density**: 
   - Dashboard: High density, scannable
   - Forms: Low density, focused
   - Tables: Medium density, sortable

## 📊 Content Intelligence

### Replace Generic Placeholders with Contextual Data

#### ❌ WRONG - Generic Placeholders
```html
<span>METRIC1_VALUE</span>
<p>METRIC1_DESC</p>
```

#### ✅ CORRECT - Contextual, Realistic Data
```html
<!-- For Energy Dashboard -->
<span class="font-sans-3xl text-bold">324 MWh</span>
<p class="margin-top-1 text-base">
  <span class="text-base-dark">Daily consumption</span>
  <span class="usa-tag bg-green margin-left-1">↓ 12% from yesterday</span>
</p>
```

### Data Generation Rules by Context

#### Government Metrics Should Be:
- **Realistic**: Use actual government scale numbers
- **Specific**: Include units, timeframes, comparisons
- **Meaningful**: Show relationships between metrics
- **Dynamic**: Include trends, changes, status

#### Examples by Dashboard Type:
```javascript
const dashboardMetrics = {
  energy: {
    consumption: "324 MWh",
    renewable: "42%",
    cost: "$1.2M",
    reliability: "99.97%"
  },
  healthcare: {
    claims: "12,847",
    avgProcessTime: "3.2 days",
    satisfaction: "87%",
    denialRate: "4.2%"
  },
  immigration: {
    applications: "8,432",
    avgWaitTime: "127 days",
    approvalRate: "73%",
    interviews: "342 scheduled"
  }
}
```

## 🧩 Component Pattern Library

### Card Patterns

#### Metric Card with Trend
```html
<div class="usa-card">
  <div class="usa-card__container">
    <div class="usa-card__header">
      <h3 class="usa-card__heading">Active Cases</h3>
    </div>
    <div class="usa-card__body">
      <div class="display-flex flex-align-end flex-justify">
        <span class="font-sans-3xl text-bold text-no-wrap">1,247</span>
        <div class="display-flex flex-column flex-align-end">
          <span class="usa-tag bg-green">↑ 12%</span>
          <span class="font-sans-xs text-base-dark margin-top-05">vs last week</span>
        </div>
      </div>
      <div class="margin-top-2">
        <div class="display-flex flex-justify">
          <span class="font-sans-xs text-base-dark">Critical: 23</span>
          <span class="font-sans-xs text-base-dark">Pending: 156</span>
        </div>
      </div>
    </div>
  </div>
</div>
```

### Table Patterns

#### Responsive Data Table
```html
<div class="usa-table-container--scrollable" tabindex="0">
  <table class="usa-table usa-table--striped usa-table--borderless">
    <caption class="usa-sr-only">Case status overview with 5 columns</caption>
    <thead>
      <tr>
        <th scope="col" class="text-no-wrap">Case ID</th>
        <th scope="col">Applicant</th>
        <th scope="col">Status</th>
        <th scope="col" class="text-right">Days Open</th>
        <th scope="col">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row" class="font-mono-xs">2025-001234</th>
        <td class="text-wrap maxw-card">
          <div class="text-bold text-truncate">Maria Rodriguez-Hernandez</div>
          <div class="font-sans-xs text-base-dark">Type: Renewal</div>
        </td>
        <td>
          <span class="usa-tag bg-gold">Under Review</span>
        </td>
        <td class="text-right text-tabular">47</td>
        <td>
          <button class="usa-button usa-button--unstyled font-sans-xs">View</button>
        </td>
      </tr>
    </tbody>
  </table>
</div>
```

### Empty States
```html
<div class="padding-y-8 text-center">
  <img src="[appropriate-icon]" alt="" class="maxw-6 margin-x-auto">
  <h3 class="margin-top-2">No results found</h3>
  <p class="text-base-dark margin-top-1">
    Try adjusting your filters or search terms
  </p>
  <button class="usa-button margin-top-3">Clear filters</button>
</div>
```

### Loading States
```html
<div class="padding-y-4 text-center">
  <div class="loader margin-x-auto"></div>
  <p class="margin-top-2 text-base-dark">Loading your data...</p>
</div>
```

## 🔍 Quality Assurance Checklist

### Visual Quality
- [ ] No text overflow or truncation issues
- [ ] Proper spacing at all breakpoints
- [ ] Consistent alignment and visual rhythm
- [ ] Appropriate information density
- [ ] Clear visual hierarchy

### Content Quality
- [ ] Realistic, contextual data (no METRIC1_VALUE)
- [ ] Proper number formatting (commas, units)
- [ ] Meaningful relationships between data points
- [ ] Appropriate empty/loading/error states
- [ ] Helpful microcopy and instructions

### Interaction Quality
- [ ] Clear hover states for interactive elements
- [ ] Obvious click targets (minimum 44x44px)
- [ ] Keyboard navigation works perfectly
- [ ] Focus indicators are visible
- [ ] Form validation is helpful, not punitive

### Emotional Quality
- [ ] Interface feels calm and organized
- [ ] Language is warm but professional
- [ ] Errors are helpful, not scary
- [ ] Success states celebrate appropriately
- [ ] Overall experience reduces anxiety

## 🚀 Template Categories & Their Stories

### Dashboards
**Emotional Context**: Users need to quickly understand status and take action
- **Metrics**: Show what matters most, prominently
- **Trends**: Context makes numbers meaningful
- **Actions**: Quick access to common tasks
- **Filters**: Let users focus on their priorities

### Forms
**Emotional Context**: Users often anxious about providing correct information
- **Progress**: Show where they are in the process
- **Help**: Inline help reduces anxiety
- **Validation**: Validate as they go, not all at end
- **Save**: Allow saving progress to reduce pressure

### Landing Pages
**Emotional Context**: Users seeking information or services
- **Clarity**: What can I do here?
- **Trust**: Why should I trust this?
- **Action**: What should I do next?
- **Support**: Where can I get help?

### Search & Results
**Emotional Context**: Users looking for specific information
- **Speed**: Fast results build confidence
- **Relevance**: Smart sorting saves time
- **Filters**: Progressive filtering guides discovery
- **No Results**: Helpful suggestions when nothing found

## 🔧 Technical Implementation

### Performance Budgets
```yaml
performance:
  first_paint: < 1.5s
  interactive: < 3.5s
  max_bundle_size: 200KB
  image_optimization: WebP with fallbacks
  critical_css: Inline above-fold styles
```

### Accessibility Requirements
```yaml
accessibility:
  wcag_level: AA
  keyboard_nav: Full functionality
  screen_reader: Semantic HTML + ARIA
  color_contrast: 4.5:1 minimum
  focus_indicators: Visible and clear
  skip_links: Present and functional
```

### React Conversion Hints
```javascript
// Add conversion hints as comments
<!-- React Hook: useState for filter state -->
<!-- API Call: GET /api/dashboard/metrics -->
<!-- Update Interval: 30 seconds -->
<!-- Local Storage: User preferences -->
```

## 📝 Metadata Template

Every template should include this metadata block:

```html
<!-- 
Template: Energy Consumption Dashboard
Story: Facility managers monitor real-time energy usage across 50+ buildings
Persona: John, Facilities Director, needs to identify inefficiencies quickly
Emotional State: Pressured to reduce costs while maintaining operations
Key Metrics: Consumption (MWh), Cost ($), Efficiency (%), Renewable (%)
Update Frequency: Real-time (30 second polling)
Peak Usage: 8-10 AM when buildings open
React Considerations: 
  - useState for building selection
  - useEffect for data polling
  - Context for user preferences
  - Memo for expensive calculations
Accessibility Focus: Keyboard navigation between buildings critical
Mobile Usage: 40% of users check on phones during facility walks
-->
```

## 🎯 Success Criteria

A successfully created template:
1. **Tells a Story**: Clear narrative of who uses it and why
2. **Feels Real**: Uses realistic data and scenarios  
3. **Handles Edge Cases**: Long names, missing data, errors
4. **Responds Beautifully**: Looks great on all devices
5. **Loads Quickly**: Optimized and performant
6. **Accessible to All**: Keyboard, screen reader, and more
7. **Reduces Anxiety**: Calm, clear, supportive interface
8. **Converts Easily**: Clear path to React/Trussworks
9. **Maintains Dignity**: Professional government service
10. **Sparks Joy**: Pleasant to use despite the task

## 🌟 Creative Excellence at Scale

### Systematic Creativity
1. **Start with the Story**: Who, what, why, when, where
2. **Design the Emotion**: How should users feel?
3. **Craft the Flow**: Natural, intuitive progression
4. **Perfect the Details**: Micro-interactions matter
5. **Test the Edge Cases**: Break it, then fix it

### Batch Processing Patterns
When creating multiple templates:
1. Define shared components first
2. Create consistent data models
3. Establish naming conventions
4. Build reusable utilities
5. Document patterns for reuse

## 📚 Reference Implementation

### Example: High-Quality Dashboard Creation

```bash
# Step 1: Define the story
Story: Energy managers at GSA need to monitor consumption across federal buildings 
to meet sustainability goals while managing costs.

# Step 2: Create realistic metrics
- Real-time consumption: Updates every 30 seconds
- Historical comparisons: Show trends
- Cost implications: Connect usage to budget
- Sustainability goals: Progress indicators

# Step 3: Design for emotion
- Calm color palette for routine monitoring
- Yellow/red only for true alerts
- Celebratory green for achievements
- Clear hierarchy reduces scanning time

# Step 4: Handle edge cases
- Buildings offline: Show last known + status
- Data delays: Indicate stale data gracefully
- Extreme values: Format large numbers readably
- Missing data: Explain why and what to do

# Step 5: Optimize performance
- Lazy load historical data
- Virtualize long lists
- Optimize images
- Progressive enhancement
```

## 🔄 Continuous Improvement

After creating each template:
1. **Review against this guide**
2. **Test on real devices**
3. **Get feedback from users**
4. **Document lessons learned**
5. **Update patterns library**
6. **Share with team**

Remember: We're not just building interfaces, we're serving people at important moments in their lives. Every template is an opportunity to make government services more human, more helpful, and more hopeful.