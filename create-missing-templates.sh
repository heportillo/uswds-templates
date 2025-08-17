#!/bin/bash

# Function to create a dashboard template
create_dashboard() {
  local name=$1
  local title=$2
  
  cat > "templates/plain/templates/dashboards/$name/index.html" << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TITLE_PLACEHOLDER - U.S. Government</title>
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
        <div class="grid-col-fill tablet:grid-col-auto" aria-hidden="true">
          <p class="usa-banner__header-text">An official website of the United States government</p>
        </div>
      </div>
    </header>
  </div>
</section>

<a class="usa-skipnav" href="#main-content">Skip to main content</a>

<header class="usa-header usa-header--extended">
  <div class="usa-navbar">
    <div class="usa-logo">
      <em class="usa-logo__text"><a href="/">TITLE_PLACEHOLDER</a></em>
    </div>
    <button type="button" class="usa-menu-btn">Menu</button>
  </div>
  <nav aria-label="Primary navigation" class="usa-nav">
    <div class="usa-nav__inner">
      <button type="button" class="usa-nav__close">
        <img src="https://cdn.jsdelivr.net/npm/@uswds/uswds@3.9.0/dist/img/usa-icons/close.svg" role="img" alt="Close">
      </button>
      <ul class="usa-nav__primary usa-accordion">
        <li class="usa-nav__primary-item">
          <a href="#" class="usa-nav-link usa-current"><span>Dashboard</span></a>
        </li>
        <li class="usa-nav__primary-item">
          <a href="#" class="usa-nav-link"><span>Reports</span></a>
        </li>
        <li class="usa-nav__primary-item">
          <a href="#" class="usa-nav-link"><span>Analytics</span></a>
        </li>
      </ul>
    </div>
  </nav>
</header>

<main id="main-content">
  <div class="grid-container">
    <div class="grid-row margin-top-2">
      <div class="grid-col-12">
        <h1>TITLE_PLACEHOLDER</h1>
        <p class="usa-intro">Monitor and analyze key metrics and performance indicators.</p>
      </div>
    </div>

    <div class="grid-row margin-top-3">
      <div class="grid-col-12 tablet:grid-col-8">
        <form class="usa-form">
          <div class="grid-row grid-gap">
            <div class="grid-col-auto">
              <label class="usa-label" for="date-start">From</label>
              <input class="usa-input" id="date-start" name="date-start" type="date" value="2025-01-01">
            </div>
            <div class="grid-col-auto">
              <label class="usa-label" for="date-end">To</label>
              <input class="usa-input" id="date-end" name="date-end" type="date" value="2025-01-17">
            </div>
            <div class="grid-col-auto display-flex flex-align-end">
              <button class="usa-button" type="submit">Update</button>
            </div>
          </div>
        </form>
      </div>
      <div class="grid-col-12 tablet:grid-col-4 text-right">
        <button class="usa-button usa-button--outline">Export Dashboard</button>
      </div>
    </div>

    <div class="grid-row grid-gap margin-top-4">
      <div class="grid-col-12 tablet:grid-col-6 desktop:grid-col-3">
        <div class="usa-card">
          <div class="usa-card__container">
            <div class="usa-card__header">
              <h2 class="usa-card__heading">Metric 1</h2>
            </div>
            <div class="usa-card__body">
              <span class="font-sans-3xl text-bold">METRIC1_VALUE</span>
              <p class="margin-top-1 text-base">METRIC1_DESC</p>
            </div>
          </div>
        </div>
      </div>
      <div class="grid-col-12 tablet:grid-col-6 desktop:grid-col-3">
        <div class="usa-card">
          <div class="usa-card__container">
            <div class="usa-card__header">
              <h2 class="usa-card__heading">Metric 2</h2>
            </div>
            <div class="usa-card__body">
              <span class="font-sans-3xl text-bold">METRIC2_VALUE</span>
              <p class="margin-top-1 text-base">METRIC2_DESC</p>
            </div>
          </div>
        </div>
      </div>
      <div class="grid-col-12 tablet:grid-col-6 desktop:grid-col-3">
        <div class="usa-card">
          <div class="usa-card__container">
            <div class="usa-card__header">
              <h2 class="usa-card__heading">Metric 3</h2>
            </div>
            <div class="usa-card__body">
              <span class="font-sans-3xl text-bold">METRIC3_VALUE</span>
              <p class="margin-top-1 text-base">METRIC3_DESC</p>
            </div>
          </div>
        </div>
      </div>
      <div class="grid-col-12 tablet:grid-col-6 desktop:grid-col-3">
        <div class="usa-card">
          <div class="usa-card__container">
            <div class="usa-card__header">
              <h2 class="usa-card__heading">Metric 4</h2>
            </div>
            <div class="usa-card__body">
              <span class="font-sans-3xl text-bold">METRIC4_VALUE</span>
              <p class="margin-top-1 text-base">METRIC4_DESC</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="grid-row margin-top-4">
      <div class="grid-col-12">
        <h2>Recent Data</h2>
        <div class="usa-table-container--scrollable" tabindex="0">
          <table class="usa-table usa-table--striped">
            <caption>Dashboard data overview</caption>
            <thead>
              <tr>
                <th scope="col">Item</th>
                <th scope="col">Status</th>
                <th scope="col">Value</th>
                <th scope="col">Date</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Sample Item 1</th>
                <td><span class="usa-tag bg-green">Active</span></td>
                <td>125,000</td>
                <td>Jan 17, 2025</td>
                <td><a href="#" class="usa-link">View</a></td>
              </tr>
              <tr>
                <th scope="row">Sample Item 2</th>
                <td><span class="usa-tag bg-yellow">Pending</span></td>
                <td>85,500</td>
                <td>Jan 16, 2025</td>
                <td><a href="#" class="usa-link">View</a></td>
              </tr>
              <tr>
                <th scope="row">Sample Item 3</th>
                <td><span class="usa-tag bg-green">Active</span></td>
                <td>210,000</td>
                <td>Jan 15, 2025</td>
                <td><a href="#" class="usa-link">View</a></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</main>

<footer class="usa-footer">
  <div class="grid-container usa-footer__return-to-top">
    <a href="#">Return to top</a>
  </div>
  <div class="usa-footer__primary-section">
    <nav class="usa-footer__nav" aria-label="Footer navigation">
      <ul class="grid-row grid-gap">
        <li class="mobile-lg:grid-col-4 desktop:grid-col-auto usa-footer__primary-content">
          <a class="usa-footer__primary-link" href="#">Documentation</a>
        </li>
        <li class="mobile-lg:grid-col-4 desktop:grid-col-auto usa-footer__primary-content">
          <a class="usa-footer__primary-link" href="#">Support</a>
        </li>
      </ul>
    </nav>
  </div>
</footer>

<script src="https://cdn.jsdelivr.net/npm/@uswds/uswds@3.9.0/dist/js/uswds.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@uswds/uswds@3.9.0/dist/js/uswds-init.min.js"></script>
</body>
</html>
EOF

  # Replace placeholders with specific content
  sed -i "s/TITLE_PLACEHOLDER/$title/g" "templates/plain/templates/dashboards/$name/index.html"
  
  # Add specific metrics based on dashboard type
  case "$name" in
    "energy-consumption")
      sed -i "s/METRIC1_VALUE/324 MWh/g" "templates/plain/templates/dashboards/$name/index.html"
      sed -i "s/METRIC1_DESC/Daily consumption/g" "templates/plain/templates/dashboards/$name/index.html"
      sed -i "s/METRIC2_VALUE/42%/g" "templates/plain/templates/dashboards/$name/index.html"
      sed -i "s/METRIC2_DESC/Renewable sources/g" "templates/plain/templates/dashboards/$name/index.html"
      sed -i "s/METRIC3_VALUE/\$1.2M/g" "templates/plain/templates/dashboards/$name/index.html"
      sed -i "s/METRIC3_DESC/Monthly cost/g" "templates/plain/templates/dashboards/$name/index.html"
      sed -i "s/METRIC4_VALUE/98.5%/g" "templates/plain/templates/dashboards/$name/index.html"
      sed -i "s/METRIC4_DESC/Grid reliability/g" "templates/plain/templates/dashboards/$name/index.html"
      ;;
    "agricultural-dashboard")
      sed -i "s/METRIC1_VALUE/2.4M/g" "templates/plain/templates/dashboards/$name/index.html"
      sed -i "s/METRIC1_DESC/Acres monitored/g" "templates/plain/templates/dashboards/$name/index.html"
      sed -i "s/METRIC2_VALUE/\$4.8B/g" "templates/plain/templates/dashboards/$name/index.html"
      sed -i "s/METRIC2_DESC/Crop value/g" "templates/plain/templates/dashboards/$name/index.html"
      sed -i "s/METRIC3_VALUE/87%/g" "templates/plain/templates/dashboards/$name/index.html"
      sed -i "s/METRIC3_DESC/Yield forecast/g" "templates/plain/templates/dashboards/$name/index.html"
      sed -i "s/METRIC4_VALUE/156K/g" "templates/plain/templates/dashboards/$name/index.html"
      sed -i "s/METRIC4_DESC/Active farms/g" "templates/plain/templates/dashboards/$name/index.html"
      ;;
    *)
      sed -i "s/METRIC1_VALUE/12,345/g" "templates/plain/templates/dashboards/$name/index.html"
      sed -i "s/METRIC1_DESC/Total items/g" "templates/plain/templates/dashboards/$name/index.html"
      sed -i "s/METRIC2_VALUE/98.5%/g" "templates/plain/templates/dashboards/$name/index.html"
      sed -i "s/METRIC2_DESC/Success rate/g" "templates/plain/templates/dashboards/$name/index.html"
      sed -i "s/METRIC3_VALUE/\$2.5M/g" "templates/plain/templates/dashboards/$name/index.html"
      sed -i "s/METRIC3_DESC/Total value/g" "templates/plain/templates/dashboards/$name/index.html"
      sed -i "s/METRIC4_VALUE/567/g" "templates/plain/templates/dashboards/$name/index.html"
      sed -i "s/METRIC4_DESC/Active users/g" "templates/plain/templates/dashboards/$name/index.html"
      ;;
  esac
  
  echo "Created: $name"
}

# Create all missing dashboards
create_dashboard "agricultural-dashboard" "Agricultural Dashboard"
create_dashboard "border-control" "Border Control Dashboard"
create_dashboard "call-center" "Call Center Dashboard"
create_dashboard "census-data" "Census Data Dashboard"
create_dashboard "crime-statistics" "Crime Statistics Dashboard"
create_dashboard "disaster-recovery" "Disaster Recovery Dashboard"
create_dashboard "economic-indicators" "Economic Indicators Dashboard"
create_dashboard "election-monitoring" "Election Monitoring Dashboard"
create_dashboard "energy-consumption" "Energy Consumption Dashboard"
create_dashboard "environmental-monitoring" "Environmental Monitoring Dashboard"
create_dashboard "facility-management" "Facility Management Dashboard"
create_dashboard "procurement-dashboard" "Procurement Dashboard"
create_dashboard "project-management" "Project Management Dashboard"
create_dashboard "public-health" "Public Health Dashboard"
create_dashboard "quality-assurance" "Quality Assurance Dashboard"
create_dashboard "research-metrics" "Research Metrics Dashboard"
create_dashboard "tourism-analytics" "Tourism Analytics Dashboard"
create_dashboard "training-management" "Training Management Dashboard"
create_dashboard "transportation-analytics" "Transportation Analytics Dashboard"

echo "All missing dashboards created!"