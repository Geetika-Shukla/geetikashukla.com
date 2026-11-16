// EXTERNAL DEPS ===============================================================
import React from "react";
import Link from "next/link";

// INTERNAL DEPS ===============================================================
import {
    Card,
    Heading1,
    Heading6,
    Portion,
    Row,
    Div,
    Text,
} from "fictoan-react";

// COMPONENTS ==================================================================

// STYLES ======================================================================
import "./page-visual.css";

// ASSETS ======================================================================
import IconSystemThumbnail from "@/assets/images/thumbnail-for-icon-system.svg";
import DaysThumbnail from "@/assets/images/thumbnail-for-26-days-of-type.svg";
import PeopleExperienceThumbnail from "@/assets/images/thumbnail-for-people-experience.svg";
import KannaujThumbnail from "@/assets/images/thumbnail-for-kannauj-perfumery.svg";


const VisualPage = () => {
    return (
        <article id="page-visual">

            <Row layoutAsGrid  className="row-hide" horizontalPadding="huge" marginTop="medium" marginBottom="none">
                <Portion desktopSpan="2" hideOnMobile />
                <Portion desktopSpan="8">
                    <Heading1 className="hero-heading">
                        All things visual
                    </Heading1>
                </Portion>
                <Portion desktopSpan="2" hideOnMobile />
                <Portion desktopSpan="10" marginBottom="small">
                    <Div marginTop="small">
                        <Text marginBottom="tiny">I work towards creating engrossing brand identities, designing engaging digital experiences with a sprinkling of animations.</Text>

                        <Text>Trying to echo Mies’ timeless wisdom—&quot;God lies in the details&quot;—one pixel at a time.</Text>
                    </Div>
                </Portion>
                <Portion desktopSpan="2" hideOnMobile />
            </Row >



            <Row layoutAsGrid horizontalPadding="huge" marginTop="none" marginBottom="small">
                <Portion className="center-flexbox" layoutAsFlexbox verticallyCenterItems>

                    <Link href="/visual/people-experience">
                        <Card className="project-thumbnail" horizontalMargin="tiny" marginBottom="micro">
                            <PeopleExperienceThumbnail alt="people-experience" />
                            <Heading6 className="project-thumbnail-text" >People experience at Setu</Heading6>
                        </Card>
                    </Link>


                    <Link href="/visual/icon-system-for-setu">
                        <Card className="project-thumbnail" horizontalMargin="tiny" marginBottom="micro">
                            <IconSystemThumbnail alt="icon-system" />
                            <Heading6 className="project-thumbnail-text" >Icon system for Setu</Heading6>
                        </Card>
                    </Link>

                    <Link href="/visual/26-days-of-type">
                        <Card className="project-thumbnail" horizontalMargin="tiny" marginBottom="micro">
                            <DaysThumbnail alt="26-days-of-type" />
                            <Heading6 className="project-thumbnail-text" >26 days of Type</Heading6>
                        </Card>
                    </Link>

                    <Link href="/visual/kannauj-perfumery">
                        <Card className="project-thumbnail" horizontalMargin="tiny" marginBottom="micro">
                            <KannaujThumbnail alt="Kannauj-perfumery" />
                            <Heading6 className="project-thumbnail-text" >Kannauj Perfumery</Heading6>
                        </Card>
                    </Link>
                </Portion>
            </Row>

        </article >
    );
};

export default VisualPage;

