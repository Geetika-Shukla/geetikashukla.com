// EXTERNAL DEPS ===============================================================
import React from "react";
import Link from "next/link";

// INTERNAL DEPS ===============================================================
import {
    Button,
    Card,
    Element,
    Heading1,
    Heading6,
    Portion,
    Row,
    Div,
    Text,
    CodeBlock
} from "fictoan-react";

// COMPONENTS ==================================================================

// STYLES ======================================================================
import "@/styles/home.css";

// ASSETS ======================================================================
import FictoanLogo from "@/assets/fictoan-logo.svg";
import YellowStar from "@/assets/images/yellow-star.svg";
import VDCover from "@/assets/images/vd-cover.svg";
import TypeCover from "@/assets/images/type-cover.svg";
import Heart from "@/assets/images/heart.svg";


export default function Home() {
    const code = `let a = 1;
let b = "This is a codeblock";
const c = () => {
  console.log("Fictoan!");
};
`;
    return (
        <article id="page-home">
            <Row layoutAsGrid horizontalPadding="huge" marginTop="medium">
                <Portion desktopSpan="8">
                    <Heading1 className="hero-heading">
                        Hello there!
                    </Heading1>
                </Portion>
                <Portion desktopSpan="2" marginTop="small">
                    <YellowStar alt="star" height="32px" />
                </Portion>
                <Portion desktopSpan="14">
                    <Div marginTop="small">
                        <Text>I’m Geetika, a multidisciplinary designer. I’m an eager learner and a pre-crastinator.</Text>
                        <br />

                        <Text>Previously, I’ve worked as an architect. I’ve also dabbled in exhibition design, brand design, user
                            interface and
                            experience design, web design, and a little bit of illustrations and coding too.</Text>
                    </Div>
                </Portion >
            </Row >

            <Row layoutAsFlexbox horizontalPadding="huge" marginTop="small" horizontallyCenterThis>
                <Card className="category-thumbnail" shape="rounded" horizontalMargin="micro">
                    <VDCover />
                    <Heading6 className="category-thumbnail-text" >Visual</Heading6>
                </Card>

                <Card className="category-thumbnail" shape="rounded" horizontalMargin="micro">
                    <TypeCover />
                    <Heading6 className="category-thumbnail-text" >Type</Heading6>
                </Card>

                <Card className="category-thumbnail" shape="rounded" horizontalMargin="micro">
                    <Heart className="category-thumbnail-text" />
                </Card>
            </Row>

        </article >
    );
}
