# Form Layout Standards - SUCCESSFUL APPROACH

## What We Learned (Federal Facility Finder Success)

### Key Breakthrough: Visual Label Alignment
**Problem**: Fieldset legends create visual hierarchy mismatches
**Solution**: Use `usa-label` for all section headers to maintain consistent visual level

### Critical Success Factors

#### 1. Complete Field Containers
Each form element = one container with:
- `usa-label` (not fieldset legend for headers)
- Input/Select element  
- Helper text (if needed)

#### 1.5. Critical: Form Width Classes
**IMPORTANT**: USWDS form classes and their use cases:
- `usa-form`: Single-column forms only (max-width: 20rem ≈ 320px)
- `usa-form usa-form--large`: Multi-column forms (no max-width constraint)

**Rule**: Always use `usa-form--large` for forms with side-by-side fields

#### 2. Explicit Row Planning
**BEFORE coding**: Plan what goes in each row
- Row 1: Location + Facility Type (50/50)
- Row 2: Search Distance + Options Group (33/67) 
- Row 3: Action buttons

#### 3. Visual Level Consistency
```html
<!-- CORRECT: Both at same visual level -->
<div class="grid-col-12 tablet:grid-col-4">
  <label class="usa-label">Search within</label>
  <select class="usa-select">...</select>
</div>
<div class="grid-col-12 tablet:grid-col-8">
  <span class="usa-label">Accessibility Options</span>
  <div class="usa-checkbox">...</div>
</div>

<!-- WRONG: Creates visual hierarchy mismatch -->
<fieldset class="usa-fieldset">
  <legend class="usa-legend">Accessibility Options</legend>
  <div class="usa-checkbox">...</div>
</fieldset>
```

#### 4. Button Balance
- No `usa-button--big` unless truly needed
- Primary solid + Secondary outline = balanced visual weight

## Standard Form Patterns

### Pattern 1: Two Equal Fields
```html
<div class="grid-row grid-gap">
  <div class="grid-col-12 tablet:grid-col-6">[Field 1]</div>
  <div class="grid-col-12 tablet:grid-col-6">[Field 2]</div>
</div>
```

### Pattern 2: Field + Options Group  
```html
<div class="grid-row grid-gap">
  <div class="grid-col-12 tablet:grid-col-4">[Single Field]</div>
  <div class="grid-col-12 tablet:grid-col-8">[Options Group]</div>
</div>
```

### Pattern 3: Three Equal Fields
```html
<div class="grid-row grid-gap">
  <div class="grid-col-12 tablet:grid-col-4">[Field 1]</div>
  <div class="grid-col-12 tablet:grid-col-4">[Field 2]</div>
  <div class="grid-col-12 tablet:grid-col-4">[Field 3]</div>
</div>
```

## Implementation Rules

1. **Always use complete field containers** - Label + input together
2. **Plan rows before implementing** - Decide what goes on each row
3. **Use consistent breakpoints** - `grid-col-12 tablet:grid-col-X`
4. **Group related options** - Use fieldsets for option groups
5. **Mobile-first** - All fields stack on mobile, arrange on tablet+

## Federal Facility Finder Example

**Planned Structure:**
- Row 1: Location field + Facility Type field (50/50)
- Row 2: Search Distance field + Accessibility options group (33/67)
- Row 3: Action buttons

This approach ensures:
- Clean visual alignment
- Logical information flow
- Scalable option groups
- Consistent responsive behavior