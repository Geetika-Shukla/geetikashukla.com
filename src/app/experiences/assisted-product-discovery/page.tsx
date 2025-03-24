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


import IconTenacity from "@/assets/images/Tenacity.svg";
import IconJigsaw from "@/assets/images/Jigsaw.svg";
import IconDocument from "@/assets/images/DocumentWithGreenTick.svg";
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

            <Row className="center-align-svg" marginBottom="none">
                <AssistedHero height="500px" className="hero-alignment" />
            </Row>

            <Row horizontalPadding="huge" marginTop="medium" marginBottom="tiny">
                <Portion desktopSpan="whole">
                <h5>Problem overview</h5>
                </Portion>
            </Row>

            <Row horizontalPadding="huge" marginTop="none" marginBottom="small">
                <Portion desktopSpan="10">
                    <Div layoutAsFlexbox style={{ gap: "16px"}}>
                        <Card className="horizontal-pointer-card" padding="small">
                            <IconTenacity />
                            <Text paddingTop="tiny">
                                Users found it <strong>difficult to navigate Setu’s offerings</strong> and identify the most relevant use cases for their needs.                            </Text>
                        </Card>
                        <Card className="horizontal-pointer-card" padding="small">
                            <IconJigsaw />
                            <Text paddingTop="tiny">
                                The sales team <strong>spent over an hour on onboarding calls</strong>, explaining products and assessing fit for potential customers.                            </Text>
                        </Card>
                        <Card className="horizontal-pointer-card" padding="small">
                            <IconDocument />
                            <Text paddingTop="tiny">
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
                <Portion desktopSpan="18">
                    <Card className="pointer-card" padding="medium" bgColor="amber-light90" isFullHeight>
                        <IconTenacity/>
                        <h6>Find a product</h6>
                        <Text marginTop="nano">
                            I designed an intuitive, quiz-based experience placed in the site navigation and key entry points that could help the users discover the right product combinations.
                        </Text>
                    </Card>
                </Portion>
                <Portion desktopSpan="6">
                    <Card className="pointer-card" padding="medium" bgColor="amber-light90">
                        <Div>
                            <Text marginBottom="nano"><strong>Feature go-live</strong></Text>
                            <Text>
                                Jan 2024
                            </Text>
                        </Div>
                        <Div marginTop="tiny">
                            <Text marginBottom="nano"><strong>My role</strong></Text>
                            <Text>
                                UI and UX design
                            </Text>
                        </Div>
                    </Card>
                </Portion>
            </Row>

            <Row horizontalPadding="huge" marginTop="medium" marginBottom="tiny">
                <Portion desktopSpan="whole">
                    <h5>Mapping user needs to actions</h5>
                </Portion>
            </Row>

            <Row horizontalPadding="huge" marginTop="none" marginBottom="none">
                <Portion desktopSpan="whole">
                    <FullFlow />
                </Portion>
            </Row>

            <Row horizontalPadding="huge" marginTop="none" marginBottom="small">
                <Portion desktopSpan="10">
                    <Div layoutAsFlexbox style={{ gap: "16px" }}>
                        <Card className="horizontal-pointer-card" padding="small">
                            <IconTenacity />
                            <Text paddingTop="tiny">
                                I aimed to <strong>create a clear link between products, use cases, and industries</strong> for easy navigation and quick decision-making.
                            </Text>
                            </Card>
                        <Card className="horizontal-pointer-card flex items-center gap-2" padding="small">
                            <IconJigsaw />
                            <Text paddingTop="tiny">
                                Instead of lengthy onboarding calls, <strong>sales can get pre-qualified leads with clear requirements</strong>, making conversations more efficient.
                            </Text>
                        </Card>
                    </Div>
                </Portion>
                <Portion desktopSpan="10">
                    <Div layoutAsFlexbox style={{ gap: "16px" }}>
                        <Card className="horizontal-pointer-card" padding="small">
                            <IconTenacity />
                            <Text paddingTop="tiny">
                                A quiz mimics a <strong>conversational approach</strong>, making it feel more natural than a static form asking for details upfront.                            </Text>
                        </Card>
                        <Card className="horizontal-pointer-card" padding="small">
                            <IconJigsaw />
                            <Text paddingTop="tiny">
                                Users receive <strong>tailored recommendations based on their answers</strong>, making the process more intuitive than manually browsing products.
                            </Text>
                        </Card>
                    </Div>
                </Portion>
            </Row >

            <Row horizontalPadding="huge" marginTop="none" marginBottom="none">
                <Portion desktopSpan="whole">
                    <Card className="pointer" padding="medium" bgColor="amber-light90">
                        <IconTenacity paddingBottom="tiny"/>
                        <h6>Experience the solution in action</h6>
                        <Text marginTop="nano" marginBottom="tiny">
                            Interact with the feature and see how it helps users discover the right solutions effortlessly.
                        </Text>
                        <Text size="small" marginRight="tiny">
                            <Link href="https://setu.co/find-a-product/" target="_blank" rel="noopener noreferrer">
                                Link to the feature
                            </Link>
                        </Text>
                    </Card>
                </Portion>
            </Row>

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
                        <Card className="horizontal-pointer-card" padding="medium" bgColor="violet-light90" isFullHeight>
                            <Text textColor="violet-light20" paddingTop="large" size="medium">
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
                    <Card className="horizontal-pointer-card" padding="medium" bgColor="violet-light90" isFullHeight>
                        <Text textColor="violet-light20" paddingTop="nano" size="medium">
                            <strong>
                                On the home page, after the product suite section
                            </strong>
                        </Text>
                    </Card>
                </Portion>
            </Row>

            <Row horizontalPadding="huge" marginTop="none" marginBottom="none">
                <Portion desktopSpan="6">
                    <Card className="horizontal-pointer-card" padding="medium" bgColor="violet-light90" isFullHeight>
                        <Text textColor="violet-light20" paddingTop="nano" size="medium">
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

        </article>
    );
};


