#!/bin/bash
# USWDS Template Generator Script
# Usage: ./generate-template.sh <category> <name> <title>

CATEGORY=$1
NAME=$2
TITLE=$3

if [ -z "$CATEGORY" ] || [ -z "$NAME" ] || [ -z "$TITLE" ]; then
  echo "Usage: ./generate-template.sh <category> <name> <title>"
  echo "Example: ./generate-template.sh dashboards system-admin 'System Administrator Dashboard'"
  exit 1
fi

# Create directory
mkdir -p "templates/plain/templates/${CATEGORY}/${NAME}"

# Generate template with full USWDS structure
cat > "templates/plain/templates/${CATEGORY}/${NAME}/index.html" << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TITLE_PLACEHOLDER - U.S. Government</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@uswds/uswds@3.9.0/dist/css/uswds.min.css">
</head>
<body>

<!-- ========== GOVERNMENT BANNER ========== -->
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
        <button type="button" class="usa-accordion__button usa-banner__button" aria-expanded="false" aria-controls="gov-banner-BANNER_ID">
          <span class="usa-banner__button-text">Here's how you know</span>
        </button>
      </div>
    </header>
    <div class="usa-banner__content usa-accordion__content" id="gov-banner-BANNER_ID" hidden>
      <div class="grid-row grid-gap-lg">
        <div class="usa-banner__guidance tablet:grid-col-6">
          <img class="usa-banner__icon usa-media-block__img" src="https://cdn.jsdelivr.net/npm/@uswds/uswds@3.9.0/dist/img/icon-dot-gov.svg" role="img" alt="" aria-hidden="true">
          <div class="usa-media-block__body">
            <p>
              <strong>Official websites use .gov</strong><br/>
              A <strong>.gov</strong> website belongs to an official government organization in the United States.
            </p>
          </div>
        </div>
        <div class="usa-banner__guidance tablet:grid-col-6">
          <img class="usa-banner__icon usa-media-block__img" src="https://cdn.jsdelivr.net/npm/@uswds/uswds@3.9.0/dist/img/icon-https.svg" role="img" alt="" aria-hidden="true">
          <div class="usa-media-block__body">
            <p>
              <strong>Secure .gov websites use HTTPS</strong><br/>
              A lock or <strong>https://</strong> means you've safely connected to the .gov website.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ========== HEADER SECTION ========== -->
<header class="usa-header usa-header--extended">
  <div class="usa-navbar">
    <div class="usa-logo">
      <em class="usa-logo__text">
        <a href="/" title="Home">TITLE_PLACEHOLDER</a>
      </em>
    </div>
    <button type="button" class="usa-menu-btn">Menu</button>
  </div>
</header>

<!-- ========== MAIN CONTENT ========== -->
<main id="main-content">
  <section class="usa-section">
    <div class="grid-container">
      <h1>TITLE_PLACEHOLDER</h1>
      <p class="usa-intro">This template is ready for customization.</p>
    </div>
  </section>
</main>

<!-- ========== FOOTER SECTION ========== -->
<footer class="usa-footer usa-footer--slim">
  <div class="usa-footer__primary-section">
    <div class="usa-footer__primary-container grid-container">
      <div class="usa-footer__contact-links">
        <a class="usa-footer__contact-heading" href="#">Agency Contact Center</a>
      </div>
    </div>
  </div>
</footer>

<script src="https://cdn.jsdelivr.net/npm/@uswds/uswds@3.9.0/dist/js/uswds.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@uswds/uswds@3.9.0/dist/js/uswds-init.min.js"></script>

</body>
</html>
EOF

# Replace placeholders
sed -i "s/TITLE_PLACEHOLDER/${TITLE}/g" "templates/plain/templates/${CATEGORY}/${NAME}/index.html"
sed -i "s/BANNER_ID/${NAME}/g" "templates/plain/templates/${CATEGORY}/${NAME}/index.html"

# Update router
ROUTE="      '/${CATEGORY}/${NAME}': '/templates/${CATEGORY}/${NAME}/index.html',"
ROUTER_FILE="templates/plain/src/router.js"

# Check if route already exists
if ! grep -q "/${CATEGORY}/${NAME}" "$ROUTER_FILE"; then
  # Add route before the closing brace of routes object
  sed -i "/this.routes = {/,/};/ {
    /};/i\\${ROUTE}
  }" "$ROUTER_FILE"
  echo "✅ Route added to router"
fi

echo "✅ Created: ${CATEGORY}/${NAME}"
echo "   Title: ${TITLE}"
echo "   Path: templates/plain/templates/${CATEGORY}/${NAME}/index.html"