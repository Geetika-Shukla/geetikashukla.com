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
import "../visual-projects.css";

// ASSETS ======================================================================
import YellowStar from "@/assets/images/yellow-star.svg";
import IconsHero from "@/assets/images/icons.svg";
import DesignStyles from "@/assets/images/design-styles.svg";
import IconTenacity from "@/assets/images/Tenacity.svg";
import IconLink from "@/assets/images/Link.svg";
import IconDocument from "@/assets/images/DocumentWithGreenTick.svg";
import IconJigsaw from "@/assets/images/Jigsaw.svg";
import Guideline1 from "@/assets/images/guidelines-1.svg";
import Guideline2 from "@/assets/images/guidelines-2.svg";
import Guideline3 from "@/assets/images/guidelines-3.svg";
import Guideline4 from "@/assets/images/guidelines-4.svg";
import Guideline5 from "@/assets/images/guidelines-5.svg";
import Guideline6 from "@/assets/images/guidelines-6.svg";
import Naming from "@/assets/images/naming-convention.svg";
import WhiteLabel from "@/assets/images/whitelabel.svg";
import ProductIcons from "@/assets/images/product-icons.svg";
import ProductIconsIterations from "@/assets/images/product-icons-iterations.svg";
import Platform1 from "@/assets/images/platform-1.svg";
import Platform2 from "@/assets/images/platform-2.svg";
import Platform3 from "@/assets/images/platform-3.svg";
import Platform4 from "@/assets/images/platform-4.svg";
import Platform5 from "@/assets/images/platform-5.svg";
import Platform6 from "@/assets/images/platform-6.svg";
import Platform7 from "@/assets/images/platform-7.svg";
import Platform8 from "@/assets/images/platform-8.svg";
import Platform9 from "@/assets/images/platform-9.svg";
import Platform10 from "@/assets/images/platform-10.svg";
import Platform11 from "@/assets/images/platform-11.svg";
import Platform12 from "@/assets/images/platform-12.svg";
import Tools from "@/assets/images/Tools.svg";
import crucible from "@/assets/images/crucible.gif";
import PeopleExperienceThumbnail from "@/assets/images/thumbnail-for-people-experience.svg";
import IconSystemThumbnail from "@/assets/images/thumbnail-for-icon-system.svg";
import ProjectDiscoveryThumbnail from "@/assets/images/thumbnail-for-product-discovery.svg";



const IconSystemPage = () => {

    return (
        <article className="project-page">

            <Row layoutAsGrid horizontalPadding="huge" marginTop="medium" marginBottom="tiny">
                <Portion desktopSpan="10" horizontalMargin="small">
                    <Heading1 className="hero-heading">
                        Icon system for Setu
                    </Heading1>
                </Portion>

                <Portion desktopSpan="2" marginTop="small" hideOnMobile>
                    <YellowStar alt="star" height="32px" />
                </Portion>

                <Portion desktopSpan="12" mobileSpan="whole" marginLeft="small">
                    <Div marginTop="small">
                        <Text marginBottom="tiny">
                            At Setu, I contributed to defining a visual style, establishing guidelines for icons, and creating approximately 150 of them.
                        </Text>
                        <Text marginBottom="tiny">
                            These icons proved to be incredibly versatile, finding their way into the website, sales decks, print collaterals like employee ID cards, and even Slack emojis representing company values.
                        </Text>
                        <Text marginBottom="tiny">
                            <Link href="https://design.setu.co/interface/iconography" target="_blank" rel="noopener noreferrer">Discover the full set here! ✨</Link>
                        </Text>
                    </Div>
                </Portion>
            </Row >


            <Row className="center-align-svg">
                <IconsHero height="300px" className="hero-alignment" />
            </Row>



            <Row horizontallyCenterThis>
                <Text className="credits" align="center"><em>Special thanks to Prajna for defining the style, Poorvi for the brainstorming sessions and Sujan for
                    his guidance throughout the process.</em></Text>
            </Row>


            <Row horizontalPadding="huge" marginTop="medium" marginBottom="small">
                <Portion desktopSpan="6" marginBottom="small">
                    <h5>Defining the purpose and scope</h5>
                </Portion>

                <Portion desktopSpan="18">
                    <Div>
                        <Text marginBottom="tiny" marginTop="nano">
                            At Setu, the team always ensures that every piece we create together is crafted with care and attention to detail. We believe in subtle, stoic design. What we needed—
                        </Text>
                    </Div>

                    <Div className="mobile-responsive-row" layoutAsFlexbox style={{ gap: "16px" }}>
                        <Card className="pointer-card" padding="small">
                            <IconTenacity />
                            <Text paddingTop="tiny">
                                An icon set that adds clarity and serves as visual shortcuts for our website and pitch decks.
                            </Text>
                        </Card>
                        <Card className="pointer-card" padding="small">
                            <IconJigsaw />
                            <Text paddingTop="tiny">
                                A clean, balanced style that is easy on the eyes and adaptable for the future.
                            </Text>
                        </Card>
                        <Card className="pointer-card" padding="small">
                            <IconDocument />
                            <Text paddingTop="tiny">
                                Given Setu's focus on finance and tech, a style that could balance vibrance and seriousness.
                            </Text>
                        </Card>
                        <Card className="pointer-card" padding="small">
                            <IconLink />
                            <Text paddingTop="tiny">
                                Icons that could reinforce the brand identity, as these were among the first visual elements, aside from 3D renders.
                            </Text>
                        </Card>
                    </Div>

                    <Div>
                        <Text marginBottom="small" marginTop="small">
                            We experimented with a few design style with these factors in mind and decide to go for colour glass—which conveyed more with less number of elements.
                        </Text>
                        <DesignStyles className="responsive-image" height="300px" />
                    </Div>
                </Portion>
            </Row >


            <Row horizontalPadding="huge" marginTop="medium" marginBottom="none">
                <Portion desktopSpan="6" marginBottom="tiny">
                    <h5>Establishing guidelines
                    </h5>
                </Portion>

                <Portion desktopSpan="18">
                    <Div>
                        <Text marginBottom="tiny" marginTop="nano">
                            With time, we decided on how to use the colours and elements, maintain a consistent corner radius with the increase in the number of elements, we couldn’t have messed up with clarity of thought and the visual. Also, not to forget, we had to account for dark theme.
                        </Text>
                    </Div>
                </Portion>
            </Row >

            <Row className="platform-scroll-section" horizontalMargin="large">
                <Div className="scroll-container">
                    <Guideline1 style={{ borderRadius: "16px", minWidth: "900px", scrollSnapAlign: "start" }} />
                    <Guideline2 style={{ borderRadius: "16px", minWidth: "900px", scrollSnapAlign: "start" }} />
                    <Guideline3 style={{ borderRadius: "16px", minWidth: "900px", scrollSnapAlign: "start" }} />
                    <Guideline4 style={{ borderRadius: "16px", minWidth: "900px", scrollSnapAlign: "start" }} />
                    <Guideline5 style={{ borderRadius: "16px", minWidth: "900px", scrollSnapAlign: "start" }} />
                    <Guideline6 style={{ borderRadius: "16px", minWidth: "900px", scrollSnapAlign: "start" }} />
                </Div>
            </Row>

            <Row horizontalPadding="huge" marginTop="medium" marginBottom="none">
                <Portion desktopSpan="6" marginBottom="tiny">
                    <h5>Going the extra mile
                    </h5>
                </Portion>

                <Portion desktopSpan="18">
                    <Div>
                        <Text marginBottom="tiny" marginTop="nano">
                            We went beyond simply creating the set in Figma, we published it as an npm package. With a lot of help from Shekhar, Pankaj, and Adi we made the icons open source on Crucible, allowing everyone to easily copy them into slides and enabling people outside the organisation to customise them to match their brand colours.
                        </Text>
                    </Div>
                </Portion>
            </Row >

            <Row horizontalPadding="huge" marginTop="none" marginBottom="small" horizontallyCenterThis>
                <Image src={crucible} alt="crucible-gif" height={200} width={1200} />
            </Row>

            <Row horizontalPadding="huge">
                <Portion desktopSpan="whole">
                    <Text>
                        Since Setu offers white-labeled screens for certain products, we also considered ways to integrate these seamlessly for our customers.
                    </Text>
                </Portion>
            </Row >

            <Row horizontalPadding="huge">
                <Portion desktopSpan="10">
                    <Naming className="please-respond" height="300px" />
                </Portion>
                <Portion desktopSpan="2" />

                <Portion desktopSpan="10">
                    <WhiteLabel className="please-respond" height="300px" />
                </Portion>
            </Row>

            <Row horizontalPadding="huge" marginTop="small">
                <Portion desktopSpan="whole">
                    <Text>
                        We also created a set of icons for products and their categories which were distinct from the rest of the icon set.
                    </Text>
                </Portion>
            </Row >

            <Row horizontalPadding="huge">
                <Portion desktopSpan="10">
                    <ProductIconsIterations className="please-respond" />
                </Portion>
                <Portion desktopSpan="2" />
                <Portion desktopSpan="10">
                    <ProductIcons className="please-respond" />
                </Portion>
            </Row>

            <Row horizontalPadding="huge" marginTop="medium" marginBottom="none">
                <Portion desktopSpan="whole">
                    <h5>Maintaining and evolving the system
                    </h5>
                </Portion>
                <Portion desktopSpan="whole" marginBottom="tiny">
                    <Text marginBottom="none">
                        After four years of refinements, it’s incredibly rewarding to see the icon set being used across all platforms and types of collaterals at Setu.
                    </Text>
                </Portion>
            </Row >

            <Row className="platform-scroll-section" horizontalMargin="large">
                <Div className="scroll-container">
                    <Platform1 className="scroll-item" />
                    <Platform2 className="scroll-item" />
                    <Platform3 className="scroll-item" />
                    <Platform4 className="scroll-item" />
                    <Platform5 className="scroll-item" />
                    <Platform6 className="scroll-item" />
                    <Platform7 className="scroll-item" />
                    <Platform8 className="scroll-item" />
                    <Platform9 className="scroll-item" />
                    <Platform10 className="scroll-item" />
                    <Platform11 className="scroll-item" />
                    <Platform12 className="scroll-item" />
                </Div>
            </Row>

            <Row className="summary-section" horizontalMargin="large" marginBottom="medium" marginTop="small">
                <Portion desktopSpan="10">
                    <Tools />
                    <h5>
                        These icons have become an integral part of Setu’s identity.
                    </h5>
                </Portion>
                <Portion desktopSpan="1" />
                <Portion desktopSpan="13" marginTop="medium">

                    <Text marginBottom="nano">
                        Icon system was a project that taught me patience and perseverance.
                    </Text>
                    <Text>
                        It wasn’t just a set of icons; creating, refining, and implementing it on the design website and other platforms, and seeing it being used by other teams was truly rewarding.
                    </Text>
                </Portion>
            </Row>

            <hr className="brown-hr"/>

            <Row horizontalPadding="huge" marginTop="medium" marginBottom="medium" hideOnMobile>
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
                    <Link href="/experiences/assisted-product-discovery">
                        <Card className="project-thumbnail" horizontalMargin="tiny" marginBottom="micro">
                            <ProjectDiscoveryThumbnail alt="Assisted product discovery at Setu" />
                            <Heading6 className="project-thumbnail-text" >Assisted product discovery at Setu</Heading6>
                        </Card>
                    </Link>
                </Portion>
            </Row>


        </article >
    );
};

export default IconSystemPage;

