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



import ProjectDiscoveryThumbnail from "@/assets/images/thumbnail-for-product-discovery.svg";
import IconSystemThumbnail from "@/assets/images/thumbnail-for-icon-system.svg";
import IconBoxWithBraces from "@/assets/images/BoxWithBraces.svg";
import IconTeam from "@/assets/images/Team.svg";
import IconCircleWithExclamationMark from "@/assets/images/CircleWithExclamationMark.svg";
import IconTenacity from "@/assets/images/Tenacity.svg";
import IconJigsaw from "@/assets/images/Jigsaw.svg";
import IconDocument from "@/assets/images/DocumentWithGreenTick.svg";
import IconLink from "@/assets/images/Link.svg";
import DesignStyles from "@/assets/images/design-styles.svg";


export default function HdfcJourneysPage() {

    return (

        <article className="project-page">

            <Row horizontalPadding="huge" marginTop="medium" marginBottom="small">
                <Portion desktopSpan="10" horizontalMargin="small">
                    <Heading1 className="hero-heading">
                        Digital journeys for HDFC Bank
                    </Heading1>
                </Portion>

                <Portion desktopSpan="2" marginTop="small" hideOnMobile>
                    <YellowStar alt="star" height="32px" />
                </Portion>

                <Portion desktopSpan="12" mobileSpan="whole" marginLeft="small">
                    <Div marginTop="small">
                        <Text marginBottom="tiny">
                            For this project, Madhuri and I designed end-to-end digital banking journeys for new and existing HDFC customers, streamlining fragmented online experiences.                         </Text>
                        <Text marginBottom="tiny">
                            We also created assisted flows to help HDFC agents guide customers in opening Savings or Current accounts & FDs.
                        </Text>
                    </Div>
                </Portion>
            </Row>

            <Row marginBottom="none" className="full-width">
                <HDFCHero height="500px" className="hero-alignment" />
            </Row>

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
                    <Div layoutAsFlexbox style={{ gap: "16px"}} isFullHeight>
                        <Card className="horizontal-pointer-card" padding="small">
                            <IconBoxWithBraces />
                            <Text>
                                they were fragmented
                            </Text>
                            </Card>
                        <Card className="horizontal-pointer-card" padding="small">
                            <IconTeam />
                            <Text>
                                were scattered across different HDFC portals
                            </Text>
                        </Card>
                        <Card className="horizontal-pointer-card" padding="small">
                            <IconCircleWithExclamationMark />
                            <Text>
                                had an inconsistent design language
                            </Text>
                        </Card>
                    </Div>
                </Portion>
                <Portion desktopSpan="16">
                    <Portals height="350px"/>
                </Portion>
            </Row >

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
                                <Text className="overview-label" marginBottom="nano">Digital journeys for HDFC Bank</Text>
                                <Text size="small">
                                    End-to-end digital banking journeys for new and existing HDFC customers, streamlining fragmented online experiences—on a single app.
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



            </Row >





            <hr className="brown-hr"/>

            <Row horizontalPadding="huge" marginTop="medium" marginBottom="medium">
                <Portion desktopSpan="4">
                    <h5>Other projects</h5>
                </Portion>

                <Portion desktopSpan="20" className="project-thumbnail-row">
                    <Link href="/experiences/assisted-product-discovery">
                        <Card className="project-thumbnail" marginBottom="micro">
                            <ProjectDiscoveryThumbnail alt="assisted-discovery-at-setu" />
                            <Heading6 className="project-thumbnail-text" >Assisted product discovery at Setu</Heading6>
                        </Card>
                    </Link>
                    <Link href="/visual/icon-system-for-setu">
                        <Card className="project-thumbnail" marginBottom="micro">
                            <IconSystemThumbnail alt="icon-system" />
                            <Heading6 className="project-thumbnail-text" >Icon system for Setu</Heading6>
                        </Card>
                    </Link>
                </Portion>
            </Row>

        </article>
    );
};


