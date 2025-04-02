// EXTERNAL DEPS ===============================================================
import React from "react";
import Link from "next/link";
import Image from 'next/image';

// INTERNAL DEPS ===============================================================
import {
    Button,
    Header,
    Card,
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
import HDFCHero from "@/assets/images/hdfc-journeys/hdfc-cover.svg";
import Portals from "@/assets/images/hdfc-journeys/hdfc-portals.svg";
import Neobank from "@/assets/images/hdfc-journeys/neobank.svg";
import StickyNeo from "@/assets/images/hdfc-journeys/sticky-neobank.svg";
import AssistedUnassisted from "@/assets/images/hdfc-journeys/assisted-unassisted-sticky.svg";
import ProfilesOne from "@/assets/images/hdfc-journeys/profiles-1.svg";
import ProfilesTwo from "@/assets/images/hdfc-journeys/profiles-2.svg";
import IconDocument from "@/assets/images/DocumentWithGreenTick.svg";
import IconBank from "@/assets/images/bank.svg";
import IconChat from "@/assets/images/ChatBubbles.svg";
import IconLanguage from "@/assets/images/CalloutsWithMultipleScripts.svg";
import IconAssisted from "@/assets/images/Headphones.svg";
import IconUnassisted from "@/assets/images/MobilewithCursor.svg";
import IconNTB from "@/assets/images/BankWithPlus.svg";
import IconETB from "@/assets/images/BankWithTick.svg";
import IconHome from "@/assets/images/HomeWithBraces.svg";
import IconProfile from "@/assets/images/Person.svg";
import IconSettings from "@/assets/images/Tools-settings.svg";
import IconProductOverview from "@/assets/images/Notepad.svg";



import ProjectDiscoveryThumbnail from "@/assets/images/thumbnail-for-product-discovery.svg";
import IconSystemThumbnail from "@/assets/images/thumbnail-for-icon-system.svg";
import IconBoxWithBraces from "@/assets/images/BoxWithBraces.svg";
import IconTeam from "@/assets/images/Team.svg";
import IconCircleWithExclamationMark from "@/assets/images/CircleWithExclamationMark.svg";



export default function HdfcJourneysPage() {

    return (

        <article className="project-page">

            {/* HERO SECTION */}

            <Row horizontalPadding="huge" marginTop="medium" marginBottom="small">
                <Portion desktopSpan="10" horizontalMargin="small">
                    <Heading1 className="hero-heading">
                        Digital journeys for HDFC Bank
                    </Heading1>
                </Portion>

                <Portion desktopSpan="2" marginTop="small" hideOnMobile>
                    <YellowStar alt="star" height="32px"/>
                </Portion>

                <Portion desktopSpan="12" mobileSpan="whole" marginLeft="small">
                    <Div marginTop="small">
                        <Text marginBottom="tiny">
                            For this project, Madhuri and I designed end-to-end digital banking journeys for new and
                            existing HDFC customers, streamlining fragmented online experiences. </Text>
                        <Text marginBottom="tiny">
                            We also created assisted flows to help HDFC agents guide customers in opening Savings or
                            Current accounts & FDs.
                        </Text>
                    </Div>
                </Portion>
            </Row>

            <Row marginBottom="none" className="full-width">
                <HDFCHero height="500px" className="hero-alignment"/>
            </Row>

            {/* PRODBLEM OVERVIEW */}

            <Row horizontalPadding="huge" marginTop="medium" marginBottom="tiny">
                <Portion desktopSpan="whole">
                    <h5>Problem overview</h5>
                </Portion>
            </Row>

            <Row horizontalPadding="huge">
                <Portion desktopSpan="whole">
                    <Text>
                        HDFC Bank had digital journeys for Savings Accounts, Current Accounts, and Fixed Deposits but—
                    </Text>
                </Portion>
            </Row>

            <Row horizontalPadding="huge" marginTop="none" marginBottom="small">
                <Portion desktopSpan="8">
                    <Div layoutAsFlexbox style={{gap: "16px"}} isFullHeight>
                        <Card className="horizontal-pointer-card" padding="small">
                            <IconBoxWithBraces/>
                            <Text>
                                they were fragmented
                            </Text>
                        </Card>
                        <Card className="horizontal-pointer-card" padding="small">
                            <IconTeam/>
                            <Text>
                                were scattered across different HDFC portals
                            </Text>
                        </Card>
                        <Card className="horizontal-pointer-card" padding="small">
                            <IconCircleWithExclamationMark/>
                            <Text>
                                had an inconsistent design language
                            </Text>
                        </Card>
                    </Div>
                </Portion>
                <Portion desktopSpan="16">
                    <Portals height="350px" className="image"/>
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
                                <Text className="overview-label" marginBottom="nano">Digital journeys for HDFC
                                    Bank</Text>
                                <Text size="small">
                                    End-to-end digital banking journeys for new and existing HDFC customers,
                                    streamlining fragmented online experiences—on a single app.
                                </Text>
                            </Div>
                            <Div className="overview-details">
                                <Div marginBottom="tiny">
                                    <Text className="overview-label" marginBottom="nano">GO-LIVE</Text>
                                    <Text size="small">May 2023</Text>
                                </Div>
                                <Div>
                                    <Text className="overview-label" marginBottom="nano">MY ROLE</Text>
                                    <Text size="small">UI and UX design, visual design</Text>
                                </Div>
                            </Div>
                        </Div>
                    </Card>
                </Portion>
            </Row>

            <Row horizontalPadding="huge" marginTop="tiny" marginBottom="none">
                <Portion desktopSpan="whole">
                    The project was structured into three phases, considering its scale and user adoption—
                </Portion>
            </Row>

            <Row horizontalPadding="huge" marginTop="none" marginBottom="small">
                <Card className="pointer-card" padding="small">
                    <Text className="overview-label" size="medium" marginTop="tiny"><strong>PHASE 1</strong></Text>
                    <Text paddingTop="nano">
                        Start with essential journeys—
                    </Text>
                    <Text paddingTop="nano">
                        <li>Savings Accounts</li>
                        <li>Current Accounts</li>
                        <li>Fixed Deposits</li>
                    </Text>
                </Card>

                <Card className="pointer-card" padding="small">
                    <Text className="overview-label" size="medium" marginTop="tiny"><strong>PHASE 2</strong></Text>
                    <Text paddingTop="nano">
                        Gradually phase out fragmented journeys after adoption, guided by user testing and feedback.
                    </Text>
                </Card>

                <Card className="pointer-card" padding="small">
                    <Text className="overview-label" size="medium" marginTop="tiny"><strong>PHASE 3</strong></Text>
                    <Text paddingTop="nano">
                        Work on the next set of journeys—
                    </Text>
                    <Text paddingTop="nano">
                        <li>Credit Card</li>
                        <li>Recurring Deposits</li>
                        <li>Joint Savings Account</li>
                        <li>Personal and business loans</li>
                    </Text>
                </Card>
            </Row>


            {/* SECONDARY RESEARCH */}

            <Row horizontalPadding="huge" marginTop="medium" marginBottom="tiny">
                <Portion desktopSpan="whole">
                    <h5>What we were looking at</h5>
                </Portion>
            </Row>

            <Row horizontalPadding="huge" marginTop="none" marginBottom="tiny">
                <Portion desktopSpan="6">
                    <Card className="hdfc-blue-card" isFullHeight>
                        <Text size="medium" className="white-text">
                            <strong>
                                HDFC Bank wanted to take inspiration from neobanks, revamp the user experience, and
                                unify all journeys under a single platform.
                            </strong>
                        </Text>
                    </Card>
                </Portion>
                <Portion desktopSpan="18">
                    <Neobank className="image"/>
                </Portion>
            </Row>
            <Row horizontalPadding="huge" marginBottom="tiny">
                <Portion desktopSpan="whole">
                    <StickyNeo className="image"/>
                </Portion>
            </Row>


            {/* ASSISTED + UNASSISTED */}

            <Row horizontalPadding="huge" marginTop="medium" marginBottom="tiny">
                <Portion desktopSpan="whole">
                    <h5>Starting with the journeys</h5>
                </Portion>
            </Row>

            <Row layoutAsGrid horizontalPadding="huge" marginBottom="tiny">

                <div className="modules-card">
                    <div className="card-inner">
                        <div className="card-front">
                            <IconAssisted/>
                            <h6>Assisted journey</h6>
                        </div>
                        <div className="card-back">
                            <Text size="medium" fontStyle="serif">These are guided journeys by the bank representative that can happen either on their or
                                the customer’s device.</Text>
                        </div>
                    </div>
                </div>

                <div className="modules-card">
                    <div className="card-inner">
                        <div className="card-front">
                            <IconUnassisted/>
                            <h6>Unassisted journey</h6>
                        </div>
                        <div className="card-back">
                            <Text size="medium" fontStyle="serif">Customers navigate these journeys independently on their own devices.
                            </Text>
                        </div>
                    </div>
                </div>

                <div className="modules-card">
                    <div className="card-inner">
                        <div className="card-front">
                            <IconETB/>
                            <h6>Existing to bank</h6>
                        </div>
                        <div className="card-back">
                            <Text size="medium" fontStyle="serif">ETB customers are existing customers that have complete their KYC process with the bank in the
                                past.
                            </Text>
                        </div>
                    </div>
                </div>

                <div className="modules-card">
                    <div className="card-inner">
                        <div className="card-front">
                            <IconNTB/>
                            <h6>New to bank</h6>
                        </div>
                        <div className="card-back">
                            <Text size="medium" fontStyle="serif">New customers have to complete their KYC process with the bank as a part of the application
                                process.
                            </Text>
                        </div>
                    </div>
                </div>

            </Row>

            {/*<Row horizontalPadding="huge" marginBottom="tiny">*/}
            {/*    <Portion desktopSpan="whole">*/}
            {/*        <AssistedUnassisted className="image"/>*/}
            {/*    </Portion>*/}
            {/*</Row>*/}

            {/* MODULES */}

            <Row horizontalPadding="huge" marginTop="small">
                <Portion desktopSpan="whole">
                    <Text>
                        We opted for a modular approach since parts of the account opening journey were meant to
                        overlap.
                    </Text>
                </Portion>
            </Row>

                <div className="embed-container">
                <iframe
                    width="100%"
                    height="400px"
                    src="https://embed.figma.com/board/lbFVb3CjdPFHL9dCqMZEi1/HDFC-flows?node-id=0-1&embed-host=share"
                    allowFullScreen>
                </iframe>
                </div>


            <Row layoutAsFlexbox horizontalPadding="huge" marginBottom="tiny">

                <Card className="module-card" padding="medium">
                    <h6>
                        KYC
                    </h6>
                    <Text size="small" marginTop="nano">
                    </Text>
                </Card>
                <Card className="module-card" padding="medium">
                    <h6>
                        Personal details
                    </h6>
                    <Text size="small" marginTop="nano">
                    </Text>
                </Card>
                <Card className="module-card" padding="medium">
                    <h6>
                        Bank branch and bank account type
                    </h6>
                    <Text size="small" marginTop="nano">
                    </Text>
                </Card>
                <Card className="module-card" padding="medium">
                    <h6>
                        Nominee details
                    </h6>
                </Card>
                <Card className="module-card" padding="medium">
                    <h6>
                        Business details
                    </h6>
                    <Text size="small" marginTop="nano">
                    </Text>
                </Card>
                <Card className="module-card" padding="medium">
                    <h6>
                        vKYC
                    </h6>
                </Card>
                <Card className="module-card" padding="medium">
                    <h6>
                        Review details
                    </h6>
                    <Text size="small" marginTop="nano">
                    </Text>
                </Card>
                <Card className="module-card" padding="medium">
                    <h6>
                        Fund your account
                    </h6>
                </Card>
            </Row>

            {/* OTHER PARTS OF THE APP */}

            <Row horizontalPadding="huge" marginTop="small">
                <Portion desktopSpan="whole">
                    <Text>
                        Other pieces—
                    </Text>
                </Portion>
            </Row>

            <Row layoutAsGrid horizontalPadding="huge" marginBottom="tiny">
                <div className="modules-card">
                    <div className="card-inner">
                        <div className="card-front">
                            <IconHome/>
                            <h6>Home</h6>
                        </div>
                        <div className="card-back">
                            <Text size="medium" fontStyle="serif">The Home section shows the user's accounts, notifications, and action items while nudging them to explore other banking products.</Text>
                        </div>
                    </div>
                </div>

                <div className="modules-card">
                    <div className="card-inner">
                        <div className="card-front">
                            <IconProfile/>
                            <h6>Profile</h6>
                        </div>
                        <div className="card-back">
                            <Text size="medium" fontStyle="serif">Profile page has personal details of the user along with options to choose bank branch, manage alerts, documents and start vKYC.</Text>
                        </div>
                    </div>
                </div>

                <div className="modules-card">
                    <div className="card-inner">
                        <div className="card-front">
                            <IconSettings/>
                            <h6>Settings</h6>
                        </div>
                        <div className="card-back">
                            <Text size="medium" fontStyle="serif">Settings page has options to change theme and language.
                            </Text>
                        </div>
                    </div>
                </div>

                <div className="modules-card">
                    <div className="card-inner">
                        <div className="card-front">
                            <IconProductOverview/>
                            <h6>Product overview</h6>
                        </div>
                        <div className="card-back">
                            <Text size="medium" fontStyle="serif">This section allows users to view and edit detailed information related to their FD, SA, or CA, such as balance, account number, and nominee details.</Text>
                        </div>
                    </div>
                </div>
            </Row>


                {/* PROFILE AND SETTINGS */}

                <Row horizontalPadding="huge" marginTop="medium" marginBottom="tiny">
                    <Portion desktopSpan="whole">
                        <h5>Profile and settings</h5>
                    </Portion>
                </Row>

                <Row horizontalPadding="huge" marginTop="none" marginBottom="tiny">
                    <Portion desktopSpan="8">
                        <Div layoutAsFlexbox style={{gap: "16px"}} isFullHeight>
                            <Card className="pointer-card" padding="small" layoutAsFlexbox>
                                <IconBank/>
                                <br/>
                                <h6>Choose bank branch</h6>
                                <Text size="tiny" marginTop="nano">
                                    This feature allowed users to select their bank branch while exploring the profile
                                    section. <br/> Once selected, the bank branch module is skipped in the account
                                    flows.
                                </Text>
                            </Card>
                            <Card className="pointer-card" padding="small" layoutAsFlexbox>
                                <IconChat/>
                                <br/>
                                <h6>Messages and alerts</h6>
                                <Text size="tiny" marginTop="nano">
                                    This feature enables the user decide on the frequency and alert type that can be
                                    sent to
                                    them.
                                </Text>
                            </Card>
                        </Div>
                    </Portion>
                    <Portion desktopSpan="16">
                        <ProfilesOne height="350px" className="image"/>
                    </Portion>
                </Row>

                <Row horizontalPadding="huge" marginTop="none" marginBottom="small">
                    <Portion desktopSpan="16">
                        <ProfilesTwo height="350px" className="image"/>
                    </Portion>
                    <Portion desktopSpan="8">
                        <Div layoutAsFlexbox style={{gap: "16px"}} isFullHeight>
                            <Card className="pointer-card" padding="small" layoutAsFlexbox>
                                <IconDocument/>
                                <br/>
                                <h6>Manage documents</h6>
                                <Text size="tiny" marginTop="nano">
                                    This section lets the user look at their documents that are accessible by the bank.
                                    For
                                    phase 1, this is view only.
                                </Text>
                            </Card>
                            <Card className="pointer-card" padding="small" layoutAsFlexbox>
                                <IconLanguage/>
                                <br/>
                                <h6>Change theme and language</h6>
                                <Text size="tiny" marginTop="nano">
                                    This was one of the proposed sections, with the language options primarily aimed at
                                    Tier-2 users. </Text>
                            </Card>
                        </Div>
                    </Portion>
                </Row>


                {/* OTHER PROJECTS */}

                <hr className="brown-hr"/>

                <Row horizontalPadding="huge" marginTop="medium" marginBottom="medium">
                    <Portion desktopSpan="4">
                        <h5>Other projects</h5>
                    </Portion>

                    <Portion desktopSpan="20" className="project-thumbnail-row">
                        <Link href="/experiences/assisted-product-discovery">
                            <Card className="project-thumbnail" marginBottom="micro">
                                <ProjectDiscoveryThumbnail alt="assisted-discovery-at-setu"/>
                                <Heading6 className="project-thumbnail-text">Assisted product discovery at
                                    Setu</Heading6>
                            </Card>
                        </Link>
                        <Link href="/visual/icon-system-for-setu">
                            <Card className="project-thumbnail" marginBottom="micro">
                                <IconSystemThumbnail alt="icon-system"/>
                                <Heading6 className="project-thumbnail-text">Icon system for Setu</Heading6>
                            </Card>
                        </Link>
                    </Portion>
                </Row>

        </article>
);
};


