// EXTERNAL DEPS ===============================================================
import React from "react";
import Link from "next/link";
import Image from 'next/image';

// INTERNAL DEPS ===============================================================
import {
    Card,
    Heading1,
    Heading6,
    Portion,
    Row,
    Div,
    Text, Heading3
} from "fictoan-react";

// COMPONENTS ==================================================================

// STYLES ======================================================================
import "./page-experiences.css";

// ASSETS ======================================================================
import YellowStar from "@/assets/images/yellow-star.svg";
import GreenStar from "@/assets/images/green-star.svg";
import PurpleStar from "@/assets/images/purple-star.svg";
import HDFCThumbnail from "@/assets/images/thumbnail-for-hdfc.svg";
import FaveThumbnail from "@/assets/images/thumbnail-for-fave.svg";
import ProjectDiscoveryThumbnail from "@/assets/images/thumbnail-for-product-discovery.svg";
import PartnershipsThumbnail from "@/assets/images/thumbnail-for-partner-onboarding.svg";
import IconSystemThumbnail from "@/assets/images/thumbnail-for-icon-system.svg";
import PeopleExperienceThumbnail from "@/assets/images/thumbnail-for-people-experience.svg";


const ExperiencePage = () => {
    return (
        <article id="page-experiences">

            <Row layoutAsGrid horizontalPadding="huge" marginTop="medium" marginBottom="none">
                <Portion desktopSpan="2" marginTop="large" className="overflow-left" hideOnMobile>
                    <GreenStar alt="star" height="56px" />
                </Portion>
                <Portion desktopSpan="8">
                    <Heading1 className="hero-heading">
                        All things interface
                    </Heading1>
                </Portion>
                <Portion desktopSpan="2" marginTop="small" hideOnMobile>
                    <YellowStar alt="star" height="32px" />
                </Portion>
                <Portion desktopSpan="10" marginBottom="small">
                    <Div marginTop="small">
                        <Text marginBottom="tiny">
                            While designing experiences at Setu, I have focused on the bigger picture, striving to enhance the entire user journey—from discovery to onboarding and engagement.
                            </Text>
                        <Text>
                            My work spans multiple platforms, from web to native mobile applications.
                        </Text>
                    </Div>
                </Portion>
                <Portion desktopSpan="2" marginTop="small" className="overflow-right" hideOnMobile>
                    <PurpleStar alt="star" height="56px" />
                </Portion>
            </Row >

            <Row layoutAsGrid horizontalPadding="huge" marginTop="none" marginBottom="small">
                <Portion className="center-flexbox" layoutAsFlexbox verticallyCenterItems>

                    <Link href="/experiences/assisted-product-discovery">
                        <Card className="project-thumbnail" horizontalMargin="tiny" marginBottom="micro">
                            <ProjectDiscoveryThumbnail alt="Assisted product discovery at Setu" />
                            <Heading6 className="project-thumbnail-text" >Assisted product discovery at Setu</Heading6>
                        </Card>
                    </Link>

                    <Link href="../visual/people-experience">
                        <Card className="project-thumbnail" horizontalMargin="tiny" marginBottom="micro">
                            <PeopleExperienceThumbnail alt="people-experience" />
                            <Heading6 className="project-thumbnail-text" >People experience at Setu</Heading6>
                        </Card>
                    </Link>

                        <Card className="project-thumbnail" horizontalMargin="tiny" marginBottom="micro">
                            <HDFCThumbnail alt="hdfc" />
                            <Heading6 className="project-thumbnail-text" >Digital journeys for HDFC Bank</Heading6>
                        </Card>


                        <Card className="project-thumbnail" horizontalMargin="tiny" marginBottom="micro">
                            <PartnershipsThumbnail alt="Partnerships at Setu" />
                            <Heading6 className="project-thumbnail-text" >Path to partnerships at Setu</Heading6>
                        </Card>

                </Portion>
            </Row>
        </article >
    );
};

export default ExperiencePage;

