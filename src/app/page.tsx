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
import PersonalLogo from "@/assets/images/logo.svg";
import YellowStar from "@/assets/images/yellow-star.svg";
import GreenStar from "@/assets/images/green-star.svg";
import PurpleStar from "@/assets/images/purple-star.svg";
import VDCover from "@/assets/images/vd-cover.svg";
import TypeCover from "@/assets/images/type-cover.svg";
import Heart from "@/assets/images/heart.svg";
import GitHub from "@/assets/images/github.svg";
import LinkedIn from "@/assets/images/linkedin.svg";
import Instagram from "@/assets/images/instagram.svg";


export default function Home() {
    const code = `let a = 1;
let b = "This is a codeblock";
const c = () => {
  console.log("Fictoan!");
};
`;
    return (
        <article id="page-home">

            <Row layoutAsGrid horizontalPadding="huge" marginTop="small">
                <Portion desktopSpan="2" marginTop="large" className="overflow-left">
                    <GreenStar alt="star" height="64px" />
                </Portion>
                <Portion desktopSpan="8">
                    <Heading1 className="hero-heading">
                        Hello there!
                    </Heading1>
                </Portion>
                <Portion desktopSpan="2" marginTop="small">
                    <YellowStar alt="star" height="32px" />
                </Portion>
                <Portion desktopSpan="10">
                    <Div marginTop="small">
                        <Text>I’m Geetika, a multidisciplinary designer. I’m an eager learner and a pre-crastinator.</Text>
                        <br />

                        <Text>Previously, I’ve worked as an architect. I’ve also dabbled in exhibition design, brand design, user
                            interface and
                            experience design, web design, and a little bit of illustrations and coding too.</Text>
                    </Div>
                </Portion>
                <Portion desktopSpan="2" marginTop="small" className="overflow-right">
                    <PurpleStar alt="star" height="64px" />
                </Portion>
            </Row >

            <Row layoutAsFlexbox horizontalPadding="huge" marginTop="none" horizontallyCenterThis>
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

            <Footer id="footer-links" marginTop="medium" horizontalMargin="large">
                <Text marginRight="medium">👩🏻‍💻 &nbsp; Thanks for stopping by! I'm learning to code, and this website has been built by me.</Text>
                <Link href="https://github.com/Geetika-Shukla/geetika-website">
                    <GitHub alt="github" height="30px" />
                </Link>
                <Link href="https://www.linkedin.com/in/geetikashukla/">
                    <LinkedIn alt="Linkedin" height="30px" />
                </Link>
                <Link href="https://www.instagram.com/all.things.type/">
                    <Instagram alt="Instagram" height="30px" />
                </Link>
            </Footer>

        </article >
    );
}
