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
    CodeBlock
} from "fictoan-react";

// COMPONENTS ==================================================================

// STYLES ======================================================================
import "../visual-projects.css";

// ASSETS ======================================================================
import YellowStar from "@/assets/images/yellow-star.svg";
import PeopleOpsHero from "@/assets/images/people-ops-hero.svg";



const PeopleOpsPage = () => {

    return (
        <article className="project-page">

            <Row layoutAsGrid horizontalPadding="huge" marginTop="medium" marginBottom="none">
                <Portion desktopSpan="10" horizontalMargin="small">
                    <Heading1 className="hero-heading">
                        People experience at Setu
                    </Heading1>
                </Portion>

                <Portion desktopSpan="2" marginTop="small" hideOnMobile>
                    <YellowStar alt="star" height="32px" />
                </Portion>

                <Portion desktopSpan="12" mobileSpan="whole" marginLeft="small" marginTop="nano">
                    <Div marginTop="small">
                        <Text marginBottom="tiny">
                            Caring with tough love is one of the core values at Setu.
                        </Text>
                        <Text marginBottom="tiny">
                            Along with my favourite People Ops team, I worked on crafting a memorable employee experience  and creating some keepsakes for our dear Setuzens.
                        </Text>
                    </Div>
                </Portion>
            </Row >


            <Row layoutAsFlexbox style={{ display: "flex", justifyContent: "center" }}>
                <PeopleOpsHero height="564px" style={{ flexGrow: 1, width: "100%", objectFit: "cover" }} />
            </Row>


            <Row horizontallyCenterThis>
                <Text><em>A special thanks to Sujan for keeping the bar high, and to Madhuri for being an excellent sounding board.</em></Text>
            </Row>

        </article >
    );
};

export default PeopleOpsPage;

