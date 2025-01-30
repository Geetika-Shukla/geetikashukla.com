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
import KannaujHero from "@/assets/images/kannauj-hero.svg";
import Pic1 from "@/assets/images/pic1.svg";
import Pic2 from "@/assets/images/pic2.svg";
import Pic3 from "@/assets/images/pic3.svg";
import Pic4 from "@/assets/images/colour-palette.svg";
import LogoSpec1 from "@/assets/images/logo-spec-1.svg";
import LogoSpec2 from "@/assets/images/logo-spec-2.svg";
import Mockup from "@/assets/images/mockup.svg";


const KannaujPage = () => {

    return (
        <article className="project-page">

            <Row layoutAsGrid horizontalPadding="huge" marginTop="medium" marginBottom="small">
                <Portion desktopSpan="10" horizontalMargin="small">
                    <Heading1 className="hero-heading">
                        Kannauj Perfumery
                    </Heading1>
                </Portion>

                <Portion desktopSpan="2" marginTop="small" hideOnMobile>
                    <YellowStar alt="star" height="32px" />
                </Portion>

                <Portion desktopSpan="12" mobileSpan="whole" marginLeft="small">
                    <Div marginTop="small">
                        <Text marginBottom="tiny">
                            A classroom project on retail communication. The idea was to understand the creation of a brand’s imagery, and communication through print.
                        </Text>
                    </Div>
                </Portion>
            </Row >

            <Row>
                <KannaujHero height="400px" />
            </Row>

            <Row layoutAsFlexbox horizontalPadding="huge" marginTop="small">
                <Text marginBottom="tiny">
                    Attar making is a centuries old art evolved, developed and confined to a limited geographical area Kannauj, a historic town, located in Uttar Pradesh. The artisans captured the smell of first rain in a bottle which has received global recognition and is popular as ‘Mitti Attar’ or ‘Petrichor’. Mitti Attar is prepared from the baked earth of the Ganga.
                </Text>
                <Text>
                    The perfume production has been protected under the Geographical indication (GI) of the Agreement on Trade-Related Aspects of Intellectual Property Rights (TRIPS) agreement. It is listed at item 157 as ‘Kannauj Perfume’ of the GI Act 1991 of the Government of India.
                </Text>
            </Row>

            <Row layoutAsFlexbox horizontalPadding="huge" marginTop="small">
                <h5>Mood board and colour palette
                </h5>
                <Portion layoutAsFlexbox className="images-in-a-row" marginBottom="small" marginTop="nano">
                    <Pic1 height="170px" />
                    <Pic2 height="170px" />
                    <Pic3 height="170px" />
                    <Pic4 height="110px" />
                </Portion>
                <h5>Logo Specifications
                </h5>
                <Div marginTop="tiny">
                    <LogoSpec1 width="1000px" />
                </Div>
                <Div marginTop="tiny">
                    <LogoSpec2 width="1000px" />
                </Div>
                <Div marginTop="tiny" marginBottom="medium">
                    <Mockup width="1000px" />
                </Div>
            </Row>

        </article >
    );
};

export default KannaujPage;

