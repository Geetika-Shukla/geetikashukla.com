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
import PartnershipsHero from "@/assets/images/building-partnerships/partnerships-cover.svg";
import ExistingLogos from "@/assets/images/building-partnerships/existing-logos.svg";
import ExistingBlog from "@/assets/images/building-partnerships/existing-blog.svg";
import TestimonialPlacement from "@/assets/images/building-partnerships/testimonials-placement.svg";
import BridgeOne from "@/assets/images/building-partnerships/bridge-1.svg";
import BridgeTwo from "@/assets/images/building-partnerships/bridge-2.svg";
import Mailers from "@/assets/images/building-partnerships/mailers.svg";
import HDFCThumbnail from "@/assets/images/thumbnail-for-hdfc.svg";
import IconWallOfLove from "@/assets/images/PersonWithHeart.svg";
import IconLink from "@/assets/images/Link.svg";
import IconPlant from "@/assets/images/Plant.svg";
import IconFunnel from "@/assets/images/FunnelWithPlusSymbol.svg";
import IconHistory from "@/assets/images/DocumentWithGreenTick.svg";
import IconJigsaw from "@/assets/images/Jigsaw.svg";
import IconDiamond from "@/assets/images/Integrity.svg";
import ReportsThumbnail from "@/assets/images/thumbnail-for-reports.svg";
import MappingTouchPoints from "@/assets/images/building-partnerships/touchpoints.svg";
import IconRocket from "@/assets/images/Rocket.svg";
import IconBridge from "@/assets/images/WindowWithBlocks.svg";
import IconPlay from "@/assets/images/WindowWithPlayButton.svg";



export default function RevampingReportsPage() {

    return (

        <article className="project-page">


            {/* HERO SECTION */}

            <Row horizontalPadding="huge" marginTop="medium" marginBottom="small">
                <Portion desktopSpan="10" horizontalMargin="small">
                    <Heading1 className="hero-heading">
                        Path to partnerships at Setu
                    </Heading1>
                </Portion>

                <Portion desktopSpan="2" marginTop="small" hideOnMobile>
                    <YellowStar alt="star" height="32px"/>
                </Portion>

                <Portion desktopSpan="12" mobileSpan="whole" marginLeft="small">
                    <Div marginTop="small">
                        <Text marginBottom="tiny">
                            This project focused on enhancing the user experience and building trust across various discovery and onboarding touch points for potential partners and clients at Setu.
                        </Text>
                        <Text marginBottom="tiny">
                            I led these initiatives end-to-end, covering web design, videos, motion design, illustrations, and development for Setu’s latest case studies.
                        </Text>
                    </Div>
                </Portion>
            </Row>

            <Row className="center-align-svg" marginBottom="tiny">
                <PartnershipsHero width="100vw" className="hero-alignment" />
            </Row>

            <Row horizontalPadding="large" horizontallyCenterThis>
                <Text className="credits" align="center"><em>Special thanks to Pankaj for leading the development, and to Monika and Pete from the Growth and Marketing team for content and collaborative jamming sessions, and to Vivek for helping with the Account Aggregator screens for the video.</em></Text>
            </Row>



            {/* PROJECT OVERVIEW */}

            <Row horizontalPadding="huge" marginTop="medium" marginBottom="tiny">
                <Portion desktopSpan="whole">
                    <h5>Project overview</h5>
                </Portion>
            </Row>

            <Row horizontalPadding="huge" marginTop="none" marginBottom="tiny">
            <Portion desktopSpan="whole">
                <MappingTouchPoints className="please-respond" style={{ borderRadius: "20px" }}/>
            </Portion>
            </Row>

            <Row horizontalPadding="huge" marginTop="nano" marginBottom="tiny">

                <Portion desktopSpan="8">
                    <Text marginTop="tiny" marginBottom="tiny">
                        We started by mapping touch points for both new and existing users across Setu’s website and B2B self-serve platform, Bridge.
                    </Text>
                    <Text>
                        This helped us identify pages and experience flows that were either missing or needed improvement.
                    </Text>
                </Portion>

                <Portion desktopSpan="8">
                    <Div marginTop="tiny" layoutAsFlexbox style={{gap: "16px"}} isFullHeight>
                        <h6>Discovery</h6>
                        <Card className="bridge-grey-card" padding="small" layoutAsFlexbox>
                            <IconWallOfLove/>
                            <Text size="small" fontStyle="serif" marginTop="nano">
                                <strong>Wall of Love</strong>
                            </Text>
                            <Text size="tiny" marginTop="nano">
                                Testimonial from our existing partners for various products.
                            </Text>

                        </Card>
                        <Card className="bridge-grey-card" padding="small" layoutAsFlexbox>
                            <IconRocket/>
                            <Text size="small" fontStyle="serif" marginTop="nano">
                                <strong>Setu Impact</strong>
                            </Text>
                            <Text size="tiny" marginTop="nano">
                                Case studies and success stories from our partners.
                            </Text>
                            </Card>
                    </Div>
                </Portion>

                <Portion desktopSpan="8">
                    <Div marginTop="tiny" layoutAsFlexbox style={{gap: "16px"}} isFullHeight>
                        <h6>Onboarding</h6>
                        <Card className="bridge-grey-card" padding="small" layoutAsFlexbox>
                            <IconBridge/>
                            <Text size="small" fontStyle="serif" marginTop="nano">
                                <strong>Bridge onboarding</strong>
                            </Text>
                            <Text size="tiny" marginTop="nano">
                                Onboarding and home screen design for new and existing Bridge users.                            </Text>

                        </Card>
                        <Card className="bridge-grey-card" padding="small" layoutAsFlexbox>
                            <IconPlay/>
                            <Text size="small" fontStyle="serif" marginTop="nano">
                                <strong>Mailers and product videos</strong>
                            </Text>
                            <Text size="tiny" marginTop="nano">
                                Onboarding mailers and product showcase videos for Bridge users.                            </Text>
                        </Card>
                    </Div>
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
                        <Div className="overview-content-half">
                            <Div>
                                <Text className="overview-label" marginBottom="nano" fontStyle="serif">
                                    Path to partnerships
                                </Text>
                                <Text size="small">
                                    I worked towards improving partner discovery and onboarding touchpoints across Setu’s website and Bridge, enhancing user experience and trust.                                </Text>
                            </Div>
                            <Div className="overview-details">
                                <Div marginBottom="tiny">
                                    <Text className="overview-label" marginBottom="nano" fontStyle="serif">GO-LIVE</Text>
                                    <Text size="small">2024</Text>
                                </Div>
                                <Div>
                                    <Text className="overview-label" marginBottom="nano" fontStyle="serif">MY ROLE</Text>
                                    <Text size="small">UI and UX design, development for case studies</Text>
                                </Div>
                            </Div>
                        </Div>
                    </Card>
                </Portion>
            </Row>

            <Row horizontalPadding="huge" marginTop="tiny" marginBottom="nano">
                <Portion desktopSpan="whole">
                    <Text>
                        Our hypothesis to start with this project was—
                    </Text>
                </Portion>
            </Row>

            <Row layoutAsFlexbox className="grid-container" horizontalPadding="huge" marginTop="tiny" marginBottom="medium">
                <Card className="horizontal-pointer-card" padding="small">
                    <IconLink />
                    <Text>
                        A cohesive, polished experience would <strong>build trust and encourages long-term partnerships with Setu.</strong>
                    </Text>
                    </Card>
                <Card className="horizontal-pointer-card" padding="small">
                    <IconPlant />
                    <Text>
                        Clearer, trust-building touch points can <strong>reduce drop-offs and increase sign-ups or deal closures.</strong>
                    </Text>
                    </Card>
            </Row>



            {/* WALL OF LOVE */}


            <Row horizontalPadding="huge" marginTop="medium" marginBottom="tiny">
                <Portion desktopSpan="whole">
                    <Div marginBottom="nano">
                        <IconWallOfLove width="48px" height="48px" />
                    </Div>
                        <h5>Wall of Love</h5>
                    <Text marginTop="nano">Webpage showcasing testimonials</Text>
                </Portion>
            </Row>

            <Row horizontalPadding="huge" marginTop="none" marginBottom="tiny">
                <Portion desktopSpan="8" isFullHeight>
                    <Card className="bridge-grey-card">
                        <Text marginBottom="tiny">
                            We only had our partner logos on the homepage of Setu’s website—in a static section. There was no mention of testimonials other than pitch decks.
                        </Text>
                        <Text marginBottom="tiny">
                            Setu’s partner list was growing and we wanted to build a dedicated page for the same that could be shared during pitches and as part of marketing collaterals.
                        </Text>
                        <Text marginBottom="tiny">
                            Existing static section on the homepage—
                        </Text>
                    </Card>
                </Portion>
                <Portion desktopSpan="16">
                    <ExistingLogos className="please-respond" style={{ borderRadius: "20px" }}/>
                </Portion>
            </Row>



            {/* FIGMA EMBED */}

            <div className="embed-container">
                <iframe
                    width="100%"
                    height="400px"
                    src="https://embed.figma.com/proto/w0anbvzmhQZsuneSdO9U3S/Prototypes?node-id=463-7042&p=f&scaling=scale-down-width&content-scaling=fixed&page-id=463%3A6047&starting-point-node-id=463%3A7042&embed-host=share"
                    allowFullScreen>
                </iframe>
            </div>

            <Row horizontalPadding="huge" marginTop="none" marginBottom="tiny">

                <Portion desktopSpan="8">
                    <Card className="pointer-card" padding="small" layoutAsFlexbox>
                        <br/>
                        <IconHistory/>
                        <Text size="small" fontStyle="serif" marginTop="nano">
                            <strong>Automated data sync from Excel</strong>
                        </Text>
                        <Text size="tiny" marginTop="nano">
                            Pankaj simplified the process by enabling testimonials to be added via an excel sheet, automatically updating the testimonial page. This reduced manual effort for both developers and designers.                        </Text>
                    </Card>
                </Portion>

                <Portion desktopSpan="8">
                    <Card className="pointer-card" padding="small" layoutAsFlexbox>
                        <br/>
                        <IconJigsaw/>
                        <Text size="small" fontStyle="serif" marginTop="nano">
                            <strong>Reusable code components</strong>
                        </Text>
                        <Text size="tiny" marginTop="nano">
                            Integrated subsets of the testimonial section into the homepage, product pages, and relevant use case pages. Also linked testimonials through the website navigation and footer for better visibility.                        </Text>
                    </Card>
                </Portion>

                <Portion desktopSpan="8">
                    <Card className="pointer-card" padding="small" layoutAsFlexbox>
                        <br/>
                        <IconFunnel/>
                        <Text size="small" fontStyle="serif" marginTop="nano">
                            <strong>Filtering by product</strong>
                        </Text>
                        <Text size="tiny" marginTop="nano">
                            Allow users to view all testimonials or filter them based on the products relevant for them—Data or Payments.                        </Text>
                    </Card>
                </Portion>
            </Row>



            {/* TESTIMONIAL PLACEMENT */}

            <Row horizontalPadding="huge" marginTop="none" marginBottom="tiny">
                <Portion desktopSpan="whole">
                    <Text marginTop="nano" marginBottom="tiny">
                        We placed CTAs on homepage, primary navigation and footer—
                    </Text>
                    <TestimonialPlacement style={{ borderRadius: "20px" }}/>
                </Portion>
            </Row>


            {/* SETU IMPACT */}


            <Row horizontalPadding="huge" marginTop="medium" marginBottom="tiny">
                <Portion desktopSpan="whole">
                    <Div marginBottom="nano">
                        <IconRocket width="48px" height="48px" />
                    </Div>
                    <h5>Setu Impact</h5>
                    <Text marginTop="nano">Case studies</Text>
                </Portion>
            </Row>

            <Row horizontalPadding="huge" marginTop="none" marginBottom="tiny">
                <Portion desktopSpan="8" isFullHeight>
                    <Card className="bridge-grey-card" isFullHeight>
                        <Text marginBottom="tiny">
                            Initially, Setu’s case studies lived on the blog, mixed with other team articles.
                        </Text>
                        <Text marginBottom="tiny">
                            We aimed to create a dedicated space with a consistent structure and design to house them all.
                        </Text>
                        <Text marginBottom="tiny">
                            A snippet of Setu blog—
                        </Text>
                    </Card>
                </Portion>
                <Portion desktopSpan="16">
                    <ExistingBlog className="please-respond" style={{ borderRadius: "20px" }}/>
                </Portion>


            </Row>



            {/* FIGMA EMBED */}

            <div className="embed-container">
                <iframe
                    width="100%"
                    height="400px"
                    src="https://embed.figma.com/proto/w0anbvzmhQZsuneSdO9U3S/Prototypes?node-id=532-2035&scaling=scale-down-width&content-scaling=fixed&page-id=463%3A6047&starting-point-node-id=532%3A2035&embed-host=share"
                    allowFullScreen>
                </iframe>
            </div>


            {/* BRIDGE */}


            <Row horizontalPadding="huge" marginTop="medium" marginBottom="tiny">
                <Portion desktopSpan="whole">
                    <Div marginBottom="nano">
                        <IconBridge width="48px" height="48px" />
                    </Div>
                    <h5>Bridge onboarding</h5>
                    <Text marginTop="nano">B2B self-serve platform for financial journeys</Text>
                </Portion>
            </Row>

            <Row horizontalPadding="huge" marginTop="none" marginBottom="tiny">
                <Portion desktopSpan="whole" mobileSpan="whole">
                    <BridgeOne />
                </Portion>
            </Row>

            <Row horizontalPadding="huge" marginTop="none" marginBottom="tiny">
                <Portion desktopSpan="whole" mobileSpan="whole">
                    <BridgeTwo />
                </Portion>
            </Row>


            {/* MAILERS AND VIDEOS */}


            <Row horizontalPadding="huge" marginTop="medium" marginBottom="tiny">
                <Portion desktopSpan="whole">
                    <Div marginBottom="nano">
                        <IconPlay width="48px" height="48px" />
                    </Div>
                    <h5>Mailers and videos</h5>
                    <Text marginTop="nano">Product updates and showcase videos and mailers</Text>
                </Portion>
            </Row>

            <Row horizontalPadding="huge" marginTop="none" marginBottom="tiny">
                <Portion desktopSpan="whole">
                    <Mailers className="please-respond" style={{ borderRadius: "20px" }}/>
                </Portion>
            </Row>


            {/* YOUTUBE EMBED */}

            <div className="embed-container">
                <iframe
                    width="100%"
                    height="200px"
                    src="https://www.youtube.com/embed/9FVkApowTBs"
                    allowFullScreen>
                </iframe>
            </div>



            {/* LINKS  */}

            <Row horizontalPadding="huge" marginTop="medium" marginBottom="small" hideOnMobile>
                <Portion desktopSpan="6" mobileSpan="whole">
                    <h5>Experience these in action</h5>
                </Portion>

                <Portion desktopSpan="17" className="project-thumbnail-row">
                    <Link href="https://setu.co/testimonials/">
                        <Card className="bridge-cyan-card" horizontalMargin="tiny" marginBottom="micro">
                            <IconHistory alt="testimonials" />
                            <br/>
                            <Text size="small" fontStyle="serif">Testimonials</Text>
                        </Card>
                    </Link>
                    <Link href="https://setu.co/case-studies/">
                        <Card className="bridge-cyan-card" horizontalMargin="tiny" marginBottom="micro">
                            <IconRocket alt="case studies" />
                            <br/>
                            <Text size="small" fontStyle="serif">Setu Impact</Text>
                        </Card>
                    </Link>
                    <Link href="https://www.youtube.com/@setu-fintech/videos">
                        <Card className="bridge-cyan-card" horizontalMargin="tiny" marginBottom="micro">
                            <IconPlay alt="youtube" />
                            <br/>
                            <Text size="small" fontStyle="serif">Setu’s youtube channel</Text>
                        </Card>
                    </Link>
                </Portion>
            </Row>



            {/* CONCLUSION */}

            <Row className="summary-section" horizontalMargin="large" marginBottom="medium" marginTop="small">
                <Portion desktopSpan="6" mobileSpan="whole">
                    <IconDiamond height="64px"/>
                    <h5>
                        Summing it up
                    </h5>
                </Portion>
                <Portion desktopSpan="1" hideOnMobile/>
                <Portion desktopSpan="17" marginTop="medium" mobileSpan="whole">

                    <Text marginBottom="nano">
                        This project not only improved the aesthetic and usability of Setu’s partner experience but also directly contributed to better conversion, faster onboarding, and stronger partner confidence— reducing drop-offs and scaling Setu’s self-serve vision.
                    </Text>
                </Portion>
            </Row>



            {/* OTHER PROJECTS */}

            <hr className="brown-hr"/>

            <Row horizontalPadding="huge" marginTop="medium" marginBottom="medium" hideOnMobile>
                <Portion desktopSpan="4">
                    <h5>Other projects</h5>
                </Portion>

                <Portion desktopSpan="18" className="project-thumbnail-row">
                    <Link href="/experiences/revamping-reports">
                        <Card className="project-thumbnail" horizontalMargin="tiny" marginBottom="micro">
                            <ReportsThumbnail alt="revamping-reports" />
                            <Heading6 className="project-thumbnail-text" >Revamping reports on Bridge</Heading6>
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


