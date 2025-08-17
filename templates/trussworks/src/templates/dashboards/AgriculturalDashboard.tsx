import React, { useState, useEffect, useRef } from 'react';
import {
  // Layout Components
  GovBanner,
  Header,
  Title,
  NavMenuButton,
  PrimaryNav,
  GridContainer,
  Grid,
  
  // Navigation Components
  Breadcrumb,
  BreadcrumbBar,
  BreadcrumbLink,
  
  // Card Components
  Card,
  CardGroup,
  CardHeader,
  CardBody,
  
  // Form Components
  Form,
  FormGroup,
  Label,
  Select,
  Button,
  ButtonGroup,
  
  // Display Components
  Table,
  Alert,
  Tag,
  Link,
  Icon,
  IconList,
  IconListItem,
  IconListIcon,
  IconListTitle,
  IconListContent,
  
  // Modal Components
  Modal,
  ModalHeading,
  ModalFooter,
  ModalRef,
  
  // Process Components
  ProcessList,
  ProcessListItem,
  ProcessListHeading,
  
  // Footer Components
  Footer,
  FooterNav,
  Identifier,
  IdentifierMasthead,
  IdentifierLogos,
  IdentifierLogo,
  IdentifierIdentity,
  IdentifierLinks,
  IdentifierLink,
  IdentifierGov,
  
  // Other Components
  SummaryBox,
  SummaryBoxHeading,
  SummaryBoxContent,
} from '@trussworks/react-uswds';

const AgriculturalDashboard: React.FC = () => {
  // State Management
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [season, setSeason] = useState('2025-spring');
  const [region, setRegion] = useState('all');
  const [dateRange, setDateRange] = useState('30');
  const [dataType, setDataType] = useState('all');
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [showNotification, setShowNotification] = useState(true);
  const modalRef = useRef<ModalRef>(null);

  // Update timer
  useEffect(() => {
    const timer = setInterval(() => {
      setLastUpdated(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Handlers
  const handleToggleMobileNav = () => setMobileNavOpen(!mobileNavOpen);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowNotification(true);
  };

  const handleExport = () => {
    const data = {
      season,
      region,
      dateRange,
      dataType,
      timestamp: lastUpdated.toISOString(),
      metrics: {
        totalFarmAcres: '896.3M',
        cropProduction: '14.2B',
        marketValue: '$485B',
        activeFarms: '2.01M'
      }
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `agricultural-report-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    modalRef.current?.toggleModal();
  };

  const openExportModal = () => {
    modalRef.current?.toggleModal(undefined, true);
  };

  // Navigation items
  const primaryNavItems = [
    <Link href="#" key="dashboard" variant="nav">
      Dashboard
    </Link>,
    <Link href="#" key="reports" variant="nav">
      Reports
    </Link>,
    <Link href="#" key="analytics" variant="nav">
      Analytics
    </Link>,
    <Link href="#" key="resources" variant="nav">
      Resources
    </Link>,
  ];

  return (
    <div className="usa-app">
      {/* Skip Navigation */}
      <a className="usa-skipnav" href="#main-content">
        Skip to main content
      </a>
      
      {/* Gov Banner */}
      <GovBanner />
      
      {/* Header */}
      <div className="usa-overlay" />
      <Header basic={true} showMobileOverlay={mobileNavOpen}>
        <div className="usa-nav-container">
          <div className="usa-navbar">
            <Title id="basic-logo">
              <a href="/" title="Home" aria-label="USDA Agricultural Dashboard Home">
                <span className="usa-logo__text">USDA Agricultural Dashboard</span>
              </a>
            </Title>
            <NavMenuButton onClick={handleToggleMobileNav} label="Menu" />
          </div>
          <PrimaryNav
            items={primaryNavItems}
            mobileExpanded={mobileNavOpen}
            onToggleMobileNav={handleToggleMobileNav}
          />
        </div>
      </Header>

      {/* Main Content */}
      <main id="main-content">
        <GridContainer>
          {/* Breadcrumb */}
          <BreadcrumbBar>
            <Breadcrumb>
              <BreadcrumbLink href="#">
                <span>Home</span>
              </BreadcrumbLink>
            </Breadcrumb>
            <Breadcrumb>
              <BreadcrumbLink href="#">
                <span>Dashboards</span>
              </BreadcrumbLink>
            </Breadcrumb>
            <Breadcrumb current>
              <span>Agricultural Overview</span>
            </Breadcrumb>
          </BreadcrumbBar>
        </GridContainer>
        
        <section className="usa-section">
          <GridContainer>
            {/* Page Title and Intro */}
            <h1 className="margin-top-0 margin-bottom-2">U.S. Agricultural Overview</h1>
            <p className="usa-intro margin-bottom-4">
              Real-time monitoring of crop production, market prices, and agricultural conditions across America
            </p>

          {/* Alert Banner */}
          {showNotification && (
            <Alert 
              type="success" 
              heading="Data Successfully Updated"
              headingLevel="h4"
              slim
            >
              Agricultural metrics have been refreshed as of {lastUpdated.toLocaleTimeString()}
            </Alert>
          )}

          {/* Filter Controls - Better 2x2 Layout */}
          <CardGroup className="margin-top-4 margin-bottom-4">
            <Card>
              <CardBody>
              <h2 className="margin-top-0 margin-bottom-3">Data Filters</h2>
              <Form onSubmit={handleSubmit}>
                <Grid row gap>
                  <Grid col={12} tablet={{ col: 6 }}>
                    <FormGroup>
                      <Label htmlFor="season">Season</Label>
                      <Select 
                        id="season" 
                        name="season" 
                        value={season}
                        onChange={(e) => setSeason(e.target.value)}
                      >
                        <option value="2025-spring">Spring 2025</option>
                        <option value="2024-winter">Winter 2024</option>
                        <option value="2024-fall">Fall 2024</option>
                        <option value="2024-summer">Summer 2024</option>
                      </Select>
                    </FormGroup>
                  </Grid>
                  <Grid col={12} tablet={{ col: 6 }}>
                    <FormGroup>
                      <Label htmlFor="region">Region</Label>
                      <Select 
                        id="region" 
                        name="region" 
                        value={region}
                        onChange={(e) => setRegion(e.target.value)}
                      >
                        <option value="all">All Regions</option>
                        <option value="midwest">Midwest</option>
                        <option value="south">South</option>
                        <option value="west">West</option>
                        <option value="northeast">Northeast</option>
                      </Select>
                    </FormGroup>
                  </Grid>
                  <Grid col={12} tablet={{ col: 6 }}>
                    <FormGroup>
                      <Label htmlFor="dateRange">Date Range</Label>
                      <Select 
                        id="dateRange" 
                        name="dateRange" 
                        value={dateRange}
                        onChange={(e) => setDateRange(e.target.value)}
                      >
                        <option value="7">Last 7 days</option>
                        <option value="30">Last 30 days</option>
                        <option value="90">Last 90 days</option>
                        <option value="365">Last year</option>
                      </Select>
                    </FormGroup>
                  </Grid>
                  <Grid col={12} tablet={{ col: 6 }}>
                    <FormGroup>
                      <Label htmlFor="dataType">Data Type</Label>
                      <Select 
                        id="dataType" 
                        name="dataType" 
                        value={dataType}
                        onChange={(e) => setDataType(e.target.value)}
                      >
                        <option value="all">All Data</option>
                        <option value="production">Production Only</option>
                        <option value="prices">Prices Only</option>
                        <option value="weather">Weather Only</option>
                      </Select>
                    </FormGroup>
                  </Grid>
                </Grid>
                <div className="margin-top-3">
                  <ButtonGroup>
                    <Button type="submit">
                      Update Dashboard
                    </Button>
                    <Button type="button" outline onClick={openExportModal}>
                      Export Report
                    </Button>
                  </ButtonGroup>
                </div>
              </Form>
              </CardBody>
            </Card>
          </CardGroup>

          {/* Key Metrics Cards */}
          <h2 className="margin-bottom-3">Key Metrics</h2>
          
          <CardGroup className="margin-bottom-4">
            <Card className="grid-col-12 mobile-lg:grid-col-6 tablet:grid-col-6 desktop:grid-col-3">
              <CardHeader>
                <h3 className="usa-card__heading">Total Farm Acres</h3>
              </CardHeader>
              <CardBody>
                <p className="font-sans-3xl text-bold margin-0">896.3M</p>
                <p className="margin-top-1 margin-bottom-0">
                  <Tag className="bg-mint-cool-5">+2.1% YoY</Tag>
                </p>
                <p className="margin-top-2 text-base">
                  Active farmland across 50 states
                </p>
              </CardBody>
            </Card>

            <Card className="grid-col-12 mobile-lg:grid-col-6 tablet:grid-col-6 desktop:grid-col-3">
              <CardHeader>
                <h3 className="usa-card__heading">Crop Production</h3>
              </CardHeader>
              <CardBody>
                <p className="font-sans-3xl text-bold margin-0">14.2B</p>
                <p className="margin-top-1 margin-bottom-0">
                  <Tag className="bg-mint-cool-5">+5.3% YoY</Tag>
                </p>
                <p className="margin-top-2 text-base">
                  Bushels of major crops
                </p>
              </CardBody>
            </Card>

            <Card className="grid-col-12 mobile-lg:grid-col-6 tablet:grid-col-6 desktop:grid-col-3">
              <CardHeader>
                <h3 className="usa-card__heading">Market Value</h3>
              </CardHeader>
              <CardBody>
                <p className="font-sans-3xl text-bold margin-0">$485B</p>
                <p className="margin-top-1 margin-bottom-0">
                  <Tag className="bg-mint-cool-5">+8.7% YoY</Tag>
                </p>
                <p className="margin-top-2 text-base">
                  Total agricultural output
                </p>
              </CardBody>
            </Card>

            <Card className="grid-col-12 mobile-lg:grid-col-6 tablet:grid-col-6 desktop:grid-col-3">
              <CardHeader>
                <h3 className="usa-card__heading">Active Farms</h3>
              </CardHeader>
              <CardBody>
                <p className="font-sans-3xl text-bold margin-0">2.01M</p>
                <p className="margin-top-1 margin-bottom-0">
                  <Tag className="bg-gold-10">-0.8% YoY</Tag>
                </p>
                <p className="margin-top-2 text-base">
                  Family & commercial farms
                </p>
              </CardBody>
            </Card>
          </CardGroup>

          {/* Commodity Prices - Full Width */}
          <CardGroup className="margin-bottom-4">
            <Card>
              <CardHeader>
              <h2 className="usa-card__heading">Commodity Prices</h2>
            </CardHeader>
            <CardBody>
              <Table bordered={false} fullWidth>
                <thead>
                  <tr>
                    <th scope="col">Commodity</th>
                    <th scope="col">Current Price</th>
                    <th scope="col">Change</th>
                    <th scope="col">% Change</th>
                    <th scope="col">Volume</th>
                    <th scope="col">52W High</th>
                    <th scope="col">52W Low</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">Corn</th>
                    <td>$4.82/bu</td>
                    <td className="text-success">+$0.12</td>
                    <td><Tag className="bg-mint-cool-5">+2.5%</Tag></td>
                    <td>1.2M</td>
                    <td>$5.45</td>
                    <td>$4.12</td>
                  </tr>
                  <tr>
                    <th scope="row">Soybeans</th>
                    <td>$10.45/bu</td>
                    <td className="text-error">-$0.08</td>
                    <td><Tag className="bg-red-warm-10">-0.8%</Tag></td>
                    <td>892K</td>
                    <td>$12.30</td>
                    <td>$9.85</td>
                  </tr>
                  <tr>
                    <th scope="row">Wheat</th>
                    <td>$5.68/bu</td>
                    <td className="text-success">+$0.23</td>
                    <td><Tag className="bg-mint-cool-5">+4.2%</Tag></td>
                    <td>756K</td>
                    <td>$6.90</td>
                    <td>$5.20</td>
                  </tr>
                  <tr>
                    <th scope="row">Cotton</th>
                    <td>$0.72/lb</td>
                    <td className="text-success">+$0.02</td>
                    <td><Tag className="bg-mint-cool-5">+2.9%</Tag></td>
                    <td>445K</td>
                    <td>$0.89</td>
                    <td>$0.65</td>
                  </tr>
                </tbody>
              </Table>
              </CardBody>
            </Card>
          </CardGroup>

          {/* Weather Alerts - Horizontal Layout */}
          <h2 className="margin-bottom-3">Weather & Environmental Conditions</h2>
          
          <Grid row gap className="margin-bottom-4">
            <Grid col={12} desktop={{ col: 4 }}>
              <CardGroup>
                <Card>
                  <CardHeader>
                    <h3 className="usa-card__heading">Active Alerts</h3>
                  </CardHeader>
                  <CardBody>
                  <Alert type="warning" slim noIcon headingLevel="h4">
                    <strong>Drought Warning</strong>
                    <br />Western Kansas, Eastern Colorado
                  </Alert>
                  
                  <Alert type="info" slim noIcon headingLevel="h4" className="margin-top-2">
                    <strong>Frost Advisory</strong>
                    <br />Northern Michigan, Wisconsin
                  </Alert>
                  
                  <Alert type="error" slim noIcon headingLevel="h4" className="margin-top-2">
                    <strong>Severe Storm</strong>
                    <br />Oklahoma, Northern Texas
                  </Alert>
                </CardBody>
                </Card>
              </CardGroup>
            </Grid>

            <Grid col={12} desktop={{ col: 4 }}>
              <CardGroup>
                <Card>
                  <CardHeader>
                    <h3 className="usa-card__heading">Soil Moisture Index</h3>
                  </CardHeader>
                  <CardBody>
                  <IconList>
                    <IconListItem>
                      <IconListIcon>
                        <Icon.CheckCircle className="text-success" size={3} />
                      </IconListIcon>
                      <IconListContent>
                        <IconListTitle type="p"><strong>Midwest</strong></IconListTitle>
                        <p className="margin-0">72% - Optimal</p>
                      </IconListContent>
                    </IconListItem>
                    <IconListItem>
                      <IconListIcon>
                        <Icon.CheckCircle className="text-success" size={3} />
                      </IconListIcon>
                      <IconListContent>
                        <IconListTitle type="p"><strong>South</strong></IconListTitle>
                        <p className="margin-0">65% - Good</p>
                      </IconListContent>
                    </IconListItem>
                    <IconListItem>
                      <IconListIcon>
                        <Icon.Warning className="text-warning" size={3} />
                      </IconListIcon>
                      <IconListContent>
                        <IconListTitle type="p"><strong>West</strong></IconListTitle>
                        <p className="margin-0">38% - Low</p>
                      </IconListContent>
                    </IconListItem>
                    <IconListItem>
                      <IconListIcon>
                        <Icon.CheckCircle className="text-success" size={3} />
                      </IconListIcon>
                      <IconListContent>
                        <IconListTitle type="p"><strong>Northeast</strong></IconListTitle>
                        <p className="margin-0">81% - High</p>
                      </IconListContent>
                    </IconListItem>
                  </IconList>
                </CardBody>
                </Card>
              </CardGroup>
            </Grid>

            <Grid col={12} desktop={{ col: 4 }}>
              <CardGroup>
                <Card>
                  <CardHeader>
                    <h3 className="usa-card__heading">Growing Conditions</h3>
                  </CardHeader>
                  <CardBody>
                  <div className="margin-bottom-3">
                    <h4 className="margin-0 text-base">Temperature</h4>
                    <p className="margin-top-05 font-sans-xl text-bold">68°F Average</p>
                    <p className="margin-0 text-base-dark">+2°F from normal</p>
                  </div>
                  <div className="margin-bottom-3">
                    <h4 className="margin-0 text-base">Precipitation</h4>
                    <p className="margin-top-05 font-sans-xl text-bold">2.4" Last 30 days</p>
                    <p className="margin-0 text-base-dark">-0.8" from normal</p>
                  </div>
                  <div>
                    <h4 className="margin-0 text-base">Growing Degree Days</h4>
                    <p className="margin-top-05 font-sans-xl text-bold">1,245 GDD</p>
                    <p className="margin-0 text-base-dark">On track for season</p>
                  </div>
                </CardBody>
                </Card>
              </CardGroup>
            </Grid>
          </Grid>

          {/* Regional Summary */}
          <CardGroup className="margin-bottom-4">
            <Card>
              <CardHeader>
              <h2 className="usa-card__heading">Regional Production Summary</h2>
            </CardHeader>
            <CardBody>
              <div className="usa-table-container--scrollable">
                <Table striped fullWidth>
                  <thead>
                    <tr>
                      <th scope="col">State</th>
                      <th scope="col">Primary Crop</th>
                      <th scope="col">Acres (M)</th>
                      <th scope="col">Yield</th>
                      <th scope="col">Production</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">Iowa</th>
                      <td>Corn</td>
                      <td>13.5</td>
                      <td>198 bu/acre</td>
                      <td>2,673M bu</td>
                      <td><Tag className="bg-success">Excellent</Tag></td>
                    </tr>
                    <tr>
                      <th scope="row">Illinois</th>
                      <td>Soybeans</td>
                      <td>10.8</td>
                      <td>64 bu/acre</td>
                      <td>691M bu</td>
                      <td><Tag className="bg-info">Good</Tag></td>
                    </tr>
                    <tr>
                      <th scope="row">Kansas</th>
                      <td>Wheat</td>
                      <td>7.3</td>
                      <td>48 bu/acre</td>
                      <td>350M bu</td>
                      <td><Tag className="bg-warning">Fair</Tag></td>
                    </tr>
                    <tr>
                      <th scope="row">Texas</th>
                      <td>Cotton</td>
                      <td>6.2</td>
                      <td>825 lb/acre</td>
                      <td>5.1M bales</td>
                      <td><Tag className="bg-info">Good</Tag></td>
                    </tr>
                    <tr>
                      <th scope="row">Nebraska</th>
                      <td>Corn</td>
                      <td>9.9</td>
                      <td>181 bu/acre</td>
                      <td>1,792M bu</td>
                      <td><Tag className="bg-success">Excellent</Tag></td>
                    </tr>
                    <tr>
                      <th scope="row">Minnesota</th>
                      <td>Soybeans</td>
                      <td>7.8</td>
                      <td>52 bu/acre</td>
                      <td>406M bu</td>
                      <td><Tag className="bg-info">Good</Tag></td>
                    </tr>
                  </tbody>
                </Table>
              </div>
              </CardBody>
            </Card>
          </CardGroup>

            {/* Summary Box */}
            <SummaryBox>
              <SummaryBoxHeading headingLevel="h2">
                Dashboard Summary
              </SummaryBoxHeading>
              <SummaryBoxContent>
                <p>
                  Last updated: <strong>{lastUpdated.toLocaleString()}</strong>
                </p>
                <p>
                  This dashboard provides real-time agricultural data for the United States,
                  including crop production metrics, market prices, and regional performance
                  indicators. Data is sourced from USDA National Agricultural Statistics Service.
                </p>
              </SummaryBoxContent>
            </SummaryBox>
          </GridContainer>
        </section>
      </main>

      {/* Footer */}
      <Footer
        size="big"
        primary={
          <GridContainer>
            <FooterNav
              size="big"
              links={[
              [
                <Link href="#" key="crop-reports">Crop Reports</Link>,
                <Link href="#" key="market-analysis">Market Analysis</Link>,
                <Link href="#" key="weather-data">Weather Data</Link>,
                <Link href="#" key="soil-health">Soil Health</Link>,
                <Link href="#" key="pest-management">Pest Management</Link>,
              ],
              [
                <Link href="#" key="farm-programs">Farm Programs</Link>,
                <Link href="#" key="grants-loans">Grants & Loans</Link>,
                <Link href="#" key="conservation">Conservation</Link>,
                <Link href="#" key="research">Research</Link>,
                <Link href="#" key="education">Education</Link>,
              ],
              [
                <Link href="#" key="help-center">Help Center</Link>,
                <Link href="#" key="contact-us">Contact Us</Link>,
                <Link href="#" key="faqs">FAQs</Link>,
                <Link href="#" key="training">Training</Link>,
                <Link href="#" key="webinars">Webinars</Link>,
              ],
              [
                <Link href="#" key="about-usda">About USDA</Link>,
                <Link href="#" key="careers">Careers</Link>,
                <Link href="#" key="news">News & Media</Link>,
                <Link href="#" key="blog">Blog</Link>,
                <Link href="#" key="reports">Reports</Link>,
              ],
            ]}
            />
          </GridContainer>
        }
        secondary={
          <GridContainer>
            <div className="usa-footer__logo">
            <Grid row gap>
              <Grid col="auto">
                <img
                  className="usa-footer__logo-img"
                  src="/img/logo-img.png"
                  alt="USDA logo"
                />
              </Grid>
              <Grid col="auto">
                <h3 className="usa-footer__logo-heading">
                  U.S. Department of Agriculture
                </h3>
                <p className="margin-y-1">
                  <Link href="tel:1-800-727-9540" className="usa-link">
                    (800) 727-9540
                  </Link>
                </p>
                <p className="margin-y-1">
                  <Link href="mailto:nass@usda.gov" className="usa-link">
                    nass@usda.gov
                  </Link>
                </p>
              </Grid>
            </Grid>
          </div>
          </GridContainer>
        }
      />

      {/* Identifier */}
      <Identifier>
        <IdentifierMasthead aria-label="Agency identifier">
          <IdentifierLogos>
            <IdentifierLogo href="#">
              <span className="usa-tag">USDA</span>
            </IdentifierLogo>
          </IdentifierLogos>
          <IdentifierIdentity domain="usda.gov">
            An official website of the{' '}
            <a href="https://www.usda.gov">U.S. Department of Agriculture</a>
          </IdentifierIdentity>
        </IdentifierMasthead>
        <IdentifierLinks navProps={{ 'aria-label': 'Important links' }}>
          <IdentifierLink href="#">About USDA</IdentifierLink>
          <IdentifierLink href="#">Accessibility</IdentifierLink>
          <IdentifierLink href="#">Privacy Policy</IdentifierLink>
          <IdentifierLink href="#">USA.gov</IdentifierLink>
        </IdentifierLinks>
        <IdentifierGov aria-label="U.S. government information">
          Looking for U.S. government information and services?{' '}
          <a href="https://www.usa.gov">Visit USA.gov</a>
        </IdentifierGov>
      </Identifier>

      {/* Export Modal */}
      <Modal
        ref={modalRef}
        id="export-modal"
        aria-labelledby="export-modal-heading"
        aria-describedby="export-modal-description"
      >
        <ModalHeading id="export-modal-heading">
          Export Agricultural Report
        </ModalHeading>
        <div className="usa-prose" id="export-modal-description">
          <p>Select your export options:</p>
          <ProcessList>
            <ProcessListItem>
              <ProcessListHeading type="h4">
                Choose Format
              </ProcessListHeading>
              <p>Export as JSON, CSV, or PDF</p>
            </ProcessListItem>
            <ProcessListItem>
              <ProcessListHeading type="h4">
                Configure Data
              </ProcessListHeading>
              <p>Select date range and metrics</p>
            </ProcessListItem>
            <ProcessListItem>
              <ProcessListHeading type="h4">
                Download
              </ProcessListHeading>
              <p>Save to your device</p>
            </ProcessListItem>
          </ProcessList>
        </div>
        <ModalFooter>
          <ButtonGroup>
            <Button type="button" onClick={handleExport}>
              Download JSON
            </Button>
            <Button type="button" outline onClick={() => modalRef.current?.toggleModal()}>
              Cancel
            </Button>
          </ButtonGroup>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default AgriculturalDashboard;