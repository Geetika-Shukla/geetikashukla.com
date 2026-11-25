// EXTERNAL DEPS ===============================================================
import React from "react";

// INTERNAL DEPS ===============================================================
import { Heading1, Portion, Row, Div, Text } from "fictoan-react";

// STYLES ======================================================================
import "../../experiences/experiences-projects.css";
import "../../experiences/page-experiences.css";
import "../ai-pages.css";

// TYPES =======================================================================
import type { CSSProperties } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title       : "Reserve Bank Innovation Hub's website — Geetika Shukla",
    description : "Revamping the website for Reserve Bank Innovation Hub.",
};

// PLACEHOLDERS: the hero's picture and the glimpses, in the shapes they'll
// take, until there's material for them
const Placeholder = ({ label, shape = "16 / 9" }: { label: string; shape?: string }) => (
    <div className="ai-placeholder" style={{ "--shape": shape } as CSSProperties}>{label}</div>
);

export default function RbihWebsitePage() {

    return (

        <article className="project-page ai-page">


            {/* HERO SECTION */}

            <Row layoutAsGrid horizontalPadding="huge" marginTop="medium" marginBottom="small">
                <Portion desktopSpan="10" horizontalMargin="small">
                    <Heading1 className="hero-heading">
                        Reserve Bank Innovation Hub’s website
                    </Heading1>
                </Portion>

                <Portion desktopSpan="2" hideOnMobile />

                <Portion desktopSpan="12" mobileSpan="whole" marginLeft="small">
                    <Div marginTop="small">
                        {/* PLACEHOLDER: what the revamp is, and who it was with */}
                        <Text marginBottom="tiny">
                            Revamping the website for Reserve Bank Innovation Hub.
                        </Text>
                    </Div>
                </Portion>
            </Row>

            <Row horizontalPadding="huge" marginTop="small">
                <Portion>
                    <Placeholder label="The website, to come" />
                </Portion>
            </Row>


            {/* GLIMPSES */}

            <Row horizontalPadding="huge" className="ai-section">
                <Portion>
                    <h2 className="ai-section__title">Glimpses</h2>
                    <Placeholder label="Glimpses, to come" shape="9 / 4" />
                </Portion>
            </Row>

        </article>
    );
}
