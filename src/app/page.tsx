// EXTERNAL DEPS ===============================================================
import React from "react";
import Link from "next/link";

// INTERNAL DEPS ===============================================================
import {
    Button,
    Card,
    Element,
    Heading1,
    Portion,
    Row,
    Div,
    Text,
    CodeBlock,
} from "fictoan-react";

// COMPONENTS ==================================================================

// STYLES ======================================================================
import "@/styles/home.css";

// ASSETS ======================================================================
import FictoanLogo from "@/assets/fictoan-logo.svg";

export default function Home() {
    const code = `let a = 1;
let b = "This is a codeblock";
const c = () => {
  console.log("Fictoan!");
};
`;
    return (
        <article id="page-home">
            <Row layoutAsGrid horizontalPadding="large" marginTop="small">
                <Portion desktopSpan="half">
                    <h1 className="hero-heading">
                        Hello there!
                    </h1>
                </Portion>
                <Portion desktopSpan="half">
                    <Div marginTop="small">
                        <p>I’m Geetika, a multidisciplinary designer. I’m an eager learner and a pre-crastinator.</p>
                        <p>Previously, I’ve worked as an architect. I’ve also dabbled in exhibition design, brand design, user
                            interface and
                            experience design, web design, and a little bit of illustrations and coding too.</p>
                        <br />
                    </Div>
                </Portion >
            </Row >

        </article >
    );
}
