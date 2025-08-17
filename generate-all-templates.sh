#!/bin/bash

# Create template function
create_template() {
  local category=$1
  local name=$2
  local title=$3
  local type=$4
  
  mkdir -p "templates/plain/templates/$category/$name"
  
  if [ "$type" == "dashboard" ]; then
    cat > "templates/plain/templates/$category/$name/index.html" << EOF
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>$title - U.S. Government</title>
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
      <em class="usa-logo__text"><a href="/">$title</a></em>
    </div>
  </div>
  <nav aria-label="Primary navigation" class="usa-nav">
    <ul class="usa-nav__primary usa-accordion">
      <li class="usa-nav__primary-item">
        <a href="#" class="usa-nav-link usa-current"><span>Dashboard</span></a>
      </li>
    </ul>
  </nav>
</header>
<main id="main-content">
  <div class="grid-container">
    <h1>$title</h1>
    <div class="grid-row grid-gap margin-top-4">
      <div class="grid-col-3">
        <div class="usa-card">
          <div class="usa-card__container">
            <div class="usa-card__header">
              <h2 class="usa-card__heading">Metric 1</h2>
            </div>
            <div class="usa-card__body">
              <span class="font-sans-3xl text-bold">12,345</span>
            </div>
          </div>
        </div>
      </div>
      <div class="grid-col-3">
        <div class="usa-card">
          <div class="usa-card__container">
            <div class="usa-card__header">
              <h2 class="usa-card__heading">Metric 2</h2>
            </div>
            <div class="usa-card__body">
              <span class="font-sans-3xl text-bold">98.5%</span>
            </div>
          </div>
        </div>
      </div>
      <div class="grid-col-3">
        <div class="usa-card">
          <div class="usa-card__container">
            <div class="usa-card__header">
              <h2 class="usa-card__heading">Metric 3</h2>
            </div>
            <div class="usa-card__body">
              <span class="font-sans-3xl text-bold">\$2.5M</span>
            </div>
          </div>
        </div>
      </div>
      <div class="grid-col-3">
        <div class="usa-card">
          <div class="usa-card__container">
            <div class="usa-card__header">
              <h2 class="usa-card__heading">Metric 4</h2>
            </div>
            <div class="usa-card__body">
              <span class="font-sans-3xl text-bold">567</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="grid-row margin-top-4">
      <div class="grid-col-12">
        <table class="usa-table usa-table--striped">
          <caption>Recent Activity</caption>
          <thead>
            <tr>
              <th scope="col">Item</th>
              <th scope="col">Status</th>
              <th scope="col">Date</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Sample Item 1</th>
              <td><span class="usa-tag bg-green">Active</span></td>
              <td>Jan 16, 2025</td>
              <td><a href="#">View</a></td>
            </tr>
            <tr>
              <th scope="row">Sample Item 2</th>
              <td><span class="usa-tag bg-yellow">Pending</span></td>
              <td>Jan 15, 2025</td>
              <td><a href="#">View</a></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</main>
<footer class="usa-footer">
  <div class="grid-container usa-footer__return-to-top">
    <a href="#">Return to top</a>
  </div>
</footer>
<script src="https://cdn.jsdelivr.net/npm/@uswds/uswds@3.9.0/dist/js/uswds.min.js"></script>
</body>
</html>
EOF

  elif [ "$type" == "form" ]; then
    cat > "templates/plain/templates/$category/$name/index.html" << EOF
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>$title - U.S. Government</title>
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
<header class="usa-header usa-header--basic">
  <div class="usa-nav-container">
    <div class="usa-navbar">
      <div class="usa-logo">
        <em class="usa-logo__text"><a href="/">Federal Agency</a></em>
      </div>
    </div>
  </div>
</header>
<main id="main-content">
  <div class="grid-container">
    <div class="grid-row">
      <div class="grid-col-12">
        <h1>$title</h1>
        <form class="usa-form">
          <fieldset class="usa-fieldset">
            <legend class="usa-legend usa-legend--large">Personal Information</legend>
            <label class="usa-label" for="first-name">First name <abbr title="required" class="usa-hint usa-hint--required">*</abbr></label>
            <input class="usa-input" id="first-name" name="first-name" type="text" required>
            
            <label class="usa-label" for="last-name">Last name <abbr title="required" class="usa-hint usa-hint--required">*</abbr></label>
            <input class="usa-input" id="last-name" name="last-name" type="text" required>
            
            <label class="usa-label" for="email">Email address <abbr title="required" class="usa-hint usa-hint--required">*</abbr></label>
            <input class="usa-input" id="email" name="email" type="email" required>
            
            <label class="usa-label" for="phone">Phone number</label>
            <input class="usa-input" id="phone" name="phone" type="tel">
          </fieldset>
          
          <fieldset class="usa-fieldset">
            <legend class="usa-legend usa-legend--large">Additional Information</legend>
            <label class="usa-label" for="comments">Comments</label>
            <textarea class="usa-textarea" id="comments" name="comments"></textarea>
            
            <div class="usa-checkbox">
              <input class="usa-checkbox__input" id="agreement" type="checkbox" name="agreement" value="agree" required>
              <label class="usa-checkbox__label" for="agreement">I agree to the terms and conditions</label>
            </div>
          </fieldset>
          
          <div class="margin-top-3">
            <button type="submit" class="usa-button">Submit</button>
            <button type="button" class="usa-button usa-button--outline">Save draft</button>
            <button type="reset" class="usa-button usa-button--unstyled">Clear form</button>
          </div>
        </form>
      </div>
    </div>
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
EOF

  elif [ "$type" == "landing" ]; then
    cat > "templates/plain/templates/$category/$name/index.html" << EOF
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>$title - U.S. Government</title>
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
      <em class="usa-logo__text"><a href="/">$title</a></em>
    </div>
  </div>
</header>
<main id="main-content">
  <section class="usa-hero" aria-label="Introduction">
    <div class="grid-container">
      <div class="usa-hero__callout">
        <h1 class="usa-hero__heading">$title</h1>
        <p>Welcome to our official government service portal. Find resources, apply for benefits, and access government services.</p>
        <a class="usa-button" href="#">Get Started</a>
      </div>
    </div>
  </section>
  
  <section class="grid-container usa-section">
    <div class="grid-row grid-gap">
      <div class="tablet:grid-col-4">
        <div class="usa-card">
          <div class="usa-card__container">
            <div class="usa-card__header">
              <h2 class="usa-card__heading">Service 1</h2>
            </div>
            <div class="usa-card__body">
              <p>Access important government services and resources online.</p>
            </div>
            <div class="usa-card__footer">
              <a href="#" class="usa-button usa-button--outline">Learn more</a>
            </div>
          </div>
        </div>
      </div>
      <div class="tablet:grid-col-4">
        <div class="usa-card">
          <div class="usa-card__container">
            <div class="usa-card__header">
              <h2 class="usa-card__heading">Service 2</h2>
            </div>
            <div class="usa-card__body">
              <p>Apply for benefits and track your application status.</p>
            </div>
            <div class="usa-card__footer">
              <a href="#" class="usa-button usa-button--outline">Learn more</a>
            </div>
          </div>
        </div>
      </div>
      <div class="tablet:grid-col-4">
        <div class="usa-card">
          <div class="usa-card__container">
            <div class="usa-card__header">
              <h2 class="usa-card__heading">Service 3</h2>
            </div>
            <div class="usa-card__body">
              <p>Find information about government programs and initiatives.</p>
            </div>
            <div class="usa-card__footer">
              <a href="#" class="usa-button usa-button--outline">Learn more</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  
  <section class="usa-section usa-section--light">
    <div class="grid-container">
      <h2 class="font-heading-xl margin-y-0">Recent Announcements</h2>
      <ul class="usa-collection">
        <li class="usa-collection__item">
          <div class="usa-collection__body">
            <h3 class="usa-collection__heading">
              <a class="usa-link" href="#">New Program Launch</a>
            </h3>
            <p class="usa-collection__description">Learn about our latest initiative to improve citizen services.</p>
            <ul class="usa-collection__meta" aria-label="More information">
              <li class="usa-collection__meta-item">January 16, 2025</li>
            </ul>
          </div>
        </li>
        <li class="usa-collection__item">
          <div class="usa-collection__body">
            <h3 class="usa-collection__heading">
              <a class="usa-link" href="#">Service Update</a>
            </h3>
            <p class="usa-collection__description">Important changes to our online services platform.</p>
            <ul class="usa-collection__meta" aria-label="More information">
              <li class="usa-collection__meta-item">January 15, 2025</li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </section>
</main>
<footer class="usa-footer">
  <div class="grid-container usa-footer__return-to-top">
    <a href="#">Return to top</a>
  </div>
</footer>
<script src="https://cdn.jsdelivr.net/npm/@uswds/uswds@3.9.0/dist/js/uswds.min.js"></script>
</body>
</html>
EOF

  elif [ "$type" == "search" ]; then
    cat > "templates/plain/templates/$category/$name/index.html" << EOF
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>$title - U.S. Government</title>
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
<header class="usa-header usa-header--basic">
  <div class="usa-nav-container">
    <div class="usa-navbar">
      <div class="usa-logo">
        <em class="usa-logo__text"><a href="/">Search Portal</a></em>
      </div>
    </div>
  </div>
</header>
<main id="main-content">
  <div class="grid-container">
    <h1>$title</h1>
    
    <form class="usa-search usa-search--big" role="search">
      <label class="usa-sr-only" for="search-field">Search</label>
      <input class="usa-input" id="search-field" type="search" name="search" placeholder="Enter search terms">
      <button class="usa-button" type="submit">
        <span class="usa-search__submit-text">Search</span>
      </button>
    </form>
    
    <div class="grid-row grid-gap margin-top-4">
      <div class="grid-col-3">
        <h2>Filter Results</h2>
        <form class="usa-form">
          <fieldset class="usa-fieldset">
            <legend class="usa-legend">Category</legend>
            <div class="usa-checkbox">
              <input class="usa-checkbox__input" id="cat-1" type="checkbox" name="category" value="1">
              <label class="usa-checkbox__label" for="cat-1">Documents</label>
            </div>
            <div class="usa-checkbox">
              <input class="usa-checkbox__input" id="cat-2" type="checkbox" name="category" value="2">
              <label class="usa-checkbox__label" for="cat-2">Services</label>
            </div>
            <div class="usa-checkbox">
              <input class="usa-checkbox__input" id="cat-3" type="checkbox" name="category" value="3">
              <label class="usa-checkbox__label" for="cat-3">Resources</label>
            </div>
          </fieldset>
          
          <fieldset class="usa-fieldset">
            <legend class="usa-legend">Date Range</legend>
            <label class="usa-label" for="date-from">From</label>
            <input class="usa-input" id="date-from" name="date-from" type="date">
            <label class="usa-label" for="date-to">To</label>
            <input class="usa-input" id="date-to" name="date-to" type="date">
          </fieldset>
          
          <button class="usa-button" type="submit">Apply Filters</button>
        </form>
      </div>
      
      <div class="grid-col-9">
        <div class="display-flex flex-justify">
          <p class="text-bold">Showing 1-10 of 234 results</p>
          <div>
            <label class="usa-label" for="sort">Sort by</label>
            <select class="usa-select" id="sort" name="sort">
              <option>Relevance</option>
              <option>Date (Newest)</option>
              <option>Date (Oldest)</option>
              <option>Title (A-Z)</option>
            </select>
          </div>
        </div>
        
        <ul class="usa-list usa-list--unstyled">
          <li class="border-bottom-1px border-base-lighter padding-bottom-2 margin-bottom-2">
            <h3><a href="#" class="usa-link">Search Result Title 1</a></h3>
            <p class="margin-y-1">Brief description of the search result with relevant keywords highlighted. This provides context for the user.</p>
            <p class="text-base-dark text-italic">Category: Documents | Date: Jan 15, 2025</p>
          </li>
          <li class="border-bottom-1px border-base-lighter padding-bottom-2 margin-bottom-2">
            <h3><a href="#" class="usa-link">Search Result Title 2</a></h3>
            <p class="margin-y-1">Another search result with description and relevant information for the user's query.</p>
            <p class="text-base-dark text-italic">Category: Services | Date: Jan 14, 2025</p>
          </li>
          <li class="border-bottom-1px border-base-lighter padding-bottom-2 margin-bottom-2">
            <h3><a href="#" class="usa-link">Search Result Title 3</a></h3>
            <p class="margin-y-1">Additional search result showing how results are displayed in the interface.</p>
            <p class="text-base-dark text-italic">Category: Resources | Date: Jan 13, 2025</p>
          </li>
        </ul>
        
        <nav role="navigation" aria-label="Pagination">
          <ul class="usa-pagination">
            <li class="usa-pagination__item usa-pagination__arrow">
              <a href="#" class="usa-pagination__link usa-pagination__previous-page" aria-label="Previous page">
                <span class="usa-pagination__link-text">Previous</span>
              </a>
            </li>
            <li class="usa-pagination__item usa-pagination__page-no">
              <a href="#" class="usa-pagination__button usa-current" aria-label="Page 1" aria-current="page">1</a>
            </li>
            <li class="usa-pagination__item usa-pagination__page-no">
              <a href="#" class="usa-pagination__button" aria-label="Page 2">2</a>
            </li>
            <li class="usa-pagination__item usa-pagination__page-no">
              <a href="#" class="usa-pagination__button" aria-label="Page 3">3</a>
            </li>
            <li class="usa-pagination__item usa-pagination__arrow">
              <a href="#" class="usa-pagination__link usa-pagination__next-page" aria-label="Next page">
                <span class="usa-pagination__link-text">Next</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
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
EOF
  fi
  
  echo "Created: $category/$name"
}

# Create missing templates based on the catalog

# Create remaining forms if needed
if [ ! -d "templates/plain/templates/forms/passport-application" ]; then
  create_template "forms" "passport-application" "Passport Application" "form"
fi
if [ ! -d "templates/plain/templates/forms/drivers-license" ]; then
  create_template "forms" "drivers-license" "Driver's License Renewal" "form"
fi
if [ ! -d "templates/plain/templates/forms/business-license" ]; then
  create_template "forms" "business-license" "Business License Application" "form"
fi
if [ ! -d "templates/plain/templates/forms/building-permit" ]; then
  create_template "forms" "building-permit" "Building Permit Application" "form"
fi
if [ ! -d "templates/plain/templates/forms/grant-application" ]; then
  create_template "forms" "grant-application" "Grant Application Form" "form"
fi
if [ ! -d "templates/plain/templates/forms/job-application" ]; then
  create_template "forms" "job-application" "Job Application Portal" "form"
fi
if [ ! -d "templates/plain/templates/forms/vendor-registration" ]; then
  create_template "forms" "vendor-registration" "Vendor Registration Form" "form"
fi
if [ ! -d "templates/plain/templates/forms/clinical-trial" ]; then
  create_template "forms" "clinical-trial" "Clinical Trial Enrollment" "form"
fi
if [ ! -d "templates/plain/templates/forms/patent-application" ]; then
  create_template "forms" "patent-application" "Patent Application Form" "form"
fi
if [ ! -d "templates/plain/templates/forms/foia-request" ]; then
  create_template "forms" "foia-request" "FOIA Request Form" "form"
fi

# More forms
create_template "forms" "service-request" "Service Request Portal" "form"
create_template "forms" "maintenance-request" "Maintenance Request Form" "form"
create_template "forms" "it-support" "IT Support Ticket" "form"
create_template "forms" "records-request" "Records Request Form" "form"
create_template "forms" "appointment-scheduling" "Appointment Scheduling Form" "form"
create_template "forms" "complaint-submission" "Complaint Submission Form" "form"
create_template "forms" "feedback-survey" "Feedback Survey Form" "form"
create_template "forms" "translation-request" "Translation Request Form" "form"
create_template "forms" "accommodation-request" "Accommodation Request Form" "form"
create_template "forms" "emergency-assistance" "Emergency Assistance Application" "form"

# Financial forms
create_template "forms" "tax-filing" "Tax Filing Wizard" "form"
create_template "forms" "payment-plan" "Payment Plan Application" "form"
create_template "forms" "reimbursement" "Reimbursement Request" "form"
create_template "forms" "budget-proposal" "Budget Proposal Form" "form"
create_template "forms" "invoice-submission" "Invoice Submission Portal" "form"
create_template "forms" "financial-aid" "Financial Aid Application" "form"
create_template "forms" "loan-application" "Loan Application Form" "form"
create_template "forms" "insurance-claim" "Insurance Claim Form" "form"
create_template "forms" "retirement-calculator" "Retirement Benefits Calculator" "form"
create_template "forms" "direct-deposit" "Direct Deposit Enrollment" "form"

# Create more search templates
create_template "search" "cola-finder" "COLA Rate Finder" "search"
create_template "search" "benefits-checker" "Benefits Eligibility Checker" "search"
create_template "search" "provider-directory" "Provider Directory Search" "search"
create_template "search" "contract-search" "Contract Opportunity Search" "search"
create_template "search" "public-records" "Public Records Search" "search"
create_template "search" "data-browser" "Statistical Data Browser" "search"
create_template "search" "legislative-search" "Legislative Search Portal" "search"
create_template "search" "regulation-search" "Regulation Search Interface" "search"
create_template "search" "case-law" "Case Law Search System" "search"
create_template "search" "patent-search" "Patent/Trademark Search" "search"

# Create more landing pages
create_template "landing" "federal-homepage" "Federal Department Homepage" "landing"
create_template "landing" "state-portal" "State Portal Homepage" "landing"
create_template "landing" "city-government" "City Government Homepage" "landing"
create_template "landing" "county-services" "County Services Homepage" "landing"
create_template "landing" "regulatory-agency" "Regulatory Agency Homepage" "landing"
create_template "landing" "benefits-program" "Benefits Program Landing" "landing"
create_template "landing" "healthcare-program" "Healthcare Program Page" "landing"
create_template "landing" "education-initiative" "Education Initiative Landing" "landing"
create_template "landing" "small-business" "Small Business Portal" "landing"
create_template "landing" "research-program" "Research Program Landing" "landing"

echo "Templates generation complete!"