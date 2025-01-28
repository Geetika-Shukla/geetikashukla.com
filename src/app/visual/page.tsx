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
import "./page-visual.css";

// ASSETS ======================================================================
import YellowStar from "@/assets/images/yellow-star.svg";
import GreenStar from "@/assets/images/green-star.svg";
import PurpleStar from "@/assets/images/purple-star.svg";
import IconSystemThumbnail from "@/assets/images/thumbnail-for-icon-system.svg";
import DaysThumbnail from "@/assets/images/thumbnail-for-26-days-of-type.svg";
import PeopleExperienceThumbnail from "@/assets/images/thumbnail-for-people-experience.svg";
import KannaujThumbnail from "@/assets/images/thumbnail-for-kannauj-perfumery.svg";


const VisualPage = () => {
    return (
        <article id="page-visual">

            <Row layoutAsGrid horizontalPadding="huge" marginTop="medium" marginBottom="none">
                <Portion desktopSpan="2" marginTop="large" className="overflow-left">
                    <GreenStar alt="star" height="56px" />
                </Portion>
                <Portion desktopSpan="8">
                    <Heading1 className="hero-heading">
                        All things visual
                    </Heading1>
                </Portion>
                <Portion desktopSpan="2" marginTop="small">
                    <YellowStar alt="star" height="32px" />
                </Portion>
                <Portion desktopSpan="10">
                    <Div marginTop="small">
                        <Text marginBottom="tiny">I work towards creating engrossing brand identities, designing engaging digital experiences with a sprinkling of animations.</Text>

                        <Text>Trying to echo Mies’ timeless wisdom—"God lies in the details"—one pixel at a time.</Text>
                    </Div>
                </Portion>
                <Portion desktopSpan="2" marginTop="small" className="overflow-right">
                    <PurpleStar alt="star" height="56px" />
                </Portion>
            </Row >

            <Row layoutAsGrid horizontalPadding="huge" marginTop="none" marginBottom="small">
                <Portion className="center-flexbox" layoutAsFlexbox verticallyCenterItems>

                    <Card className="project-thumbnail" horizontalMargin="tiny" marginBottom="micro">
                        <PeopleExperienceThumbnail alt="people-experience" />
                        <Heading6 className="project-thumbnail-text" >People experience at Setu</Heading6>
                    </Card>

                    <Card className="project-thumbnail" horizontalMargin="tiny" marginBottom="micro">
                        <IconSystemThumbnail alt="icon-system" />
                        <Heading6 className="project-thumbnail-text" >Icon system for Setu</Heading6>
                    </Card>

                    <Card className="project-thumbnail" horizontalMargin="tiny" marginBottom="micro">
                        <DaysThumbnail alt="26-days-of-type" />
                        <Heading6 className="project-thumbnail-text" >26 days of Type</Heading6>
                    </Card>

                    <Card className="project-thumbnail" horizontalMargin="tiny" marginBottom="micro">
                        <KannaujThumbnail alt="Kannauj-perfumery" />
                        <Heading6 className="project-thumbnail-text" >Kannauj Perfumery</Heading6>
                    </Card>

                </Portion>
            </Row>



        </article >
    );
};

export default VisualPage;

