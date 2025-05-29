// EXTERNAL DEPS ===============================================================
import React from "react";
import Link from "next/link";

// INTERNAL DEPS ===============================================================
import {
    Button,
    Header,
    Card,
    Element,
    Heading1,
    Heading6,
    Portion,
    Row,
    Div,
    Text,
    Footer,
    CodeBlock
} from "fictoan-react";

// COMPONENTS ==================================================================

// STYLES ======================================================================
import "@/styles/home.css";

// ASSETS ======================================================================
import YellowStar from "@/assets/images/yellow-star.svg";
import GreenStar from "@/assets/images/green-star.svg";
import PurpleStar from "@/assets/images/purple-star.svg";
import VDCover from "@/assets/images/vd-cover.svg";
import TypeCover from "@/assets/images/type-cover.svg";
import ExpCover from "@/assets/images/exp-cover.svg";
import ReportsThumbnail from "@/assets/images/thumbnail-for-reports.svg";
import IconSystemThumbnail from "@/assets/images/thumbnail-for-icon-system.svg";
import HDFCThumbnail from "@/assets/images/thumbnail-for-hdfc.svg";
import ProjectDiscoveryThumbnail from "@/assets/images/thumbnail-for-product-discovery.svg";


export default function Home() {

    return (
        <article id="page-home">

            <Row layoutAsGrid className="row-hide" horizontalPadding="huge" marginTop="medium" marginBottom="none">
                <Portion desktopSpan="2" marginTop="large" className="overflow-left" showOnlyOnDesktop>
                    <GreenStar className="star" alt="stars" height="56px" />
                </Portion>
                <Portion desktopSpan="8">
                    <Heading1 className="hero-heading">
                        Hello there!
                    </Heading1>
                </Portion>
                <Portion desktopSpan="2" marginTop="small" hideOnMobile>
                    <YellowStar className="star"  alt="star" height="32px" />
                </Portion>
                <Portion desktopSpan="10" marginBottom="small">
                    <Div marginTop="small" className="intro-text">
                        <Text>I’m Geetika, a multi-disciplinary designer with around 7 years of experience spanning
                            brand, exhibition, web, and product design.
                        </Text>
                        <br/>
                        <Text>I’ve spent the last 5 years designing 0-1 fintech B2B SaaS products—applying systems
                            thinking with purposeful visual design to turn complex ideas into intuitive user journeys.
                        </Text>
                    </Div>
                    <Div className="buttons-gap" marginTop="tiny" marginBottom="nano">
                        <a
                            className="resume-button"
                            href="https://drive.google.com/uc?export=download&id=1UXkFA6hBj2m-KuHozLz3eFtyUJKckFoY"
                            target="_blank"
                            download
                        >
                            Download Resume
                        </a>
                        <a
                            className="tert-button"
                            href="/details"
                        >
                            More about me
                        </a>
                    </Div>
                </Portion>
                <Portion desktopSpan="2" marginTop="small" className="overflow-right" showOnlyOnDesktop>
                    <PurpleStar className="star" alt="star" height="56px" />
                </Portion>
            </Row >

            {/*CATEGORIES FOR MOBILE */}

            <Row className="category-row" layoutAsFlexbox horizontalPadding="huge" marginTop="none" marginBottom="small" horizontallyCenterThis showOnlyOnMobile>

                <Link href="/experiences">
                    <Card className="category-thumbnail" shape="rounded" horizontalMargin="micro">
                        <ExpCover />
                        <Heading6 className="category-thumbnail-text" >Experiences</Heading6>
                    </Card>
                </Link>

                <Link href="/visual">
                    <Card className="category-thumbnail" shape="rounded" horizontalMargin="micro">
                        <VDCover />
                        <Heading6 className="category-thumbnail-text" >Visual</Heading6>
                    </Card>
                </Link>

                <Link href="/type">
                    <Card className="category-thumbnail" shape="rounded" horizontalMargin="micro">
                        <TypeCover />
                        <Heading6 className="category-thumbnail-text" >Type</Heading6>
                    </Card>
                </Link>
            </Row>

            {/* KEY PROJECTS */}

            <Row horizontalPadding="huge" className="key-project-bg" marginBottom="small" marginTop="nano" paddingTop="small" paddingBottom="tiny" hideOnMobile>
                <Portion desktopSpan="6">
                    <h5>Key projects</h5>
                    <Text marginTop="nano">
                        These projects feature intuitive digital experiences for web, app and platform, complemented by in-depth design system implementations.
                    </Text>
                    </Portion>

                <Portion desktopSpan="1" hideOnMobile/>

                <Portion desktopSpan="17" className="recent-projects-row" hideOnMobile>

                    <Link href="/experiences/revamping-reports">
                        <Card className="project-thumbnail" marginBottom="micro">
                            <div className="project-tag">experiences</div>
                            <ReportsThumbnail alt="revamping-reports" />
                            <Heading6 className="project-thumbnail-heading" >Revamping reports on Bridge</Heading6>
                            <Text className="project-thumbnail-description">
                                Revamped reports with scheduling, smarter filters, and enhanced flexibility to improve performance and user adoption.                            </Text>
                        </Card>
                    </Link>

                    <Link href="/experiences/hdfc-journeys">
                        <Card className="project-thumbnail" marginBottom="micro">
                            <div className="project-tag">experiences</div>
                            <HDFCThumbnail alt="hdfc"/>
                            <Heading6 className="project-thumbnail-heading">Digital journeys for HDFC Bank</Heading6>
                            <Text className="project-thumbnail-description">
                                Redesigned HDFC’s account opening flows to simplify the experience for both customers and bank agents.                            </Text>
                        </Card>
                    </Link>

                    <Link href="/visual/icon-system-for-setu">
                        <Card className="project-thumbnail" marginBottom="micro">
                            <div className="project-tag">visual</div>
                            <IconSystemThumbnail alt="icon-system" />
                            <Heading6 className="project-thumbnail-heading" >Icon system for Setu</Heading6>
                            <Text className="project-thumbnail-description">
                                Designed a versatile icon set of ~150 icons used across various Setu platforms, decks, print, and even Slack emojis.
                            </Text>
                        </Card>
                    </Link>

                    <Link href="/experiences/assisted-product-discovery">
                        <Card className="project-thumbnail" marginBottom="micro">
                            <div className="project-tag">experiences</div>
                            <ProjectDiscoveryThumbnail alt="assisted-discovery-at-setu"/>
                            <Heading6 className="project-thumbnail-heading">Assisted product discovery at
                                Setu</Heading6>
                            <Text className="project-thumbnail-description">
                                Crafted an intuitive, quiz-based product discovery tool to help users find the right Setu solutions.
                            </Text>
                        </Card>
                    </Link>

                </Portion>
            </Row>

        </article >
    );
}
