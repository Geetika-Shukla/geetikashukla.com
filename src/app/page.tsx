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

            <div className="page-grid-lines" aria-hidden="true">
                <span/><span/><span/><span/>
            </div>

            <Row layoutAsGrid horizontalPadding="huge" marginTop="medium" marginBottom="none">
                <Portion desktopSpan="8">
                    <Heading1 className="hero-heading">
                        Hello there!
                    </Heading1>
                </Portion>
                <Portion desktopSpan="8" />
                <Portion desktopSpan="8" marginBottom="small">
                    <Div marginTop="small" className="intro-text">
                        <Text>I’m Geetika, a multi-disciplinary designer with around 7 years of experience spanning
                            brand, exhibition, web, and product design.
                        </Text>
                        <br/>
                        <Text>I’ve spent the last 5 years designing 0-1 fintech B2B SaaS products—applying systems
                            thinking with purposeful visual design to turn complex ideas into intuitive user journeys.
                        </Text>
                    </Div>
                </Portion>
            </Row>

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

            <div className="key-projects-wrapper">
                <h3 className="key-projects-label">Key projects</h3>
                <Row layoutAsGrid horizontalPadding="huge" className="key-projects-section" marginBottom="none" marginTop="none" paddingTop="small" paddingBottom="small" hideOnMobile>

                    {/* Column 1 — stacked thumbnails for projects 1 & 2 */}
                    <Portion desktopSpan="8">
                    <Link href="/experiences/revamping-reports" className="project-link" style={{ display: "block", width: "100%" }}>
                        <Card className="project-thumbnail project-thumbnail--half">
                            <ReportsThumbnail alt="revamping-reports"/>
                        </Card>
                    </Link>

                    <div style={{ height: "32px" }} />

                    <Link href="/experiences/hdfc-journeys" className="project-link" style={{ display: "block", width: "100%" }}>
                        <Card className="project-thumbnail project-thumbnail--tall">
                            <HDFCThumbnail alt="hdfc" />
                        </Card>
                    </Link>
                </Portion>

                    {/* Column 2 — stacked descriptions for projects 1 & 2 */}
                    <Portion desktopSpan="8" style={{ paddingLeft: "24px", paddingRight: "24px" }}>
                        <Link href="/experiences/revamping-reports" className="project-link">
                            <p className="project-thumbnail-heading">Revamping reports on Bridge</p>
                            <p className="project-thumbnail-description">Scheduling, smarter filters, and enhanced flexibility for better performance.</p>
                        </Link>

                        <div style={{ height: "128px" }} />

                        <Link href="/experiences/hdfc-journeys" className="project-link">
                            <p className="project-thumbnail-heading">Digital journeys for HDFC Bank</p>
                            <p className="project-thumbnail-description">Simplified account opening flows for customers and bank agents alike.</p>
                        </Link>
                    </Portion>

                    {/* Column 3 — tall thumbnail + description for project 3 */}
                    <Portion desktopSpan="8">
                        <Link href="/visual/icon-system-for-setu" className="project-link">
                            <Card className="project-thumbnail project-thumbnail--tall">
                                <IconSystemThumbnail alt="icon-system" />
                            </Card>
                            <p className="project-thumbnail-heading">Icon system for Setu</p>
                            <p className="project-thumbnail-description">A versatile set of ~150 icons across products, decks, print, and Slack.</p>
                        </Link>
                    </Portion>

                </Row>
            </div>

        </article >
    );
}
