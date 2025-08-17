#!/bin/bash

mkdir -p templates/plain/templates/workflows/appointment-booking
mkdir -p templates/plain/templates/workflows/queue-management
mkdir -p templates/plain/templates/workflows/public-comment
mkdir -p templates/plain/templates/workflows/event-platform
mkdir -p templates/plain/templates/workflows/resource-reservation
mkdir -p templates/plain/templates/mobile/mobile-dashboard
mkdir -p templates/plain/templates/mobile/mobile-form
mkdir -p templates/plain/templates/mobile/mobile-search
mkdir -p templates/plain/templates/mobile/mobile-directory
mkdir -p templates/plain/templates/mobile/mobile-scanner

# Create simple templates for each
for dir in appointment-booking queue-management public-comment event-platform resource-reservation; do
  cat > "templates/plain/templates/workflows/$dir/index.html" << HTML
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>$dir - U.S. Government</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@uswds/uswds@3.9.0/dist/css/uswds.min.css">
</head>
<body>
<section class="usa-banner" aria-label="Official website of the United States government">
  <div class="usa-accordion">
    <header class="usa-banner__header">
      <div class="usa-banner__inner">
        <div class="grid-col-auto">
          <img aria-hidden="true" class="usa-banner__header-flag" src="https://cdn.jsdelivr.net/npm/@uswds/uswds@3.9.0/dist/img/us_flag_small.png" alt="">
        </div>
      </div>
    </header>
  </div>
</section>
<a class="usa-skipnav" href="#main-content">Skip to main content</a>
<main id="main-content">
  <div class="grid-container">
    <h1>$dir System</h1>
    <p class="usa-intro">Government workflow system</p>
  </div>
</main>
<footer class="usa-footer usa-footer--slim">
  <div class="grid-container usa-footer__return-to-top">
    <a href="#">Return to top</a>
  </div>
</footer>
<script src="https://cdn.jsdelivr.net/npm/@uswds/uswds@3.9.0/dist/js/uswds.min.js"></script>
</body>
</html>
HTML
done

for dir in mobile-dashboard mobile-form mobile-search mobile-directory mobile-scanner; do
  cat > "templates/plain/templates/mobile/$dir/index.html" << HTML
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>$dir - U.S. Government</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@uswds/uswds@3.9.0/dist/css/uswds.min.css">
</head>
<body>
<section class="usa-banner" aria-label="Official website of the United States government">
  <div class="usa-accordion">
    <header class="usa-banner__header">
      <div class="usa-banner__inner">
        <div class="grid-col-auto">
          <img aria-hidden="true" class="usa-banner__header-flag" src="https://cdn.jsdelivr.net/npm/@uswds/uswds@3.9.0/dist/img/us_flag_small.png" alt="">
        </div>
      </div>
    </header>
  </div>
</section>
<a class="usa-skipnav" href="#main-content">Skip to main content</a>
<main id="main-content">
  <div class="grid-container">
    <h1>Mobile $dir</h1>
    <p class="usa-intro">Mobile-optimized interface</p>
  </div>
</main>
<footer class="usa-footer usa-footer--slim">
  <div class="grid-container usa-footer__return-to-top">
    <a href="#">Return to top</a>
  </div>
</footer>
<script src="https://cdn.jsdelivr.net/npm/@uswds/uswds@3.9.0/dist/js/uswds.min.js"></script>
</body>
</html>
HTML
done

echo "Created final templates!"
