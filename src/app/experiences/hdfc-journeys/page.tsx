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
                <AssistedHero height="500px" className="hero-alignment" />
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


