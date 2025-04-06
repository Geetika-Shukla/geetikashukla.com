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
import HDFCHero from "@/assets/images/hdfc-journeys/hdfc-cover.svg";
import Portals from "@/assets/images/hdfc-journeys/hdfc-portals.svg";
import StickyNeo from "@/assets/images/hdfc-journeys/sticky-neobank.svg";
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
import IconKYC from "@/assets/images/KYC.svg";
import IconVKYC from "@/assets/images/PersonScan.svg";
import IconBizDetails from "@/assets/images/Buildings.svg";
import IconPersonalDetails from "@/assets/images/DocumentWithDetails.svg";
import IconReviewDetails from "@/assets/images/FolderWithMagnifyingGlass.svg";
import IconBankBranch from "@/assets/images/Banking.svg";
import IconRocket from "@/assets/images/Rocket.svg";
import IconUsers from "@/assets/images/PeopleWithColouredHeads.svg";
import IconBubble from "@/assets/images/ThoughtCloud.svg";
import IconNominee from "@/assets/images/People.svg";
import IconFundYourAccount from "@/assets/images/BankWithCoin.svg";
import EdgeCaseOne from "@/assets/images/hdfc-journeys/edge case-1.svg";
import EdgeCaseTwo from "@/assets/images/hdfc-journeys/edge case-2.svg";
import EdgeCaseThree from "@/assets/images/hdfc-journeys/edge case-3.svg";
import EdgeCaseFour from "@/assets/images/hdfc-journeys/edge case-4.svg";
import EdgeCaseFive from "@/assets/images/hdfc-journeys/edge case-5.svg";
import IconTeam from "@/assets/images/Team.svg";
import IconCircleWithExclamationMark from "@/assets/images/CircleWithExclamationMark.svg";
import IconEdgeCase from "@/assets/images/Jigsaw.svg";
import IconErrorState from "@/assets/images/CircleWithExclamationMarkRed.svg";
import ProjectDiscoveryThumbnail from "@/assets/images/thumbnail-for-product-discovery.svg";
import IconSystemThumbnail from "@/assets/images/thumbnail-for-icon-system.svg";
import IconBoxWithBraces from "@/assets/images/BoxWithBraces.svg";
import IconDiamond from "@/assets/images/Integrity.svg";
import ErrorStateOne from "@/assets/images/hdfc-journeys/error-state-1.svg";
import ErrorStateTwo from "@/assets/images/hdfc-journeys/error-state-2.svg";
import ErrorStateThree from "@/assets/images/hdfc-journeys/error-state-3.svg";
import ErrorStateFive from "@/assets/images/hdfc-journeys/error-state-5.svg";
import ErrorStateSix from "@/assets/images/hdfc-journeys/error-state-6.svg";
import TestingOne from "@/assets/images/hdfc-journeys/testing-1.svg";
import TestingTwo from "@/assets/images/hdfc-journeys/testing-2.svg";
import TestingThree from "@/assets/images/hdfc-journeys/testing-3.svg";
import TestingFour from "@/assets/images/hdfc-journeys/testing-4.svg";
import AssistedHero from "@/assets/images/product-discovery/assisted-components.svg";



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

            <Row className="center-align-svg" marginBottom="tiny">
                <HDFCHero width="100vw" className="hero-alignment" />
            </Row>


            {/* PROBLEM OVERVIEW */}

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

            <Row horizontalPadding="huge" marginTop="none" marginBottom="tiny">
                    <Portion desktopSpan="8">
                        <Card className="horizontal-pointer-card">
                            <IconBoxWithBraces/>
                            <Text>
                                the digital journeys were fragmented
                            </Text>
                        </Card>
                    </Portion>

                    <Portion desktopSpan="8">
                        <Card className="horizontal-pointer-card">
                            <IconTeam/>
                            <Text>
                                they were scattered across different HDFC portals
                            </Text>
                        </Card>
                    </Portion>

                    <Portion desktopSpan="8">
                        <Card className="horizontal-pointer-card">
                            <IconCircleWithExclamationMark/>
                            <Text>
                                they had an inconsistent design language
                            </Text>
                        </Card>
                    </Portion>
            </Row>

            <Row horizontalPadding="huge" marginTop="nano" marginBottom="small">
                    <Portion desktopSpan="whole">
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
                                <Text className="overview-label" marginBottom="nano" fontStyle="serif">Digital journeys for HDFC
                                    Bank</Text>
                                <Text size="small">
                                    End-to-end digital banking journeys for new and existing HDFC customers,
                                    streamlining fragmented online experiences—on a single app.
                                </Text>
                            </Div>
                            <Div className="overview-details">
                                <Div marginBottom="tiny">
                                    <Text className="overview-label" marginBottom="nano" fontStyle="serif">GO-LIVE</Text>
                                    <Text size="small">May 2023</Text>
                                </Div>
                                <Div>
                                    <Text className="overview-label" marginBottom="nano" fontStyle="serif">MY ROLE</Text>
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

            <Row horizontalPadding="huge" marginTop="none" marginBottom="tiny">
                <Card className="pointer-card" padding="small">
                    <Text className="overview-label" size="medium" marginTop="tiny" fontStyle="serif"><strong>PHASE 1</strong></Text>
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
                    <Text className="overview-label" size="medium" marginTop="tiny" fontStyle="serif"><strong>PHASE 2</strong></Text>
                    <Text paddingTop="nano">
                        Gradually phase out fragmented journeys after adoption, guided by user testing and feedback.
                    </Text>
                </Card>

                <Card className="pointer-card" padding="small">
                    <Text className="overview-label" size="medium" marginTop="tiny" fontStyle="serif"><strong>PHASE 3</strong></Text>
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

            <Row horizontalPadding="huge" marginTop="none" marginBottom="tiny" isFullHeight>
                <Portion desktopSpan="12">
                    <Card className="hdfc-blue-card" isFullHeight>
                        <IconUsers/>
                        <br/>
                        <h6>Target audience</h6>
                        <Text size="small" marginTop="nano">
                                As India’s largest private sector bank, HDFC Bank’s apps and portals cater to a broad user base, unlike niche neobanks. The primary audience includes users from Tier 2 and Tier 3 cities.
                        </Text>
                    </Card>
                </Portion>
                <Portion desktopSpan="12">
                    <Card className="horizontal-pointer-card">
                        <IconRocket/>
                        <Text>
                            HDFC Bank wanted to take <strong>inspiration from neobanks, revamp the user experience</strong>, and unify all journeys under a single platform.
                        </Text>
                    </Card>
                    <br/>
                    <Card className="horizontal-pointer-card">
                        <IconBubble/>
                        <Text>
                            That said, their approach needed to <strong>innovation with the trust and familiarity</strong> expected by their broad user base.                        </Text>
                    </Card>
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

            <Row horizontalPadding="huge" marginTop="small" marginBottom="tiny">
                <Portion desktopSpan="whole">
                    <h6>Types of journeys and customers—</h6>
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
                            <Text size="medium" fontStyle="serif">These are guided journeys by the bank representative
                                that can happen either on their or
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
                            <Text size="medium" fontStyle="serif">Customers navigate these journeys independently on
                                their own devices.
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
                            <Text size="medium" fontStyle="serif">ETB customers are existing customers that have
                                complete their KYC process with the bank in the
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
                            <Text size="medium" fontStyle="serif">New customers have to complete their KYC process with
                                the bank as a part of the application
                                process.
                            </Text>
                        </div>
                    </div>
                </div>

            </Row>

            <Row horizontalPadding="huge" marginTop="small">
                <Portion desktopSpan="whole">
                    <Text>
                        We opted for a modular approach since parts of the account opening journey were meant to
                        overlap.
                    </Text>
                </Portion>
            </Row>


            {/* FIGJAM EMBED */}

            <div className="embed-container">
                <iframe
                    width="100%"
                    height="400px"
                    src="https://embed.figma.com/board/lbFVb3CjdPFHL9dCqMZEi1/HDFC-IA?embed-host=share"
                    allowFullScreen>
                </iframe>
            </div>

            <Card className="full-width-banner" marginTop="tiny" marginBottom="tiny">
                <Div className="banner-content" paddingLeft="large">
                    <Div className="banner-text">
                        <Text className="overview-label" marginBottom="nano">Experience the Solution in Action</Text>
                        <Text>See how customer type—ETB or NTB—impacts the flow, in both assisted and unassisted scenarios.</Text>
                    </Div>
                </Div>
                <Div className="banner-links" paddingRight="large">
                    <Text size="tiny">
                        <Link href="https://www.figma.com/proto/w0anbvzmhQZsuneSdO9U3S/HDFC?node-id=3-1818&p=f&t=fWs3zEiyB0EoBIXJ-1&scaling=scale-down&content-scaling=responsive&page-id=0%3A1&starting-point-node-id=3%3A1818&show-proto-sidebar=1" target="_blank" rel="noopener noreferrer">
                            Link to assisted flow
                        </Link>
                    </Text>
                    <Text size="tiny">
                        <Link href="https://www.figma.com/proto/w0anbvzmhQZsuneSdO9U3S/HDFC?node-id=3-1625&p=f&t=fWs3zEiyB0EoBIXJ-1&scaling=scale-down&content-scaling=responsive&page-id=0%3A1&starting-point-node-id=3%3A1625&show-proto-sidebar=1" target="_blank" rel="noopener noreferrer">
                            Link to unassisted flow
                        </Link>
                    </Text>
                </Div>
            </Card>

            {/* MAIN MODULES */}

            <Row horizontalPadding="huge" marginTop="small" marginBottom="tiny">
                <Portion desktopSpan="whole">
                    <h6>Primary modules—</h6>
                </Portion>
            </Row>

            <Row layoutAsFlexbox horizontalPadding="huge" marginBottom="tiny">
                <div className="modules-card">
                    <div className="card-inner">
                        <div className="card-front">
                            <IconKYC/>
                            <h6>KYC</h6>
                        </div>
                        <div className="card-back">
                            <Text size="medium" fontStyle="serif">This includes PAN and Aadhaar verification, along with GST in case of current account opening journey.</Text>
                        </div>
                    </div>
                </div>

                <div className="modules-card">
                    <div className="card-inner">
                        <div className="card-front">
                            <IconPersonalDetails/>
                            <h6>Personal details</h6>
                        </div>
                        <div className="card-back">
                            <Text size="medium" fontStyle="serif">This includes details like mother's name, marital status and mailing address.</Text>
                        </div>
                    </div>
                </div>

                <div className="modules-card">
                    <div className="card-inner">
                        <div className="card-front">
                            <IconNominee/>
                            <h6>Nominee details</h6>
                        </div>
                        <div className="card-back">
                            <Text size="medium" fontStyle="serif">This lets the customer add a nominee for their FD or bank account.
                            </Text>
                        </div>
                    </div>
                </div>

                <div className="modules-card">
                    <div className="card-inner">
                        <div className="card-front">
                            <IconBizDetails/>
                            <h6>Business details</h6>
                        </div>
                        <div className="card-back">
                            <Text size="medium" fontStyle="serif">This is applicable for current account opening journey, the customer needs to share details like their annual turnover, and business proofs.</Text>
                        </div>
                    </div>
                </div>

                <div className="modules-card">
                    <div className="card-inner">
                        <div className="card-front">
                            <IconBankBranch/>
                            <h6>Bank branch and account type</h6>
                        </div>
                        <div className="card-back">
                            <Text size="medium" fontStyle="serif">Here, the customer can select their preferred bank branch and also account type.</Text>
                        </div>
                    </div>
                </div>

                <div className="modules-card">
                    <div className="card-inner">
                        <div className="card-front">
                            <IconReviewDetails/>
                            <h6>Review details</h6>
                        </div>
                        <div className="card-back">
                            <Text size="medium" fontStyle="serif">Review details page shows all the details that the customer has filled in during their account opening of FD journey.</Text>
                        </div>
                    </div>
                </div>

                <div className="modules-card">
                    <div className="card-inner">
                        <div className="card-front">
                            <IconFundYourAccount/>
                            <h6>Fund your account</h6>
                        </div>
                        <div className="card-back">
                            <Text size="medium" fontStyle="serif">Here, the customer needs to verify their bank account using RPD and fund their account or FD.</Text>
                        </div>
                    </div>
                </div>

                <div className="modules-card">
                    <div className="card-inner">
                        <div className="card-front">
                            <IconVKYC/>
                            <h6>vKYC</h6>
                        </div>
                        <div className="card-back">
                            <Text size="medium" fontStyle="serif">To remove transaction limits, the customer needs to complete vkYC. This step is not mandatory but is necessary from a regulatory point of view.</Text>
                        </div>
                    </div>
                </div>
            </Row>



            {/* OTHER PARTS OF THE APP */}

            <Row horizontalPadding="huge" marginTop="small" marginBottom="tiny">
                <Portion desktopSpan="whole">
                    <h6>Others—</h6>
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
                            <Text size="medium" fontStyle="serif">The Home section shows the user's accounts,
                                notifications, and action items while nudging them to explore other banking
                                products.</Text>
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
                            <Text size="medium" fontStyle="serif">Profile page has personal details of the user along
                                with options to choose bank branch, manage alerts, documents and start vKYC.</Text>
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
                            <Text size="medium" fontStyle="serif">Settings page has options to change theme and
                                language.
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
                            <Text size="medium" fontStyle="serif">This section allows users to view and edit detailed
                                information related to their FD, SA, or CA, such as balance, account number, and nominee
                                details.</Text>
                        </div>
                    </div>
                </div>
            </Row>

            {/* TABS */}

            <Row horizontalPadding="huge" marginTop="medium" marginBottom="tiny">
                <Portion desktopSpan="whole">
                    <h5>User flows and design decisions</h5>
                </Portion>
            </Row>

            <Row horizontalPadding="huge" marginTop="none" marginBottom="tiny">
                <Portion desktopSpan="whole">
                <Tabs
                    align="left"
                    tabs={[
                        {
                            key: "tab1",
                            label: "Savings Account",
                            content: (
                                <iframe
                                    width="400vw"
                                    height="800px"
                                    src="https://embed.figma.com/proto/w0anbvzmhQZsuneSdO9U3S/HDFC?node-id=87-7343&p=f&scaling=scale-down&content-scaling=responsive&page-id=0%3A1&starting-point-node-id=87%3A7343&embed-host=share"
                                    allowFullScreen></iframe>
                            )
                        },
                        {
                            key: "tab2",
                            label   : "Current Account",
                            content : (
                                <iframe
                                    width="400vw"
                                    height="800px"
                                    src="https://embed.figma.com/proto/w0anbvzmhQZsuneSdO9U3S/HDFC?node-id=100-6120&p=f&scaling=scale-down&content-scaling=responsive&page-id=0%3A1&starting-point-node-id=100%3A6120&embed-host=share"
                                    allowFullScreen></iframe>
                            )
                        },
                        {
                            key     : "tab3",
                            label   : "Fixed Deposit + Savings Account",
                            content : (
                                <iframe
                                    width="400vw"
                                    height="800px"
                                    src="https://embed.figma.com/proto/w0anbvzmhQZsuneSdO9U3S/HDFC?node-id=65-5997&p=f&scaling=scale-down&content-scaling=responsive&page-id=0%3A1&starting-point-node-id=65%3A5997&embed-host=share"
                                    allowFullScreen></iframe>
                            )
                        },
                        {
                            key     : "tab4",
                            label   : "Fixed Deposit (Savings Account exists)",
                            content : (
                                <iframe
                                    width="400vw"
                                    height="800px"
                                    src="https://embed.figma.com/proto/w0anbvzmhQZsuneSdO9U3S/HDFC?node-id=82-6426&p=f&scaling=scale-down&content-scaling=responsive&page-id=0%3A1&starting-point-node-id=82%3A6426&embed-host=share"
                                    allowFullScreen></iframe>
                            )
                        }
                    ]}
                />
                </Portion>
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


            {/* ERROR STATES & EDGE CASES */}

            <Row layoutAsFlexbox horizontalPadding="huge" marginTop="medium" marginBottom="small" style={{ flexWrap: "nowrap", gap: "32px" }}
            >
                <Portion desktopSpan="6" isFullHeight>
                    <h5>Handling edge cases and error states</h5>
                    <br /><br />
                    <IconEdgeCase height="32px"/>
                    <h6>Edge cases</h6>
                    <Text marginTop="nano">
                        We looked at a bunch of edge cases—mostly related to regulatory requirements, bank delays, or cases where the user drops off.
                    </Text>
                </Portion>
                <Portion desktopSpan="10" isFullHeight>
                    <EdgeCaseOne height="420px" />
                    <Text size="tiny" marginTop="nano">
                        If vKYC isn’t completed during the journey, the customer must accept or update FD rates upon resuming.
                    </Text>
                </Portion>
                <Portion desktopSpan="6" isFullHeight>
                    <EdgeCaseTwo height="420px"/>
                    <Text size="tiny" marginTop="nano">
                        FD will be funded in T+1 days, due to delays from either of the banks.
                    </Text>
                    </Portion>
            </Row>

            <Row layoutAsFlexbox horizontalPadding="huge" marginTop="tiny" marginBottom="small" style={{ flexWrap: "nowrap", gap: "32px" }}
            >
                <Portion desktopSpan="6" isFullHeight>
                    <EdgeCaseThree height="420px"/>
                    <Text size="tiny" marginTop="nano">
                        Video KYC can be done only during working hours.
                    </Text>
                </Portion>
                <Portion desktopSpan="6" isFullHeight>
                    <EdgeCaseFour height="420px" />
                    <Text size="tiny" marginTop="nano">
                        Let customers choose a GSTIN if multiple are linked to a PAN.
                    </Text>
                    </Portion>
                <Portion desktopSpan="10" isFullHeight>
                    <EdgeCaseFive height="420px"/>
                    <Text size="tiny" marginTop="nano">
                        Use case where nominee is a minor. HDFC Bank allows the customer to add a guardian for them.
                    </Text>
                </Portion>
            </Row>

            <Row layoutAsFlexbox horizontalPadding="huge" marginTop="small" marginBottom="tiny" style={{ flexWrap: "nowrap", gap: "32px" }}
            >
                <Portion desktopSpan="6">
                    <IconErrorState height="32px"/>
                    <h6>Error states</h6>
                    <Text marginTop="nano">
                        We covered key verification failures and most network and regulatory error states.</Text>
                    <Text>
                        <br />
                        Also, Fictoan, our UI framework, handles the basic ones like password mismatch, invalid format, character limit etc.
                    </Text>
                </Portion>
                <Portion desktopSpan="6" isFullHeight>
                    <ErrorStateOne height="420px" />
                    <Text size="tiny" marginTop="nano">
                        Not eligible to open a current account.
                    </Text>
                </Portion>
                <Portion desktopSpan="10" isFullHeight>
                    <ErrorStateThree height="420px"/>
                    <Text size="tiny" marginTop="nano">
                        Network and location related— <br/>
                        Drop off due to network issue. IP is outside of India.
                    </Text>
                </Portion>
            </Row>

            <Row layoutAsFlexbox horizontalPadding="huge" marginTop="small" marginBottom="tiny" style={{ flexWrap: "nowrap", gap: "34px" }}
            >
                <Portion desktopSpan="5" isFullHeight>
                    <ErrorStateTwo height="420px"/>
                    <Text size="tiny" marginTop="nano">
                        Pincode entered is outside of state limits.
                    </Text>
                </Portion>
                <Portion desktopSpan="5" isFullHeight>
                    <ErrorStateFive height="420px"/>
                    <Text size="tiny" marginTop="nano">
                        Aadhaar and mobile number are not linked.
                    </Text>
                </Portion>
                <Portion desktopSpan="5" isFullHeight>
                    <ErrorStateSix height="420px"/>
                    <Text size="tiny" marginTop="nano">
                        Session expired.
                    </Text>
                </Portion>
            </Row>


            {/* USER TESTING */}

            <Row layoutAsFlexbox horizontalPadding="huge" marginTop="medium" marginBottom="small" style={{ flexWrap: "nowrap", gap: "20px" }}
            >
                <Portion desktopSpan="5">
                    <h5>Feedback from user testing</h5>
                    <Text marginTop="tiny">
                        Thanks to Vivek from our team for conducting user research and testing for the project. We implemented the following based on the feedback—
                    </Text>
                </Portion>
                <Portion desktopSpan="7">
                    <TestingOne style={{ marginBottom: "20px" }} />
                    <TestingTwo />
                </Portion>
                <Portion desktopSpan="11">
                    <TestingThree style={{ marginBottom: "20px" }} />
                    <TestingFour />
                </Portion>
            </Row>


            {/* CONCLUSION */}

            <Row className="summary-section" horizontalMargin="large" marginBottom="medium" marginTop="small">
                <Portion desktopSpan="6">
                    <IconDiamond height="64px"/>
                    <h5>
                        Summing it up
                    </h5>
                </Portion>
                <Portion desktopSpan="1" />
                <Portion desktopSpan="17" marginTop="medium">

                    <Text marginBottom="nano">
                        We successfully concluded Phase 1, unifying HDFC Bank’s digital journeys and improving both self-service and assisted flows.                    </Text>
                    <Text>
                        By unifying fragmented experiences, refining user flows, and enhancing usability, we created a more seamless and efficient banking experience.                    </Text>
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


