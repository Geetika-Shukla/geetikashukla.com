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
import "../visual-projects.css";

// ASSETS ======================================================================
import YellowStar from "@/assets/images/yellow-star.svg";
import IconSystemThumbnail from "@/assets/images/thumbnail-for-icon-system.svg";
import TypeGrid from "@/assets/images/26days/type-grid.svg";



const TypeDaysPage = () => {
    return (
        <article className="project-page">

            <Row layoutAsGrid horizontalPadding="huge" marginTop="medium" marginBottom="small">
                <Portion desktopSpan="10">
                    <Heading1 className="hero-heading">
                        26 Days of Type
                    </Heading1>
                </Portion>

                <Portion desktopSpan="2" marginTop="small">
                    <YellowStar alt="star" height="32px" />
                </Portion>

                <Portion desktopSpan="12">
                    <Div marginTop="small">
                        <Text marginBottom="tiny">36 Days of Type is a project that invites designers, illustrators, and graphic artists to express their particular interpretation of the letters and numbers of our alphabet.</Text>

                        <Text>For this project, I derived inspiration from works of famous architects around the world. The idea was to reflect their design sensibilities through type.

                        </Text>
                    </Div>
                </Portion>

            </Row >

            <Row marginBottom="small">
                <TypeGrid height="400px" />
            </Row>


        </article >
    );
};

export default TypeDaysPage;

