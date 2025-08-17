# UI Polish Standards - USWDS-Only Approach

## Core Principle
**Zero custom CSS** - Use only USWDS utility classes and components. The design system provides everything needed for professional, polished government interfaces.

## Common UI Issues and USWDS Solutions

### 1. Layout & Spacing

#### Problem: Squished or cramped sections
**Solution**: Use USWDS spacing utilities
- `usa-section` for main content sections (includes proper padding)
- `margin-top-[1-9]` and `margin-bottom-[1-9]` for vertical spacing
- `padding-[1-9]` for internal spacing
- `grid-gap` and `grid-gap-lg` for grid spacing

#### Problem: Inconsistent card heights
**Solution**: Use USWDS grid system
- `grid-row` with `grid-gap` for consistent spacing
- `tablet:grid-col-6 desktop:grid-col-4` for responsive columns
- `usa-card` component automatically handles height
- Cards in same row will align naturally with grid

### 2. Button & Control Alignment

#### Problem: Buttons not aligned properly
**Solution**: Use USWDS flexbox utilities
- `display-flex flex-justify-end` to push buttons right
- `display-flex flex-justify-between` for space between items
- `flex-align-center` for vertical centering
- `usa-button-group` for grouped buttons

#### Problem: Mobile button stacking
**Solution**: Use responsive utilities
- `width-full` on mobile for full-width buttons
- `tablet:width-auto` for normal width on larger screens

### 3. Form Improvements

#### Problem: Form fields too close together
**Solution**: Use USWDS form spacing
- `usa-form` wrapper provides default spacing
- `usa-form-group` for field grouping
- `margin-top-3` between form sections

#### Problem: Poor label/hint visibility
**Solution**: Use USWDS typography
- `usa-label` for labels (includes proper spacing)
- `usa-hint` for helper text
- `usa-legend` for fieldset legends

### 4. Typography

#### Problem: Inconsistent heading spacing
**Solution**: Use USWDS heading utilities
- `margin-bottom-0` to remove bottom margin
- `margin-top-[1-5]` for consistent top spacing
- `usa-intro` for intro paragraphs

#### Problem: Text hierarchy unclear
**Solution**: Use USWDS text utilities
- `text-bold` for emphasis
- `text-base` for smaller text
- `text-primary`, `text-success`, `text-error` for semantic colors

### 5. Color & Visual Hierarchy

#### Problem: Need visual distinction without shadows
**Solution**: Use USWDS color utilities
- `bg-base-lightest` for subtle backgrounds
- `usa-tag` with color modifiers (`bg-primary`, `bg-indigo-warm-60v`)
- `border-[color]` for colored borders
- `text-[color]` for colored text

### 6. Responsive Design

#### Problem: Elements not stacking on mobile
**Solution**: Use USWDS responsive prefixes
- `mobile:`, `tablet:`, `desktop:` prefixes
- `grid-col-12` on mobile, `tablet:grid-col-6` on tablet
- `display-none tablet:display-block` for responsive visibility

### 7. Cards & Content Blocks

#### Problem: Cards with uneven content
**Solution**: Use USWDS card structure
```html
<div class="usa-card">
  <div class="usa-card__container">
    <div class="usa-card__header">
    <div class="usa-card__body">
    <div class="usa-card__footer">
  </div>
</div>
```
The footer naturally pushes to bottom with flexbox.

## USWDS Utility Class Reference

### Display & Layout
- `display-none`, `display-block`, `display-flex`, `display-inline-block`
- `position-relative`, `position-absolute`, `position-static`

### Flexbox
- `flex-justify-start`, `flex-justify-center`, `flex-justify-end`, `flex-justify-between`
- `flex-align-start`, `flex-align-center`, `flex-align-end`, `flex-align-stretch`
- `flex-row`, `flex-column`
- `flex-wrap`, `flex-no-wrap`

### Grid
- `grid-container` for page wrapper
- `grid-row` for row wrapper
- `grid-col-[1-12]` for columns
- `grid-gap`, `grid-gap-sm`, `grid-gap-lg` for spacing

### Spacing
- `margin-[0-9]`, `margin-top-[0-9]`, `margin-bottom-[0-9]`, `margin-left-[0-9]`, `margin-right-[0-9]`
- `padding-[0-9]`, `padding-top-[0-9]`, `padding-bottom-[0-9]`, `padding-left-[0-9]`, `padding-right-[0-9]`
- `margin-x-auto` for horizontal centering

### Width & Height
- `width-full`, `width-auto`
- `height-full`, `height-auto`
- `maxw-full`, `maxw-none`

### Text
- `text-left`, `text-center`, `text-right`
- `text-bold`, `text-normal`, `text-light`
- `text-uppercase`, `text-lowercase`, `text-no-uppercase`
- `text-underline`, `text-no-underline`

### Colors (Background)
- `bg-primary`, `bg-secondary`, `bg-accent-cool`, `bg-accent-warm`
- `bg-base-lightest`, `bg-base-lighter`, `bg-base-light`, `bg-base`, `bg-base-dark`, `bg-base-darker`, `bg-base-darkest`
- Color variants: `bg-[color]-[5-90]v` (e.g., `bg-blue-60v`)

### Colors (Text)
- `text-primary`, `text-secondary`, `text-base`, `text-ink`
- `text-success`, `text-error`, `text-warning`, `text-info`
- `text-white`, `text-black`

## Implementation Checklist

When polishing a template:

1. ✅ Remove ALL custom CSS
2. ✅ Replace custom classes with USWDS utilities
3. ✅ Use semantic USWDS components (usa-card, usa-button, etc.)
4. ✅ Apply responsive prefixes for mobile-first design
5. ✅ Use USWDS color tokens only
6. ✅ Leverage grid system for layouts
7. ✅ Apply proper spacing utilities
8. ✅ Ensure all interactive elements use USWDS components

## Anti-Patterns to Avoid

❌ Custom CSS files
❌ Inline styles
❌ Custom shadows or effects
❌ Non-USWDS color values
❌ Custom spacing values
❌ Framework-specific classes (Bootstrap, Tailwind, etc.)
❌ Custom media queries

## Testing for Polish

1. **Visual Consistency**: All elements use USWDS tokens
2. **Responsive**: Test at all USWDS breakpoints
3. **Accessibility**: Use USWDS components which include ARIA
4. **Performance**: No custom CSS = smaller bundle
5. **Maintainability**: Future USWDS updates apply automatically

## Example: Polished Results Header

```html
<!-- Results header with proper alignment using USWDS only -->
<div class="grid-row grid-gap margin-bottom-3">
  <div class="tablet:grid-col-6">
    <h2 class="margin-0">247 facilities found</h2>
    <p class="margin-top-1 text-base">Within 10 miles of Washington, DC</p>
  </div>
  <div class="tablet:grid-col-6 display-flex flex-justify-end flex-align-center">
    <div class="usa-button-group" role="group">
      <button type="button" class="usa-button usa-button--outline">List</button>
      <button type="button" class="usa-button usa-button--outline">Map</button>
    </div>
  </div>
</div>
```

This approach ensures consistency, accessibility, and maintainability while adhering to government design standards.