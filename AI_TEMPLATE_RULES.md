# USWDS Template Generation Rules for AI

## REQUIRED: Government Banner

### Every template MUST include the official government banner:
```html
<!-- Place immediately after <body> tag, before any other content -->
<section class="usa-banner" aria-label="Official website of the United States government">
  <div class="usa-accordion">
    <header class="usa-banner__header">
      <div class="usa-banner__inner">
        <div class="grid-col-auto">
          <img aria-hidden="true" class="usa-banner__header-flag" src="/assets/img/us_flag_small.png" alt="">
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
          <img class="usa-banner__icon usa-media-block__img" src="/assets/img/icon-dot-gov.svg" role="img" alt="" aria-hidden="true">
          <div class="usa-media-block__body">
            <p>
              <strong>Official websites use .gov</strong><br/>
              A <strong>.gov</strong> website belongs to an official government organization in the United States.
            </p>
          </div>
        </div>
        <div class="usa-banner__guidance tablet:grid-col-6">
          <img class="usa-banner__icon usa-media-block__img" src="/assets/img/icon-https.svg" role="img" alt="" aria-hidden="true">
          <div class="usa-media-block__body">
            <p>
              <strong>Secure .gov websites use HTTPS</strong><br/>
              A lock (<span class="icon-lock"><svg xmlns="http://www.w3.org/2000/svg" width="52" height="64" viewBox="0 0 52 64" class="usa-banner__lock-image" role="img" aria-labelledby="banner-lock-description" focusable="false"><title id="banner-lock-description">Lock</title><desc>Locked padlock icon</desc><path fill="#000000" fill-rule="evenodd" d="M26 0c10.493 0 19 8.507 19 19v9h3a4 4 0 0 1 4 4v28a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V32a4 4 0 0 1 4-4h3v-9C7 8.507 15.507 0 26 0zm0 8c-5.979 0-10.843 4.77-10.996 10.712L15 19v9h22v-9c0-6.075-4.925-11-11-11z"/></svg></span>) or <strong>https://</strong> means you've safely connected to the .gov website. Share sensitive information only on official, secure websites.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
```

### Why This is Required:
- **Legal requirement** for federal government websites
- Builds trust with users
- Provides transparency about official government status
- Required by the 21st Century IDEA Act

### Placement Rules:
1. MUST be the first element after `<body>` tag
2. MUST appear before any navigation or header
3. MUST include both collapsed and expanded states
4. MUST include proper ARIA labels

## Card Structure Rules

### Correct Card Structure:
```html
<div class="usa-card">
  <div class="usa-card__container">
    <div class="usa-card__header">
      <h3 class="usa-card__heading">Title</h3>
    </div>
    <div class="usa-card__body">
      <p>Content goes here</p>
      <!-- NO buttons/actions here - they lose margin -->
    </div>
    <div class="usa-card__footer">
      <!-- Buttons and actions go here -->
      <button class="usa-button">Action</button>
    </div>
  </div>
</div>
```

### Common Mistakes to Avoid:
1. ❌ Don't put buttons as last child in `usa-card__body`
2. ❌ Don't add custom margin overrides to fix USWDS behavior
3. ❌ Don't wrap buttons in extra divs to avoid the last-child rule

### Why This Matters:
- USWDS intentionally removes bottom margin from last child in card bodies
- This is for visual consistency across all cards
- Use `usa-card__footer` for actions - it has proper spacing

## Button Guidelines

### Button Sizes:
- `usa-button` - Default size
- `usa-button--big` - Large button
- `usa-button--small` - Small button (good for cards)

### Button Variants:
- `usa-button` - Primary (solid blue)
- `usa-button--outline` - Outline only
- `usa-button--secondary` - Secondary color
- `usa-button--base` - Base color

### Width Modifiers:
- `width-full` - Makes button 100% width
- Default - Button width fits content

## Form Structure Rules

### Correct Form Layout:
```html
<form class="usa-form">
  <fieldset class="usa-fieldset">
    <legend class="usa-legend">Section Title</legend>
    
    <label class="usa-label" for="input-id">
      Label Text
    </label>
    <input class="usa-input" id="input-id" name="input-name" type="text">
    
    <!-- Form actions go in their own section -->
    <div class="margin-top-3">
      <button class="usa-button" type="submit">Submit</button>
      <button class="usa-button usa-button--outline" type="button">Cancel</button>
    </div>
  </fieldset>
</form>
```

## Alert/Notification Structure

### In Cards:
```html
<div class="usa-card">
  <div class="usa-card__container">
    <div class="usa-card__body">
      <ul class="usa-list usa-list--unstyled">
        <!-- Notification items -->
      </ul>
    </div>
    <div class="usa-card__footer">
      <button class="usa-button usa-button--outline">View All</button>
    </div>
  </div>
</div>
```

## Semantic HTML & Clean Code Rules

### Use Semantic HTML5 Elements:
```html
<!-- ✅ GOOD: Semantic elements -->
<nav class="usa-nav">...</nav>
<main id="main-content">...</main>
<section class="usa-section">...</section>
<article class="usa-card">...</article>
<aside class="usa-layout-docs__sidenav">...</aside>
<footer class="usa-footer">...</footer>

<!-- ❌ BAD: Div soup -->
<div class="nav">...</div>
<div class="main-content">...</div>
<div class="section">...</div>
```

### Avoid Unnecessary Wrappers:
```html
<!-- ❌ BAD: Extra wrapper divs -->
<div class="grid-row">
  <div class="grid-col">
    <div class="content-wrapper">
      <div class="text-container">
        <p>Content</p>
      </div>
    </div>
  </div>
</div>

<!-- ✅ GOOD: Direct and clean -->
<div class="grid-row">
  <div class="grid-col">
    <p>Content</p>
  </div>
</div>
```

### Structure Comments for Readability:
```html
<!-- ========== MAJOR SECTION ========== -->
<section>
  <!-- === Subsection === -->
  <div>
    <!-- Minor note -->
  </div>
</section>
```

### Grid System Best Practices:
```html
<!-- ✅ GOOD: Use USWDS grid classes directly -->
<div class="grid-row grid-gap">
  <div class="tablet:grid-col-6">Content</div>
  <div class="tablet:grid-col-6">Content</div>
</div>

<!-- ❌ BAD: Nested unnecessary containers -->
<div class="container">
  <div class="row-wrapper">
    <div class="grid-row">
      <div class="col-wrapper">
        <div class="tablet:grid-col-6">Content</div>
      </div>
    </div>
  </div>
</div>
```

### Card Simplification:
```html
<!-- ✅ GOOD: Only use needed card sections -->
<div class="usa-card">
  <div class="usa-card__container">
    <h3 class="usa-card__heading">Title</h3>
    <p>If content is simple, no need for body wrapper</p>
  </div>
</div>

<!-- Only use header/body/footer when actually needed -->
<div class="usa-card">
  <div class="usa-card__container">
    <div class="usa-card__header">
      <h3>Complex Card Title</h3>
      <span class="usa-tag">Status</span>
    </div>
    <div class="usa-card__body">
      <p>Multiple content elements</p>
      <ul>...</ul>
    </div>
    <div class="usa-card__footer">
      <button>Action</button>
    </div>
  </div>
</div>
```

## General Rules

1. **Never override USWDS styles** - Work with the system, not against it
2. **Use semantic HTML5 elements** - nav, main, section, article, aside, footer
3. **Minimize wrapper divs** - Only add containers when necessary for layout
4. **Keep markup clean** - Less is more, use USWDS classes directly
5. **Test in browser** - Always verify the visual output
6. **Check USWDS docs** - When unsure, refer to https://designsystem.digital.gov/components/

## Template Validation Checklist

Before finalizing any template:
- [ ] **Government banner is present** as first element after `<body>`
- [ ] All buttons are in appropriate containers (not last child of body)
- [ ] No custom CSS overrides for USWDS components
- [ ] Proper semantic HTML structure
- [ ] All interactive elements have proper ARIA labels
- [ ] Forms follow USWDS patterns
- [ ] Cards use header/body/footer appropriately
- [ ] Banner includes proper accordion functionality
- [ ] Banner has unique ID for aria-controls (avoid duplicates)