// EXTERNAL DEPS ===============================================================
import React from "react";
import Link from "next/link";
import Image from 'next/image';

// INTERNAL DEPS ===============================================================
import {
    Button,
    Header,
    Card,
    Tabs,
    Element,
    Heading1,
    Portion,
    Row,
    Div,
    Text,
    Footer,
    CodeBlock, Heading6
} from "fictoan-react";

// COMPONENTS ==================================================================

// STYLES ======================================================================
import "../experiences-projects.css";
import "../page-experiences.css";

// ASSETS ======================================================================
import YellowStar from "@/assets/images/yellow-star.svg";
import ReportsHero from "@/assets/images/reports/reports-hero.svg";
import ProjectDiscoveryThumbnail from "@/assets/images/thumbnail-for-product-discovery.svg";
import HDFCThumbnail from "@/assets/images/thumbnail-for-hdfc.svg";
import IconTenacity from "@/assets/images/Tenacity.svg";
import IconSandbox from "@/assets/images/BoxWithShapes.svg";
import IconBadge from "@/assets/images/BadgeWithRibbon.svg";
import IconUsability from "@/assets/images/PersonWithSettings.svg";
import IconRocket from "@/assets/images/Rocket.svg";
import IconReports from "@/assets/images/Transactions.svg";
import IconBridge from "@/assets/images/WindowWithBlocks.svg";
import IconTesting from "@/assets/images/FlaskWithBraces.svg";
import IconTools from "@/assets/images/Tools-settings.svg";
import ReportsV1 from "@/assets/images/reports/reports-1.svg";
import ReportsV2 from "@/assets/images/reports/reports-2.svg";
import Reports1Sticky from "@/assets/images/reports/reports-1-sticky.svg";
import Reports1SS from "@/assets/images/reports/reports-v1.svg";
import IconFunnel from "@/assets/images/FunnelWithPlusSymbol.svg";
import IconTransactions from "@/assets/images/PaperWithCoin.svg";
import IconFileType from "@/assets/images/DocumentWithArrow.svg";
import IconHistory from "@/assets/images/DocumentWithGreenTick.svg";
import IconRefunds from "@/assets/images/MagnifyingGlassWithRupee.svg";
import IconJigsaw from "@/assets/images/Jigsaw.svg";
import IconCalendar from "@/assets/images/Calendar.svg";
import IconEnvelope from "@/assets/images/Envelope.svg";
import Notifications from "@/assets/images/reports/notifications.svg";
import DownloadSuccess from "@/assets/images/reports/download-success.svg";
import SchedulerIA from "@/assets/images/reports/scheduler-ia.svg";



export default function RevampingReportsPage() {

    return (

        <article className="project-page">


            {/* HERO SECTION */}

            <Row horizontalPadding="huge" marginTop="medium" marginBottom="small">
                <Portion desktopSpan="10" horizontalMargin="small">
                    <Heading1 className="hero-heading">
                        Revamping reports on Bridge
                    </Heading1>
                </Portion>

                <Portion desktopSpan="2" marginTop="small" hideOnMobile>
                    <YellowStar alt="star" height="32px"/>
                </Portion>

                <Portion desktopSpan="12" mobileSpan="whole" marginLeft="small">
                    <Div marginTop="small">
                        <Text marginBottom="tiny">
                            Together with Kavya and Madhuri from Setu’s design team, I worked on revamping Bridge reports over a span of two years.</Text>
                        <Text marginBottom="tiny">
                            This involved rethinking the experience to cater to different types of products, significant UI enhancements, and rolling out feature updates based on real usage insights.
                        </Text>
                    </Div>
                </Portion>
            </Row>

            <Row className="center-align-svg" marginBottom="tiny">
                <ReportsHero width="100vw" className="hero-alignment" />
            </Row>


            {/* BRIDGE OVERVIEW */}

            <Row horizontalPadding="huge" marginTop="medium" marginBottom="tiny">
                <Portion desktopSpan="whole">
                    <h5>Bridge overview</h5>
                </Portion>
            </Row>

            <Row horizontalPadding="huge" marginTop="nano" marginBottom="tiny">
                <Portion desktopSpan="8">
                    <Card className="bridge-cyan-card" isFullHeight>
                        <IconBridge/>
                        <br/>
                        <Text size="small" marginTop="nano">
                            Bridge is a self-serve B2B platform for Setu’s partners to independently explore, integrate, and operate financial products—with the same ease as SaaS dashboards.
                        </Text>
                    </Card>
                </Portion>
                <Portion desktopSpan="8">
                    <Card className="bridge-grey-card" isFullHeight>
                        <IconTesting/>
                        <br/>
                        <h6>API integration playground</h6>
                        <Text size="small" marginTop="nano">
                            Partners can configure products, test transactions, and simulate end-to-end journeys in sandbox environments before going live.                        </Text>
                    </Card>
                </Portion>
                <Portion desktopSpan="8">
                    <Card className="bridge-grey-card" isFullHeight>
                        <IconTools/>
                        <br/>
                        <h6>Testing & validation Tools</h6>
                        <Text size="small" marginTop="nano">
                            Bridge provides tools to test setups, validate configurations, and catch errors early without developer intervention from Setu’s side.                        </Text>
                    </Card>
                </Portion>
            </Row>

            <Row horizontalPadding="huge" marginTop="none" marginBottom="tiny">
                <Portion desktopSpan="8">
                    <Card className="bridge-grey-card" isFullHeight>
                        <IconReports/>
                        <br/>
                        <h6>Reports & reconciliation</h6>
                        <Text size="small" marginTop="nano">
                            Once live, partners can view detailed reports, making it easier for them to reconcile with their internal systems.
                        </Text>
                    </Card>
                </Portion>
                <Portion desktopSpan="8">
                    <Card className="bridge-grey-card" isFullHeight>
                        <IconUsability/>
                        <br/>
                        <h6>Self configuration</h6>
                        <Text size="small" marginTop="nano">
                            Partners can add/update business details, configure products, manage webhooks, keys, and callback URLs.
                        </Text>
                    </Card>
                </Portion>
                <Portion desktopSpan="8">
                    <Card className="bridge-grey-card" isFullHeight>
                        <IconRocket/>
                        <br/>
                        <h6>Go-live process</h6>
                        <Text size="small" marginTop="nano">
                            Bridge facilitates the onboarding flow for new partners—letting them move from sandbox to production smoothly.
                        </Text>
                    </Card>
                </Portion>
            </Row>


            {/* SOLUTION OVERVIEW */}

            <Row horizontalPadding="huge" marginTop="medium" marginBottom="tiny">
                <Portion desktopSpan="whole">
                    <h5>Solution overview</h5>
                </Portion>
            </Row>

            <Row horizontalPadding="huge" marginTop="none" marginBottom="none">
                <Portion desktopSpan="whole">
                    <Card className="overview-card">
                        <Div className="overview-content">
                            <Div>
                                <Text className="overview-label" marginBottom="nano" fontStyle="serif">
                                    Revamping bridge reports
                                </Text>
                                <Text size="small">
                                    Over a span of two years, this process involved rethinking the experience to cater to different types of products, significant UI enhancements, and rolling out feature updates.
                                </Text>
                            </Div>
                            <Div className="overview-details">
                                <Div marginBottom="tiny">
                                    <Text className="overview-label" marginBottom="nano" fontStyle="serif">GO-LIVE</Text>
                                    <Text size="small">2022–2023</Text>
                                </Div>
                                <Div>
                                    <Text className="overview-label" marginBottom="nano" fontStyle="serif">MY ROLE</Text>
                                    <Text size="small">UI and UX design</Text>
                                </Div>
                            </Div>
                        </Div>
                    </Card>
                </Portion>
            </Row>

            <Row layoutAsFlexbox className="grid-container" horizontalPadding="huge" marginTop="tiny" marginBottom="medium">
                <Card className="horizontal-pointer-card" padding="small">
                    <IconSandbox />
                    <Text>
                        Addressed the limitations of Reports 1.0, which was built for a single product (Bill Collect).
                    </Text>
                </Card>
                <Card className="horizontal-pointer-card" padding="small">
                    <IconUsability />
                    <Text>
                        Improved usability through UI revamp, smarter defaults, and contextual filters.
                    </Text>
                    </Card>
                <Card className="horizontal-pointer-card flex items-center gap-2" padding="small">
                    <IconBadge />
                    <Text>
                        Introduced new features like Reports Scheduler to automate workflows.
                    </Text>
                </Card>
                <Card className="horizontal-pointer-card" padding="small">
                    <IconTenacity />
                    <Text>
                        Focused on flexibility, performance, and adoption across customers.
                    </Text>
                </Card>
            </Row>



            {/* BRIDGE OVER THE YEARS */}

            <Row horizontalPadding="huge" marginTop="medium" marginBottom="tiny">
                <Portion desktopSpan="whole">
                    <h5>Bridge—over the years</h5>
                </Portion>
            </Row>

            <Row horizontalPadding="huge" marginTop="none" marginBottom="tiny">
                <Portion desktopSpan="8">
                    <Card className="bridge-cyan-card" isFullHeight>
                        <h6>2020–21</h6>
                        <br/>
                        <Text fontStyle="serif" marginTop="small">
                            <strong>Reports 1.0</strong>
                        </Text>
                        <Text size="small" marginTop="nano">
                            Designed specifically for bill payments, with basic filtering and search capabilities.
                        </Text>
                        <Text size="small" marginTop="nano">
                            It was tailored to meet the needs of merchants handling transaction queries.
                        </Text>
                    </Card>
                </Portion>
                <Portion desktopSpan="16">
                    <ReportsV1 height="334px" className="please-respond" style={{ borderRadius: "20px" }}/>
                </Portion>
            </Row>

            <Row horizontalPadding="huge" marginTop="none" marginBottom="small">
                <Portion desktopSpan="16">
                    <ReportsV2 height="346px" className="please-respond" style={{ borderRadius: "20px" }}/>
                </Portion>
                <Portion desktopSpan="8">
                    <Card className="bridge-cyan-card" isFullHeight>
                        <h6>2022–23</h6>
                        <br/>
                        <Text fontStyle="serif" marginTop="small">
                            <strong>Reports 2.0</strong>
                        </Text>
                        <Text size="small" marginTop="nano">
                            Revamped the UI based on customer usage patterns and feedback. Introduced a new feature—Reports Scheduler—to enhance the existing experience.                        </Text>
                    </Card>
                </Portion>
            </Row>


            {/* REPORTS 1.0 */}

            <Row horizontalPadding="huge" marginTop="medium" marginBottom="tiny">
                <Portion desktopSpan="whole">
                    <h5>Reports 1.0</h5>
                </Portion>
            </Row>

            <Row horizontalPadding="huge" marginTop="none" marginBottom="tiny">
                <Portion desktopSpan="8" marginRight="nano">
                    <h6>Here is the very first version of reports on the Bridge.</h6>
                    <Text size="small" marginTop="tiny">
                        Designed specifically for bill payments, the reports focused on fetching transactions using filters like date range, instrument type, and bill status. Merchants could also search using various IDs.
                    </Text>
                </Portion>
                <Portion desktopSpan="16">
                    <Reports1Sticky className="please-respond"/>
                </Portion>
            </Row>

            <Row horizontalPadding="huge" marginTop="none" marginBottom="tiny">
                <Portion desktopSpan="whole">
                    <Reports1SS style={{ borderRadius: "20px" }}/>
                </Portion>
            </Row>

            {/* REPORTS 2.0 */}

            <Row horizontalPadding="huge" marginTop="medium" marginBottom="tiny">
                <Portion desktopSpan="whole">
                    <h5>Reports 2.0</h5>
                </Portion>
            </Row>

            <Row horizontalPadding="huge" marginTop="none" marginBottom="tiny">
                <Portion desktopSpan="8">
                    <Div layoutAsFlexbox style={{gap: "16px"}}>
                        <h6>General</h6>
                        <Card className="pointer-card" padding="small" layoutAsFlexbox>
                            <br/>
                            <IconFunnel/>
                            <Text size="small" fontStyle="serif" marginTop="nano">
                                <strong>Search and filters</strong>
                            </Text>
                            <Text size="tiny" marginTop="nano">
                                Reduced upfront filters by moving all product-specific ones into the side panel for a cleaner experience.
                            </Text>
                        </Card>
                        <Card className="pointer-card" padding="small" layoutAsFlexbox>
                            <IconTransactions/>
                            <Text size="small" fontStyle="serif" marginTop="nano">
                                <strong>Transaction details</strong>
                            </Text>
                            <Text size="tiny" marginTop="nano">
                                Clicking on a transaction row reveals detailed information as a slip on the side panel.
                            </Text>
                        </Card>
                    </Div>
                </Portion>
                <Portion desktopSpan="8">
                    <Div layoutAsFlexbox style={{gap: "16px"}}>
                        <h6>Download functionality</h6>
                        <Card className="pointer-card" padding="small" layoutAsFlexbox>
                            <br/>
                            <IconFileType/>
                            <Text size="small" fontStyle="serif" marginTop="nano">
                                <strong>File type and email</strong>
                            </Text>
                            <Text size="tiny" marginTop="nano">
                                Allow CSV and XLS file download. There’s also an option to email the same file to the email id of the user logged in.                            </Text>
                        </Card>
                        <Card className="pointer-card" padding="small" layoutAsFlexbox>
                            <IconHistory/>
                            <Text size="small" fontStyle="serif" marginTop="nano">
                                <strong>Download history</strong>
                            </Text>
                            <Text size="tiny" marginTop="nano">
                                Access to download logs along with option to download the files again.                            </Text>
                        </Card>
                    </Div>
                </Portion>
                <Portion desktopSpan="8">
                    <Div layoutAsFlexbox style={{gap: "16px"}}>
                        <h6>Other changes</h6>
                        <Card className="pointer-card" padding="small" layoutAsFlexbox>
                            <br/>
                            <IconRefunds/>
                            <Text size="small" fontStyle="serif" marginTop="nano">
                                <strong>Transactions and refunds</strong>
                            </Text>
                            <Text size="tiny" marginTop="nano">
                                As per the requirements, transactions and refunds are displayed as different tabs—this also support reports for other products that may have similar bifurcation.                            </Text>
                        </Card>
                    </Div>
                </Portion>
            </Row>


            {/* FIGMA EMBED */}

            <div className="embed-container">
                <iframe
                    width="100%"
                    height="400px"
                    src="https://embed.figma.com/proto/w0anbvzmhQZsuneSdO9U3S/Prototypes?node-id=325-6658&p=f&scaling=scale-down-width&content-scaling=fixed&page-id=325%3A6047&embed-host=share"
                    allowFullScreen>
                </iframe>
            </div>


            {/* Notifications */}

            <Row horizontalPadding="huge" marginTop="nano" marginBottom="tiny">
                <Portion desktopSpan="9" marginRight="nano" isFullHeight>
                    <h6>Catering to edge cases</h6>
                    <Text size="small" marginTop="tiny" marginBottom="tiny">
                        Added notifications for empty search results and limitations related to time range or file size.
                    </Text>
                    <Notifications className="please-respond"/>
                </Portion>
                <Portion desktopSpan="15">
                    <DownloadSuccess className="please-respond"/>
                </Portion>
            </Row>


            {/* REPORTS 2.0 */}


            <Row horizontalPadding="huge" marginTop="medium" marginBottom="tiny">

                <Portion desktopSpan="8" marginRight="nano">
                    <h5>Reports 2.0
                        <br/>
                        reports scheduler</h5>
                    <Text size="small" marginTop="tiny">
                        Reports Scheduler allows users to automate report delivery to team members—regardless of their access to Bridge.
                    </Text>
                    <Text size="small" marginTop="tiny">
                        Users can schedule reports by type, product, and date range filters. They can also view history, edit, enable, or disable schedules as needed.
                    </Text>
                </Portion>

                <Portion desktopSpan="16">
                    <SchedulerIA className="please-respond"/>
                </Portion>
            </Row>


            <Row horizontalPadding="huge" marginTop="none" marginBottom="tiny">

                <Portion desktopSpan="8">
                    <Card className="pointer-card" padding="small" layoutAsFlexbox>
                        <br/>
                        <IconCalendar/>
                        <Text size="small" fontStyle="serif" marginTop="nano">
                            <strong>Flexible scheduling</strong>
                        </Text>
                        <Text size="tiny" marginTop="nano">
                            Set up report schedules tailored to your needs—choose the report type, product, and apply relevant filters.
                        </Text>
                    </Card>
                </Portion>

                <Portion desktopSpan="8">
                    <Card className="pointer-card" padding="small" layoutAsFlexbox>
                        <br/>
                        <IconJigsaw/>
                        <Text size="small" fontStyle="serif" marginTop="nano">
                            <strong>Manage schedules</strong>
                        </Text>
                        <Text size="tiny" marginTop="nano">
                            Easily edit, pause, or disable any of your existing scheduled reports.
                        </Text>
                    </Card>
                </Portion>

                <Portion desktopSpan="8">
                        <Card className="pointer-card" padding="small" layoutAsFlexbox>
                            <br/>
                            <IconEnvelope/>
                            <Text size="small" fontStyle="serif" marginTop="nano">
                                <strong>Automated delivery</strong>
                            </Text>
                            <Text size="tiny" marginTop="nano">
                                Have reports sent directly to your inbox or your team’s, even if they don’t have access to Bridge.                            </Text>
                        </Card>
                </Portion>
            </Row>


            {/* FIGMA EMBED */}

            <div className="embed-container">
                <iframe
                    width="100%"
                    height="400px"
                    src="https://embed.figma.com/proto/w0anbvzmhQZsuneSdO9U3S/Prototypes?node-id=355-7143&scaling=scale-down-width&content-scaling=fixed&page-id=325%3A6047&starting-point-node-id=355%3A7143&embed-host=share"
                    allowFullScreen>
                </iframe>
            </div>

            <Row marginBottom="small"/>


            {/* OTHER PROJECTS */}

            <hr className="brown-hr"/>

            <Row horizontalPadding="huge" marginTop="medium" marginBottom="medium" hideOnMobile>
                <Portion desktopSpan="4">
                    <h5>Other projects</h5>
                </Portion>

                <Portion desktopSpan="18" className="project-thumbnail-row">
                    <Link href="/experiences/assisted-product-discovery">
                        <Card className="project-thumbnail" marginBottom="micro">
                            <ProjectDiscoveryThumbnail alt="assisted-discovery-at-setu"/>
                            <Heading6 className="project-thumbnail-text">Assisted product discovery at
                                Setu</Heading6>
                        </Card>
                    </Link>
                    <Link href="/experiences/hdfc-journeys">
                        <Card className="project-thumbnail" marginBottom="micro">
                            <HDFCThumbnail alt="hdfc"/>
                            <Heading6 className="project-thumbnail-text">Digital journeys for HDFC Bank</Heading6>
                        </Card>
                    </Link>
                </Portion>
            </Row>

        </article>
    );
};


