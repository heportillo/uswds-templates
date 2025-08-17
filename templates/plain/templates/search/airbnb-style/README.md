# Airbnb‑Style Search (USWDS, static)

**Category:** `templates/search/airbnb-style`  
**Stack:** Plain HTML/CSS/JS + USWDS (no frameworks)

This pattern recreates an Airbnb‑style search experience using USWDS components:
- Combo-box style destination search (autocomplete)
- Date range selection (Start/End date pickers)
- Filters modal (checkbox groups, radio group, price range)
- Results with List / Map toggle (cards vs map placeholder)
- Live filtering on keystroke + filter changes
- Accessible labels, keyboard focus, and aria attributes

## Files
- `airbnb-search.html` — USWDS markup + layout
- `airbnb-search.css` — small USWDS‑token friendly overrides
- `airbnb-search.js` — mock data + interactions (no deps beyond USWDS)
- `airbnb-search.stories.mdx` — Storybook documentation (optional; static example)
- `assets/wireframe.png` — visual of intended layout/flow

## How to run
1. Serve the folder with any static server (or open `airbnb-search.html` directly).
2. The page pulls USWDS from CDN.
3. Try:
   - Start typing in the “Destination” field (e.g., `b`, `wash`, `den`).
   - Choose a date range.
   - Open **Filters** → pick types, ratings, price.
   - Toggle **List** ↔ **Map** views.
   - Clear filters with the “Reset all” link.

## Accessibility
- Inputs have `<label>` + `aria-describedby` where appropriate.
- Modal uses USWDS `usa-modal` for focus trapping + keyboard support.
- Buttons convey state with `aria-pressed` for the list/map toggle.
- Error handling example for invalid dates (basic demo).

## USWDS Components used
- Grid (`.grid-container`, `.grid-row`), Buttons, Inputs
- Combo Box (`.usa-combo-box`) — powered by USWDS JS
- Date Picker (`.usa-date-picker`) — start/end fields
- Modal (`.usa-modal`), Accordions (`.usa-accordion`), Form controls
- Card group (`.usa-card-group`) for results

## Notes
- Data is mock JSON inside `airbnb-search.js`.
- Map is a light placeholder with pins; replace with a real map when needed.
- All styling prefers USWDS tokens and spacing scale.
