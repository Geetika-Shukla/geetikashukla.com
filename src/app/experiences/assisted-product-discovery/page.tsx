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
import AssistedHero from "@/assets/images/product-discovery/assisted-components.svg";
import Brief from "@/assets/images/product-discovery/project-brief.svg";
import FullFlow from "@/assets/images/product-discovery/full-flow.svg";
import Home from "@/assets/images/product-discovery/home.svg";
import ContactSales from "@/assets/images/product-discovery/contact-sales.svg";
import ProductsMenu from "@/assets/images/product-discovery/products-menu.svg";
import IconBoxWithBraces from "@/assets/images/BoxWithBraces.svg";
import IconCircleWithExclamationMark from "@/assets/images/CircleWithExclamationMark.svg";
import IconTeam from "@/assets/images/Team.svg";
import IconLink from "@/assets/images/Link.svg";
import IconSignPost from "@/assets/images/SignPost.svg";
import IconPersonWithPuzzlePiece from "@/assets/images/PersonWithPuzzlePiece.svg";
import IconFunnelWithPlusSymbol from "@/assets/images/FunnelWithPlusSymbol.svg";
import IconChatBubbles from "@/assets/images/ChatBubbles.svg";
import IconMobilewithCursor from "@/assets/images/MobilewithCursor.svg";
import IconPersonWithSettings from "@/assets/images/PersonWithSettings.svg";
import PeopleExperienceThumbnail from "@/assets/images/thumbnail-for-people-experience.svg";
import IconSystemThumbnail from "@/assets/images/thumbnail-for-icon-system.svg";


export default function ProductDiscoveryPage() {

    return (

        <article className="project-page">

            <Row horizontalPadding="huge" marginTop="medium" marginBottom="small">
                <Portion desktopSpan="10" horizontalMargin="small">
                    <Heading1 className="hero-heading">
                        Assisted product discovery
                    </Heading1>
                </Portion>

                <Portion desktopSpan="2" marginTop="small" hideOnMobile>
                    <YellowStar alt="star" height="32px" />
                </Portion>

                <Portion desktopSpan="12" mobileSpan="whole" marginLeft="small">
                    <Div marginTop="small">
                        <Text marginBottom="tiny">
                            I designed an assisted product discovery experience to help Setu’s potential customers identify the most relevant solutions.
                        </Text>
                    </Div>
                </Portion>
            </Row>

            <Row marginBottom="none" className="full-width">
                <AssistedHero height="500px" className="hero-alignment" />
            </Row>

            <Row horizontalPadding="huge" marginTop="medium" marginBottom="tiny">
                <Portion desktopSpan="whole">
                <h5>Problem overview</h5>
                </Portion>
            </Row>

            <Row horizontalPadding="huge" marginTop="none" marginBottom="small">
                <Portion desktopSpan="10">
                    <Div layoutAsFlexbox style={{ gap: "16px"}} isFullHeight>
                        <Card className="horizontal-pointer-card" padding="small">
                            <IconBoxWithBraces />
                            <Text>
                                Users found it <strong>difficult to navigate Setu’s offerings</strong> and identify the most relevant use cases for their needs.                            </Text>
                        </Card>
                        <Card className="horizontal-pointer-card" padding="small">
                            <IconTeam />
                            <Text>
                                The sales team <strong>spent over an hour on onboarding calls</strong>, explaining products and assessing fit for potential customers.                            </Text>
                        </Card>
                        <Card className="horizontal-pointer-card" padding="small">
                            <IconCircleWithExclamationMark />
                            <Text>
                                <strong>High drop-off rates</strong> on product pages and the contact form, indicating friction in the discovery process.                            </Text>
                        </Card>
                    </Div>
                </Portion>
                <Portion desktopSpan="14">
                    <Brief height="500px"/>
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
                            <Text className="overview-label" marginBottom="nano">Find a product</Text>
                            <Text size="small">
                            I designed an <strong>intuitive, quiz-based experience</strong> placed in the site navigation and key entry points that could help
                            the users <strong>discover the right product combinations</strong>.
                            </Text>
                        </Div>
                        <Div className="overview-details">
                            <Div marginBottom="tiny">
                                <Text className="overview-label" marginBottom="nano">FEATURE GO-LIVE</Text>
                                <Text size="small">Jan 2024</Text>
                            </Div>
                            <Div>
                                <Text className="overview-label" marginBottom="nano">MY ROLE</Text>
                                <Text size="small">UI and UX design</Text>
                            </Div>
                        </Div>
                    </Div>
                </Card>
                </Portion>
            </Row>

            <Row horizontalPadding="huge" marginTop="small" marginBottom="tiny">
                <Portion desktopSpan="whole">
                    <h5>Mapping user needs to actions</h5>
                </Portion>
            </Row>

            <Row horizontalPadding="huge" marginTop="none" marginBottom="none">
                <Portion desktopSpan="whole">
                    <FullFlow />
                </Portion>
            </Row>

            <Row layoutAsFlexbox className="grid-container" horizontalPadding="huge" marginTop="tiny" marginBottom="medium">
                <Card className="horizontal-pointer-card" padding="small">
                    <IconLink />
                    <Text>
                        I aimed to <strong>create a clear link between products, use cases, and industries</strong> for easy navigation and quick decision-making.
                    </Text>
                </Card>
                <Card className="horizontal-pointer-card flex items-center gap-2" padding="small">
                    <IconFunnelWithPlusSymbol />
                    <Text>
                        Instead of lengthy onboarding calls, <strong>sales can get pre-qualified leads with clear requirements</strong>, making conversations more efficient.
                    </Text>
                </Card>
                <Card className="horizontal-pointer-card" padding="small">
                    <IconSignPost />
                    <Text>
                        A quiz mimics a <strong>conversational approach</strong>, making it feel more natural than a static form asking for details upfront.                            </Text>
                </Card>
                <Card className="horizontal-pointer-card" padding="small">
                    <IconPersonWithPuzzlePiece />
                    <Text>
                        Users receive <strong>tailored recommendations based on their answers</strong>, making the process more intuitive than manually browsing products.
                    </Text>
                </Card>
            </Row >

            <Card className="full-width-banner">
                <Div className="banner-content" paddingLeft="large">
                    <Div className="banner-text">
                        <Text className="overview-label" marginBottom="nano">Experience the Solution in Action</Text>
                        <Text>Interact with the feature and see how it helps users discover the right solutions effortlessly.</Text>
                    </Div>
                </Div>
                <Div className="banner-links" paddingRight="large">
                    <Button shape="rounded" bgColor="blue-light90" textColour="violet-light30">
                    <Link href="https://setu.co/find-a-product/" target="_blank" rel="noopener noreferrer">Link to the feature</Link>
                    </Button>
                </Div>
            </Card>


            <Row horizontalPadding="huge" marginTop="medium" marginBottom="tiny">
                <Portion desktopSpan="whole">
                    <h5>Making the feature discoverable</h5>
                </Portion>
                <Portion desktopSpan="whole">
                    <Text>We placed strategic nudges to encourage users to take the quiz at key points across the website where they were spending significant time without taking action.</Text>
                </Portion>
            </Row>

            <Row horizontalPadding="huge" marginTop="none" marginBottom="tiny">
                    <Portion desktopSpan="6">
                        <Card className="violet-card" isFullHeight>
                            <Text size="medium" className="violet-text">
                                <strong>
                                Inside the primary navigation—accessible from all parts of the website.
                                </strong>
                            </Text>
                        </Card>
                    </Portion>
                <Portion desktopSpan="18">
                    <ProductsMenu />
                </Portion>
            </Row>

            <Row horizontalPadding="huge" marginTop="none" marginBottom="tiny">
                <Portion desktopSpan="18">
                    <Home />
                </Portion>
                <Portion desktopSpan="6">
                    <Card className="violet-card" isFullHeight>
                        <Text size="medium" className="violet-text">
                            <strong>
                                On the home page, after the product suite section
                            </strong>
                        </Text>
                    </Card>
                </Portion>
            </Row>

            <Row horizontalPadding="huge" marginTop="none" marginBottom="medium">
                <Portion desktopSpan="6">
                    <Card className="violet-card" isFullHeight>
                        <Text size="medium" className="violet-text">
                            <strong>
                                On the contact sales page
                            </strong>
                        </Text>
                    </Card>
                </Portion>
                <Portion desktopSpan="18">
                    <ContactSales />
                </Portion>
            </Row>

            <Row horizontalPadding="huge" marginTop="medium" marginBottom="tiny">
                <Portion desktopSpan="whole">
                    <h5>Impact</h5>
                </Portion>
            </Row>

            <Row layoutAsFlexbox horizontalPadding="huge" marginTop="tiny" marginBottom="medium">
                <Portion desktopSpan="11">
                    <Card className="stat-card" marginBottom="nano">
                        <Div>
                            <h6>Feature engagement & usage</h6>
                            <Div className="content-row" marginBottom="tiny" marginTop="tiny">
                                <Text className="stat">
                                    21%
                                </Text>
                                <Text>
                                    website visitors engaged with the feature
                                </Text>
                            </Div>
                            <Div className="content-row" marginBottom="tiny" marginTop="tiny">
                                <Text className="stat">
                                    13%
                                </Text>
                                <Text>
                                    completed the quiz or interacted with recommendations
                                </Text>
                            </Div>
                        <p className="source">Out of ~1700 unique visitors in 2 months</p>
                        </Div>
                        <IconMobilewithCursor alt="icon" className="card-icon" />
                    </Card>

                    <Card className="stat-card">
                        <Div>
                            <h6>Improved user clarity</h6>
                            <Div className="content-row" marginBottom="tiny" marginTop="tiny">
                                <Text className="stat">
                                    24%
                                </Text>
                                <Text>
                                    users reported better clarity in finding the right product for their business needs
                                </Text>
                            </Div>
                            <p className="source">Source: User feedback & surveys</p>
                        </Div>
                        <IconPersonWithSettings alt="icon" className="card-icon" />
                    </Card>
                </Portion>

                <Portion desktopSpan="half">
                    <Card className="stat-card" isFullHeight>
                        <Div>
                            <h6>Internal feedback</h6>
                                <Text marginTop="tiny">
                                    Sales teams reported a significant improvement in lead quality due to better product understanding.
                                </Text>
                            <br />
                                <Text>
                                    Eventually, sales team ended up spending less time in discovery and high-level solutioning—they also got more time to cross-sell other products.
                                </Text>
                        </Div>
                        <IconChatBubbles alt="icon" className="card-icon" />
                    </Card>
                </Portion>
            </Row>

            <hr className="brown-hr"/>

            <Row horizontalPadding="huge" marginTop="medium" marginBottom="medium">
                <Portion desktopSpan="4">
                    <h5>Other projects</h5>
                </Portion>

                <Portion desktopSpan="20" className="project-thumbnail-row">
                    <Link href="/visual/people-experience">
                        <Card className="project-thumbnail" marginBottom="micro">
                            <PeopleExperienceThumbnail alt="people-experience" />
                            <Heading6 className="project-thumbnail-text" >People experience at Setu</Heading6>
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


