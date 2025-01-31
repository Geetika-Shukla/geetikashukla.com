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
import Heart from "@/assets/images/heart.svg";


export default function Home() {

    return (
        <article id="page-home">

            <Row layoutAsGrid horizontalPadding="huge" marginTop="medium" marginBottom="none">
                <Portion desktopSpan="2" marginTop="large" className="overflow-left" hideOnMobile>
                    <GreenStar alt="star" height="56px" />
                </Portion>
                <Portion desktopSpan="8">
                    <Heading1 className="hero-heading">
                        Hello there!
                    </Heading1>
                </Portion>
                <Portion desktopSpan="2" marginTop="small" hideOnMobile>
                    <YellowStar alt="star" height="32px" />
                </Portion>
                <Portion desktopSpan="10" marginBottom="small">
                    <Div marginTop="small">
                        <Text>I’m Geetika, a multidisciplinary designer. I’m an eager learner and a pre-crastinator.</Text>
                        <br />

                        <Text>Previously, I’ve worked as an architect. I’ve also dabbled in exhibition design, brand design, user
                            interface and
                            experience design, web design, and a little bit of illustrations and coding too.</Text>
                    </Div>
                </Portion>
                <Portion desktopSpan="2" marginTop="small" className="overflow-right" hideOnMobile>
                    <PurpleStar alt="star" height="56px" />
                </Portion>
            </Row >

            <Row className="category-row" layoutAsFlexbox horizontalPadding="huge" marginTop="none" horizontallyCenterThis>

                <Link href="/visual">
                    <Card className="category-thumbnail" shape="rounded" horizontalMargin="micro">
                        <VDCover />
                        <Heading6 className="category-thumbnail-text" >Visual</Heading6>
                    </Card>
                </Link>

                <Link href="/type">
                    <Card href="@/" className="category-thumbnail" shape="rounded" horizontalMargin="micro">
                        <TypeCover />
                        <Heading6 className="category-thumbnail-text" >Type</Heading6>
                    </Card>
                </Link>

                <Link href="/hobbies">
                    <Card className="category-thumbnail" shape="rounded" horizontalMargin="micro">
                        <Heart className="category-thumbnail-text" width="30px" />
                    </Card>
                </Link>
            </Row>

        </article >
    );
}
